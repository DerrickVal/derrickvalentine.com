# 07 · SHOPIFY → `app/(marketing)/services/shopify/page.tsx`

Build with `06-SERVICE-PAGE-TEMPLATE.md`. `service = SERVICES.shopify`. Reference `design-reference/Shopify Service.dc.html`
for verbatim capabilities / included / works / FAQ / testimonial copy.

## Pricing data (exact)
```ts
fromPrice: 1200,
cardBlurb: "Stores that load fast and actually sell — theme work, custom sections, and clean migrations.",
cardChips: ["Stores", "Migrations", "Speed"],
defaultPages: 5, maxPages: 20,
hero: {
  h1a: "Shopify stores that", h1b: "actually sell.",   // h1b = sage accent line
  lead: "New builds, redesigns, migrations, and speed work — done by one developer who knows the platform inside out. Clear price up front.",
},
types: [
  { key: "refresh",  label: "Refresh",   base: 1200, perPage: 120, included: 3, days: 5,  blurb: "Polish your current store" },
  { key: "redesign", label: "Redesign",  base: 2400, perPage: 180, included: 5, days: 10, blurb: "New look, same store" },
  { key: "newbuild", label: "New build", base: 3800, perPage: 240, included: 6, days: 18, blurb: "Build from scratch" },
],
addons: [
  { key: "migration", label: "Migrate from another platform", sub: "WooCommerce, Squarespace, Wix…", price: 900, days: 4 },
  { key: "sections",  label: "Custom interactive sections",   sub: "Bespoke homepage / product blocks", price: 650, days: 3 },
  { key: "speed",     label: "Speed & Core Web Vitals",       sub: "Tuning for fast load + SEO", price: 450, days: 2 },
  { key: "blog",      label: "Blog / content setup",          sub: "Templates + first posts styled", price: 350, days: 1 },
  { key: "products",  label: "Bulk product import",           sub: "Up to 200 products, organized", price: 400, days: 2 },
],
```

## FAQ (copy verbatim from the `.dc.html`)
Questions are: "Can you migrate my products?", "Do you handle apps and checkout?", "How long does it take?", "Do you offer
ongoing maintenance?", "What if I'm not on Shopify yet?" — pull the answers from `design-reference/Shopify Service.dc.html`.

Capabilities (6), "What's included" (6), Work examples (3, e.g. Harbor Goods / Ironclad Fitness — placeholders), and the
testimonial: copy verbatim from the same file. Metadata title: `Shopify Development — Derrick Valentine`.
