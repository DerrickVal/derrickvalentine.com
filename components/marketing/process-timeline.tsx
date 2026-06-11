import { SectionLabel } from "@/components/site/section-label";
import { TwoToneHeading } from "@/components/site/two-tone-heading";
import { cn } from "@/lib/utils";

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
  dense = false,
}: {
  headingLines: [string, string];
  steps: ProcessStep[];
  /** The /services band is slightly smaller than the homepage one. */
  dense?: boolean;
}) {
  return (
    <section className="bg-primary text-[#E9EAE0]">
      <div
        className={cn(
          "mx-auto max-w-[1240px] px-8",
          dense ? "pt-[74px] pb-[84px]" : "pt-[78px] pb-[88px]",
        )}
      >
        <div
          className={cn(
            "flex flex-wrap items-end justify-between gap-6",
            dense ? "mb-[50px]" : "mb-[54px]",
          )}
        >
          <TwoToneHeading
            as="h2"
            size={dense ? "text-[clamp(28px,4vw,52px)]" : "text-[clamp(30px,4.3vw,56px)]"}
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
              <div
                key={s.n}
                className={cn("relative flex flex-col", dense ? "md:h-[240px]" : "md:h-[248px]")}
              >
                <div className="absolute left-0 top-[calc(50%-8px)] hidden size-4 rounded-full border-[3px] border-primary bg-sage-pale md:block" />
                <div
                  className={
                    s.above ? "md:mb-auto md:pr-[18px]" : "md:mt-auto md:pr-[18px]"
                  }
                >
                  <div className="mb-[9px] text-[15px] font-extrabold tracking-[.02em] text-sage-pale">
                    {s.n} &nbsp;|&nbsp; {s.title}
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
