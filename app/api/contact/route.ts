import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
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

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
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
          text: `From: ${name} <${email}>\n\n${message}`,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        return NextResponse.json(
          { ok: false, error: `Email provider error: ${text}` },
          { status: 502 },
        );
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
    });
  }

  return NextResponse.json({ ok: true });
}
