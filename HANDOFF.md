# Roan website — build handoff

Status snapshot so the build can be picked up on another machine. Single-page
cinematic marketing site for **Roan** (grass-fed organ blend, Bar W Ranch).
Design north star: https://web.meetcleo.com/.

## Stack

- Next.js 15.1.6 (App Router) + React 19 + TypeScript
- GSAP 3.12.7 + ScrollTrigger (scroll-driven animation)
- Lenis (smooth scroll, synced to ScrollTrigger via `window.__lenis`)
- Plain global CSS with brand tokens (no Tailwind)
- Fonts: Hanken Grotesk (display/body) + JetBrains Mono (eyebrows)

## Run it

```bash
npm install
npm run dev
```

Dev server picks the first free port (3000 → 3001 → 3002…). Watch the console
line for the actual URL.

`npx tsc --noEmit` passes clean. Page compiles and serves 200 with no console
errors.

## What's built (all done this session)

Config: `package.json`, `tsconfig.json`, `next.config.mjs`, `next-env.d.ts`, `.gitignore`

Foundation:
- `app/globals.css` — brand tokens, reset, type scale, buttons, `.ph` photo-placeholder system
- `app/sections.css` — ALL component styles (one block per section, in document order) + responsive breakpoints at 980px / 680px
- `app/layout.tsx` — fonts as CSS vars, metadata, imports both stylesheets
- `app/page.tsx` — assembles the full page
- `lib/gsap.ts` — registers ScrollTrigger
- `lib/useReveal.ts` — `[data-reveal]` scroll-in hook

Components:
- `components/Signature.tsx` — inline Roan script logo (traceable variant for preloader draw-on)
- `components/SmoothScroll.tsx` — Lenis init, exposes `window.__lenis`
- `components/Preloader.tsx` — cinematic signature draw-on + curtain reveal, unlocks scroll
- `components/Header.tsx` — fixed header, solidifies on scroll, mobile drawer
- `components/Hero.tsx`
- `components/Footer.tsx`
- `components/sections/Origin.tsx` — dark, CSS-rendered jar, parallax
- `components/sections/TwoUp.tsx` — editorial photo pair
- `components/sections/TransitionLine.tsx` — scroll-scrubbed word-by-word headline
- `components/sections/Steps.tsx` — 4-up birth-to-bottle grid
- `components/sections/Pillars.tsx` — segmented control (Liver/Heart/Kidney/Spleen) with switching visual
- `components/sections/Testimonials.tsx`
- `components/sections/Sample.tsx` — Klaviyo sample-signup form (COMPANY_ID `U6j8yp`, LIST_ID `SxVpGW`)
- `components/sections/Faq.tsx` — accordion
- `components/sections/Closing.tsx` — full-bleed parallax CTA

Verified in-browser end-to-end (preloader → footer): preloader, hero, origin
(jar + parallax), TwoUp, TransitionLine, Steps, Pillars (segmented control
switching), Testimonials, Sample (Klaviyo form), Closing, Faq (accordion
expand), and Footer all render correctly. No console errors.

## Resolved this session

**Header visibility over the light hero — FIXED.** The non-solid header state
used cream text + cream logo (designed for a dark hero), washing out over the
light (`--paper`) hero at scrollY ≤ 40. Fix applied: non-solid state now uses
the default ink nav text + red logo, and the CTA falls back to the white
`.btn-soft` pill. Solid (scrolled) state unchanged.

- Removed the `.header:not(.is-solid)` cream overrides in `app/sections.css`
  (nav button color, header-cta, menu-toggle span)
- `components/Header.tsx:45` — logo `tone="#c10016"` (always red)

**One-screen sections — each section now fits the viewport without scrolling
(desktop).** Previously Pillars (1360px), Steps (1493px), Testimonials, Sample,
Origin, TwoUp, and Transition overflowed the screen. All section work is in
`app/sections.css` only (no component changes):

- Section padding switched from `vw`-based (`clamp(80px,12vw,170px)`) to
  `vh`-based (`clamp(48px,6vh,90px)`) so height scales with the viewport.
- The flagged sections get `min-height: 100vh; display: flex; align-items:
  center` to sit as centered full screens; reset to `min-height:0; display:
  block` in the `@media (max-width: 980px)` block so mobile stacks and scrolls.
- Section headlines (`.h2`) were wrapping to 4–7 lines because `max-width` was
  set in `ch` (resolved against the small container font, ~358px). Fixed with a
  px `max-width` on each `*-head` + `.h2 .accent { display: block }` so the
  accent phrase drops to its own line → clean, predictable 2-line headlines.
- Steps photo tiles changed from `aspect-ratio: 3/4` → `1/1`; Sample visual is
  height-capped via `clamp(...vh...)` (full-width again on mobile).
- Verified every section fits at 1366×768 and 1440×900 (no overflow).

**Pillars refinement (follow-up).** The earlier height-cap left the Pillars
visual as a small tile floating in a wide column with big side gaps, and the
forced `min-height: 100vh` produced dead space on tall screens. Reworked so the
section reads full and balanced:

- Visual now `width: 100%` (fills its grid column, left-aligned with the
  headline) with `aspect-ratio: 5/4` and `max-height: 39vh` so it stays short
  enough to fit; column ratio `1.05fr 0.95fr`.
- Dropped `min-height: 100vh` / flex-centering on `.pillars` — the section now
  **hugs its content** (which is `vh`-scaled), so it fits the viewport without
  forcing a full screen of empty space. Confirmed at 1366×768, 1440×900,
  1512×982, and mobile.
- NOTE: the other sections still use `min-height: 100vh` and can show the same
  centering whitespace on tall monitors — apply the same "hug content" change if
  it comes up.

**Origin refinement (follow-up).** Text was crammed far-left into 4 skinny lines
("Four / steps. / One / ranch.") because `.origin-copy` was `max-width: 30ch`
(~280px) — way too narrow for the 72px headline — leaving a big void between it
and a small jar. Reworked into a centered, balanced hero:

- `.origin-content` is now `grid-template-columns: auto auto; justify-content:
  center` so the copy + jar form a centered cluster (no longer pinned to the far
  left); columns hug their content so the text→jar gap is just the real CSS gap.
- Headline scaled up (`.origin-title` `font-size: clamp(46px, 7vw, 96px)`) and
  the `<br>` now yields a clean 2-line "Four steps. / One ranch."; jar enlarged
  (`clamp(240px, 27vw, 380px)`).
- Dropped `min-height: 100vh` so it hugs content (same as Pillars). Confirmed at
  1366×768, 1440×900, 1512×982, and mobile.

Note: Lenis (smooth scroll) uses native window scroll, but Next HMR re-creates
it on each edit — when scripting screenshots, `window.__lenis.destroy()` before
`window.scrollTo` or captures land a section off.

## v2 — alternate bold landing page (`/v2`)

A second, parallel landing page in a bold app-marketing aesthetic (design
language inspired by meetcleo.com — original Roan branding/copy/colors, not a
copy of Cleo's assets). The original site at `/` is untouched.

- Route: `app/v2/page.tsx`; styles isolated in `app/v2/v2.css` (everything
  scoped under `.v2`). Components live in `components/v2/`.
- Reuses `SmoothScroll` (Lenis) + `Signature`. `V2Boot` removes the root
  layout's `is-loading` lock (no preloader on v2) and paints the body espresso.
- Look: crisp warm near-black (`--bg #0e0c0b`), huge 700-weight type, vivid red
  accent (`--acc`), glossy rounded bento cards, a tilted red marquee.
- Premium photo placeholders: `.v2-img` + `.v2-img-*` variants = photographic
  gradient + highlight + vignette + SVG film-grain (replaces the flat `.ph`
  blocks so it doesn't read as cheap). Swap in real photos by replacing the
  gradient with a `background-image`.
- Hero: CSS **phone mockup** showing a Roan Instagram post + floating glass
  chips (`components/v2/V2Hero.tsx`).
- **Centerpiece — `components/v2/InfluencerScroller.tsx`**: a pinned section
  that scrolls horizontally (GSAP ScrollTrigger pin + `x` translate, scrub) full
  of Instagram-post cards of influencers with the product. Uses
  `gsap.matchMedia("(min-width: 760px)")`; on mobile it falls back to a native
  scroll-snap swipe rail (no pin). A progress bar fills via `onUpdate`.
- Sections: V2Header (+ drawer) · V2Hero · Marquee · FeatureCards (bento) ·
  InfluencerScroller · StatBand · V2CTA (reuses the Klaviyo keys) · V2Footer
  (links back to `/`). Verified at 1440×900, no console errors.

## Pending / not yet done

- Real ranch photography to replace `.ph` / `.v2-img` gradient placeholders
- v2: real influencer photos + handles; responsive QA at mobile/tablet widths
- Modular/future: wire Shopify Storefront API for actual commerce (kept separate from this marketing pass)

## Notes

- All sections are client components owning their own GSAP via `gsap.context` / `useReveal`.
- `docs/` holds brand source: `Roan Primary Colors/Roan Colors.pdf`, signature SVGs, and `legacy-landing.html` (source of the Klaviyo keys and `.ph` system).
- Brand palette is in `:root` in `app/globals.css`.
