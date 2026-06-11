import { SectionLabel } from "@/components/site/section-label";
import { TwoToneHeading } from "@/components/site/two-tone-heading";

export interface ProcessStep {
  n: string;
  title: string;
  body: string;
  /** True = sits above the center line, false = below (desktop stagger). */
  above: boolean;
}

/**
 * The recurring dark-green process band with the staggered 4-step timeline.
 * Shared by the homepage and the /services hub (each passes its own heading +
 * step copy). On mobile the center line + stagger drop to a vertical stack.
 */
export function ProcessTimeline({
  headingLines,
  steps,
}: {
  headingLines: [string, string];
  steps: ProcessStep[];
}) {
  return (
    <section className="bg-primary text-[#E9EAE0]">
      <div className="mx-auto max-w-[1240px] px-8 pt-[78px] pb-[88px]">
        <div className="mb-[54px] flex flex-wrap items-end justify-between gap-6">
          <TwoToneHeading
            as="h2"
            size="text-[clamp(28px,4.3vw,56px)]"
            tone="band"
            lines={headingLines}
            className="leading-none tracking-[-0.025em]"
          />
          <SectionLabel tone="dark">HOW IT WORKS</SectionLabel>
        </div>

        <div className="relative">
          <div className="absolute inset-x-0 top-1/2 hidden h-[1.5px] bg-[rgba(233,234,224,.22)] md:block" />
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
            {steps.map((s) => (
              <div key={s.n} className="relative flex flex-col md:h-[248px]">
                <div className="absolute left-0 top-[calc(50%-8px)] hidden size-4 rounded-full border-[3px] border-primary bg-sage-pale md:block" />
                <div
                  className={
                    s.above ? "md:mb-auto md:pr-[18px]" : "md:mt-auto md:pr-[18px]"
                  }
                >
                  <div className="mb-[9px] text-[15px] font-extrabold tracking-[.02em] text-sage-pale">
                    {s.n}&nbsp;&nbsp;|&nbsp;&nbsp;{s.title}
                  </div>
                  <p className="text-[14px] leading-[1.55] text-[#C2C6B5]">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
