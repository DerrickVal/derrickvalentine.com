# Front-end Handoff Adoption — Notes, Gaps & Concerns

Living doc I (Claude) write to while adopting the claude.ai/design handoff
(`derrickvalentine.com/handoff/`) into the repo. Source of truth for the **public
marketing frontend** = the handoff docs + `design-reference/*.dc.html` (the
`.dc.html` wins on conflict). **Backend stays as already built** (Supabase
auth/portal, Stripe, Resend); I am the source of truth there.

When a handoff choice conflicts with `docs/IA.md` / `docs/MESSAGING.md` / the
`reference/` archive, I follow the handoff and drop a `// NOTE(handoff):` comment.

**Upon completion we address the GAPS / NEEDS-ATTENTION list together.**

---

## Build progress

**Foundations**
- [ ] `globals.css` tokens (01)
- [ ] Archivo fonts + root metadata; strip marketing chrome from root layout (02)
- [ ] `app/(marketing)/layout.tsx` group (SiteHeader / SiteFooter)
- [ ] Shared components (03): SiteHeader, PricingMenu, MobileNav, SiteFooter, CtaBanner, SectionLabel, TwoToneHeading, button variants, MediaPlaceholder, StatusPill, Stat

**Pages**
- [ ] 04 Homepage `/`
- [ ] 05 Services `/services`
- [ ] 06 Service template + 07 Shopify / 08 Webflow / 09 WordPress / 10 Squarespace
- [ ] 11 Work `/work`
- [ ] 12 About `/about`
- [ ] 13 Process `/process`
- [ ] 14 Contact `/contact`
- [ ] 15 Book a Call `/book`
- [ ] 16 Client Portal `/login` (+ `/p/[slug]`) — reskin over the existing auth backend

---

## Gaps / concerns / needs attention  (running log)

- **Supersedes the earlier marketing build.** The home + pricing pages committed in
  `b55ceb3` (different visual direction) are being replaced by this design. The new IA
  has **no `/pricing` route** (pricing lives in the per-service calculators + the header
  Pricing dropdown), so `app/pricing/` will be removed/reconciled. Flagging so we know
  the old hero/testimonials/compare work is intentionally dropped (recoverable from git).
- **Root layout restructure.** Per `02`, `SiteHeader`/`SiteFooter` move OUT of the root
  layout into `app/(marketing)/layout.tsx`. This also completes the CLAUDE.md task
  "separate the portal chrome from the marketing root layout."
- **Content placeholders.** Per `02`, copy/stats/prices/testimonials/names in the
  `.dc.html` are realistic placeholders to reproduce verbatim and mark `// TODO(content):`.
  Real logo, photos, copy come later (per the user).
- **Em dashes in design copy vs. user rule.** The `.dc.html` placeholder copy uses
  `—` em dashes; the user has a hard standing rule of **no em dashes in copy**. Decision:
  reproduce wording / line breaks / structure 1:1, but render `—` as the user's preferred
  punctuation (comma / period / parens). Applied throughout. Revisit when real copy lands.
- **shadcn `--accent` repurposed to sage.** The design defines `--accent` as the sage
  headline color, which differs from shadcn's usual "subtle hover bg". Pages use the custom
  `pill*` button variants (not `ghost`/`outline`), so default shadcn variants that lean on
  `bg-accent` are effectively unused. No visual impact expected; noting in case a future
  vendored component uses `bg-accent`.
- **Service page: `.dc.html` vs `06` spec.** The actual `<Platform> Service.dc.html` files have
  **no "Work examples" section** (the `06` handoff listed one) and **6 FAQs** (not 5). The
  `.dc.html` wins, so the service template omits work-examples and renders all 6 FAQs.
- **Service testimonial highlights deferred.** The per-platform service testimonials accent two
  phrases in sage in the `.dc.html`. The data stores a plain quote for now (rendered without the
  inline highlights); will restore when real testimonial copy lands.
- **Calculator default state.** Initial calculator view is taken from each `.dc.html` `class
  Component` `state` (Shopify = redesign / 6 pages / sections+speed on). The math is ported
  exactly. Webflow/WordPress/Squarespace currently reuse the same default pattern; verify each
  against its `.dc.html` `state` when filling their data (cosmetic only; users change it live).
