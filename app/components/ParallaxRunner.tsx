"use client";

import { useEffect } from "react";

export default function ParallaxRunner() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    );
    if (!els.length) return;

    let raf = 0;
    let velocity = 0;
    let lastY = window.scrollY;

    const avatar = document.querySelector<HTMLElement>(".scroll-avatar");

    const tick = () => {
      const y = window.scrollY;
      velocity = (y - lastY) * 0.6 + velocity * 0.4;
      lastY = y;
      const vh = window.innerHeight;

      for (const el of els) {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - vh / 2;
        const speed = parseFloat(el.dataset.parallax || "0.15");
        const tilt = el.dataset.tilt === "true" ? velocity * 0.04 : 0;
        const offset = -center * speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0) skewY(${tilt.toFixed(3)}deg)`;
      }

      if (avatar) {
        const rot = Math.max(-6, Math.min(6, velocity * 0.4));
        avatar.style.transform = `rotate(${rot.toFixed(2)}deg)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}
