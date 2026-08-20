# DESIGN.md

Design contract for this portfolio. Read it before changing anything visual.

---

## 1. The thesis

Everything Bannawat builds is about **staying up, or recovering when it doesn't**:

- **Wakeful** — an uptime-monitoring SaaS he runs in production, with real users and real billing.
- **RepoRadar** — a live pipeline streaming GitHub webhooks into Discord.
- **ai-fetch-healer** — an npm package that catches failing API calls, heals them, and retries.
- **Silent Ember** — the one that is *not* up yet: a horror game still in development.

So the page presents him the way his own products present themselves: **as a status page for a person.** The right column opens with a strip of what is running right now, each project carries a real operational state, and the visual vocabulary — status dots, mono timestamps, hairline-divided rows — is borrowed from the dashboards he builds.

That is the single idea the design commits to. Everything else stays quiet so it lands.

**The honesty rule that comes with it:** if a number or a state is shown, it must be real. `SystemsStrip` shows RepoRadar's last-event timestamp only when the live API answers, and shows nothing when it doesn't. `RepoRadarShowcase` labels its fallback rows `preview`. `AiFetchHealerShowcase` labels its demo `simulated`. Skills are grouped tags, not proficiency bars, because nobody measured a percentage. **Never add a fabricated metric to make a card look fuller.**

---

## 2. Tokens

**No component contains a raw colour.** Not a hex, not an `rgb()`, not `text-white`. Two exceptions, listed at the end.

### How it works

`src/app/globals.css` defines raw variables per theme, then registers them with Tailwind:

```css
[data-theme="dark"] { --accent: #45c4d0; --surface: #12181b; /* … */ }

@theme inline {
  --color-accent: var(--accent);
  --color-surface: var(--surface);
}
```

`inline` is load-bearing. It makes the generated utilities emit `var(--accent)` instead of baking a hex at build time, which is the only reason flipping `data-theme` re-skins the page. **Do not remove it.**

### Scale

| Group | Tokens | Utilities |
|---|---|---|
| Surfaces | `--bg` `--surface` `--surface-2` `--surface-3` | `bg-bg` `bg-surface` `bg-surface-2` `bg-surface-3` |
| Lines | `--border` `--border-2` | `border-border` `border-border-2` |
| Text | `--ink` `--ink-2` `--body` `--muted` `--dim` `--faint` | `text-ink` … `text-faint` |
| Accent | `--accent` `--accent-2` `--accent-vivid` `--accent-tint` `--accent-line` `--accent-rgb` `--vivid-rgb` `--on-accent` | `text-accent` `bg-accent-vivid` `bg-accent-tint` `text-on-accent` |
| Elevation | `--shadow-sm` `--shadow-md` `--shadow-lg` `--glow` `--edge` | `shadow-[var(--shadow-sm)]` |
| Atmosphere | `--mesh-1` `--mesh-2` `--mesh-3` `--grid-line` `--grain-opacity` | consumed by `.ambient` / `.grain` only |

Text steps, roughly: `ink` headings · `ink-2` secondary headings and definition terms · `body` prose · `muted` supporting copy · `dim` meta and timestamps · `faint` decorative marks. Reaching for a lighter step than the content deserves is the most common mistake here.

**`--accent` and `--accent-vivid` are not interchangeable.** `--accent` is the text-safe strength: it passes contrast on `--bg` and `--surface`, and it is the only one allowed for text or icons that carry meaning. `--accent-vivid` is brighter and fails contrast as small text — it exists for fills, dots, glows, and gradient stops, where luminance is the point. Using `--accent-vivid` for a label is the one colour mistake this system makes easy to commit.

`--accent-tint` (fill) and `--accent-line` (border) are pre-composed with alpha so tinted surfaces do not need `color-mix` at the call site. `--accent-rgb` and `--vivid-rgb` are space-separated triples for arbitrary values that need their own alpha: `shadow-[0_0_10px_rgb(var(--vivid-rgb)/0.55)]`.

`--on-accent` is the text colour drawn *on* an accent fill. Both accents are mid-tone, so `text-white` fails contrast in light mode. **Always `text-on-accent`.**

`--edge` is the lit top hairline on a raised surface (`.card::before`); `--glow` is the accent halo on the single filled button. Both are what stop large radii and flat fills from reading as plastic.

### One accent, on purpose

There is exactly one accent hue — a signal-teal (`#0f6f79` light, `#45c4d0` dark), carried in two strengths (see above). No per-project colour, no rainbow of feature icons.

That constraint is what makes the status system work: because state is not hue-coded, the accent stays free to mean "this is the interactive or live thing" everywhere on the page. It also keeps the design legible without colour vision.

### The two exceptions

Raw colour is allowed in exactly these places, each commented at the call site:

1. **Language brand colours** in `Projects.tsx` — `#3178c6` TypeScript, `#f1e05a` JavaScript, `#3572a5` Python, `#00add8` Go. These are identity, not palette; they are fixed in both themes. The same applies to the black letterbox and white play button of the video facade in `SilentEmberShowcase` — that is player chrome sitting on a video frame, not a site surface.
2. **`src/app/opengraph-image.tsx`** — Satori renders it server-side with no CSS custom property support, so it is pinned to the dark palette by hand. **Change a dark token and you must update this file too**, or the social card stops matching the site.

Need a shade the scale does not have? Add it to **both** themes and register it in `@theme inline`. A one-off arbitrary hex will look right in the theme you tested and wrong in the other.

---

## 3. Surface & atmosphere

Depth on this page comes from four things, all of them static. Nothing here animates, blurs a live layer, or samples what is behind it.

**`.ambient`** — one fixed, `pointer-events-none` element at `z-index: -1` holding three soft colour washes over a 72px hairline grid. It is a plain `background-image`: the browser rasterises it once and the compositor reuses it on every scroll frame. This is the cheap way to get the depth the old animated orbs were reaching for, which is why the orbs are not coming back (§7).

**`.grain`** — a tiled `feTurbulence` SVG at ~3–6% opacity in `overlay` blend, sitting above the ambient layer and below the content (`z-index: 0`; page content is `z-[1]`). Its job is practical: large soft gradients band on 8-bit displays, and grain hides the banding. Keeping it under the content also keeps text crisp.

**`.card::before`** — a 1px gradient hairline along the top edge, in `--edge`. Without it a 20px-radius solid fill reads as a flat rectangle; with it the card reads as a raised panel catching light. Any new surface with a large radius wants the same treatment.

**Tinted shadows** — `--shadow-*` are mixed toward the page's blue-green, not neutral grey. A grey shadow on a tinted background looks pasted on.

There is exactly one filled button on the page (`.btn-accent`, the résumé link). It takes a gradient and `--glow`. **Do not add a second filled accent button** — the moment there are two, neither reads as the primary action.

If you need to add atmosphere, extend `.ambient`. Do not reach for `backdrop-filter`, an animated background, or a blur filter on a large element; §7 lists why each of those is out.

---

## 4. The signature: status dots

The page's one memorable element, defined in `globals.css` and wrapped by `src/components/StatusDot.tsx`.

| Class | Reads as | Used by |
|---|---|---|
| `.dot-live` | filled + halo + pulsing ring | receiving traffic right now — RepoRadar |
| `.dot-up` | filled + halo, static | deployed and running — Wakeful |
| `.dot-shipped` | hollow ring | released, not a running service — ai-fetch-healer |
| `.dot-wip` | dashed ring | being built, nothing to run — Silent Ember |

They differ by **shape and weight, never hue**. Three consequences worth stating:

- Adding a fifth state means designing a fifth *treatment*, not picking a fifth colour.
- `StatusLabel` renders the dot with its translated label. Use it rather than hand-rolling a badge — a bare dot with no text is only acceptable where the label is redundant (the repository index rows, which carry a `title` attribute instead).
- The pulse is a `::after` ring on an 8px element. It is cheap because the element is tiny, not because animated rings are generally free.

The one place the vocabulary is reused is the **duration bar** in `Experience` — a segment positioned on a shared 2022→present track. It carries real data (how long each role ran), which is why it is allowed. A "TypeScript 85%" bar would use the same visual language to say something invented; do not build one.

---

## 5. Type

| Role | Face | Where |
|---|---|---|
| Display | **Schibsted Grotesk** 500–700 | name, card titles, repo names, section-strip rows |
| Body | **Inter** | prose, descriptions |
| Data | **IBM Plex Mono** 400–600 | labels, timestamps, status text, tech chips, counts, code |
| Thai | **IBM Plex Sans Thai** | sits behind Inter in the body stack |

Personality lives in the display and mono faces; the body face stays a neutral workhorse because this page is text-heavy and bilingual.

**The Thai face is not optional.** Inter ships no Thai glyphs, so without `IBM Plex Sans Thai` in the stack the TH locale falls back to whatever the OS picks and stops matching the design. If you change the body font, keep a Thai face behind it.

Mono is doing real work here, not decoration: it marks the things a status page would set in mono — labels, timestamps, states, counts. Body copy never goes mono.

---

## 6. Layout

Two columns from `lg` up, one column below:

```
┌────────────────┬──────────────────────────────────┐
│  Rail          │  Intro paragraph                 │
│  (sticky,      │  ┌────────────────────────────┐  │
│   h-screen)    │  │ Currently running          │  │
│                │  │ Wakeful      … ● Production│  │
│  avatar ● open │  │ RepoRadar    … ◉ Live      │  │
│  Name          │  │ ai-fetch-h.  … ○ Published │  │
│  role line     │  │ Silent Ember … ⃝ In dev    │  │
│  blurb         │  └────────────────────────────┘  │
│                │                                  │
│  ── About      │  ABOUT ─────────── Thailand·UTC+7│
│  ── Experience │  …                               │
│  ── Skills     │  EXPERIENCE ──────────  2022–2026│
│  ── Projects   │  …                               │
│                │  SKILLS ───────────────  15 tools│
│  résumé  ◌◌◌◌  │  …                               │
│  ☀◐☾   EN TH   │  PROJECTS ──── 4 systems·7 repos │
└────────────────┴──────────────────────────────────┘
```

`src/app/page.tsx` owns the grid. `src/components/Rail.tsx` is `lg:sticky lg:top-0 lg:h-screen`, and below `lg` it is an ordinary stacked header.

**Why this two-column layout works when the previous attempt was reverted:** the earlier version put the language toggle in a `fixed` corner, where it covered the content it floated over, and the page had competing fixed elements fighting the scroll. Here the theme and language controls live *inside the rail*, and nothing is `fixed` except the 2px `ScrollProgress` bar. If you add a new global control, it goes in the rail — do not reintroduce a floating toolbar.

### Section headers

`src/components/SectionHeader.tsx`, one shape for all four sections: mono title · hairline · optional meta.

**There is deliberately no 01/02/03 numeral.** About / Experience / Skills / Projects is a *set*, not a sequence — numbering would assert an order the content does not have. The right-hand slot carries a real fact instead (a location, a year span, a count). If a new section has no real fact to put there, leave `meta` off rather than inventing one.

### Showcase cards

All four go through `src/components/ShowcaseCard.tsx`: title + status, meta line, outbound link, body, optional footnote. `Highlights` is the shared two-column definition list.

Copy the shell rather than inventing a per-project layout. Card-by-card bespoke CSS is exactly how these got heavy before.

- Live fetches (`SystemsStrip`, `RepoRadarShowcase`, `Projects`) need a hard `AbortController` timeout — currently 8s — plus a graceful fallback. Never let a card block on a cold free-tier API.
- The `AiFetchHealerShowcase` demo runs on `setInterval` at ~2s. It does not need frame accuracy, so it does not get a `requestAnimationFrame` loop.
- `SilentEmberShowcase` uses a click-to-load facade. No YouTube iframe or script is requested until the visitor asks for the video. Keep it that way.

---

## 7. Motion

Restrained on purpose. The status dots are the only ambient animation on the page.

- **Page load:** one orchestrated reveal — the rail staggers its children at `0.07`, then Intro and SystemsStrip fade up. Nothing else animates on load.
- **Scroll:** `opacity: 0, y: 12 → 0`, `duration: 0.4`, `viewport={{ once: true }}`. Identical in every section. Do not invent a per-section entrance.
- **Hover:** `.card-hover` lifts 2px and deepens its shadow. Rail links grow their bar. That is the whole hover vocabulary.
- `prefers-reduced-motion: reduce` collapses every animation and transition globally in `globals.css`. Anything you add is covered automatically — do not add a local escape hatch.

### What is gone, and stays gone

The previous design had animated background orbs, a cursor-following spotlight, an animated gradient-text hero, and glassmorphism cards. All removed. They were the source of two separate performance regressions in Brave: a `setState` on every `mousemove` forcing a full re-render plus a full-viewport gradient repaint, and `backdrop-filter` cards recompositing every frame over animated blurred backgrounds.

Do not reintroduce any of the following without an explicit performance pass:

- Full-viewport blurred or animated backgrounds.
- `backdrop-filter` on anything that repeats — cards, grids, list rows.
- Cursor-follow effects. If one ever returns, it must write CSS custom properties from a ref inside a `requestAnimationFrame`-throttled handler, never `setState` per event.
- `filter: blur()` above ~70px. Blur cost scales with radius².
- Three.js / WebGL / canvas particle systems.
- A second animation library. Framer Motion is already a dependency.

---

## 8. State: nothing lives in React that already lives in the DOM

Three files, and the reasoning matters more than the code:

| File | Holds |
|---|---|
| `src/lib/boot.ts` | Theme + language constants, and `BOOT_SCRIPT` |
| `src/context/ThemeContext.tsx` | `ThemeProvider`, `useTheme()` |
| `src/context/LanguageContext.tsx` | `LanguageProvider`, `useLanguage()`, both dictionaries |

**`src/lib/boot.ts` must stay framework-free.** No `'use client'`. The root layout is a server component; if these constants are exported from a client module, Next replaces them with proxy references and `THEMES.map(...)` throws `is not a function` at build time.

**`BOOT_SCRIPT` must stay inline and render-blocking in `<head>`.** It reads `localStorage` and stamps `data-theme` and `lang` on `<html>` before first paint. Defer it, or move it into a component, and every load flashes the wrong palette for a frame. `<html>` carries `suppressHydrationWarning` because of this.

**Both providers read external stores; they do not own state.**

- Resolved theme (`light` / `dark`) → `data-theme` attribute, watched with a `MutationObserver`.
- Theme *choice* (`light` / `dark` / `system`) → `localStorage` plus an in-page listener set, because `system` has no DOM representation and the `storage` event only fires in *other* tabs.
- Language → the `lang` attribute on `<html>`, which also keeps the document's advertised language honest for screen readers and translation tools.

Rewriting any of these as `useState` + `useEffect` reintroduces a redundant post-hydration render and trips the `react-hooks/set-state-in-effect` lint rule. That rule failing is the signal you have put state in the wrong place.

### Copy

Both dictionaries live in `LanguageContext.tsx`. `th` is typed as `Record<keyof typeof en, string>`, so **a missing Thai translation is a TypeScript error**, not a string that silently falls back at runtime. Add every new key to both.

`meta_skills` and `meta_projects` contain a `{n}` placeholder the component substitutes with a real count. Keep the placeholder in both locales.

---

## 9. Accessibility

- Every animation is covered by the global `prefers-reduced-motion` block.
- `:focus-visible` is styled once, globally, as a 2px accent outline. Do not strip it per-component for aesthetics.
- Text on accent fills uses `text-on-accent`.
- `ThemeToggle` and `LanguageToggle` are `role="radiogroup"` with `aria-checked` radios and per-option labels — they are icon-only, so the label is all a screen reader gets.
- Decorative elements (status dots, duration bars, step indicators) carry `aria-hidden="true"`; the meaning is in adjacent text.
- Rail nav marks the current section with `aria-current="true"`, which is also what the CSS active state selects on — the styling and the semantics cannot drift apart.
- Images that repeat adjacent text (avatar, tech icons) take `alt=""` rather than duplicating it.

---

## 10. Out of scope — tried, reverted, ask first

- Animated orbs, mouse spotlight, gradient-text hero, glassmorphism cards (§6).
- A floating fixed toolbar for the theme or language controls (§5).
- Numbered section markers (§5).
- Multi-palette theming beyond light/dark. A four-palette switcher was built and reverted; light/dark is the axis people actually want.
- GSAP + Lenis smooth-scroll.
- Editorial serif direction (Fraunces display, warm ink palette, broadsheet index rows).

Any of these returning is a real decision. Confirm with the repo owner; do not restore one silently.

---

## 11. Before opening a PR

- [ ] No new raw hex, `rgb()`, or `text-white` outside the two exceptions in §2.
- [ ] No `--accent-vivid` used as text or as a meaningful icon colour (§2).
- [ ] No second filled accent button (§3).
- [ ] Checked in **both** themes and **both** languages.
- [ ] Checked at mobile width — the rail collapses, and Thai strings run longer than English.
- [ ] No fabricated numbers or states (§1).
- [ ] New copy added to **both** dictionaries.
- [ ] No new `fixed` element, no new `backdrop-filter` on repeating content.
- [ ] `npx next build` and `npx eslint src --ext .ts,.tsx` are clean.
