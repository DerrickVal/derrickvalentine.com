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
- [x] `globals.css` tokens (01)
- [x] Archivo fonts + root metadata; strip marketing chrome from root layout (02)
- [x] `app/(marketing)/layout.tsx` group (SiteHeader / SiteFooter)
- [x] Shared components (03): SiteHeader, PricingMenu, MobileNav, SiteFooter, CtaBanner, SectionLabel, TwoToneHeading, button variants, MediaPlaceholder, StatusPill, Stat

**Pages** — all built (green, committed)
- [x] 04 Homepage `/`
- [x] 05 Services `/services`
- [x] 06 Service template + [x] 07 Shopify / [x] 08 Webflow / [x] 09 WordPress / [x] 10 Squarespace
- [x] 11 Work `/work`
- [x] 12 About `/about`
- [x] 13 Process `/process`
- [x] 14 Contact `/contact`
- [x] 15 Book a Call `/book`
- [x] 16 Client Portal `/login` (+ `/p/[slug]`) — reskinned over the existing auth backend

**Every route prerenders/compiles green; `pnpm build` passes (18 routes).** The full
1:1 page adoption is complete. Outstanding items are the design-fidelity gaps from the
stress-test (Tier 1–3 below) and the real-backend wiring noted per page.

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

---

## Stress-test findings — 2026-06-11 (built foundations + home + /services + /services/shopify vs the `.dc.html`)

Full token + per-element diff of everything built so far against the four ground-truth
`.dc.html` files. Calculator **math + Shopify data are an exact port** (TYPES/ADDONS/carePrice/
defaultState all verified equal). Most chrome/pages are faithful to the px. Open gaps below,
tiered. **None are blocking; nothing is broken; all builds stay green.** Tier 1 = real visible
fidelity bugs worth fixing before we move on; Tier 2 = shared-component approximations; Tier 3 =
sub-2px / imperceptible drift; Tier 4 = intentional adaptations (logged for awareness, not bugs).

### Tier 1 — real, recurring fidelity bugs
1. **`rec-pulse` keyframe is wrong** (`app/globals.css`). Built = opacity `1 → .35 → 1`, no scale.
   The `.dc.html` `@keyframes recpulse` = `opacity .4→1→.4` **and** `transform scale(.85→1→.85)`
   (a heartbeat that grows+brightens then shrinks+dims; rests dim, not full). Affects the REC dot
   on the home hero + every service hero. Fix the keyframe to match.
2. **CTA-banner hatch uses the generic `.bg-hatch`** (`135deg / .06 / 16px`) but every CTA in the
   design is `repeating-linear-gradient(125deg, rgba(255,255,255,.05) … transparent 24px)`
   — different angle, opacity, **and** stripe spacing. `components/site/cta-banner.tsx` should
   inline its own `125/.05/24` hatch instead of `.bg-hatch`. Affects the closing CTA on home,
   /services, and all 4 service pages (the brand's signature texture, on its most prominent band).
3. **`MediaPlaceholder tone="forest"` gradient is wrong** (`components/site/media-placeholder.tsx`).
   It reuses `.bg-forest-grad` (`150deg, #3c4a30→#222a1c`, hatch 16px). The `.dc.html` store-mockup
   it stands in for is `linear-gradient(160deg,#46532f,#222a1c)` + hatch 18px — a lighter, more
   olive top color and a different angle. Visible on the Shopify hero (and every future service
   hero). Give the forest tone the mockup gradient (or pass it explicitly from the service hero).

### Tier 2 — shared-component approximations (pixel-matched to the homepage, a few px off elsewhere)
4. **`CtaBanner` is sized to the homepage CTA.** On /services + the 4 service pages the `.dc.html`
   CTA is slightly smaller: shell `clamp(44px,6vw,84px) × clamp(32px,5vw,68px)` vs built
   `clamp(48px,7vw,92px) × clamp(32px,5vw,72px)`; inner `max-w 660` vs built `680`; body `16.5px`
   vs built `17px` (and Shopify's CTA body is `max-w 440` vs the built `460`). To be exact we'd
   add props (e.g. `dense`) or per-page overrides. Currently exact on home, ~4–8px large on the rest.
5. **`ProcessTimeline` is sized to the homepage band.** On /services the `.dc.html` band is smaller:
   inner padding `74/84` vs built `78/88`; heading gap `50` vs built `54`; heading
   `clamp(28px,4vw,52px)` vs built `clamp(28px,4.3vw,56px)`; step height `240` vs built `248`. Also
   on the **homepage** the heading min is `30px` in the dc but `28px` in the component. Same
   shared-component tradeoff as #4 (exact on home, a touch big on /services).

### Tier 3 — sub-2px / near-identical-hue drift (cosmetic, likely imperceptible)
6. `CtaBanner` `<h2>` uses `text-primary-foreground` (#F1EFE8); dc CTA headline is **#F3F2EA**.
   (The hero H1 already uses #F3F2EA correctly.)
7. Calculator-band `<h2>` "Build your estimate" is hardcoded **#F3F2EA**; dc inherits **#E9EAE0**.
8. Estimate card border + dividers use `white/14` & `white/18`; dc uses cream-tinted
   `rgba(241,239,232,.14 / .18)`. Same for several translucent pills (hero badge, REC chip, service
   cards) using pure `white/15–/20` where the dc uses cream `rgba(241,239,232,.16)` / white `.18`.
9. Sage `MediaPlaceholder` is one gradient (`150deg,#c9cfb8→#9da683`, hatch .14/18px). The dc
   work-image is a slightly different sage (`150deg,#cdd3bd→#a3ac88`, hatch .13/20px) and the
   portrait is `155deg` (vs 150). One placeholder flattens two different dc sages.
10. `border-border` (#E4E0D4) used where the dc has #DAD6C9 (home "NEXT" card) and #E2DFD4
    (/services platform cards). Hairline, slightly too light.
11. Home REC caption pill `px-3.5` (14px) vs dc 13px; media label chip `px-3`/`blur-sm` vs dc 13px/3px.
12. `ProcessTimeline` step label separator renders `&nbsp;&nbsp;|&nbsp;&nbsp;`; dc is `&nbsp;|&nbsp;`.

### Tier 4 — intentional adaptations (not bugs; confirm they're wanted)
- **Responsive system added throughout** (the `.dc.html` are desktop-only, fixed 1240px): grids
  collapse to 1-col, hero `min-h` 520→`lg:`640 and padding `p-6`→`sm:p-12`, the hero trust badge +
  floating featured card are `hidden … lg:flex/ block`, and a `MobileNav` drawer was added. All
  reasonable for a live site; none exist in the mockups.
- **Icons:** capability/value tiles use lucide (`Square/Circle/Triangle/Diamond/Gauge/Sparkles`)
  in place of the dc's hand-built CSS shapes; `Gauge`/`Sparkles` are loose stand-ins for the dc's
  "speed bar" and "teardrop."
- **Checkmark inconsistency:** /services "what you always get" uses lucide `<Check>`; the service
  detail "what's included" uses the literal "✓" glyph (matching the dc). Pick one.
- **Footer newsletter `<form>`** has no submit guard (it's an RSC); pressing Enter does a GET
  reload. The dc used a `noop` `preventDefault`. Harmless until wired.
- Testimonial carousel arrows are decorative (no client logic) — the dc's are static too.
- Home "What I do" link → `/services` (built) where the dc anchors to the same-page `#services`.

---

## Build decisions — milestones 1–7 (2026-06-11)

Decisions taken while finishing the remaining pages (each `// NOTE`/`TODO` is in the code too):

- **Service template parameterized** for two real per-platform diffs: Squarespace's hero is
  smaller (`clamp(34px,4.7vw,62px)` / `lh .98` / `mt-7`) and the featured-card label is
  "FEATURED SITE" vs Shopify's "FEATURED STORE". Added optional `hero.h1Size/h1Leading/leadGap`
  + `mock.featuredLabel`; defaults keep Shopify 1:1. WordPress/Squarespace new-build blurb uses
  the **visible** static-HTML text ("Design & build from scratch"), not the dead `TYPES.blurb`.
- **`/work`** cards are non-navigating `<div>`s (hover border kept) — no case-study routes exist
  yet. `lib/work.ts` is placeholder; real ~7 case studies + before/after media land later.
- **`/contact`** is wired for real: a `submitContact` Server Action POSTs to the **Resend REST
  API** (no SDK dep, Cloudflare-portable). **Turnstile deferred** — the design has no visible
  captcha, so a hidden honeypot covers spam now; drop in the widget + siteverify later
  (`TURNSTILE_*` keys exist). The displayed `hello@digitaldog.io` is placeholder; real send goes
  to `CONTACT_TO_EMAIL`.
- **`/book`** sits **outside `(marketing)`** (`app/book/`) with its own layout so it can pair the
  full nav header (CTA swapped to "Message me" via a new `SiteHeader` `cta` prop) with the **slim**
  footer. The slim `SiteFooter` was realigned to `Book a Call.dc.html` (3 items, one row; no "All
  rights reserved."); `FooterBrand` took an optional `className` so slim drops the bottom margin.
  The scheduler is a real month/day/time picker with **deterministic-fake** availability; "today"
  comes from `useSyncExternalStore` (server snapshot null) to stay prerender-safe. TODO: real
  calendar (Cal.com / Google).
- **`/login`** reskinned **over the existing auth** — same `requestOtp`/`verifyOtp` actions,
  invoked via `useTransition` (not `useActionState`) so the design's resend / wrong-email controls
  work. `actions.ts`, `types.ts`, `middleware.ts` untouched.
- **`/p/[slug]`** dashboard is a client tab island (Overview/Upload/Invoices) under the existing
  auth-gated `(portal)` layout; **all project/stage/upload/invoice data is placeholder**
  (`NOTE(handoff)`). Phase 2: real data under RLS (`is_project_member`), Supabase Storage uploads,
  Stripe Checkout/Billing via the shared account with `metadata.app`. The `(portal)` layout still
  redirects to `/login?redirect=/portal` (not the slug) — minor, left for Phase 2.
