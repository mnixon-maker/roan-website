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

Verified in-browser through TransitionLine: preloader, hero, origin (jar +
parallax), TwoUp, TransitionLine all render correctly.

## Known issue to fix next

**Header is near-invisible at the very top.** The non-solid header state uses
cream text + cream logo (designed for a dark hero), but our hero is light
(`--paper`). At scrollY ≤ 40 the nav/logo wash out. Fix: make the non-solid
state use dark (ink) nav text + red logo over the light hero, OR give the hero
a darker treatment. Solid (scrolled) state already looks correct.

- CSS: `app/sections.css` → `.header:not(.is-solid) .nav button` / `.menu-toggle span` (currently `#f4f2ec`)
- Logo tone: `components/Header.tsx:45` — `tone={solid ? "#c10016" : "#f4f2ec"}`

## Pending / not yet verified

- Visually verify Steps → Footer in browser (was mid-scroll when paused)
- Decide header-over-light-hero fix above
- Real ranch photography to replace `.ph` gradient placeholders
- Modular/future: wire Shopify Storefront API for actual commerce (kept separate from this marketing pass)

## Notes

- All sections are client components owning their own GSAP via `gsap.context` / `useReveal`.
- `docs/` holds brand source: `Roan Primary Colors/Roan Colors.pdf`, signature SVGs, and `legacy-landing.html` (source of the Klaviyo keys and `.ph` system).
- Brand palette is in `:root` in `app/globals.css`.
