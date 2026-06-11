"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { INDUSTRIES, PROJECTS, STYLES, type WorkProject } from "@/lib/work";

const CARD_BG = "linear-gradient(150deg,#cdd3bd,#a3ac88)";
const CARD_HATCH =
  "repeating-linear-gradient(135deg,rgba(255,255,255,.13) 0,rgba(255,255,255,.13) 2px,transparent 2px,transparent 18px)";

function FilterRow({
  label,
  options,
  active,
  onPick,
}: {
  label: string;
  options: readonly string[];
  active: string;
  onPick: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <span className="w-[74px] flex-none pt-[11px] text-[11px] font-bold tracking-[.16em] text-[#9A9C8C]">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const on = opt === active;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onPick(opt)}
              className={cn(
                "cursor-pointer whitespace-nowrap rounded-full border-[1.5px] px-4 py-[9px] text-[13.5px] font-semibold transition-colors",
                on
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border-strong bg-transparent text-[#5C6052] hover:border-primary hover:text-foreground",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProjectCard({ p }: { p: WorkProject }) {
  return (
    // TODO(content): link to the case study once those pages exist.
    <div className="flex flex-col overflow-hidden rounded-[18px] border-[1.5px] border-border bg-card transition-colors hover:border-primary">
      <div className="relative h-[172px] overflow-hidden" style={{ background: CARD_BG }}>
        <div className="absolute inset-0" style={{ backgroundImage: CARD_HATCH }} />
        <span className="absolute right-3 top-3 rounded-full bg-[rgba(241,239,232,.94)] px-[11px] py-[5px] text-[11px] font-bold text-status-paid-fg">
          {p.platform}
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-[rgba(20,24,16,.5)] px-[11px] py-[5px] text-[11px] font-semibold tracking-[.04em] text-[#EDEEE3] backdrop-blur-sm">
          {p.style}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-[18px] pb-5">
        <div className="text-[11px] font-bold tracking-[.14em] text-[#9A9C8C]">{p.industry}</div>
        <div className="text-[18px] font-bold tracking-[-.01em]">{p.name}</div>
        <div className="mt-auto flex items-center gap-2 pt-3">
          <span className="size-[7px] rounded-full bg-[#6E7A60]" />
          <span className="text-[13px] font-semibold text-[#5C6052]">{p.metric}</span>
        </div>
      </div>
    </div>
  );
}

export function WorkGallery() {
  const [industry, setIndustry] = useState<string>("All");
  const [style, setStyle] = useState<string>("All");

  const filtered = useMemo(
    () =>
      PROJECTS.filter(
        (p) =>
          (industry === "All" || p.industry === industry) &&
          (style === "All" || p.style === style),
      ),
    [industry, style],
  );

  const anyFilter = industry !== "All" || style !== "All";
  const countLabel = `${filtered.length} ${filtered.length === 1 ? "project" : "projects"}`;
  const clearAll = () => {
    setIndustry("All");
    setStyle("All");
  };

  return (
    <>
      {/* filters */}
      <section className="mx-auto max-w-[1240px] px-8 pt-[30px] pb-2">
        <div className="flex flex-col gap-4 border-y-[1.5px] border-[#DAD6C9] py-[22px]">
          <FilterRow label="INDUSTRY" options={INDUSTRIES} active={industry} onPick={setIndustry} />
          <FilterRow label="STYLE" options={STYLES} active={style} onPick={setStyle} />
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="text-[13.5px] font-medium text-[#6E7263]">
            Showing <span className="font-bold text-foreground">{countLabel}</span>
          </div>
          {anyFilter ? (
            <button
              type="button"
              onClick={clearAll}
              className="cursor-pointer text-[13.5px] font-semibold text-primary underline underline-offset-[3px]"
            >
              Clear filters ✕
            </button>
          ) : null}
        </div>
      </section>

      {/* grid */}
      <section className="mx-auto min-h-[380px] max-w-[1240px] px-8 pb-10 pt-[14px]">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard key={p.name} p={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-[18px] border-[1.5px] border-dashed border-border-strong bg-card px-6 py-16 text-center">
            <div className="mb-2 text-[20px] font-bold tracking-[-.01em]">
              No projects match that combination
            </div>
            <p className="mb-5 text-[14.5px] text-[#6E7263]">
              Try a different industry or style, or clear the filters to see everything.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="cursor-pointer whitespace-nowrap rounded-full bg-primary px-[22px] py-3 text-[14px] font-semibold text-primary-foreground transition-colors hover:bg-ink"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
