# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This project uses **pnpm** (see `pnpm-lock.yaml` / `pnpm-workspace.yaml`); do not use npm or yarn.

- `pnpm dev` — start the dev server (http://localhost:3000)
- `pnpm build` — production build
- `pnpm start` — serve the production build
- `pnpm lint` — run ESLint (`eslint-config-next`, core-web-vitals + TypeScript rules)

There is no test runner configured (no test script, framework, or test files). Add one before writing tests.

UI components are **vendored from Shadcn Studio** (plus shadcnblocks / public shadcn) through the pinned CLI — **not** `pnpm dlx`:

- `pnpm run vendor:blocks` — install everything in `scripts/block-vendor/manifest.yaml`
- `pnpm run vendor:blocks -- only @ss-blocks/<id>` — install one (auto-records it in the manifest)
- `pnpm run vendor:blocks:search -- @shadcnblocks <query>` — search a registry

Ids come from each item's toolbar "Copy command". Full workflow + auth: `docs/BLOCK_VENDOR.md`.

## Architecture

Next.js 16 **App Router** with React 19 and TypeScript (strict). Server Components are the default (`rsc: true`); add `"use client"` only where interactivity requires it.

- `app/` — routes, `layout.tsx` (root layout + fonts + metadata), `globals.css`, `page.tsx`
- `components/ui/` — shadcn/ui primitives
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge) for conditional class merging
- Import alias: `@/*` maps to the repo root (e.g. `@/components/ui/button`, `@/lib/utils`). A `@/hooks` alias is configured but the directory does not exist yet.

### UI / shadcn

This project builds from **Shadcn Studio** components/blocks at the **`new-york-v4`** style (`components.json` is `style: new-york`, `baseColor: neutral`, lucide icons). Registries are wired for `@shadcn-studio` / `@ss-components` / `@ss-blocks` (Studio), `@shadcnblocks`, and public `@shadcn`. Install via `vendor:blocks` (see Commands) — the script pins `shadcn@4.8.0` and bridges the `.env.local` keys (`SHADCNSTUDIO_*` → `EMAIL`/`LICENSE_KEY`); raw `pnpm dlx shadcn add` skips both. Studio uses its own slugs (`avatar-15`, not `button`).

- Studio components land in `components/shadcn-studio/<group>/<name>.tsx`; primitives in `components/ui/`.
- Components import from the **consolidated `radix-ui` package** (e.g. `import { Slot } from "radix-ui"`), not individual `@radix-ui/react-*` packages, and use `class-variance-authority` (`cva`) with `data-*` variant attributes (`data-slot`, `data-variant`, `data-size`). `components/ui/button.tsx` is the reference pattern.

### Styling (Tailwind v4)

Tailwind v4 is configured **CSS-first** — there is no `tailwind.config.js`. All theme configuration lives in `app/globals.css`:

- Design tokens are CSS variables in `:root` / `.dark` (oklch color space) and exposed to Tailwind via `@theme inline` (`--color-*`, `--font-*`, `--radius-*`).
- **Dark mode is class-based** via `@custom-variant dark (&:is(.dark *))` — toggle a `.dark` class on an ancestor element; there is no system/media-query dark mode wired up.
- The radius scale (`--radius-sm` … `--radius-4xl`) is derived from a single `--radius` value, so changing `--radius` rescales all component rounding.
- `@source not` directives at the top exclude the `reference/` archive, all markdown, and the vendor manifest from Tailwind's class scan — otherwise the scraped old-site markup would bloat or break the build.

### Fonts

Configured in `app/layout.tsx` and mapped in `globals.css`: **Inter** is the active sans and heading font (`--font-sans`, `--font-heading`); **Geist Mono** is the mono font. Geist Sans is loaded but not currently mapped to any Tailwind font utility.

## Project context

This is **Derrick Valentine's solo personal web-developer site** — a credibility / "deeper dive on the person behind the business" page for leads who arrive through his other channels (Digital Dog, SitesForRoofers, Upwork). It is intentionally general / catch-all across niches rather than targeted at one vertical.

It is a rebuild of the existing WordPress site **derrickvalentine.com**, which has been archived under `reference/derrickvalentine.com/` — raw HTML in `raw/`, extracted markdown in `content/`, WP REST JSON in `api/`, an asset list in `assets.txt`, and an inventory in `SUMMARY.md` (regenerate with `python3 reference/derrickvalentine.com/scrape.py`). Treat the archive as a *starting* reference only: tone, layout, and sitemap are all expected to change.

Two things to know when mining the archive:
- `globals/navigation.md` holds the **real** site menu (Home · About · Services{Marketing, Web Development, Graphic Design} · Portfolio{Web, Design} · Contact · FAQ).
- The old site is the WGL "Affirm" theme and most pages are unused **demo placeholder** (Homepage 2-5, Blog/Portfolio Grid variants, Shop/Cart/Checkout, the 6 "team" members, most blog posts). Derrick's real content is: home, about-me, my-services, the three `services/*` pages, faq, free-website, contacts, and ~7 genuine portfolio case studies (58 Agency, Kayleigh, Samuella's House, Shanelle Harrison, The Kulinary Project, Uniting Our Youth, Variable Scoop).

**The locked rebuild IA / build spec is `docs/IA.md`** — sitemap, per-page sections, the pricing packages, the primary conversion path (free Website Review → redesign → Care Plan), and which archived content feeds each page. Start there before building pages. **Copy voice + positioning live in `docs/MESSAGING.md`** — warm-but-authoritative, person-forward, the "everything off your plate, one text away" wedge; match it for any client-facing copy. **Page copy drafts live in `docs/content/`** — `home.md` (section order + Studio block-type pairings) and one `work-<slug>.md` per real portfolio project; each records its assets under `public/work/<slug>/` and its placement: a project with real **before/after** screenshots is a **featured** case study (Home Compare–eligible), the rest are **grid-only**.

The app itself is still the `create-next-app` default — `app/page.tsx` and the `metadata` in `layout.tsx` are unmodified.

## Client portal (Supabase)

The site is being extended with a **client portal**: a Supabase/Postgres backend where Derrick's direct clients log in (passwordless), submit content and change requests, and pay. It is additive and kept separate from the public marketing pages above. The backbone design is mirrored from `/home/nero/Projects/Nextjs/digital-dog-v2/docs/supabase` (a 9-doc plan; that repo is still on Firebase, so treat it as a design reference, not working code).

**Decisions baked in.** `profiles.segment` separates `personal` clients (who use this portal) from `niche` clients (handled via Derrick's other brands; they do not log in here). Payments cover one-time redesign milestones (`payments`) and recurring Care Plans (`subscriptions`), run through **Digital Dog's shared Stripe account** (all revenue to one entity for taxes; clients told verbally). Because the account is shared, the Stripe webhook must tag every portal-created object with `metadata.app` and ignore events that are not this app's. Deploy target is **Cloudflare / OpenNext**, not Vercel, so the reminder engine will be a Cloudflare Cron Trigger or Supabase `pg_cron`, not Vercel Cron.

### Connecting to Supabase from this VM
Linked project ref `wvefaqsmwxvnzsypsqco` (region `us-east-1`). This VM has no working IPv6, so the direct DB endpoint is unreachable. Use the IPv4 **session pooler** stored in `.env.local` as `SUPABASE_SESSION_POOLER_URL`:
- psql: `psql "$SUPABASE_SESSION_POOLER_URL" -c "..."`
- migrations: `supabase db push --db-url "$SUPABASE_SESSION_POOLER_URL"`
- types: `supabase gen types typescript --linked > types/database.ts` (the `--db-url` form pulls Docker; use `--linked`)
- auth/email config is code in `supabase/config.toml`, applied with `RESEND_API_KEY=... supabase config push --yes`

Never print secret values; mask when verifying. `.env.local` is gitignored.

### What is built (commit 9fd7440 on main)
- **Three clients** `lib/supabase/{client,server,admin}.ts` (`@supabase/ssr`): browser and server act as the signed-in user under RLS; `admin` is service-role, bypasses RLS, is server-only, and every call must first check `role === 'admin'`.
- **Schema** `supabase/migrations/20260610190000_init_foundation.sql` (applied): `profiles, projects, project_members, payments, subscriptions` plus enums, RLS helpers `is_admin()` / `is_project_member()`, and the `handle_new_user` trigger. `types/database.ts` is generated and wired into the clients.
- **Auth** (passwordless, OTP-first): `app/login` (email, then 6-digit code), actions `requestOtp` / `verifyOtp` / `signOut`, `app/auth/confirm` magic-link callback, `lib/auth/getUser.ts` (`getUser()` / `isAdmin()`, request-memoized), and `middleware.ts` (refreshes the session; matcher scoped to `/admin`, `/portal`, `/p/`, `/login`, `/auth`, so marketing pages carry no auth overhead).
- **Route groups** `app/(admin)` (admin-gated) and `app/(portal)` (client-gated) with starter dashboards.
- **Email** sends via Resend SMTP (set in `config.toml`, pushed to the project): sender `noreply@derrickvalentine.com`, magic-link template includes the 6-digit code, `otp_length = 6`.

### Conventions
- Server action: `"use server"` → auth + role check → validate → write (service-role client for admin/structural writes) → `revalidatePath` → return a small result object. Client self-service (autosave, uploads) writes directly under RLS.
- Money is integer cents; uuid PKs (`gen_random_uuid()`); timestamps `timestamptz`.
- Portal env keys live in `.env.example` (Supabase, Stripe test+live, cron, Turnstile). The Stripe client picks test vs live by environment.

### Next
- Set Derrick's `profiles.role = 'admin'` after his first `/login` (needs his sign-in email).
- Set production `site_url` + redirect allowlist in `config.toml` at launch (currently localhost).
- Separate the portal chrome from the marketing root layout.
- Phase 2: content-acceptance tables (templates, requests, fields, responses, files, comments), then Stripe wiring (Checkout + Billing + the metadata-filtered webhook) and the reminder engine.
