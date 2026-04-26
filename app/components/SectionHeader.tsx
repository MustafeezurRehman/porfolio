import Reveal from "./Reveal";

export default function SectionHeader({
  hash,
  title,
  prompt,
  path,
}: {
  hash: string;
  title: string;
  prompt?: string;
  path?: string;
}) {
  // derive the terminal path from the title (e.g. "About.system" -> "~/portfolio/about.system")
  const inferred = `~/portfolio/${title.toLowerCase()}`;
  return (
    <Reveal className="mb-8 sm:mb-12">
      <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-[var(--dim)] tracking-wider mb-3">
        <span className="text-[var(--gold)]">$</span>
        <span className="text-[var(--muted)]">{path ?? inferred}</span>
        <span className="text-[var(--dim)]">·</span>
        <span className="text-[var(--green)]">●</span>
        <span>read-only</span>
      </div>
      <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-none tracking-tight">
        <span className="text-[var(--accent)] font-mono text-[0.5em] align-middle mr-3">
          {hash}
        </span>
        {title}
      </h2>
      {prompt && (
        <div className="mt-4 text-xs sm:text-sm font-mono text-[var(--muted)]">
          {prompt}
        </div>
      )}
      <div className="mt-5 section-rule" />
    </Reveal>
  );
}
