# LucasHsu.dev Design System

Visual theme: **Competition Athlete（競賽選手）** — clean, sharp, achievement-driven.

## Principles

1. **戰績即品牌** — rankings and medals are primary visual signals.
2. **秩序感** — scoreboard / timeline layouts over plain bullet lists.
3. **克制動效** — one entrance animation per section; respect `prefers-reduced-motion`.
4. **中文可讀優先** — body text stays on Noto Sans TC; display fonts for headings only.

## Color Tokens

Defined in [`style.css`](./style.css):

| Token | Light | Usage |
|-------|-------|-------|
| `--lh-accent` | `#2b6cb0` | Primary steel-blue accent |
| `--lh-accent-bright` | `#4299e1` | Links, highlights |
| `--lh-gold` | `#d4a017` | Medal / rank accent |
| `--lh-surface` | `#0f1419` | Hero dark background |
| `--lh-medal-gold/silver/bronze` | — | Award badge colors |
| `--vp-c-brand-*` | steel-blue | VitePress brand override |

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
| `WorkGrid` | `components/WorkGrid.vue` | Portfolio |
| `MyLayout` | `components/MyLayout.vue` | Aside (page views) |

Shared data: [`data/siteData.js`](./data/siteData.js)

## Utility Classes

Global classes in `costom.css`:

- `.lh-section-label` — uppercase mono section eyebrow
- `.lh-section-title` — display heading
- `.lh-tag` — tech stack pill
- `.lh-medal--gold/silver/bronze/honor` — award rank badges

## Adding Content

- **New featured work (home):** edit `featuredWorks` in `data/siteData.js`.
- **New portfolio item:** edit `workGridSections` in `data/siteData.js`.
- **New award:** edit `awardCategories` in `data/siteData.js`.

## Home Layout Slots

Injected in [`index.js`](./index.js):

- `home-hero-before` → `HeroIntro`
- `home-features-after` → `StatBoard` + `FeaturedWork`

Default VitePress hero/features are hidden via CSS when custom blocks render.
