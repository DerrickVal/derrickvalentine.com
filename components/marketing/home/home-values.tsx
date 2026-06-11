import Link from "next/link";
import { Circle, Diamond, Square, Triangle } from "lucide-react";

import { MediaPlaceholder } from "@/components/site/media-placeholder";
import { SectionLabel } from "@/components/site/section-label";
import { TwoToneHeading } from "@/components/site/two-tone-heading";

const VALUES = [
  {
    Icon: Square,
    title: "Works on your platform",
    body: "Shopify, Webflow, WordPress, Squarespace. I meet you where your site already lives.",
  },
  {
    Icon: Circle,
    title: "Pricing up front",
    body: "Real numbers before we start. No vague “let’s discuss budget” quotes.",
  },
  {
    Icon: Triangle,
    title: "Fast, and on time",
    body: "Most refreshes ship in days. You’ll always know the timeline.",
  },
  {
    Icon: Diamond,
    title: "One person, accountable",
    body: "You talk to me, not a project manager. Every step of the way.",
  },
];

export function HomeValues() {
  return (
    <section className="mx-auto max-w-[1240px] px-8 pt-[72px] pb-20">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
        <SectionLabel>WHY ME</SectionLabel>
        <div className="flex gap-8">
          <Link
            href="/services"
            className="flex items-center gap-2.5 border-b-[1.5px] border-[#DAD6C9] pb-[7px] text-nav-fg"
          >
            <span className="text-[14px] font-semibold">What I do</span>
            <span className="text-[11px] font-semibold text-[#9A9C8C]">01</span>
          </Link>
          <Link
            href="/work"
            className="flex items-center gap-2.5 border-b-[1.5px] border-[#DAD6C9] pb-[7px] text-nav-fg"
          >
            <span className="text-[14px] font-semibold">Recent work</span>
            <span className="text-[11px] font-semibold text-[#9A9C8C]">02</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 items-center gap-[52px] md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
        <MediaPlaceholder
          tone="sage"
          label="PHOTO · Derrick at work"
          className="aspect-[4/5] min-h-[380px] rounded-[20px]"
        />
        <div>
          <TwoToneHeading
            as="h2"
            size="text-[clamp(30px,4vw,52px)]"
            lines={["Not an agency.", "Better than one."]}
            className="mb-[18px] leading-none tracking-[-0.025em]"
          />
          <p className="mb-9 max-w-[440px] text-base font-medium leading-relaxed text-[#5C6052]">
            No account managers, no markups, no mystery timeline. Just one
            developer who picks up the phone and ships good work, on whatever
            platform you’re already on.
          </p>
          <div className="grid grid-cols-1 gap-x-9 gap-y-8 sm:grid-cols-2">
            {VALUES.map(({ Icon, title, body }) => (
              <div key={title}>
                <div className="mb-3.5 flex size-[38px] items-center justify-center rounded-[11px] bg-muted">
                  <Icon className="size-[15px] text-primary" strokeWidth={2} />
                </div>
                <h3 className="mb-[7px] text-[17px] font-bold tracking-[-0.01em]">
                  {title}
                </h3>
                <p className="text-[14px] leading-[1.55] text-[#6E7263]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
