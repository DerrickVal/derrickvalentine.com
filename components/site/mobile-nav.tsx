"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SERVICES, servicePath } from "@/lib/services";

const NAV = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="flex size-10 items-center justify-center rounded-full border-[1.5px] border-border-strong text-foreground"
      >
        <Menu className="size-5" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[100] flex flex-col bg-background">
          <div className="flex items-center justify-between px-6 py-6">
            <span className="flex items-center gap-[11px]">
              <span className="flex size-[34px] items-center justify-center rounded-[9px] bg-primary text-[15px] font-extrabold tracking-[-0.02em] text-primary-foreground">
                DV
              </span>
              <span className="text-[16px] font-bold">Derrick Valentine</span>
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="flex size-10 items-center justify-center rounded-full border-[1.5px] border-border-strong"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col overflow-y-auto px-6 pb-10">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={close}
                className="border-b border-border py-4 text-[22px] font-bold uppercase tracking-[-0.02em]"
              >
                {l.label}
              </Link>
            ))}

            <div className="mt-6 mb-2 text-[11px] font-bold tracking-[0.2em] text-subtle-foreground">
              PRICING
            </div>
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`${servicePath(s.slug)}#calculator`}
                onClick={close}
                className="py-2 text-[16px] font-semibold text-muted-foreground"
              >
                {s.name}
              </Link>
            ))}

            <div className="mt-8 flex flex-col gap-3">
              <Button asChild variant="pillOutline" size="pill" className="w-full">
                <Link href="/login" onClick={close}>
                  Client login
                </Link>
              </Button>
              <Button asChild variant="pill" size="pill" className="w-full">
                <Link href="/book" onClick={close}>
                  Book a call
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
