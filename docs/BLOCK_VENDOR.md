# Installing components (Shadcn Studio / shadcnblocks / shadcn)

This site builds from **Shadcn Studio** (`new-york-v4`) components and blocks, with
**shadcnblocks** Pro and the **public shadcn** registry also available. All installs go
through the **official shadcn CLI**, pinned to **`shadcn@4.8.0`** (exact, not a caret — keep
it that way so vendoring is reproducible), driven by `scripts/block-vendor/vendor-blocks.mjs`.

## Auth (already wired)

Keys live in `.env.local` (gitignored): `SHADCNSTUDIO_EMAIL`, `SHADCNSTUDIO_LICENSE_KEY`,
`SHADCNBLOCKS_API_KEY`. The vendor script loads `.env.local`/`.env` and bridges
`SHADCNSTUDIO_EMAIL` → `EMAIL` and `SHADCNSTUDIO_LICENSE_KEY` → `LICENSE_KEY`, which the
Studio registry URLs in `components.json` interpolate as query params. shadcnblocks uses a
`Authorization: Bearer ${SHADCNBLOCKS_API_KEY}` header.

> Do **not** use a raw `pnpm dlx shadcn@latest add …` — it floats the CLI version and skips
> both the auth bridge and the manifest provenance. Always go through `vendor:blocks`.

## Registries (`components.json`)

| Namespace | Source |
|---|---|
| `@shadcn` | public shadcn registry (new-york) — primitives like `button`, `sheet` |
| `@ss-components`, `@shadcn-studio` | Studio components — `…/r/components/new-york-v4/{name}.json` |
| `@ss-blocks` | Studio blocks — `…/r/blocks/new-york-v4/{name}.json` |
| `@shadcnblocks` | shadcnblocks Pro |

Studio uses its **own slugs** (e.g. `avatar-15`, `badge-7`) — not plain shadcn names. Copy the
exact id from each item's toolbar **"Copy command"** on shadcnstudio.com.

## Commands

```bash
pnpm run vendor:blocks                                # install every entry in manifest.yaml
pnpm run vendor:blocks -- only @ss-blocks/<id>        # install one; auto-records new ids in the manifest
pnpm run vendor:blocks -- only <id> --dry-run         # preview — no disk or CLI side effects
pnpm run vendor:blocks:search -- @shadcnblocks <q>    # search a registry before committing an id
```

- Curated source of truth: **`scripts/block-vendor/manifest.yaml`**. `only <newId>` auto-appends a
  stub entry — go back and fill in its `note` so provenance stays meaningful.
- Studio files land in `components/shadcn-studio/<group>/<name>.tsx`; primitives in `components/ui/`.

## After vendoring

- If `pnpm build` fails on a missing peer dependency, install whatever the error names
  (`class-variance-authority`, `radix-ui`, `lucide-react`, `clsx`, `tailwind-merge` are already present).
- Keep `app/globals.css` on **Tailwind v4 + the shadcn default tokens**. If a block needs extra
  CSS variables, merge **only those deltas** from its toolbar snippet — never paste a vendor's
  whole `globals.css` (it would override the site's palette).
- `globals.css` has `@source not` excludes for `reference/`, markdown, and the manifest. If you add
  another non-source folder full of class-like strings, exclude it too.

## Verified

`button` + `sheet` (`@shadcn`) and `avatar-15` (`@ss-components`) install cleanly and
`pnpm build` passes, so the studio auth + CLI path is confirmed working in this repo.
