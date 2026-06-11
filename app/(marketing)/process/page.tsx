import type { Metadata } from "next";

import { CtaBanner } from "@/components/site/cta-banner";
import { SectionLabel } from "@/components/site/section-label";
import { TwoToneHeading } from "@/components/site/two-tone-heading";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Process | Derrick Valentine",
  description:
    "No mystery, no black box. Exactly what happens from our first call to launch day, and who does what at each step.",
};

interface Step {
  n: string;
  title: string;
  duration: string;
  body: string;
  you: string;
  me: string;
  final?: boolean;
}

const STEPS: Step[] = [
  {
    n: "01",
    title: "The call",
    duration: "15 minutes",
    body: "We hop on a quick call. You tell me your platform, your goals, and what’s not working. I tell you, honestly, whether I can help and roughly what it’ll cost. No pitch, no pressure.",
    you: "Bring your site and one clear goal.",
    me: "Listen, ask sharp questions, ballpark it.",
  },
  {
    n: "02",
    title: "The plan & quote",
    duration: "1–2 days",
    body: "I write up exactly what I’ll do, what it costs, and when it’ll be done. Fixed scope, fixed price, fixed timeline, in writing. You approve it before a single thing starts.",
    you: "Review the quote and approve.",
    me: "Scope it, price it, schedule it.",
  },
  {
    n: "03",
    title: "Design",
    duration: "2–4 days",
    body: "I design the look and layout around your brand and how you actually sell. You see it early and we adjust together, so there are no surprises at the end.",
    you: "Share brand assets and feedback.",
    me: "Design the layout, revise with you.",
  },
  {
    n: "04",
    title: "Build",
    duration: "3–10 days",
    body: "I build it on your platform. You upload your content, photos, copy, products, right inside your client portal, and watch the project come together as it happens.",
    you: "Upload content in the portal.",
    me: "Build it and keep you posted.",
  },
  {
    n: "05",
    title: "Review & launch",
    duration: "1–2 days",
    body: "You walk through the finished site. We fix anything that’s off, then go live together. I handle the technical bits, domains, redirects, SSL, the lot.",
    you: "Do a final walkthrough.",
    me: "Launch, redirects, and QA.",
  },
  {
    n: "06",
    title: "Care & support",
    duration: "ongoing",
    body: "For 14 days after launch I fix anything that comes up, free. After that, stay on a simple care plan, or just call me when you need me. I don’t disappear.",
    you: "Get back to running your business.",
    me: "Updates, fixes, and a phone that answers.",
    final: true,
  },
];

function PersonColumn({
  side,
  text,
  final,
}: {
  side: "YOU" | "ME";
  text: string;
  final: boolean;
}) {
  return (
    <div
      className={cn(
        "border-t-2 pt-[11px]",
        final
          ? side === "ME"
            ? "border-sage-pale"
            : "border-[#56603f]"
          : side === "ME"
            ? "border-primary"
            : "border-[#DCE3D7]",
      )}
    >
      <div
        className={cn(
          "mb-[5px] text-[11px] font-bold tracking-[.14em]",
          final ? "text-[#9AA683]" : "text-[#9A9C8C]",
        )}
      >
        {side}
      </div>
      <div
        className={cn(
          "text-[13.5px] leading-[1.5]",
          final ? "text-[#DDE1D1]" : "text-[#3A3E33]",
        )}
      >
        {text}
      </div>
    </div>
  );
}

export default function ProcessPage() {
  return (
    <>
      {/* hero (split) */}
      <section className="mx-auto max-w-[1240px] px-8 pt-[30px] pb-5">
        <SectionLabel>PROCESS</SectionLabel>
        <div className="mt-[18px] grid grid-cols-1 items-end gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <TwoToneHeading
            as="h1"
            size="text-[clamp(38px,5.6vw,76px)]"
            lines={["How it works,", "step by step."]}
            className="leading-[.95] tracking-[-0.03em]"
          />
          <div>
            <p className="mb-[18px] text-[16.5px] font-medium leading-[1.6] text-[#5C6052]">
              No mystery, no black box. Here’s exactly what happens from our first
              call to launch day, and who does what at each step.
            </p>
            <div className="inline-flex items-center gap-[9px] rounded-full border border-[#CBD2B8] bg-[#E5E8DA] px-[15px] py-[9px]">
              <span className="size-2 rounded-full bg-[#5E7245]" />
              <span className="text-[13px] font-semibold text-[#3F4A2C]">
                Typical start to finish: 1–3 weeks
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="mx-auto max-w-[980px] px-8 pt-12 pb-5">
        <div className="relative">
          <div className="absolute bottom-[60px] left-[31px] top-[34px] w-0.5 bg-[#DAD6C9]" />
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className={cn(
                "relative grid grid-cols-[64px_minmax(0,1fr)] gap-[26px]",
                i < STEPS.length - 1 && "pb-[26px]",
              )}
            >
              <div className="flex justify-center">
                <div
                  className={cn(
                    "relative z-[1] flex size-[50px] items-center justify-center rounded-full border-4 border-background text-[18px] font-extrabold text-primary-foreground",
                    step.final ? "bg-[#6E7A60]" : "bg-primary",
                  )}
                >
                  {step.n}
                </div>
              </div>
              <div
                className={cn(
                  "rounded-[18px] border-[1.5px] p-6",
                  step.final
                    ? "border-forest-band bg-forest-band text-[#E9EAE0]"
                    : "border-border bg-card",
                )}
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="whitespace-nowrap text-[22px] font-extrabold uppercase tracking-[-.02em]">
                    {step.title}
                  </h2>
                  <span
                    className={cn(
                      "rounded-full px-3 py-[5px] text-[12px] font-bold",
                      step.final
                        ? "bg-[rgba(199,210,172,.18)] text-sage-pale"
                        : "bg-muted text-status-paid-fg",
                    )}
                  >
                    {step.duration}
                  </span>
                </div>
                <p
                  className={cn(
                    "mb-[18px] text-[15.5px] leading-[1.6]",
                    step.final ? "text-[#C2C6B5]" : "text-[#5C6052]",
                  )}
                >
                  {step.body}
                </p>
                <div className="grid grid-cols-2 gap-[14px]">
                  <PersonColumn side="YOU" text={step.you} final={!!step.final} />
                  <PersonColumn side="ME" text={step.me} final={!!step.final} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner
        className="pt-[54px]"
        dense
        headingSize="text-[clamp(30px,4.6vw,58px)]"
        line1="Ready for"
        line2="step one?"
        body="It all starts with a 15-minute call. Tell me your platform and your goal, you’ll leave with a real number and a timeline."
        primary={{ label: "Book a call", href: "/book" }}
        secondary={{ label: "or see services & pricing", href: "/services" }}
      />
    </>
  );
}
