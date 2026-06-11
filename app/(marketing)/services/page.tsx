import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import {
  ProcessTimeline,
  type ProcessStep,
} from "@/components/marketing/process-timeline";
import { CtaBanner } from "@/components/site/cta-banner";
import { SectionLabel } from "@/components/site/section-label";
import { TwoToneHeading } from "@/components/site/two-tone-heading";
import { SERVICES, servicePath, usd } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services | Derrick Valentine",
  description:
    "Shopify, Webflow, WordPress, Squarespace. I build, rebuild, and look after sites on all of them, with a clear price and a real timeline up front.",
};

const STRIP_HATCH =
  "repeating-linear-gradient(135deg,rgba(255,255,255,.06) 0,rgba(255,255,255,.06) 2px,transparent 2px,transparent 16px)";

const ALWAYS = [
  { title: "Clear, fixed pricing", body: "A real number before we start." },
  { title: "Mobile-first & responsive", body: "Looks right on every device." },
  { title: "On-page SEO basics", body: "Titles, meta, structure, sitemap." },
  { title: "Training + walkthrough", body: "Run your own site with confidence." },
  { title: "Clean handoff", body: "You own everything, fully." },
  { title: "14 days of support", body: "I fix anything that comes up." },
];

const STEPS: ProcessStep[] = [
  {
    n: "01",
    title: "Quick call",
    body: "15 minutes. Your platform, your goals, and a real number, no pressure.",
    above: false,
  },
  {
    n: "02",
    title: "Plan & price",
    body: "I scope it, price it, and set a timeline, fixed, in writing, before work starts.",
    above: true,
  },
  {
    n: "03",
    title: "Build",
    body: "You watch it come together, and upload your content, in your client portal.",
    above: false,
  },
  {
    n: "04",
    title: "Launch & care",
    body: "We go live, then I keep it fast, secure, and up to date. You focus on the business.",
    above: true,
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* hero (split) */}
      <section className="mx-auto max-w-[1240px] px-8 pt-[34px] pb-[18px]">
        <SectionLabel>SERVICES</SectionLabel>
        <div className="mt-[18px] grid grid-cols-1 items-end gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <TwoToneHeading
            as="h1"
            size="text-[clamp(38px,5.6vw,76px)]"
            lines={["Web work, on the", "platform you’re on."]}
            className="leading-[.95] tracking-[-0.03em]"
          />
          <div>
            <p className="mb-[22px] text-[16.5px] font-medium leading-[1.6] text-[#5C6052]">
              Shopify, Webflow, WordPress, Squarespace. I build, rebuild, and look
              after sites on all of them. Every service has a clear price and a real
              timeline, up front.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-primary px-[26px] py-3.5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-ink"
              >
                Book a call <span className="text-[16px]">→</span>
              </Link>
              <Link
                href="#platforms"
                className="whitespace-nowrap rounded-full border-[1.5px] border-primary px-6 py-3.5 text-[15px] font-semibold text-foreground transition-colors hover:bg-muted"
              >
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* platform grid */}
      <section id="platforms" className="mx-auto max-w-[1240px] px-8 pt-[44px] pb-5">
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={servicePath(s.slug)}
              className="flex flex-col overflow-hidden rounded-[20px] border-[1.5px] border-[#E2DFD4] bg-card transition-colors hover:border-primary"
            >
              <div
                className="relative flex h-[128px] items-end overflow-hidden p-5"
                style={{ background: s.hubGradient }}
              >
                <div className="absolute inset-0" style={{ backgroundImage: STRIP_HATCH }} />
                <h3
                  className={`relative font-extrabold uppercase leading-[.9] tracking-[-.03em] text-[#F3F2EA] ${s.hubTitleSize}`}
                >
                  {s.name}
                </h3>
                <span className="absolute right-4 top-4 flex size-[38px] items-center justify-center rounded-full bg-background text-[17px] text-foreground">
                  ↗
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3.5 p-[22px]">
                <p className="text-[14.5px] leading-[1.55] text-[#5C6052]">{s.hubBlurb}</p>
                <div className="flex flex-wrap gap-[7px]">
                  {s.hubChips.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-[#D6D2C5] px-[11px] py-[5px] text-[11.5px] font-semibold text-status-paid-fg"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-[#EAE7DC] pt-2.5">
                  <span className="whitespace-nowrap text-[17px] font-extrabold tracking-[-.02em] text-primary">
                    from {usd(s.startingPrice)}
                  </span>
                  <span className="whitespace-nowrap text-[13.5px] font-semibold text-nav-fg">
                    View {s.name} →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-[18px] text-center text-[13.5px] text-subtle-foreground">
          Each page has a live calculator, get a real estimate in seconds, no email
          required.
        </p>
      </section>

      {/* what you always get */}
      <section className="mx-auto max-w-[1240px] px-8 pt-[60px] pb-[74px]">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <SectionLabel>EVERY PROJECT</SectionLabel>
            <h2 className="mt-4 mb-3.5 text-[clamp(26px,3.4vw,44px)] font-extrabold uppercase leading-[1.02] tracking-[-0.025em]">
              What you always get
            </h2>
            <p className="max-w-[340px] text-[15px] leading-[1.6] text-[#5C6052]">
              Whatever the platform, the fundamentals are baked in, no upsells on the
              things a good site needs.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {ALWAYS.map((a) => (
              <div
                key={a.title}
                className="flex gap-[13px] rounded-[14px] border-[1.5px] border-border bg-card p-[18px]"
              >
                <span className="flex size-6 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3.5" />
                </span>
                <div>
                  <div className="text-[14.5px] font-bold">{a.title}</div>
                  <div className="mt-[3px] text-[13px] text-[#6E7263]">{a.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessTimeline
        dense
        headingLines={["Same simple steps,", "whatever the platform"]}
        steps={STEPS}
      />

      <CtaBanner
        className="pt-16"
        dense
        headingSize="text-[clamp(30px,4.6vw,58px)]"
        line1="Not sure which"
        line2="platform fits?"
        body="That’s a 15-minute conversation. Tell me your business and your goals, I’ll recommend the right platform and a price, no strings."
        primary={{ label: "Book a call", href: "/book" }}
        secondary={{ label: "or send a message", href: "/contact" }}
      />
    </>
  );
}
