"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";

export default function LightStatement() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const go = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(el as Element, { offset: -90 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="v2-light" ref={ref}>
      <div className="v2-light-inner">
        <span className="v2-eyebrow" data-reveal>Why it works</span>
        <h2 className="v2-light-title" data-reveal data-reveal-delay="0.05">
          Real food, raised right. Your body <em>knows the difference.</em>
        </h2>
        <p className="v2-light-sub" data-reveal data-reveal-delay="0.1">
          Whole organs carry the vitamins, peptides and cofactors your body
          actually recognizes — delivered the way nature packaged them, not
          stripped down to a synthetic isolate.
        </p>
        <div className="v2-light-cta" data-reveal data-reveal-delay="0.15">
          <button className="v2-btn v2-btn-ink v2-btn-lg" onClick={() => go("#sample")}>
            Get a free sample →
          </button>
        </div>
      </div>
    </section>
  );
}
