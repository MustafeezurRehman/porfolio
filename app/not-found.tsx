import Link from "next/link";

const SUGGESTIONS = [
  { cmd: "cd ~/home", label: "Go home", href: "/#home" },
  { cmd: "cat about.md", label: "Read about", href: "/#about" },
  { cmd: "ls projects.repo", label: "Browse projects", href: "/#projects" },
  { cmd: "open contact.exe", label: "Get in touch", href: "/#contact" },
];

export default function NotFound() {
  return (
    <main className="min-h-[100svh] w-full flex items-center justify-center px-4 sm:px-6 py-16 relative">
      {/* ambient glow blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden -z-10"
      >
        <div
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            top: "20%",
            left: "20%",
            width: 380,
            height: 380,
            background:
              "radial-gradient(circle, rgba(254,110,0,0.45), transparent 65%)",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-25"
          style={{
            bottom: "15%",
            right: "15%",
            width: 360,
            height: 360,
            background:
              "radial-gradient(circle, rgba(48,128,255,0.42), transparent 65%)",
          }}
        />
      </div>

      <div
        className="glass-panel rounded-md w-full max-w-2xl"
        style={{
          border: "none",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 60px -16px rgba(0,0,0,0.6), 0 0 60px rgba(254,110,0,0.12)",
        }}
      >
        {/* terminal chrome */}
        <div className="panel-header">
          <span className="tl-dot bg-[#fb2c36]" />
          <span className="tl-dot bg-[#ffcc00]" />
          <span className="tl-dot bg-[#00c758]" />
          <span className="ml-3 text-[11px]">404.error</span>
          <span className="ml-auto text-[10px] text-[var(--muted)] font-mono">
            zsh
          </span>
        </div>

        <div className="p-5 sm:p-7 space-y-5 font-mono text-sm">
          {/* attempted command + error */}
          <div>
            <div className="text-[var(--muted)] flex items-baseline gap-2 flex-wrap">
              <span className="text-[var(--gold)]">$</span>
              <span>cd</span>
              <span className="text-[var(--accent)]">~/this/page</span>
            </div>
            <div className="mt-1.5 text-[var(--red)] text-xs">
              zsh: no such file or directory:{" "}
              <span className="text-white">~/this/page</span>
            </div>
          </div>

          {/* big 404 with cursor */}
          <div className="py-2 sm:py-3">
            <div
              className="font-bold tracking-tighter leading-none"
              style={{
                fontSize: "clamp(4rem, 14vw + 1rem, 9rem)",
                background:
                  "linear-gradient(135deg, #fe6e00 0%, #ff5c8a 55%, #3080ff 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                filter: "drop-shadow(0 0 30px rgba(254,110,0,0.18))",
              }}
            >
              404
              <span className="inline-block w-3 sm:w-4 h-[0.85em] align-baseline ml-2 cursor-blink bg-[var(--accent)]" />
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold)]">
              status: lost
            </div>
            <p className="mt-2 text-[var(--foreground)] text-base leading-relaxed">
              This route doesn&apos;t exist on the system. Either it was moved,
              never existed, or you took a typo path. Try one of the suggested
              commands below.
            </p>
          </div>

          {/* suggested commands */}
          <div className="border-t border-white/10 pt-4">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)] mb-3">
              ➜ available commands
            </div>
            <ul className="space-y-1.5">
              {SUGGESTIONS.map((s) => (
                <li key={s.cmd}>
                  <Link
                    href={s.href}
                    data-cursor="hover"
                    className="group flex items-center gap-3 text-xs hover:bg-white/[0.04] -mx-2 px-2 py-1.5 rounded-sm transition-colors"
                  >
                    <span className="text-[var(--gold)]">$</span>
                    <span className="text-[var(--accent)] group-hover:text-glow">
                      {s.cmd}
                    </span>
                    <span className="text-[var(--dim)]">·</span>
                    <span className="text-[var(--muted)] group-hover:text-white transition-colors">
                      {s.label}
                    </span>
                    <span className="ml-auto text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* footer */}
          <div className="border-t border-white/10 pt-3 flex items-center gap-3 text-[10px] text-[var(--muted)] tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] status-pulse" />
              <span className="text-[var(--green)]">SYSTEM ONLINE</span>
            </span>
            <span className="text-[var(--dim)]">·</span>
            <span>err.code 0x404</span>
            <Link
              href="/"
              className="ml-auto text-[var(--accent)] hover:text-glow"
            >
              ↩ return to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
