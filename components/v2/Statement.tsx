"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";

export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section className="v2-statement" ref={ref}>
      <div className="v2-statement-inner">
        <p data-reveal>
          Most supplement supply chains pass through six companies on three
          continents. <span className="v2-soft">Ours doesn&apos;t leave the
          property line.</span>
        </p>
      </div>
    </section>
  );
}
