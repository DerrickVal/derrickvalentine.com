import { cn } from "@/lib/utils";

/** Number + caption used in About quick-facts and trust badges. */
export function Stat({
  value,
  caption,
  className,
}: {
  value: React.ReactNode;
  caption: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="text-[clamp(28px,4vw,46px)] font-extrabold leading-none tracking-[-0.02em] text-primary">
        {value}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{caption}</div>
    </div>
  );
}
