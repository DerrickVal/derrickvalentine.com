import Link from "next/link";

const HERO_BG = "linear-gradient(160deg,#3c4a30 0%,#2c3623 55%,#222a1c 100%)";
const HERO_HATCH =
  "repeating-linear-gradient(125deg,rgba(255,255,255,.05) 0,rgba(255,255,255,.05) 2px,transparent 2px,transparent 26px)";
const HERO_GLOW =
  "radial-gradient(120% 90% at 70% 10%,rgba(150,170,120,.28),transparent 60%)";
const THUMB_BG = "linear-gradient(150deg,#c3cbb0,#9aa384)";
const THUMB_HATCH =
  "repeating-linear-gradient(135deg,rgba(255,255,255,.12) 0,rgba(255,255,255,.12) 2px,transparent 2px,transparent 14px)";

export function HomeHero() {
  return (
    <section className="mx-auto max-w-[1240px] px-8 pt-2 pb-8">
      <div
        className="relative flex min-h-[520px] flex-col justify-end overflow-hidden rounded-[24px] p-6 sm:p-12 lg:min-h-[640px]"
        style={{ background: HERO_BG }}
      >
        {/* video placeholder layers — drop public/hero.mp4 in later */}
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: HERO_HATCH }} />
        <div className="absolute inset-0" style={{ background: HERO_GLOW }} />

        {/* REC chip */}
        <div className="absolute left-[22px] top-[22px] flex items-center gap-[9px] rounded-full border border-white/15 bg-[rgba(20,24,16,.42)] px-3.5 py-2 backdrop-blur-sm">
          <span className="size-2 animate-[rec-pulse_1.8s_ease-in-out_infinite] rounded-full bg-[#E4684A]" />
          <span className="text-[11px] font-semibold tracking-[.14em] text-[#E9EAE0]">
            VIDEO · hero loop
          </span>
        </div>

        {/* trust badge — hidden below lg */}
        <div className="absolute right-[22px] top-[22px] hidden items-center gap-[14px] rounded-[14px] bg-[rgba(241,239,232,.94)] px-[18px] py-[13px] lg:flex">
          {/* TODO(content): real stats */}
          <div>
            <div className="text-[19px] font-extrabold leading-none tracking-[-.02em]">120+</div>
            <div className="mt-[3px] text-[11px] text-[#5C6052]">sites shipped</div>
          </div>
          <div className="h-[30px] w-px bg-[#D2CDBF]" />
          <div>
            <div className="text-[19px] font-extrabold leading-none tracking-[-.02em]">4.9★</div>
            <div className="mt-[3px] text-[11px] text-[#5C6052]">avg. rating</div>
          </div>
        </div>

        {/* floating featured card — hidden below lg */}
        <Link
          href="/work"
          className="absolute right-9 top-24 hidden w-[236px] animate-[float_6s_ease-in-out_infinite] rounded-[18px] bg-[rgba(241,239,232,.96)] p-3.5 text-foreground shadow-[0_24px_50px_-22px_rgba(0,0,0,.5)] lg:block"
        >
          <div className="mb-[11px] flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-[.18em] text-muted-foreground">
              FEATURED
            </span>
            <span className="flex size-[26px] items-center justify-center rounded-full bg-primary text-[13px] text-primary-foreground">
              ↗
            </span>
          </div>
          <div className="relative mb-[11px] h-[104px] overflow-hidden rounded-[11px]" style={{ background: THUMB_BG }}>
            <div className="absolute inset-0" style={{ backgroundImage: THUMB_HATCH }} />
          </div>
          {/* TODO(content): real featured project */}
          <div className="text-[14px] font-bold">Northside Roofing</div>
          <div className="mt-0.5 text-[12px] text-muted-foreground">
            WordPress rebuild · +38% leads
          </div>
        </Link>

        {/* hero content */}
        <div className="relative max-w-[780px]">
          <div className="mb-[26px] inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3.5 py-[7px]">
            <span className="size-[7px] rounded-full bg-[#9DB07E]" />
            <span className="text-[12.5px] font-medium tracking-[.02em] text-[#E4E5DA]">
              Solo developer · available this month
            </span>
          </div>
          <h1 className="text-[clamp(40px,6.4vw,82px)] font-extrabold uppercase leading-[.96] tracking-[-.03em] text-[#F3F2EA]">
            One developer.
            <br />
            <span className="text-accent-on-dark">Every platform.</span>
            <br />
            No runaround.
          </h1>
          <p className="mt-6 max-w-[520px] text-[clamp(15px,1.5vw,18px)] font-medium leading-[1.55] text-[#D9DBCD]">
            Shopify, Webflow, WordPress, Squarespace. I design, build, and look
            after sites for businesses that want it done right the first time.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-[13px]">
            <Link
              href="/book"
              className="inline-flex items-center gap-[9px] whitespace-nowrap rounded-full bg-background px-[30px] py-4 text-[15.5px] font-semibold text-foreground transition-colors hover:bg-white"
            >
              Book a call <span className="text-[17px]">→</span>
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center rounded-full border-[1.5px] border-[rgba(241,239,232,.55)] px-7 py-4 text-[15.5px] font-semibold text-[#F1EFE8] transition-colors hover:border-[#F1EFE8]"
            >
              Explore work
            </Link>
            <div className="ml-1.5 flex items-center gap-3 text-[13px] font-semibold tracking-[.08em] text-[#C7CABA]">
              <span className="text-[#F1EFE8]">01</span>
              <span className="h-[1.5px] w-[54px] bg-[rgba(241,239,232,.4)]" />
              <span>03</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
