# 03 · Shared Components — build these once, every page imports them

These live in `components/site/`. They are the chrome + repeated primitives. Build them before any page so pages just
compose them. **Route map** (the `.dc.html` files link to `*.dc.html`; use these real routes):

| `.dc.html` link | Real route |
|---|---|
| `Homepage.dc.html` | `/` |
| `Work.dc.html` | `/work` |
| `Services.dc.html` | `/services` |
| `Shopify Service.dc.html` | `/services/shopify` |
| `Webflow Service.dc.html` | `/services/webflow` |
| `WordPress Service.dc.html` | `/services/wordpress` |
| `Squarespace Service.dc.html` | `/services/squarespace` |
| `…#calculator` | `/services/<x>#calculator` (anchor to the calculator section) |
| `Process.dc.html` | `/process` |
| `About.dc.html` | `/about` |
| `Contact.dc.html` | `/contact` |
| `Book a Call.dc.html` | `/book` |
| `Client Portal.dc.html` | `/login` |

---

## 1. `<SiteHeader />` — RSC (the dropdown is CSS-only, no JS)

Sticky-free top bar, `max-w-[1240px] mx-auto px-8 py-6`, flex space-between, three groups: **brand · nav · actions**.

**Brand:** a 34px `rounded-[9px] bg-primary text-primary-foreground` square reading **DV** (extrabold 15px), then
**Derrick Valentine** (bold 16px). Links to `/`.

**Nav (center):** `flex items-center gap-[30px]`, links `text-[14.5px] font-medium text-[#3A3E33]` (use
`text-foreground/80` ≈ that warm gray, or add a token `--nav-fg: oklch(0.345 0.012 130)`): **Work · Services · Pricing▾ · Process · About**. The active page's link is weight 700, full `text-foreground`.

**Actions (right):** **Client login** = outline pill (`border-[1.5px] border-border-strong rounded-full px-4 py-2.5
text-sm font-medium`, hover border→primary) → `/login`. **Book a call** = solid primary pill (`bg-primary
text-primary-foreground rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap`, hover bg→ink) → `/book`.

### Pricing dropdown — `<PricingMenu />` (pure CSS hover/focus, no client JS)
Exact behavior from the design (`.pdd` / `.pdd-menu`): a trigger "Pricing ▾"; on hover of the wrapper the menu fades in
(opacity+translateY), centered under the trigger, `min-w-[248px]`, `bg-card border-[1.5px] border-border rounded-[14px]
p-2`, soft shadow `0 20px 44px -22px rgba(40,38,32,.5)`. The wrapper has `pb-[18px] -mb-[18px]` so the hover gap doesn't
close it.

Menu rows (each a `Link`, `flex justify-between gap-[18px] px-3 py-2.5 rounded-[9px] text-[13.5px] font-semibold`, hover
`bg-[#EFEEE7]`/`bg-muted`):

| Label | Right meta | Href |
|---|---|---|
| Shopify | `from $1,200` | `/services/shopify#calculator` |
| Webflow | `from $1,800` | `/services/webflow#calculator` |
| WordPress | `from $900` | `/services/wordpress#calculator` |
| Squarespace | `from $750` | `/services/squarespace#calculator` |
| *(divider)* | | |
| All services & pricing → | | `/services` |

The right-meta prices use `text-subtle-foreground font-bold text-xs`. **Keep prices in `lib/services.ts`** (see `06`) and
map them so they never drift from the calculators.

> Accessibility: also open on focus-within (`:focus-within` mirror of `:hover`) and make the trigger a `<button>` so
> keyboard users reach it. For mobile, the dropdown collapses into the `MobileNav` sheet as a "Pricing" group.

### Mobile (`<MobileNav />`, client)
Below `md`, hide the center nav + actions, show a hamburger that opens a `Sheet` (shadcn) listing Work, Services, the four
platforms (under a "Pricing" subhead), Process, About, then Client login + Book a call buttons. Brand stays left.

---

## 2. `<SiteFooter />` — RSC

Full-bleed `bg-ink text-[#C2C6B5]` (use `text-muted-foreground`-on-dark ≈ `oklch(0.78 0.012 120)`; add token
`--footer-fg` if helpful). Inner `max-w-[1240px] mx-auto px-8 pt-[60px] pb-[30px]`.

Top: 4-col grid `1.6fr 1fr 1fr 1fr`, gap 40/32, bottom border `1px rgba(241,239,232,.12)`, `pb-[46px]`:
- **Col 1 (brand):** DV square (cream bg, ink text) + name, then tagline *"One developer who builds, fixes, and looks after websites — on the platform you already use."* `max-w-[300px] text-sm text-[#9DA28F] leading-relaxed`.
- **Col 2 — SERVICES:** heading (11px/700/tracking .2em/`#7E836F`), links: Shopify, Webflow, WordPress, Squarespace → the four routes.
- **Col 3 — COMPANY:** Work `/work`, Process `/process`, About `/about`, Contact `/contact`.
- **Col 4 — CLIENTS:** Client login, Upload content, Project status, Invoices — all → `/login` for now.
- Footer link style: `text-sm text-[#C2C6B5]` hover `text-[#F1EFE8]`. The **current page**'s matching link is
  `text-[#F1EFE8] font-semibold`.

Bottom row (`pt-6`, flex space-between, `text-[12.5px] text-[#7E836F]`): `© 2026 Derrick Valentine. All rights reserved.`
and right-side links **Upwork · LinkedIn · Privacy**.

> Some pages render a **slim footer** variant (Book a Call). Support a `variant?: "full" | "slim"` prop; slim = just the
> brand row + "Prefer to write? Send a message →" + copyright (see `15`).

---

## 3. `<CtaBanner />` — RSC (used on nearly every page)

The recurring closing call-to-action. A `rounded-[24px]` shell, `bg-forest-grad` + `.bg-hatch` overlay + a radial sage
glow (`radial-gradient(90% 120% at 85% 20%, rgba(150,170,120,.3), transparent 60%)`), padding
`clamp(44px,6vw,84px) clamp(32px,5vw,68px)`, inside a `max-w-[1240px] mx-auto px-8` section.

Props: `eyebrowLine1`, `eyebrowLine2` (the two-tone headline lines), `body`, `primary` ({label, href}), `secondary`
({label, href}). Content block `max-w-[660px]`:
- H2: line 1 `text-primary-foreground`, line 2 `<span class="text-accent-on-dark">`, the display style (extrabold,
  uppercase, tracking -.03em, `clamp(30px,4.6vw,58px)`, leading .98).
- Body `mt-5 max-w-[460px] text-[16.5px] text-[#D9DBCD] font-medium`.
- Buttons row: primary = **cream** pill (`bg-background text-foreground`, hover white) with trailing `→`; secondary =
  underline link on dark (`text-[#E3E4D8] border-b-[1.5px] border-[rgba(241,239,232,.4)]`).

Homepage/About/Process/Services/Work each pass their own copy (given in the page files). Default primary → `/book`.

---

## 4. `<SectionLabel>` — RSC

The bracketed eyebrow. Renders `[ &nbsp;LABEL&nbsp; ]` exactly (literal brackets + non-breaking spaces), `text-[11px]
font-bold tracking-[0.24em] text-subtle-foreground`. On dark bands pass `tone="dark"` → `text-[#9AA683]`. Prop: `children`
(the label text, already uppercase).

```tsx
export function SectionLabel({ children, tone = "light" }:{children:React.ReactNode; tone?:"light"|"dark"}) {
  return (
    <span className={cn("text-[11px] font-bold tracking-[0.24em]",
      tone === "dark" ? "text-[#9AA683]" : "text-subtle-foreground")}>
      [ &nbsp;{children}&nbsp; ]
    </span>
  );
}
```

---

## 5. `<TwoToneHeading>` — RSC helper (optional but handy)

Most H1/H2 are two lines with the 2nd colored. A small helper keeps them consistent:

```tsx
// props: lines: string[]; accentIndex?: number; as?: "h1"|"h2"; size: tailwind clamp class; tone?: "light"|"dark"
```
Renders the display recipe (extrabold uppercase tracking-tight leading-[.95]) with the accent line wrapped in
`text-accent` (light) / `text-accent-on-dark` or `text-accent-bright` (dark). Each page file says which line is accented
and the exact words/breaks — **preserve the line breaks** (`<br/>`).

---

## 6. Button recipes (extend `buttonVariants` — `components/ui/button.tsx`)

Add variants/sizes so pages never hand-roll:
- `variant="pill"` (default solid): `bg-primary text-primary-foreground hover:bg-ink rounded-full font-semibold`.
- `variant="pillOutline"`: `border-[1.5px] border-primary text-foreground hover:bg-muted rounded-full font-semibold bg-transparent`.
- `variant="pillOnDark"`: `bg-background text-foreground hover:bg-white rounded-full font-semibold`.
- `size="pill"`: `h-12 px-7 text-[15px]`; `size="pillSm"`: `h-11 px-5 text-sm`.
- Trailing-arrow buttons: render an arrow `→` span and keep `whitespace-nowrap`.

Use `asChild` + `next/link` for navigation buttons.

---

## 7. Reusable bits that recur (build as tiny components or utility classes)
- **Image/Video placeholder** `<MediaPlaceholder>`: rounded box, sage or forest gradient, `.bg-hatch` overlay, optional
  corner caption chip (`bg-[rgba(20,24,16,.5)] backdrop-blur rounded-[10px] px-3 py-2 text-[11px] font-semibold
  text-[#EDEEE3] tracking-[.1em]`). Props: `label`, `ratio`, `tone="sage"|"forest"`, optional `src` (renders `<img>`/
  `<video>` instead). Used by Homepage hero/work, About portrait, Work cards, Process none.
- **Status pill** `<StatusPill tone="paid|due|warn">`: `rounded-full px-[11px] py-1 text-[11.5px] font-bold` using the
  `--status-*` tokens. Used in the calculator add-ons, portal invoices, and upload states.
- **Stat** (number + caption): extrabold `clamp` number in `text-primary`, small caption in `text-muted-foreground`.
  Used in About quick-facts and the hero trust badge.

---

## Acceptance
- [ ] Header matches the design at 1280: brand, 5 nav items with the Pricing dropdown revealing 4 priced rows + "All services", login + book buttons.
- [ ] Dropdown opens on hover **and** keyboard focus; links hit the right `#calculator` anchors.
- [ ] Footer: 4 columns with correct links + bottom bar; dark `bg-ink`.
- [ ] `CtaBanner`, `SectionLabel`, button variants exist and are used by pages (no duplicated markup).
- [ ] Mobile: hamburger → sheet with all nav + actions; no horizontal scroll at 375.
