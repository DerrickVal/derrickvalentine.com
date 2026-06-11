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
    lead: string;
    stats: { value: string; label: string }[];
    mock: { caption: string; featuredName: string; featuredMeta: string };
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

export const SERVICE_DATA: Partial<Record<ServiceSlug, ServiceData>> = {
  shopify,
};
