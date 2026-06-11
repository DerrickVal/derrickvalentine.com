import Link from "next/link";

import { SERVICES, servicePath } from "@/lib/services";
import { ActiveLink } from "./active-link";

const footerLink = "text-sm text-footer-fg transition-colors hover:text-[#F1EFE8]";
const footerActive = "text-[#F1EFE8] font-semibold";

const COMPANY = [
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// All point to /login for now (per the design). Plain links so /login does not
// bold all four at once.
const CLIENTS = [
  "Client login",
  "Upload content",
  "Project status",
  "Invoices",
];

function FooterBrand() {
  return (
    <div className="mb-[18px] flex items-center gap-[11px]">
      <span className="flex size-[34px] items-center justify-center rounded-[9px] bg-background text-[15px] font-extrabold tracking-[-0.02em] text-foreground">
        DV
      </span>
      <span className="text-[16px] font-bold text-[#F1EFE8]">Derrick Valentine</span>
    </div>
  );
}

function FooterCol({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-4 text-[11px] font-bold tracking-[0.2em] text-[#7E836F]">
        {heading}
      </div>
      <div className="flex flex-col gap-[11px]">{children}</div>
    </div>
  );
}

export function SiteFooter({ variant = "full" }: { variant?: "full" | "slim" }) {
  if (variant === "slim") {
    return (
      <footer className="bg-ink text-footer-fg">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-6 px-8 py-10">
          <FooterBrand />
          <Link
            href="/contact"
            className="border-b-[1.5px] border-[rgba(241,239,232,.3)] pb-1 text-sm font-semibold text-[#E3E4D8] transition-colors hover:text-[#F1EFE8]"
          >
            Prefer to write? Send a message →
          </Link>
          <div className="w-full text-[12.5px] text-[#7E836F]">
            © 2026 Derrick Valentine. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-ink text-footer-fg">
      <div className="mx-auto max-w-[1240px] px-8 pt-16 pb-[30px]">
        <div className="grid grid-cols-1 gap-10 border-b border-[rgba(241,239,232,.12)] pb-12 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:gap-x-8">
          {/* brand + newsletter (placeholder; not wired — NOTE(handoff)) */}
          <div className="max-w-[300px]">
            <FooterBrand />
            <p className="mb-[18px] text-sm leading-relaxed text-footer-muted">
              One developer who builds, fixes, and looks after websites, on the
              platform you already use.
            </p>
            <form className="flex max-w-[300px] gap-2">
              <input
                type="email"
                placeholder="Your email"
                aria-label="Your email"
                className="min-w-0 flex-1 rounded-full border border-[rgba(241,239,232,.18)] bg-[#2E3327] px-4 py-[11px] text-[13.5px] text-[#F1EFE8] outline-none placeholder:text-[#8A8E7C]"
              />
              <button
                type="button"
                className="flex-none rounded-full bg-background px-[18px] text-[13.5px] font-semibold text-foreground"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-[9px] text-xs text-[#7E836F]">
              One short tip a week. No spam, ever.
            </div>
          </div>

          <FooterCol heading="SERVICES">
            {SERVICES.map((s) => (
              <ActiveLink
                key={s.slug}
                href={servicePath(s.slug)}
                className={footerLink}
                activeClassName={footerActive}
              >
                {s.name}
              </ActiveLink>
            ))}
          </FooterCol>

          <FooterCol heading="COMPANY">
            {COMPANY.map((l) => (
              <ActiveLink
                key={l.href}
                href={l.href}
                className={footerLink}
                activeClassName={footerActive}
              >
                {l.label}
              </ActiveLink>
            ))}
          </FooterCol>

          <FooterCol heading="CLIENTS">
            {CLIENTS.map((label) => (
              <Link key={label} href="/login" className={footerLink}>
                {label}
              </Link>
            ))}
          </FooterCol>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-[18px] pt-6 text-[12.5px] text-[#7E836F]">
          <div>© 2026 Derrick Valentine. All rights reserved.</div>
          <div className="flex gap-[22px]">
            {/* TODO(content): real Upwork / LinkedIn / Privacy targets */}
            <a href="#" className="text-[#7E836F] transition-colors hover:text-[#F1EFE8]">
              Upwork
            </a>
            <a href="#" className="text-[#7E836F] transition-colors hover:text-[#F1EFE8]">
              LinkedIn
            </a>
            <a href="#" className="text-[#7E836F] transition-colors hover:text-[#F1EFE8]">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
