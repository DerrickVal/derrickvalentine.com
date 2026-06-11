# Contact / Request a Website Review — copy draft

**Status: DRAFT 2026-06-02.** Voice per `docs/MESSAGING.md` (no em dashes; sounds like a person).
Page role per `docs/IA.md`. Route: **/contact**. This is the conversion endpoint: every CTA on
the site points here, so keep it low-friction. The job is the easy, no-pressure yes.

## Page Structure

| # | Section | → Shadcn Studio block | Job |
|---|---------|----------------------|-----|
| 1 | **The offer** (heading) | Contact Us Page header *(or simple heading)* | Reframe "contact" as a free review, kill the pressure |
| 2 | **The form + direct contact** | **Contact Us Page** (`contact-us-page-XX`) | Capture site URL + goals; offer text/call/email |
| 3 | **What happens next** | custom 3-step *(or part of the contact block)* | Set expectations, remove the fear of a sales trap |

Form backend: Resend, per the `CONTACT_*` keys in `.env.local`. Wire it on build.
Public phone + email are placeholders below for Derrick to fill.

## Copy

### 1 — The offer

**H1:** Send me your site. I'll tell you what I'd fix.

**Sub:** It's a free website review, not a sales call. Send me your current site and a little about
your business, and I'll come back with a short, plain-English rundown of what I'd change and what
it would cost. If you want to move forward, great. If not, you've got a free second opinion.

### 2 — The form  ·  *Contact Us Page*

**Heading:** Request your free review

**Fields:**
- **Name**
- **Email**
- **Phone** (optional). The fastest way to reach me is a text.
- **Your current website.** Paste the URL. No site yet? Just say so.
- **What would you change if you could?** A sentence or two is plenty.

**Button:** Send my site for review

**Under the button:** I read every one of these myself. You'll hear back from me, not a bot,
usually within a day.

**Direct contact (beside the form):**
Prefer to just talk? Text or call me at **[PHONE: Derrick to provide]**, or email
**[EMAIL: Derrick to provide]**. I'm one person, so it's actually me on the other end.

**Testimonial (beside the form).** Put a short one next to the form to answer the unspoken
question, "will this person actually respond?" Use Khari's, with his photo
(`/testimonials/khari-bell.jpg`):

> "Working with Derrick has made my life so easy. All I had to do was upload my images and send
> him the text, and he handled everything else while I ran my business. The best part has been
> after: if I ever need anything, I know I can just call him and the site will be updated in 48 hours."
>
> Khari Bell, The Kulinary Project

### 3 — What happens next

1. **You send it over.** Takes about two minutes.
2. **I actually look at it.** No automated audit, no generated PDF. Just me, on your real site.
3. **You get a straight answer.** What I'd fix, roughly what it costs, and whether I'm even the
   right fit. No pressure either way.

### Trust line (small, optional)

Ten years doing this. The person who reviews your site is the same one who'd build it.
