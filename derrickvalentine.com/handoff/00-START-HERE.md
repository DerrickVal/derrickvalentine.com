# Derrick Valentine — Front-End Handoff (START HERE)

**You are Claude Code. This folder is your source of truth for the public marketing site's look and behavior.**
The design was built and approved in claude.ai/design. Your job is to reproduce each page **1:1** in this repo's stack
(Next.js 16 App Router · React 19 · TypeScript strict · Tailwind v4 CSS-first · shadcn `new-york-v4` · Shadcn Studio).

> **Authority rule:** For anything *visual or structural on the public marketing pages* (layout, sections, copy, spacing,
> color, type, interactions), **this `handoff/` folder overrides** `docs/IA.md`, `docs/MESSAGING.md`, and the
> `reference/derrickvalentine.com/` archive. Those older docs remain authoritative only for the **client portal backend**
> (Supabase/Stripe/Resend) and any business rule not covered here. If you find a conflict, follow `handoff/` and leave a
> `// NOTE(handoff):` comment so a human can reconcile the older doc later.

---

## How to use this package

1. **Read these three foundation docs first, in order. Do not skip them — every page file assumes them.**
   - [`01-DESIGN-SYSTEM.md`](./01-DESIGN-SYSTEM.md) — color tokens (oklch), type scale, the visual language, the exact `globals.css` to paste.
   - [`02-CONVENTIONS.md`](./02-CONVENTIONS.md) — fonts, file/route layout, RSC vs. client, how inline-style specs map to Tailwind, the fidelity bar.
   - [`03-SHARED-COMPONENTS.md`](./03-SHARED-COMPONENTS.md) — `SiteHeader` (with the Pricing dropdown), `SiteFooter`, `CtaBanner`, `SectionLabel`, button recipes. Build these **once**; every page imports them.

2. **Then build a page by reading its single handoff file.** Each is self-sufficient (it only assumes the three foundation docs + shared components). Tell me "read `04-HOMEPAGE.md` and build it" and you have everything you need.

3. **Verify against the design reference.** The folder [`design-reference/`](./design-reference/) contains the *actual approved design files* as `*.dc.html`. These are the ground truth for exact structure, copy, and pixel values. They use a custom runtime (`<x-dc>` + a `class Component` logic block), but you can read them as plain HTML: the markup between the tags is the layout with **inline styles** (your literal source for spacing/color), and the `class Component extends DCLogic` block is the interactivity (state + the calculator/scheduler/filter logic). When a handoff `.md` and the `.dc.html` ever disagree, **the `.dc.html` wins** — open it and match it.

---

## Build order (recommended)

Foundations → shared chrome → pages. Pages are independent after foundations, but this order de-risks the most-reused pieces first.

| # | File | Route | Notes |
|---|------|-------|-------|
| 01 | `01-DESIGN-SYSTEM.md` | — | Tokens + globals.css. **Do first.** |
| 02 | `02-CONVENTIONS.md` | — | Fonts, structure, fidelity rules. |
| 03 | `03-SHARED-COMPONENTS.md` | — | Header/Footer/CTA/primitives. **Do before any page.** |
| 04 | `04-HOMEPAGE.md` | `/` | Flagship. Hero (video), values, process, services, testimonial, work, CTA. |
| 05 | `05-SERVICES.md` | `/services` | Hub: 4 platform cards + "what you always get" + process + CTA. |
| 06 | `06-SERVICE-PAGE-TEMPLATE.md` | — | The shared anatomy of a platform page **incl. the price calculator**. Read before 07–10. |
| 07 | `07-SHOPIFY.md` | `/services/shopify` | Data + copy for the template. |
| 08 | `08-WEBFLOW.md` | `/services/webflow` | Data + copy. |
| 09 | `09-WORDPRESS.md` | `/services/wordpress` | Data + copy. |
| 10 | `10-SQUARESPACE.md` | `/services/squarespace` | Data + copy. |
| 11 | `11-WORK.md` | `/work` | Filterable portfolio (industry × style) + empty state. Client component. |
| 12 | `12-ABOUT.md` | `/about` | Story, principles (dark band), channels, quick facts. |
| 13 | `13-PROCESS.md` | `/process` | Vertical numbered timeline with You/Me split. |
| 14 | `14-CONTACT.md` | `/contact` | Form (Server Action + Resend) + direct-contact rail. |
| 15 | `15-BOOK-A-CALL.md` | `/book` | Calendly-style scheduler shell (real embed slots in). |
| 16 | `16-CLIENT-PORTAL.md` | `/login` + `/p/[slug]` | OTP-first auth screen + dashboard. **Aligns to the portal you already started — read its "Reconcile with existing code" section.** |

---

## The design in one paragraph (so you hold the whole thing in your head)

Warm **cream** canvas (`--background`), deep **forest-green** contrast bands for rhythm, heavy **uppercase Archivo** display headlines with a **two-tone** trick (second line in sage `--accent`), small **bracketed mono-feel labels** like `[ SERVICES ]`, pill buttons, generous whitespace, tall rounded image cards, and a recurring **dark CTA banner**. It is calm, editorial, and person-forward — the LeafLife reference re-skinned for a solo web developer. Primary action everywhere: **Book a call**. Secondary: **see pricing / explore work**. Audiences (in priority order): 50+ owners who want platform + price fast; white-label partners who want process + portfolio; local pros who filter the portfolio by industry/style.

---

## Definition of done (every page)

- [ ] Route renders at the path in the table above, server-rendered by default.
- [ ] Uses `SiteHeader` + `SiteFooter` from `03` (identical nav, Pricing dropdown, footer columns).
- [ ] Section order, copy, and measurements match the page's `.dc.html` in `design-reference/`.
- [ ] Colors come from tokens in `01` (no raw hex in components); type uses the scale in `02`.
- [ ] Interactive pieces are `"use client"` islands only where needed; everything else stays RSC.
- [ ] Matches at 1280/1024/375 widths (see each file's Responsive notes).
- [ ] `pnpm lint` clean; no console errors.
