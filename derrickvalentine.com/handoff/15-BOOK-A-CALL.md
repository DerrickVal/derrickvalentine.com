# 15 · BOOK A CALL → `app/(marketing)/book/page.tsx`

Reproduce `design-reference/Book a Call.dc.html`. A **Calendly-style scheduler**. For production, the cleanest path is to
**embed the real Calendly** inside the same page shell; the custom scheduler in the design is the visual target if you keep
it in-house. Build the shell + decide (A) real Calendly embed, or (B) port the custom scheduler. Either way, **match the
surrounding page**.

Uses a **slim header/footer** (no full nav distractions): brand left, "Message me" → `/contact`, "Client login" → `/login`.
Footer slim variant ("Prefer to write? Send a message →"). See `03` slim variants.

## 1 — Hero (centered)
`max-w-[1080px] mx-auto px-8 pt-[30px] pb-2 text-center`. `<SectionLabel>BOOK A CALL</SectionLabel>` + **H1** two-tone
"Let's find / `<span class="text-accent">`a time.`</span>`" (`clamp(36px,5vw,64px)`, centered) + lead "Pick a slot that
works for you. 15 minutes, no pitch — just your goals and a straight answer on cost."

## 2 — Scheduler card
`max-w-[1080px] mx-auto px-8 pt-9 pb-12`.

### Option A — real Calendly (recommended for prod)
Render the design's **meeting-info rail** (left, 288px) + a Calendly inline embed (right). Meeting-info rail:
`bg-card border-[1.5px] border-border rounded-l-[22px] p-7`: avatar "DV" + "Derrick Valentine / Web developer",
H2 "15-min intro call", a 3-row meeting facts list (15 minutes · Google Meet · Free, no obligation), and a "WHAT WE'LL
COVER" list (platform & what's not working · what you want the site to do · a real number and a timeline). Embed Calendly
with `react-calendly` `InlineWidget` or the official `<div class="calendly-inline-widget" data-url=…>` + script; theme it
to the brand where Calendly allows. Wrap the whole thing in the `bg-card border rounded-[22px]` shell with a soft shadow.

### Option B — port the custom scheduler (`<Scheduler />`, `"use client"`)
If you keep it in-house, port the design's three-column shell + flow exactly:
- **Left rail** — the meeting-info described above (static).
- **Middle — calendar:** a month grid built from `new Date()`; weekday columns S–S; **weekends & past days disabled**
  (`date >= today && dow !== 0 && dow !== 6`); month label + ‹ › nav (can't go before current month). Selecting a day sets
  `dateKey`. Available days are `bg-background border-[1.5px] border-border`; selected = `bg-primary
  text-primary-foreground`; disabled = muted, not clickable. (You may base this on shadcn `Calendar`/react-day-picker with
  `disabled` matchers + custom day styling.)
- **Right — slots:** when a day is picked, show "SELECT A TIME" + the day label, then a scrollable list of times
  (`9:00 AM … 4:30 PM`, half-hours, skipping lunch 12–1). Some are "taken" (struck-through, disabled) via a deterministic
  rule (the design used `(i*3 + dayNum) % 5 === 0`). Selecting a time sets `time`.
- **Confirm bar** (bottom of card): when both date+time chosen, "15-min call · **{day} at {time}**" + **Schedule call →**
  (`pill`). Disabled gray button until ready.
- **Confirmed state:** swap the whole card for a centered success panel — 66px primary `✓`, "You're booked!", "A calendar
  invite with the Google Meet link is on its way to your inbox. Talk soon.", a details box (WHEN / WHERE Google Meet),
  buttons **Add to calendar** + **Pick another time** (resets). For real bookings this is where the server creates the
  event (Calendly/Cal.com API or Google Calendar) and Resend sends the invite.

> Recommendation: ship **Option A** (real Calendly) for reliability; keep the design's rail + hero so the page still feels
> on-brand. Note the choice with `// NOTE(handoff): scheduler = Calendly embed`.

## Acceptance
- [ ] Slim chrome; centered hero; meeting-info rail; a working scheduler (Calendly embed **or** ported custom flow).
- [ ] If custom: month nav, disabled weekends/past, day→slots, taken slots, confirm bar, "You're booked!" + reset.
- [ ] On-brand tokens/type; "All times shown in your local timezone." note. Lint clean.
