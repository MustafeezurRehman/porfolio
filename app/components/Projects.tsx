"use client";

import { useState } from "react";
import ProjectDrawer, { type ProjectDetail } from "./ProjectDrawer";
import ProjectThumb from "./ProjectThumb";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import TechIcon from "./TechIcon";

type Variant = "deploy" | "ai" | "ui" | "tools" | "crypto" | "mfe";

type Project = ProjectDetail & {
  lang: { name: string; color: string };
  stars: number;
  forks: number;
  variant: Variant;
};

const projects: Project[] = [
  {
    name: "One-Click Deploy",
    visibility: "Internal",
    body: "Deployment pipeline that pushes new government services across all departments in under 10 seconds — pre-flight checks, environment validation, zero-downtime cutover.",
    tech: ["Node.js", "AWS", "NGINX", "CircleCI"],
    lang: { name: "Node.js", color: "#f97316" },
    stars: 248,
    forks: 32,
    metric: "<10s rollout",
    variant: "deploy",
    year: "2023 — Present",
    role: "Tech Lead",
    team: "5 engineers",
    problem:
      "Service rollouts across 60+ government repositories took 6–9 minutes per deploy and risked downtime. Hot-fixes during peak hours had to be batched.",
    approach:
      "Designed a parallel pipeline with pre-flight environment validation, blue-green cutover, and CDN cache priming. Edge deploy hits all regions in ~10s.",
    impact: [
      "Average rollout cut from ~7m to <10s",
      "Zero-downtime cutover for 5+ government entities",
      "Adopted as the standard release pipeline across DGE",
    ],
    links: [{ kind: "doc", label: "Architecture write-up", href: "#" }],
  },
  {
    name: "TAMM AI",
    visibility: "Public",
    body: "AI-powered services for the TAMM platform — chatbot integrations, intent classification, and LLM workflows that cut manual query resolution by ~40%.",
    tech: ["OpenAI", "LangChain", "Node.js", "React"],
    lang: { name: "TypeScript", color: "#169f9f" },
    stars: 412,
    forks: 67,
    metric: "−40% manual queries",
    variant: "ai",
    year: "2023 — Present",
    role: "Senior Full Stack",
    team: "8 engineers + ML team",
    problem:
      "Citizen support agents handled tens of thousands of repetitive intents weekly. Existing chatbots produced low-confidence answers and required heavy escalation.",
    approach:
      "Layered intent classification, retrieval-augmented prompting, and strict output guardrails. Streamed responses + a feedback loop trained the routing model continuously.",
    impact: [
      "~40% drop in manual query resolution",
      "Average agent handle-time down by 27%",
      "Production-grade guardrails kept hallucination incidents <0.1%",
    ],
    links: [
      { kind: "live", label: "tamm.abudhabi", href: "https://www.tamm.abudhabi" },
    ],
  },
  {
    name: "TAMM 2.0 UI Migration",
    visibility: "Internal",
    body: "End-to-end rollout of TAMM 2.0 themes across 60+ repositories. Standardized the UI and lifted application performance scores by 15%.",
    tech: ["React", "TypeScript", "Tailwind"],
    lang: { name: "TypeScript", color: "#a78bfa" },
    stars: 156,
    forks: 22,
    metric: "+15% perf score",
    variant: "ui",
    year: "2024",
    role: "Migration lead",
    team: "12 engineers",
    problem:
      "60+ services shipped inconsistent UI variants. Lighthouse scores varied wildly and shared components had drifted.",
    approach:
      "Codemod-driven theme migration, shared design tokens enforced via lint, and a release train staggered across 8 weeks to avoid regressions.",
    impact: [
      "+15% average Lighthouse performance",
      "60+ repos on a shared design system",
      "Component drift reduced from 38 variants to 6",
    ],
  },
  {
    name: "WorkBench",
    visibility: "Internal",
    body: "Internal developer productivity tool adopted by 20+ engineers. Reduced local workflow setup time by 50% via automated scaffolding.",
    tech: ["Node.js", "React", "TypeScript"],
    lang: { name: "TypeScript", color: "#fbbf24" },
    stars: 89,
    forks: 12,
    metric: "−50% setup time",
    variant: "tools",
    year: "2022",
    role: "Author",
    team: "Solo (20+ adopters)",
    problem:
      "New engineers spent half a day getting a functional dev environment. Repository templates went stale within weeks.",
    approach:
      "CLI scaffolder + auto-updating templates pulling from a central source-of-truth repo. Health-check command verifies setup in 30s.",
    impact: [
      "−50% local setup time",
      "Adopted by 20+ engineers organically",
      "Template drift caught by automated weekly sync",
    ],
  },
  {
    name: "Crypto Exchange Backend",
    visibility: "Public",
    body: "MEAN-stack microservices for a crypto exchange. Real-time data streaming via Socket.io and Redis, Firebase Analytics, CircleCI deployments.",
    tech: ["MongoDB", "Express", "Socket.io", "Redis"],
    lang: { name: "JavaScript", color: "#f43f5e" },
    stars: 134,
    forks: 28,
    metric: "Real-time pipeline",
    variant: "crypto",
    year: "2019 — 2020",
    role: "Backend",
    team: "4 engineers",
    problem:
      "Order-book updates and price feeds needed to broadcast to thousands of clients with single-digit ms latency.",
    approach:
      "Decoupled the matching engine from the broadcast layer. Redis pub/sub fan-out, Socket.io rooms partitioned per asset, CircleCI for staging→prod.",
    impact: [
      "Real-time updates to 10k+ concurrent clients",
      "p99 broadcast latency under 12ms",
      "Zero-touch deploys via CircleCI",
    ],
  },
  {
    name: "Micro-Frontend Platform",
    visibility: "Public",
    body: "Micro-Frontend architecture and reusable npm packages enabling independent UI deployments across services. Cut TTFB by 40%.",
    tech: ["Angular", "Webpack", "Module Federation"],
    lang: { name: "Angular", color: "#84cc16" },
    stars: 78,
    forks: 14,
    metric: "−40% TTFB",
    variant: "mfe",
    year: "2020 — 2021",
    role: "Frontend Architect",
    team: "6 product teams",
    problem:
      "A monolithic Angular app slowed every team. Independent ship cycles weren't possible and TTFB was creeping toward 1.2s.",
    approach:
      "Module Federation + shared design tokens; teams own their slice end-to-end. A thin shell composes routes at runtime; legacy chunks lazy-load on demand.",
    impact: [
      "−40% TTFB across the suite",
      "6 product teams shipping on independent cadences",
      "Shared component library at 12 packages, semver-pinned",
    ],
  },
];

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 0%, rgba(254,110,0,0.05), transparent 60%)",
      }}
    >
      <SectionHeader hash="$" title="ls -la ~/projects" />

      {/* ambient color blobs that the glass cards refract through */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden -z-10"
        style={{
          maskImage:
            "linear-gradient(180deg, transparent 0%, #000 14%, #000 86%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, #000 14%, #000 86%, transparent 100%)",
        }}
      >
        <div
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            top: "8%",
            left: "10%",
            width: 360,
            height: 360,
            background:
              "radial-gradient(circle, rgba(249,115,22,0.45), transparent 65%)",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-25"
          style={{
            top: "30%",
            right: "8%",
            width: 320,
            height: 320,
            background:
              "radial-gradient(circle, rgba(22,159,159,0.45), transparent 65%)",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-25"
          style={{
            bottom: "18%",
            left: "20%",
            width: 380,
            height: 380,
            background:
              "radial-gradient(circle, rgba(167,139,250,0.4), transparent 65%)",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-25"
          style={{
            bottom: "10%",
            right: "20%",
            width: 320,
            height: 320,
            background:
              "radial-gradient(circle, rgba(244,63,94,0.4), transparent 65%)",
          }}
        />
      </div>

      <div className="flex items-baseline gap-3 mb-5 text-xs font-mono">
        <span className="text-2xl font-bold text-[var(--accent)]">{projects.length}</span>
        <span className="text-[var(--muted)]">Pinned Repositories</span>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="ml-auto text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          View all repositories →
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <Reveal
            key={p.name}
            delay={i * 80}
            className=""
          >
            <ProjectCard p={p} side={i % 2 === 0 ? "left" : "right"} onOpen={() => setActive(p)} />
          </Reveal>
        ))}
      </div>

      <ProjectDrawer project={active} onClose={() => setActive(null)} />
    </section>
  );
}

function ProjectCard({
  p,
  onOpen,
  side,
}: {
  p: Project;
  onOpen: () => void;
  side: "left" | "right";
}) {
  const onEnter = () => {
    document.documentElement.style.setProperty("--cursor-accent", p.lang.color);
  };
  const onLeave = () => {
    document.documentElement.style.removeProperty("--cursor-accent");
  };

  return (
    <button
      onClick={onOpen}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      data-cursor="view"
      className="glass-panel luxe-card rounded-md flex flex-col group overflow-hidden text-left transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        border: "none",
        boxShadow: `
          ${side === "left" ? "-12px" : "12px"} 0 24px -18px ${p.lang.color}28
        `,
        maskImage:
          "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.85) 4%, #000 10%, #000 100%)",
        WebkitMaskImage:
          "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.85) 4%, #000 10%, #000 100%)",
      }}
    >
      <div className="luxe-thumb">
        <ProjectThumb variant={p.variant} color={p.lang.color} />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start gap-3">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="text-[var(--muted)] mt-1 shrink-0"
          >
            <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 11-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8z" />
          </svg>
          <div className="flex-1 min-w-0">
            <h3 className="text-[var(--accent)] font-semibold text-sm group-hover:text-glow">
              {p.name}
            </h3>
          </div>
          <span className="text-[10px] px-2 py-0.5 border border-[var(--border-bright)] text-[var(--muted)] rounded-full">
            {p.visibility}
          </span>
        </div>

        <p className="text-xs text-[var(--muted)] leading-relaxed mt-3 flex-1">
          {p.body}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 text-[10px] px-2 py-0.5 bg-[var(--bg-3)] border border-[var(--border-bright)] text-[var(--foreground)] rounded-full"
            >
              <TechIcon name={t} size={11} />
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-[var(--border-bright)] flex items-center gap-4 text-[11px] text-[var(--muted)]">
          <span className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: p.lang.color }}
            />
            {p.lang.name}
          </span>
          <span className="flex items-center gap-1">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
            </svg>
            {p.stars}
          </span>
          <span className="flex items-center gap-1">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013.5 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zm-3 8.75a.75.75 0 10-1.5 0 .75.75 0 001.5 0z" />
            </svg>
            {p.forks}
          </span>
          <span className="ml-auto text-[var(--accent)] group-hover:text-glow font-mono">
            {p.metric}
          </span>
        </div>
      </div>
    </button>
  );
}
