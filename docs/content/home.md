# Home — copy draft

**Status: DRAFT 2026-06-02.** Copy + section plan for the home page. Voice and positioning
per `docs/MESSAGING.md`; page role per `docs/IA.md`. Hero direction = Option A.

This is a **warm-lead** page (visitors already know Derrick) — deepen trust, don't hard-sell.
Every section funnels to the one action: **Request a Website Review** (free, no pitch).

---

## Homepage Structure

Order of sections, each paired to a Shadcn Studio **Marketing UI** block type
(https://shadcnstudio.com/blocks#marketing-ui). Vendor with
`pnpm run vendor:blocks -- only @ss-blocks/<id>` after picking a variant from the toolbar.

| # | Section | → Shadcn Studio block type | Job |
|---|---------|----------------------------|-----|
| 1 | **Hero** | Hero Section *(installed: `hero-section-37`)* | The promise + primary CTA |
| 2 | **Trust strip** *(optional)* | Social Proof / Logo Cloud | Instant credibility under the hero (niches served / client marks) |
| 3 | **What I take off your plate** | Features Section | The "everything handled" value — and the *why me* |
| 4 | **How it works** | Timeline Component | 3 steps: Review → Redesign → I keep it running |
| 5 | **Before / After** | Compare | Drag-to-compare on a real redesign; links to Work |
| 6 | **Testimonials** | Testimonials Component | The three real quotes |
| 7 | **The person behind the work** | About Us Page *(teaser)* | 10 years, one human; links to About |
| 8 | **Final CTA** | CTA Section | Request a Website Review |

**Built 2026-06-02** — `app/page.tsx` composes the full page with real copy:
- **Hero** (`hero-section-37`) — our headline/subhead/CTAs; removed the fake "Google/Meta/HubSpot partner" badges. *Still demo:* the floating stat cards + scrolling brand-logo marquee (decorative placeholders to clean).
- **Features** (`features-section-01`) — the five "off your plate" cards.
- **How it works** — *custom 3-step section* (shadcn `Card`); the Studio `timeline-component-01` is an e-commerce order-tracker, wrong fit (left vendored, unused).
- **Before/After** — *custom* section using the real MCRC home shots (`/work/mcrchoward/{before,after}/home.jpg`); an interactive drag-slider is still TODO.
- **Compare** (`compare-01`) — repurposed as *Me vs. an agency vs. a freelancer*.
- **Social proof** (`social-proof-01`) — bona fides; its side image is still a Studio placeholder.
- **Testimonials** (`testimonials-component-01`) — the 3 real quotes; names/avatars are placeholders (real attributions pending).
- **CTA** (`cta-section-01`) — converted from app-download to "Request a Website Review" → /contact.
- **Omitted:** the logo cloud — fake Fortune-500 logos would misrepresent clients; add real client marks to enable it.

---

## Copy

### 1 — Hero  ·  *Hero Section*

**Headline** (three lines, per the block's stacked layout):
> Your whole website.
> Off your plate.
> One text away.

**Subhead:**
> I'm Derrick Valentine. For ten years I've redesigned, hosted, and maintained websites for
> small businesses, nonprofits, and creatives — so they can stop fighting with the web and get
> back to what they're great at. No agency. No bids. Just me, a text away.

**Primary CTA:** Request a Website Review
**Secondary CTA:** See the work →
**Under the buttons:** Send me your current site and I'll tell you what I'd fix. Free, no pitch.

### 2 — Trust strip  ·  *Social Proof / Logo Cloud*  (optional)

**Eyebrow:** The people I build for
> Contractors · Consultants · Wellness practices · Nonprofits · Creatives · Local service —
> across the DMV and well beyond it.

*(Use real client marks if you have them; otherwise this niche line, or cut the section.)*

### 3 — What I take off your plate  ·  *Features Section*

**Heading:** Everything a website needs. Handled by one person.
**Intro:** You're great at your work. The website is the thing that's three years out of date,
that you keep meaning to fix, that you'd rather never think about again. Good — that part's mine.

- **Design & build.** A site that looks like you and works on every screen, not just the one I built it on.
- **Words, too.** No copy? Send me bullet points and I'll write it. No surprise "content fee."
- **Hosting.** I host it. You'll never log into some hosting company you've never heard of.
- **Updates.** New photo, new service, new hours? Text me. Usually live within 48 hours.
- **One person.** No account managers, no bid threads. You get me — call or text.

### 4 — How it works  ·  *Timeline Component*

**Heading:** How it works

1. **Send me your site.** Book a free Website Review. I'll look at what you've got and tell you, plainly, what I'd fix and what it would cost.
2. **I redesign it.** You send your photos and the words (or I write them). I handle the rest — design, build, the nerdy parts.
3. **I keep it running.** I host it and maintain it. Anything you need after launch is one text away.

### 5 — Before / After  ·  *Compare*

**Leading pair — mcrchoward.org (MCRC Howard County):** assets captured 2026-06-02 →
`/work/mcrchoward/before/home.jpg` ↔ `/work/mcrchoward/after/home.jpg` (12 before + 10 after
pages under `public/work/mcrchoward/`; the **home pair is the clean lead**). *Caption pending
Derrick's story/result.* Fallback: The Kulinary Project before/after.

**Heading:** Same business. A very different website.
**Body:** Real redesigns for real businesses — a DMV chef, a DC nonprofit, a photographer in
Warsaw. Drag to see the before and after.
**CTA:** See all the work →

### 6 — Testimonials  ·  *Testimonials Component*

**Heading:** What it's actually like to work with me.

> "Working with Derrick has made my life so easy. All I had to do was upload my images and send
> him the text — he handled everything else while I ran my business. If I ever need anything, I
> know I can just call him and the site will be updated in 48 hours."
> — *[client — confirm name/business]*

> "He went above and beyond to understand how my nonprofit worked, even spending several days
> volunteering at one of my locations. Since getting my site redone, I've had 3 new funders find
> me through the website alone."
> — *[nonprofit founder — confirm name/org]*

> "I was already working with a web development team. When that fell through, I called Derrick to
> finish the project. I wish I'd started with him — there's no comparison."
> — *[client — confirm name/business]*

*(Quotes are real, from the old site; please confirm attributions before publishing.)*

### 7 — The person behind the work  ·  *About Us (teaser)*

**Heading:** Ten years. One person. Every "can you just…" answered.
**Body:** I'm Derrick — the developer who actually picks up. For a decade I've built and looked
after websites for people in just about every field, all over the DMV and well past it. No team
to manage, no ticket queue. Just the person who built your site, still answering the phone.
**CTA:** More about me →

### 8 — Final CTA  ·  *CTA Section*

**Heading:** Let's get your website off your plate.
**Body:** Send me your current site. I'll tell you what I'd fix — free, no pitch. From there it's
one text away from handled.
**Primary CTA:** Request a Website Review
