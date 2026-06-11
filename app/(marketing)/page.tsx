import { HomeHero } from "@/components/marketing/home/home-hero";
import { HomeProcess } from "@/components/marketing/home/home-process";
import { HomeServices } from "@/components/marketing/home/home-services";
import { HomeTestimonial } from "@/components/marketing/home/home-testimonial";
import { HomeValues } from "@/components/marketing/home/home-values";
import { HomeWork } from "@/components/marketing/home/home-work";
import { CtaBanner } from "@/components/site/cta-banner";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeValues />
      <HomeProcess />
      <HomeServices />
      <HomeTestimonial />
      <HomeWork />
      <CtaBanner
        line1="Ready to fix"
        line2="your website?"
        body="Book a 15-minute call. Tell me your platform and your goal, you’ll leave with a real number and a timeline."
        primary={{ label: "Book a call", href: "/book" }}
        secondary={{ label: "or send a message", href: "/contact" }}
      />
    </>
  );
}
