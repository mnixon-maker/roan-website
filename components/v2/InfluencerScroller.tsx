"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Post = {
  handle: string;
  meta: string;
  avatar: string; // ph variant
  photo: string; // ph variant
  caption: string;
  likes: string;
  comments: string;
  tag: string;
};

const POSTS: Post[] = [
  {
    handle: "marcus.lifts",
    meta: "Rancher · Montana",
    avatar: "v2-img-copper",
    photo: "v2-img-pasture",
    caption:
      "3 weeks of Roan and the 3pm crash is gone. Wild what one ranch can do 🐂",
    likes: "12.4k",
    comments: "318",
    tag: "Photo · post-ride, capsules in hand",
  },
  {
    handle: "drlena.p",
    meta: "Family physician",
    avatar: "v2-img-dusk",
    photo: "v2-img-golden",
    caption:
      "Tried every greens powder on the shelf. First thing my bloodwork actually responded to.",
    likes: "8,902",
    comments: "204",
    tag: "Photo · morning routine flatlay",
  },
  {
    handle: "willandsara",
    meta: "Crossfit coaches",
    avatar: "v2-img-meadow",
    photo: "v2-img-gym",
    caption:
      "One ranch, not twelve countries. That's the whole reason we switched 💪",
    likes: "21.1k",
    comments: "562",
    tag: "Photo · box session, jar on the bench",
  },
  {
    handle: "diego.runs",
    meta: "Trail ultrarunner",
    avatar: "v2-img-gym",
    photo: "v2-img-meadow",
    caption:
      "Recovery between training days is noticeably better. Heart caps = real deal.",
    likes: "15.7k",
    comments: "441",
    tag: "Photo · summit, golden hour",
  },
  {
    handle: "thefarmtable",
    meta: "Food + ancestral health",
    avatar: "v2-img-golden",
    photo: "v2-img-kitchen",
    caption: "Eating like my great-grandparents, minus the slaughter day. 🙌",
    likes: "33.8k",
    comments: "1,204",
    tag: "Photo · kitchen, jar styled on oak",
  },
  {
    handle: "coach.bea",
    meta: "Strength · Denver",
    avatar: "v2-img-deep",
    photo: "v2-img-dusk",
    caption:
      "Clients ask what changed. It's the organs. It's always the organs.",
    likes: "9,431",
    comments: "287",
    tag: "Photo · gym mirror, Roan in frame",
  },
];

function Heart() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 20.5 4.2 12.8a4.6 4.6 0 0 1 6.5-6.5l1.3 1.3 1.3-1.3a4.6 4.6 0 1 1 6.5 6.5L12 20.5Z"
        fill="#e0142c"
        stroke="#e0142c"
        strokeWidth="1.4"
      />
    </svg>
  );
}
function Bubble() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 5h16v11H9l-4 3v-3H4V5Z"
        stroke="#1c1611"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Share() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M22 3 11 14M22 3l-7 19-4-8-8-4 19-7Z"
        stroke="#1c1611"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function InfluencerScroller() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sec = section.current;
    const trk = track.current;
    if (!sec || !trk) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();

    // Desktop / tablet: pin the section and translate the track horizontally
    // as the user scrolls vertically (Cleo-style side-to-side).
    mm.add("(min-width: 760px)", () => {
      const distance = () => Math.max(0, trk.scrollWidth - window.innerWidth);

      const tween = gsap.to(trk, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (fill.current)
              fill.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(trk, { clearProps: "transform" });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="v2-inf" id="people" ref={section}>
      <div className="v2-inf-pin">
        <div className="v2-inf-head">
          <span className="v2-eyebrow">Real people · real plates</span>
          <h2 className="v2-h2">
            Roan, out
            <br />
            in the wild.
          </h2>
          <p className="v2-inf-sub">
            Ranchers, doctors, coaches and runners — posting their own. Keep
            scrolling to flip through the feed. →
          </p>
          <div className="v2-inf-progress">
            <span className="v2-inf-progress-fill" ref={fill} />
          </div>
        </div>

        <div className="v2-inf-track" ref={track}>
          {POSTS.map((p) => (
            <article className="v2-post" key={p.handle}>
              <header className="v2-post-top">
                <span className={`v2-post-avatar v2-img ${p.avatar}`} />
                <span className="v2-post-id">
                  <span className="v2-post-handle">@{p.handle}</span>
                  <span className="v2-post-meta">{p.meta}</span>
                </span>
                <button className="v2-post-follow">Follow</button>
              </header>

              <div className={`v2-post-photo v2-img ${p.photo}`}>
                <span className="ph-tag">{p.tag}</span>
                <span className="v2-post-tagged">📍 Roan · Bar W Ranch</span>
              </div>

              <div className="v2-post-actions">
                <div className="v2-post-actions-left">
                  <Heart />
                  <Bubble />
                  <Share />
                </div>
                <span className="v2-post-bookmark" aria-hidden="true">
                  ⌗
                </span>
              </div>

              <div className="v2-post-body">
                <span className="v2-post-likes">{p.likes} likes</span>
                <p className="v2-post-caption">
                  <strong>@{p.handle}</strong> {p.caption}
                </p>
                <span className="v2-post-comments">
                  View all {p.comments} comments
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
