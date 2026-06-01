"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";

const STATS = [
  ["1", "family ranch, start to finish"],
  ["4", "whole organs, nothing else"],
  ["0", "fillers, flow agents or isolates"],
  ["100%", "traceable to a pasture"],
];

export default function StatBand() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section className="v2-numbers" id="numbers" ref={ref}>
      <div className="v2-wrap">
        <div className="v2-numbers-grid">
          {STATS.map(([n, label], i) => (
            <div className="v2-stat" key={n + label} data-reveal data-reveal-delay={i * 0.06}>
              <span className="v2-stat-n">{n}</span>
              <span className="v2-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
