import { cn } from "@/lib/utils";

const TONES = {
  paid: "bg-status-paid-bg text-status-paid-fg",
  due: "bg-status-due-bg text-status-due-fg",
  warn: "bg-status-warn-bg text-status-warn-fg",
} as const;

export function StatusPill({
  tone,
  children,
  className,
}: {
  tone: keyof typeof TONES;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-[11px] py-1 text-[11.5px] font-bold",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
