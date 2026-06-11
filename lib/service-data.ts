// Full per-platform content for the service pages (/services/<slug>). Structure
// is identical across platforms (see handoff 06); copy is verbatim from each
// design-reference/<Platform> Service.dc.html. Pricing mirrors lib/services.ts.

import type { ServiceSlug } from "@/lib/services";

export interface ProjectType {
  key: "refresh" | "redesign" | "newbuild";
  label: string;
  base: number;
  perPage: number;
  included: number;
  days: number;
  blurb: string;
}

export interface AddOn {
  key: string;
  label: string;
  sub: string;
  price: number;
  days: number;
}

export interface ServiceData {
  slug: ServiceSlug;
  name: string;
  hero: {
    eyebrow: string;
    h1a: string;
    h1b: string; // sage accent line
    /** Optional H1 size override (default Shopify `clamp(38px,5.4vw,72px)`). */
    h1Size?: string;
    /** Optional H1 leading override (default `leading-[.95]`). */
    h1Leading?: string;
    /** Optional gap above the lead paragraph (default `mt-[22px]`). */
    leadGap?: string;
    lead: string;
    stats: { value: string; label: string }[];
    mock: {
      caption: string;
      /** Card eyebrow; default "FEATURED STORE". */
      featuredLabel?: string;
      featuredName: string;
      featuredMeta: string;
    };
  };
  capabilities: { title: string; body: string }[]; // 6
  types: ProjectType[]; // 3
  addons: AddOn[]; // 5
  carePrice: number; // monthly care add-on
  /** Initial calculator state (matches the .dc.html default view). */
  defaultState: { type: ProjectType["key"]; pages: number; addons: string[] };
  included: { title: string; sub: string }[]; // 6
  faqs: { q: string; a: string }[];
  testimonial: { quote: string; name: string; role: string; eyebrow: string };
  cta: { line1: string; line2: string; body: string };
}

const shopify: ServiceData = {
  slug: "shopify",
  name: "Shopify",
  hero: {
    eyebrow: "Expert Shopify development",
    h1a: "Shopify stores that",
    h1b: "load fast and sell.",
    lead: "New builds, redesigns, migrations, and speed work, done by one developer who knows the platform inside out. Clear price up front, in writing.",
    stats: [
      { value: "40+", label: "Shopify stores" },
      { value: "<1.5s", label: "avg. load time" },
      { value: "5–18d", label: "typical turnaround" },
    ],
    mock: {
      caption: "IMAGE · store mockup",
      featuredName: "Harbor Goods",
      featuredMeta: "Shopify migration · +52% mobile conversion",
    },
  },
  capabilities: [
    {
      title: "New stores",
      body: "Built from scratch on a theme tuned to your brand, products, and how you actually sell.",
    },
    {
      title: "Redesigns & refreshes",
      body: "Modernize an existing store without losing your data, reviews, or hard-won SEO.",
    },
    {
      title: "Custom sections",
      body: "Bespoke homepage, collection, and product blocks, clean code, not clunky apps.",
    },
    {
      title: "Migrations",
      body: "Move from WooCommerce, Squarespace, Wix, or BigCommerce, cleanly, with redirects done right.",
    },
    {
      title: "Speed & Core Web Vitals",
      body: "Faster loads, better rankings, and more completed checkouts, measured, not guessed.",
    },
    {
      title: "Ongoing care",
      body: "Updates, fixes, and small improvements on a simple monthly plan. Cancel anytime.",
    },
  ],
  types: [
    { key: "refresh", label: "Refresh", base: 1200, perPage: 120, included: 3, days: 5, blurb: "Polish your current store" },
    { key: "redesign", label: "Redesign", base: 2400, perPage: 180, included: 5, days: 10, blurb: "New look, same store" },
    { key: "newbuild", label: "New build", base: 3800, perPage: 240, included: 6, days: 18, blurb: "Build from scratch" },
  ],
  addons: [
    { key: "migration", label: "Migrate from another platform", sub: "WooCommerce, Squarespace, Wix…", price: 900, days: 4 },
    { key: "sections", label: "Custom interactive sections", sub: "Bespoke homepage / product blocks", price: 650, days: 3 },
    { key: "speed", label: "Speed & Core Web Vitals", sub: "Tuning for fast load + SEO", price: 450, days: 2 },
    { key: "blog", label: "Blog / content setup", sub: "Templates + first posts styled", price: 350, days: 1 },
    { key: "products", label: "Bulk product import", sub: "Up to 200 products, organized", price: 400, days: 2 },
  ],
  carePrice: 95,
  defaultState: { type: "redesign", pages: 6, addons: ["sections", "speed"] },
  included: [
    { title: "Mobile-first & responsive", sub: "Looks right on every device." },
    { title: "On-page SEO basics", sub: "Titles, meta, structure, sitemap." },
    { title: "Speed-optimized build", sub: "Lean theme & compressed images." },
    { title: "Training + walkthrough", sub: "A live session & a recorded Loom." },
    { title: "Clean handoff", sub: "You own everything, fully." },
    { title: "14 days post-launch support", sub: "I fix anything that comes up." },
  ],
  faqs: [
    {
      q: "Will you work with my existing theme?",
      a: "Usually, yes. If it’s a solid base I’ll build on it; if it’s holding you back, I’ll tell you straight and price the alternative.",
    },
    {
      q: "Can you migrate my products?",
      a: "Yes, from WooCommerce, Squarespace, Wix, BigCommerce and more, with redirects so you don’t lose rankings. Add it in the calculator.",
    },
    {
      q: "Do you handle apps and checkout?",
      a: "I set up and configure the apps you need, and customize checkout where your plan allows. I’ll steer you away from apps you don’t.",
    },
    {
      q: "How long does it take?",
      a: "A refresh is often days; a full build runs two to three weeks. The calculator gives you a realistic timeline as you go.",
    },
    {
      q: "Do you offer ongoing maintenance?",
      a: "Yes, on a simple monthly plan, updates, backups, and small changes. No long contracts; cancel anytime.",
    },
    {
      q: "What if I’m not on Shopify yet?",
      a: "No problem, I’ll help you decide if it’s the right fit, set up the store, and migrate your content. That’s the migration add-on.",
    },
  ],
  testimonial: {
    eyebrow: "SHOPIFY CLIENT",
    quote:
      "Our old store was slow and clunky. Derrick migrated us to Shopify, sped everything up, and our mobile sales jumped within the first month.",
    name: "Priya Anand",
    role: "Founder, Harbor Goods",
  },
  cta: {
    line1: "Got your number?",
    line2: "Let’s make it real.",
    body: "Book a 15-minute call. I’ll confirm the scope, lock the price in writing, and give you a start date.",
  },
};

const webflow: ServiceData = {
  slug: "webflow",
  name: "Webflow",
  hero: {
    eyebrow: "Expert Webflow development",
    h1a: "Webflow sites that",
    h1b: "move and convert.",
    lead: "Custom, animated, CMS-powered sites your team can actually run, designed and built by one developer, with a clear price up front.",
    stats: [
      { value: "35+", label: "Webflow sites" },
      { value: "99", label: "Lighthouse score" },
      { value: "6–20d", label: "typical turnaround" },
    ],
    mock: {
      caption: "IMAGE · site mockup",
      featuredLabel: "FEATURED SITE",
      featuredName: "Studio Bloom",
      featuredMeta: "Webflow rebuild · +44% time on site",
    },
  },
  capabilities: [
    {
      title: "New sites",
      body: "Designed and built from scratch, pixel-perfect, responsive, and fully yours.",
    },
    {
      title: "Redesigns & refreshes",
      body: "Modernize an existing site without losing your content, CMS data, or hard-won SEO.",
    },
    {
      title: "Interactions & animations",
      body: "Scroll effects, hover states, and page transitions, built right in the canvas.",
    },
    {
      title: "Migrations",
      body: "Move from WordPress, Squarespace, or Wix, content, CMS, and redirects done right.",
    },
    {
      title: "CMS & dynamic content",
      body: "Collections your team can update without ever touching the code.",
    },
    {
      title: "Ongoing care",
      body: "Updates, fixes, and small improvements on a simple monthly plan. Cancel anytime.",
    },
  ],
  types: [
    { key: "refresh", label: "Refresh", base: 1800, perPage: 150, included: 3, days: 6, blurb: "Polish your current site" },
    { key: "redesign", label: "Redesign", base: 3200, perPage: 220, included: 5, days: 12, blurb: "New look, same content" },
    { key: "newbuild", label: "New build", base: 4800, perPage: 300, included: 6, days: 20, blurb: "Design & build from scratch" },
  ],
  addons: [
    { key: "migration", label: "Migrate from another platform", sub: "WordPress, Squarespace, Wix…", price: 900, days: 4 },
    { key: "sections", label: "Custom interactions & animations", sub: "Scroll, hover & page transitions", price: 750, days: 3 },
    { key: "speed", label: "Speed & SEO optimization", sub: "Fast loads + clean on-page SEO", price: 450, days: 2 },
    { key: "blog", label: "CMS Collections setup", sub: "Blog, portfolio & dynamic pages", price: 500, days: 2 },
    { key: "products", label: "Forms & integrations", sub: "Logic, Zapier / Make, email", price: 350, days: 2 },
  ],
  carePrice: 95,
  defaultState: { type: "redesign", pages: 6, addons: ["sections", "speed"] },
  included: [
    { title: "Mobile-first & responsive", sub: "Looks right on every device." },
    { title: "On-page SEO basics", sub: "Titles, meta, structure, sitemap." },
    { title: "Fast, clean Webflow build", sub: "No bloat, no heavy plugins." },
    { title: "Editor training + handoff", sub: "Run the Webflow Editor with confidence." },
    { title: "Clean handoff", sub: "You own everything, fully." },
    { title: "14 days post-launch support", sub: "I fix anything that comes up." },
  ],
  faqs: [
    {
      q: "Do I need a Webflow plan?",
      a: "Yes, your site lives on Webflow’s hosting. I’ll help you pick the right plan and set it up; it’s billed by Webflow, separately from my work.",
    },
    {
      q: "Can my team edit it without code?",
      a: "Yes. I set up the Webflow Editor and CMS so your team can update text, images, and posts safely, no developer needed.",
    },
    {
      q: "Can you migrate my current site?",
      a: "Yes, from WordPress, Squarespace, Wix and others, with redirects so you keep your rankings. Add it in the calculator.",
    },
    {
      q: "How long does it take?",
      a: "A refresh is often days; a full design-and-build runs two to three weeks. The calculator gives you a realistic timeline as you go.",
    },
    {
      q: "Do you build custom animations?",
      a: "That’s the best part of Webflow, scroll effects, hover states, and page transitions, all without heavy plugins.",
    },
    {
      q: "Do you offer ongoing care?",
      a: "Yes, on a simple monthly plan, updates and small changes whenever you need them. No long contracts; cancel anytime.",
    },
  ],
  testimonial: {
    eyebrow: "WEBFLOW CLIENT",
    quote:
      "We wanted something that felt alive, not a template. Derrick designed and built it in Webflow, animations and all, and now our team updates it ourselves.",
    name: "Lauren Diaz",
    role: "Founder, Studio Bloom",
  },
  cta: {
    line1: "Got your number?",
    line2: "Let’s make it real.",
    body: "Book a 15-minute call. I’ll confirm the scope, lock the price in writing, and give you a start date.",
  },
};

const wordpress: ServiceData = {
  slug: "wordpress",
  name: "WordPress",
  hero: {
    eyebrow: "Expert WordPress development",
    h1a: "WordPress sites that",
    h1b: "just keep working.",
    lead: "Custom builds, redesigns, rescues, and migrations, fast, secure, and easy for your team to update. One developer, with a clear price up front.",
    stats: [
      { value: "60+", label: "WordPress sites" },
      { value: "<2s", label: "avg. load time" },
      { value: "5–16d", label: "typical turnaround" },
    ],
    mock: {
      caption: "IMAGE · site mockup",
      featuredLabel: "FEATURED SITE",
      featuredName: "Northside Roofing",
      featuredMeta: "WordPress rebuild · +38% leads",
    },
  },
  capabilities: [
    {
      title: "New sites",
      body: "Custom builds on a clean theme, no page-builder bloat, fast and yours to own.",
    },
    {
      title: "Redesigns & rescues",
      body: "Modernize or recover a site that’s slow, hacked, or just a tangled mess.",
    },
    {
      title: "Custom blocks & layouts",
      body: "Editable Gutenberg / ACF blocks your team can actually use, no code needed.",
    },
    {
      title: "Migrations",
      body: "Move from Wix, Squarespace, or Shopify, content and redirects kept intact.",
    },
    {
      title: "Speed & security",
      body: "Caching, hardening, and updates so it stays fast and safe for the long haul.",
    },
    {
      title: "Ongoing care",
      body: "Updates, fixes, and small improvements on a simple monthly plan. Cancel anytime.",
    },
  ],
  types: [
    { key: "refresh", label: "Refresh", base: 900, perPage: 110, included: 3, days: 5, blurb: "Polish your current site" },
    { key: "redesign", label: "Redesign", base: 2200, perPage: 170, included: 5, days: 10, blurb: "New look, same content" },
    { key: "newbuild", label: "New build", base: 3400, perPage: 230, included: 6, days: 16, blurb: "Design & build from scratch" },
  ],
  addons: [
    { key: "migration", label: "Migrate from another platform", sub: "Wix, Squarespace, Shopify…", price: 800, days: 4 },
    { key: "sections", label: "Custom blocks & layouts", sub: "Editable Gutenberg / ACF blocks", price: 600, days: 3 },
    { key: "speed", label: "Speed & security hardening", sub: "Caching, updates & lockdown", price: 450, days: 2 },
    { key: "blog", label: "Blog / content setup", sub: "Templates + first posts styled", price: 350, days: 1 },
    { key: "products", label: "WooCommerce store", sub: "Products, cart & checkout", price: 700, days: 3 },
  ],
  carePrice: 95,
  defaultState: { type: "redesign", pages: 6, addons: ["sections", "speed"] },
  included: [
    { title: "Mobile-first & responsive", sub: "Looks right on every device." },
    { title: "On-page SEO basics", sub: "Titles, meta, structure, sitemap." },
    { title: "Clean, secure build", sub: "No bloat, no sketchy plugins." },
    { title: "Editor training + handoff", sub: "Run WordPress with confidence." },
    { title: "Clean handoff", sub: "You own everything, fully." },
    { title: "14 days post-launch support", sub: "I fix anything that comes up." },
  ],
  faqs: [
    {
      q: "Will you use a page builder?",
      a: "Only if you want one. I build clean with native blocks (Gutenberg / ACF) so the site stays fast and easy to maintain, no Elementor bloat unless you ask.",
    },
    {
      q: "Can my team edit it without code?",
      a: "Yes. I set up clean, labeled blocks so your team can update pages and posts safely, no developer needed.",
    },
    {
      q: "Can you migrate my current site?",
      a: "Yes, from Wix, Squarespace, Shopify and others, with redirects so you keep your rankings. Add it in the calculator.",
    },
    {
      q: "How long does it take?",
      a: "A refresh is often days; a full build runs two to three weeks. The calculator gives you a realistic timeline as you go.",
    },
    {
      q: "Can you rescue a broken site?",
      a: "Yes, slow, hacked, or broken, I’ll diagnose it and either repair or rebuild. I’ll tell you honestly which is the better value.",
    },
    {
      q: "Do you offer ongoing care?",
      a: "Yes, updates, backups, and security on a simple monthly plan. No long contracts; cancel anytime.",
    },
  ],
  testimonial: {
    eyebrow: "WORDPRESS CLIENT",
    quote:
      "Our old WordPress site kept breaking. Derrick rebuilt it, locked it down, and now it just runs, and I can finally edit pages myself.",
    name: "Tom Becker",
    role: "Owner, Northside Roofing",
  },
  cta: {
    line1: "Got your number?",
    line2: "Let’s make it real.",
    body: "Book a 15-minute call. I’ll confirm the scope, lock the price in writing, and give you a start date.",
  },
};

const squarespace: ServiceData = {
  slug: "squarespace",
  name: "Squarespace",
  hero: {
    eyebrow: "Expert Squarespace development",
    h1a: "Squarespace sites,",
    h1b: "sharp and fast.",
    h1Size: "text-[clamp(34px,4.7vw,62px)]",
    h1Leading: "leading-[.98]",
    leadGap: "mt-7",
    lead: "Clean, professional sites set up quickly, styled past the template and tuned for search. One developer, with a clear price up front.",
    stats: [
      { value: "45+", label: "Squarespace sites" },
      { value: "<2s", label: "avg. load time" },
      { value: "4–14d", label: "typical turnaround" },
    ],
    mock: {
      caption: "IMAGE · site mockup",
      featuredLabel: "FEATURED SITE",
      featuredName: "Maple & Vine",
      featuredMeta: "Squarespace refresh · +30% reservations",
    },
  },
  capabilities: [
    {
      title: "New sites",
      body: "Polished, professional sites set up quickly and built to convert, fully yours.",
    },
    {
      title: "Redesigns & refreshes",
      body: "A sharper look on your current site, often without a full rebuild.",
    },
    {
      title: "Custom styling",
      body: "CSS and code blocks to push past Squarespace’s default template.",
    },
    {
      title: "Migrations",
      body: "Move from Wix, WordPress, or Shopify, content and redirects kept intact.",
    },
    {
      title: "SEO & performance",
      body: "On-page SEO and image tuning so you’re found and load fast.",
    },
    {
      title: "Ongoing care",
      body: "Updates, fixes, and small improvements on a simple monthly plan. Cancel anytime.",
    },
  ],
  types: [
    { key: "refresh", label: "Refresh", base: 750, perPage: 90, included: 3, days: 4, blurb: "Polish your current site" },
    { key: "redesign", label: "Redesign", base: 1800, perPage: 140, included: 5, days: 8, blurb: "New look, same content" },
    { key: "newbuild", label: "New build", base: 2800, perPage: 190, included: 6, days: 14, blurb: "Design & build from scratch" },
  ],
  addons: [
    { key: "migration", label: "Migrate from another platform", sub: "Wix, WordPress, Shopify…", price: 700, days: 3 },
    { key: "sections", label: "Custom CSS & code blocks", sub: "Push past the template", price: 500, days: 2 },
    { key: "speed", label: "SEO & performance setup", sub: "On-page SEO + image tuning", price: 400, days: 2 },
    { key: "blog", label: "Blog / content setup", sub: "Templates + first posts styled", price: 300, days: 1 },
    { key: "products", label: "Squarespace store setup", sub: "Products, cart & checkout", price: 600, days: 3 },
  ],
  carePrice: 95,
  defaultState: { type: "redesign", pages: 6, addons: ["sections", "speed"] },
  included: [
    { title: "Mobile-first & responsive", sub: "Looks right on every device." },
    { title: "On-page SEO basics", sub: "Titles, meta, structure, sitemap." },
    { title: "Clean, on-brand setup", sub: "Styled past the default template." },
    { title: "Editor training + handoff", sub: "Run Squarespace with confidence." },
    { title: "Clean handoff", sub: "You own everything, fully." },
    { title: "14 days post-launch support", sub: "I fix anything that comes up." },
  ],
  faqs: [
    {
      q: "Why hire someone for Squarespace?",
      a: "Squarespace is easy to start and tricky to make truly yours. I push past the template with custom styling, then hand it back so you can run it.",
    },
    {
      q: "Can my team edit it without code?",
      a: "Absolutely, that’s Squarespace’s strength. I set it up cleanly so your team updates content with no fuss.",
    },
    {
      q: "Can you migrate my current site?",
      a: "Yes, from Wix, WordPress, Shopify and others, with redirects so you keep your rankings. Add it in the calculator.",
    },
    {
      q: "How long does it take?",
      a: "A refresh is often a couple of days; a full build runs one to two weeks. The calculator gives you a realistic timeline as you go.",
    },
    {
      q: "Can you customize beyond the template?",
      a: "Yes, custom CSS and code blocks for layouts, fonts, and details the editor won’t do on its own.",
    },
    {
      q: "Do you offer ongoing care?",
      a: "Yes, on a simple monthly plan, updates and small changes whenever you need them. No long contracts; cancel anytime.",
    },
  ],
  testimonial: {
    eyebrow: "SQUARESPACE CLIENT",
    quote:
      "I needed it to look great without a big project. Derrick restyled our Squarespace site in a few days and it finally looks as good as our food.",
    name: "Gina Marsh",
    role: "Owner, Maple & Vine",
  },
  cta: {
    line1: "Got your number?",
    line2: "Let’s make it real.",
    body: "Book a 15-minute call. I’ll confirm the scope, lock the price in writing, and give you a start date.",
  },
};

export const SERVICE_DATA: Partial<Record<ServiceSlug, ServiceData>> = {
  shopify,
  webflow,
  wordpress,
  squarespace,
};
