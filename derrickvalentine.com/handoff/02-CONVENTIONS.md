# 02 · Conventions — Next 16, fonts, structure, the fidelity bar

Read after `01`. This is *how* to translate the designs into this repo without drift.

---

## 1. Fonts — switch the active face to Archivo

The designs use **Archivo** for everything (display + body). The repo currently maps Inter. **Make Archivo the active sans +
heading face.** Keep Geist Mono available for any mono need.

In `app/layout.tsx`:

```ts
import { Archivo } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

`01`'s `@theme inline` already maps `--font-sans` and `--font-heading` to `var(--font-archivo)`, so `font-sans`/default body
text and any `font-heading` utility resolve to Archivo. Update root `metadata` (title `Derrick Valentine — Web Developer`,
description from the homepage lead). Remove the create-next-app default markup in `app/page.tsx` — the homepage replaces it.

---

## 2. Routes & files

App Router, marketing pages in the **root group** (no auth). Portal lives in its own groups (already scaffolded — see `16`).

```
app/
  layout.tsx                 # fonts + metadata + <SiteHeader/> NOT here (header is per marketing layout)
  globals.css                # tokens from 01
  (marketing)/
    layout.tsx               # wraps marketing pages: <SiteHeader/> {children} <SiteFooter/>
    page.tsx                 # /            → Homepage (04)
    services/
      page.tsx               # /services    → hub (05)
      shopify/page.tsx       # /services/shopify     (07)
      webflow/page.tsx       # /services/webflow     (08)
      wordpress/page.tsx     # /services/wordpress   (09)
      squarespace/page.tsx   # /services/squarespace (10)
    work/page.tsx            # /work        → Work (11)
    about/page.tsx           # /about       → About (12)
    process/page.tsx         # /process     → Process (13)
    contact/page.tsx         # /contact     → Contact (14)
    book/page.tsx            # /book        → Book a Call (15)
components/
  site/                      # SiteHeader, SiteFooter, CtaBanner, SectionLabel, PricingMenu … (03)
  marketing/                 # page-specific sections (e.g. HomeHero, ServiceCalculator, WorkGrid)
  ui/                        # shadcn primitives (vendored)
  shadcn-studio/<group>/     # Studio blocks
lib/
  services.ts                # the 4 platforms' pricing/copy data (06–10)
  work.ts                    # portfolio project data (11)
```

> **Marketing layout vs root layout:** put `SiteHeader`/`SiteFooter` in `app/(marketing)/layout.tsx`, **not** the root
> layout — the portal and `/login` must not render the marketing chrome (this also matches the `CLAUDE.md` "separate the
> portal chrome from the marketing root layout" task). `/book` uses a slimmer header/footer; see `15`.

---

## 3. Server vs. client components

Default **RSC**. Add `"use client"` only to the interactive islands listed here — keep them small and leaf-level so the
page stays server-rendered:

| Island | File | Why client |
|--------|------|-----------|
| Pricing dropdown | `components/site/PricingMenu.tsx` | hover/focus open state (can be CSS-only; see `03` — prefer CSS, no JS) |
| Service calculator | `components/marketing/ServiceCalculator.tsx` | `useState` for type/pages/add-ons |
| Work filters + grid | `components/marketing/WorkBrowser.tsx` | `useState` for industry/style |
| Contact form | `components/marketing/ContactForm.tsx` | controlled inputs + Server Action result |
| Scheduler | `components/marketing/Scheduler.tsx` | calendar/slot state (until real Calendly embed) |
| Mobile nav | `components/site/MobileNav.tsx` | open/close |

Everything else — heroes, value grids, process timelines, testimonials, footers — is **static RSC**. Pass data in as props.

---

## 4. shadcn / Shadcn Studio usage

- Install primitives via the repo's pinned vendor flow (`pnpm run vendor:blocks -- only @ss-components/<slug>`), **not**
  `pnpm dlx`. Studio uses its own slugs.
- **Map the design to these primitives** rather than hand-rolling: `Button` (the reference pattern in
  `components/ui/button.tsx`), `Input`, `Textarea`, `Select`, `Label`, `Accordion` (FAQ on service pages), `Badge`
  (status pills), `Card` (optional — most cards here are simple divs and that's fine), `Avatar` (portal user),
  `NavigationMenu` or a CSS dropdown for Pricing, `Calendar` (scheduler base). `Dialog`/`Sheet` for mobile nav.
- Add **button variants** to match `01`: extend `buttonVariants` with `pill` sizing (`rounded-full px-7 h-12`) and an
  `onDark` variant (cream bg). Don't fight the design into default shadcn sizes — adjust the `cva` recipe.
- Keep `data-slot`/`data-variant` conventions; import from the consolidated `radix-ui` package.

---

## 5. Translating inline-style specs → Tailwind

The `.dc.html` files use **inline styles** (that was the design tool's constraint). Convert to Tailwind utilities + tokens:

| Inline in `.dc.html` | Becomes |
|----------------------|---------|
| `background:#F1EFE8` | `bg-background` |
| `color:#23271E` | `text-foreground` |
| `color:#6E7263` | `text-muted-foreground` |
| `color:#8A8E7C` (label) | `text-subtle-foreground` |
| `background:#34402A;color:#F1EFE8` | `bg-primary text-primary-foreground` |
| `border:1.5px solid #E4E0D4` | `border-[1.5px] border-border` |
| `border-radius:999px` | `rounded-full` |
| `border-radius:24px` | `rounded-[24px]` (or `rounded-xl` via `--radius-xl`) |
| `linear-gradient(150deg,#3c4a30,#222a1c)` | `bg-forest-grad` (utility in `01`) |
| the diagonal hatch | `bg-hatch` (overlay div) utility in `01` |
| `letter-spacing:.24em` | `tracking-[0.24em]` |
| `font-size:clamp(...)` | `text-[clamp(...)]` |
| `max-width:1240px;margin:0 auto;padding:… 32px` | `max-w-[1240px] mx-auto px-8` |

**Numbers are exact.** When a file says `padding:24px`, use `p-6` (24px) — don't approximate to `p-5`. When it's an
off-grid value like `13px`, use the arbitrary `p-[13px]`. Fidelity > tidy class names.

> When in doubt about a measurement, **open the page's `.dc.html` in `design-reference/` and read the literal value.**
> That file is the spec.

---

## 6. Images & placeholders

The designs use **gradient + hatch placeholders** where real media goes (hero video, portrait, project shots). For each:
- Render a placeholder now: a `rounded-[…]` div with `bg-forest-grad` or a sage gradient + `bg-hatch` overlay + a small
  caption label (e.g. `PHOTO — Derrick at work`). Each page file says exactly which.
- Wire it so dropping in a real asset is trivial: accept an optional `src` prop; if absent, show the placeholder. Real
  assets will live under `public/` (portrait `public/derrick.jpg`, work shots `public/work/<slug>/…` per the repo's
  `docs/content/` convention). The **hero "video"** should become a `<video autoPlay muted loop playsInline>` when a file
  exists; until then, the gradient placeholder with the pulsing REC dot stands in.
- Don't invent stock imagery. Placeholder until Derrick supplies media.

---

## 7. Copy

All copy in the `.dc.html` files is **approved and final for the prototype** — reproduce it verbatim (it's written in the
"friendly but punchy, person-forward" voice). Names, stats (120+, 4.9★), prices, project names, and testimonials are
realistic **placeholders**; keep them as-is but mark obvious ones with a `// TODO(content):` so Derrick can swap later.
Don't paraphrase headlines — the two-tone line breaks are intentional.

---

## 8. The fidelity bar (what "1:1" means here)

A page is done when, side by side with its `.dc.html` rendered at 1280px:
- Same **section order** and vertical rhythm.
- Same **headline wording and line breaks**, same two-tone accent line.
- Same **colors** (via tokens) and **type sizes/weights/tracking**.
- Same **component shapes** (radii, borders, pills) and **hover states**.
- Same **interactions** (calculator math, filters, form success state, scheduler flow) — logic ported from the
  `class Component` block in the `.dc.html`.
- Responsive: graceful at 1024 and 375 (each file notes how multi-column grids collapse).

Pixel-identical isn't required; **structurally and stylistically indistinguishable** is. When unsure, match the `.dc.html`.
