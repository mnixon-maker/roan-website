"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";

type Card = {
  ph: string;
  tag: string;
  title: string;
  body: string;
};

export default function TwoUp({ id, cards }: { id?: string; cards: [Card, Card] }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section className="twoup" id={id} ref={ref}>
      <div className="twoup-grid">
        {cards.map((c, i) => (
          <article className={`twoup-card ph ${c.ph}`} key={i} data-reveal data-reveal-delay={i * 0.08}>
            <span className="ph-tag">{c.tag}</span>
            <div className="twoup-text">
              <h3 className="h3">{c.title}</h3>
              <p>{c.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
