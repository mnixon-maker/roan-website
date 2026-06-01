"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";

export default function FeatureCards() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section className="v2-features" id="features" ref={ref}>
      <div className="v2-wrap">
        <header className="v2-sec-head">
          <span className="v2-eyebrow" data-reveal>What&apos;s inside</span>
          <h2 className="v2-h2" data-reveal data-reveal-delay="0.05">
            Four organs. <span className="v2-accent">Nothing else.</span>
          </h2>
        </header>

        <div className="v2-photogrid">
          <article className="v2-photocard v2-img v2-img-pasture" data-reveal>
            <div className="v2-photocard-content">
              <span className="v2-eyebrow">01 · Origin</span>
              <h3 className="v2-photocard-title">Born on our grass</h3>
              <p className="v2-photocard-body">
                Calves are born on the same Wyoming range their mothers grazed.
                Birth to bottle on one property — no feedlots, no transfers, no
                anonymous origin.
              </p>
            </div>
          </article>

          <article className="v2-photocard v2-img v2-img-deep" data-reveal data-reveal-delay="0.06">
            <div className="v2-photocard-content">
              <span className="v2-eyebrow">02 · The blend</span>
              <h3 className="v2-photocard-title">Whole-food, never isolated</h3>
              <p className="v2-photocard-body">
                Liver, heart, kidney and spleen — freeze-dried at low temperature
                so the vitamins stay bound to the cofactors that make them work.
              </p>
              <div className="v2-photocard-tags">
                <span>Vitamin A</span>
                <span>B12</span>
                <span>CoQ10</span>
                <span>Heme iron</span>
              </div>
            </div>
          </article>

          <article className="v2-photocard v2-photocard-wide v2-img v2-img-kitchen" data-reveal data-reveal-delay="0.1">
            <div className="v2-photocard-content">
              <span className="v2-eyebrow">03 · The chain</span>
              <h3 className="v2-photocard-title">No middlemen, by design</h3>
              <p className="v2-photocard-body">
                Milled, encapsulated and sealed inside the property line. From the
                pasture you can see to the bottle in your hand — traceable to a
                pasture and a season.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
