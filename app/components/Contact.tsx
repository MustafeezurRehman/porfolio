"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

const EMAIL = "mustafizurrehman@hotmail.com";
const PHONE = "+971 58 542 1494";
const LINKEDIN = "https://www.linkedin.com/in/mustafeez-ur-rehman";
const GITHUB = "https://github.com/Mustafeez";
const CV_URL = "/cv.pdf";
const CALENDAR_URL = "https://cal.com/mustafeez";

const json = `{
  "status": "available",
  "email": "mustafizurrehman@hotmail.com",
  "phone": "+971 58 542 1494",
  "socials": {
    "linkedin": "/in/mustafeez-ur-rehman"
  },
  "location": "UAE",
  "relocation": "6–8 weeks",
  "response_time": "<24h"
}`;

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [topError, setTopError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast(`${label} copied ✓`);
    } catch {
      setToast("Copy failed");
    }
    setTimeout(() => setToast(null), 1800);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrors({});
    setTopError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data?.errors) setErrors(data.errors);
        else setTopError(data?.error || "Something went wrong. Please try again.");
        return;
      }
      setSent(true);
    } catch {
      setTopError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // UAE / Asia/Dubai live time
  const timeFmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dubai",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const hourFmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dubai",
    hour: "numeric",
    hour12: false,
  });
  const timeStr = now ? timeFmt.format(now) : "--:--:--";
  const dubaiHour = now ? Number(hourFmt.format(now)) : -1;
  const isAvailable = dubaiHour >= 9 && dubaiHour < 18;
  const availLabel = !now ? "Loading…" : isAvailable ? "Available" : "Off-hours";
  const availColor = !now
    ? "var(--muted)"
    : isAvailable
    ? "var(--green)"
    : "#ffcc00";

  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 0%, rgba(212,177,106,0.05), transparent 60%)",
      }}
    >
      <SectionHeader
        hash="#"
        title="Contact.exe"
        prompt="$ ./contact.exe --priority=high"
      />

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="glass-panel rounded-md flex flex-col">
          <div className="panel-header">
            <span className="tl-dot bg-[#fb2c36]" />
            <span className="tl-dot bg-[#ffcc00]" />
            <span className="tl-dot bg-[#00c758]" />
            <span className="ml-3">contact_info.json</span>
          </div>

          <Reveal className="contact-json-reveal">
            <pre className="p-5 text-[12px] leading-6 font-mono overflow-x-auto">
              <code>
                {json.split("\n").map((line, i) => (
                  <div
                    key={i}
                    className="contact-json-line flex gap-4"
                    style={{ "--idx": i } as React.CSSProperties}
                  >
                    <span className="text-[var(--dim)] select-none w-5 text-right shrink-0">
                      {i + 1}
                    </span>
                    <span>{highlightJson(line)}</span>
                  </div>
                ))}
              </code>
            </pre>
          </Reveal>

          {/* Live availability strip */}
          <div className="border-t border-[var(--border-bright)] px-3 sm:px-4 py-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono">
            <span className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full status-pulse"
                style={{ background: availColor }}
              />
              <span style={{ color: availColor }}>{availLabel}</span>
            </span>
            <span className="text-[var(--dim)]">·</span>
            <span className="text-white tabular-nums">{timeStr}</span>
            <span className="text-[var(--muted)] uppercase tracking-wider text-[10px]">
              GST
            </span>
            <span className="ml-auto text-[var(--muted)] text-[10px] sm:text-[11px]">
              response &lt;24h
            </span>
          </div>

          {/* Quick action buttons */}
          <div className="border-t border-[var(--border-bright)] p-3 flex flex-wrap gap-2 mt-auto">
            <ActionButton onClick={() => copy(EMAIL, "Email")}>
              <IconMail /> email
            </ActionButton>
            <ActionButton onClick={() => copy(PHONE, "Phone")}>
              <IconPhone /> phone
            </ActionButton>
            <ActionLink href={LINKEDIN} external>
              <IconLinkedIn /> LinkedIn
            </ActionLink>
            <ActionLink href={GITHUB} external>
              <IconGitHub /> GitHub
            </ActionLink>
            <ActionLink href={CV_URL} download>
              <IconDownload /> CV
            </ActionLink>
            <ActionLink
              href={CALENDAR_URL}
              external
              primary
              className="w-full sm:w-auto sm:ml-auto justify-center"
            >
              <IconCalendar /> Book a call
            </ActionLink>
          </div>
        </div>

        <div className="glass-panel rounded-md flex flex-col">
          <div className="panel-header">
            <span className="px-1.5 py-0.5 text-[9px] bg-[var(--blue)]/20 text-[var(--blue)] border border-[var(--blue)]/40 rounded-sm font-bold">
              TS
            </span>
            <span className="ml-1">sendMessage.ts</span>
            <span className="ml-2 text-[var(--dim)] hover:text-[var(--red)] cursor-pointer">
              ×
            </span>
            <span className="ml-auto text-[10px] text-[var(--muted)]">
              mail.compose
            </span>
          </div>

          <div className="px-5 pt-4 pb-2 text-[11px] font-mono">
            <div className="text-[var(--muted)]">
              <span className="text-[var(--accent)]">secure channel</span> to:{" "}
              <span className="text-white">{EMAIL}</span>
            </div>
            <div className="text-[var(--muted)] mt-1">
              <span className="text-[var(--accent)]">response</span>:{" "}
              <span className="text-white">within 24h</span>
            </div>
          </div>

          {sent ? (
            <div className="p-10 text-center text-sm flex-1">
              <div className="text-3xl text-[var(--green)] mb-3">✓</div>
              <div className="text-white font-bold">Transmission complete.</div>
              <div className="text-[var(--muted)] text-xs mt-2">
                I&apos;ll get back to you within 24 hours.
              </div>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              className="p-5 grid sm:grid-cols-2 gap-3 text-sm"
            >
              <Field label="Name" name="name" error={errors.name} />
              <Field
                label="Email"
                name="email"
                type="email"
                error={errors.email}
              />
              <Field
                label="Subject"
                name="subject"
                error={errors.subject}
                full
              />
              <Field
                label="Message"
                name="message"
                textarea
                error={errors.message}
                full
              />
              {topError && (
                <div className="sm:col-span-2 text-[11px] font-mono text-[var(--red)] border border-[var(--red)]/40 bg-[var(--red)]/5 px-3 py-2">
                  ⚠ {topError}
                </div>
              )}
              <div className="sm:col-span-2 flex flex-wrap items-center gap-3 pt-1">
                <span className="text-[10px] text-[var(--muted)] font-mono">
                  {"// Protected by spam filters and rate limits"}
                </span>
                <button
                  type="submit"
                  disabled={submitting}
                  className="ml-auto btn-primary text-sm inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending…" : "Send Message ↗"}
                </button>
              </div>
            </form>
          )}

          {/* Curl example */}
          <div className="border-t border-[var(--border-bright)] p-4 mt-auto">
            <div className="text-[10px] text-[var(--muted)] font-mono uppercase tracking-wider mb-2">
              <span className="text-[var(--accent)]">➜</span> or via curl
            </div>
            <pre className="text-[10.5px] leading-relaxed font-mono text-[var(--muted)] overflow-x-auto">
              <code>
                <span className="text-[var(--accent)]">$</span> curl -X POST{" "}
                <span className="text-[var(--cyan)]">/api/contact</span>
                {"\n"}
                {"  "}
                <span className="text-[var(--accent-soft)]">-H</span>{" "}
                <span className="text-[#bd93f9]">
                  &quot;Content-Type: application/json&quot;
                </span>
                {"\n"}
                {"  "}
                <span className="text-[var(--accent-soft)]">-d</span>{" "}
                <span className="text-[#bd93f9]">
                  &apos;{`{"name":"...","email":"...","subject":"...","message":"..."}`}&apos;
                </span>
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-2 text-xs font-mono text-white z-50 contact-toast"
        >
          {toast}
        </div>
      )}
    </section>
  );
}

function ActionButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-mono border border-[var(--border-bright)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-[var(--muted)] rounded-sm transition-colors"
    >
      {children}
    </button>
  );
}

function ActionLink({
  children,
  href,
  external,
  download,
  primary,
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  external?: boolean;
  download?: boolean;
  primary?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-mono border rounded-sm transition-colors";
  const tone = primary
    ? "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10"
    : "border-[var(--border-bright)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-[var(--muted)]";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...(download ? { download: true } : {})}
      className={`${base} ${tone} ${className}`}
    >
      {children}
      {external && <span className="text-[10px]">↗</span>}
      {download && <span className="text-[10px]">↓</span>}
    </a>
  );
}

/* Icons */
function IconMail() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1 .37 1.97.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.84.33 1.81.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}
function IconGitHub() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.05c-3.2.7-3.87-1.36-3.87-1.36-.52-1.34-1.27-1.7-1.27-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.86 10.86 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.55 4.56-1.52 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
function IconDownload() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea,
  full,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  full?: boolean;
  error?: string;
}) {
  const base =
    "w-full bg-[var(--background)] border focus:outline-none text-white px-3 py-2 text-sm font-mono placeholder:text-[var(--dim)] transition-colors";
  const tone = error
    ? "border-[var(--red)]/60 focus:border-[var(--red)]"
    : "border-[var(--border-bright)] focus:border-[var(--accent)]";
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider font-mono">
        <span className="text-[var(--accent)]">$</span> {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          aria-invalid={!!error}
          className={`${base} ${tone} mt-1`}
          placeholder={`enter ${label.toLowerCase()}…`}
        />
      ) : (
        <input
          name={name}
          type={type}
          aria-invalid={!!error}
          className={`${base} ${tone} mt-1`}
          placeholder={`enter ${label.toLowerCase()}…`}
        />
      )}
      {error && (
        <span className="block mt-1 text-[10px] font-mono text-[var(--red)]">
          {error}
        </span>
      )}
    </label>
  );
}

function highlightJson(line: string) {
  const out: React.ReactNode[] = [];
  const re = /("[^"]*")(\s*:)?|(\btrue|false|null\b)|(\d+)|([{}\[\],])/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(line)) !== null) {
    if (m.index > last)
      out.push(
        <span key={key++} className="text-[var(--muted)]">
          {line.slice(last, m.index)}
        </span>,
      );
    if (m[1] && m[2])
      out.push(
        <span key={key++}>
          <span className="text-[var(--accent)]">{m[1]}</span>
          <span className="text-[var(--muted)]">{m[2]}</span>
        </span>,
      );
    else if (m[1])
      out.push(
        <span key={key++} className="text-[var(--accent-soft)]">
          {m[1]}
        </span>,
      );
    else if (m[3])
      out.push(
        <span key={key++} className="text-[#bd93f9]">
          {m[3]}
        </span>,
      );
    else if (m[4])
      out.push(
        <span key={key++} className="text-[var(--cyan)]">
          {m[4]}
        </span>,
      );
    else if (m[5])
      out.push(
        <span key={key++} className="text-[var(--muted)]">
          {m[5]}
        </span>,
      );
    last = re.lastIndex;
  }
  if (last < line.length)
    out.push(
      <span key={key++} className="text-[var(--muted)]">
        {line.slice(last)}
      </span>,
    );
  return out;
}
