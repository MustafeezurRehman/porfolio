"use client";

import { useEffect, useRef } from "react";

/**
 * Pauses all SMIL animations inside an inline SVG when the wrapper element is
 * off-screen, and resumes when it scrolls back into view.
 *
 * Returns a ref to attach to a wrapper element that contains the SVG(s).
 * Every <svg> descendant inside that wrapper will be paused/unpaused via the
 * SVGSVGElement.pauseAnimations() / unpauseAnimations() methods.
 *
 * Saves real CPU time on cards that have many <animate> elements running
 * continuously even when scrolled past.
 */
export default function usePauseSvgOffScreen<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;

    const svgs = el.querySelectorAll<SVGSVGElement>("svg");

    const setPaused = (paused: boolean) => {
      svgs.forEach((svg) => {
        if (paused) {
          if (typeof svg.pauseAnimations === "function") svg.pauseAnimations();
        } else {
          if (typeof svg.unpauseAnimations === "function")
            svg.unpauseAnimations();
        }
      });
    };

    // Start paused; the observer will unpause on first intersection.
    setPaused(true);

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setPaused(!e.isIntersecting);
      },
      { rootMargin: "100px" },
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      setPaused(false);
    };
  }, []);

  return ref;
}
