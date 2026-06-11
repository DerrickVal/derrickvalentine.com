import Link from "next/link";

import { SERVICES, servicePath, usd } from "@/lib/services";

/**
 * Header "Pricing ▾" dropdown. Pure CSS: opens on hover of the wrapper and on
 * keyboard focus-within (the trigger is a real button). The wrapper's bottom
 * padding keeps the hover gap from closing it.
 */
export function PricingMenu() {
  return (
    <div className="group relative -mb-[18px] pb-[18px]">
      <button
        type="button"
        aria-haspopup="true"
        className="flex cursor-pointer items-center gap-[5px] text-[14.5px] font-medium text-nav-fg transition-colors group-hover:text-foreground"
      >
        Pricing <span className="relative top-px text-[9px]">▼</span>
      </button>

      <div className="invisible absolute left-1/2 top-full z-[60] min-w-[248px] -translate-x-1/2 translate-y-[2px] rounded-[14px] border-[1.5px] border-[#E2DFD4] bg-[#FBFAF7] p-2 opacity-0 shadow-[0_20px_44px_-22px_rgba(40,38,32,.5)] transition-all duration-150 group-hover:visible group-hover:translate-y-[8px] group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-[8px] group-focus-within:opacity-100">
        {SERVICES.map((s) => (
          <Link
            key={s.slug}
            href={`${servicePath(s.slug)}#calculator`}
            className="flex items-center justify-between gap-[18px] rounded-[9px] px-3 py-[10px] text-[13.5px] font-semibold text-foreground hover:bg-[#EFEEE7]"
          >
            {s.name}
            <span className="text-xs font-bold text-subtle-foreground">
              from {usd(s.startingPrice)}
            </span>
          </Link>
        ))}
        <div className="mx-1 my-[7px] border-t border-[#EAE7DC]" />
        <Link
          href="/services"
          className="block rounded-[9px] px-3 py-[9px] text-[12.5px] font-semibold text-[#5C6052] hover:bg-[#EFEEE7]"
        >
          All services &amp; pricing →
        </Link>
      </div>
    </div>
  );
}
