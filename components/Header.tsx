"use client";

import { useEffect, useState } from "react";
import Signature from "./Signature";

const NAV = [
  { label: "The Blend", href: "#blend" },
  { label: "Our Story", href: "#story" },
  { label: "Birth to Bottle", href: "#origin" },
  { label: "Samples", href: "#sample" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (t: Element, o?: object) => void };
      }
    ).__lenis;
    if (lenis) lenis.scrollTo(el as Element, { offset: -80 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className={`header${solid ? " is-solid" : ""}`}>
        <div className="header-inner wrap">
          <button
            className="brand"
            onClick={() => go("#top")}
            aria-label="Roan home"
          >
            <Signature className="brand-mark" tone="#c10016" />
          </button>

          <nav className="nav" aria-label="Primary">
            {NAV.map((n) => (
              <button key={n.href} onClick={() => go(n.href)}>
                {n.label}
              </button>
            ))}
          </nav>

          <div className="header-actions">
            <button
              className="btn btn-soft header-cta"
              onClick={() => go("#sample")}
            >
              Get a sample
            </button>
            <button
              className="menu-toggle"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer${open ? " is-open" : ""}`}>
        <button
          className="drawer-scrim"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
        <div className="drawer-panel" role="dialog" aria-modal="true">
          <button
            className="drawer-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
          <nav className="drawer-nav">
            {NAV.map((n) => (
              <button key={n.href} onClick={() => go(n.href)}>
                {n.label}
              </button>
            ))}
          </nav>
          <button
            className="btn btn-primary drawer-cta"
            onClick={() => go("#sample")}
          >
            Get a sample →
          </button>
        </div>
      </div>
    </>
  );
}
