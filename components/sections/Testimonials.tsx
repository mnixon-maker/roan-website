"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";

const QUOTES = [
  {
    quote:
      "Three weeks in and my afternoon energy crash is just… gone. I didn't expect to feel it this fast.",
    name: "Marcus T.",
    role: "Rancher, Montana",
  },
  {
    quote:
      "I've tried every greens powder and collagen on the shelf. This is the first thing my bloodwork actually responded to.",
    name: "Dr. Lena P.",
    role: "Family physician",
  },
  {
    quote:
      "Knowing it comes from one ranch — not a blend of twelve countries — is the whole reason I switched.",
    name: "Will & Sara K.",
    role: "Crossfit coaches",
  },
  {
    quote:
      "Recovery between training days is noticeably better. The heart capsules are the real deal.",
    name: "Diego R.",
    role: "Trail ultrarunner",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section className="testimonials" ref={ref}>
      <div className="wrap">
        <header className="testimonials-head">
          <span className="eyebrow" data-reveal>
            Field notes
          </span>
          <h2 className="h2" data-reveal data-reveal-delay="0.06">
            Ranch-tested.{" "}
            <span className="accent">People-approved.</span>
          </h2>
        </header>

        <div className="testimonials-grid">
          {QUOTES.map((q, i) => (
            <figure
              className="quote-card"
              key={i}
              data-reveal
              data-reveal-delay={0.08 + i * 0.05}
            >
              <blockquote>“{q.quote}”</blockquote>
              <figcaption>
                <span className="quote-name">{q.name}</span>
                <span className="quote-role">{q.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
