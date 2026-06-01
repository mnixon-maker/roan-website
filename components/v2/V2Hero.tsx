"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";

export default function V2Hero() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const go = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (t: Element, o?: object) => void };
      }
    ).__lenis;
    if (lenis) lenis.scrollTo(el as Element, { offset: -90 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="v2-hero" id="top" ref={ref}>
      <div className="v2-hero-vignette" aria-hidden="true" />

      <div className="v2-wrap v2-hero-inner">
        <span className="v2-eyebrow v2-hero-eyebrow" data-reveal>
          Bar W Ranch · Wyoming
        </span>

        <h1
          className="v2-display v2-hero-title"
          data-reveal
          data-reveal-delay="0.06"
        >
          Eat like the land intended.
        </h1>

        <div className="v2-hero-ctas" data-reveal data-reveal-delay="0.14">
          <button
            className="v2-btn v2-btn-cream v2-btn-lg"
            onClick={() => go("#sample")}
          >
            Get a free sample →
          </button>
          <button
            className="v2-btn v2-btn-line v2-btn-lg"
            onClick={() => go("#features")}
          >
            Why organs?
          </button>
        </div>
      </div>

      <div className="v2-hero-stage" data-reveal data-reveal-delay="0.1">
        <div className="v2-phone">
          <span className="v2-phone-notch" />
          <div className="v2-phone-screen">
            <div className="v2-mini-top">
              <span className="v2-mini-av v2-img v2-img-copper" />
              <span className="v2-mini-id">
                <b>marcus.lifts</b>
                <span>Bar W Ranch · Wyoming</span>
              </span>
            </div>
            <div className="v2-mini-photo v2-img v2-img-pasture">
              <span className="v2-mini-tag">
                📍 Roan · grass-fed organ blend
              </span>
            </div>
            <div className="v2-mini-acts">
              <span className="v2-mini-heart">♥</span>
              <span>💬</span>
              <span>➤</span>
            </div>
            <div className="v2-mini-cap">
              <b>12,408 likes</b>
              <p>
                <b>marcus.lifts</b> 3 weeks in and the 3pm crash is gone. Wild
                what one ranch can do 🐂
              </p>
            </div>
          </div>
        </div>

        <div className="v2-chip v2-chip-1">
          <span className="v2-chip-k">★ 4.9</span>
          <span className="v2-chip-v">2,100 reviews</span>
        </div>
        <div className="v2-chip v2-chip-2">
          <span className="v2-chip-k">1 ranch</span>
          <span className="v2-chip-v">0 middlemen</span>
        </div>
        <div className="v2-chip v2-chip-3">
          <span className="v2-chip-dot" /> Traceable to a pasture
        </div>
      </div>
    </section>
  );
}
