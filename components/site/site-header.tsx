import Link from "next/link";

import { ActiveLink } from "./active-link";
import { MobileNav } from "./mobile-nav";
import { PricingMenu } from "./pricing-menu";

const navLink =
  "text-[14.5px] font-medium text-nav-fg transition-colors hover:text-foreground";
const navActive = "font-bold text-foreground";

export function SiteHeader({
  cta = { label: "Book a call", href: "/book" },
}: {
  /** Right-hand primary action. Defaults to Book a call; /book swaps it to Message me. */
  cta?: { label: string; href: string };
} = {}) {
  return (
    <header className="relative z-20 mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-8 py-6">
      <Link href="/" className="flex items-center gap-[11px] text-foreground">
        <span className="flex size-[34px] items-center justify-center rounded-[9px] bg-primary text-[15px] font-extrabold tracking-[-0.02em] text-primary-foreground">
          DV
        </span>
        <span className="text-[16px] font-bold tracking-[-0.01em]">
          Derrick Valentine
        </span>
      </Link>

      <nav className="hidden items-center gap-[30px] md:flex">
        <ActiveLink href="/work" className={navLink} activeClassName={navActive}>
          Work
        </ActiveLink>
        <ActiveLink href="/services" className={navLink} activeClassName={navActive}>
          Services
        </ActiveLink>
        <PricingMenu />
        <ActiveLink href="/process" className={navLink} activeClassName={navActive}>
          Process
        </ActiveLink>
        <ActiveLink href="/about" className={navLink} activeClassName={navActive}>
          About
        </ActiveLink>
      </nav>

      <div className="hidden items-center gap-[14px] md:flex">
        <Link
          href="/login"
          className="rounded-full border-[1.5px] border-border-strong px-4 py-[9px] text-sm font-medium text-nav-fg transition-colors hover:border-primary"
        >
          Client login
        </Link>
        <Link
          href={cta.href}
          className="whitespace-nowrap rounded-full bg-primary px-5 py-[11px] text-sm font-semibold text-primary-foreground transition-colors hover:bg-ink"
        >
          {cta.label}
        </Link>
      </div>

      <MobileNav />
    </header>
  );
}
