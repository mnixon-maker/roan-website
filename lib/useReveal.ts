"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Animates every `[data-reveal]` descendant of `scope` into view on scroll.
 * Children with `[data-reveal-stagger]` on a parent animate in sequence.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      items.forEach((item) => {
        const delay = Number(item.dataset.revealDelay ?? 0);
        gsap.from(item, {
          opacity: 0,
          y: 34,
          duration: 0.95,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 86%",
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [scope]);
}
