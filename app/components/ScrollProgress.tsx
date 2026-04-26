"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (ref.current) ref.current.style.width = `${pct.toFixed(2)}%`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] z-[55] pointer-events-none"
    >
      <div
        ref={ref}
        className="h-full"
        style={{
          width: "0%",
          background:
            "linear-gradient(90deg, var(--accent), var(--gold), var(--accent-soft))",
          boxShadow: "0 0 10px rgba(254,110,0,0.6)",
        }}
      />
    </div>
  );
}
