# 14 · CONTACT → `app/(marketing)/contact/page.tsx`

Reproduce `design-reference/Contact.dc.html`. The form is a small **client island** posting to a **Server Action** that
sends via **Resend**. Section order: `SiteHeader` → **Hero (split)** → **Body (direct-contact rail + form)** → `SiteFooter`.

## 1 — Hero
`max-w-[1240px] mx-auto px-8 pt-[30px] pb-2.5`. `<SectionLabel>CONTACT</SectionLabel>` + grid
`grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-10 items-end`:
- **H1** two-tone "Let's / `<span class="text-accent">`talk.`</span>`" (`clamp(40px,5.8vw,78px)`).
- Lead: "Tell me what you need and I'll get back to you — usually within a few hours. No bots, no sales team. Just me."

## 2 — Body
`max-w-[1240px] mx-auto px-8 pt-[44px] pb-[30px]`. Grid `grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] gap-7 items-start`
(→ stack on `md`, rail **below** form or above — match design: rail left, form right).

### Left rail (RSC)
1. **Book-a-call card** (primary action) — `Link` to `/book`, `bg-forest-grad` + hatch, `rounded-[18px] p-6 text-primary-foreground`: label "FASTEST WAY", "Book a 15-min call" (extrabold 22px), "Pick a time that works. We'll talk platform,
   goals, and a real number.", and a cream pill "Choose a time →".
2. **Info card** (`bg-card border-[1.5px] border-border rounded-[18px] p-[22px]`): rows split by hairlines — **EMAIL**
   `hello@digitaldog.io` (link), **RESPONSE TIME** "A few hours, most days", **ALSO FIND ME** chips Upwork / LinkedIn /
   Digital Dog (outline pills). Each row has a 42px `rounded-[11px] bg-muted` icon tile. `// TODO(content)` on email.
3. **"Already a client?" card** (`bg-band rounded-[18px] p-5`): "Log in to upload content or check on your project." +
   "Go to client login →" → `/login`.

### Right — `<ContactForm />` (`"use client"`)
Card `bg-card border-[1.5px] border-border rounded-[22px] p-[clamp(24px,3vw,36px)]`. Two states:
- **Form state:** H2 "Send a message" + sub "A few details is all I need to give you a useful first reply." Fields (use
  shadcn `Input`/`Textarea`/`Select`/`Label`):
  - Row: **Your name** (text) · **Email** (email).
  - Row: **Business / website** (text, optional) · **Platform** (select: "Not sure yet" / Shopify / Webflow / WordPress /
    Squarespace / Something else).
  - **What do you need?** (textarea, 5 rows, placeholder "A new site, a refresh, a rescue, a quick question — whatever it
    is, tell me here.").
  - Footer row: **Send message →** (`pill` submit) + helper "Prefer to talk? Book a call instead." (link → `/book`).
  - Labels: `text-[11px] font-bold tracking-[.1em] text-[#7C8071]`. Inputs: `bg-white border-[1.5px] border-border
    rounded-[11px] px-4 py-3.5`, focus border→primary.
- **Success state:** big 64px primary circular `✓`, H2 "Thanks, {firstName}!" (or "Thanks!" if empty), "Your message is on
  its way. I'll get back to you within a few hours — usually faster. If it's urgent, just book a call." + buttons **Book a
  call** (`pill`, `/book`) + **Send another** (resets the form).

**Wiring (real backend):** make the form a `<form action={submitContact}>` where `submitContact` is a Server Action
(`"use server"`): validate (zod), send the email with **Resend** (`RESEND_API_KEY`, from `noreply@derrickvalentine.com`,
reply-to the visitor) to Derrick's inbox, and return `{ ok, firstName }`. Use `useActionState` (React 19) to flip to the
success state on `ok`. The design's prototype just toggles state on submit — replace that with the action result.
Add a **Turnstile** check (the repo already lists Turnstile env keys) before send to stop spam.

## Acceptance
- [ ] Hero; left rail (book card, info card with email/response/socials, client-login card); form with all 5 fields + platform select.
- [ ] Submit → personalized success state; "Send another" resets. Server Action + Resend wired; Turnstile gate.
- [ ] Tokens + chrome match; no overlaps. Lint clean.
