import { cn } from "@/lib/utils";

/**
 * Gradient + hatch stand-in for real media (hero video, portrait, project shots).
 * Drop in a real asset via `src` (image) or `src` + `video` later and the
 * placeholder disappears. The corner caption chip only shows for placeholders.
 */
export function MediaPlaceholder({
  label,
  tone = "sage",
  src,
  video = false,
  className,
  children,
}: {
  label?: string;
  tone?: "sage" | "sage-work" | "forest";
  src?: string;
  video?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  // Each tone matches a distinct dc surface exactly: forest = store/site mockup
  // (160deg, #46532f); sage = portrait (155deg, #c9cfb8); sage-work = the work
  // image (150deg, #cdd3bd, slightly deeper sage + wider hatch).
  const surface = {
    forest: "bg-[linear-gradient(160deg,#46532f,#222a1c)]",
    sage: "bg-[linear-gradient(155deg,#c9cfb8,#9da683)]",
    "sage-work": "bg-[linear-gradient(150deg,#cdd3bd,#a3ac88)]",
  }[tone];

  const hatch = {
    forest:
      "repeating-linear-gradient(135deg,rgba(255,255,255,.06) 0,rgba(255,255,255,.06) 2px,transparent 2px,transparent 18px)",
    sage: "repeating-linear-gradient(135deg,rgba(255,255,255,.14) 0,rgba(255,255,255,.14) 2px,transparent 2px,transparent 18px)",
    "sage-work":
      "repeating-linear-gradient(135deg,rgba(255,255,255,.13) 0,rgba(255,255,255,.13) 2px,transparent 2px,transparent 20px)",
  }[tone];

  return (
    <div className={cn("relative overflow-hidden", surface, className)}>
      {src ? (
        video ? (
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={label ?? ""}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )
      ) : (
        <>
          <div className="absolute inset-0" style={{ backgroundImage: hatch }} />
          {label ? (
            <div className="absolute bottom-4 left-4 rounded-[10px] bg-[rgba(20,24,16,.5)] px-[13px] py-2 text-[11px] font-semibold tracking-[0.1em] text-[#EDEEE3] backdrop-blur-[3px]">
              {label}
            </div>
          ) : null}
        </>
      )}
      {children}
    </div>
  );
}
