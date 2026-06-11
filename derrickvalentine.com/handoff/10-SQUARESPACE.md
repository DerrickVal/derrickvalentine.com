# 10 · SQUARESPACE → `app/(marketing)/services/squarespace/page.tsx`

Build with `06-SERVICE-PAGE-TEMPLATE.md`. `service = SERVICES.squarespace`. Verbatim copy from
`design-reference/Squarespace Service.dc.html`.

## Pricing data (exact)
```ts
fromPrice: 750,
cardBlurb: "Clean, polished sites done quickly — perfect for a sharp first impression.",
cardChips: ["Styling", "SEO", "Stores"],
defaultPages: 5, maxPages: 20,
hero: {
  h1a: "Squarespace sites,", h1b: "sharp and fast.",   // h1b = sage accent
  lead: "Clean, professional sites set up quickly — styled past the template and tuned for search. One developer, with a clear price up front.",
},
types: [
  { key: "refresh",  label: "Refresh",   base: 750,  perPage: 90,  included: 3, days: 4,  blurb: "Polish your current site" },
  { key: "redesign", label: "Redesign",  base: 1800, perPage: 140, included: 5, days: 8,  blurb: "New look, same content" },
  { key: "newbuild", label: "New build", base: 2800, perPage: 190, included: 6, days: 14, blurb: "Build from scratch" },
],
addons: [
  { key: "migration", label: "Migrate from another platform", sub: "Wix, WordPress, Shopify…", price: 700, days: 3 },
  { key: "sections",  label: "Custom CSS & code blocks",      sub: "Push past the template", price: 500, days: 2 },
  { key: "speed",     label: "SEO & performance setup",       sub: "On-page SEO + image tuning", price: 400, days: 2 },
  { key: "blog",      label: "Blog / content setup",          sub: "Templates + first posts styled", price: 300, days: 1 },
  { key: "products",  label: "Squarespace store setup",       sub: "Products, cart & checkout", price: 600, days: 3 },
],
```

## FAQ (verbatim from the `.dc.html`)
"Why hire someone for Squarespace?", "Can my team edit it?", "Can you migrate my existing site?", "How long does it take?",
"Can you customize beyond the template?", "Do you offer ongoing support?" — answers from
`design-reference/Squarespace Service.dc.html`.

Capabilities (6: incl. "Custom styling", "SEO & performance"), "What's included" (6), Work examples (3, e.g. Maple & Vine —
placeholder), testimonial (Gina Marsh, Maple & Vine). Metadata: `Squarespace Development — Derrick Valentine`.

---

### Note — `Square­space` line break
The platform name uses a soft hyphen (`Square&shy;space`) in headings/cards so it can wrap gracefully in narrow columns.
In JSX use `Square\u00ADspace` or `<>Square&shy;space</>` where it appears as a big display word.
