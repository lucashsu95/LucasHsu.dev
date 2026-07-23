# LucasHsu.dev Design System

Visual theme: **Competition Athlete（競賽選手）** — clean, sharp, achievement-driven. Brand palette stays the original purple → pink → gold.

## Principles

1. **戰績即品牌** — rankings and medals are primary visual signals.
2. **秩序感** — scoreboard / timeline layouts over plain bullet lists.
3. **克制動效** — one entrance animation per section; respect `prefers-reduced-motion`.
4. **中文可讀優先** — body text stays on Noto Sans TC; display fonts for headings only.

## Color Tokens

Defined in [`style.css`](./style.css):

| Token | Value | Usage |
|-------|-------|-------|
| `--lh-accent` | `#4158d0` | Primary brand blue-violet |
| `--lh-pink` | `#c850c0` | Mid gradient stop |
| `--lh-gold` / `--lh-gold-bright` | `#e0a93f` / `#ffcc70` | Medal / rank accent |
| `--lh-brand-gradient` | `#4158d0 → #c850c0 → #ffcc70` | Hero / primary CTAs |
| `--lh-medal-gold/silver/bronze` | — | Award badge colors |
| `--vp-c-brand-*` | indigo (VitePress default) | Links / default brand |

## Typography

Defined in [`costom.css`](./costom.css) (note: filename typo kept to avoid import breakage):

| Token | Font | Usage |
|-------|------|-------|
| `--vp-font-family-base` | Noto Sans TC | Body / Chinese |
| `--vp-font-family-display` | Sora | Headings, hero |
| `--vp-font-family-mono` | JetBrains Mono | Stats, badges, labels |

## Components

| Component | File | Used on |
|-----------|------|---------|
| `HeroIntro` | `components/HeroIntro.vue` | Home (slot) |
| `StatBoard` | `components/StatBoard.vue` | Home (slot) |
| `FeaturedWork` | `components/FeaturedWork.vue` | Home (slot) |
| `AwardList` | `components/AwardList.vue` | About |
| `AwardLightbox` | `components/AwardLightbox.vue` | About (timeline photos) |
| `WorkGrid` | `components/WorkGrid.vue` | Portfolio |
| `MyLayout` | `components/MyLayout.vue` | Aside (page views) |

Shared data: [`data/siteData.js`](./data/siteData.js)

## Award photos lightbox

Photos live under `docs/public/awards/<slug>/`. Featured awards set `photosDir` in `siteData.js`.

- **Scan:** Vite plugin [`scripts/awards-scan.mjs`](../../../scripts/awards-scan.mjs) runs on `dev` / `build` (and watches the folder). Output: [`data/awardPhotos.generated.js`](./data/awardPhotos.generated.js).
- **Empty / missing folder:** no pointer cursor, no camera badge, click does nothing.
- **Gallery:** left/right buttons, keyboard arrows, mobile swipe; Esc / overlay / × to close.
- **Info bar:** title / rank / date are optional (render only when present); photo counter always shows when open.

See [`docs/public/awards/README.md`](../../public/awards/README.md) for slug list and naming.

```bash
pnpm awards:scan
```

## Utility Classes

Global classes in `costom.css`:

- `.lh-section-label` — uppercase mono section eyebrow
- `.lh-section-title` — display heading
- `.lh-tag` — tech stack pill
- `.lh-medal--gold/silver/bronze/honor` — award rank badges

## Adding Content

- **New featured work (home):** edit `featuredWorks` in `data/siteData.js`.
- **New portfolio item:** edit `workGridSections` in `data/siteData.js`.
- **New award:** edit `awardTimeline` in `data/siteData.js` (add `photosDir` if featured + will have photos).
- **Award photos:** drop images into `docs/public/awards/<photosDir>/`.

## Home Layout Slots

Injected in [`index.js`](./index.js):

- `home-hero-before` → `HeroIntro`
- `home-features-after` → `StatBoard` + `FeaturedWork`

Default VitePress hero/features are hidden via CSS when custom blocks render.
