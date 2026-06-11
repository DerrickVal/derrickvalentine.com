"use client";

import { useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { ServiceData } from "@/lib/service-data";

const MAX_PAGES = 20;
const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

function Toggle({ on }: { on: boolean }) {
  return (
    <div
      className={cn(
        "relative h-[26px] w-[46px] flex-none rounded-full transition-colors duration-150",
        on ? "bg-primary" : "bg-[#CFC9BB]",
      )}
    >
      <span
        className={cn(
          "absolute top-[3px] size-5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,.25)] transition-all duration-150",
          on ? "left-[23px]" : "left-[3px]",
        )}
      />
    </div>
  );
}

function AddonRow({
  label,
  sub,
  priceLabel,
  on,
  onToggle,
}: {
  label: string;
  sub: string;
  priceLabel: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex w-full items-center justify-between gap-4 rounded-[12px] border-[1.5px] px-4 py-3.5 text-left transition-colors",
        on ? "border-[#B7C29C] bg-[#EEF1E6]" : "border-border bg-[#FBFAF5]",
      )}
    >
      <span className="min-w-0">
        <span className="block text-[14.5px] font-semibold text-foreground">{label}</span>
        <span className="mt-0.5 block text-[12.5px] text-[#7C8071]">{sub}</span>
      </span>
      <span className="flex flex-none items-center gap-3.5">
        <span className="text-[13px] font-bold text-status-paid-fg">{priceLabel}</span>
        <Toggle on={on} />
      </span>
    </button>
  );
}

export function ServiceCalculator({ service }: { service: ServiceData }) {
  const [type, setType] = useState(service.defaultState.type);
  const [pages, setPages] = useState(service.defaultState.pages);
  const [addons, setAddons] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const a of service.addons) init[a.key] = service.defaultState.addons.includes(a.key);
    return init;
  });
  const [care, setCare] = useState(false);

  const t = service.types.find((x) => x.key === type) ?? service.types[0];
  const extraPages = Math.max(0, pages - t.included);
  let total = t.base + extraPages * t.perPage;
  let days = t.days + extraPages * 0.6;
  for (const a of service.addons) {
    if (addons[a.key]) {
      total += a.price;
      days += a.days;
    }
  }
  days = Math.round(days);
  const low = Math.round((total * 0.9) / 50) * 50;
  const high = Math.round((total * 1.15) / 50) * 50;

  const items: { label: string; val: string }[] = [
    { label: `${t.label} base`, val: fmt(t.base) },
  ];
  if (extraPages > 0) {
    items.push({
      label: `+ ${extraPages} extra page${extraPages > 1 ? "s" : ""}`,
      val: fmt(extraPages * t.perPage),
    });
  }
  for (const a of service.addons) {
    if (addons[a.key]) items.push({ label: a.label, val: fmt(a.price) });
  }

  const pagesLabel = `${pages}${pages === MAX_PAGES ? "+" : ""}`;
  const includedNote = `${t.included} incl. · then ${fmt(t.perPage)} ea.`;

  return (
    <div className="grid grid-cols-1 items-start gap-[26px] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      {/* controls */}
      <div className="rounded-[22px] bg-background p-7 text-foreground">
        <div className="mb-3.5 text-[11px] font-bold tracking-[.18em] text-subtle-foreground">
          01 &nbsp; PROJECT TYPE
        </div>
        <div className="mb-[30px] grid grid-cols-1 gap-3 sm:grid-cols-3">
          {service.types.map((pt) => {
            const active = pt.key === type;
            return (
              <button
                key={pt.key}
                type="button"
                onClick={() => setType(pt.key)}
                className={cn(
                  "flex flex-col gap-[3px] rounded-[14px] border-[1.5px] p-[15px] text-left transition-colors",
                  active
                    ? "border-primary bg-primary"
                    : "border-[#DAD6C9] bg-[#FBFAF5] hover:border-[#B6BBA4]",
                )}
              >
                <span
                  className={cn(
                    "text-[16px] font-extrabold uppercase tracking-[-.02em]",
                    active ? "text-primary-foreground" : "text-foreground",
                  )}
                >
                  {pt.label}
                </span>
                <span
                  className={cn(
                    "text-[11.5px] leading-[1.3]",
                    active ? "text-sage-pale" : "text-muted-foreground",
                  )}
                >
                  {pt.blurb}
                </span>
                <span
                  className={cn(
                    "mt-[5px] text-[12px] font-bold",
                    active ? "text-accent-on-dark" : "text-status-paid-fg",
                  )}
                >
                  from {fmt(pt.base)}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mb-2 flex items-baseline justify-between">
          <div className="text-[11px] font-bold tracking-[.18em] text-subtle-foreground">
            02 &nbsp; PAGES / TEMPLATES
          </div>
          <div className="text-[22px] font-extrabold tracking-[-.02em] text-primary">
            {pagesLabel}
          </div>
        </div>
        <input
          type="range"
          className="range-forest"
          min={1}
          max={MAX_PAGES}
          step={1}
          value={pages}
          onChange={(e) => setPages(parseInt(e.target.value, 10))}
          aria-label="Pages or templates"
        />
        <div className="mt-[7px] flex justify-between text-[11px] text-[#9A9C8C]">
          <span>1</span>
          <span>{includedNote}</span>
          <span>20+</span>
        </div>

        <div className="my-[26px] h-px bg-[#E0DBCD]" />

        <div className="mb-3.5 text-[11px] font-bold tracking-[.18em] text-subtle-foreground">
          03 &nbsp; ADD-ONS
        </div>
        <div className="flex flex-col gap-2.5">
          {service.addons.map((a) => (
            <AddonRow
              key={a.key}
              label={a.label}
              sub={a.sub}
              priceLabel={`+ ${fmt(a.price)}`}
              on={!!addons[a.key]}
              onToggle={() => setAddons((s) => ({ ...s, [a.key]: !s[a.key] }))}
            />
          ))}
          <AddonRow
            label="Ongoing care plan"
            sub="Updates, backups & small fixes, monthly"
            priceLabel={`+ ${fmt(service.carePrice)} / mo`}
            on={care}
            onToggle={() => setCare((c) => !c)}
          />
        </div>
      </div>

      {/* estimate */}
      <div className="sticky top-5 rounded-[22px] border border-[rgba(241,239,232,.14)] bg-[#2C3522] p-7">
        <div className="mb-3.5 text-[11px] font-bold tracking-[.18em] text-[#9AA683]">
          YOUR ESTIMATE
        </div>
        <div className="text-[clamp(40px,6vw,58px)] font-extrabold leading-none tracking-[-.03em] text-[#F3F2EA]">
          {fmt(total)}
        </div>
        <div className="mt-2 text-[13px] text-[#AEB79C]">
          Typical range{" "}
          <span className="font-semibold text-[#E9EAE0]">
            {fmt(low)} – {fmt(high)}
          </span>
        </div>
        <div className="mt-[18px] flex items-center gap-[9px] rounded-[11px] bg-[rgba(199,210,172,.12)] px-3.5 py-[11px]">
          <span className="size-2 rounded-full bg-sage-pale" />
          <span className="text-[13.5px] text-[#DDE1D1]">
            Estimated timeline ·{" "}
            <span className="font-bold text-[#F1EFE8]">~{days} business days</span>
          </span>
        </div>
        <div className="my-[22px] h-px bg-[rgba(241,239,232,.14)]" />
        <div className="mb-2 flex flex-col gap-[11px]">
          {items.map((it, i) => (
            <div key={i} className="flex items-center justify-between gap-3.5 text-[13.5px]">
              <span className="text-[#BFC4B2]">{it.label}</span>
              <span className="font-semibold text-[#E9EAE0]">{it.val}</span>
            </div>
          ))}
        </div>
        {care ? (
          <div className="mt-[3px] flex items-center justify-between gap-3.5 border-t border-dashed border-[rgba(241,239,232,.18)] pt-[11px] text-[13.5px]">
            <span className="text-[#BFC4B2]">Care plan</span>
            <span className="font-semibold text-[#E9EAE0]">{fmt(service.carePrice)} / mo</span>
          </div>
        ) : null}
        <Link
          href="/book"
          className="mt-6 flex items-center justify-center gap-[9px] whitespace-nowrap rounded-full bg-background py-4 text-[15.5px] font-bold text-foreground transition-colors hover:bg-white"
        >
          Book this estimate <span className="text-[17px]">→</span>
        </Link>
        <div className="mt-3 text-center text-[12px] leading-[1.5] text-[#8E9379]">
          Final quote confirmed on a 15-min call.
          <br />
          Fixed price, in writing, no surprises.
        </div>
      </div>
    </div>
  );
}
