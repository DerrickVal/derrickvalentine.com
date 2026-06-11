"use client";

import { useState } from "react";
import Link from "next/link";

import { StatusPill } from "@/components/site/status-pill";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/login/actions";

// Skin of the authenticated portal (Client Portal.dc.html, dashboard half) over
// the existing (portal) group + signOut action. Tab state mirrors the design's
// `view`. All project/stage/upload/invoice data is PLACEHOLDER.
// NOTE(handoff): Phase 2 wires real data — project stages + content tables (RLS,
// is_project_member), Supabase Storage uploads, and Stripe (Checkout / Billing)
// through Digital Dog's shared account with metadata.app tagging.

type View = "overview" | "upload" | "invoices";
type Tone = "paid" | "due" | "warn";

const AVATAR = "linear-gradient(150deg,#c3cbb0,#8d976f)";
const STATUS_HATCH =
  "repeating-linear-gradient(125deg,rgba(255,255,255,.05) 0,rgba(255,255,255,.05) 2px,transparent 2px,transparent 22px)";

const NAV: { key: View; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "upload", label: "Upload content" },
  { key: "invoices", label: "Invoices" },
];
const TITLES: Record<View, string> = {
  overview: "Project overview",
  upload: "Upload content",
  invoices: "Invoices",
};

const STAGES = [
  { name: "Kickoff call", date: "Jun 2", state: "done" },
  { name: "Plan & quote", date: "Jun 4", state: "done" },
  { name: "Design", date: "Jun 9", state: "done" },
  { name: "Build", date: "", state: "current" },
  { name: "Review & launch", date: "~Jun 18", state: "pending" },
  { name: "Launch", date: "~Jun 20", state: "pending" },
] as const;

const UPLOADS = [
  {
    title: "Logo & brand files",
    pill: { tone: "paid" as Tone, label: "Received ✓" },
    file: { type: "AI", name: "harbor-logo-pack.zip", size: "2.4 MB" },
  },
  {
    title: "Product photos",
    pill: { tone: "warn" as Tone, label: "12 of ~20" },
    drop: { main: "Drop images or", sub: "JPG, PNG · up to 25MB each" },
  },
  {
    title: "Homepage copy",
    pill: { tone: "due" as Tone, label: "Needed" },
    drop: { main: "Drop a doc or", sub: "PDF, DOCX, or paste in a message" },
  },
  {
    title: "Product details",
    pill: { tone: "due" as Tone, label: "Needed" },
    drop: { main: "Drop a spreadsheet or", sub: "CSV or XLSX of titles, prices, descriptions" },
  },
];

const RECENT = [
  { name: "harbor-logo-pack.zip", date: "Jun 3" },
  { name: "product-shots-batch-1.zip", date: "Jun 6" },
  { name: "brand-guidelines.pdf", date: "Jun 6" },
];

const INVOICES = [
  { title: "Final payment", meta: "INV-018 · Shopify rebuild · due Jun 20", amount: "$1,900", pill: { tone: "due" as Tone, label: "Due" }, action: "pay" },
  { title: "50% deposit", meta: "INV-014 · Shopify rebuild · paid Jun 2", amount: "$1,900", pill: { tone: "paid" as Tone, label: "Paid" }, action: "receipt" },
  { title: "Care plan · May", meta: "INV-009 · Monthly care · paid May 1", amount: "$95", pill: { tone: "paid" as Tone, label: "Paid" }, action: "receipt" },
];

function Overview({ onUpload }: { onUpload: () => void }) {
  return (
    <div>
      {/* status header */}
      <div className="relative mb-5 overflow-hidden rounded-[18px] bg-forest-grad px-7 py-[26px] text-[#E9EAE0]">
        <div className="absolute inset-0" style={{ backgroundImage: STATUS_HATCH }} />
        <div className="relative flex flex-wrap items-start justify-between gap-5">
          <div>
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full bg-[rgba(199,210,172,.18)] px-[13px] py-1.5">
              <span className="size-2 rounded-full bg-sage-pale" />
              <span className="text-[12px] font-bold tracking-[.06em] text-sage-pale">
                IN PROGRESS · BUILD
              </span>
            </div>
            <div className="text-[26px] font-extrabold tracking-[-.02em] text-[#F3F2EA]">
              65% complete
            </div>
            <div className="mt-[5px] text-[14px] text-[#C2C6B5]">
              On track for launch, target Jun 20
            </div>
          </div>
          <div className="text-right">
            <div className="text-[12px] font-semibold text-[#9AA683]">PLATFORM</div>
            <div className="mb-2.5 text-[16px] font-bold text-[#F1EFE8]">Shopify</div>
            <div className="text-[12px] font-semibold text-[#9AA683]">STARTED</div>
            <div className="text-[16px] font-bold text-[#F1EFE8]">Jun 2, 2026</div>
          </div>
        </div>
        <div className="relative mt-[22px] h-2 overflow-hidden rounded-full bg-[rgba(241,239,232,.16)]">
          <div className="h-full w-[65%] rounded-full bg-sage-pale" />
        </div>
      </div>

      {/* stages + needed */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="rounded-[18px] border-[1.5px] border-border bg-card p-6">
          <div className="mb-[18px] text-[11px] font-bold tracking-[.16em] text-[#9A9C8C]">
            PROJECT STAGES
          </div>
          <div className="flex flex-col gap-0.5">
            {STAGES.map((s) =>
              s.state === "current" ? (
                <div
                  key={s.name}
                  className="my-0.5 -mx-2.5 flex items-center gap-3.5 rounded-[11px] bg-[#EEF1E6] px-2.5 py-2.5"
                >
                  <span className="flex size-7 flex-none items-center justify-center rounded-full bg-[#6E7A60] text-[11px] font-extrabold text-primary-foreground">
                    ●
                  </span>
                  <span className="flex-1 text-[15px] font-bold text-[#2B3324]">{s.name}</span>
                  <StatusPill tone="paid" className="px-2.5 py-[3px]">
                    Now
                  </StatusPill>
                </div>
              ) : (
                <div key={s.name} className="flex items-center gap-3.5 py-2.5">
                  {s.state === "done" ? (
                    <span className="flex size-7 flex-none items-center justify-center rounded-full bg-primary text-[13px] text-primary-foreground">
                      ✓
                    </span>
                  ) : (
                    <span className="size-7 flex-none rounded-full border-[1.5px] border-border-strong bg-white" />
                  )}
                  <span
                    className={cn(
                      "flex-1 text-[15px] font-semibold",
                      s.state === "pending" && "text-[#9A9C8C]",
                    )}
                  >
                    {s.name}
                  </span>
                  <span
                    className={cn(
                      "text-[12.5px]",
                      s.state === "pending" ? "text-[#B4B2A9]" : "text-[#9A9C8C]",
                    )}
                  >
                    {s.date}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="rounded-[18px] bg-band p-[22px]">
            <div className="mb-3 text-[11px] font-bold tracking-[.16em] text-[#7D8A6E]">
              WHAT’S NEEDED FROM YOU
            </div>
            <div className="mb-2 text-[16px] font-bold text-band-foreground">
              Homepage copy + product details
            </div>
            <p className="mb-4 text-[13.5px] leading-[1.5] text-[#4A5340]">
              I’m building now, send these over so the right content goes in as I
              go.
            </p>
            <button
              type="button"
              onClick={onUpload}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-[18px] py-[11px] text-[13.5px] font-semibold text-primary-foreground transition-colors hover:bg-ink"
            >
              Upload content →
            </button>
          </div>
          <div className="rounded-[18px] border-[1.5px] border-border bg-card p-[22px]">
            <div className="mb-3 text-[11px] font-bold tracking-[.16em] text-[#9A9C8C]">
              LATEST UPDATE
            </div>
            <div className="flex gap-3">
              <span className="mt-[5px] size-[9px] flex-none rounded-full bg-[#6E7A60]" />
              <div>
                <p className="text-[13.5px] leading-[1.55] text-[#3A3E33]">
                  Homepage and collection pages are built. Working on product
                  templates next.
                </p>
                <div className="mt-1.5 text-[12px] text-[#9A9C8C]">Today, 9:24am</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Upload() {
  return (
    <div>
      <p className="mb-[22px] max-w-[560px] text-[15px] leading-[1.55] text-[#5C6052]">
        Drop your files here and they go straight to me, no email attachments, no
        “did you get it?” Everything’s organized by type.
      </p>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {UPLOADS.map((u) => (
          <div key={u.title} className="rounded-[16px] border-[1.5px] border-border bg-card p-5">
            <div className="mb-3.5 flex items-center justify-between">
              <div className="text-[15.5px] font-bold">{u.title}</div>
              <StatusPill tone={u.pill.tone}>{u.pill.label}</StatusPill>
            </div>
            {u.file ? (
              <div className="flex items-center gap-2.5 rounded-[10px] border border-[#EAE7DC] bg-white px-3 py-2.5">
                <span className="flex size-[30px] flex-none items-center justify-center rounded-[7px] bg-muted text-[11px] font-bold text-[#6E7263]">
                  {u.file.type}
                </span>
                <span className="flex-1 truncate text-[13px] text-[#3A3E33]">{u.file.name}</span>
                <span className="text-[11.5px] text-[#9A9C8C]">{u.file.size}</span>
              </div>
            ) : (
              <div className="cursor-pointer rounded-[11px] border-[1.5px] border-dashed border-border-strong bg-white p-4 text-center transition-colors hover:border-primary">
                <div className="text-[13px] font-semibold text-[#5C6052]">
                  {u.drop?.main} <span className="text-primary">browse</span>
                </div>
                <div className="mt-[3px] text-[11.5px] text-[#A7A59C]">{u.drop?.sub}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="rounded-[16px] border-[1.5px] border-border bg-card p-5">
        <div className="mb-3.5 text-[11px] font-bold tracking-[.16em] text-[#9A9C8C]">
          RECENTLY UPLOADED
        </div>
        <div className="flex flex-col gap-2.5">
          {RECENT.map((r) => (
            <div key={r.name} className="flex items-center gap-3">
              <span className="size-[9px] rounded-full bg-[#6E7A60]" />
              <span className="flex-1 text-[13.5px] text-[#3A3E33]">{r.name}</span>
              <span className="text-[12px] text-[#9A9C8C]">{r.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Invoices() {
  return (
    <div>
      <div className="mb-[22px] grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-[16px] border-[1.5px] border-border bg-card p-[22px]">
          <div className="mb-2 text-[12px] font-semibold text-[#9A9C8C]">Paid to date</div>
          <div className="text-[30px] font-extrabold tracking-[-.02em] text-primary">$1,995</div>
        </div>
        <div className="rounded-[16px] bg-forest-band p-[22px] text-[#E9EAE0]">
          <div className="mb-2 text-[12px] font-semibold text-[#9AA683]">Outstanding</div>
          <div className="text-[30px] font-extrabold tracking-[-.02em] text-[#F3F2EA]">$1,900</div>
        </div>
      </div>
      <div className="overflow-hidden rounded-[16px] border-[1.5px] border-border bg-card">
        {INVOICES.map((inv, i) => (
          <div
            key={inv.title}
            className={cn(
              "flex items-center justify-between gap-4 px-[22px] py-[18px]",
              i < INVOICES.length - 1 && "border-b-[1.5px] border-[#EFEEE7]",
            )}
          >
            <div>
              <div className="text-[15px] font-bold">{inv.title}</div>
              <div className="mt-[3px] text-[12.5px] text-[#9A9C8C]">{inv.meta}</div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[16px] font-bold">{inv.amount}</span>
              <StatusPill tone={inv.pill.tone}>{inv.pill.label}</StatusPill>
              {inv.action === "pay" ? (
                // TODO(integration): Stripe Checkout (one-time payment)
                <button
                  type="button"
                  className="cursor-pointer whitespace-nowrap rounded-full bg-primary px-[18px] py-2.5 text-[13.5px] font-semibold text-primary-foreground transition-colors hover:bg-ink"
                >
                  Pay now
                </button>
              ) : (
                <button
                  type="button"
                  className="cursor-pointer whitespace-nowrap border-b-[1.5px] border-border-strong pb-0.5 text-[13.5px] font-semibold text-nav-fg transition-colors hover:border-primary"
                >
                  Receipt
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 px-1 text-[12.5px] text-[#9A9C8C]">
        Payments are handled securely by Stripe. Receipts are emailed automatically.
      </p>
    </div>
  );
}

export function PortalDashboard({ slug }: { slug: string }) {
  const [view, setView] = useState<View>("overview");

  return (
    <div
      data-project={slug}
      className="grid min-h-screen grid-cols-1 lg:grid-cols-[248px_minmax(0,1fr)]"
    >
      {/* sidebar */}
      <aside className="flex flex-col gap-2 bg-ink-2 px-[18px] py-6 text-[#C2C6B5] lg:sticky lg:top-0 lg:h-screen">
        <div className="flex items-center gap-2.5 px-2 pb-[22px] pt-1.5">
          <span className="flex size-[34px] items-center justify-center rounded-[9px] bg-background text-[15px] font-extrabold tracking-[-.02em] text-foreground">
            DV
          </span>
          <span className="text-[15px] font-bold text-[#F1EFE8]">Client Portal</span>
        </div>

        {NAV.map((n) => {
          const on = view === n.key;
          return (
            <button
              key={n.key}
              type="button"
              onClick={() => setView(n.key)}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-[11px] px-[13px] py-3 text-[14.5px] font-semibold transition-colors",
                on
                  ? "bg-[rgba(199,210,172,.16)] text-[#F1EFE8]"
                  : "text-[#A7AC97] hover:bg-white/5 hover:text-[#F1EFE8]",
              )}
            >
              <span
                className={cn("size-[9px] rounded-[3px]", on ? "bg-sage-pale" : "bg-[#56603f]")}
              />
              {n.label}
            </button>
          );
        })}

        {/* NOTE(handoff): placeholder client identity until real membership data */}
        <div className="mt-auto flex items-center gap-[11px] border-t border-white/10 pt-4">
          <span
            className="flex size-[38px] flex-none items-center justify-center rounded-full text-[14px] font-extrabold text-[#2b3324]"
            style={{ background: AVATAR }}
          >
            PA
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13.5px] font-bold text-[#F1EFE8]">Priya Anand</div>
            <div className="text-[11.5px] text-[#7E8C62]">Harbor Goods</div>
          </div>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-[10px] px-[13px] py-2.5 text-[13.5px] font-semibold text-[#A7AC97] transition-colors hover:bg-white/5 hover:text-[#F1EFE8]"
          >
            ⎋ Log out
          </button>
        </form>
      </aside>

      {/* main */}
      <main className="min-w-0">
        <div className="sticky top-0 z-[5] flex items-center justify-between gap-4 border-b-[1.5px] border-[#E2DFD4] bg-[rgba(241,239,232,.85)] px-8 py-5 backdrop-blur-md">
          <div>
            {/* TODO(content): real project name for this slug */}
            <div className="text-[12px] font-semibold tracking-[.04em] text-[#9A9C8C]">
              Harbor Goods · Shopify rebuild
            </div>
            <h1 className="mt-[3px] text-[22px] font-extrabold tracking-[-.02em]">
              {TITLES[view]}
            </h1>
          </div>
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-full border-[1.5px] border-border-strong px-4 py-2.5 text-[13.5px] font-semibold text-nav-fg transition-colors hover:border-primary"
          >
            Message Derrick
          </Link>
        </div>

        <div className="max-w-[1000px] px-8 pb-12 pt-7">
          {view === "overview" ? <Overview onUpload={() => setView("upload")} /> : null}
          {view === "upload" ? <Upload /> : null}
          {view === "invoices" ? <Invoices /> : null}
        </div>
      </main>
    </div>
  );
}
