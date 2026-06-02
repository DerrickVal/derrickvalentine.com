import Link from "next/link";

import { SecondaryGrowButton } from "@/components/ui/grow-button";
import {
  HeroNavigation01,
  HeroNavigation01SmallScreen,
  type Navigation,
} from "@/components/shadcn-studio/blocks/hero-section-37/hero-navigation";
import GrowLogo from "@/assets/svg/grow-logo";

// Site navigation — the locked IA (see docs/IA.md). Flat links: the redesign offer
// is a single Services page, so no dropdowns. Routes are stubbed until each page is built.
const navigationData: Navigation[] = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/services" },
  { title: "Work", href: "/work" },
  { title: "Pricing", href: "/pricing" },
  { title: "About", href: "/about" },
  { title: "Resources", href: "/resources" },
  { title: "Contact", href: "/contact" },
];

// TODO(branding): the GrowLogo mark + "Grow" wordmark are Hero 37 placeholders —
// swap for Derrick's logo when branding/assets land.
const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 h-16 w-full transition-all duration-300">
      <div className="bg-primary mx-auto flex h-full max-w-6xl items-center justify-between gap-6 rounded-b-[12px] px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <GrowLogo className="[&_path]:first:fill-primary [&_path]:last:fill-background size-8" />
          <span className="text-primary-foreground text-[20px] font-semibold uppercase">
            Grow
          </span>
        </Link>

        <HeroNavigation01 navigationData={navigationData} navigationClassName="grow" />

        <div className="flex gap-3">
          {/* Primary CTA — the free Website Review (routes to Contact) */}
          <SecondaryGrowButton className="max-lg:hidden" asChild>
            <Link href="/contact">Request a Website Review</Link>
          </SecondaryGrowButton>

          {/* Mobile menu */}
          <HeroNavigation01SmallScreen
            navigationData={navigationData}
            logo={
              <span className="flex items-center gap-3">
                <GrowLogo className="size-8" />
                <span className="text-primary lg:text-primary-foreground text-[20px] font-semibold uppercase">
                  Grow
                </span>
              </span>
            }
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
