# DESIGN.md — Portfolio UX/UI System

Design contract for this repo. New work should read this first — it documents what exists, why, and the perf budget that keeps the site from lagging (Brave in particular has choked on backdrop-filter + animated backgrounds before; see "Perf incidents" below).

## 1. Visual identity

Dark, editorial developer portfolio. Not a SaaS landing page — no glassmorphism walls, no hero videos, no 3D. Content-first: text, project cards, live data.

### Color tokens (`src/app/globals.css`)

```css
--bg: #0d0d14        /* page background */
--surface: #13131c   /* card background */
--surface-2: #1a1a26 /* hover/active surface */
--border: #242436    /* default border */
--border-2: #2e2e45  /* hover border */

--text-primary: #f0f0f8  /* headings */
--text-body: #b8b8cc     /* body copy */
--text-muted: #6e6e8a    /* labels, meta, timestamps */
--text-faint: #3e3e58    /* decorative, disabled */

--accent: #8b7fff        /* primary accent — links, active states, focal glow */
--accent-dim: rgba(139, 127, 255, 0.1)
```

Secondary accents exist **only inside showcase cards**, one per card, to differentiate them at a glance:

| Card | Accent | Meaning |
|---|---|---|
| RepoRadar | `#8b7fff` (primary) | DevOps bot |
| ai-fetch-healer | `#2ee6a6` | npm package |
| Wakeful | `#38bdf8` | production SaaS |
| Silent Ember | `#f5a623` (amber) | in-development badge |

Rule: **do not add a new accent color** without removing/reassigning an existing one. More than 4-5 accents on one page reads as noise, not hierarchy.

### Typography

- Font: Inter (`next/font/google`, self-hosted — no runtime CDN fetch).
- Body: 15px / 1.75 line-height.
- Headings use `text-primary`; never gradient-fill body text (gradient text is reserved for the hero name only, see §3).
- Labels/meta use `font-mono`-free, `text-[11px] uppercase tracking-widest text-muted` pattern — consistent across every section header.

### Motion language

- Section entrances: `opacity: 0, y: 16 → opacity: 1, y: 0`, `duration: 0.4`, `viewport={{ once: true }}` (Framer Motion `whileInView`). Every section does this identically — don't invent a new entrance style per section.
- Hover lifts: `scale: 1.02, y: -3` on interactive cards, never more.
- Hero-only: staggered children (`staggerChildren: 0.09`) for the one-time page-load reveal. Nowhere else.

## 2. Layout scope

Single-column, `max-w-6xl`, centered. One `Navigation` (hero identity + jump links) followed by four sections in fixed order: **About → Experience → Skills → Projects**. Do not reintroduce the old two-column sticky-sidebar layout — it was tried and reverted because it broke on scroll (content ducked under the fixed language toggle, and the sticky columns fought Lenis-less native scroll).

Section header pattern is fixed:
```tsx
<div className="sticky top-0 z-20 ... lg:relative lg:bg-transparent ...">
  <h2 className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted">
    <span className="text-accent">0N.</span> {title}
    <span className="hidden h-px flex-1 bg-border lg:block" />
  </h2>
</div>
```
Reuse this exact shape for any new section. Don't design a fifth header style.

## 3. Component budget — what's allowed, what isn't

This is the part that matters for perf. The site previously lagged hard on Brave because of **animated backgrounds sitting under `backdrop-filter: blur()` cards** — the browser had to recompute the blur sample every frame. Rules below exist to prevent that regressing.

### Allowed, cheap (GPU compositor only — `transform` + `opacity`)

- Framer Motion `whileInView` / `whileHover` using `opacity`, `y`, `scale` only.
- `.orb-1` / `.orb-2` ambient background blobs — **capped**: `filter: blur(48-70px)` max, `max-width/height` capped in px (not just vw, so they can't balloon on 4K/ultrawide), `will-change: transform`, animate `transform: translate3d()` only, never `top/left`.
- `.animate-gradient-text` — `background-position` pan on the hero name only. One instance per page, not reusable as a utility for body text.
- `ScrollProgress` — single `useSpring`-driven `scaleX` on a fixed 3px bar. Cheap, keep as-is.
- `MouseSpotlight` — one `radial-gradient` following the cursor, gated behind `matchMedia('(hover: hover)')` so it never runs on touch devices. Do not add a second cursor-follow effect on top of it.
- Cursor-follow / mouse-position effects must drive CSS custom properties (`element.style.setProperty('--x', ...)`) via a ref + `requestAnimationFrame`-throttled handler — never `setState` on every raw `mousemove`. `MouseSpotlight` used to call `setState(x, y)` per pixel of movement, forcing a full React re-render and a full-viewport `radial-gradient` repaint on every mouse event; this was the largest single cause of the Brave lag (see below). Fixed by tracking position in a ref, writing `--x`/`--y` directly to the DOM in a rAF-throttled handler, and moving the gradient itself into a CSS class keyed off those custom properties.

### Allowed, moderate — use sparingly

- `backdrop-filter: blur()` — **capped at 6-10px**, and only on elements that do NOT sit above the animated orbs' likely travel path, or that are small/short-lived (mobile sticky headers). If you add a new blurred surface, keep it off the areas the orbs drift through (orbs are positioned top-left / bottom-right — keep large blurred panels out of those corners, or reduce orb opacity further before adding more blur).
- `animate-ping` (Tailwind) for the small "Live" status dots — cheap because the element is tiny (a few px), not because `animate-ping` is generally free.
- Per-card unique `whileHover` with a spring — fine on ≤10 cards on screen at once. Don't add spring physics to list items in a 50+ row list.

### Not allowed without an explicit perf pass

- Full-viewport blurred/animated backgrounds layered under scrollable content with `backdrop-filter` cards on top (this was the original lag: `blur(90px)` orbs + `blur(10px)` cards recompiled every frame in Brave's software raster path). If you want a bigger background effect, reduce the *foreground* blur to compensate — never raise both.
- Video backgrounds (`<video autoplay>` as page background). Rejected once already (Aura/Hermes exploration) precisely because this is a text-heavy dev portfolio, not an agency site — video adds weight for zero information.
- Three.js / WebGL / canvas particle systems. Nothing in this repo justifies a GPU-bound scene graph.
- `filter: blur()` above ~90px anywhere. Blur cost scales roughly with radius²; 48-70px is the ceiling that's been perf-verified.
- New global libraries for animation (GSAP, Lenis, anime.js, etc.) unless a section specifically needs scroll-scrubbed effects that Framer Motion's `whileInView` genuinely can't do. Framer Motion is already a dependency — don't duplicate its job with a second animation library "for one section." (The PIXZEN/Hermes explorations pulled in `gsap` + `lenis` + `split-type`; none of that survived into the current dark-theme portfolio. If reintroducing a GSAP-driven section, remove it fully if the direction gets reverted — don't leave dead deps in `package.json`.)
- Uncapped `vw`-sized blurred elements (no `max-width`/`max-height`). Always cap absolute pixel size so wide monitors don't get a bigger, more expensive blur than a laptop was tested on.
- `backdrop-filter` on `.project-card`. Removed for perf — it was the second-largest compositor cost after the `MouseSpotlight` `setState`-per-`mousemove` bug (see "Allowed, cheap" above): a `blur(10px)` surface recomputing every frame under the animated orbs, stacked across up to a dozen cards on screen at once. Replaced with a plain higher-opacity solid background (`rgba(19,19,28,0.9)`) — same dark-card read, no blur compositing.

### When adding a new "showcase" card (RepoRadar-style)

Every showcase (`RepoRadarShowcase`, `AiFetchHealerShowcase`, `WakefulShowcase`, `SilentEmberShowcase`) follows one shape: header with live-status badge → pipeline row of small bordered pills → content body (feed / demo / highlights grid) → optional footnote. Copy this structure rather than inventing a new card layout per project. It keeps the DOM shallow and avoids per-card bespoke CSS that's easy to make heavy by accident.

- Live data fetches (`RepoRadarShowcase`) must have a hard `AbortController` timeout (currently 8s) and a static `SAMPLE` fallback — never let a card block on a slow/cold API.
- Simulated demos (`AiFetchHealerShowcase`) run on `setInterval`, not `requestAnimationFrame` loops, since the update cadence is ~2s and doesn't need frame-accuracy.

## 4. Accessibility & correctness constraints

- `prefers-reduced-motion: reduce` must disable every `@keyframes` animation (orbs, gradient pan, marquees if any return). This is already wired in `globals.css` — keep it wired for anything new.
- Decorative elements (orbs, spotlight, grain) get `aria-hidden="true"` and `pointer-events-none`.
- Interactive elements keep visible focus state — don't strip `:focus-visible` for aesthetic reasons.
- Bilingual (EN/TH) via `LanguageContext` — every user-facing string goes through `t('key')`, added to both locales in `LanguageContext.tsx`. Showcase cards (RepoRadar, ai-fetch-healer, Wakeful) are the one exception and stay English-only by convention, since they're technical/log-style content.

## 5. Out of scope (tried, reverted, don't redo without asking)

- Two-column sticky layout (Navigation pinned left, content scrolling right).
- Light "Hermes" ink-blue theme, PIXZEN editorial light theme, Aura agency theme with hero video.
- GSAP + Lenis smooth-scroll stack.
- Footer credit line ("Designed in Figma, coded in VS Code...") — removed as dead weight, don't re-add.

If a future request wants one of these back, treat it as a real decision (confirm with the user) — not a default to restore silently.
