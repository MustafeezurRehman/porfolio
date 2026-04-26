"use client";

import { useEffect, useState } from "react";

type Item = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const items: Item[] = [
  {
    id: "home",
    label: "Home",
    icon: (
      <path d="M3 11l9-8 9 8M5 9.5V20a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V9.5" />
    ),
  },
  {
    id: "about",
    label: "About",
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8" />
      </>
    ),
  },
  {
    id: "skills",
    label: "Skills",
    icon: (
      <>
        <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
      </>
    ),
  },
  {
    id: "experience",
    label: "Experience",
    icon: (
      <>
        <circle cx="6" cy="6" r="2" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="12" r="2" />
        <path d="M6 8v8M8 6h6a4 4 0 014 4v0" />
      </>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    icon: (
      <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    ),
  },
  {
    id: "blogs",
    label: "Blogs",
    icon: (
      <>
        <path d="M4 4h11a3 3 0 013 3v13H7a3 3 0 01-3-3V4z" />
        <path d="M4 17a3 3 0 013-3h11" />
        <path d="M8 8h6M8 12h6" />
      </>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
  },
];

export default function Sidebar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <aside
      aria-label="Section navigator"
      className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-2"
    >
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <linearGradient id="sidebar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fe6e00" />
            <stop offset="50%" stopColor="#ff5c8a" />
            <stop offset="100%" stopColor="#3080ff" />
          </linearGradient>
        </defs>
      </svg>
      {items.map((it) => {
        const isActive = active === it.id;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            aria-label={it.label}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex items-center justify-center"
          >
            {isActive ? (
              <span className="relative flex items-center justify-center w-12 h-12">
                <svg
                  aria-hidden
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 48 48"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="22"
                    fill="none"
                    stroke="rgba(254,110,0,0.25)"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                  />
                  <g className="sidebar-dots-orbit">
                    {Array.from({ length: 8 }).map((_, i) => {
                      const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
                      const cx = 24 + Math.cos(a) * 22;
                      const cy = 24 + Math.sin(a) * 22;
                      return (
                        <circle
                          key={i}
                          cx={cx}
                          cy={cy}
                          r="1.6"
                          fill="url(#sidebar-grad)"
                        />
                      );
                    })}
                  </g>
                </svg>
                <span className="relative flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border-accent)] bg-[var(--bg-2)]/85 shadow-[0_0_14px_rgba(254,110,0,0.45)]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="url(#sidebar-grad)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {it.icon}
                  </svg>
                </span>
              </span>
            ) : (
              <span className="flex items-center justify-center w-9 h-9">
                <span className="block w-1.5 h-1.5 rounded-full bg-[var(--muted)] opacity-40 group-hover:opacity-100 group-hover:bg-[var(--accent)] transition-all" />
              </span>
            )}
            <span className="absolute right-full mr-2 whitespace-nowrap text-[10px] font-mono px-2 py-1 border border-[var(--border-bright)] bg-[var(--bg-2)] text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity">
              {it.label}
            </span>
          </a>
        );
      })}
    </aside>
  );
}
