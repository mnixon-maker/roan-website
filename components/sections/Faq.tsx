"use client";

import { useRef, useState } from "react";
import { useReveal } from "@/lib/useReveal";

const ITEMS = [
  {
    q: "What exactly is in Roan?",
    a: "Four whole grass-fed organs — liver, heart, kidney, and spleen — freeze-dried and encapsulated in bovine gelatin. Nothing else: no fillers, flow agents, or synthetic vitamins.",
  },
  {
    q: "Where does it come from?",
    a: "Every animal is born, raised, and harvested on Bar W Ranch in Wyoming. The supplement is milled and bottled on the property, so each lot traces back to a specific pasture and season.",
  },
  {
    q: "How do I take it?",
    a: "Most people take four to six capsules a day with a meal. You can split them across the day or take them all at once — whatever fits your routine.",
  },
  {
    q: "Will I taste the organs?",
    a: "No. The capsules are odorless and tasteless going down. Freeze-drying preserves the nutrients without the strong flavor people associate with fresh liver.",
  },
  {
    q: "Is it third-party tested?",
    a: "Yes. Every batch is tested for heavy metals, microbials, and potency, and the certificate of analysis is available on request.",
  },
];

export default function Faq() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="faq" id="faq" ref={ref}>
      <div className="wrap faq-inner">
        <header className="faq-head">
          <span className="eyebrow" data-reveal>
            Questions
          </span>
          <h2 className="h2" data-reveal data-reveal-delay="0.06">
            The honest <span className="accent">answers.</span>
          </h2>
        </header>

        <div className="faq-list" data-reveal data-reveal-delay="0.1">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className={`faq-item${isOpen ? " is-open" : ""}`} key={i}>
                <button
                  className="faq-q"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span className="faq-icon" aria-hidden>
                    +
                  </span>
                </button>
                <div className="faq-a-wrap">
                  <p className="faq-a">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
