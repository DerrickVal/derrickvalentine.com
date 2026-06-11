# 01 · Design System — tokens, type, visual language

This is the canonical token + type spec. Every page references it. Build this into `app/globals.css` **before** any page.

The design's **canonical color values are the hex codes used in `design-reference/*.dc.html`.** Below, each token lists its
source hex and an **oklch** conversion (the repo is oklch-first per `CLAUDE.md`). The oklch values are accurate conversions;
if you want to re-derive, convert the hex — the hex is ground truth.

---

## 1. Color tokens

### Core neutrals & brand
| Token | Hex (source of truth) | oklch | Role |
|-------|----------------------|-------|------|
| `--background` | `#F1EFE8` | `oklch(0.949 0.008 95)` | Page canvas (warm cream) |
| `--foreground` | `#23271E` | `oklch(0.258 0.013 130)` | Primary ink / near-black text |
| `--card` | `#FBFAF5` | `oklch(0.981 0.005 95)` | Card surface on cream |
| `--card-2` | `#F7F5EE` | `oklch(0.966 0.006 95)` | Alt card / inset panel |
| `--muted` | `#E7E6DA` | `oklch(0.918 0.011 100)` | Icon chips, subtle fills |
| `--muted-foreground` | `#6E7263` | `oklch(0.508 0.015 120)` | Secondary text |
| `--subtle-foreground` | `#8A8E7C` | `oklch(0.610 0.018 115)` | Labels, meta, captions |
| `--border` | `#E4E0D4` | `oklch(0.900 0.012 95)` | Hairlines, card borders |
| `--border-strong` | `#CFC9BB` | `oklch(0.828 0.014 95)` | Inputs, outline buttons |

### Forest greens (primary + dark bands)
| Token | Hex | oklch | Role |
|-------|-----|-------|------|
| `--primary` | `#34402A` | `oklch(0.345 0.038 132)` | Primary buttons, solid accents |
| `--primary-foreground` | `#F1EFE8` | `oklch(0.949 0.008 95)` | Text on primary |
| `--ink` | `#23271E` | `oklch(0.258 0.013 130)` | Footer bg, darkest |
| `--ink-2` | `#20251A` | `oklch(0.238 0.015 130)` | Portal sidebar |
| `--forest-band` | `#33402A` | `oklch(0.343 0.039 133)` | Process / principles dark section bg |
| Hero gradient | `#3c4a30 → #222a1c` | `oklch(0.394 0.044 131) → oklch(0.251 0.016 134)` | Hero & CTA banner gradient (≈160deg) |

### Sage accents (the two-tone headline + soft bands)
| Token | Hex | oklch | Role |
|-------|-----|-------|------|
| `--accent` | `#AAB293` | `oklch(0.736 0.034 120)` | **Two-tone headline 2nd line on cream** |
| `--accent-on-dark` | `#AAB795` | `oklch(0.747 0.038 124)` | Two-tone 2nd line on dark bg |
| `--accent-bright` | `#92A075` | `oklch(0.660 0.046 121)` | Headline accent inside green bands |
| `--sage-pale` | `#C7D2AC` | `oklch(0.836 0.046 121)` | Timeline dots, portal accents on dark |
| `--band` | `#DCE3D7` | `oklch(0.906 0.021 137)` | Soft green testimonial / callout band |
| `--band-foreground` | `#2B3324` | `oklch(0.297 0.020 134)` | Text on `--band` |

### Status (calculator chips, portal, upload states)
| Token | Hex | oklch | Role |
|-------|-----|-------|------|
| `--status-paid-bg` | `#DCE3D7` | `oklch(0.906 0.021 137)` | "Paid" / "Received" pill bg |
| `--status-paid-fg` | `#3F4A2C` | `oklch(0.398 0.041 122)` | "Paid" text |
| `--status-due-bg` | `#F0DDD7` | `oklch(0.900 0.024 40)` | "Due" / "Needed" pill bg |
| `--status-due-fg` | `#9A5B4A` | `oklch(0.520 0.083 40)` | "Due" / "Needed" text |
| `--status-warn-bg` | `#EDE7CC` | `oklch(0.918 0.035 100)` | "In progress / partial" pill bg |
| `--status-warn-fg` | `#7A6A2E` | `oklch(0.515 0.066 100)` | partial text |

> **Rule:** components reference **tokens**, never raw hex. The hex column exists so you can verify a 1:1 match against
> the `.dc.html`. If a value in a page file isn't in this table, add a token here rather than inlining hex.

---

## 2. `app/globals.css` — paste this theme block

Extend the existing Tailwind v4 file. Keep the project's `@custom-variant dark`, radius derivation, and `@source not`
directives; replace/augment the color tokens with these. (Dark **bands** here are not "dark mode" — they're sections with
a dark background in normal light mode. Do **not** gate them on `.dark`.)

```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
  /* neutrals */
  --background: oklch(0.949 0.008 95);
  --foreground: oklch(0.258 0.013 130);
  --card: oklch(0.981 0.005 95);
  --card-2: oklch(0.966 0.006 95);
  --muted: oklch(0.918 0.011 100);
  --muted-foreground: oklch(0.508 0.015 120);
  --subtle-foreground: oklch(0.610 0.018 115);
  --border: oklch(0.900 0.012 95);
  --border-strong: oklch(0.828 0.014 95);

  /* forest */
  --primary: oklch(0.345 0.038 132);
  --primary-foreground: oklch(0.949 0.008 95);
  --ink: oklch(0.258 0.013 130);
  --ink-2: oklch(0.238 0.015 130);
  --forest-band: oklch(0.343 0.039 133);
  --forest-grad-from: oklch(0.394 0.044 131);
  --forest-grad-to: oklch(0.251 0.016 134);

  /* sage */
  --accent: oklch(0.736 0.034 120);
  --accent-on-dark: oklch(0.747 0.038 124);
  --accent-bright: oklch(0.660 0.046 121);
  --sage-pale: oklch(0.836 0.046 121);
  --band: oklch(0.906 0.021 137);
  --band-foreground: oklch(0.297 0.020 134);

  /* status */
  --status-paid-bg: oklch(0.906 0.021 137);
  --status-paid-fg: oklch(0.398 0.041 122);
  --status-due-bg: oklch(0.900 0.024 40);
  --status-due-fg: oklch(0.520 0.083 40);
  --status-warn-bg: oklch(0.918 0.035 100);
  --status-warn-fg: oklch(0.515 0.066 100);

  /* radius scale derived from one value */
  --radius: 0.75rem;            /* base ~12px */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-2: var(--card-2);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-subtle-foreground: var(--subtle-foreground);
  --color-border: var(--border);
  --color-border-strong: var(--border-strong);

  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-ink: var(--ink);
  --color-ink-2: var(--ink-2);
  --color-forest-band: var(--forest-band);

  --color-accent: var(--accent);
  --color-accent-on-dark: var(--accent-on-dark);
  --color-accent-bright: var(--accent-bright);
  --color-sage-pale: var(--sage-pale);
  --color-band: var(--band);
  --color-band-foreground: var(--band-foreground);

  --color-status-paid-bg: var(--status-paid-bg);
  --color-status-paid-fg: var(--status-paid-fg);
  --color-status-due-bg: var(--status-due-bg);
  --color-status-due-fg: var(--status-due-fg);
  --color-status-warn-bg: var(--status-warn-bg);
  --color-status-warn-fg: var(--status-warn-fg);

  --font-sans: var(--font-archivo);
  --font-heading: var(--font-archivo);
  --font-mono: var(--font-geist-mono);

  /* radius scale */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: var(--radius);
  --radius-lg: calc(var(--radius) + 4px);
  --radius-xl: calc(var(--radius) + 12px);   /* ~24px — hero/CTA/card shells */
  --radius-2xl: calc(var(--radius) + 18px);
}

/* reusable utilities the pages lean on */
@layer utilities {
  /* the diagonal hatch overlay used on hero/CTA/image placeholders */
  .bg-hatch {
    background-image: repeating-linear-gradient(135deg,
      rgba(255,255,255,.06) 0, rgba(255,255,255,.06) 2px,
      transparent 2px, transparent 16px);
  }
  .bg-hatch-cream {
    background-image: repeating-linear-gradient(135deg,
      rgba(0,0,0,.04) 0, rgba(0,0,0,.04) 2px,
      transparent 2px, transparent 18px);
  }
  /* warm forest gradient used by hero + CTA banner */
  .bg-forest-grad {
    background-image: linear-gradient(150deg, var(--forest-grad-from), var(--forest-grad-to));
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

::selection { background: var(--primary); color: var(--primary-foreground); }
```

---

## 3. Typography

**One family: Archivo** (see `02-CONVENTIONS.md` for `next/font` wiring → `--font-archivo`). Geist Mono stays available
but the final designs use Archivo throughout. There is **no serif**.

### Display headlines (the signature)
- **Weight 800**, `text-transform: uppercase`, `letter-spacing: -0.03em` (tracking tight), `line-height: ~0.95`.
- **Two-tone:** the headline is two or three lines; one line (usually the 2nd) is colored with `--accent` (on cream) or
  `--accent-on-dark` / `--accent-bright` (on green). Achieve with a `<span>` on its own line.
- Fluid sizing with `clamp()`. Canonical scale:

| Use | CSS | Tailwind-ish |
|-----|-----|--------------|
| Hero H1 | `clamp(40px, 6.4vw, 82px)` | `text-[clamp(2.5rem,6.4vw,5.125rem)]` |
| Page H1 | `clamp(38px, 5.6vw, 76px)` | `text-[clamp(2.375rem,5.6vw,4.75rem)]` |
| Section H2 | `clamp(28px, 4vw, 52px)` | `text-[clamp(1.75rem,4vw,3.25rem)]` |
| Sub-section H3 (uppercase) | `22px` / `800` | `text-[22px] font-extrabold` |
| Card title | `17–20px` / `700` | `text-lg font-bold` |

### Body & UI
- Body: Archivo **400–500**, `15–17px`, `line-height 1.55–1.65`, color `--muted-foreground` (or `--foreground` for lead paragraphs).
- Lead paragraph under a hero: `16–18px`, weight 500.
- **Bracketed section label** (appears above most sections): `11px`, weight **700**, `letter-spacing: 0.24em`,
  color `--subtle-foreground`, content like `[ SERVICES ]` (note the literal brackets + spaces). Build as `SectionLabel` in `03`.
- Meta/eyebrow inside cards: `11px`, weight 700, `letter-spacing 0.14–0.16em`, color `--subtle-foreground`.

---

## 4. Shape, depth, motion

- **Radii:** pill buttons `rounded-full`; cards `rounded-2xl` (~18px) to `rounded-[20px]`; hero & CTA shells `rounded-[24px]` (`--radius-xl`); inputs `rounded-[11px]`; small chips `rounded-full`.
- **Borders:** `1.5px solid var(--border)` on cards; `1.5px solid var(--border-strong)` on inputs/outline buttons.
- **Shadows:** sparing. Card lift used on floating elements: `box-shadow: 0 24px 50px -34px rgba(40,38,32,.4)`. Hero featured card: `0 24px 50px -22px rgba(0,0,0,.5)`.
- **Hatch overlay:** the `.bg-hatch` diagonal lines sit at low opacity over every green gradient surface and over image placeholders — it's a core texture of the brand. Always include it on hero, CTA banner, green bands, and image stand-ins.
- **Motion:** restrained. Two named keyframes recur — a gentle `float` (`translateY(0 → -7px)`, 6s) on the hero featured card, and a soft pulse on the "video" REC dot. Hover states: buttons darken (`--primary` → `--ink`), outline buttons fill, cards shift border to `--primary`. Keep transitions ~150–180ms ease.

---

## 5. Buttons (recipes — formalized in `03`)
- **Primary (solid):** `bg-primary text-primary-foreground rounded-full px-7 py-4 font-semibold`, hover `bg-ink`. Often with a trailing `→`.
- **On-dark primary:** `bg-background text-foreground` (cream button on green), hover pure white.
- **Outline:** `border-[1.5px] border-primary text-foreground rounded-full px-6 py-3.5 font-semibold`, hover `bg-muted`.
- **Ghost/underline link:** `font-semibold border-b-[1.5px] border-border` (or border-primary), used for tertiary actions.
- Always `white-space: nowrap` on button labels with a trailing arrow so they never wrap.

---

## 6. Layout rhythm
- Content max width **1240px**, side padding **32px** (`max-w-[1240px] mx-auto px-8`).
- Vertical section padding ~**72–84px** top/bottom on cream sections; green bands ~78–88px.
- Full-bleed green bands break the cream: they span the viewport width with their own inner `max-w-[1240px]`.
- Generous gaps; prefer CSS grid/flex with `gap` over margins.
