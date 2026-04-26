"use client";

import usePauseSvgOffScreen from "./usePauseSvgOffScreen";

type Variant = "deploy" | "ai" | "ui" | "tools" | "crypto" | "mfe";

export default function ProjectThumb({
  variant,
  color,
}: {
  variant: Variant;
  color: string;
}) {
  const wrapRef = usePauseSvgOffScreen<HTMLDivElement>();
  return (
    <div
      ref={wrapRef}
      className="aspect-[16/8] relative overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0) 45%, rgba(0,0,0,0.08)),
          radial-gradient(160% 130% at 0% 0%, ${color}2b, ${color}0a 70%, transparent 100%),
          radial-gradient(180% 140% at 100% 100%, ${color}1f, ${color}08 70%, transparent 100%)
        `,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          maskImage:
            "linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent)",
        }}
      />

      <svg
        viewBox="0 0 320 160"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`stroke-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.15" />
            <stop offset="50%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id={`area-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`bar-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id={`hair-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.22" />
            <stop offset="50%" stopColor={color} stopOpacity="0.55" />
            <stop offset="100%" stopColor={color} stopOpacity="0.22" />
          </linearGradient>
          <radialGradient id={`glow-${variant}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.85" />
            <stop offset="35%" stopColor={color} stopOpacity="0.4" />
            <stop offset="70%" stopColor={color} stopOpacity="0.12" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`core-${variant}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="60%" stopColor={color} stopOpacity="0.55" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>

        {variant === "deploy" && <DeployArt color={color} variant={variant} />}
        {variant === "ai" && <AIArt color={color} variant={variant} />}
        {variant === "ui" && <UIArt color={color} variant={variant} />}
        {variant === "tools" && <ToolsArt color={color} variant={variant} />}
        {variant === "crypto" && <CryptoArt color={color} variant={variant} />}
        {variant === "mfe" && <MFEArt color={color} variant={variant} />}
      </svg>

      <div className="absolute top-2.5 left-3 right-3 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#fb2c36]" />
        <span className="w-2 h-2 rounded-full bg-[#ffcc00]" />
        <span className="w-2 h-2 rounded-full bg-[#00c758]" />
        <span className="ml-2 text-[9px] font-mono text-[var(--foreground)]/70 tracking-widest uppercase">
          {variantLabel(variant)}
        </span>
        <span className="ml-auto inline-flex items-center gap-1 text-[9px] font-mono text-[var(--green)]/80">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] status-pulse" />
          live
        </span>
      </div>

      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}55, transparent)`,
        }}
      />
    </div>
  );
}

function variantLabel(v: Variant) {
  return {
    deploy: "pipeline",
    ai: "ml.runtime",
    ui: "design.system",
    tools: "tooling",
    crypto: "exchange",
    mfe: "architecture",
  }[v];
}

/* ─── shared minimal primitives ─────────────────────────────────────────── */

function Stat({
  x,
  y,
  label,
  value,
  trend,
  color,
}: {
  x: number;
  y: number;
  label: string;
  value: string;
  trend?: string;
  color: string;
}) {
  return (
    <g>
      <text
        x={x}
        y={y}
        fontSize="6"
        fontFamily="monospace"
        fill={color}
        opacity="0.45"
        letterSpacing="1.6"
      >
        {label}
      </text>
      <text
        x={x}
        y={y + 18}
        fontSize="17"
        fontFamily="monospace"
        fontWeight="300"
        fill={color}
        opacity="0.92"
        letterSpacing="-0.4"
      >
        {value}
      </text>
      {trend && (
        <text
          x={x}
          y={y + 30}
          fontSize="6"
          fontFamily="monospace"
          fill={color}
          opacity="0.5"
          letterSpacing="1"
        >
          {trend}
        </text>
      )}
    </g>
  );
}

/* shared: a gradient glow pulse anchored at a point, peaking at fraction `at` of `cycle` */
function GradientPulse({
  cx,
  cy,
  at,
  variant,
  cycle,
  peak = 12,
  hold = 0.20,
  steady = false,
}: {
  cx: number;
  cy: number;
  at: number;
  variant: Variant;
  cycle: string;
  peak?: number;
  hold?: number;
  steady?: boolean;
}) {
  const before = Math.max(at - 0.02, 0);
  const after = Math.min(at + 0.06, 1);
  const tail = Math.min(at + hold, 1);
  const kt = `0;${before};${at};${after};${tail};1`;
  const haloOp = steady ? "0;0;1;0.7;0.45;0.45" : "0;0;1;0.55;0.18;0";
  const coreOp = steady ? "0;0;1;0.9;0.7;0.7" : "0;0;1;0.85;0.4;0";
  return (
    <g>
      <circle cx={cx} cy={cy} r="0" fill={`url(#glow-${variant})`} opacity="0">
        <animate
          attributeName="r"
          values={`1;1;${peak};${peak * 1.4};${peak * 0.7};${peak * 0.7}`}
          keyTimes={kt}
          dur={cycle}
          repeatCount="indefinite"
        />
        <animate attributeName="opacity" values={haloOp} keyTimes={kt} dur={cycle} repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r="0" fill={`url(#core-${variant})`} opacity="0">
        <animate
          attributeName="r"
          values={`0.6;0.6;${peak * 0.32};${peak * 0.26};${peak * 0.18};${peak * 0.18}`}
          keyTimes={kt}
          dur={cycle}
          repeatCount="indefinite"
        />
        <animate attributeName="opacity" values={coreOp} keyTimes={kt} dur={cycle} repeatCount="indefinite" />
      </circle>
    </g>
  );
}

/* ─── deploy ─── sequential stage rollout ───────────────────────────────── */
function DeployArt({ color, variant }: { color: string; variant: Variant }) {
  const stages = [
    { x: 158, label: "build" },
    { x: 200, label: "test" },
    { x: 242, label: "stage" },
    { x: 284, label: "prod" },
  ];
  // 6s cycle. Dot travels in 4 legs with brief holds. Each circle glows at arrival.
  // arrival keyTimes (fraction of 6s): 0.00, 0.18, 0.40, 0.62, 0.84
  const cycle = "6s";
  const arrival = [0, 0.18, 0.40, 0.62, 0.84];
  return (
    <g>
      <Stat x={22} y={56} label="ROLLOUT" value="<10s" trend="42× faster" color={color} />
      <Stat x={22} y={114} label="UPTIME" value="99.99%" trend="0 incidents" color={color} />

      {/* base track */}
      <line x1="156" y1="80" x2="286" y2="80" stroke={color} strokeOpacity="0.18" strokeWidth="0.8" />
      {/* progressive fill: grows leg-by-leg with the dot */}
      <line x1="156" y1="80" x2="156" y2="80" stroke={`url(#stroke-${variant})`} strokeWidth="1.2" strokeLinecap="round">
        <animate
          attributeName="x2"
          values="158;158;200;200;242;242;284;284;158"
          keyTimes="0;0.05;0.18;0.22;0.40;0.44;0.62;0.95;1"
          dur={cycle}
          repeatCount="indefinite"
        />
      </line>

      {stages.map((s, i) => {
        const t = arrival[i + 1] ?? arrival[i];
        const before = Math.max(t - 0.04, 0);
        const after = Math.min(t + 0.10, 1);
        const tail = Math.min(t + 0.22, 1);
        const glowKT = `0;${before};${t};${after};${tail};1`;
        return (
          <g key={s.label}>
            {/* soft gradient halo (matches theme accent) */}
            <circle cx={s.x} cy={80} r="0" fill={`url(#glow-${variant})`} opacity="0">
              <animate
                attributeName="r"
                values="2;2;14;18;10;10"
                keyTimes={glowKT}
                dur={cycle}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0;1;0.7;0.45;0.45"
                keyTimes={glowKT}
                dur={cycle}
                repeatCount="indefinite"
              />
            </circle>
            {/* outer ripple — gradient fill, fades as it expands */}
            <circle cx={s.x} cy={80} r="2" fill={`url(#glow-${variant})`} opacity="0">
              <animate
                attributeName="r"
                values="2;2;10;22;22;22"
                keyTimes={glowKT}
                dur={cycle}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0;0.8;0;0;0"
                keyTimes={glowKT}
                dur={cycle}
                repeatCount="indefinite"
              />
            </circle>
            {/* idle node ring */}
            <circle cx={s.x} cy={80} r="2.6" fill="#0a0a0a" stroke={color} strokeOpacity="0.5" strokeWidth="0.8">
              <animate
                attributeName="stroke-opacity"
                values="0.5;0.5;1;1;0.85;0.85"
                keyTimes={glowKT}
                dur={cycle}
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values="2.6;2.6;3.6;3;2.6;2.6"
                keyTimes={glowKT}
                dur={cycle}
                repeatCount="indefinite"
              />
            </circle>
            {/* gradient core that lights up on arrival */}
            <circle cx={s.x} cy={80} r="2.4" fill={`url(#core-${variant})`} opacity="0">
              <animate
                attributeName="opacity"
                values="0;0;1;0.85;0.7;0.7"
                keyTimes={glowKT}
                dur={cycle}
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values="1.6;1.6;3.2;2.6;2.2;2.2"
                keyTimes={glowKT}
                dur={cycle}
                repeatCount="indefinite"
              />
            </circle>
            <text x={s.x} y={98} textAnchor="middle" fontSize="5.5" fontFamily="monospace" fill={color} opacity="0.4" letterSpacing="1">
              {s.label}
              <animate
                attributeName="opacity"
                values="0.4;0.4;1;0.85;0.7;0.7"
                keyTimes={glowKT}
                dur={cycle}
                repeatCount="indefinite"
              />
            </text>
            {/* checkmark tick that appears after arrival on last stage */}
            {i === 3 && (
              <text
                x={s.x}
                y={72}
                textAnchor="middle"
                fontSize="6"
                fontFamily="monospace"
                fill={color}
                opacity="0"
              >
                ✓
                <animate
                  attributeName="opacity"
                  values="0;0;1;1;1;0"
                  keyTimes={glowKT}
                  dur={cycle}
                  repeatCount="indefinite"
                />
              </text>
            )}
          </g>
        );
      })}

      {/* traveling packet — pauses at each node */}
      <circle r="2" fill={color}>
        <animate
          attributeName="cx"
          values="158;158;200;200;242;242;284;284;158"
          keyTimes="0;0.05;0.18;0.22;0.40;0.44;0.62;0.95;1"
          dur={cycle}
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;1;1;1;1;1;1;0;0"
          keyTimes="0;0.05;0.18;0.22;0.40;0.44;0.62;0.95;1"
          dur={cycle}
          repeatCount="indefinite"
        />
        <animate
          attributeName="r"
          values="2;2;3.2;2;3.2;2;3.2;0;0"
          keyTimes="0;0.05;0.18;0.22;0.40;0.44;0.62;0.95;1"
          dur={cycle}
          repeatCount="indefinite"
        />
      </circle>

      {/* completion banner */}
      <text
        x={286}
        y={70}
        textAnchor="end"
        fontSize="5.5"
        fontFamily="monospace"
        fill={color}
        opacity="0"
        letterSpacing="1.5"
      >
        DEPLOYED
        <animate
          attributeName="opacity"
          values="0;0;0.85;0.85;0"
          keyTimes="0;0.62;0.66;0.92;1"
          dur={cycle}
          repeatCount="indefinite"
        />
      </text>
    </g>
  );
}

/* ─── ai ─── Gemini-style sparkle + Apple-Intelligence ring ─────────────── */
function AIArt({ color, variant }: { color: string; variant: Variant }) {
  const cycle = "6s";
  // 4-point AI sparkle (concave star) — the iconic "AI" mark
  const sparkle = (s: number) =>
    `M 0 ${-s} C 0 ${-s * 0.32} ${s * 0.32} ${-s * 0.32} ${s} 0 C ${s * 0.32} ${s * 0.32} 0 ${s * 0.32} 0 ${s} C 0 ${s * 0.32} ${-s * 0.32} ${s * 0.32} ${-s} 0 C ${-s * 0.32} ${-s * 0.32} 0 ${-s * 0.32} 0 ${-s} Z`;

  const sx = 178; // main sparkle center
  const sy = 88;
  const tammX = sx + 22; // wordmark left edge
  const tammY = sy + 8;

  return (
    <g>
      <Stat x={22} y={56} label="QUERIES" value="−40%" trend="manual ▼" color={color} />
      <Stat x={22} y={114} label="HALLUCIN." value="<0.1%" trend="guarded" color={color} />

      {/* aurora halo behind sparkle */}
      <circle cx={sx} cy={sy} r="0" fill={`url(#glow-${variant})`} opacity="0.55">
        <animate attributeName="r" values="22;30;26;32;22" dur={cycle} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.75;0.5;0.85;0.4" dur={cycle} repeatCount="indefinite" />
      </circle>

      {/* Apple-Intelligence-style rotating gradient rings */}
      <g>
        <circle
          cx={sx}
          cy={sy}
          r="24"
          fill="none"
          stroke={`url(#stroke-${variant})`}
          strokeWidth="1"
          strokeDasharray="46 110"
          strokeLinecap="round"
          opacity="0.85"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${sx} ${sy}`}
            to={`360 ${sx} ${sy}`}
            dur="5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx={sx}
          cy={sy}
          r="29"
          fill="none"
          stroke={`url(#stroke-${variant})`}
          strokeWidth="0.7"
          strokeDasharray="14 160"
          strokeLinecap="round"
          opacity="0.55"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`360 ${sx} ${sy}`}
            to={`0 ${sx} ${sy}`}
            dur="9s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* main 4-point sparkle — rotates and breathes */}
      <g transform={`translate(${sx} ${sy})`}>
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="8s"
            repeatCount="indefinite"
          />
          {/* soft outer glow shape */}
          <path d={sparkle(18)} fill={`url(#core-${variant})`} opacity="0.55">
            <animate attributeName="opacity" values="0.35;0.7;0.35" dur="3s" repeatCount="indefinite" />
          </path>
          {/* core filled sparkle */}
          <path d={sparkle(13)} fill={color}>
            <animate attributeName="opacity" values="0.9;1;0.9" dur="2.4s" repeatCount="indefinite" />
          </path>
          {/* inner highlight */}
          <path d={sparkle(6)} fill="#fff" opacity="0.45">
            <animate attributeName="opacity" values="0.25;0.6;0.25" dur="1.8s" repeatCount="indefinite" />
          </path>
        </g>
      </g>

      {/* satellite sparkles — twinkle in and out, rotate independently */}
      {[
        { x: sx - 26, y: sy - 24, s: 4, dur: 2.4, begin: 0 },
        { x: sx + 32, y: sy + 26, s: 3.2, dur: 2, begin: 0.6 },
        { x: sx - 14, y: sy + 28, s: 2.6, dur: 2.6, begin: 1.1 },
        { x: sx + 26, y: sy - 22, s: 2.2, dur: 1.8, begin: 1.6 },
      ].map((d, i) => (
        <g key={`sat-${i}`} transform={`translate(${d.x} ${d.y})`}>
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="180"
              dur={`${d.dur}s`}
              begin={`${d.begin}s`}
              repeatCount="indefinite"
            />
            <path d={sparkle(d.s)} fill={color} opacity="0">
              <animate
                attributeName="opacity"
                values="0;0.95;0"
                dur={`${d.dur}s`}
                begin={`${d.begin}s`}
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      ))}

      {/* TAMM wordmark to the right of the sparkle */}
      <text
        x={tammX}
        y={tammY}
        fontSize="22"
        fontWeight="800"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fill={color}
        letterSpacing="-0.8"
        opacity="0.92"
      >
        tamm
      </text>

      {/* AI gradient pill */}
      <rect x={tammX + 56} y={tammY - 14} width="22" height="13" rx="6.5" fill={`url(#core-${variant})`} />
      <rect x={tammX + 56} y={tammY - 14} width="22" height="13" rx="6.5" fill="none" stroke={color} strokeOpacity="0.85" strokeWidth="0.6" />
      <text
        x={tammX + 67}
        y={tammY - 4}
        textAnchor="middle"
        fontSize="8"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontWeight="800"
        fill="#0a0a0a"
        letterSpacing="0.5"
      >
        AI
      </text>

      {/* shimmer sweep across the wordmark on each cycle */}
      <rect x={tammX} y={tammY - 18} width="60" height="22" fill={`url(#hair-${variant})`} opacity="0">
        <animate attributeName="x" values={`${tammX - 60};${tammX + 60}`} dur={cycle} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.7;0" dur={cycle} repeatCount="indefinite" />
      </rect>
    </g>
  );
}

/* ─── ui ─── service-by-service migration ───────────────────────────────── */
function UIArt({ color, variant }: { color: string; variant: Variant }) {
  const bars = [56, 72, 48, 84, 64, 90, 78];
  const cycle = "6s";
  return (
    <g>
      <Stat x={22} y={56} label="PERF" value="+15%" trend="60+ repos" color={color} />
      <Stat x={22} y={114} label="VARIANTS" value="6" trend="from 38" color={color} />

      <line x1="152" y1="132" x2="296" y2="132" stroke={color} strokeOpacity="0.15" strokeWidth="0.4" />

      {bars.map((h, i) => {
        const x = 156 + i * 20;
        const y = 132 - h;
        const tStart = i * 0.08;
        const tFull = tStart + 0.06;
        const tFade = 0.85;
        const tZero = 0.93;
        const kt = `0;${tStart};${tFull};${tFade};${tZero};1`;
        return (
          <g key={i}>
            {/* faint base track */}
            <rect x={x} y={42} width="6" height="90" rx="1" fill={color} fillOpacity="0.06" />
            {/* gradient bar fills up sequentially */}
            <rect x={x} y={132} width="6" height="0" rx="1" fill={`url(#bar-${variant})`}>
              <animate
                attributeName="height"
                values={`0;0;${h};${h};0;0`}
                keyTimes={kt}
                dur={cycle}
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values={`132;132;${y};${y};132;132`}
                keyTimes={kt}
                dur={cycle}
                repeatCount="indefinite"
              />
            </rect>
          </g>
        );
      })}

      {/* single completion glow at the tallest (peak) bar once migration finishes */}
      <GradientPulse
        cx={156 + bars.indexOf(Math.max(...bars)) * 20 + 3}
        cy={132 - Math.max(...bars)}
        at={Math.max(...bars.map((_, i) => i * 0.08 + 0.06))}
        variant={variant}
        cycle={cycle}
        peak={14}
        hold={0.30}
        steady
      />

      {/* once all bars are up, banner fades in */}
      <text
        x={296}
        y={42}
        textAnchor="end"
        fontSize="5.5"
        fontFamily="monospace"
        fill={color}
        opacity="0"
        letterSpacing="1.5"
      >
        +15% LIGHTHOUSE
        <animate
          attributeName="opacity"
          values="0;0;0.9;0.9;0"
          keyTimes="0;0.6;0.66;0.85;1"
          dur={cycle}
          repeatCount="indefinite"
        />
      </text>
    </g>
  );
}

/* ─── tools ─── adoption wave rolling across heatmap ────────────────────── */
function ToolsArt({ color, variant }: { color: string; variant: Variant }) {
  const cols = 9;
  const rows = 5;
  const cycle = "6s";
  return (
    <g>
      <Stat x={22} y={56} label="SETUP" value="−50%" trend="ready 4.2s" color={color} />
      <Stat x={22} y={114} label="ADOPTERS" value="20+" trend="organic" color={color} />

      {Array.from({ length: cols * rows }).map((_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const x = 152 + c * 17;
        const y = 50 + r * 16;
        const seed = (c * 7 + r * 5 + 3) % 7;
        const baseOp = [0.04, 0.06, 0.10, 0.16, 0.22, 0.32, 0.45][seed];
        const peakOp = Math.min(baseOp + 0.45, 0.92);
        const tPeak = 0.06 + c * 0.07;
        const before = Math.max(tPeak - 0.04, 0);
        const after = Math.min(tPeak + 0.06, 1);
        const tail = Math.min(tPeak + 0.18, 1);
        const kt = `0;${before};${tPeak};${after};${tail};1`;
        return (
          <rect key={i} x={x} y={y} width="13" height="12" rx="1.5" fill={color} fillOpacity={baseOp}>
            <animate
              attributeName="fill-opacity"
              values={`${baseOp};${baseOp};${peakOp};${peakOp * 0.7};${baseOp};${baseOp}`}
              keyTimes={kt}
              dur={cycle}
              repeatCount="indefinite"
            />
          </rect>
        );
      })}

      {/* single trailing glow that travels with the wave front */}
      <circle cx={152} cy={50 + (rows * 16) / 2 - 2} r="0" fill={`url(#glow-${variant})`} opacity="0">
        <animate
          attributeName="cx"
          values={`${152 + 6.5};${152 + (cols - 1) * 17 + 6.5}`}
          keyTimes="0;0.7"
          dur={cycle}
          repeatCount="indefinite"
        />
        <animate
          attributeName="r"
          values="0;14;14;0"
          keyTimes="0;0.05;0.7;0.78"
          dur={cycle}
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;0.55;0.55;0"
          keyTimes="0;0.05;0.7;0.78"
          dur={cycle}
          repeatCount="indefinite"
        />
      </circle>

      <text
        x={296}
        y={42}
        textAnchor="end"
        fontSize="5.5"
        fontFamily="monospace"
        fill={color}
        opacity="0"
        letterSpacing="1.2"
      >
        +20 ADOPTERS
        <animate
          attributeName="opacity"
          values="0;0;0.9;0.9;0"
          keyTimes="0;0.7;0.75;0.92;1"
          dur={cycle}
          repeatCount="indefinite"
        />
      </text>
    </g>
  );
}

/* ─── crypto ─── tick stream → broadcast burst ──────────────────────────── */
function CryptoArt({ color, variant }: { color: string; variant: Variant }) {
  const points: [number, number][] = [
    [152, 100],
    [168, 92],
    [184, 96],
    [200, 78],
    [216, 84],
    [232, 66],
    [248, 72],
    [264, 56],
    [280, 62],
    [296, 44],
  ];
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]} ${p[1]}`).join(" ");
  const area = `${path} L296 130 L152 130 Z`;
  const cycle = "6s";
  const drawEnd = 0.55;
  return (
    <g>
      <Stat x={22} y={56} label="P99 LATENCY" value="12ms" trend="real-time" color={color} />
      <Stat x={22} y={114} label="CLIENTS" value="10k+" trend="concurrent" color={color} />

      <text x={152} y={42} fontSize="6" fontFamily="monospace" fill={color} opacity="0.4" letterSpacing="1.5">
        BTC/USD
      </text>
      <text x={296} y={42} textAnchor="end" fontSize="6.5" fontFamily="monospace" fill={color} opacity="0.4" letterSpacing="1">
        ▲ 12.4%
        <animate attributeName="opacity" values="0.4;0.4;0.95;0.95;0.4" keyTimes="0;0.6;0.65;0.92;1" dur={cycle} repeatCount="indefinite" />
      </text>

      <line x1="152" y1="130" x2="296" y2="130" stroke={color} strokeOpacity="0.12" strokeWidth="0.4" />

      {/* area builds with the line */}
      <path d={area} fill={`url(#area-${variant})`} opacity="0">
        <animate
          attributeName="opacity"
          values="0;0;0.9;0.9;0"
          keyTimes={`0;0.05;${drawEnd};0.92;1`}
          dur={cycle}
          repeatCount="indefinite"
        />
      </path>

      {/* progressive sparkline draw */}
      <path
        d={path}
        fill="none"
        stroke={`url(#stroke-${variant})`}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="100"
        strokeDasharray="100"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="100;0;0;100;100"
          keyTimes={`0;${drawEnd};0.92;0.96;1`}
          dur={cycle}
          repeatCount="indefinite"
        />
      </path>

      {/* broadcast burst from the final tick (10k clients fan-out) */}
      <GradientPulse cx={296} cy={44} at={0.62} variant={variant} cycle={cycle} peak={20} hold={0.30} steady />
      <circle cx={296} cy={44} r="2" fill="none" stroke={color} strokeOpacity="0">
        <animate attributeName="r" values="2;2;26;26" keyTimes="0;0.6;0.85;1" dur={cycle} repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0;0;0.7;0" keyTimes="0;0.6;0.7;0.85" dur={cycle} repeatCount="indefinite" />
      </circle>
      <circle cx={296} cy={44} r="2" fill="none" stroke={color} strokeOpacity="0">
        <animate attributeName="r" values="2;2;30;30" keyTimes="0;0.66;0.9;1" dur={cycle} repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0;0;0.5;0" keyTimes="0;0.66;0.78;0.9" dur={cycle} repeatCount="indefinite" />
      </circle>
    </g>
  );
}

/* ─── mfe ─── engine receives bundles, processes, ships combined output ── */
function MFEArt({ color, variant }: { color: string; variant: Variant }) {
  const shell = { x: 220, y: 90 };
  const remotes = [
    { x: 162, y: 54 },
    { x: 162, y: 90 },
    { x: 162, y: 126 },
    { x: 278, y: 60 },
    { x: 278, y: 120 },
  ];
  const cycle = "6s";

  const inStart = 0.04;
  const stagger = 0.07;
  const procStart = 0.50;
  const procMid = 0.62;
  const procEnd = 0.74;
  const outStart = 0.74;
  const outPeak = 0.82;
  const outEnd = 0.95;

  return (
    <g>
      <Stat x={22} y={56} label="TTFB" value="−40%" trend="suite-wide" color={color} />
      <Stat x={22} y={114} label="TEAMS" value="6" trend="independent" color={color} />

      {/* connection edges — wide soft glow tube + thin dashed flow on top */}
      {remotes.map((r, i) => (
        <g key={`l-${i}`}>
          <line
            x1={shell.x}
            y1={shell.y}
            x2={r.x}
            y2={r.y}
            stroke={color}
            strokeOpacity="0.10"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1={shell.x}
            y1={shell.y}
            x2={r.x}
            y2={r.y}
            stroke={color}
            strokeOpacity="0.55"
            strokeWidth="0.7"
            strokeDasharray="2 3"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-10"
              dur={`${1.6 + i * 0.2}s`}
              repeatCount="indefinite"
            />
          </line>
        </g>
      ))}

      {/* remote module nodes — gradient halo + ring + filled core */}
      {remotes.map((r, i) => (
        <g key={`n-${i}`}>
          <circle cx={r.x} cy={r.y} r="5" fill={`url(#glow-${variant})`} opacity="0.4" />
          <circle cx={r.x} cy={r.y} r="2.6" fill="#0a0a0a" stroke={color} strokeOpacity="0.85" strokeWidth="0.9" />
          <circle cx={r.x} cy={r.y} r="1.2" fill={color} fillOpacity="0.9" />
        </g>
      ))}

      {/* inbound bundles: each remote ships its package into the engine */}
      {remotes.map((r, i) => {
        const t0 = inStart + i * stagger;
        const t1 = t0 + 0.10;
        const kt = `0;${t0};${t1};${Math.min(t1 + 0.02, 1)};1`;
        return (
          <g key={`in-${i}`} opacity="0">
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`${r.x} ${r.y};${r.x} ${r.y};${shell.x} ${shell.y};${shell.x} ${shell.y};${shell.x} ${shell.y}`}
              keyTimes={kt}
              dur={cycle}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0;1;0;0"
              keyTimes={kt}
              dur={cycle}
              repeatCount="indefinite"
            />
            <rect x="-2.8" y="-2" width="5.6" height="4" rx="0.7" fill={color} />
            <line x1="-2.8" y1="0" x2="2.8" y2="0" stroke="#0a0a0a" strokeOpacity="0.5" strokeWidth="0.4" />
            <line x1="0" y1="-2" x2="0" y2="2" stroke="#0a0a0a" strokeOpacity="0.5" strokeWidth="0.4" />
          </g>
        );
      })}

      {/* dispatch flash on each remote when it ships */}
      {remotes.map((r, i) => {
        const tFire = inStart + i * stagger;
        return (
          <GradientPulse
            key={`fl-${i}`}
            cx={r.x}
            cy={r.y}
            at={tFire}
            variant={variant}
            cycle={cycle}
            peak={6}
            hold={0.04}
          />
        );
      })}

      {/* engine breathing rim — slow outer halo */}
      <circle cx={shell.x} cy={shell.y} r="14" fill="none" stroke={color} strokeOpacity="0" strokeWidth="0.5" strokeDasharray="1.5 3">
        <animate attributeName="r" values="13;16;13" dur="4s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.18;0.42;0.18" dur="4s" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="rotate" from={`0 ${shell.x} ${shell.y}`} to={`360 ${shell.x} ${shell.y}`} dur="14s" repeatCount="indefinite" />
      </circle>

      {/* engine — outer cog rotates, inner cog counter-rotates faster, sparks fly during processing */}
      <g transform={`translate(${shell.x} ${shell.y})`}>
        {/* outer rotating cog */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="8s"
            repeatCount="indefinite"
          />
          {Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={`tooth-${i}`}
              x="-1.4"
              y="-11"
              width="2.8"
              height="3.2"
              rx="0.4"
              fill={color}
              fillOpacity="0.9"
              transform={`rotate(${i * 45})`}
            />
          ))}
          <circle cx="0" cy="0" r="7.8" fill="#0a0a0a" stroke={color} strokeOpacity="0.9" strokeWidth="1" />
        </g>

        {/* inner counter-rotating gear */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360"
            to="0"
            dur="4s"
            repeatCount="indefinite"
          />
          {Array.from({ length: 6 }).map((_, i) => (
            <rect
              key={`itooth-${i}`}
              x="-0.8"
              y="-5.8"
              width="1.6"
              height="1.8"
              fill={color}
              fillOpacity="0.7"
              transform={`rotate(${i * 60})`}
            />
          ))}
          <circle cx="0" cy="0" r="3.8" fill="#0a0a0a" stroke={color} strokeOpacity="0.75" strokeWidth="0.7" />
        </g>

        {/* core gradient — brightens during processing */}
        <circle cx="0" cy="0" r="2.6" fill={`url(#core-${variant})`}>
          <animate
            attributeName="opacity"
            values={`0.55;0.55;1;1;0.55;0.55`}
            keyTimes={`0;${procStart};${procMid};${procEnd};${Math.min(procEnd + 0.04, 1)};1`}
            dur={cycle}
            repeatCount="indefinite"
          />
          <animate
            attributeName="r"
            values="2.4;2.4;3.4;3;2.4;2.4"
            keyTimes={`0;${procStart};${procMid};${procEnd};${Math.min(procEnd + 0.04, 1)};1`}
            dur={cycle}
            repeatCount="indefinite"
          />
        </circle>

        {/* swirling sparks inside the engine — visible only during processing */}
        {[0, 120, 240].map((startAngle, i) => (
          <g key={`spark-${i}`} transform={`rotate(${startAngle})`}>
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="1.4s"
                repeatCount="indefinite"
              />
              <circle cx="0" cy="-5" r="0.7" fill={color} opacity="0">
                <animate
                  attributeName="opacity"
                  values={`0;0;1;1;0;0`}
                  keyTimes={`0;${procStart};${procStart + 0.02};${procEnd - 0.02};${procEnd};1`}
                  dur={cycle}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        ))}
      </g>

      {/* engine processing halo — blooms while bundles are being combined */}
      <GradientPulse cx={shell.x} cy={shell.y} at={procMid} variant={variant} cycle={cycle} peak={26} hold={0.12} steady />

      {/* combined assembled output — emerges upward from the engine */}
      <g opacity="0">
        <animateTransform
          attributeName="transform"
          type="translate"
          values={`${shell.x} ${shell.y};${shell.x} ${shell.y};${shell.x} ${shell.y - 4};${shell.x} ${shell.y - 22};${shell.x} ${shell.y - 22};${shell.x} ${shell.y - 22}`}
          keyTimes={`0;${outStart};${outStart + 0.05};${outPeak};${outEnd};1`}
          dur={cycle}
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values={`0;0;1;1;0;0`}
          keyTimes={`0;${outStart};${outStart + 0.05};${outEnd - 0.04};${outEnd};1`}
          dur={cycle}
          repeatCount="indefinite"
        />
        {/* soft halo behind the assembled bundle */}
        <ellipse cx="0" cy="0" rx="14" ry="9" fill={`url(#glow-${variant})`} opacity="0.65" />
        {/* bundle body */}
        <rect x="-10" y="-7" width="20" height="14" rx="1.6" fill={color} fillOpacity="0.95" />
        <rect x="-10" y="-7" width="20" height="14" rx="1.6" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="0.6" />
        {/* corner brackets — premium accent */}
        <path d="M -10 -3.5 L -10 -7 L -6.5 -7" fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="0.5" />
        <path d="M 10 -3.5 L 10 -7 L 6.5 -7" fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="0.5" />
        <path d="M -10 3.5 L -10 7 L -6.5 7" fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="0.5" />
        <path d="M 10 3.5 L 10 7 L 6.5 7" fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="0.5" />
        {/* combined module dots — 5 modules merged */}
        {[-6, -3, 0, 3, 6].map((mx) => (
          <circle key={`mod-${mx}`} cx={mx} cy="-3" r="0.85" fill="#0a0a0a" fillOpacity="0.7" />
        ))}
        {/* checkmark glyph */}
        <path d="M -3 2.5 L -1 4.5 L 3.5 0" fill="none" stroke="#0a0a0a" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* "BUILT ✓" label with subtle accent dashes */}
      <g opacity="0">
        <animate
          attributeName="opacity"
          values={`0;0;0.95;0.95;0;0`}
          keyTimes={`0;${outPeak - 0.02};${outPeak};${outEnd - 0.04};${outEnd};1`}
          dur={cycle}
          repeatCount="indefinite"
        />
        <line x1={shell.x - 22} y1={shell.y - 34} x2={shell.x - 12} y2={shell.y - 34} stroke={color} strokeOpacity="0.5" strokeWidth="0.5" />
        <line x1={shell.x + 12} y1={shell.y - 34} x2={shell.x + 22} y2={shell.y - 34} stroke={color} strokeOpacity="0.5" strokeWidth="0.5" />
        <text
          x={shell.x}
          y={shell.y - 32}
          textAnchor="middle"
          fontSize="6"
          fontFamily="monospace"
          fontWeight="700"
          fill={color}
          letterSpacing="2"
        >
          BUILT
        </text>
      </g>

    </g>
  );
}
