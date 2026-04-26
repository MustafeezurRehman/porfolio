"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  caret?: boolean;
};

export default function Typewriter({
  text,
  speed = 32,
  startDelay = 0,
  className = "",
  caret = true,
}: Props) {
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let interval: ReturnType<typeof setInterval> | null = null;
    const start = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        i += 1;
        setShown(i);
        if (i >= text.length && interval) {
          clearInterval(interval);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [started, text, speed, startDelay]);

  const done = shown >= text.length;
  return (
    <span ref={ref} className={className}>
      {text.slice(0, shown)}
      {caret && (
        <span
          className={`typewriter-caret ${done ? "typewriter-caret-done" : ""}`}
          aria-hidden
        >
          ▌
        </span>
      )}
    </span>
  );
}
