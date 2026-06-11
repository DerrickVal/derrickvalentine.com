import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail } from "lucide-react";

import { ContactForm } from "@/components/marketing/contact/contact-form";
import { SectionLabel } from "@/components/site/section-label";
import { TwoToneHeading } from "@/components/site/two-tone-heading";

export const metadata: Metadata = {
  title: "Contact | Derrick Valentine",
  description:
    "Tell me what you need and I’ll get back to you, usually within a few hours. No bots, no sales team. Just me.",
};

const BOOK_HATCH =
  "repeating-linear-gradient(125deg,rgba(255,255,255,.05) 0,rgba(255,255,255,.05) 2px,transparent 2px,transparent 22px)";

const SOCIALS = ["Upwork", "LinkedIn", "Digital Dog"];

export default function ContactPage() {
  return (
    <>
      {/* hero (split) */}
      <section className="mx-auto max-w-[1240px] px-8 pt-[30px] pb-2.5">
        <SectionLabel>CONTACT</SectionLabel>
        <div className="mt-[18px] grid grid-cols-1 items-end gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <TwoToneHeading
            as="h1"
            size="text-[clamp(40px,5.8vw,78px)]"
            lines={["Let’s", "talk."]}
            className="leading-[.95] tracking-[-0.03em]"
          />
          <p className="text-[16.5px] font-medium leading-[1.6] text-[#5C6052]">
            Tell me what you need and I’ll get back to you, usually within a few
            hours. No bots, no sales team. Just me.
          </p>
        </div>
      </section>

      {/* body: direct-contact rail + form */}
      <section className="mx-auto max-w-[1240px] px-8 pb-[70px] pt-[44px]">
        <div className="grid grid-cols-1 items-start gap-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
          {/* left rail */}
          <div className="flex flex-col gap-3.5">
            {/* book card */}
            <Link
              href="/book"
              className="relative block overflow-hidden rounded-[18px] bg-forest-grad p-6 text-primary-foreground transition-[filter] hover:brightness-[1.08]"
            >
              <div className="absolute inset-0" style={{ backgroundImage: BOOK_HATCH }} />
              <div className="relative">
                <div className="mb-2.5 text-[11px] font-bold tracking-[.18em] text-accent-on-dark">
                  FASTEST WAY
                </div>
                <div className="mb-[7px] text-[22px] font-extrabold tracking-[-.02em]">
                  Book a 15-min call
                </div>
                <p className="mb-4 text-[14px] leading-[1.55] text-[#D9DBCD]">
                  Pick a time that works. We’ll talk platform, goals, and a real
                  number.
                </p>
                <span className="inline-flex items-center gap-2 rounded-full bg-background px-5 py-[11px] text-[14px] font-semibold text-foreground">
                  Choose a time →
                </span>
              </div>
            </Link>

            {/* info card */}
            <div className="flex flex-col gap-[18px] rounded-[18px] border-[1.5px] border-border bg-card p-[22px]">
              <div className="flex items-start gap-3.5">
                <div className="flex size-[42px] flex-none items-center justify-center rounded-[11px] bg-muted">
                  <Mail className="size-4 text-primary" strokeWidth={2} />
                </div>
                <div>
                  <div className="mb-1 text-[12px] font-bold tracking-[.12em] text-[#9A9C8C]">
                    EMAIL
                  </div>
                  {/* TODO(content): confirm public contact address */}
                  <a
                    href="mailto:hello@digitaldog.io"
                    className="text-[15px] font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    hello@digitaldog.io
                  </a>
                </div>
              </div>
              <div className="h-px bg-[#EAE7DC]" />
              <div className="flex items-start gap-3.5">
                <div className="flex size-[42px] flex-none items-center justify-center rounded-[11px] bg-muted">
                  <Clock className="size-4 text-primary" strokeWidth={2} />
                </div>
                <div>
                  <div className="mb-1 text-[12px] font-bold tracking-[.12em] text-[#9A9C8C]">
                    RESPONSE TIME
                  </div>
                  <div className="text-[15px] font-semibold text-foreground">
                    A few hours, most days
                  </div>
                </div>
              </div>
              <div className="h-px bg-[#EAE7DC]" />
              <div>
                <div className="mb-[11px] text-[12px] font-bold tracking-[.12em] text-[#9A9C8C]">
                  ALSO FIND ME
                </div>
                <div className="flex flex-wrap gap-2">
                  {/* TODO(content): real social/profile links */}
                  {SOCIALS.map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="rounded-full border-[1.5px] border-[#DAD6C9] px-3.5 py-2 text-[13px] font-semibold text-nav-fg transition-colors hover:border-primary"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* already a client */}
            <div className="rounded-[18px] bg-band px-[22px] py-5">
              <div className="mb-[5px] text-[15px] font-bold text-band-foreground">
                Already a client?
              </div>
              <p className="mb-3 text-[13.5px] leading-[1.5] text-[#4A5340]">
                Log in to upload content or check on your project.
              </p>
              <Link
                href="/login"
                className="border-b-[1.5px] border-primary pb-[3px] text-[13.5px] font-bold text-band-foreground"
              >
                Go to client login →
              </Link>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
