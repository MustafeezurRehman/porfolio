"use client";

import { useEffect } from "react";
import TechIcon from "./TechIcon";

export type ProjectDetail = {
  name: string;
  visibility: "Public" | "Internal";
  metric: string;
  body: string;
  tech: string[];
  year: string;
  role: string;
  team: string;
  problem: string;
  approach: string;
  impact: string[];
  links?: { label: string; href: string; kind: "live" | "repo" | "doc" }[];
};

export default function ProjectDrawer({
  project,
  onClose,
}: {
  project: ProjectDetail | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
      className="fixed inset-0 z-[65]"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      <aside className="absolute right-0 top-0 bottom-0 w-full sm:w-[640px] glass-panel rounded-l-md shadow-soft overflow-y-auto drawer-slide">
        <div className="panel-header sticky top-0 z-10">
          <span className="tl-dot bg-[#fb2c36]" />
          <span className="tl-dot bg-[#ffcc00]" />
          <span className="tl-dot bg-[#00c758]" />
          <span className="ml-3 text-[11px] flex items-center gap-2">
            <span className="text-[var(--accent)]">●</span>
            {project.name.toLowerCase().replace(/\s+/g, "_")}.case-study
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-auto text-[var(--muted)] hover:text-[var(--accent)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          <header>
            <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--muted)] tracking-wider mb-2">
              <span className="text-[var(--gold)]">$</span>
              <span>cat ~/projects/{project.name.toLowerCase().replace(/\s+/g, "-")}.md</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {project.name}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono text-[var(--muted)]">
              <span className="px-1.5 py-0.5 border border-[var(--border-bright)]">
                {project.visibility}
              </span>
              <span>{project.year}</span>
              <span className="text-[var(--dim)]">·</span>
              <span>{project.role}</span>
              <span className="text-[var(--dim)]">·</span>
              <span>{project.team}</span>
              <span className="ml-auto text-[var(--accent)]">{project.metric}</span>
            </div>
          </header>

          <p className="text-sm text-[var(--foreground)] leading-relaxed">
            {project.body}
          </p>

          <Block label="problem" body={project.problem} />
          <Block label="approach" body={project.approach} />

          <div>
            <div className="text-[10px] font-mono text-[var(--accent)] tracking-wider mb-2">
              ➜ impact.json
            </div>
            <ul className="space-y-1.5 text-sm">
              {project.impact.map((it, i) => (
                <li key={i} className="flex gap-2 text-[var(--foreground)]">
                  <span className="text-[var(--green)] shrink-0 font-mono">+</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] font-mono text-[var(--accent)] tracking-wider mb-2">
              ➜ stack.json
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 text-[10px] px-2 py-1 bg-[var(--bg-3)] border border-[var(--border-bright)] text-[var(--foreground)]"
                >
                  <TechIcon name={t} size={11} />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {project.links && project.links.length > 0 && (
            <div className="pt-2 border-t border-[var(--border-bright)]">
              <div className="flex flex-wrap gap-2 pt-4">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 text-xs font-mono border border-[var(--border-accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
                  >
                    {l.kind === "live" && <span>▷</span>}
                    {l.kind === "repo" && <span>{">_"}</span>}
                    {l.kind === "doc" && <span>📄</span>}
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      <style jsx>{`
        .drawer-slide {
          animation: drawer-in 0.5s var(--ease-luxe);
        }
        @keyframes drawer-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="text-[10px] font-mono text-[var(--accent)] tracking-wider mb-2">
        ➜ {label}.txt
      </div>
      <p className="text-sm text-[var(--foreground)] leading-relaxed">{body}</p>
    </div>
  );
}
