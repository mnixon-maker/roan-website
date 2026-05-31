"use client";

import Signature from "./Signature";

const COLS = [
  {
    title: "Product",
    links: [
      ["The Blend", "#blend"],
      ["Birth to Bottle", "#origin"],
      ["Samples", "#sample"],
      ["FAQ", "#faq"],
    ],
  },
  {
    title: "Ranch",
    links: [
      ["Our Story", "#story"],
      ["Bar W Ranch", "#origin"],
      ["Sourcing", "#blend"],
      ["Contact", "#sample"],
    ],
  },
];

export default function Footer() {
  const go = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(el as Element, { offset: -80 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <Signature className="footer-mark" tone="#f4f2ec" />
          <p className="footer-tag">
            A grass-fed organ blend from a single family ranch in Wyoming. Born
            here, raised on our grass.
          </p>
        </div>

        <nav className="footer-cols">
          {COLS.map((col) => (
            <div className="footer-col" key={col.title}>
              <span className="footer-col-title">{col.title}</span>
              {col.links.map(([label, href]) => (
                <button key={label} onClick={() => go(href)}>
                  {label}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </div>

      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} Roan · Bar W Ranch</span>
        <span className="footer-fine">
          These statements have not been evaluated by the FDA. This product is
          not intended to diagnose, treat, cure, or prevent any disease.
        </span>
      </div>
    </footer>
  );
}
