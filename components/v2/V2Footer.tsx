"use client";

import Signature from "../Signature";

const COLS = [
  { title: "Product", links: ["The blend", "Real people", "The numbers", "Samples"] },
  { title: "Ranch", links: ["Our story", "Bar W Ranch", "Sourcing", "Contact"] },
];

export default function V2Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-wrap v2-footer-inner">
        <div className="v2-footer-brand">
          <Signature className="v2-footer-mark" tone="#f4efe4" />
          <p className="v2-footer-tag">
            A grass-fed organ blend from a single family ranch in Wyoming. Born
            here, raised on our grass.
          </p>
          <a className="v2-footer-back" href="/">← Back to the original site</a>
        </div>

        <nav className="v2-footer-cols">
          {COLS.map((col) => (
            <div className="v2-footer-col" key={col.title}>
              <span className="v2-footer-col-title">{col.title}</span>
              {col.links.map((label) => (
                <button key={label}>{label}</button>
              ))}
            </div>
          ))}
        </nav>
      </div>

      <div className="v2-wrap v2-footer-bottom">
        <span>© {new Date().getFullYear()} Roan · Bar W Ranch</span>
        <span className="v2-footer-fine">
          These statements have not been evaluated by the FDA. This product is
          not intended to diagnose, treat, cure, or prevent any disease.
        </span>
      </div>
    </footer>
  );
}
