"use client";

import { useEffect, useState } from "react";
import Signature from "../Signature";

const NAV = [
  { label: "The blend", href: "#features" },
  { label: "Real people", href: "#people" },
  { label: "The numbers", href: "#numbers" },
];

export default function V2Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
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
    if (lenis) lenis.scrollTo(el as Element, { offset: -90 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className={`v2-header${solid ? " is-solid" : ""}`}>
        <div className="v2-header-inner">
          <button
            className="v2-brand"
            onClick={() => go("#top")}
            aria-label="Roan home"
          >
            <Signature className="v2-brand-mark" tone="#f4efe4" />
          </button>

          <nav className="v2-nav" aria-label="Primary">
            {NAV.map((n) => (
              <button key={n.href} onClick={() => go(n.href)}>
                {n.label}
              </button>
            ))}
          </nav>

          <div className="v2-header-actions">
            <button
              className="v2-btn v2-btn-cream v2-header-cta"
              onClick={() => go("#sample")}
            >
              Get a sample
            </button>
            <button
              className="v2-menu-toggle"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`v2-drawer${open ? " is-open" : ""}`}>
        <button
          className="v2-drawer-scrim"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
        <div className="v2-drawer-panel" role="dialog" aria-modal="true">
          <button
            className="v2-drawer-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
          <nav className="v2-drawer-nav">
            {NAV.map((n) => (
              <button key={n.href} onClick={() => go(n.href)}>
                {n.label}
              </button>
            ))}
          </nav>
          <button
            className="v2-btn v2-btn-cream v2-drawer-cta"
            onClick={() => go("#sample")}
          >
            Get a sample →
          </button>
        </div>
      </div>
    </>
  );
}
