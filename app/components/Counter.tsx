"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  durationMs?: number;
  className?: string;
  style?: React.CSSProperties;
};

// Parses a string like "9+", "700+", "<10s", "∞" into {prefix, number, suffix}
function parseValue(v: string) {
  const m = v.match(/^(\D*?)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return { prefix: v, number: null as number | null, suffix: "" };
  return {
    prefix: m[1] ?? "",
    number: Number(m[2]),
    suffix: m[3] ?? "",
  };
}

export default function Counter({
  value,
  durationMs = 1400,
  className,
  style,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState<string>(() => {
    const p = parseValue(value);
    return p.number == null ? value : `${p.prefix}0${p.suffix}`;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parsed = parseValue(value);
    if (parsed.number == null) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    let started = false;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || started) return;
          started = true;
          obs.disconnect();
          const start = performance.now();
          const ease = (t: number) => 1 - Math.pow(1 - t, 3);
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / durationMs);
            const cur = parsed.number! * ease(t);
            const formatted =
              parsed.number! % 1 === 0
                ? Math.floor(cur).toString()
                : cur.toFixed(1);
            setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}
