"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Item = {
  id: string;
  label: string;
  hint: string;
  href: string;
  group: "Section" | "Action" | "External";
  shortcut?: string;
};

const ITEMS: Item[] = [
  { id: "home", label: "home", hint: "Hero · top of page", href: "#home", group: "Section" },
  { id: "about", label: "about.md", hint: "Who I am, what I do", href: "#about", group: "Section" },
  { id: "skills", label: "skills.json", hint: "Tech stack universe", href: "#skills", group: "Section" },
  { id: "experience", label: "experience.log", hint: "Career git log", href: "#experience", group: "Section" },
  { id: "projects", label: "projects.repo", hint: "Pinned work", href: "#projects", group: "Section" },
  { id: "blogs", label: "blogs.md", hint: "Writings", href: "#blogs", group: "Section" },
  { id: "contact", label: "contact.exe", hint: "Get in touch", href: "#contact", group: "Section" },
  { id: "hire", label: "Hire me", hint: "Send a direct email", href: "mailto:mustafizurrehman@hotmail.com", group: "Action" },
  { id: "linkedin", label: "LinkedIn", hint: "/in/mustafeez-ur-rehman", href: "https://linkedin.com/in/mustafeez-ur-rehman", group: "External" },
  { id: "github", label: "GitHub", hint: "github.com", href: "https://github.com/", group: "External" },
];

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return ITEMS;
    return ITEMS.filter(
      (it) =>
        it.label.toLowerCase().includes(needle) ||
        it.hint.toLowerCase().includes(needle) ||
        it.id.toLowerCase().includes(needle),
    );
  }, [q]);

  useEffect(() => {
    if (!open) return;
    setQ("");
    setActive(0);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, results.length - 1)));
  }, [results.length]);

  const go = (it: Item) => {
    onClose();
    if (it.href.startsWith("#")) {
      const el = document.querySelector(it.href);
      if (el) (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
      else window.location.hash = it.href;
    } else if (it.href.startsWith("mailto:")) {
      window.location.href = it.href;
    } else {
      window.open(it.href, "_blank", "noopener,noreferrer");
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const it = results[active];
      if (it) go(it);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>(`[data-idx='${active}']`);
    node?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  let lastGroup: Item["group"] | null = null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl panel shadow-soft"
        onKeyDown={onKey}
      >
        <div className="panel-header">
          <span className="tl-dot bg-[#fb2c36]" />
          <span className="tl-dot bg-[#ffcc00]" />
          <span className="tl-dot bg-[#00c758]" />
          <span className="ml-3 text-[11px]">command_palette.tsx</span>
          <span className="ml-auto text-[10px] text-[var(--muted)] font-mono">
            <kbd className="px-1 border border-[var(--border-bright)]">esc</kbd> to close
          </span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-bright)]">
          <span className="text-[var(--gold)] font-mono">{">"}</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type to jump · sections, actions, links"
            className="flex-1 bg-transparent border-0 outline-none text-white text-sm font-mono placeholder:text-[var(--dim)]"
            spellCheck={false}
            autoComplete="off"
          />
          <span className="cursor-blink text-[var(--accent)]">_</span>
        </div>
        <div ref={listRef} className="max-h-[52vh] overflow-y-auto py-1">
          {results.length === 0 && (
            <div className="px-4 py-6 text-center text-xs text-[var(--muted)] font-mono">
              no matches · try a different query
            </div>
          )}
          {results.map((it, i) => {
            const showHeader = it.group !== lastGroup;
            lastGroup = it.group;
            const isActive = i === active;
            return (
              <div key={it.id}>
                {showHeader && (
                  <div className="px-4 pt-3 pb-1 text-[9px] tracking-[0.18em] uppercase text-[var(--dim)] font-mono">
                    {it.group}
                  </div>
                )}
                <button
                  type="button"
                  data-idx={i}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(it)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    isActive
                      ? "bg-[var(--accent)]/10 border-l-2 border-[var(--accent)]"
                      : "border-l-2 border-transparent hover:bg-[var(--bg-3)]"
                  }`}
                >
                  <span
                    className={`font-mono text-sm ${
                      isActive ? "text-[var(--accent)]" : "text-white"
                    }`}
                  >
                    {it.label}
                  </span>
                  <span className="text-[11px] text-[var(--muted)]">{it.hint}</span>
                  {isActive && (
                    <span className="ml-auto text-[10px] font-mono text-[var(--gold)]">
                      ↵ open
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
        <div className="border-t border-[var(--border-bright)] px-4 py-2 flex items-center gap-4 text-[10px] text-[var(--muted)] font-mono">
          <span>
            <kbd className="px-1 border border-[var(--border-bright)]">↑</kbd>
            <kbd className="px-1 border border-[var(--border-bright)] ml-0.5">↓</kbd> navigate
          </span>
          <span>
            <kbd className="px-1 border border-[var(--border-bright)]">↵</kbd> select
          </span>
          <span className="ml-auto">
            <kbd className="px-1 border border-[var(--border-bright)]">⌘</kbd>
            <kbd className="px-1 border border-[var(--border-bright)] ml-0.5">K</kbd>
          </span>
        </div>
      </div>
    </div>
  );
}
