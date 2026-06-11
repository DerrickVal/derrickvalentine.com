# 08 · WEBFLOW → `app/(marketing)/services/webflow/page.tsx`

Build with `06-SERVICE-PAGE-TEMPLATE.md`. `service = SERVICES.webflow`. Verbatim copy from
`design-reference/Webflow Service.dc.html`.

## Pricing data (exact)
```ts
fromPrice: 1800,
cardBlurb: "Custom, animated sites with a CMS your team can actually run.",
cardChips: ["Design", "Animation", "CMS"],
defaultPages: 5, maxPages: 20,
hero: {
  h1a: "Webflow sites that", h1b: "move and convert.",   // h1b = sage accent
  lead: "Custom, animated, CMS-powered sites your team can actually run — designed and built by one developer, with a clear price up front.",
},
types: [
  { key: "refresh",  label: "Refresh",   base: 1800, perPage: 150, included: 3, days: 6,  blurb: "Polish your current site" },
  { key: "redesign", label: "Redesign",  base: 3200, perPage: 220, included: 5, days: 12, blurb: "New look, same content" },
  { key: "newbuild", label: "New build", base: 4800, perPage: 300, included: 6, days: 20, blurb: "Design & build from scratch" },
],
addons: [
  { key: "migration", label: "Migrate from another platform",   sub: "WordPress, Squarespace, Wix…", price: 900, days: 4 },
  { key: "sections",  label: "Custom interactions & animations", sub: "Scroll, hover & page transitions", price: 750, days: 3 },
  { key: "speed",     label: "Speed & SEO optimization",         sub: "Fast loads + clean on-page SEO", price: 450, days: 2 },
  { key: "blog",      label: "CMS Collections setup",            sub: "Blog, portfolio & dynamic pages", price: 500, days: 2 },
  { key: "products",  label: "Forms & integrations",             sub: "Logic, Zapier / Make, email", price: 350, days: 2 },
],
```

## FAQ (verbatim from the `.dc.html`)
"Do I need a Webflow plan?", "Can my team edit it?", "Can you migrate my existing site?", "How long does it take?",
"Do you build custom animations?", "Do you offer ongoing support?" — answers from
`design-reference/Webflow Service.dc.html`. (Note: it has 6/7 Q's — copy exactly what's there.)

Capabilities (6: incl. "Interactions & animations", "CMS & dynamic content"), "What's included" (6), Work examples (3, e.g.
Studio Bloom — placeholder), testimonial (Lauren Diaz, Studio Bloom). Metadata: `Webflow Development — Derrick Valentine`.
