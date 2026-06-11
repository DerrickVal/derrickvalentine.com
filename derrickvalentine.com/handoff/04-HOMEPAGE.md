# 04 · HOMEPAGE → `app/(marketing)/page.tsx`

**Goal:** reproduce `design-reference/Homepage.dc.html` 1:1. Read `01`, `02`, `03` first. Open the `.dc.html` alongside
this file for literal values. Section order top→bottom:

`SiteHeader` → **Hero** → **Values ("Why me")** → **Process band** → **Services (4 platform cards)** → **Testimonial band**
→ **Latest Work showcase** → **CtaBanner** → `SiteFooter`.

Page wrapper: nothing special — `SiteHeader`/`SiteFooter` come from the `(marketing)/layout.tsx`. Each section below is its
own RSC component in `components/marketing/home/`. The whole page is **static RSC** (no client islands on the homepage).

---

## Section 1 — Hero  (`<HomeHero />`)

A single **full-bleed rounded shell** inside `max-w-[1240px] mx-auto px-8 pt-2 pb-8`. The shell:
`relative rounded-[24px] overflow-hidden min-h-[640px] flex flex-col justify-end p-12` with background
`linear-gradient(160deg,#3c4a30 0%,#2c3623 55%,#222a1c 100%)` (use `bg-forest-grad` or a custom 3-stop; match the 3 stops).

**Layers inside (absolute):**
1. **Media placeholder / video:** `absolute inset-0`. This is where the hero **video** goes. Implement
   `<MediaPlaceholder tone="forest" video label="VIDEO — hero loop">`. Until a real file exists, render the gradient +
   two overlays: a 125° hatch at `opacity .5` and a radial sage glow `radial-gradient(120% 90% at 70% 10%, rgba(150,170,120,.28), transparent 60%)`. When `public/hero.mp4` exists, render `<video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">` *under* the glow.
2. **REC chip** (top-left, `top-[22px] left-[22px]`): pill `bg-[rgba(20,24,16,.42)] backdrop-blur border border-white/15
   rounded-full px-3.5 py-2`, a pulsing dot (8px, `#E4684A`, `animate` the `recpulse` keyframe) + `VIDEO — hero loop`
   (`text-[11px] font-semibold tracking-[.14em] text-[#E9EAE0]`).
3. **Trust badge** (top-right): `bg-[rgba(241,239,232,.94)] rounded-[14px] px-[18px] py-[13px]`, two stats split by a
   1px divider — **120+** / "sites shipped" and **4.9★** / "avg. rating" (number extrabold 19px, caption 11px
   `text-[#5C6052]`). `// TODO(content)` on the numbers.
4. **Floating featured card** (`top-[96px] right-[36px] w-[236px]`, `animate float`): cream card `rounded-[18px] p-3.5`
   shadow `0 24px 50px -22px rgba(0,0,0,.5)`. Top row: `FEATURED` label + 26px circular `↗` button (primary bg). Then a
   104px sage-gradient+hatch thumb. Then **Northside Roofing** (bold 14px) / "WordPress rebuild · +38% leads" (12px
   muted). Links to `/work`. `// TODO(content)`.

**Hero content** (`relative max-w-[780px]`, bottom-anchored by the shell's `justify-end`):
- Availability pill: `inline-flex bg-white/15 border border-white/20 rounded-full px-3.5 py-[7px]`, 7px dot `#9DB07E`
  + "Solo developer · available this month" (`text-[12.5px] text-[#E4E5DA] font-medium`).
- **H1** (two-tone, 3 lines), `text-[#F3F2EA]`, extrabold uppercase `tracking-[-.03em] leading-[.96]`
  `text-[clamp(40px,6.4vw,82px)]`:
  ```
  One developer.
  Every platform.   ← <span className="text-accent-on-dark"> (#AAB795)
  No runaround.
  ```
  (Only the middle line is sage. Keep all three line breaks.)
- Lead `mt-6 max-w-[520px] text-[clamp(15px,1.5vw,18px)] leading-[1.55] text-[#D9DBCD] font-medium`:
  "Shopify, Webflow, WordPress, Squarespace — I design, build, and look after sites for businesses that want it done right the first time."
- Actions row (`mt-8 flex flex-wrap gap-[13px] items-center`):
  - **Book a call** → `/book`, `Button variant="pillOnDark"` (cream bg) with trailing `→`.
  - **Explore work** → `/work`, outline-on-dark pill (`border-[1.5px] border-[rgba(241,239,232,.55)] text-[#F1EFE8]`, hover border white).
  - **01 —— 03** progress meter: `01` (white) · 54px hairline · `03` (`text-[#C7CABA]`), `text-[13px] font-semibold tracking-[.08em]`. Purely decorative.

**Responsive:** under `md`, badge + featured card may overlap text — hide the floating featured card and trust badge below
`lg` (or reflow trust badge under the H1). H1 clamp handles scaling. Shell `min-h` can reduce to `~520px` on mobile.

---

## Section 2 — Values "Why me"  (`<HomeValues />`)

`max-w-[1240px] mx-auto px-8 pt-[72px] pb-20`. Header row (`flex justify-between flex-wrap mb-10`):
`<SectionLabel>WHY ME</SectionLabel>` on the left; right = two underlined mini-links **What I do** `01` (→ `/services`) and
**Recent work** `02` (→ `/work`) — each `border-b-[1.5px] border-[#DAD6C9] pb-[7px]`, number in `text-[#9A9C8C]`.

Body grid `grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] gap-[52px] items-center` (stack to 1 col under `md`):
- **Left — portrait placeholder:** `<MediaPlaceholder tone="sage" ratio="4/5" label="PHOTO — Derrick at work">`,
  `rounded-[20px] min-h-[380px]`, sage gradient `linear-gradient(155deg,#c9cfb8,#9da683)` + 135° hatch + bottom-left caption
  chip. Real asset → `public/derrick.jpg`.
- **Right:**
  - **H2** two-tone (`clamp(30px,4vw,52px)`, extrabold uppercase tracking-[-.025em] leading-none):
    "Not an agency." / `<span class="text-accent">Better than one.</span>"
  - Lead `mt-0 mb-9 max-w-[440px] text-base leading-relaxed text-[#5C6052] font-medium`: "No account managers, no markups,
    no mystery timeline. Just one developer who picks up the phone and ships good work — on whatever platform you're already on."
  - **2×2 value grid** `gap-[32px_36px]`. Each cell: a 38px `rounded-[11px] bg-muted` icon tile holding a tiny
    geometric glyph drawn with borders (square / circle / triangle / rotated square — all `#34402A`), then H3 (bold 17px
    tracking-[-.01em]) + p (14px `text-[#6E7263]`):
    1. **Works on your platform** — "Shopify, Webflow, WordPress, Squarespace — I meet you where your site already lives."
    2. **Pricing up front** — "Real numbers before we start. No vague "let's discuss budget" quotes."
    3. **Fast, and on time** — "Most refreshes ship in days. You'll always know the timeline."
    4. **One person, accountable** — "You talk to me, not a project manager. Every step of the way."
  - The icon glyphs are decorative; lucide equivalents (Square, Circle, Triangle, Diamond) are an acceptable 1:1 substitute.

---

## Section 3 — Process band  (`<HomeProcess />`)

Full-bleed **dark green** band `bg-primary text-[#E9EAE0]` (`#34402A`). Inner `max-w-[1240px] mx-auto px-8 pt-[78px]
pb-[88px]`. Header row (`flex items-end justify-between flex-wrap mb-[54px]`): **H2** two-tone "Simple steps from /
`<span class="text-accent-bright">`call to launch`</span>`" (`clamp(30px,4.3vw,56px)`), and right
`<SectionLabel tone="dark">HOW IT WORKS</SectionLabel>`.

**Staggered horizontal timeline:** a relative wrapper with a center horizontal hairline (`absolute inset-x-0 top-1/2 h-[1.5px] bg-[rgba(233,234,224,.22)]`), over a `grid-cols-4 gap-6`. Each column is `relative h-[248px] flex flex-col`
with a 16px dot on the line (`absolute top-[calc(50%-8px)] left-0 rounded-full bg-sage-pale border-[3px] border-primary`).
Odd steps (01, 03) sit **below** the line (`mt-auto`); even steps (02, 04) sit **above** (`mb-auto`). Each:
`NN | Title` (extrabold 15px, `text-sage-pale`, tracking-[.02em]) + p (14px `text-[#C2C6B5]`):
1. **Quick call** — "15 minutes. Your platform, your goals, and a real number — no pressure, no pitch."
2. **Plan & price** — "I scope it, price it, and set a timeline — fixed, in writing, before any work starts."
3. **Build** — "You watch it come together — and upload your content — right inside your client portal."
4. **Launch & care** — "We go live, then I keep it fast, secure, and up to date. You focus on the business."

**Responsive:** under `md` drop the center line and stack the 4 as a vertical list (number+title+text), or 2×2. The
staggering is a desktop nicety; don't preserve it on mobile.

---

## Section 4 — Services (4 platform cards)  (`<HomeServices />`)

`max-w-[1240px] mx-auto px-8 pt-[78px] pb-[84px]`. Header row: `<SectionLabel>SERVICES</SectionLabel>` + right link
**See all services →** (→ `/services`, `border-b-[1.5px] border-primary pb-1 text-sm font-semibold`). Then **H2** two-tone
"Pick your platform. / `<span class="text-accent">`I'll take it from there.`</span>`" (`clamp(28px,3.8vw,50px)`, `max-w-[760px] mb-[34px]`).

**Card grid** `grid-cols-[1.5fr_1fr_1fr_1fr] gap-4` (→ 2 cols `md`, 1 col base). All cards `relative rounded-[20px]
overflow-hidden min-h-[430px] flex flex-col justify-between` + a 135° hatch overlay. Data → pull from `lib/services.ts`
(see `06`); render the first card "featured" (dark), the rest "light":

| Card | bg | text | title size | tags | blurb | price |
|------|----|------|-----------|------|-------|-------|
| **Shopify** (featured) | `linear-gradient(165deg,#46532f,#2c3520)` | `#F1EFE8` | 40px | Stores · Migrations · Speed (pill chips, top) | "Stores that load fast and actually sell — theme work, custom sections, and clean migrations." | `from $1,200` (`text-sage-pale`) |
| **Webflow** | `linear-gradient(165deg,#dfe1d2,#c4c9b1)` | `#23271E` | 25px | — (↗ top-right) | "Custom, animated sites with a CMS your team can actually run." | `from $1,800` (`text-status-paid-fg`) |
| **WordPress** | `linear-gradient(165deg,#e4e3d6,#cdcab6)` | `#23271E` | 22px | — | "Reliable, easy-to-edit sites — rebuilds, rescues, and ongoing care." | `from $900` |
| **Squarespace** | `linear-gradient(165deg,#dfe1d2,#c4c9b1)` | `#23271E` | 23px | — | "Clean, polished sites done quickly — perfect for a sharp first impression." | `from $750` |

- Featured card: tags row at top (`bg-white/15 border border-white/20 rounded-full px-3 py-1.5 text-[11.5px]`), then bottom
  block with title + 40px circular cream `↗` + blurb (`max-w-[330px] text-[#D7DAC9]`) + price.
- Light cards: a 36px circular **primary** `↗` self-aligned top-right, then bottom block title (extrabold uppercase
  tracking-[-.03em] leading-[.92]) + blurb (`text-[#54584A]`) + price. "Square­space" uses a soft hyphen `&shy;` so it can
  break.
- Each card links to its `/services/<platform>` route. Hover: subtle brightness or border (optional).

**Responsive:** featured collapses to full width; the 3 light cards become 2-up then 1-up. Title sizes stay as given.

---

## Section 5 — Testimonial band  (`<HomeTestimonial />`)

Full-bleed `bg-band` (`#DCE3D7`). Inner `max-w-[980px] mx-auto px-8 py-[72px] text-center`.
`<SectionLabel>` (tone uses `#7D8A6E`) → big quote (`mt-[26px] mb-[30px] font-semibold clamp(22px,2.9vw,34px) leading-[1.32]
tracking-[-.015em] text-band-foreground`) with two phrases accented in `#8C977A`:
> "Derrick rebuilt our site in a **week** and it finally looks like the company we actually are. And when something comes up, **he picks up the phone.**"

Then a centered author row: a `←` and `→` 42px circular outline buttons (`border-[1.5px] border-[#B4BFA6] text-[#4A5340]`)
flanking **Marcus Reyes** / "Owner, Reyes Law". The arrows imply a carousel — for now they can be static/no-op (or wire a
tiny client carousel if trivial; **not required** for 1:1). `// TODO(content)` on the testimonial.

---

## Section 6 — Latest Work showcase  (`<HomeWork />`)

`max-w-[1240px] mx-auto px-8 pt-20 pb-[84px]`, `id="work"` not needed (route is `/work`). Header row (`flex items-end
justify-between mb-[30px]`): left = `<SectionLabel>WORK</SectionLabel>` + **H2** "Recent work / `<span class="text-accent">`worth a look.`</span>`" (`clamp(28px,3.8vw,50px)`, mt-4). Right = a row of filter **chips** echoing the Work
page (`All` active = primary fill; `Roofing`, `Restaurant`, `Salon`, `E-commerce` = outline) — these are **decorative** on
the homepage (real filtering lives on `/work`); make the whole cluster a link to `/work`, or render static pills.

Body grid `grid-cols-[minmax(0,1fr)_150px] gap-[18px] items-stretch`:
- **Big feature** `rounded-[20px] min-h-[440px]` sage gradient `linear-gradient(150deg,#cdd3bd,#a3ac88)` + hatch + top-left
  caption chip "PROJECT IMAGE — Serene Retreat". Bottom overlay: a cream `rounded-[14px] px-[22px] py-4` info bar with three
  fields **NAME** "Northside Roofing" / **PLATFORM** "WordPress" / **RESULT** "A faster, clearer site that booked 38% more
  estimate calls." (labels 10px/700/tracking-[.16em]/`#9A9C8C`).
- **NEXT panel** (right, 150px): `rounded-[20px] border-[1.5px] border-border bg-card-2 flex flex-col items-center justify-center gap-3.5`, a 60px circular outline `→` + `NEXT` (tracking-[.14em]). Links to `/work`.
Below grid, centered **View all work** outline pill → `/work` (`mt-[26px]`).
`// TODO(content)` on the project. Real asset → `public/work/northside-roofing/cover.jpg`.

---

## Section 7 — Closing CTA  (`<CtaBanner />` from `03`)

```
eyebrowLine1: "Ready to fix"
eyebrowLine2: "your website?"        // accent line
body: "Book a 15-minute call. Tell me your platform and your goal — you'll leave with a real number and a timeline."
primary: { label: "Book a call →", href: "/book" }
secondary: { label: "or send a message", href: "/contact" }
```

---

## Acceptance checklist
- [ ] Hero shell renders the gradient + hatch + glow, REC chip pulsing, trust badge, floating animated featured card, two-tone 3-line H1, two CTAs + 01—03 meter.
- [ ] Values: portrait left, two-tone H2, 2×2 icon value grid with exact copy.
- [ ] Process: dark band, center line, **01/03 below & 02/04 above** the line, sage dots, exact copy.
- [ ] Services: 4 cards, Shopify featured/dark with tags, correct titles/blurbs/prices, link to each route.
- [ ] Testimonial band (`bg-band`), accented phrases, author + arrows.
- [ ] Work: big feature + NEXT panel + View-all; CtaBanner; footer.
- [ ] Colors via tokens, type via the display recipe, all line breaks preserved. Lint clean.
