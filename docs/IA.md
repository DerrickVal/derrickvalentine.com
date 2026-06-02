# Information Architecture — derrickvalentine.com rebuild

**Status: LOCKED 2026-06-02.** This is the build spec for the new site. It supersedes the
old WordPress sitemap (archived at `reference/derrickvalentine.com/`). Tone, layout, and
structure are intentionally new; the archive is a content source, not a template.

## Strategy (locked)

- **Site's job — Hybrid.** Credibility-first homepage (the long-standing developer behind
  Digital Dog / SitesForRoofers / Upwork, ~10-year track record) *with* working conversion
  paths. People arrive to do a deeper dive on the person; some are ready to act.
- **Service — website redesign, single hook, all industries.** "Catch-all" means *all
  niches / one service*, not many services. Replaces the old Marketing / Web Dev / Graphic
  Design split.
- **Geography — DMV (DC / Maryland / Virginia).** Sweet-spot verticals: contractors,
  consultants, wellness practices, nonprofits, local service businesses, small professional
  firms. (Stay welcoming to any niche, but lean here for local-SEO and proof.)
- **Pricing — published ranges + packages** (3 project tiers + a recurring Care Plan).
- **Portfolio — Before & After.** Real before/after assets exist (owner to import later).
- **Primary conversion path:** *Request a Website Review* (free) → redesign project → Care
  Plan (recurring revenue). The review is the persistent primary CTA sitewide.

## Top navigation (7)

`Home` · `Services` · `Work` · `Pricing` · `About` · `Resources` · `Contact`

- Persistent primary CTA in the header: **Request a Website Review**.
- Labels: "Work" carries the *Before & After* framing; "Contact" doubles as *Request a
  Website Review*. Pricing stays its own page (the package detail earns it); the Services
  page shows a pricing teaser that links here.
- Mobile: 7 is the ceiling — if it feels heavy, the first merge is Pricing → Services.

## Pages

### 1. Home
- **Job:** establish credibility fast, frame the redesign offer, push the free review.
- **Sections:** hero (who he is + redesign hook + Request-a-Review CTA) → "before/after"
  teaser (2–3) → who it's for (all niches; DMV) → how it works (3-step) → testimonials →
  bona fides (10 yrs; the dev behind Digital Dog / SitesForRoofers) → final CTA.
- **Source:** `content/index.md` (real hero "Over 10 years in the game…", the
  Design/Develop/Market trio — repurpose as redesign benefits).

### 2. Services  *(Website Redesign)*
- **Job:** explain the one offer and the process; reassure non-technical buyers.
- **Sections:** what a redesign with him includes → "how I work" process
  (Consultation → … ) → what's included by tier (teaser) → pricing summary (→ Pricing) →
  CTA.
- **Source:** `content/services.md` ("WHAT I DO"), `content/my-services.md`
  ("MY PHILOSOPHY"), `content/services_web-development.md` (real process steps),
  `content/free-website.md` (the review offer).

### 3. Work  *(Before & After)*
- **Job:** prove it with real projects; before→after is the hero device.
- **Sections:** filterable grid → per-project case study (brief → before/after → outcome).
- **Source:** 7 real case studies — `content/portfolio_{58-agency-and-co, kayleigh,
  samuellashouse, shanelle-harrison, the-kulinary-project, uniting-our-youth,
  variable-scoop}.md` and `api/portfolio.json`. (The other portfolio items are theme demo.)

### 4. Pricing
Public-facing package content (see Internal notes for strategy that must NOT be published):

**Website Refresh — $2,500–$3,500**
For a small business with an existing site that mainly needs a visual upgrade.
- 1–3 pages · Homepage redesign · Mobile cleanup · Basic copy cleanup · Contact form
- CTA improvements · Basic SEO titles/meta · Launch support

**Small Business Redesign — $5,000–$7,500**  *(most popular)*
The sweet spot for local service businesses, contractors, consultants, wellness practices,
nonprofits, and small professional firms.
- 5–7 pages · Homepage redesign · Service pages · About page · Contact / request-a-quote page
- Copywriting assistance · Mobile-first redesign · Local SEO structure · Speed/performance
  cleanup · Basic on-page SEO · 301 redirects (if replacing an old site) · Launch checklist

**Premium Redesign + Growth Setup — $9,500–$15,000**
For businesses that want more than "make it look better."
- 8–15 pages · Strategy session · Full content rewrite · Conversion-focused service pages
- Local SEO landing pages · Portfolio/case-study setup · Blog/resource structure
- Analytics setup · CRM/email integration · Booking or quote-request system · Redirect map
- 30-day post-launch support

**Website Care Plans** *(ongoing)*

| Plan | Price | For |
|---|---|---|
| Basic Care | $150–$250/mo | Hosting, backups, updates, monitoring |
| Growth Care | $350–$500/mo | Above + small monthly edits |
| Partner Care | $750–$1,500/mo | Ongoing design / dev / copy support |

### 5. About
- **Job:** the person behind the work — the deeper-dive payload.
- **Sections:** story + photo → 10-year track record → the brands he's behind (Digital Dog,
  SitesForRoofers) → values / how he works → CTA.
- **Source:** `content/about-me.md` (real bio: "Hi! My name is Derrick Valentine…").

### 6. Resources
- **Job:** expertise + SEO; light, sustainable.
- **Sections:** the FAQ (real, strong — keep it) + a few cornerstone redesign/SEO guides.
- **Source:** `content/faq.md` (747 words, genuine). Old blog posts are mostly demo filler —
  treat Resources articles as **new content to write**, not migrated.

### 7. Contact  *(Request a Website Review)*
- **Job:** the lead magnet — a free review of the visitor's current site.
- **Sections:** short pitch ("send me your URL, I'll review it") → form (name, email, site
  URL, goals) → alternate contact. Wire the form later (provider TBD).
- **Source:** `content/contacts.md`, `content/template-contact.md` ("I would love to hear
  from you! Creating future-proof digital experiences is what I do."), `content/free-website.md`.

## Internal notes (NOT public copy)
- Website Refresh: don't price below $2,500 unless building portfolio proof.
- Small Business Redesign is the **target / main package** — design the funnel to steer here.
- Care Plans turn one-time redesigns into recurring revenue — surface/upsell them after a
  project. This is the retention engine.

## What we are NOT migrating
Old-site demo cruft to ignore: Homepage 2–5, Blog/Portfolio Grid variants, Shop/Cart/Checkout,
the 6 fake "team" members, and the filler blog posts. See `reference/derrickvalentine.com/SUMMARY.md`.
