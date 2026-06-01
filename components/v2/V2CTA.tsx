"use client";

import { useRef, useState } from "react";
import { useReveal } from "@/lib/useReveal";

const COMPANY_ID = "U6j8yp";
const LIST_ID = "SxVpGW";

type Status = "idle" | "loading" | "done" | "error";

export default function V2CTA() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch(
        `https://a.klaviyo.com/client/subscriptions/?company_id=${COMPANY_ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            revision: "2024-10-15",
          },
          body: JSON.stringify({
            data: {
              type: "subscription",
              attributes: {
                profile: { data: { type: "profile", attributes: { email } } },
              },
              relationships: { list: { data: { type: "list", id: LIST_ID } } },
            },
          }),
        },
      );
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="v2-cta" id="sample" ref={ref}>
      <div className="v2-wrap">
        <div className="v2-cta-panel">
          <span className="v2-eyebrow v2-cta-eyebrow" data-reveal>
            Pilot program
          </span>
          <h2
            className="v2-display v2-cta-title"
            data-reveal
            data-reveal-delay="0.05"
          >
            Try Roan, on the ranch.
          </h2>
          <p className="v2-cta-lede" data-reveal data-reveal-delay="0.1">
            We&apos;re shipping a limited run of free samples to the first
            people who want to feel the difference whole-food organs make. No
            cost, no commitment — just your honest take.
          </p>

          <form
            className="v2-cta-form"
            onSubmit={onSubmit}
            data-reveal
            data-reveal-delay="0.15"
          >
            {status === "done" ? (
              <p className="v2-cta-success">
                You&apos;re on the list. We&apos;ll be in touch about your
                sample soon. 🐂
              </p>
            ) : (
              <>
                <div className="v2-cta-field">
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email address"
                  />
                  <button
                    type="submit"
                    className="v2-btn v2-btn-cream v2-btn-lg"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Sending…" : "Claim my sample →"}
                  </button>
                </div>
                {status === "error" && (
                  <p className="v2-cta-error">
                    Something went wrong. Please try again.
                  </p>
                )}
                <p className="v2-cta-fine">
                  Limited quantities. We&apos;ll only email you about the pilot.
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
