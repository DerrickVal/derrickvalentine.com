# 06 · SERVICE-PAGE TEMPLATE (read before 07–10)

All four platform pages (`/services/shopify|webflow|wordpress|squarespace`) are **one layout** with per-platform data.
Build **one set of section components** parameterized by a `Service` object, plus a shared **`<ServiceCalculator />`** client
island. Files 07–10 just hand you the data; this file defines the structure + the calculator. Reference any
`design-reference/<Platform> Service.dc.html` for literal values — they're identical in structure.

Section order: `SiteHeader` → **Hero (framework-confirm)** → **"What I do on X" capabilities** → **Price Calculator**
→ **"What's included"** → **Work examples** → **FAQ** → **Testimonial** → **CtaBanner** → `SiteFooter`.

---

## Data model — `lib/services.ts`

This single file feeds the calculators, the service cards, the hub, **and** the Pricing dropdown. One source of truth.

```ts
export type ProjectType = {
  key: "refresh" | "redesign" | "newbuild";
  label: string;     // "Refresh" | "Redesign" | "New build"
  base: number;      // base price (USD)
  perPage: number;   // price per page beyond `included`
  included: number;  // pages included in base
  days: number;      // base business-days
  blurb: string;     // short descriptor under the type
};
export type AddOn = {
  key: string; label: string; sub: string; price: number; days: number;
};
export type Service = {
  slug: "shopify" | "webflow" | "wordpress" | "squarespace";
  name: string;            // "Shopify"
  fromPrice: number;       // 1200 → used by card/dropdown "from $X"
  cardBlurb: string;       // services hub + homepage card blurb
  cardChips: string[];     // ["Stores","Migrations","Speed"]
  hero: { h1a: string; h1b: string; lead: string };  // h1b = accent line
  capabilities: { title: string; body: string }[];   // 6 items "What I do on X"
  types: ProjectType[];    // 3 (refresh/redesign/newbuild)
  addons: AddOn[];         // 5
  included: { title: string; sub: string }[];         // 6 "what's included" items
  works: { name: string; meta: string }[];            // 3 example projects (placeholder)
  faqs: { q: string; a: string }[];                   // 5
  testimonial: { quote: string; name: string; role: string };
  defaultPages: number;    // slider default (5)
  maxPages: number;        // slider max (20)
};
```

### The data (verbatim from the `.dc.html` files — these ARE the approved values)

```ts
export const SERVICES: Record<string, Service> = {
  shopify: {
    slug: "shopify", name: "Shopify", fromPrice: 1200,
    cardBlurb: "Stores that load fast and actually sell — theme work, custom sections, and clean migrations.",
    cardChips: ["Stores", "Migrations", "Speed"],
    hero: {
      h1a: "Shopify stores that", h1b: "actually sell.",
      lead: "New builds, redesigns, migrations, and speed work — done by one developer who knows the platform inside out. Clear price up front.",
    },
    types: [
      { key: "refresh",  label: "Refresh",   base: 1200, perPage: 120, included: 3, days: 5,  blurb: "Polish your current store" },
      { key: "redesign", label: "Redesign",  base: 2400, perPage: 180, included: 5, days: 10, blurb: "New look, same store" },
      { key: "newbuild", label: "New build", base: 3800, perPage: 240, included: 6, days: 18, blurb: "Build from scratch" },
    ],
    addons: [
      { key: "migration", label: "Migrate from another platform", sub: "WooCommerce, Squarespace, Wix…", price: 900, days: 4 },
      { key: "sections",  label: "Custom interactive sections",   sub: "Bespoke homepage / product blocks", price: 650, days: 3 },
      { key: "speed",     label: "Speed & Core Web Vitals",       sub: "Tuning for fast load + SEO", price: 450, days: 2 },
      { key: "blog",      label: "Blog / content setup",          sub: "Templates + first posts styled", price: 350, days: 1 },
      { key: "products",  label: "Bulk product import",           sub: "Up to 200 products, organized", price: 400, days: 2 },
    ],
    defaultPages: 5, maxPages: 20,
    // capabilities / included / works / faqs / testimonial: copy verbatim from
    // design-reference/Shopify Service.dc.html (sections noted below).
  },
  // webflow, wordpress, squarespace → see 08/09/10 for their numbers; structure identical.
};
```

> **07–10 give you each platform's `types`, `addons`, `fromPrice`, hero, and FAQ deltas.** Copy capabilities / included /
> works / testimonial verbatim from each `.dc.html`. Keep `fromPrice` in sync with each `types.refresh.base` (or the
> intended "from") — the dropdown/cards read `fromPrice`.

---

## Section 1 — Hero (framework-confirm)
`max-w-[1240px] mx-auto px-8`. Breadcrumb-ish label row: `<SectionLabel>` reads the platform (e.g. `[ SHOPIFY ]`) — actually
the design uses a small "Services / **Shopify**" breadcrumb + an availability pill; match the `.dc.html`. Grid
`grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-10 items-end`:
- **Left:** small eyebrow ("Expert <Platform> development"), then **H1** two-tone from `hero.h1a` / `hero.h1b` (accent),
  display recipe `clamp(38px,5.4vw,68px)`.
- **Right:** `hero.lead` (`text-[17px] text-muted-foreground font-medium max-w-[480px]`), then buttons: **Get an estimate**
  (`pill`, anchor `#calculator`) + **Book a call** (`pillOutline`, `/book`). Plus a 3-stat strip below (e.g. 35+/60+/120+
  sites, <2s load, turnaround) — copy each page's exact stats from its `.dc.html`.

## Section 2 — "What I do on X" (capabilities)
`max-w-[1240px] mx-auto px-8 pt-[72px]`. `<SectionLabel>WHAT I DO</SectionLabel>` + H2 "What I do on <Platform>" (single
line). Then a **6-card grid** (`grid-cols-3 gap-4`, → 2/1 responsive): each card `bg-card border-[1.5px] border-border
rounded-[16px] p-[22px]` with a small icon tile + title (bold 17px) + body (14px muted). Pull `service.capabilities`
(6 items) — copy verbatim per platform.

## Section 3 — Price Calculator (`id="calculator"`)  ← the centerpiece, client island
Full-bleed **dark green band** (`bg-forest-band` `#33402A`, text `#E9EAE0`), inner `max-w-[1240px] mx-auto px-8 pt-[64px]
pb-[72px]`. Header: `<SectionLabel tone="dark">PRICING</SectionLabel>` + right note "Live estimate · no email required";
H2 "Build your estimate" (`clamp(28px,4vw,52px)`, white); lead "Move the controls and watch the number update…".

Layout grid `grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-6 items-start` (→ stack on `md`). **Left = controls**, **right =
sticky estimate card**.

### `<ServiceCalculator service={service} />` — `"use client"`
Port the logic **exactly** from the `.dc.html` `class Component`. State + formula:

```ts
type State = { type: ProjectType["key"]; pages: number; addons: Record<string, boolean>; care: boolean };
const initial: State = { type: "redesign", pages: service.defaultPages, addons: {}, care: false };

// derive:
const t = service.types.find(x => x.key === state.type)!;
const extraPages = Math.max(0, state.pages - t.included);
let total = t.base + extraPages * t.perPage;
let days  = t.days + extraPages * 0.6;
for (const a of service.addons) if (state.addons[a.key]) { total += a.price; days += a.days; }
days = Math.round(days);
const low  = Math.round(total * 0.90 / 50) * 50;   // "typical range" low
const high = Math.round(total * 1.15 / 50) * 50;   // high
const fmt = (n:number) => "$" + Math.round(n).toLocaleString("en-US");
```

**Controls (left):**
1. **Project type** — 3 selectable cards (Refresh / Redesign / New build) showing `label`, `from $base`, and `blurb`.
   Selected = `border-[1.5px] border-[#B7C29C] bg-[#EEF1E6]` (on the dark band these are light cards); unselected =
   `border-border bg-card`. (Match the `.dc.html` — the controls sit in light cards on the dark band.)
2. **Pages** — a range `input type="range"` min `t.included`? (min is 1; default `defaultPages`; max `maxPages`). Label
   shows `pagesLabel` (`20+` at max) and `includedNote` = `${t.included} incl. · then ${fmt(t.perPage)} ea.`. Style the
   track to brand (primary fill).
3. **Add-ons** — 5 toggle rows. Each row `rowStyle(on)`: `flex justify-between items-center gap-4 px-4 py-3.5 rounded-[12px]
   cursor-pointer border-[1.5px]`, on = `border-[#B7C29C] bg-[#EEF1E6]`, off = `border-border bg-card`. Left: label (bold) +
   `sub` (muted). Right: `+ $price` (`text-status-paid-fg`) and a **switch** (`trackStyle`/`knobStyle`: 46×26 pill,
   primary when on, white 20px knob sliding left:3→23). Clicking the row toggles. Use shadcn `Switch` styled to match, or
   reproduce the track/knob.

**Estimate card (right, sticky `top-5`):** `bg-[#2C3522] border border-white/14 rounded-[22px] p-7`. Contents:
- `YOUR ESTIMATE` label → **big total** `{fmt(total)}` (`clamp(40px,6vw,58px)` extrabold, `#F3F2EA`).
- "Typical range **{fmt(low)} – {fmt(high)}**".
- A timeline chip: dot + "Estimated timeline · **~{days} business days**".
- **Itemized list** (`items`): always `"<TypeLabel> base" = fmt(base)`, then `"+ N extra page(s)" = fmt(extra*perPage)` when
  `extraPages>0`, then each selected add-on `label = fmt(price)`. Render as rows.
- A **Care plan** toggle line (optional monthly) → when `care` on, show "+ $95/mo care" note (`hasMonthly`). (Confirm exact
  care copy in the `.dc.html`.)
- **Book a call** primary cream button → `/book`, then fine print "Final quote confirmed on a 15-min call. Fixed price, in
  writing — no surprises."

> Keep the **math identical** to the snippet (rounding to nearest $50 for the range, `0.6` day per extra page). This is the
> single most important thing to get 1:1 — verify totals against the `.dc.html` for a few input combinations.

## Section 4 — "What's included"
`max-w-[1240px] mx-auto px-8 pt-[72px]`. Left intro (`<SectionLabel>EVERY PROJECT</SectionLabel>` + H2 + lead "No upsells on
the basics. Every <Platform> project ships with the things a good site needs — baked into the price above.") + right a 6-item
checklist grid (✓ tiles). Copy `service.included` verbatim per platform.

## Section 5 — Work examples
3 project cards (sage gradient + hatch placeholder, name + meta). `service.works` — placeholder names; `// TODO(content)`.

## Section 6 — FAQ
`<SectionLabel>FAQ</SectionLabel>` + 5 Q/A. Each item `border-t-[1.5px] border-border-strong pt-[18px]` with H3 (bold
16.5px) + p (14px muted). **Use shadcn `Accordion`** (collapsible) or static stacked items to match the `.dc.html` (it's
static there — either is acceptable; static is truest 1:1). Copy `service.faqs` verbatim per platform.

## Section 7 — Testimonial → CtaBanner → Footer
Small testimonial (single quote + name/role on `bg-band` or card) then the shared `<CtaBanner />`:
```
eyebrowLine1: "Ready to start?"  (or the page's exact CTA — copy from .dc.html)
primary: { label: "Book a call →", href: "/book" }
secondary: { label: "or send a message", href: "/contact" }
```

---

## Build steps
1. Add `lib/services.ts` with all 4 `Service` objects (data from 07–10 + verbatim copy from each `.dc.html`).
2. Build the section components (mostly shared, data-driven).
3. Build `<ServiceCalculator />` client island with the exact formula.
4. Create the 4 route files; each is basically:
   ```tsx
   import { SERVICES } from "@/lib/services";
   export default function Page() { return <ServicePage service={SERVICES.shopify} />; }
   ```
5. Generate `generateMetadata` per platform (title `<Platform> Development — Derrick Valentine`).

## Acceptance (per platform page)
- [ ] Hero, capabilities (6), calculator, included (6), works (3), FAQ (5), testimonial, CTA, footer — in order.
- [ ] Calculator: type cards, pages slider, 5 add-on switches, sticky estimate with live total/range/timeline/itemization; math matches the `.dc.html`.
- [ ] All copy verbatim; prices match `lib/services.ts`, the dropdown, and the hub.
- [ ] `#calculator` anchor scrolls correctly from the Pricing dropdown.
