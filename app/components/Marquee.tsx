const ITEMS = [
  "Government-grade platforms",
  "TAMM AI",
  "Real-time systems",
  "Microservices",
  "Edge deploys",
  "AI integration",
  "Zero-downtime",
  "9+ years",
  "Trusted by millions",
];

export default function Marquee() {
  const row = (
    <div className="flex items-center gap-12 px-6 shrink-0">
      {ITEMS.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-3">
          <span className="text-[var(--accent)] text-xs">●</span>
          <span className="text-sm uppercase tracking-[0.18em] text-[var(--muted)] font-mono">
            {it}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-label="Highlights"
      className="relative border-y border-white/10 bg-white/[0.025] backdrop-blur-xl backdrop-saturate-150 overflow-hidden py-4"
    >
      <div
        className="flex marquee-track"
        style={{ width: "max-content" }}
        aria-hidden
      >
        {row}
        {row}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--background)] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--background)] to-transparent"
      />
    </section>
  );
}
