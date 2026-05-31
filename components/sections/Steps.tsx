"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";

const STEPS = [
  {
    no: "01",
    ph: "ph-pasture",
    tag: "Born here",
    title: "Born on open grass",
    body: "Calves are born on the same Wyoming range their mothers grazed. No feedlots, no transfers, no anonymous origin.",
  },
  {
    no: "02",
    ph: "ph-meadow",
    tag: "Raised slow",
    title: "Raised on our pasture",
    body: "Rotationally grazed across native grassland for a full life cycle. The way the land — and the animal — was meant to work.",
  },
  {
    no: "03",
    ph: "ph-copper",
    tag: "Harvested whole",
    title: "Harvested with care",
    body: "Organs are recovered fresh and freeze-dried at low temperature, locking in the nutrients heat would otherwise strip away.",
  },
  {
    no: "04",
    ph: "ph-stone",
    tag: "Bottled on site",
    title: "Bottled at the ranch",
    body: "Milled, encapsulated, and sealed within the property line. From the pasture you can see to the bottle in your hand.",
  },
];

export default function Steps() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section className="steps" id="story" ref={ref}>
      <div className="wrap">
        <header className="steps-head">
          <span className="eyebrow" data-reveal>
            The four steps
          </span>
          <h2 className="h2" data-reveal data-reveal-delay="0.06">
            Every bottle has the same{" "}
            <span className="accent">short story.</span>
          </h2>
        </header>

        <div className="steps-grid">
          {STEPS.map((s, i) => (
            <article
              className="step-card"
              key={s.no}
              data-reveal
              data-reveal-delay={0.08 + i * 0.06}
            >
              <div className={`step-photo ph ${s.ph}`}>
                <span className="step-no">{s.no}</span>
                <span className="ph-tag">{s.tag}</span>
              </div>
              <div className="step-text">
                <h3 className="h3">{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
