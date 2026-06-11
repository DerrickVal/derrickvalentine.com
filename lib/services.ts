// Source of truth for the four platforms across the header Pricing dropdown, the
// footer, the homepage cards, and the /services hub, so prices/chips never drift.
// The per-platform calculator config (06) layers on in lib/service-calculator.

export type ServiceSlug = "shopify" | "webflow" | "wordpress" | "squarespace";

export interface ServiceSummary {
  slug: ServiceSlug;
  name: string;
  /** Integer USD floor for "from $X" labels. */
  startingPrice: number;
  /** The 128px media strip gradient on the /services hub card. */
  hubGradient: string;
  hubChips: string[];
  hubBlurb: string;
  /** Tailwind size class for the hub strip title. */
  hubTitleSize: string;
}

const FOREST = "linear-gradient(160deg,#46532f,#2a3220)";
const SAGE = "linear-gradient(160deg,#586b3c,#3a4a28)";

export const SERVICES: ServiceSummary[] = [
  {
    slug: "shopify",
    name: "Shopify",
    startingPrice: 1200,
    hubGradient: FOREST,
    hubChips: ["Stores", "Migrations", "Speed"],
    hubBlurb:
      "E-commerce that loads fast and sells, stores, theme work, migrations, and custom sections.",
    hubTitleSize: "text-[34px]",
  },
  {
    slug: "webflow",
    name: "Webflow",
    startingPrice: 1800,
    hubGradient: SAGE,
    hubChips: ["Design", "Animation", "CMS"],
    hubBlurb:
      "Custom, animated, CMS-powered sites your team can actually run, designed and built to convert.",
    hubTitleSize: "text-[34px]",
  },
  {
    slug: "wordpress",
    name: "WordPress",
    startingPrice: 900,
    hubGradient: SAGE,
    hubChips: ["Builds", "Rescues", "WooCommerce"],
    hubBlurb:
      "Reliable, easy-to-edit sites, clean builds, rescues of broken ones, and ongoing care.",
    hubTitleSize: "text-[32px]",
  },
  {
    slug: "squarespace",
    name: "Squarespace",
    startingPrice: 750,
    hubGradient: FOREST,
    hubChips: ["Styling", "SEO", "Stores"],
    hubBlurb:
      "Polished, professional sites set up fast, styled past the template and tuned for search.",
    hubTitleSize: "text-[30px]",
  },
];

export const usd = (n: number) =>
  `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export const servicePath = (slug: ServiceSlug) => `/services/${slug}`;
