import { SectionLabel } from "@/components/site/section-label";

export function HomeTestimonial() {
  return (
    <section className="bg-band">
      <div className="mx-auto max-w-[980px] px-8 py-[72px] text-center">
        <SectionLabel className="text-[#7D8A6E]">TESTIMONIAL</SectionLabel>
        {/* TODO(content): real testimonial */}
        <p className="mx-auto mt-[26px] mb-[30px] text-[clamp(22px,2.9vw,34px)] font-semibold leading-[1.32] tracking-[-0.015em] text-band-foreground">
          “Derrick rebuilt our site in a{" "}
          <span className="text-[#8C977A]">week</span> and it finally looks like
          the company we actually are. And when something comes up,{" "}
          <span className="text-[#8C977A]">he picks up the phone.</span>”
        </p>
        <div className="flex items-center justify-center gap-[18px]">
          <button
            type="button"
            aria-label="Previous testimonial"
            className="flex size-[42px] items-center justify-center rounded-full border-[1.5px] border-[#B4BFA6] text-[16px] text-[#4A5340] transition-colors hover:bg-[#cdd6c1]"
          >
            ←
          </button>
          <div>
            <div className="text-[14px] font-bold text-band-foreground">
              Marcus Reyes
            </div>
            <div className="mt-0.5 text-[12.5px] text-[#69735C]">Owner, Reyes Law</div>
          </div>
          <button
            type="button"
            aria-label="Next testimonial"
            className="flex size-[42px] items-center justify-center rounded-full border-[1.5px] border-[#B4BFA6] text-[16px] text-[#4A5340] transition-colors hover:bg-[#cdd6c1]"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
