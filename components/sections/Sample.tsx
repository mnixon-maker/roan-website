"use client";

import { useRef, useState } from "react";
import { useReveal } from "@/lib/useReveal";

const COMPANY_ID = "U6j8yp";
const LIST_ID = "SxVpGW";

type Status = "idle" | "loading" | "done" | "error";

export default function Sample() {
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
                profile: {
                  data: {
                    type: "profile",
                    attributes: { email },
                  },
                },
              },
              relationships: {
                list: { data: { type: "list", id: LIST_ID } },
              },
            },
          }),
        }
      );
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="sample" id="sample" ref={ref}>
      <div className="wrap sample-inner">
        <div className="sample-copy">
          <span className="eyebrow on-dark" data-reveal>
            Pilot program
          </span>
          <h2 className="h2 on-dark" data-reveal data-reveal-delay="0.06">
            Try Roan, <span className="accent">on us.</span>
          </h2>
          <p className="lede sample-lede" data-reveal data-reveal-delay="0.12">
            We&apos;re sending a limited run of samples to the first people who
            want to feel the difference whole-food organs make. No cost, no
            commitment — just your honest take.
          </p>

          <form className="sample-form" onSubmit={onSubmit} data-reveal data-reveal-delay="0.18">
            {status === "done" ? (
              <p className="sample-success">
                You&apos;re on the list. We&apos;ll be in touch about your sample
                soon.
              </p>
            ) : (
              <>
                <div className="sample-field">
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
                    className="btn btn-primary"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Sending…" : "Claim my sample →"}
                  </button>
                </div>
                {status === "error" && (
                  <p className="sample-error">
                    Something went wrong. Please try again.
                  </p>
                )}
                <p className="sample-fine">
                  Limited quantities. We&apos;ll only email you about the pilot.
                </p>
              </>
            )}
          </form>
        </div>

        <div className="sample-visual ph ph-golden" data-reveal data-reveal-delay="0.1">
          <span className="ph-tag">Photo · sample tin on weathered oak</span>
        </div>
      </div>
    </section>
  );
}
