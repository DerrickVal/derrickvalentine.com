import { cn } from "@/lib/utils";

type Tone = "light" | "dark" | "band";

const ACCENT: Record<Tone, string> = {
  light: "text-accent", // sage on cream
  dark: "text-accent-on-dark", // on hero/CTA gradient
  band: "text-accent-bright", // on the forest-band dark section
};

/**
 * The signature display headline: extrabold, uppercase, tight tracking, one line
 * (usually the 2nd) colored sage. Pass the exact lines/breaks from the design.
 */
export function TwoToneHeading({
  lines,
  accentIndex = 1,
  as: Tag = "h2",
  size,
  tone = "light",
  className,
}: {
  lines: string[];
  accentIndex?: number;
  as?: "h1" | "h2";
  size: string; // a `text-[clamp(...)]` class
  tone?: Tone;
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "font-extrabold uppercase leading-[0.95] tracking-[-0.03em]",
        size,
        className,
      )}
    >
      {lines.map((line, i) => (
        <span key={i} className={cn("block", i === accentIndex && ACCENT[tone])}>
          {line}
        </span>
      ))}
    </Tag>
  );
}
