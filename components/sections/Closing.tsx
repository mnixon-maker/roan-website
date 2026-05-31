"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";

export default function Closing() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(".closing-bg", {
        scale: 1.12,
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

  const go = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(el as Element, { offset: -80 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="closing" ref={ref}>
      <div className="closing-bg ph ph-dusk" />
      <div className="closing-scrim" />
      <div className="wrap closing-inner">
        <span className="eyebrow on-dark" data-reveal>
          One ranch, start to finish
        </span>
        <h2 className="display closing-title on-dark" data-reveal data-reveal-delay="0.06">
          Finally, an organ blend you can trace to a single{" "}
          <span className="accent">pasture.</span>
        </h2>
        <div className="closing-ctas" data-reveal data-reveal-delay="0.14">
          <button className="btn btn-primary" onClick={() => go("#sample")}>
            Request a sample →
          </button>
          <button className="btn btn-ghost on-dark" onClick={() => go("#blend")}>
            See what&apos;s inside
          </button>
        </div>
      </div>
    </section>
  );
}
