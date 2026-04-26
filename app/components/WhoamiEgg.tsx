"use client";

import { useEffect, useRef, useState } from "react";

const SEQUENCE = "whoami";
const LINES = [
  { prompt: "$ whoami", out: "" },
  { prompt: "", out: "Mustafeez Ur Rehman" },
  { prompt: "$ uname -a", out: "" },
  {
    prompt: "",
    out: "Mustafeez 9.0.1 #full-stack #ai-ml SMP UAE x86_64 GNU/Engineer",
  },
  { prompt: "$ cat ~/.profile", out: "" },
  { prompt: "", out: "role:    Senior Full Stack Engineer" },
  { prompt: "", out: "since:   2016 (9+ yrs)" },
  { prompt: "", out: "stack:   TS · React · Node · AI" },
  { prompt: "", out: "status:  shipping" },
  { prompt: "$ exit", out: "" },
];

export default function WhoamiEgg() {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const buf = useRef("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (open && e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key.length !== 1) return;
      buf.current = (buf.current + e.key.toLowerCase()).slice(-SEQUENCE.length);
      if (buf.current === SEQUENCE) {
        buf.current = "";
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) {
      setRevealed(0);
      return;
    }
    document.body.style.overflow = "hidden";
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setRevealed(i);
      if (i >= LINES.length) clearInterval(id);
    }, 220);
    return () => {
      clearInterval(id);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="whoami"
      className="fixed inset-0 z-[70] flex items-center justify-center px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <div className="relative w-full max-w-xl panel shadow-soft">
        <div className="panel-header">
          <span className="tl-dot bg-[#fb2c36]" />
          <span className="tl-dot bg-[#ffcc00]" />
          <span className="tl-dot bg-[#00c758]" />
          <span className="ml-3 text-[11px]">~/whoami</span>
          <span className="ml-auto text-[10px] text-[var(--muted)] font-mono">
            <kbd className="px-1 border border-[var(--border-bright)]">esc</kbd> to close
          </span>
        </div>
        <pre className="p-5 text-[12px] leading-6 font-mono text-[var(--foreground)] min-h-[260px]">
          {LINES.slice(0, revealed).map((l, i) => (
            <div key={i}>
              {l.prompt && (
                <span className="text-[var(--accent)]">{l.prompt}</span>
              )}
              {l.out && <span className="text-white">{l.out}</span>}
              {!l.prompt && !l.out && " "}
            </div>
          ))}
          {revealed < LINES.length && (
            <span className="inline-block w-2 h-4 bg-[var(--accent)] align-middle ml-0.5 cursor-blink" />
          )}
        </pre>
      </div>
    </div>
  );
}
