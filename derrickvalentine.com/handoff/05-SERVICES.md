# 05 · SERVICES HUB → `app/(marketing)/services/page.tsx`

Reproduce `design-reference/Services.dc.html`. Static RSC. Read `01`–`03` first. Section order:

`SiteHeader` → **Hero (split)** → **Platform grid (2×2)** → **"What you always get" (6)** → **Process band** → **"Not sure which platform?" CtaBanner** → `SiteFooter`.

Pull the 4 platforms' name/blurb/price/chips/route from `lib/services.ts` (`06`) so this hub and the cards/dropdown never drift.

---

## Section 1 — Hero (split)
`max-w-[1240px] mx-auto px-8 pt-[34px] pb-[18px]`. `<SectionLabel>SERVICES</SectionLabel>`, then a grid
`grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-10 items-end mt-[18px]`:
- **Left H1** two-tone (`clamp(38px,5.6vw,76px)`): "Web work, on the / `<span class="text-accent">`platform you're on.`</span>`"
- **Right:** lead p (`text-[16.5px] text-muted-foreground font-medium`): "Shopify, Webflow, WordPress, Squarespace — I build, rebuild, and look after sites on all of them. Every service has a clear price and a real timeline, up front." Then buttons row: **Book a call →** (`pill`, `/book`) + **See pricing** (`pillOutline`, anchor `#platforms`).

→ stacks to 1 col under `md`.

## Section 2 — Platform grid (`id="platforms"`)
`max-w-[1240px] mx-auto px-8 pt-[44px] pb-5`. `grid-cols-2 gap-[18px]` (1 col base). Each card is a `Link` to
`/services/<platform>`, `rounded-[20px] border-[1.5px] border-border bg-card flex flex-col`, hover border→primary:
- **Top media strip** `h-[128px] p-5 flex items-end` with a forest or sage gradient + hatch, the platform name as a big
  uppercase H3 (`text-[34px]`/`#F3F2EA` on the dark ones), and a circular `↗` top-right. Shopify & Squarespace use the
  **forest** strip `linear-gradient(160deg,#46532f,#2a3220)` (white title); Webflow & WordPress use the **sage** strip
  `linear-gradient(160deg,#586b3c,#3a4a28)` (white title) — match the `.dc.html` exactly.
- **Body** `p-[22px] flex flex-col gap-3.5 flex-1`: blurb (`text-[14.5px] text-muted-foreground`), capability chips
  (`border border-border-strong rounded-full px-[11px] py-[5px] text-[11.5px] font-semibold text-status-paid-fg`), then a
  `mt-auto` footer row separated by a top border: **from $X** (`text-[17px] font-extrabold text-primary whitespace-nowrap`)
  + "View <Platform> →" (`text-[13.5px] font-semibold whitespace-nowrap`).

Per-card chips & prices (also in `lib/services.ts`):
| Platform | chips | price |
|---|---|---|
| Shopify | Stores · Migrations · Speed | from $1,200 |
| Webflow | Design · Animation · CMS | from $1,800 |
| WordPress | Builds · Rescues · WooCommerce | from $900 |
| Squarespace | Styling · SEO · Stores | from $750 |

Under the grid: centered helper `text-[13.5px] text-subtle-foreground`: "Each page has a live calculator — get a real estimate in seconds, no email required."

## Section 3 — "What you always get" (6)
`max-w-[1240px] mx-auto px-8 pt-[60px] pb-5`. Grid `grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-12 items-start`:
- **Left:** `<SectionLabel>EVERY PROJECT</SectionLabel>` + H2 "What you always get" (`clamp(26px,3.4vw,44px)`, single line,
  not two-tone) + a `max-w-[340px]` lead: "Whatever the platform, the fundamentals are baked in — no upsells on the things a good site needs."
- **Right:** 2-col grid of 6 cards (`bg-card border-[1.5px] border-border rounded-[14px] p-[18px] flex gap-[13px]`), each a
  24px primary circular `✓` + title (bold 14.5px) + sub (13px muted):
  1. **Clear, fixed pricing** — "A real number before we start."
  2. **Mobile-first & responsive** — "Looks right on every device."
  3. **On-page SEO basics** — "Titles, meta, structure, sitemap."
  4. **Training + walkthrough** — "Run your own site with confidence."
  5. **Clean handoff** — "You own everything, fully."
  6. **14 days of support** — "I fix anything that comes up."

## Section 4 — Process band
Reuse the **same dark-green process band** as the homepage (`<HomeProcess />`) but with this header copy:
H2 "Same simple steps, / `<span class="text-accent-bright">`whatever the platform`</span>`" + `<SectionLabel tone="dark">HOW IT WORKS</SectionLabel>`. Same 01–04 staggered timeline & step copy as homepage. **Extract the band into a shared
`<ProcessTimeline heading=… />` so homepage + services reuse it.**

## Section 5 — CtaBanner
```
eyebrowLine1: "Not sure which"
eyebrowLine2: "platform fits?"      // accent
body: "That's a 15-minute conversation. Tell me your business and your goals — I'll recommend the right platform and a price, no strings."
primary: { label: "Book a call →", href: "/book" }
secondary: { label: "or send a message", href: "/contact" }
```

## Acceptance
- [ ] Split hero, 2×2 platform cards (correct gradients, chips, prices, routes, hover), 6-item "what you always get".
- [ ] Reuses the shared process timeline + CtaBanner + header/footer.
- [ ] Prices/chips sourced from `lib/services.ts` (match dropdown + calculators).
