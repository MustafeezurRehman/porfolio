import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  /** Honeypot — must be empty for a real submission. Bots fill every field. */
  website?: unknown;
};

// ── Simple in-memory rate limiter (5 requests / 10 min / IP) ────────────────
// For a portfolio this is sufficient; for production-grade swap to Upstash:
//   import { Ratelimit } from "@upstash/ratelimit";
//   import { Redis } from "@upstash/redis";
const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
const buckets = new Map<string, number[]>();

function checkRate(ip: string) {
  const now = Date.now();
  const fresh = (buckets.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (fresh.length >= RATE_LIMIT) {
    buckets.set(ip, fresh);
    return false;
  }
  fresh.push(now);
  buckets.set(ip, fresh);
  return true;
}

function getIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return (
    req.headers.get("x-real-ip") ?? req.headers.get("cf-connecting-ip") ?? "unknown"
  );
}

export async function POST(req: Request) {
  const ip = getIp(req);

  if (!checkRate(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: silently 200 for bots so they don't retry / learn
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email.";
  if (subject.length < 3) errors.subject = "Subject is too short.";
  if (message.length < 10) errors.message = "Message must be at least 10 characters.";
  if (message.length > 5000) errors.message = "Message is too long.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? "mustafizurrehman@hotmail.com";
  const from = process.env.CONTACT_FROM ?? "portfolio@mustafeez.dev";
  const senderName = "Mustafeez Ur Rehman";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mustafeez.dev";

  if (apiKey) {
    try {
      // 1. Notification to owner
      const ownerRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          reply_to: email,
          subject: `[portfolio] ${subject}`,
          text: `From: ${name} <${email}>\nIP: ${ip}\n\n${message}`,
        }),
      });
      if (!ownerRes.ok) {
        const text = await ownerRes.text();
        return NextResponse.json(
          { ok: false, error: `Email provider error: ${text}` },
          { status: 502 },
        );
      }

      // 2. Auto-reply to sender — best-effort, never fails the request
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to: email,
            reply_to: to,
            subject: `Thanks for reaching out — ${senderName}`,
            text:
              `Hey ${name},\n\n` +
              `Thanks for your message. I've got it and will get back to you within 24 hours.\n\n` +
              `For reference, here's what you sent:\n` +
              `— Subject: ${subject}\n` +
              `— Message:\n${message}\n\n` +
              `In the meantime, more about my work at ${siteUrl} — or just reply to this email if anything urgent comes up.\n\n` +
              `Talk soon,\n${senderName}`,
          }),
        });
      } catch {
        // Auto-reply failure should not break the form. Owner notification already sent.
      }
    } catch (err) {
      return NextResponse.json(
        { ok: false, error: (err as Error).message },
        { status: 502 },
      );
    }
  } else {
    console.log("[contact] (no RESEND_API_KEY) would send:", {
      to,
      from,
      name,
      email,
      subject,
      message,
      ip,
    });
  }

  return NextResponse.json({ ok: true });
}
