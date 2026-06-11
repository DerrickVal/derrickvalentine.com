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
  tone?: "sage" | "forest";
  src?: string;
  video?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const surface =
    tone === "forest"
      ? "bg-forest-grad"
      : "bg-[linear-gradient(150deg,#c9cfb8,#9da683)]";

  const hatch =
    tone === "forest"
      ? "repeating-linear-gradient(135deg,rgba(255,255,255,.06) 0,rgba(255,255,255,.06) 2px,transparent 2px,transparent 16px)"
      : "repeating-linear-gradient(135deg,rgba(255,255,255,.14) 0,rgba(255,255,255,.14) 2px,transparent 2px,transparent 18px)";

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
            <div className="absolute bottom-4 left-4 rounded-[10px] bg-[rgba(20,24,16,.5)] px-3 py-2 text-[11px] font-semibold tracking-[0.1em] text-[#EDEEE3] backdrop-blur-sm">
              {label}
            </div>
          ) : null}
        </>
      )}
      {children}
    </div>
  );
}
