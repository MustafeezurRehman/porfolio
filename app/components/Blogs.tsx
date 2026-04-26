"use client";

import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import usePauseSvgOffScreen from "./usePauseSvgOffScreen";

type Post = {
  title: string;
  date: string;
  read: string;
  excerpt: string;
  tags: string[];
  variant: "ai" | "deploy" | "mfe";
  color: string;
};

const posts: Post[] = [
  {
    title: "Shipping AI into Government Workflows: Lessons from TAMM",
    date: "2026-03-18",
    read: "8 min",
    excerpt:
      "How we wired LLMs into a citizen-facing platform without sacrificing reliability — intent classification, guardrails, and the boring infrastructure that made it possible.",
    tags: ["AI", "LangChain", "Production"],
    variant: "ai",
    color: "#fe6e00",
  },
  {
    title: "One-Click Deploys at Government Scale (<10s)",
    date: "2026-02-04",
    read: "6 min",
    excerpt:
      "Cutting deployment to under 10 seconds across hundreds of repositories without dropping a single request — the pipeline architecture, the rollback story, and the gotchas.",
    tags: ["DevOps", "AWS", "CI/CD"],
    variant: "deploy",
    color: "#3080ff",
  },
  {
    title: "Why We Picked Micro-Frontends (and When It Was a Mistake)",
    date: "2025-11-22",
    read: "10 min",
    excerpt:
      "Module Federation in production: independent deployments, shared design tokens, and the boundaries you should refuse to cross. With real numbers from a 60+ repo rollout.",
    tags: ["Architecture", "MFE", "Performance"],
    variant: "mfe",
    color: "#bd93f9",
  },
];

export default function Blogs() {
  return (
    <section
      id="blogs"
      className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 0%, rgba(189,147,249,0.04), transparent 60%)",
      }}
    >
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
            top: "10%",
            left: "12%",
            width: 340,
            height: 340,
            background:
              "radial-gradient(circle, rgba(254,110,0,0.42), transparent 65%)",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-25"
          style={{
            top: "30%",
            right: "10%",
            width: 320,
            height: 320,
            background:
              "radial-gradient(circle, rgba(48,128,255,0.42), transparent 65%)",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-25"
          style={{
            bottom: "12%",
            left: "30%",
            width: 380,
            height: 380,
            background:
              "radial-gradient(circle, rgba(189,147,249,0.45), transparent 65%)",
          }}
        />
      </div>

      <SectionHeader hash="$" title="ls -la ~/blogs" />

      <div className="grid md:grid-cols-3 gap-5">
        {posts.map((p, i) => {
          const col = i % 3; // 0 = left, 1 = middle, 2 = right
          const sideShadow =
            col === 0
              ? `-12px 0 24px -18px ${p.color}28`
              : col === 2
              ? `12px 0 24px -18px ${p.color}28`
              : `0 0 32px -16px ${p.color}1c`;
          return (
            <Reveal key={p.title} delay={i * 100}>
              <article
                className="glass-panel luxe-card rounded-md group overflow-hidden flex flex-col"
                style={{
                  border: "none",
                  boxShadow: sideShadow,
                }}
              >
            <div className="luxe-thumb">
              <BlogThumb variant={p.variant} color={p.color} />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-[10px] text-[var(--muted)] font-mono">
                <span className="text-[var(--accent)]">●</span>
                <span>{p.date}</span>
                <span className="text-[var(--dim)]">·</span>
                <span>{p.read} read</span>
              </div>
              <h3 className="mt-2 text-base font-bold text-white group-hover:text-[var(--accent)] leading-snug transition-colors">
                {p.title}
              </h3>
              <p className="mt-2 text-xs text-[var(--muted)] leading-relaxed flex-1">
                {p.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 bg-[var(--bg-3)] border border-[var(--border-bright)] text-[var(--muted)] rounded-full"
                  >
                    #{t}
                  </span>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--border-bright)] text-[11px] text-[var(--accent)] font-mono">
                read post →
              </div>
            </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="text-center mt-6 text-xs font-mono">
        <a href="#" className="text-[var(--muted)] hover:text-[var(--accent)]">
          View all posts →
        </a>
      </div>
    </section>
  );
}

function BlogThumb({ variant, color }: { variant: Post["variant"]; color: string }) {
  const wrapRef = usePauseSvgOffScreen<HTMLDivElement>();
  return (
    <div
      ref={wrapRef}
      className="aspect-[16/8] relative overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0) 45%, rgba(0,0,0,0.08)),
          linear-gradient(135deg, ${color}33, ${color}10 60%, ${color}08 100%)
        `,
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
      }}
    >
      <svg viewBox="0 0 320 160" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
        {variant === "ai" && (
          <g>
            <text x="20" y="40" fill={color} fontSize="14" fontFamily="monospace" opacity="0.85">
              {`>> AI`}
            </text>
            <text x="20" y="70" fill="#e6edf3" fontSize="22" fontFamily="monospace" fontWeight="700">
              llm.invoke()
            </text>
            <line x1="20" y1="86" x2="180" y2="86" stroke={color} strokeWidth="1" opacity="0.4" />
            <text x="20" y="108" fill={color} fontSize="11" fontFamily="monospace" opacity="0.7">
              prompt → guardrails → response
            </text>
            <circle cx="280" cy="80" r="34" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
            <circle cx="280" cy="80" r="20" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
            <circle cx="280" cy="80" r="6" fill={color} />
          </g>
        )}
        {variant === "deploy" && (
          <g>
            <text x="20" y="40" fill={color} fontSize="14" fontFamily="monospace" opacity="0.85">
              {`>> CI/CD`}
            </text>
            <text x="20" y="70" fill="#e6edf3" fontSize="22" fontFamily="monospace" fontWeight="700">
              deploy &lt;10s
            </text>
            {[40, 90, 140, 190, 240, 290].map((x, i) => (
              <g key={x}>
                <circle cx={x} cy={120} r="6" fill="#0d0d0d" stroke={color} strokeWidth="1.4" />
                {i < 5 && <line x1={x + 6} y1={120} x2={x + 44} y2={120} stroke={color} strokeWidth="1" opacity="0.6" />}
              </g>
            ))}
          </g>
        )}
        {variant === "mfe" && (
          <g>
            <text x="20" y="40" fill={color} fontSize="14" fontFamily="monospace" opacity="0.85">
              {`>> ARCH`}
            </text>
            <text x="20" y="70" fill="#e6edf3" fontSize="22" fontFamily="monospace" fontWeight="700">
              {"<MFE />"}
            </text>
            {[
              [16, 88, 90, 50],
              [110, 88, 90, 50],
              [206, 88, 100, 50],
            ].map(([x, y, w, h]) => (
              <rect
                key={x}
                x={x as number}
                y={y as number}
                width={w as number}
                height={h as number}
                fill={color}
                fillOpacity="0.1"
                stroke={color}
                strokeWidth="1"
                opacity="0.7"
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
