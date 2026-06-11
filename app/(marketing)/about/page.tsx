import type { Metadata } from "next";
import Link from "next/link";

import { CtaBanner } from "@/components/site/cta-banner";
import { MediaPlaceholder } from "@/components/site/media-placeholder";
import { SectionLabel } from "@/components/site/section-label";
import { TwoToneHeading } from "@/components/site/two-tone-heading";

export const metadata: Metadata = {
  title: "About | Derrick Valentine",
  description:
    "The developer behind the work, no agency, no account managers, no middlemen. One person who builds good websites and answers the phone when you call.",
};

const PRINCIPLES = [
  {
    n: "01",
    title: "Answer the phone",
    body: "You reach me, not a ticket queue. Questions get a real answer, same day.",
  },
  {
    n: "02",
    title: "Quote it honestly",
    body: "Real numbers up front. The price we agree on is the price you pay.",
  },
  {
    n: "03",
    title: "Build it to last",
    body: "Clean, fast, secure work, no bloat that breaks six months later.",
  },
  {
    n: "04",
    title: "Hand it back",
    body: "You own everything. I set you up to run it, and I’m here if you’d rather not.",
  },
];

// TODO(content): real logos for these channels.
const CHANNELS = [
  {
    badge: "DD",
    badgeSize: "text-[16px]",
    title: "Digital Dog",
    body: "My studio brand, where most of this work lives and where a lot of clients first find me.",
  },
  {
    badge: "SR",
    badgeSize: "text-[16px]",
    title: "SitesForRoofers",
    body: "My niche project for roofing companies that need to look as good as their work.",
  },
  {
    badge: "Up",
    badgeSize: "text-[14px]",
    title: "Upwork",
    body: "Top-rated, with a public track record and reviews you can read through before we talk.",
  },
  {
    badge: "◎",
    badgeSize: "text-[20px]",
    title: "In person",
    body: "I speak at and vend at local business events. If we’ve shaken hands somewhere, welcome back.",
  },
];

const FACTS = [
  { value: "8+", label: "years building for the web" },
  { value: "120+", label: "sites shipped & cared for" },
  { value: "4", label: "platforms, all supported" },
  { value: "1", label: "person you’ll deal with, me" },
];

export default function AboutPage() {
  return (
    <>
      {/* hero (split) */}
      <section className="mx-auto max-w-[1240px] px-8 pt-[30px] pb-5">
        <div className="grid grid-cols-1 items-center gap-[52px] md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div>
            <SectionLabel>ABOUT</SectionLabel>
            <TwoToneHeading
              as="h1"
              size="text-[clamp(40px,5.8vw,78px)]"
              lines={["Hi, I’m", "Derrick."]}
              className="mt-4 leading-[.95] tracking-[-0.03em]"
            />
            <p className="mt-6 max-w-[480px] text-[17px] font-medium leading-[1.6] text-[#5C6052]">
              I’m the developer behind the work, no agency, no account managers,
              no middlemen. Just one person who builds good websites and answers
              the phone when you call.
            </p>
            <div className="mt-[30px] flex flex-wrap gap-[13px]">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-primary px-[26px] py-3.5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-ink"
              >
                Book a call <span className="text-[16px]">→</span>
              </Link>
              <Link
                href="/work"
                className="whitespace-nowrap rounded-full border-[1.5px] border-primary px-6 py-3.5 text-[15px] font-semibold text-foreground transition-colors hover:bg-muted"
              >
                See my work
              </Link>
            </div>
          </div>
          <MediaPlaceholder
            tone="sage"
            label="PHOTO · Derrick Valentine"
            className="aspect-[4/5] min-h-[400px] rounded-[22px]"
          />
        </div>
      </section>

      {/* story */}
      <section className="mx-auto max-w-[1240px] px-8 pt-16 pb-5">
        <div className="grid grid-cols-1 items-start gap-[52px] md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <div>
            <SectionLabel>THE STORY</SectionLabel>
            <TwoToneHeading
              as="h2"
              size="text-[clamp(28px,3.6vw,46px)]"
              lines={["How I got", "here."]}
              className="mt-4 leading-none tracking-[-0.025em]"
            />
          </div>
          <div>
            <p className="mb-5 text-[17px] font-medium leading-[1.65] text-[#3A3E33]">
              I started building websites because I kept seeing good businesses
              stuck with bad ones, slow, dated, or held hostage by an agency that
              stopped answering emails.
            </p>
            <p className="mb-5 text-[16px] leading-[1.65] text-[#5C6052]">
              So I went solo. No account managers, no markups, no mystery
              timeline, just me, the work, and a phone that actually gets
              answered. If you hire me, you work with me, start to finish.
            </p>
            <p className="mb-7 text-[16px] leading-[1.65] text-[#5C6052]">
              Today I build, rebuild, and look after sites on every major
              platform, for roofers, restaurants, salons, shops, clinics, and
              everyone in between. Different industries, same promise: do it
              right, price it honestly, and stick around after launch.
            </p>
            <div className="border-l-[3px] border-primary py-1.5 pl-[22px]">
              <p className="text-[clamp(20px,2.4vw,28px)] font-bold leading-[1.35] tracking-[-.015em] text-band-foreground">
                “If you can’t reach the person who built your site, what good is
                the site?”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* principles (dark band) */}
      <section className="mt-16 bg-primary text-[#E9EAE0]">
        <div className="mx-auto max-w-[1240px] px-8 pt-[72px] pb-20">
          <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-[clamp(28px,4vw,52px)] font-extrabold uppercase leading-none tracking-[-0.025em] text-[#F3F2EA]">
              What I stand by
            </h2>
            <SectionLabel tone="dark">PRINCIPLES</SectionLabel>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p) => (
              <div key={p.n}>
                <div className="mb-3.5 text-[34px] font-extrabold tracking-[-.02em] text-[#7E8C62]">
                  {p.n}
                </div>
                <h3 className="mb-[9px] text-[18px] font-bold text-[#F1EFE8]">{p.title}</h3>
                <p className="text-[14px] leading-[1.55] text-[#BFC4B2]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* where you know me */}
      <section className="mx-auto max-w-[1240px] px-8 pt-[72px] pb-5">
        <div className="mb-3.5">
          <SectionLabel>FIND ME</SectionLabel>
        </div>
        <TwoToneHeading
          as="h2"
          size="text-[clamp(26px,3.6vw,46px)]"
          lines={["Where you might", "already know me from"]}
          className="mb-[34px] max-w-[680px] leading-none tracking-[-0.025em]"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CHANNELS.map((c) => (
            <div
              key={c.title}
              className="flex items-start gap-[18px] rounded-[16px] border-[1.5px] border-border bg-card p-6"
            >
              <div
                className={`flex size-[46px] flex-none items-center justify-center rounded-[12px] bg-primary font-extrabold text-primary-foreground ${c.badgeSize}`}
              >
                {c.badge}
              </div>
              <div>
                <h3 className="mb-1.5 text-[18px] font-bold">{c.title}</h3>
                <p className="text-[14.5px] leading-[1.55] text-[#6E7263]">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* quick facts */}
      <section className="mx-auto max-w-[1240px] px-8 pt-[54px] pb-5">
        <div className="grid grid-cols-2 gap-[18px] border-y-[1.5px] border-[#DAD6C9] py-8 lg:grid-cols-4">
          {FACTS.map((f) => (
            <div key={f.label}>
              <div className="text-[clamp(30px,3.6vw,42px)] font-extrabold tracking-[-.03em] text-primary">
                {f.value}
              </div>
              <div className="mt-[5px] text-[13.5px] text-[#6E7263]">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner
        className="pt-[54px]"
        dense
        headingSize="text-[clamp(30px,4.6vw,58px)]"
        line1="Let’s actually"
        line2="talk."
        body="No sales pitch, just 15 minutes to hear what you need and tell you, straight, whether I can help and what it’d cost."
        primary={{ label: "Book a call", href: "/book" }}
        secondary={{ label: "or see services & pricing", href: "/services" }}
      />
    </>
  );
}
