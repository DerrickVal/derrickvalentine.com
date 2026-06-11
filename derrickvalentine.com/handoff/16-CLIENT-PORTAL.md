# 16 · CLIENT PORTAL → `/login` + `/p/[slug]` (and `(portal)` group)

Reproduce `design-reference/Client Portal.dc.html` as the **front end for the auth + portal you already started**
(commit `9fd7440`). This is the one page that must **reconcile with existing code**, not replace it.

> **Reconcile with existing code (read first).** Per `CLAUDE.md` you already have: passwordless OTP-first auth
> (`app/login` with email→6-digit code, actions `requestOtp`/`verifyOtp`/`signOut`, `app/auth/confirm` magic-link
> callback, `lib/auth/getUser.ts`, `middleware.ts` scoped to `/admin /portal /p/ /login /auth`), the three Supabase
> clients, the schema (`profiles, projects, project_members, payments, subscriptions`), route groups `(admin)`/`(portal)`,
> and Resend SMTP. **Do not rebuild that.** This file is the **visual/UX spec** to skin those screens. Keep your server
> actions, RLS, and middleware; swap the UI to match the design. Where the design implies data not in your schema yet
> (project stages, content/upload items), that's **Phase 2** (`content-acceptance tables`) — render with placeholder data
> now and wire later.

The design has **two screens in one file**: the **login** (OTP-first) and the **dashboard** (Overview / Upload / Invoices).
Split them into real routes.

---

## A. Login → `app/login/page.tsx` (already exists — restyle to this)

**Layout:** full-height split `grid-cols-2` (stack on `md`). It does **not** use marketing chrome.

**Left brand panel:** `bg-[linear-gradient(160deg,#3c4a30,#1e2618)]` + hatch, `p-12 flex flex-col justify-between
text-[#E9EAE0]`. Top: DV logo + "Derrick Valentine" (→ `/`). Middle: H1 two-tone "Your project, / `<span
class="text-accent-on-dark">`in one place.`</span>`" + "Track progress, upload your content, and handle invoices — no
passwords, no chasing email threads." + a 3-stat row (Live project status · Secure file uploads · Simple invoices). Bottom:
"© 2026 Derrick Valentine".

**Right form panel:** centered, `max-w-[392px]`. "← Back to site" (→ `/`). A **project-URL chip** showing the stable
bookmarkable URL (e.g. `digitaldog.io/p/harbor-goods`) — this is the self-service re-issue anchor; on a real project page
`/p/[slug]` it reflects that slug. Then **two steps** (your `requestOtp`/`verifyOtp` already back these):

- **Step 1 — email:** H2 "Sign in", copy "No password to remember. Enter your email and I'll send a secure link *and* a
  6-digit code — use whichever's easier." → email `Input` + **"Email me a secure link →"** (calls `requestOtp`). A reassurance
  chip: "You'll stay signed in on this device for months — just bookmark this page." No password field anywhere. Footer:
  "Not a client yet? Get in touch" → `/contact`.
- **Step 2 — OTP-first:** H2 "Check your email", "I sent a secure link and a 6-digit code to **{email}**. Enter the code
  below — or just tap the link in the email." → a **large 6-digit code input** (`text-[30px] font-bold tracking-[.42em]
  text-center`, numeric, max 6 digits) + **"Verify & sign in →"** (disabled until 6 digits; calls `verifyOtp`). A note
  "Prefer the link? Open the email and tap **Sign in** — same result." Then **Resend code** (calls `requestOtp` again) and
  **Wrong email?** (back to step 1). Fine print: "The link and code expire in 1 hour and can be used once. The newest email
  always works."

**Behavior is already yours:** `requestOtp(email)` → Supabase `signInWithOtp` (sends link **and** code; `otp_length=6`,
template includes the code). `verifyOtp(email, token)` → session (long rotating refresh cookie). The magic-link path hits
`app/auth/confirm`. On success redirect to the project (`/p/[slug]` or `/portal`). Keep the durable-session behavior from
`CLAUDE.md` (60–90 day refresh, renew on visit).

**Token note:** `--accent-on-dark` is the sage used on the dark brand panel; the design's green here is `#3c4a30→#1e2618`.

---

## B. Dashboard → `app/(portal)/p/[slug]/page.tsx` (skin your `(portal)` starter)

Authenticated app shell: **sidebar + main**, `grid-cols-[248px_minmax(0,1fr)] min-h-screen`. **Not** marketing chrome.

**Sidebar** (`bg-ink-2 #20251A text-[#C2C6B5] p-[24px_18px] sticky top-0 h-screen flex flex-col gap-2`):
- DV logo + "Client Portal".
- Nav items **Overview · Upload content · Invoices** — active = `bg-[rgba(199,210,172,.16)] text-[#F1EFE8]` with a
  `bg-sage-pale` square bullet; inactive = `text-[#A7AC97]` with a dark bullet, hover lightens. In Next these are **routes
  or tabs** — implement as `/p/[slug]` (overview), `/p/[slug]/upload`, `/p/[slug]/invoices` (preferred) or a client tab
  state. Routes are cleaner with RSC + RLS data fetching.
- Bottom: user chip (avatar initials + name + company) and **Log out** (calls `signOut`).

**Top bar** (sticky, `bg-[rgba(241,239,232,.85)] backdrop-blur border-b-[1.5px] border-border px-8 py-5`): project label
("Harbor Goods · Shopify rebuild") + the page title (Project overview / Upload content / Invoices), and a "Message Derrick"
outline button → `/contact`.

**Main** `p-[28px_32px_48px] max-w-[1000px]`. Three views:

### Overview
- **Status header card** `bg-forest-grad` + hatch `rounded-[18px] p-[26px_28px] text-[#E9EAE0]`: an "IN PROGRESS · BUILD"
  pill, **"65% complete"**, "On track for launch — target Jun 20", right column PLATFORM/STARTED, and a progress bar
  (`65%`, `bg-sage-pale` on `rgba(241,239,232,.16)`).
- **Stages list** (left, `bg-card` card): 6 rows — Kickoff call ✓, Plan & quote ✓, Design ✓, **Build (Now)** highlighted,
  Review & launch (pending), Launch (pending). Done = primary `✓` circle; current = `bg-accent-bright ●` + "Now" pill on a
  `bg-[#EEF1E6]` row; pending = empty outline circle, muted text + ~date.
- **Right column:** a `bg-band` "WHAT'S NEEDED FROM YOU" card ("Homepage copy + product details" + an "Upload content →"
  button → the upload view) and a `bg-card` "LATEST UPDATE" card (a dated note).

### Upload content
Intro line, then a 2-col grid of category cards (`bg-card border rounded-[16px] p-5`): **Logo & brand files** (Received ✓),
**Product photos** (12 of ~20, with a dropzone), **Homepage copy** (Needed, dropzone), **Product details** (Needed, dropzone).
Status pills use `--status-paid` (Received), `--status-warn` (partial), `--status-due` (Needed). Dropzones:
`border-[1.5px] border-dashed border-border-strong rounded-[11px] p-4 text-center`, "Drop … or browse". Then a "RECENTLY
UPLOADED" list with dated rows.
- **Real wiring (Phase 2):** uploads go to **Supabase Storage** (client writes directly under RLS, per the `CLAUDE.md`
  "client self-service … writes directly under RLS" convention); each becomes a row in a content/files table. Autosave
  semantics per the auth model ("every field saves as she types"). Until those tables exist, render placeholder cards.

### Invoices
Two summary cards (**Paid to date $1,995** on `bg-card`; **Outstanding $1,900** on `bg-forest-band` text-light), then an
invoice list (`bg-card border rounded-[16px]` with hairline-separated rows): **Final payment** $1,900 (Due, "Pay now"
button), **50% deposit** $1,900 (Paid, Receipt link), **Care plan — May** $95 (Paid, Receipt). Status pills via tokens.
Note "Payments are handled securely by Stripe. Receipts are emailed automatically."
- **Real wiring:** "Pay now" → Stripe Checkout (one-time `payments`); Care Plan → Stripe Billing (`subscriptions`); all
  through **Digital Dog's shared Stripe account**, every object tagged `metadata.app` so the webhook ignores foreign events
  (per `CLAUDE.md`). Render from the `payments`/`subscriptions` tables you already have; gate by `is_project_member()`.

## Acceptance
- [ ] `/login` restyled to the OTP-first two-step design (no password field; project-URL chip; resend/wrong-email; durable-session copy) — **using your existing `requestOtp`/`verifyOtp` actions**, not a rebuild.
- [ ] Dashboard shell (dark sidebar + top bar) with Overview/Upload/Invoices, skinning your `(portal)` group.
- [ ] Overview status + stages + "what's needed"; Upload category cards + dropzones; Invoices summary + list with Stripe "Pay now".
- [ ] Placeholder data where Phase-2 tables don't exist yet; `// NOTE(handoff)` where you stubbed. RLS/middleware untouched.
