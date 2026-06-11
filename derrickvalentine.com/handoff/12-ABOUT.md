# 12 · ABOUT → `app/(marketing)/about/page.tsx`

Reproduce `design-reference/About.dc.html`. Static RSC. The brief's heart — *"who's the person behind the business."*
Section order: `SiteHeader` → **Hero (intro + portrait)** → **Story + pull quote** → **Principles (dark band, 01–04)** →
**Channels ("where you know me from")** → **Quick facts strip** → **CtaBanner** → `SiteFooter`.

## 1 — Hero
`max-w-[1240px] mx-auto px-8 pt-[30px] pb-5`. Grid `grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-[52px] items-center`:
- **Left:** `<SectionLabel>ABOUT</SectionLabel>` + **H1** two-tone "Hi — I'm / `<span class="text-accent">`Derrick.`</span>`"
  (`clamp(40px,5.8vw,78px)`) + lead (`text-[17px] text-muted-foreground max-w-[480px]`): "I'm the developer behind the work —
  no agency, no account managers, no middlemen. Just one person who builds good websites and answers the phone when you
  call." + buttons: **Book a call →** (`pill`, `/book`) + **See my work** (`pillOutline`, `/work`).
- **Right:** portrait `<MediaPlaceholder tone="sage" ratio="4/5" label="PHOTO — Derrick Valentine">` `rounded-[22px]
  min-h-[400px]`. Real → `public/derrick.jpg`.

## 2 — Story + pull quote
`max-w-[1240px] mx-auto px-8 pt-[64px]`. Grid `grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-[52px] items-start`:
- **Left:** `<SectionLabel>THE STORY</SectionLabel>` + H2 two-tone "How I got / `<span class="text-accent">`here.`</span>`".
- **Right:** three paragraphs (first is a `text-[17px] text-foreground font-medium` lead, next two `text-base
  text-muted-foreground`) — copy verbatim from the `.dc.html`. Then a **pull quote** with a left accent rule
  (`border-l-[3px] border-primary pl-[22px]`): "If you can't reach the person who built your site, what good is the site?"
  (`clamp(20px,2.4vw,28px)` bold tracking-tight `text-band-foreground`).

## 3 — Principles (dark band)
Full-bleed `bg-primary text-[#E9EAE0]`, inner `max-w-[1240px] mx-auto px-8 pt-[72px] pb-20`. Header: H2 "What I stand by" +
`<SectionLabel tone="dark">PRINCIPLES</SectionLabel>`. Then `grid-cols-4 gap-5` (→ 2/1) of four items, each a big number
(`text-[34px] font-extrabold text-[#7E8C62]`) + H3 (bold 18px, `#F1EFE8`) + p (14px `text-[#BFC4B2]`):
1. **Answer the phone** — "You reach me — not a ticket queue. Questions get a real answer, same day."
2. **Quote it honestly** — "Real numbers up front. The price we agree on is the price you pay."
3. **Build it to last** — "Clean, fast, secure work — no bloat that breaks six months later."
4. **Hand it back** — "You own everything. I set you up to run it — and I'm here if you'd rather not."

## 4 — Channels ("where you might already know me from")
`max-w-[1240px] mx-auto px-8 pt-[72px]`. `<SectionLabel>FIND ME</SectionLabel>` + H2 two-tone "Where you might / `<span
class="text-accent">`already know me from`</span>`". Then `grid-cols-2 gap-4` of four cards (`bg-card border-[1.5px]
border-border rounded-[16px] p-6 flex gap-[18px]`), each a 46px `rounded-[12px] bg-primary text-primary-foreground` badge
(`DD` / `SR` / `Up` / `◎`) + H3 + p:
- **Digital Dog** — "My studio brand — where most of this work lives and where a lot of clients first find me."
- **SitesForRoofers** — "My niche project for roofing companies that need to look as good as their work."
- **Upwork** — "Top-rated, with a public track record and reviews you can read through before we talk."
- **In person** — "I speak at and vend at local business events. If we've shaken hands somewhere — welcome back."

## 5 — Quick facts strip
`max-w-[1240px] mx-auto px-8 pt-[54px]`. `border-y-[1.5px] border-border py-8`, `grid-cols-4 gap-[18px]`. Each: big
`clamp(30px,3.6vw,42px)` extrabold `text-primary` number + caption (`text-[13.5px] text-muted-foreground`):
**8+** years building for the web · **120+** sites shipped & cared for · **4** platforms, all supported · **1** person you'll
deal with — me. `// TODO(content)` on 8+ / 120+.

## 6 — CtaBanner
```
eyebrowLine1: "Let's actually"
eyebrowLine2: "talk."          // accent
body: "No sales pitch — just 15 minutes to hear what you need and tell you, straight, whether I can help and what it'd cost."
primary: { label: "Book a call →", href: "/book" }
secondary: { label: "or see services & pricing", href: "/services" }
```

## Acceptance
- [ ] Hero (intro + portrait), story + left-rule pull quote, dark principles band (01–04), 4 channel cards, quick-facts strip, CTA — exact copy.
- [ ] Two-tone headings preserved; tokens + display recipe; chrome shared. Lint clean.
