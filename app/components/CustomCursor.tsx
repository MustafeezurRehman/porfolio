"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const dot = dotRef.current;
      if (dot) dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      const target = e.target as HTMLElement | null;
      const ring = ringRef.current;
      if (!ring) return;
      ring.classList.remove("is-pointer", "is-text", "is-grab", "is-view");
      if (target?.closest("[data-cursor='view']")) {
        ring.classList.add("is-view");
      } else if (target?.closest("[data-cursor='grab'], .cursor-grab, .cursor-grabbing")) {
        ring.classList.add("is-grab");
      } else if (target?.closest("[data-cursor='text'], pre, code, input, textarea")) {
        ring.classList.add("is-text");
      } else if (
        target?.closest(
          "a, button, [role='button'], select, label, [data-cursor='hover']",
        )
      ) {
        ring.classList.add("is-pointer");
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      const ring = ringRef.current;
      if (ring) ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden>
        <svg
          className="cursor-glyph"
          viewBox="0 0 48 48"
          width="36"
          height="36"
          fill="none"
        >
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="none"
            stroke="var(--cursor-accent, var(--accent))"
            strokeOpacity="0.35"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <g className="sidebar-dots-orbit">
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
              const cx = 24 + Math.cos(a) * 22;
              const cy = 24 + Math.sin(a) * 22;
              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="1.6"
                  fill="var(--cursor-accent, var(--accent))"
                />
              );
            })}
          </g>
        </svg>
      </div>
    </>
  );
}
