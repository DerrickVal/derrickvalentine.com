import Link from "next/link";

import { SectionLabel } from "@/components/site/section-label";
import { TwoToneHeading } from "@/components/site/two-tone-heading";

const CARD_HATCH_LIGHT =
  "repeating-linear-gradient(135deg,rgba(255,255,255,.18) 0,rgba(255,255,255,.18) 2px,transparent 2px,transparent 15px)";
const CARD_HATCH_DARK =
  "repeating-linear-gradient(135deg,rgba(255,255,255,.06) 0,rgba(255,255,255,.06) 2px,transparent 2px,transparent 16px)";

const LIGHT = [
  {
    slug: "webflow",
    name: "Webflow",
    titleSize: "text-[25px]",
    bg: "linear-gradient(165deg,#dfe1d2,#c4c9b1)",
    blurb: "Custom, animated sites with a CMS your team can actually run.",
    price: "from $1,800",
  },
  {
    slug: "wordpress",
    name: "WordPress",
    titleSize: "text-[22px]",
    bg: "linear-gradient(165deg,#e4e3d6,#cdcab6)",
    blurb: "Reliable, easy-to-edit sites, rebuilds, rescues, and ongoing care.",
    price: "from $900",
  },
  {
    slug: "squarespace",
    name: "Square­space",
    titleSize: "text-[23px]",
    bg: "linear-gradient(165deg,#dfe1d2,#c4c9b1)",
    blurb: "Clean, polished sites done quickly, perfect for a sharp first impression.",
    price: "from $750",
  },
];

export function HomeServices() {
  return (
    <section className="mx-auto max-w-[1240px] px-8 pt-[78px] pb-[84px]">
      <div className="mb-3.5 flex flex-wrap items-end justify-between gap-6">
        <SectionLabel>SERVICES</SectionLabel>
        <Link
          href="/services"
          className="border-b-[1.5px] border-primary pb-1 text-[14px] font-semibold text-nav-fg"
        >
          See all services →
        </Link>
      </div>
      <TwoToneHeading
        as="h2"
        size="text-[clamp(28px,3.8vw,50px)]"
        lines={["Pick your platform.", "I’ll take it from there."]}
        className="mb-[34px] max-w-[760px] leading-none tracking-[-0.025em]"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        {/* Featured: Shopify */}
        <Link
          href="/services/shopify"
          className="relative flex min-h-[430px] flex-col justify-between overflow-hidden rounded-[20px] p-[22px] text-[#F1EFE8] sm:col-span-2 lg:col-span-1"
          style={{ background: "linear-gradient(165deg,#46532f,#2c3520)" }}
        >
          <div className="absolute inset-0" style={{ backgroundImage: CARD_HATCH_DARK }} />
          <div className="relative flex flex-wrap gap-[7px]">
            {["Stores", "Migrations", "Speed"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/20 bg-[rgba(241,239,232,.16)] px-3 py-1.5 text-[11.5px] font-semibold"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="relative">
            <div className="mb-2.5 flex items-center justify-between">
              <h3 className="text-[40px] font-extrabold uppercase leading-[.9] tracking-[-.03em]">
                Shopify
              </h3>
              <span className="flex size-10 flex-none items-center justify-center rounded-full bg-background text-[18px] text-foreground">
                ↗
              </span>
            </div>
            <p className="mb-3.5 max-w-[330px] text-[14px] leading-[1.5] text-[#D7DAC9]">
              Stores that load fast and actually sell, theme work, custom sections,
              and clean migrations.
            </p>
            <div className="text-[13px] font-semibold tracking-[.04em] text-sage-pale">
              from $1,200
            </div>
          </div>
        </Link>

        {/* Light cards */}
        {LIGHT.map((c) => (
          <Link
            key={c.slug}
            href={`/services/${c.slug}`}
            className="relative flex min-h-[430px] flex-col justify-between overflow-hidden rounded-[20px] p-5 text-foreground"
            style={{ background: c.bg }}
          >
            <div className="absolute inset-0" style={{ backgroundImage: CARD_HATCH_LIGHT }} />
            <span className="relative flex size-9 items-center justify-center self-end rounded-full bg-primary text-[16px] text-primary-foreground">
              ↗
            </span>
            <div className="relative">
              <h3
                className={`mb-2 font-extrabold uppercase leading-[.92] tracking-[-.03em] ${c.titleSize}`}
              >
                {c.name}
              </h3>
              <p className="mb-3 text-[13.5px] leading-[1.5] text-[#54584A]">
                {c.blurb}
              </p>
              <div className="text-[13px] font-bold tracking-[.04em] text-status-paid-fg">
                {c.price}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
