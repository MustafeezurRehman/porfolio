"use client";

import { useEffect, useRef, useState } from "react";
import CommandPalette from "./CommandPalette";

const links = [
  { href: "#home", label: "home" },
  { href: "#about", label: "about.md" },
  { href: "#skills", label: "skills.json" },
  { href: "#experience", label: "experience.log" },
  { href: "#projects", label: "projects.repo" },
  { href: "#blogs", label: "blogs.md" },
  { href: "#contact", label: "contact.exe" },
];

export default function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const linksRowRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [bar, setBar] = useState({ left: 0, width: 0, ready: false });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // measure & move the underline whenever active changes / on resize
  useEffect(() => {
    const measure = () => {
      const row = linksRowRef.current;
      const a = linkRefs.current[active];
      if (!row || !a) return;
      const rowRect = row.getBoundingClientRect();
      const r = a.getBoundingClientRect();
      setBar({
        left: r.left - rowRect.left,
        width: r.width,
        ready: true,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (linksRowRef.current) ro.observe(linksRowRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [active]);

  // hide-on-scroll-down, show-on-scroll-up
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (paletteOpen || open) {
          setHidden(false);
        } else if (y < 80) {
          setHidden(false);
        } else if (delta > 6) {
          setHidden(true);
        } else if (delta < -6) {
          setHidden(false);
        }
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [paletteOpen, open]);

  // ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // mobile menu lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        ref={navRef}
        className={`sticky top-0 z-40 backdrop-blur-2xl bg-[#0a0a0a]/65 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{
          borderBottom: "1px solid transparent",
          backgroundImage:
            "linear-gradient(rgba(10,10,10,0.65), rgba(10,10,10,0.65)), linear-gradient(90deg, transparent, rgba(254,110,0,0.4), rgba(212,177,106,0.35), rgba(254,110,0,0.4), transparent)",
          backgroundOrigin: "padding-box, border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-14 flex items-center gap-4">
            <a
              href="#home"
              className="h-8 inline-flex items-center gap-2 group shrink-0"
            >
              <span className="text-[var(--accent)] font-mono text-sm sm:text-base leading-none">
                <span className="text-[var(--muted)]">{"<"}</span>
                <span className="text-glow">Dev</span>
                <span className="text-[var(--muted)]">{" />"}</span>
              </span>
            </a>

            <div
              ref={linksRowRef}
              className="hidden lg:flex relative items-center h-8 text-xs ml-4 text-[var(--muted)]"
            >
              {links.map((l, i) => {
                const id = l.href.slice(1);
                const isActive = active === id;
                return (
                  <span key={l.href} className="flex items-center h-full">
                    {i > 0 && (
                      <span className="mx-1 inline-block w-px h-3 bg-[var(--dim)]/60" />
                    )}
                    <a
                      ref={(el) => {
                        linkRefs.current[id] = el;
                      }}
                      href={l.href}
                      className={`relative h-full inline-flex items-center px-2.5 transition-colors leading-none ${
                        isActive
                          ? "text-[var(--accent)]"
                          : "hover:text-[var(--accent)]"
                      }`}
                    >
                      {l.label}
                    </a>
                  </span>
                );
              })}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-[1px] h-[2px] rounded-full"
                style={{
                  left: bar.left,
                  width: bar.width,
                  background:
                    "linear-gradient(90deg, var(--accent), var(--gold), var(--accent))",
                  boxShadow: "0 0 10px rgba(254,110,0,0.6)",
                  opacity: bar.ready ? 1 : 0,
                  transition:
                    "left 0.6s cubic-bezier(0.22,1,0.36,1), width 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.4s",
                }}
              />
            </div>

            <div className="flex-1" />

            <span className="hidden sm:inline-block h-10 w-[160px]" aria-hidden />

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center w-9 h-9 border border-[var(--border-bright)] hover:border-[var(--accent)] text-[var(--foreground)] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? (
                  <path d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div
            className="lg:hidden fixed inset-x-0 top-14 bottom-0 z-50 bg-[#0a0a0a]/96 backdrop-blur-xl border-t border-[var(--border-bright)] overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
              <div className="text-[11px] font-mono text-[var(--gold)] mb-4">
                <span className="text-[var(--muted)]">$</span> ls ~/portfolio
              </div>
              <ul className="flex flex-col gap-1">
                {links.map((l, i) => {
                  const id = l.href.slice(1);
                  const isActive = active === id;
                  return (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-baseline gap-3 py-3 border-b border-[var(--border-bright)] font-mono ${
                          isActive
                            ? "text-[var(--accent)]"
                            : "text-[var(--foreground)] hover:text-[var(--accent)]"
                        }`}
                      >
                        <span className="text-[var(--dim)] text-xs w-6">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-2xl tracking-tight">
                          {l.label}
                        </span>
                        {isActive && (
                          <span className="ml-auto text-[10px] text-[var(--gold)]">
                            {"// open"}
                          </span>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setPaletteOpen(true);
                  }}
                  className="border border-[var(--border-bright)] hover:border-[var(--gold)] hover:text-[var(--gold)] text-sm py-2 font-mono"
                >
                  ⌘K · Quick Jump
                </button>
                <a
                  href="mailto:mustafizurrehman@hotmail.com"
                  onClick={() => setOpen(false)}
                  className="btn-primary text-sm w-full text-center"
                >
                  Hire Me ↗
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <a
        href="mailto:mustafizurrehman@hotmail.com"
        data-cursor="hover"
        className="hire-luxe hidden sm:inline-flex fixed top-3 right-4 sm:right-6 z-50 items-stretch h-10 leading-none"
        aria-label="Hire Me"
      >
        <span className="hire-luxe-status" aria-hidden>
          <span className="hire-luxe-dot" />
        </span>
        <span className="hire-luxe-body">
          <span className="hire-luxe-text">Hire Me</span>
        </span>
        <span className="hire-luxe-arrow" aria-hidden>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M5 19L19 5M9 5h10v10" />
          </svg>
        </span>
        <span className="hire-luxe-shine" aria-hidden />
      </a>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
