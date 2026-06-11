"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, CircleDollarSign, Clock, Video } from "lucide-react";

import { cn } from "@/lib/utils";

// Scheduler SHELL: a working month/day/time picker with placeholder availability.
// TODO(integration): wire to a real calendar (Cal.com / Google) so slots + booking
// are live; right now availability is deterministic-fake and "Schedule" is local.

const DOW = ["S", "M", "T", "W", "T", "F", "S"];
const SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

const AVATAR = "linear-gradient(150deg,#c3cbb0,#8d976f)";

function startOfToday() {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
}

// Client-only "today" via useSyncExternalStore: the server + hydration snapshot
// is null (so the prerendered HTML never bakes in a stale date that would
// hydrate-mismatch once the build ages), then it fills in on the client. Cached
// so getSnapshot stays stable.
let cachedToday: Date | null = null;
const getClientToday = () => (cachedToday ??= startOfToday());
const subscribeToday = () => () => {};

export function Scheduler() {
  const today = useSyncExternalStore(subscribeToday, getClientToday, () => null);
  const [monthOffset, setMonthOffset] = useState(0);
  const [dateKey, setDateKey] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const month = useMemo(() => {
    if (!today) return null;
    const base = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const year = base.getFullYear();
    const m = base.getMonth();
    const firstDow = new Date(year, m, 1).getDay();
    const days = new Date(year, m + 1, 0).getDate();
    const cells: ({ d: number; key: string; available: boolean } | null)[] = [];
    for (let i = 0; i < firstDow; i++) cells.push(null);
    for (let d = 1; d <= days; d++) {
      const date = new Date(year, m, d);
      const dow = date.getDay();
      cells.push({
        d,
        key: `${year}-${m}-${d}`,
        available: date >= today && dow !== 0 && dow !== 6,
      });
    }
    return {
      label: base.toLocaleString("en-US", { month: "long", year: "numeric" }),
      cells,
    };
  }, [today, monthOffset]);

  const selectedLabel = useMemo(() => {
    if (!dateKey) return "";
    const [y, m, d] = dateKey.split("-").map(Number);
    return new Date(y, m, d).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }, [dateKey]);

  const canConfirm = !!(dateKey && time);
  const confirmSummary = canConfirm ? `${selectedLabel} at ${time}` : "";
  const dayNum = dateKey ? parseInt(dateKey.split("-")[2], 10) : 0;

  if (confirmed) {
    return (
      <div className="mx-auto max-w-[560px] rounded-[22px] border-[1.5px] border-border bg-card px-9 py-10 text-center shadow-[0_24px_50px_-34px_rgba(40,38,32,.4)]">
        <div className="mx-auto mb-[22px] flex size-[66px] items-center justify-center rounded-full bg-primary text-[30px] text-primary-foreground">
          ✓
        </div>
        <h2 className="mb-2.5 text-[30px] font-extrabold uppercase tracking-[-.025em]">
          You’re booked!
        </h2>
        <p className="mx-auto mb-6 max-w-[380px] text-[15.5px] leading-[1.6] text-[#5C6052]">
          A calendar invite with the Google Meet link is on its way to your inbox.
          Talk soon.
        </p>
        <div className="mb-[26px] flex flex-col gap-3.5 rounded-[14px] border-[1.5px] border-border bg-white p-5 text-left">
          <div className="flex items-center gap-3.5">
            <span className="flex size-10 flex-none items-center justify-center rounded-[10px] bg-muted text-primary">
              <Clock className="size-4" />
            </span>
            <div>
              <div className="text-[12px] font-semibold text-[#9A9C8C]">WHEN</div>
              <div className="text-[15px] font-bold">{confirmSummary}</div>
            </div>
          </div>
          <div className="h-px bg-[#EFEEE7]" />
          <div className="flex items-center gap-3.5">
            <span className="flex size-10 flex-none items-center justify-center rounded-[10px] bg-muted text-primary">
              <Video className="size-4" />
            </span>
            <div>
              <div className="text-[12px] font-semibold text-[#9A9C8C]">WHERE</div>
              <div className="text-[15px] font-bold">Google Meet · link in your invite</div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            className="cursor-pointer whitespace-nowrap rounded-full bg-primary px-[26px] py-3.5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-ink"
          >
            Add to calendar
          </button>
          <button
            type="button"
            onClick={() => {
              setConfirmed(false);
              setDateKey(null);
              setTime(null);
            }}
            className="cursor-pointer whitespace-nowrap rounded-full border-[1.5px] border-primary px-6 py-3.5 text-[15px] font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Pick another time
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-[22px] border-[1.5px] border-border bg-card shadow-[0_24px_50px_-34px_rgba(40,38,32,.4)]">
        <div className="grid grid-cols-1 lg:grid-cols-[288px_minmax(0,1fr)_268px]">
          {/* meeting info */}
          <div className="flex flex-col border-b-[1.5px] border-[#EFEEE7] p-7 lg:border-b-0 lg:border-r-[1.5px]">
            <div className="mb-5 flex items-center gap-[11px]">
              <span
                className="flex size-11 items-center justify-center rounded-full text-[15px] font-extrabold text-[#2b3324]"
                style={{ background: AVATAR }}
              >
                DV
              </span>
              <div className="min-w-0">
                <div className="whitespace-nowrap text-[12.5px] font-semibold text-[#9A9C8C]">
                  Derrick Valentine
                </div>
                <div className="whitespace-nowrap text-[14px] font-bold">Web developer</div>
              </div>
            </div>
            <h2 className="mb-3.5 text-[22px] font-extrabold leading-[1.1] tracking-[-.02em]">
              15-min intro call
            </h2>
            <div className="mb-[22px] flex flex-col gap-3 text-[13.5px] text-[#5C6052]">
              <div className="flex items-center gap-2.5">
                <Clock className="size-[18px] flex-none text-[#6E7A60]" /> 15 minutes
              </div>
              <div className="flex items-center gap-2.5">
                <Video className="size-[18px] flex-none text-[#6E7A60]" /> Google Meet (link sent
                after)
              </div>
              <div className="flex items-center gap-2.5">
                <CircleDollarSign className="size-[18px] flex-none text-[#6E7A60]" /> Free · no
                obligation
              </div>
            </div>
            <div className="mt-auto border-t-[1.5px] border-[#EFEEE7] pt-[18px]">
              <div className="mb-2.5 text-[11px] font-bold tracking-[.14em] text-[#9A9C8C]">
                WHAT WE’LL COVER
              </div>
              <div className="flex flex-col gap-2 text-[13px] leading-[1.45] text-[#5C6052]">
                {[
                  "Your platform & what’s not working",
                  "What you want the site to do",
                  "A real number and a timeline",
                ].map((line) => (
                  <div key={line} className="flex gap-2">
                    <span className="text-[#6E7A60]">→</span>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* calendar */}
          <div className="p-7">
            <div className="mb-[18px] flex items-center justify-between">
              <div className="text-[16px] font-bold tracking-[-.01em]">{month?.label ?? ""}</div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous month"
                  onClick={() => setMonthOffset((o) => Math.max(0, o - 1))}
                  className="flex size-[34px] cursor-pointer items-center justify-center rounded-[9px] border-[1.5px] border-border-strong bg-white text-nav-fg transition-colors hover:border-primary"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next month"
                  onClick={() => setMonthOffset((o) => o + 1)}
                  className="flex size-[34px] cursor-pointer items-center justify-center rounded-[9px] border-[1.5px] border-border-strong bg-white text-nav-fg transition-colors hover:border-primary"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
            <div className="min-h-[286px]">
              {month ? (
                <>
                  <div className="mb-2 grid grid-cols-7 gap-1">
                    {DOW.map((l, i) => (
                      <div
                        key={i}
                        className="text-center text-[11px] font-bold text-[#9A9C8C]"
                      >
                        {l}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {month.cells.map((c, i) => {
                      if (!c) return <div key={`e${i}`} />;
                      if (!c.available) {
                        return (
                          <div
                            key={c.key}
                            className="flex h-[42px] items-center justify-center rounded-[10px] text-[14px] font-semibold text-[#CAC7BD]"
                          >
                            {c.d}
                          </div>
                        );
                      }
                      return (
                        <button
                          key={c.key}
                          type="button"
                          onClick={() => {
                            setDateKey(c.key);
                            setTime(null);
                          }}
                          className={cn(
                            "flex h-[42px] cursor-pointer items-center justify-center rounded-[10px] text-[14px] font-semibold transition-colors",
                            dateKey === c.key
                              ? "bg-primary text-primary-foreground"
                              : "border-[1.5px] border-border bg-background text-foreground hover:border-primary",
                          )}
                        >
                          {c.d}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : null}
            </div>
            <div className="mt-4 flex items-center gap-4 text-[11.5px] text-[#9A9C8C]">
              <div className="flex items-center gap-1.5">
                <span className="size-[11px] rounded-[4px] border border-border-strong bg-background" />
                Available
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-[11px] rounded-[4px] bg-primary" />
                Selected
              </div>
              <div className="ml-auto text-[#A7A59C]">Times sync live from my calendar</div>
            </div>
          </div>

          {/* slots */}
          <div className="border-t-[1.5px] border-[#EFEEE7] bg-card-2 p-7 lg:border-l-[1.5px] lg:border-t-0">
            {dateKey ? (
              <div>
                <div className="mb-1 text-[11px] font-bold tracking-[.14em] text-[#9A9C8C]">
                  SELECT A TIME
                </div>
                <div className="mb-4 text-[14.5px] font-bold">{selectedLabel}</div>
                <div className="flex max-h-[300px] flex-col gap-2 overflow-y-auto pr-1">
                  {SLOTS.map((t, i) => {
                    const taken = (i * 3 + dayNum) % 5 === 0;
                    if (taken) {
                      return (
                        <div
                          key={t}
                          className="rounded-[10px] border-[1.5px] border-[#EAE7DC] p-3 text-center text-[14px] font-semibold text-[#CAC7BD] line-through"
                        >
                          {t}
                        </div>
                      );
                    }
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        className={cn(
                          "cursor-pointer rounded-[10px] border-[1.5px] p-3 text-center text-[14px] font-semibold transition-colors",
                          time === t
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border-strong bg-white text-foreground hover:border-primary",
                        )}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 text-center">
                <span className="flex size-12 items-center justify-center rounded-[13px] bg-muted text-[#9A9C8C]">
                  <Clock className="size-5" />
                </span>
                <div className="max-w-[160px] text-[13.5px] leading-[1.5] text-[#9A9C8C]">
                  Pick a day on the left to see open times.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* confirm bar */}
        <div className="flex flex-wrap items-center justify-between gap-[18px] border-t-[1.5px] border-[#EFEEE7] bg-card px-7 py-[18px]">
          {canConfirm ? (
            <div className="text-[14.5px] font-semibold text-nav-fg">
              15-min call · <span className="font-bold text-foreground">{confirmSummary}</span>
            </div>
          ) : (
            <div className="text-[14px] font-medium text-[#9A9C8C]">
              Select a date and time to continue.
            </div>
          )}
          {canConfirm ? (
            <button
              type="button"
              onClick={() => setConfirmed(true)}
              className="inline-flex cursor-pointer items-center gap-[9px] whitespace-nowrap rounded-full bg-primary px-7 py-3.5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-ink"
            >
              Schedule call <span className="text-[17px]">→</span>
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="cursor-not-allowed whitespace-nowrap rounded-full bg-[#D7D2C4] px-7 py-3.5 text-[15px] font-semibold text-[#9A9C8C]"
            >
              Schedule call
            </button>
          )}
        </div>
      </div>
      <p className="mt-[18px] text-center text-[12.5px] text-[#9A9C8C]">
        All times shown in your local timezone.
      </p>
    </>
  );
}
