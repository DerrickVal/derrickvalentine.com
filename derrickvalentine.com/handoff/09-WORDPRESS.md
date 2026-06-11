# 09 · WORDPRESS → `app/(marketing)/services/wordpress/page.tsx`

Build with `06-SERVICE-PAGE-TEMPLATE.md`. `service = SERVICES.wordpress`. Verbatim copy from
`design-reference/WordPress Service.dc.html`.

## Pricing data (exact)
```ts
fromPrice: 900,
cardBlurb: "Reliable, easy-to-edit sites — rebuilds, rescues, and ongoing care.",
cardChips: ["Builds", "Rescues", "WooCommerce"],
defaultPages: 5, maxPages: 20,
hero: {
  h1a: "WordPress sites that", h1b: "just keep working.",   // h1b = sage accent
  lead: "Custom builds, redesigns, rescues, and migrations — fast, secure, and easy for your team to update. One developer, with a clear price up front.",
},
types: [
  { key: "refresh",  label: "Refresh",   base: 900,  perPage: 110, included: 3, days: 5,  blurb: "Polish your current site" },
  { key: "redesign", label: "Redesign",  base: 2200, perPage: 170, included: 5, days: 10, blurb: "New look, same content" },
  { key: "newbuild", label: "New build", base: 3400, perPage: 230, included: 6, days: 16, blurb: "Build from scratch" },
],
addons: [
  { key: "migration", label: "Migrate from another platform", sub: "Wix, Squarespace, Shopify…", price: 800, days: 4 },
  { key: "sections",  label: "Custom blocks & layouts",       sub: "Editable Gutenberg / ACF blocks", price: 600, days: 3 },
  { key: "speed",     label: "Speed & security hardening",    sub: "Caching, updates & lockdown", price: 450, days: 2 },
  { key: "blog",      label: "Blog / content setup",          sub: "Templates + first posts styled", price: 350, days: 1 },
  { key: "products",  label: "WooCommerce store",             sub: "Products, cart & checkout", price: 700, days: 3 },
],
```

## FAQ (verbatim from the `.dc.html`)
"Will you use a page builder?", "Can my team edit it?", "Can you migrate my existing site?", "How long does it take?",
"Can you rescue a broken site?", "Do you offer ongoing support?" — answers from `design-reference/WordPress Service.dc.html`.

Capabilities (6: incl. "Redesigns & rescues", "Custom blocks & layouts", "Speed & security"), "What's included" (6),
Work examples (3, e.g. Northside Roofing — placeholder), testimonial (Tom Becker, Northside Roofing).
Metadata: `WordPress Development — Derrick Valentine`.
