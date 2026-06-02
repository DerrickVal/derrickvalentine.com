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

**The locked rebuild IA / build spec is `docs/IA.md`** — sitemap, per-page sections, the pricing packages, the primary conversion path (free Website Review → redesign → Care Plan), and which archived content feeds each page. Start there before building pages.

The app itself is still the `create-next-app` default — `app/page.tsx` and the `metadata` in `layout.tsx` are unmodified.
