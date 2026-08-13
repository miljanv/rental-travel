"use client";

import { useEffect, useRef, useState } from "react";

type CounterProps = {
  value: number;
  suffix?: string;
  duration?: number;
  /** Render the number as-is (no count-up), e.g. for a year. */
  raw?: boolean;
};

export function Counter({
  value,
  suffix = "",
  duration = 1800,
  raw = false,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Starts at the final value so crawlers and no-JS visitors get the real
  // number; the count-up rewinds to zero once the observer is attached.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node || raw) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (!entry.isIntersecting) {
          setDisplay(0);
          return;
        }
        observer.disconnect();
        setDisplay(0);

        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          // ease-out cubic keeps the last digits from ticking too fast
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration, raw]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
