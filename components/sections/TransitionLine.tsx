"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function TransitionLine() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.querySelectorAll<HTMLElement>(".tl-word").forEach((w) => {
        w.style.opacity = "1";
      });
      return;
    }

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".tl-word");
      gsap.set(words, { opacity: 0.16 });
      gsap.to(words, {
        opacity: 1,
        stagger: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "bottom 60%",
          scrub: true,
        },
      });
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  const line = "We didn't fix the supply chain. We deleted it.";
  const words = line.split(" ");

  return (
    <section className="transition" ref={ref}>
      <div className="wrap transition-inner">
        <p className="transition-line">
          {words.map((w, i) => (
            <span className="tl-word" key={i}>
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
