# 13 · PROCESS → `app/(marketing)/process/page.tsx`

Reproduce `design-reference/Process.dc.html`. Static RSC. A **vertical, step-by-step** walkthrough (distinct from the
homepage's horizontal band). Section order: `SiteHeader` → **Hero (split + duration pill)** → **Vertical timeline (01–06)**
→ **CtaBanner** → `SiteFooter`.

## 1 — Hero
`max-w-[1240px] mx-auto px-8 pt-[30px] pb-5`. `<SectionLabel>PROCESS</SectionLabel>` + grid
`grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-10 items-end`:
- **H1** two-tone "How it works, / `<span class="text-accent">`step by step.`</span>`" (`clamp(38px,5.6vw,76px)`).
- **Right:** lead "No mystery, no black box. Here's exactly what happens from our first call to launch day — and who does
  what at each step." + a duration pill (`inline-flex bg-[#E5E8DA] border border-[#CBD2B8] rounded-full px-[15px] py-[9px]`,
  dot + "Typical start to finish: 1–3 weeks", `text-[13px] font-semibold text-status-paid-fg`).

## 2 — Vertical timeline
`max-w-[980px] mx-auto px-8 pt-[48px]`. A relative wrapper with a **vertical spine**: `absolute left-[31px] top-[34px]
bottom-[60px] w-[2px] bg-border`. Then 6 step rows, each `relative grid grid-cols-[64px_minmax(0,1fr)] gap-[26px]
pb-[26px]`:
- **Left rail:** a centered **50px circular number badge** `bg-primary text-primary-foreground font-extrabold text-[18px]
  border-[4px] border-background` (the cream border makes it "punch through" the spine), `relative z-[1]`.
- **Right card:** `bg-card border-[1.5px] border-border rounded-[18px] p-6`. Header row (`flex items-center
  justify-between gap-3 flex-wrap`): H2 step title (`text-[22px] font-extrabold uppercase tracking-[-.02em] whitespace-nowrap`)
  + a duration pill (`bg-muted rounded-full px-3 py-[5px] text-xs font-bold text-status-paid-fg`). Then a paragraph
  (`text-[15.5px] text-muted-foreground`). Then a **You / Me split**: `grid-cols-2 gap-3.5`, each column a top border +
  label (`YOU` border `#DCE3D7`; `ME` border `--primary`) + a one-liner (`text-[13.5px] text-[#3A3E33]`).

> Keep `whitespace-nowrap` on the step titles — two-word titles overlapped their paragraph before this fix.

**The 6 steps (verbatim):**
| # | Title | Duration | Paragraph | YOU | ME |
|---|-------|----------|-----------|-----|-----|
| 01 | The call | 15 minutes | "We hop on a quick call. You tell me your platform, your goals, and what's not working. I tell you — honestly — whether I can help and roughly what it'll cost. No pitch, no pressure." | Bring your site and one clear goal. | Listen, ask sharp questions, ballpark it. |
| 02 | The plan & quote | 1–2 days | "I write up exactly what I'll do, what it costs, and when it'll be done. Fixed scope, fixed price, fixed timeline — in writing. You approve it before a single thing starts." | Review the quote and approve. | Scope it, price it, schedule it. |
| 03 | Design | 2–4 days | "I design the look and layout around your brand and how you actually sell. You see it early and we adjust together — so there are no surprises at the end." | Share brand assets and feedback. | Design the layout, revise with you. |
| 04 | Build | 3–10 days | "I build it on your platform. You upload your content — photos, copy, products — right inside your client portal, and watch the project come together as it happens." | Upload content in the portal. | Build it and keep you posted. |
| 05 | Review & launch | 1–2 days | "You walk through the finished site. We fix anything that's off, then go live together. I handle the technical bits — domains, redirects, SSL, the lot." | Do a final walkthrough. | Launch, redirects, and QA. |
| 06 | Care & support | ongoing | "For 14 days after launch I fix anything that comes up — free. After that, stay on a simple care plan, or just call me when you need me. I don't disappear." | Get back to running your business. | Updates, fixes, and a phone that answers. |

**Step 06 is the accent/final card:** badge `bg-accent-bright` (`#6E7A60`), card `bg-forest-band text-[#E9EAE0]` with
muted-green inner borders and pale-green labels (`#9AA683`) — the one dark card, signaling "ongoing". Match the `.dc.html`.

**Responsive:** the grid + spine work at all widths (it's already vertical). Reduce left rail to ~48px and keep the spine
aligned to the badge center on mobile.

## 3 — CtaBanner
```
eyebrowLine1: "Ready for"
eyebrowLine2: "step one?"      // accent
body: "It all starts with a 15-minute call. Tell me your platform and your goal — you'll leave with a real number and a timeline."
primary: { label: "Book a call →", href: "/book" }
secondary: { label: "or see services & pricing", href: "/services" }
```

## Acceptance
- [ ] Hero with duration pill; vertical spine with 6 numbered badges punching through; each card has duration pill + paragraph + You/Me split; step 06 is the dark accent card.
- [ ] Titles never overlap paragraphs (nowrap); exact copy; CTA + chrome. Lint clean.
