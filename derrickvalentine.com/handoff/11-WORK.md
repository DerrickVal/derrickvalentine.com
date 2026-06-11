# 11 · WORK → `app/(marketing)/work/page.tsx`

Reproduce `design-reference/Work.dc.html`. Filterable portfolio — **audience #3's path**. The page shell is RSC; the
filter+grid is **one client island** `<WorkBrowser />`. Section order:

`SiteHeader` → **Hero (split)** → **Filter bar (industry × style)** → **Project grid / empty state** → **CtaBanner** → `SiteFooter`.

---

## Data — `lib/work.ts`
```ts
export type Project = {
  name: string; industry: Industry; platform: string; style: Style; metric: string;
  slug?: string;   // for /work/<slug> later + asset folder public/work/<slug>/
};
export type Industry = "Roofing"|"Restaurant"|"Salon"|"E-commerce"|"Legal"|"Healthcare";
export type Style = "Bold"|"Minimal"|"Classic"|"Playful";

export const INDUSTRIES = ["All","Roofing","Restaurant","Salon","E-commerce","Legal","Healthcare"] as const;
export const STYLES = ["All","Bold","Minimal","Classic","Playful"] as const;

export const PROJECTS: Project[] = [
  { name: "Northside Roofing", industry: "Roofing",    platform: "WordPress",   style: "Bold",    metric: "+38% estimate calls" },
  { name: "Maple & Vine",      industry: "Restaurant", platform: "Squarespace", style: "Classic", metric: "+30% reservations" },
  { name: "Studio Bloom",      industry: "Salon",      platform: "Webflow",     style: "Minimal", metric: "+44% time on site" },
  { name: "Harbor Goods",      industry: "E-commerce", platform: "Shopify",     style: "Bold",    metric: "+52% mobile conv." },
  { name: "Reyes Law",         industry: "Legal",      platform: "Webflow",     style: "Classic", metric: "2× consultations" },
  { name: "Peak Dental",       industry: "Healthcare", platform: "WordPress",   style: "Minimal", metric: "+27% bookings" },
  { name: "Cedar & Co",        industry: "Restaurant", platform: "Webflow",     style: "Playful", metric: "Booked-out weekends" },
  { name: "Summit Roofing",    industry: "Roofing",    platform: "Squarespace", style: "Minimal", metric: "Cleaner quote flow" },
  { name: "Glow Bar",          industry: "Salon",      platform: "Squarespace", style: "Playful", metric: "+40% gift cards" },
  { name: "Ironclad Fitness",  industry: "E-commerce", platform: "Shopify",     style: "Bold",    metric: "+33% order value" },
  { name: "Hartwell Clinic",   industry: "Healthcare", platform: "Squarespace", style: "Classic", metric: "Faster intake" },
  { name: "Vellum Studio",     industry: "E-commerce", platform: "Webflow",     style: "Minimal", metric: "+48% conversion" },
];
```
All projects are **placeholders** (`// TODO(content)`). Real ones map to `public/work/<slug>/` per `docs/content/`.

---

## Section 1 — Hero (split)
`max-w-[1240px] mx-auto px-8 pt-[34px] pb-2.5`. `<SectionLabel>WORK</SectionLabel>` + grid
`grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-10 items-end mt-[18px]`:
- **H1** two-tone "Recent work / `<span class="text-accent">`worth a look.`</span>`" (`clamp(38px,5.6vw,76px)`).
- Lead: "Real sites for real businesses, across every platform I work on. Filter by industry or style to find something close to yours."

## Section 2+3 — `<WorkBrowser />` (`"use client"`)
State: `{ industry: Industry|"All", style: Style|"All" }`, both default `"All"`.

**Filter bar:** `border-y-[1.5px] border-border py-[22px]`, two rows. Each row: a fixed-width 74px label
(`INDUSTRY` / `STYLE`, 11px/700/tracking-[.16em]/`text-subtle-foreground`) then a wrap of chips. Chip =
`rounded-full px-4 py-[9px] text-[13.5px] font-semibold border-[1.5px]`. Active chip = `bg-primary text-primary-foreground
border-primary`; inactive = `border-border-strong text-muted-foreground bg-transparent`, hover border→primary. Clicking a
chip sets that dimension. **`whitespace-nowrap` on every chip** (so "E-commerce" never wraps).

Below the bar (`flex justify-between mt-4`): **"Showing N projects"** (count of filtered; `1 project` singular) on the left;
a **"Clear filters ✕"** underline button on the right that appears **only when** `industry!=="All" || style!=="All"` →
resets both to "All".

**Filtering:** `PROJECTS.filter(p => (industry==="All"||p.industry===industry) && (style==="All"||p.style===style))`.

**Grid (`min-h-[380px]`):** if results, `grid-cols-3 gap-[18px]` (→ 2/1) of cards. Card = `Link` (to `#case` placeholder
for now; later `/work/<slug>`), `rounded-[18px] border-[1.5px] border-border bg-card overflow-hidden flex flex-col`, hover
border→primary:
- 172px media: sage gradient `linear-gradient(150deg,#cdd3bd,#a3ac88)` + hatch; **top-right** a cream pill with the
  `platform`; **bottom-left** a dark glass pill with the `style`.
- Body `p-[18px]`: industry eyebrow (11px/700/tracking-[.14em]/`text-subtle-foreground`), `name` (bold 18px), then
  `mt-auto pt-3` a 7px sage dot + `metric` (13px `text-muted-foreground` 600).

If **no** results: a dashed-border card (`border-[1.5px] border-dashed border-border-strong rounded-[18px] p-16 text-center
bg-card`): "No projects match that combination" (bold 20px) + "Try a different industry or style — or clear the filters to
see everything." + a primary **Clear filters** button.

## Section 4 — CtaBanner
```
eyebrowLine1: "Want one"
eyebrowLine2: "like these?"     // accent
body: "Tell me your business and your platform on a quick call — you'll leave with a real number and a timeline."
primary: { label: "Book a call →", href: "/book" }
secondary: { label: "or see services & pricing", href: "/services" }
```

## Notes
- The homepage's "Latest Work" filter chips are decorative; **this** page is where filtering actually works.
- Consider syncing filter state to the URL (`?industry=Roofing&style=Bold`) with `useSearchParams`/`router.replace` so a
  filtered view is shareable — nice-to-have, not required for 1:1.

## Acceptance
- [ ] Two independent filter dimensions; chips highlight; count updates; clear-filters appears only when filtering.
- [ ] 12 placeholder cards with platform/style/industry/name/metric; correct empty state for impossible combos (e.g. Legal+Playful).
- [ ] Hero + CtaBanner + chrome match. No chip label wraps. Lint clean.
