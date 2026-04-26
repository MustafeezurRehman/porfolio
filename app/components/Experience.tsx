import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

type Job = {
  hash: string;
  branch: string;
  range: string;
  years: string;
  company: string;
  short: string;
  role: string;
  bullets: string[];
  tech: string[];
  files: number;
  kpis: { label: string; value: string; tone: "accent" | "green" | "blue" | "gold" }[];
  iconBg: string;
  iconColor: string;
};

const jobs: Job[] = [
  {
    hash: "a1f9c02",
    branch: "main",
    range: "2022 - Present",
    years: "Nov 2022 – Current",
    company: "Department of Government Enablement",
    short: "DGE",
    role: "Senior Full Stack Developer (TAMM AI)",
    bullets: [
      'Engineered "One-Click" deployment — service rollout across all government departments in <10s.',
      "Shipped AI-driven services within TAMM AI; chatbot integration cut manual query resolution by ~40%.",
      "Orchestrated TAMM 2.0 UI rollout across 60+ repositories — performance scores +15%.",
      "Migrated React + Node.js to latest LTS across 10+ projects — security vulnerabilities -30%.",
      "Owned release cycles across 5+ government entities with zero-downtime deployments.",
      "Core technical lead maintaining 700+ mission-critical service repositories.",
    ],
    tech: ["React", "Node.js", "TypeScript", "OpenAI", "LangChain", "AWS"],
    files: 720,
    kpis: [
      { label: "rollout", value: "<10s", tone: "green" },
      { label: "manual queries", value: "−40%", tone: "accent" },
      { label: "repos", value: "700+", tone: "blue" },
    ],
    iconBg: "rgba(254,110,0,0.15)",
    iconColor: "#fe6e00",
  },
  {
    hash: "7e2bb14",
    branch: "developer",
    range: "2021 - 2022",
    years: "Nov 2021 – Nov 2022",
    company: "Abu Dhabi Government (ADHA TAMM)",
    short: "ADHA",
    role: "Full Stack Developer",
    bullets: [
      'Designed "WorkBench" — internal dev tool adopted by 20+ engineers, -50% workflow setup time.',
      "Led P1 / P2 incident resolution in TAMM Clinic operations module.",
      "Engineered distributed systems for fault tolerance in high-availability production.",
      "Championed TDD; achieved 80%+ code coverage across the module.",
    ],
    tech: ["React", "Node.js", "TypeScript", "Jest", "AWS"],
    files: 142,
    kpis: [
      { label: "setup time", value: "−50%", tone: "accent" },
      { label: "coverage", value: "80%+", tone: "green" },
      { label: "engineers", value: "20+", tone: "blue" },
    ],
    iconBg: "rgba(48,128,255,0.15)",
    iconColor: "#3080ff",
  },
  {
    hash: "3c8aa5d",
    branch: "developer",
    range: "2021",
    years: "Mar 2021 – Oct 2021",
    company: "Share Mobility",
    short: "SM",
    role: "Full Stack Developer",
    bullets: [
      "Re-architected monolith → microservices; average API response time -35%.",
      "Built Python backend for compute-heavy RESTful APIs.",
      "Led architectural guidance across multiple shared mobility products.",
      "Hardened security: HTTP-only cookies, CSRF/XSS mitigation, dependency audits.",
    ],
    tech: ["Python", "Node.js", "Microservices", "PostgreSQL"],
    files: 89,
    kpis: [
      { label: "API latency", value: "−35%", tone: "accent" },
      { label: "services", value: "8+", tone: "blue" },
    ],
    iconBg: "rgba(0,199,88,0.15)",
    iconColor: "#00c758",
  },
  {
    hash: "f01dd7a",
    branch: "developer",
    range: "2020 - 2021",
    years: "Apr 2020 – Dec 2021",
    company: "ID-ware",
    short: "IDW",
    role: "Frontend Developer",
    bullets: [
      "Built reusable frontend npm packages used across multiple product teams.",
      "Implemented Micro-Frontend architecture — independent UI deployments.",
      "Reduced TTFB by 40% via code splitting + lazy loading + legacy refactors.",
      "Practiced TDD with Karma, Jasmine, QUnit, and Mocha.",
    ],
    tech: ["Angular", "Micro-Frontends", "Karma", "Jasmine"],
    files: 124,
    kpis: [
      { label: "TTFB", value: "−40%", tone: "accent" },
      { label: "shared packages", value: "12", tone: "gold" },
    ],
    iconBg: "rgba(189,147,249,0.15)",
    iconColor: "#bd93f9",
  },
  {
    hash: "9b0e441",
    branch: "developer",
    range: "2019 - 2020",
    years: "Jul 2019 – Jun 2020",
    company: "Ideofuzion",
    short: "IF",
    role: "Full Stack Developer",
    bullets: [
      "Built backend microservices for a crypto exchange (MEAN stack).",
      "Real-time data streaming via Socket.io + Redis; CircleCI deployments.",
    ],
    tech: ["MongoDB", "Express", "Angular", "Node.js", "Socket.io"],
    files: 56,
    kpis: [
      { label: "real-time", value: "Socket.io + Redis", tone: "accent" },
      { label: "deploys", value: "CircleCI", tone: "blue" },
    ],
    iconBg: "rgba(78,205,196,0.15)",
    iconColor: "#4ecdc4",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 0%, rgba(0,199,88,0.04), transparent 60%)",
      }}
    >

      <SectionHeader hash="$" title="git log --stat --oneline" />

      {/* Career summary banner */}
      <div className="mb-8 sm:mb-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { value: "9+", label: "years experience" },
          { value: "5", label: "companies" },
          { value: "1.1k+", label: "files touched" },
          { value: "60+", label: "repos shipped" },
        ].map((s) => (
          <div
            key={s.label}
            className="glass rounded-md px-4 py-3 flex flex-col gap-0.5"
          >
            <span className="text-2xl font-mono font-bold text-[var(--accent)] leading-none">
              {s.value}
            </span>
            <span className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-widest">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--border-bright)] to-transparent">
          <span className="exp-spine-pulse absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
        </div>

        <div className="space-y-6 md:space-y-10">
          {jobs.map((j, i) => {
            const left = i % 2 === 0;
            const yearTag = j.range.split(" ")[0];
            return (
              <div
                key={j.hash}
                className="md:grid md:grid-cols-2 md:gap-8 relative"
              >
                <div
                  className={`hidden md:block absolute top-7 w-8 h-px ${
                    left
                      ? "left-1/2 -translate-x-8"
                      : "right-1/2 translate-x-8"
                  }`}
                  style={{ background: j.iconColor }}
                />

                {/* year tag — opposite side of the spine from the card */}
                <span
                  className={`glass-tag hidden md:flex absolute top-5 items-center justify-center px-2 py-0.5 text-[10px] font-mono font-semibold tracking-widest rounded-sm border ${
                    left
                      ? "left-1/2 ml-5"
                      : "right-1/2 mr-5"
                  }`}
                  style={{
                    color: j.iconColor,
                    borderColor: j.iconColor + "55",
                  }}
                >
                  {yearTag}
                </span>

                {/* current-role rippling halo */}
                {i === 0 && (
                  <>
                    <span
                      className="exp-head-ripple hidden md:block absolute top-5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full pointer-events-none"
                      style={{ background: j.iconColor }}
                    />
                    <span
                      className="exp-head-ripple exp-head-ripple-2 hidden md:block absolute top-5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full pointer-events-none"
                      style={{ background: j.iconColor }}
                    />
                  </>
                )}

                <div
                  className="hidden md:block absolute top-5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10"
                  style={{
                    background: "#0d0d0d",
                    borderColor: j.iconColor,
                    boxShadow: `0 0 12px ${j.iconColor}99`,
                  }}
                />
                {i === 0 && (
                  <span
                    className="exp-head-core hidden md:block absolute top-5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10 pointer-events-none"
                    style={{ background: j.iconColor }}
                  />
                )}

                <Reveal
                  className={left ? "" : "md:col-start-2"}
                  delay={i * 80}
                >
                  <article className="glass-panel luxe-card rounded-md" style={{ border: "none" }}>
                    <div className="px-4 sm:px-5 py-2.5 border-b border-[var(--border-bright)] flex items-center gap-3 flex-wrap">
                      <div
                        className="w-9 h-9 rounded flex items-center justify-center font-bold text-xs border shrink-0"
                        style={{
                          background: j.iconBg,
                          borderColor: j.iconColor + "55",
                          color: j.iconColor,
                        }}
                      >
                        {j.short}
                      </div>
                      <div className="text-[11px] font-mono">
                        <div className="text-[var(--accent)]">{j.range}</div>
                        <div className="text-[var(--muted)]">
                          <span className="text-[#ffcc00]">{j.hash}</span>
                          <span className="text-[var(--dim)]"> · </span>
                          <span className="text-[var(--cyan)]">
                            HEAD → {j.branch}
                          </span>
                        </div>
                      </div>
                      {i === 0 && (
                        <span className="ml-auto px-1.5 py-0.5 bg-[var(--accent)]/15 text-[var(--accent)] text-[10px] border border-[var(--border-accent)] rounded">
                          HEAD
                        </span>
                      )}
                    </div>

                    <div className="p-4 sm:p-5 space-y-3">
                      <div>
                        <h3 className="text-base font-bold text-white leading-tight">
                          {j.role}
                        </h3>
                        <div className="text-[var(--accent)] text-sm">
                          @ {j.company}
                        </div>
                        <div className="text-[10px] text-[var(--muted)] font-mono mt-0.5">
                          {j.years}
                        </div>
                      </div>

                      <ul className="space-y-1.5 text-xs text-[var(--muted)]">
                        {j.bullets.map((b, bi) => (
                          <li key={bi} className="flex gap-2">
                            <span className="text-[var(--green)] shrink-0 font-mono">
                              +
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5">
                        {j.tech.map((t) => (
                          <span key={t} className="tag">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-[var(--border-bright)] flex flex-wrap items-center gap-2 text-[10px] font-mono">
                        <span className="text-[var(--muted)]">
                          {j.files} files touched
                        </span>
                        <span className="ml-auto flex flex-wrap gap-1.5">
                          {j.kpis.map((kp) => (
                            <span
                              key={kp.label}
                              className="inline-flex items-baseline gap-1 px-2 py-0.5 border rounded-sm"
                              style={{
                                borderColor:
                                  kp.tone === "gold"
                                    ? "var(--border-gold)"
                                    : kp.tone === "green"
                                    ? "rgba(0,199,88,0.4)"
                                    : kp.tone === "blue"
                                    ? "rgba(48,128,255,0.4)"
                                    : "var(--border-accent)",
                                color:
                                  kp.tone === "gold"
                                    ? "var(--gold)"
                                    : kp.tone === "green"
                                    ? "var(--green)"
                                    : kp.tone === "blue"
                                    ? "var(--blue)"
                                    : "var(--accent)",
                                background: "rgba(255,255,255,0.02)",
                              }}
                            >
                              <span className="font-semibold tracking-wide">
                                {kp.value}
                              </span>
                              <span className="text-[var(--muted)] text-[9px]">
                                {kp.label}
                              </span>
                            </span>
                          ))}
                        </span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </div>
            );
          })}

          <div className="md:grid md:grid-cols-2 md:gap-8 relative">
            <div
              className="hidden md:block absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-dashed border-[var(--border-bright)]"
              style={{ background: "#0d0d0d" }}
            />
            <div className="md:col-start-2 glass-panel rounded-md">
              <div className="px-4 py-3 flex items-center gap-3 text-xs font-mono">
                <span className="text-[#ffcc00]">0000000</span>
                <span className="text-[var(--muted)]">
                  Initial Commit (Hello World)
                </span>
                <span className="ml-auto text-[var(--dim)]">2018</span>
              </div>
              <div className="border-t border-[var(--border-bright)] px-4 py-2.5 text-[11px] text-[var(--muted)] font-mono">
                <span className="text-white">B.S. Software Engineering</span>{" "}
                · IIU Islamabad
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
