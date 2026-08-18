# DESIGN.md — Portfolio UX/UI System (v2)

Design contract for this repo. New work should read this first — it documents what exists, why, and the perf budget that keeps the site from lagging (Brave in particular has choked on backdrop-filter + animated backgrounds before; see "Perf incidents" below).

**v2 note:** the previous system (violet `#8b7fff` accent, animated gradient-name, glass-gradient-border cards, glowing avatar ring, ambient blurred orbs, cursor spotlight) had drifted into the generic "AI-generated dark SaaS portfolio" look — dark-blue background, indigo/violet everywhere, glow-on-everything. v2 keeps the perf discipline and the single-column editorial layout, but replaces the visual identity: warm-ink palette instead of blue-black, an amber/gold signature accent instead of violet, a serif display face for character instead of Inter-everywhere, and flatter/quieter surfaces instead of glassmorphism. The ambient orbs and `MouseSpotlight` cursor-follow effect are removed outright — they were the single most recognizable "AI template" signal on the page, on top of being the documented source of the original Brave perf issue.

## 1. Visual identity

Dark, editorial developer portfolio. Not a SaaS landing page — no glassmorphism walls, no glow-everything, no hero videos, no 3D. Content-first: text, project cards, live data.

### Color tokens (`src/app/globals.css`)

```css
--bg: #0c0a08          /* page background — warm near-black, not blue-black */
--surface: #151210     /* card background */
--surface-2: #1d1814   /* hover/active surface */
--border: #2b2620      /* default border */
--border-2: #3a332a    /* hover border */

--text-primary: #f5efe4  /* headings — warm cream, not cool white */
--text-body: #c7bda8     /* body copy */
--text-muted: #8a8172    /* labels, meta, timestamps */
--text-faint: #4a4438    /* decorative, disabled */

--accent: #e0a039        /* signature accent — amber/gold. Links, active states, primary CTA. */
--accent-soft: #f0c274   /* accent hover/lighter variant */
--accent-dim: rgba(224, 160, 39, 0.12)
--accent-ink: #17130c    /* dark text used ON a solid accent fill (buttons, active toggle) */
```

Secondary accents exist **only inside showcase cards**, one per card, to differentiate them at a glance:

| Card | Accent | Meaning |
|---|---|---|
| RepoRadar | `#e0a039` (primary) | DevOps bot |
| ai-fetch-healer | `#2ee6a6` | npm package |
| Wakeful | `#38bdf8` | production SaaS |
| Silent Ember | `#e2542f` (ember red-orange) | in-development badge — deliberately *not* the primary amber, so it doesn't clash next to it |

Rule: **do not add a new accent color** without removing/reassigning an existing one. More than 4-5 accents on one page reads as noise, not hierarchy. Semantic status colors (`#ff7a90` error/failed, `#2ee6a6` success, GitHub's own per-language colors for the language dots) are exempt from this budget — they're functional, not decorative.

### Typography

Three-family system — this is the main lever against the "generic AI portfolio" look, which is almost always a single sans-serif (usually Inter) used for everything:

- **Display/serif** — Fraunces (`next/font/google`, variable, weights 300–600, italic available). Used for the hero name, section numerals (`01`, `02`…), and card/project titles. This is where the site gets character.
- **Mono** — JetBrains Mono (`next/font/google`). Used for *all* labels, meta, nav links, tags, timestamps — anywhere the old system used uppercase-tracked Inter. Reinforces the "developer" register without needing decoration.
- **Sans** — Inter (`next/font/google`). Body copy only. Workhorse, stays invisible.
- Body: 15px / 1.75 line-height.
- Never gradient-fill or animate text (the old animated gradient-pan hero name is gone; the name is now static serif).

### Motion language

- Section entrances: `opacity: 0, y: 16 → opacity: 1, y: 0`, `duration: 0.4`, `viewport={{ once: true }}` (Framer Motion `whileInView`). Every section does this identically — don't invent a new entrance style per section.
- Hover lifts: `scale: 1.02, y: -3` on interactive cards, never more. The project index list uses a `padding-left` hover shift instead of scale (see §2) — don't add scale to it too.
- Hero-only: staggered children (`staggerChildren: 0.09`) for the one-time page-load reveal. Nowhere else.
- No ambient/looping background animation. The old `.orb-1`/`.orb-2` blobs and the cursor-following `MouseSpotlight` are removed — they read as decorative filler and were the documented source of the original Brave perf regression (see §3). If a future direction wants ambient motion back, treat it as a real decision (confirm with the user), not a default to restore.

## 2. Layout scope

Single-column, `max-w-6xl`, centered. One `Navigation` (hero identity + jump links) followed by four sections in fixed order: **About → Experience → Skills → Projects**. Do not reintroduce the old two-column sticky-sidebar layout — it was tried and reverted because it broke on scroll (content ducked under the fixed language toggle, and the sticky columns fought Lenis-less native scroll).

Section header pattern is fixed (v2 shape — large italic serif numeral + mono label, replaces the old small colored-numeral + uppercase-Inter pattern):
```tsx
<div className="sticky top-0 z-20 ... lg:relative lg:bg-transparent ...">
  <h2 className="flex items-baseline gap-3">
    <span className="section-numeral text-2xl lg:text-3xl">0N</span>
    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">{title}</span>
    <span className="hidden h-px flex-1 bg-[var(--border)] lg:block" />
  </h2>
</div>
```
Reuse this exact shape for any new section. Don't design a fifth header style.

**Projects section** — the small GitHub repos render as an editorial numbered index list (`.index-row`), not a grid of uniform glass cards. This was a deliberate v2 change: identical 3-up card grids are the single most common "AI-generated portfolio" project layout, and the flat numbered-list-with-accent-on-hover reads as considered instead of templated. The four hand-built "showcase" cards (RepoRadar, ai-fetch-healer, Wakeful, Silent Ember) keep their existing card shape — see §3.

The hero (`Navigation.tsx`) no longer uses a separate role line + description paragraph — it's a single sentence-style paragraph built from ordered `hero_seg*` / `hero_link_*` keys in `LanguageContext.tsx`, with inline bold underlined `<a>` tags carrying the proof points (REST APIs, RepoRadar, ai-fetch-healer, Silent Ember) instead of a standalone tagline, plus a short mono `role_line` under the name. Each linked showcase card carries its own scroll anchor for this to deep-link into (`id="repo-radar"`, `id="ai-fetch-healer"`, `id="silent-ember"`, plus `scroll-mt-16 lg:scroll-mt-24` so the sticky header doesn't cover the target). Follow the same `id` + `scroll-mt` convention on any future showcase card that the hero or nav should be able to deep-link to.

## 3. Component budget — what's allowed, what isn't

This is the part that matters for perf. The site previously lagged hard on Brave because of **animated backgrounds sitting under `backdrop-filter: blur()` cards** — the browser had to recompute the blur sample every frame. Rules below exist to prevent that regressing, even though v2 has already removed the two worst offenders (ambient orbs, cursor spotlight).

### Allowed, cheap (GPU compositor only — `transform` + `opacity`)

- Framer Motion `whileInView` / `whileHover` using `opacity`, `y`, `scale` only.
- `ScrollProgress` — single `useSpring`-driven `scaleX` on a fixed 3px bar, solid `var(--accent)` fill (no gradient). Cheap, keep as-is.
- `animate-ping` (Tailwind) for the small "Live" status dots — cheap because the element is tiny (a few px), not because `animate-ping` is generally free.
- Per-card unique `whileHover` with a spring — fine on ≤10 cards on screen at once. Don't add spring physics to list items in a 50+ row list (the project index list intentionally uses a plain CSS `padding-left` transition, not a spring, for this reason).

### Allowed, moderate — use sparingly

- `backdrop-filter: blur()` — **capped at 6-10px**, and only on small/short-lived elements (mobile sticky section headers, `LanguageToggle`). Never on a grid of 4+ simultaneously-visible cards.

### Not allowed without an explicit perf pass

- Ambient/looping full-viewport background effects (blurred orbs, particle fields, animated gradients) layered under scrollable content. Removed in v2 for both perf and "looks AI-generated" reasons — don't reintroduce without a real decision (confirm with the user).
- Cursor-follow / mouse-position effects (the old `MouseSpotlight`). If reintroduced for a specific reason, it must drive CSS custom properties via a ref + `requestAnimationFrame`-throttled handler — never `setState` on every raw `mousemove` (that was the largest single cause of the original Brave lag).
- Video backgrounds (`<video autoplay>` as page background). Rejected once already (Aura/Hermes exploration) — this is a text-heavy dev portfolio, not an agency site.
- Three.js / WebGL / canvas particle systems. Nothing in this repo justifies a GPU-bound scene graph.
- `filter: blur()` above ~90px anywhere. Blur cost scales roughly with radius².
- New global libraries for animation (GSAP, Lenis, anime.js, etc.) unless a section specifically needs scroll-scrubbed effects that Framer Motion's `whileInView` genuinely can't do.
- `backdrop-filter` on `.project-card` or the Skills tag rows. `.project-card` is now a flat solid surface (`var(--surface)`) with a hairline border — no gradient-border, no blur. This is cheaper than the old glass treatment and reads as more intentional.
- Uncapped `vw`-sized blurred elements (no `max-width`/`max-height`), should any background treatment be reintroduced later.

### When adding a new "showcase" card (RepoRadar-style)

Every showcase (`RepoRadarShowcase`, `AiFetchHealerShowcase`, `WakefulShowcase`, `SilentEmberShowcase`) follows one shape: header with live-status badge → pipeline row of small bordered pills → content body (feed / demo / highlights grid) → optional footnote. Copy this structure rather than inventing a new card layout per project. It keeps the DOM shallow and avoids per-card bespoke CSS that's easy to make heavy by accident.

- Live data fetches (`RepoRadarShowcase`) must have a hard `AbortController` timeout (currently 8s) and a static `SAMPLE` fallback — never let a card block on a slow/cold API.
- Simulated demos (`AiFetchHealerShowcase`) run on `setInterval`, not `requestAnimationFrame` loops, since the update cadence is ~2s and doesn't need frame-accuracy.
- Give each new showcase its own accent color per the budget in §1 — don't default to the primary amber unless it's genuinely the primary/flagship project.

## 4. Accessibility & correctness constraints

- `prefers-reduced-motion: reduce` disables all animations globally via a blanket rule in `globals.css` (`animation-duration`/`transition-duration` forced to ~0). Keep that rule intact for anything new — it's simpler than tagging each `@keyframes` individually now that the orb/gradient-pan keyframes are gone.
- Interactive elements keep visible focus state — don't strip `:focus-visible` for aesthetic reasons.
- Bilingual (EN/TH) via `LanguageContext` — every user-facing string goes through `t('key')`, added to both locales in `LanguageContext.tsx`. Showcase cards (RepoRadar, ai-fetch-healer, Wakeful) are the one exception and stay English-only by convention, since they're technical/log-style content.

## 5. Out of scope (tried, reverted, don't redo without asking)

- Two-column sticky layout (Navigation pinned left, content scrolling right).
- Light "Hermes" ink-blue theme, PIXZEN editorial light theme, Aura agency theme with hero video.
- GSAP + Lenis smooth-scroll stack.
- Footer credit line ("Designed in Figma, coded in VS Code...") — removed as dead weight, don't re-add.
- The v1 violet/glassmorphism/glow visual identity (see the v2 note at the top) — superseded, don't restore piecemeal.

If a future request wants one of these back, treat it as a real decision (confirm with the user) — not a default to restore silently.
