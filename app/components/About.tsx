import Counter from "./Counter";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import Typewriter from "./Typewriter";

const status = [
  { k: "OPERATOR", v: "MUSTAFEEZ UR REHMAN", color: "text-white" },
  { k: "ROLE", v: "FULL_STACK_ARCHITECT", color: "text-[var(--accent)]" },
  { k: "LOCATION", v: "UAE / REMOTE", color: "text-white" },
  { k: "STATUS", v: "ONLINE", color: "text-[var(--green)]" },
];

const stats = [
  { v: "9+", l: "YRS", k: "EXPERIENCE", color: "var(--accent)" },
  { v: "700+", l: "REPOS", k: "MAINTAINED", color: "var(--blue)" },
  { v: "<10s", l: "DEPLOY", k: "ROLLOUT", color: "var(--green)" },
  { v: "∞", l: "CUPS", k: "CAFFEINE", color: "var(--accent-soft)" },
];

export default function About() {
  return (
    <section
      id="about"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 0%, rgba(254,110,0,0.06), transparent 60%)",
      }}
    >
      <SectionHeader hash="#" title="About.system" />

      <div className="grid lg:grid-cols-[280px_1fr] gap-4 mb-4 items-stretch">
        <div className="space-y-3 flex flex-col">
          <div className="glass-panel rounded-md" data-parallax="0.04">
            <div className="panel-header">
              <span className="tl-dot bg-[#fb2c36]" />
              <span className="tl-dot bg-[#ffcc00]" />
              <span className="tl-dot bg-[#00c758]" />
              <span className="ml-3 text-[11px]">profile.img</span>
            </div>
            <div className="p-5 flex flex-col items-center text-center gap-3">
              <div className="relative w-36 h-36">
                {/* corner crosshair brackets */}
                <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)] opacity-70" />
                <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)] opacity-70" />
                <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--accent)] opacity-70" />
                <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--accent)] opacity-70" />

                {/* rotating rings + orbit dots */}
                <svg
                  className="absolute inset-1 w-[calc(100%-0.5rem)] h-[calc(100%-0.5rem)]"
                  viewBox="0 0 100 100"
                  fill="none"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="avatar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fe6e00" />
                      <stop offset="55%" stopColor="#ff5c8a" />
                      <stop offset="100%" stopColor="#3080ff" />
                    </linearGradient>
                    <radialGradient id="avatar-core" cx="30%" cy="30%" r="80%">
                      <stop offset="0%" stopColor="rgba(254,110,0,0.35)" />
                      <stop offset="60%" stopColor="rgba(20,20,22,0.95)" />
                      <stop offset="100%" stopColor="rgba(10,10,12,1)" />
                    </radialGradient>
                  </defs>

                  {/* outer dashed ring — slow CCW */}
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="360 50 50"
                      to="0 50 50"
                      dur="22s"
                      repeatCount="indefinite"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      stroke="var(--accent)"
                      strokeOpacity="0.4"
                      strokeWidth="0.6"
                      strokeDasharray="2 3"
                    />
                  </g>

                  {/* orbit dots ring — CW */}
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 50 50"
                      to="360 50 50"
                      dur="14s"
                      repeatCount="indefinite"
                    />
                    {Array.from({ length: 16 }).map((_, i) => {
                      const a = (i / 16) * Math.PI * 2 - Math.PI / 2;
                      const cx = 50 + Math.cos(a) * 44;
                      const cy = 50 + Math.sin(a) * 44;
                      const big = i % 4 === 0;
                      return (
                        <circle
                          key={i}
                          cx={cx}
                          cy={cy}
                          r={big ? 1.4 : 0.7}
                          fill="url(#avatar-grad)"
                          opacity={big ? 1 : 0.55}
                        />
                      );
                    })}
                  </g>

                  {/* inner core disc */}
                  <circle cx="50" cy="50" r="36" fill="url(#avatar-core)" />
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="none"
                    stroke="url(#avatar-grad)"
                    strokeWidth="1.2"
                    opacity="0.9"
                  />

                  {/* monogram MR */}
                  <text
                    x="50"
                    y="62"
                    textAnchor="middle"
                    fontSize="34"
                    fontWeight="800"
                    fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
                    fill="url(#avatar-grad)"
                    letterSpacing="-2"
                  >
                    MR
                  </text>
                </svg>

                {/* online status dot */}
                <span className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-[var(--green)] border-2 border-[var(--bg-2)] status-pulse z-10" />
              </div>
              <div>
                <div className="text-white text-sm font-bold">
                  Mustafeez Ur Rehman
                </div>
                <div className="text-[11px] text-[var(--accent)] mt-0.5">
                  Full Stack Architect
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-md">
            <div className="panel-header">
              <span>SYSTEM_INFO</span>
            </div>
            <div className="p-3.5 space-y-1.5 text-[11px]">
              {status.map((s) => (
                <div key={s.k} className="flex justify-between gap-2">
                  <span className="text-[var(--muted)]">{s.k}</span>
                  <span className={s.color}>
                    {s.k === "STATUS" && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--green)] mr-1.5 align-middle" />
                    )}
                    {s.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-md flex flex-col">
          <div className="panel-header">
            <span className="tl-dot bg-[#fb2c36]" />
            <span className="tl-dot bg-[#ffcc00]" />
            <span className="tl-dot bg-[#00c758]" />
            <span className="ml-3 text-[11px]">user_profile.log</span>
          </div>
          <div className="p-5 sm:p-6 space-y-5 text-sm leading-relaxed flex-1">
            <div>
              <div className="text-[var(--accent)] font-mono text-xs mb-1.5">
                <Typewriter text="➜ whoami" startDelay={0} speed={32} />
              </div>
              <Reveal delay={500}>
                <p className="text-[var(--foreground)]">
                  I&apos;m a Senior Full Stack Engineer with 9+ years building
                  and scaling{" "}
                  <span className="text-[var(--accent)]">
                    government-grade platforms
                  </span>{" "}
                  used by millions across the UAE. My architecture is built on
                  clean code, performance optimization, and shipping fast
                  without compromising stability.
                </p>
              </Reveal>
            </div>
            <div>
              <div className="text-[var(--accent)] font-mono text-xs mb-1.5">
                <Typewriter
                  text="➜ cat mission.txt"
                  startDelay={1000}
                  speed={32}
                />
              </div>
              <Reveal delay={1700}>
                <p className="text-[var(--foreground)]">
                  Translating complex government workflows into{" "}
                  <span className="text-[var(--accent)]">one-click</span>{" "}
                  citizen experiences. Currently focused on{" "}
                  <span className="text-white">Microservices</span>,{" "}
                  <span className="text-white">Real-time Systems</span>, and{" "}
                  <span className="text-white">AI Integration</span> on the
                  TAMM platform.
                </p>
              </Reveal>
            </div>
            <div>
              <div className="text-[var(--accent)] font-mono text-xs mb-1.5">
                <Typewriter
                  text="➜ uname -a"
                  startDelay={2400}
                  speed={32}
                />
              </div>
              <Reveal delay={3000}>
                <p className="text-[var(--muted)] text-xs font-mono">
                  Mustafeez 9.0.1 #full-stack #ai-ml SMP UAE x86_64
                  GNU/Engineer
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <Reveal
            key={s.k}
            delay={i * 80}
            className="glass-panel luxe-card rounded-md p-4 flex items-center justify-between gap-3 group"
          >
            <div>
              <div className="text-[10px] text-[var(--muted)] tracking-wider">
                {s.k}
              </div>
              <div className="text-3xl font-bold mt-0.5" style={{ color: s.color }}>
                <Counter value={s.v} />
                <span className="text-xs text-[var(--muted)] ml-1 font-normal">
                  {s.l}
                </span>
              </div>
            </div>
            <div
              className="w-10 h-10 rounded-full border flex items-center justify-center text-lg"
              style={{ borderColor: s.color, color: s.color }}
            >
              {iconFor(s.k)}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function iconFor(k: string) {
  switch (k) {
    case "EXPERIENCE":
      return "⏱";
    case "MAINTAINED":
      return "⚙";
    case "ROLLOUT":
      return "▲";
    case "CAFFEINE":
      return "☕";
    default:
      return "●";
  }
}
