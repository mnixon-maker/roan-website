"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * The /v2 page has no cinematic preloader, so it unlocks scroll itself:
 * removes the `is-loading` lock the root layout sets, flags `is-ready` so
 * reveal styles apply, and paints the body the espresso base colour to avoid
 * a cream flash on overscroll. Reverts the body colour on unmount.
 */
export default function V2Boot() {
  useEffect(() => {
    const prevBg = document.body.style.background;
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-ready");
    document.body.style.background = "#1c1611";
    // Let layout settle, then sync ScrollTrigger to final positions.
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      window.cancelAnimationFrame(id);
      document.body.style.background = prevBg;
    };
  }, []);

  return null;
}
