import Link from "next/link";

import { MediaPlaceholder } from "@/components/site/media-placeholder";
import { SectionLabel } from "@/components/site/section-label";
import { TwoToneHeading } from "@/components/site/two-tone-heading";

const FILTERS = ["All", "Roofing", "Restaurant", "Salon", "E-commerce"];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-[5px] text-[10px] font-bold tracking-[.16em] text-[#9A9C8C]">
      {children}
    </div>
  );
}

export function HomeWork() {
  return (
    <section className="mx-auto max-w-[1240px] px-8 pt-20 pb-[84px]">
      <div className="mb-[30px] flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel>WORK</SectionLabel>
          <TwoToneHeading
            as="h2"
            size="text-[clamp(28px,3.8vw,50px)]"
            lines={["Recent work", "worth a look."]}
            className="mt-4 leading-none tracking-[-0.025em]"
          />
        </div>
        {/* Decorative on the homepage; real filtering lives on /work */}
        <div className="flex max-w-[430px] flex-wrap justify-end gap-2">
          {FILTERS.map((f, i) => (
            <Link
              key={f}
              href="/work"
              className={
                i === 0
                  ? "rounded-full border-[1.5px] border-primary bg-primary px-[15px] py-2 text-[13px] font-semibold text-primary-foreground"
                  : "rounded-full border-[1.5px] border-border-strong px-[15px] py-2 text-[13px] font-medium text-[#5C6052]"
              }
            >
              {f}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-[18px] sm:grid-cols-[minmax(0,1fr)_150px]">
        <MediaPlaceholder tone="sage-work" className="min-h-[440px] rounded-[20px]">
          {/* TODO(content): real project image + data */}
          <div className="absolute left-[18px] top-[18px] rounded-[10px] bg-[rgba(20,24,16,.5)] px-[13px] py-2 text-[11px] font-semibold tracking-[.1em] text-[#EDEEE3] backdrop-blur-[3px]">
            PROJECT IMAGE · Serene Retreat
          </div>
          <div className="absolute inset-x-[18px] bottom-[18px] flex flex-wrap items-end justify-between gap-[18px]">
            <div className="flex flex-wrap gap-[46px] rounded-[14px] bg-[rgba(241,239,232,.94)] px-[22px] py-4 text-foreground">
              <div>
                <FieldLabel>NAME</FieldLabel>
                <div className="text-[15px] font-bold">Northside Roofing</div>
              </div>
              <div>
                <FieldLabel>PLATFORM</FieldLabel>
                <div className="text-[15px] font-bold">WordPress</div>
              </div>
              <div className="max-w-[230px]">
                <FieldLabel>RESULT</FieldLabel>
                <div className="text-[13px] leading-[1.4] text-[#4A4E40]">
                  A faster, clearer site that booked 38% more estimate calls.
                </div>
              </div>
            </div>
          </div>
        </MediaPlaceholder>

        <Link
          href="/work"
          className="flex flex-col items-center justify-center gap-3.5 rounded-[20px] border-[1.5px] border-[#DAD6C9] bg-card-2 py-10 text-nav-fg transition-colors hover:border-primary"
        >
          <span className="flex size-[60px] items-center justify-center rounded-full border-[1.5px] border-primary text-[18px]">
            →
          </span>
          <span className="text-[13px] font-bold tracking-[.14em]">NEXT</span>
        </Link>
      </div>

      <div className="mt-[26px] flex justify-center">
        <Link
          href="/work"
          className="rounded-full border-[1.5px] border-primary px-7 py-3.5 text-[15px] font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          View all work
        </Link>
      </div>
    </section>
  );
}
