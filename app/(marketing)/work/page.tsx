import type { Metadata } from "next";

import { WorkGallery } from "@/components/marketing/work/work-gallery";
import { CtaBanner } from "@/components/site/cta-banner";
import { SectionLabel } from "@/components/site/section-label";
import { TwoToneHeading } from "@/components/site/two-tone-heading";

export const metadata: Metadata = {
  title: "Work | Derrick Valentine",
  description:
    "Real sites for real businesses, across every platform I work on. Filter by industry or style to find something close to yours.",
};

export default function WorkPage() {
  return (
    <>
      {/* hero (split) */}
      <section className="mx-auto max-w-[1240px] px-8 pt-[34px] pb-2.5">
        <SectionLabel>WORK</SectionLabel>
        <div className="mt-[18px] grid grid-cols-1 items-end gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <TwoToneHeading
            as="h1"
            size="text-[clamp(38px,5.6vw,76px)]"
            lines={["Recent work", "worth a look."]}
            className="leading-[.95] tracking-[-0.03em]"
          />
          <p className="text-[16.5px] font-medium leading-[1.6] text-[#5C6052]">
            Real sites for real businesses, across every platform I work on.
            Filter by industry or style to find something close to yours.
          </p>
        </div>
      </section>

      <WorkGallery />

      <CtaBanner
        className="pt-6"
        dense
        headingSize="text-[clamp(30px,4.6vw,58px)]"
        line1="Want one"
        line2="like these?"
        body="Tell me your business and your platform on a quick call, you’ll leave with a real number and a timeline."
        primary={{ label: "Book a call", href: "/book" }}
        secondary={{ label: "or see services & pricing", href: "/services" }}
      />
    </>
  );
}
