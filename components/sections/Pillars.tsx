"use client";

import { useRef, useState } from "react";
import { useReveal } from "@/lib/useReveal";

const PILLARS = [
  {
    key: "liver",
    label: "Liver",
    ph: "ph-copper",
    tag: "Grass-fed beef liver",
    title: "Nature's multivitamin",
    body: "Densely packed with bioavailable vitamin A, B12, copper, and folate — the nutrients modern diets quietly run low on.",
    stats: [
      ["Vitamin A", "Retinol form"],
      ["Vitamin B12", "Energy + nerves"],
      ["Copper", "Iron metabolism"],
    ],
  },
  {
    key: "heart",
    label: "Heart",
    ph: "ph-deep",
    tag: "Grass-fed beef heart",
    title: "The recovery organ",
    body: "One of the richest natural sources of CoQ10 — fuel for the mitochondria that power muscle, stamina, and a steady heartbeat.",
    stats: [
      ["CoQ10", "Cellular energy"],
      ["Collagen", "Connective tissue"],
      ["Selenium", "Antioxidant"],
    ],
  },
  {
    key: "kidney",
    label: "Kidney",
    ph: "ph-pasture",
    tag: "Grass-fed beef kidney",
    title: "The filter, refined",
    body: "A standout source of selenium and B-vitamins that support detoxification and the body's own enzymatic balance.",
    stats: [
      ["Selenium", "Thyroid support"],
      ["Riboflavin", "Metabolism"],
      ["DAO enzyme", "Histamine balance"],
    ],
  },
  {
    key: "spleen",
    label: "Spleen",
    ph: "ph-meadow",
    tag: "Grass-fed beef spleen",
    title: "The iron reserve",
    body: "Among the most concentrated whole-food sources of heme iron, paired with peptides that support a resilient immune response.",
    stats: [
      ["Heme iron", "Highly absorbable"],
      ["Vitamin B12", "Red blood cells"],
      ["Tuftsin", "Immune peptide"],
    ],
  },
];

export default function Pillars() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [active, setActive] = useState(0);
  const p = PILLARS[active];

  return (
    <section className="pillars" id="blend" ref={ref}>
      <div className="wrap">
        <header className="pillars-head">
          <span className="eyebrow" data-reveal>
            What&apos;s inside
          </span>
          <h2 className="h2" data-reveal data-reveal-delay="0.06">
            Four organs.{" "}
            <span className="accent">Nothing else.</span>
          </h2>
          <p className="body pillars-sub" data-reveal data-reveal-delay="0.12">
            No fillers, no flow agents, no synthetic isolates. Just whole
            freeze-dried organs in a bovine-gelatin capsule.
          </p>
        </header>

        <div className="segmented" data-reveal data-reveal-delay="0.16">
          {PILLARS.map((item, i) => (
            <button
              key={item.key}
              className={`segmented-btn${i === active ? " is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="pillars-stage" data-reveal data-reveal-delay="0.2">
          <div className={`pillars-visual ph ${p.ph}`} key={p.ph}>
            <span className="ph-tag">{p.tag}</span>
          </div>
          <div className="pillars-copy" key={p.key}>
            <h3 className="h3">{p.title}</h3>
            <p className="body">{p.body}</p>
            <ul className="pillars-stats">
              {p.stats.map(([k, v]) => (
                <li key={k}>
                  <span className="stat-k">{k}</span>
                  <span className="stat-v">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
