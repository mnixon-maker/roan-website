"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const go = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(el as Element, { offset: -80 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-inner wrap">
        <span className="eyebrow" data-reveal>Bar W Ranch · Wyoming</span>

        <h1 className="display hero-title" data-reveal data-reveal-delay="0.06">
          From our land.
          <br />
          <span className="accent">Into your strength.</span>
        </h1>

        <p className="lede hero-lede" data-reveal data-reveal-delay="0.14">
          Roan is a grass-fed organ blend from a single family ranch. Born here,
          raised on our grass, traceable to a pasture and a season.
        </p>

        <div className="hero-ctas" data-reveal data-reveal-delay="0.2">
          <button className="btn btn-primary" onClick={() => go("#sample")}>
            Request a sample →
          </button>
          <button className="btn btn-soft" onClick={() => go("#story")}>
            Read our story
          </button>
        </div>
      </div>

      <div className="hero-scroll" data-reveal data-reveal-delay="0.3">
        <span>Scroll</span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  );
}
