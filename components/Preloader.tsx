"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Signature from "./Signature";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const unlock = () => {
      document.body.classList.remove("is-loading");
      document.body.classList.add("is-ready");
      const lenis = (window as unknown as { __lenis?: { scrollTo: (n: number, o?: object) => void } }).__lenis;
      lenis?.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    };

    if (prefersReduced) {
      unlock();
      setDone(true);
      return;
    }

    const trace = el.querySelector<SVGPathElement>(".sig-trace");
    const fill = el.querySelector<SVGPathElement>(".sig-fill");
    const sky = el.querySelector(".pl-sky");
    let len = 0;
    if (trace) {
      len = trace.getTotalLength();
      gsap.set(trace, { strokeDasharray: len, strokeDashoffset: len });
    }
    if (fill) gsap.set(fill, { opacity: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        unlock();
        setDone(true);
      },
    });

    tl.to(sky, { scale: 1.08, duration: 3.6, ease: "none" }, 0)
      .to(trace, { strokeDashoffset: 0, duration: 2.1, ease: "power1.inOut" }, 0.35)
      .to(fill, { opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.55")
      .to(trace, { opacity: 0, duration: 0.5 }, "<")
      .to(
        ".pl-tagline",
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )
      .to({}, { duration: 0.5 })
      .to(el, {
        yPercent: -100,
        duration: 1.1,
        ease: "power3.inOut",
      });

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="pl-sky" />
      <div className="pl-center">
        <Signature className="pl-sig" tone="#f4f2ec" traceable />
        <p className="pl-tagline">From our land, into your hands.</p>
      </div>
    </div>
  );
}
