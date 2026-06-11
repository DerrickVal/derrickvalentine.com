import { cn } from "@/lib/utils";

/**
 * The bracketed eyebrow above most sections, e.g. `[ SERVICES ]`.
 * Literal brackets + non-breaking spaces, per the design.
 */
export function SectionLabel({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-[11px] font-bold tracking-[0.24em]",
        tone === "dark" ? "text-[#9AA683]" : "text-subtle-foreground",
        className,
      )}
    >
      [ &nbsp;{children}&nbsp; ]
    </span>
  );
}
