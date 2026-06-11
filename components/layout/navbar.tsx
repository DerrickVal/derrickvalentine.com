import Image from "next/image";
import Link from "next/link";

import { SecondaryGrowButton } from "@/components/ui/grow-button";
import {
  HeroNavigation01,
  HeroNavigation01SmallScreen,
  type Navigation,
} from "@/components/shadcn-studio/blocks/hero-section-37/hero-navigation";

// Site navigation — the locked IA (see docs/IA.md). Flat links: the redesign offer
// is a single Services page, so no dropdowns. Home is omitted (the logo links home).
// Routes are stubbed until each page is built.
const navigationData: Navigation[] = [
  { title: "Services", href: "/services" },
  { title: "Work", href: "/work" },
  { title: "Pricing", href: "/pricing" },
  { title: "About", href: "/about" },
  { title: "Resources", href: "/resources" },
  { title: "Contact", href: "/contact" },
];

// Brand marks: /public/logo-white.png (knockout — for dark surfaces like the primary navbar)
// and /public/logo-black.png (for light surfaces like the mobile menu sheet).
const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 h-16 w-full transition-all duration-300">
      <div className="bg-primary mx-auto flex h-full max-w-6xl items-center justify-between gap-6 rounded-b-[12px] px-8">
        {/* Logo (white wordmark on the dark primary bar) */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-white.png"
            alt="Derrick Valentine"
            width={196}
            height={56}
            className="h-8 w-auto"
            priority
          />
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
              <Image
                src="/logo-black.png"
                alt="Derrick Valentine"
                width={392}
                height={111}
                className="h-7 w-auto"
              />
            }
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
