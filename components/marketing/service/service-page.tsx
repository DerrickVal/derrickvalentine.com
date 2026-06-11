import { Fragment } from "react";
import Link from "next/link";
import { Circle, Diamond, Gauge, Sparkles, Square, Triangle } from "lucide-react";

import { CtaBanner } from "@/components/site/cta-banner";
import { MediaPlaceholder } from "@/components/site/media-placeholder";
import { SectionLabel } from "@/components/site/section-label";
import { TwoToneHeading } from "@/components/site/two-tone-heading";
import { cn } from "@/lib/utils";
import type { ServiceData } from "@/lib/service-data";
import { ServiceCalculator } from "./service-calculator";

const CAP_ICONS = [Square, Circle, Triangle, Diamond, Gauge, Sparkles];

export function ServicePage({ service }: { service: ServiceData }) {
  return (
    <>
      {/* hero */}
      <section className="mx-auto max-w-[1240px] px-8 pt-[18px] pb-[30px]">
        <div className="mb-[26px] flex items-center gap-2.5 text-[13px] text-[#7C8071]">
          <Link href="/services" className="transition-colors hover:text-foreground">
            Services
          </Link>
          <span>/</span>
          <span className="font-semibold text-primary">{service.name}</span>
        </div>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div>
            <div className="mb-6 inline-flex items-center gap-[9px] rounded-full border border-[#CBD2B8] bg-[#E5E8DA] px-[15px] py-2">
              <span className="size-2 rounded-full bg-[#5E7245]" />
              <span className="text-[13px] font-semibold text-[#3F4A2C]">
                {service.hero.eyebrow}
              </span>
            </div>
            <TwoToneHeading
              as="h1"
              size={service.hero.h1Size ?? "text-[clamp(38px,5.4vw,72px)]"}
              lines={[service.hero.h1a, service.hero.h1b]}
              className={cn(service.hero.h1Leading ?? "leading-[.95]", "tracking-[-0.03em]")}
            />
            <p
              className={cn(
                service.hero.leadGap ?? "mt-[22px]",
                "max-w-[480px] text-[17px] font-medium leading-[1.55] text-[#5C6052]",
              )}
            >
              {service.hero.lead}
            </p>
            <div className="mt-[30px] flex flex-wrap gap-[13px]">
              <Link
                href="#calculator"
                className="inline-flex items-center gap-[9px] whitespace-nowrap rounded-full bg-primary px-[30px] py-4 text-[15.5px] font-semibold text-primary-foreground transition-colors hover:bg-ink"
              >
                Get my estimate <span className="text-[17px]">↓</span>
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center whitespace-nowrap rounded-full border-[1.5px] border-primary px-7 py-4 text-[15.5px] font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Book a call
              </Link>
            </div>
            <div className="mt-9 flex items-stretch gap-[34px]">
              {service.hero.stats.map((s, i) => (
                <Fragment key={s.label}>
                  {i > 0 ? <div className="w-px self-stretch bg-[#D7D2C4]" /> : null}
                  <div>
                    <div className="text-[24px] font-extrabold tracking-[-.02em]">
                      {s.value}
                    </div>
                    <div className="mt-[3px] text-[12.5px] text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>

          <MediaPlaceholder
            tone="forest"
            className="aspect-[4/5] min-h-[380px] rounded-[20px]"
          >
            <div className="absolute left-[18px] top-[18px] flex items-center gap-[9px] rounded-full border border-white/16 bg-[rgba(20,24,16,.42)] px-[13px] py-[7px]">
              <span className="size-[7px] animate-[rec-pulse_1.8s_ease-in-out_infinite] rounded-full bg-[#E4684A]" />
              <span className="text-[11px] font-semibold tracking-[.12em] text-[#E9EAE0]">
                {service.hero.mock.caption}
              </span>
            </div>
            <div className="absolute inset-x-[18px] bottom-[18px] rounded-[14px] bg-[rgba(241,239,232,.95)] px-[18px] py-[15px] text-foreground">
              <div className="mb-[9px] flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[.16em] text-[#9A9C8C]">
                  {service.hero.mock.featuredLabel ?? "FEATURED STORE"}
                </span>
                <span className="flex size-6 items-center justify-center rounded-full bg-primary text-[12px] text-primary-foreground">
                  ↗
                </span>
              </div>
              <div className="text-[15px] font-bold">{service.hero.mock.featuredName}</div>
              <div className="mt-0.5 text-[12.5px] text-muted-foreground">
                {service.hero.mock.featuredMeta}
              </div>
            </div>
          </MediaPlaceholder>
        </div>
      </section>

      {/* capabilities */}
      <section className="mx-auto max-w-[1240px] px-8 pt-16 pb-5">
        <div className="mb-[34px] flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(26px,3.4vw,44px)] font-extrabold uppercase leading-none tracking-[-0.025em]">
            What I do on {service.name}
          </h2>
          <SectionLabel>CAPABILITIES</SectionLabel>
        </div>
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {service.capabilities.map((c, i) => {
            const Icon = CAP_ICONS[i % CAP_ICONS.length];
            return (
              <div
                key={c.title}
                className="rounded-[16px] border-[1.5px] border-border bg-card p-6"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-[11px] bg-muted">
                  <Icon className="size-4 text-primary" strokeWidth={2} />
                </div>
                <h3 className="mb-2 text-[18px] font-bold tracking-[-0.01em]">{c.title}</h3>
                <p className="text-[14px] leading-[1.55] text-[#6E7263]">{c.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* calculator */}
      <section id="calculator" className="mt-[54px] scroll-mt-4 bg-primary text-[#E9EAE0]">
        <div className="mx-auto max-w-[1240px] px-8 pt-[74px] pb-[84px]">
          <div className="mb-3.5 flex flex-wrap items-end justify-between gap-6">
            <SectionLabel tone="dark">PRICING</SectionLabel>
            <span className="text-[13px] text-[#AEB79C]">
              Live estimate · no email required
            </span>
          </div>
          <h2 className="mb-2 text-[clamp(28px,4vw,52px)] font-extrabold uppercase leading-none tracking-[-0.025em] text-[#E9EAE0]">
            Build your estimate
          </h2>
          <p className="mb-10 max-w-[520px] text-[16px] leading-[1.55] text-[#C2C6B5]">
            Move the controls and watch the number update. This gets you within
            range in seconds, we confirm the exact figure on a quick call.
          </p>
          <ServiceCalculator service={service} />
        </div>
      </section>

      {/* what's included */}
      <section className="mx-auto max-w-[1240px] px-8 pt-[74px] pb-5">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <SectionLabel>EVERY PROJECT</SectionLabel>
            <h2 className="mt-4 mb-3.5 text-[clamp(26px,3.4vw,44px)] font-extrabold uppercase leading-[1.02] tracking-[-0.025em]">
              What’s always included
            </h2>
            <p className="max-w-[340px] text-[15px] leading-[1.6] text-[#5C6052]">
              No upsells on the basics. Every {service.name} project ships with the
              things a good site needs, baked into the price above.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {service.included.map((it) => (
              <div
                key={it.title}
                className="flex gap-[13px] rounded-[14px] border-[1.5px] border-border bg-card p-[18px]"
              >
                <span className="flex size-6 flex-none items-center justify-center rounded-full bg-primary text-[13px] text-primary-foreground">
                  ✓
                </span>
                <div>
                  <div className="text-[14.5px] font-bold">{it.title}</div>
                  <div className="mt-[3px] text-[13px] text-[#6E7263]">{it.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1240px] px-8 pt-16 pb-5">
        <div className="mb-[30px] flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(26px,3.4vw,44px)] font-extrabold uppercase leading-none tracking-[-0.025em]">
            Questions, answered
          </h2>
          <SectionLabel>FAQ</SectionLabel>
        </div>
        <div className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
          {service.faqs.map((f) => (
            <div key={f.q} className="border-t-[1.5px] border-[#DAD6C9] pt-[18px]">
              <h3 className="mb-2 text-[16.5px] font-bold">{f.q}</h3>
              <p className="text-[14px] leading-[1.6] text-[#6E7263]">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* testimonial */}
      <section className="mt-16 bg-band">
        <div className="mx-auto max-w-[980px] px-8 py-[66px] text-center">
          <SectionLabel className="text-[#7D8A6E]">
            {service.testimonial.eyebrow}
          </SectionLabel>
          {/* TODO(content): real testimonial (sage-highlight phrases not reproduced) */}
          <p className="mt-6 mb-7 text-[clamp(21px,2.7vw,32px)] font-semibold leading-[1.34] tracking-[-0.015em] text-band-foreground">
            “{service.testimonial.quote}”
          </p>
          <div className="text-[14px] font-bold text-band-foreground">
            {service.testimonial.name}
          </div>
          <div className="mt-0.5 text-[12.5px] text-[#69735C]">
            {service.testimonial.role}
          </div>
        </div>
      </section>

      <CtaBanner
        className="pt-16"
        dense
        bodyMaxWidth="max-w-[440px]"
        headingSize="text-[clamp(30px,4.6vw,58px)]"
        line1={service.cta.line1}
        line2={service.cta.line2}
        body={service.cta.body}
        primary={{ label: "Book a call", href: "/book" }}
        secondary={{ label: "or send a message", href: "/contact" }}
      />
    </>
  );
}
