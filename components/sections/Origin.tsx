"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";
import { useEffect } from "react";

export default function Origin() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(".origin-jar", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".origin-bg", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section className="origin" id="origin" ref={ref}>
      <div className="origin-bg ph ph-meadow">
        <span className="ph-tag">Photo · Bar W pasture · golden hour</span>
      </div>

      <div className="origin-content wrap">
        <div className="origin-copy">
          <span className="eyebrow on-dark" data-reveal>Birth to bottle</span>
          <h2 className="h2 origin-title" data-reveal data-reveal-delay="0.06">
            Four steps.
            <br />
            One ranch.
          </h2>
          <p className="body origin-body" data-reveal data-reveal-delay="0.12">
            Most supplement supply chains pass through six companies on three
            continents. Ours doesn&apos;t leave the property line.
          </p>
        </div>

        <div className="origin-jar" data-reveal data-reveal-delay="0.1">
          <div className="jar">
            <div className="jar-lid" />
            <div className="jar-body">
              <span className="jar-script">Roan</span>
              <span className="jar-sub">Grass-fed organ blend</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
