import Link from "next/link";

import { cn } from "@/lib/utils";

interface CtaAction {
  label: string;
  href: string;
}

/**
 * The recurring closing call-to-action: forest-gradient rounded shell with hatch
 * + a radial sage glow, a two-tone headline, body, a cream primary pill, and an
 * underline secondary link. Default primary -> /book.
 */
export function CtaBanner({
  line1,
  line2,
  body,
  primary = { label: "Book a call", href: "/book" },
  secondary,
  headingSize = "text-[clamp(34px,5.2vw,66px)]",
  className,
}: {
  line1: string;
  line2: string;
  body: string;
  primary?: CtaAction;
  secondary?: CtaAction;
  headingSize?: string;
  className?: string;
}) {
  return (
    <section className={cn("mx-auto max-w-[1240px] px-8 pb-9", className)}>
      <div className="relative overflow-hidden rounded-[24px] bg-forest-grad px-[clamp(32px,5vw,72px)] py-[clamp(48px,7vw,92px)]">
        {/* CTA hatch is its own angle/spacing in the design (125deg / .05 / 24px),
            not the generic .bg-hatch (135deg / .06 / 16px). */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(125deg,rgba(255,255,255,.05) 0,rgba(255,255,255,.05) 2px,transparent 2px,transparent 24px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 120% at 85% 20%, rgba(150,170,120,.3), transparent 60%)",
          }}
        />
        <div className="relative max-w-[680px]">
          <h2
            className={cn(
              headingSize,
              "font-extrabold uppercase leading-[0.98] tracking-[-0.03em] text-primary-foreground",
            )}
          >
            {line1}
            <br />
            <span className="text-accent-on-dark">{line2}</span>
          </h2>
          <p className="mt-[22px] max-w-[460px] text-[17px] font-medium leading-[1.55] text-[#D9DBCD]">
            {body}
          </p>
          <div className="mt-[34px] flex flex-wrap items-center gap-[14px]">
            <Link
              href={primary.href}
              className="inline-flex items-center gap-[9px] whitespace-nowrap rounded-full bg-background px-8 py-[17px] text-[16px] font-semibold text-foreground transition-colors hover:bg-white"
            >
              {primary.label} <span className="text-[18px]">→</span>
            </Link>
            {secondary ? (
              <Link
                href={secondary.href}
                className="border-b-[1.5px] border-[rgba(241,239,232,.4)] pb-[3px] text-[15px] font-semibold text-[#E3E4D8] transition-colors hover:text-[#F1EFE8]"
              >
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
