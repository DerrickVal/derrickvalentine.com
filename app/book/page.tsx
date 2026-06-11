import type { Metadata } from "next";

import { Scheduler } from "@/components/marketing/book/scheduler";
import { SectionLabel } from "@/components/site/section-label";

export const metadata: Metadata = {
  title: "Book a Call | Derrick Valentine",
  description:
    "Pick a slot that works for you. 15 minutes, no pitch, just your goals and a straight answer on cost.",
};

export default function BookPage() {
  return (
    <>
      {/* hero (centered) */}
      <section className="mx-auto max-w-[1240px] px-8 pt-[30px] pb-2 text-center">
        <SectionLabel>BOOK A CALL</SectionLabel>
        <h1 className="mt-4 text-[clamp(36px,5vw,64px)] font-extrabold uppercase leading-[.96] tracking-[-0.03em]">
          Let’s find <span className="text-accent">a time.</span>
        </h1>
        <p className="mx-auto mt-[18px] max-w-[520px] text-[16.5px] font-medium leading-[1.6] text-[#5C6052]">
          Pick a slot that works for you. 15 minutes, no pitch, just your goals
          and a straight answer on cost.
        </p>
      </section>

      {/* scheduler */}
      <section className="mx-auto max-w-[1080px] px-8 pb-12 pt-9">
        <Scheduler />
      </section>
    </>
  );
}
