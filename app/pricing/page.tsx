import type { Metadata } from "next";

import Pricing, {
  type PricingPlan,
} from "@/components/shadcn-studio/blocks/pricing-component-08/pricing-component-08";
import FAQ from "@/components/shadcn-studio/blocks/faq-component-02/faq-component-02";
import CTA from "@/components/shadcn-studio/blocks/cta-section-01/cta-section-01";
import { Button } from "@/components/ui/button";
import { DollarSign, Scale, RefreshCw, KeyRound, PenLine } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | Derrick Valentine",
  description:
    "Straight pricing for a website redesign. Real ranges, all-in, no surprise line items, plus monthly Care Plans to keep it running.",
};

const projectTiers: PricingPlan[] = [
  {
    name: "Website Refresh",
    price: "$2,500–$3,500",
    description:
      "A facelift, not a teardown. For a site that's basically fine but looks dated. Best for a small business that just needs to look current again.",
    buttonText: "Request a Website Review",
    buttonHref: "/contact",
    features: [
      "1–3 pages",
      "Homepage redesign",
      "Mobile cleanup",
      "Basic copy cleanup",
      "Contact form",
      "CTA improvements",
      "Basic SEO titles & meta",
      "Launch support",
    ],
  },
  {
    name: "Small Business Redesign",
    price: "$5,000–$7,500",
    highlighted: true,
    description:
      "The full rebuild most businesses actually need. Best for contractors, consultants, wellness practices, nonprofits, and local service businesses.",
    buttonText: "Request a Website Review",
    buttonHref: "/contact",
    features: [
      "5–7 pages",
      "Homepage redesign",
      "Service pages",
      "About page",
      "Contact / request-a-quote page",
      "Copywriting assistance",
      "Mobile-first redesign",
      "Local SEO structure",
      "Speed & performance cleanup",
      "Basic on-page SEO",
      "301 redirects (if replacing an old site)",
      "Launch checklist",
    ],
  },
  {
    name: "Premium Redesign + Growth",
    price: "$9,500–$15,000",
    description:
      "For when you want the site to bring in work, not just look good. Best for businesses ready to invest in strategy, content, and conversion.",
    buttonText: "Request a Website Review",
    buttonHref: "/contact",
    features: [
      "8–15 pages",
      "Strategy session",
      "Full content rewrite",
      "Conversion-focused service pages",
      "Local SEO landing pages",
      "Portfolio / case-study setup",
      "Blog / resource structure",
      "Analytics setup",
      "CRM / email integration",
      "Booking or quote-request system",
      "Redirect map",
      "30-day post-launch support",
    ],
  },
];

const carePlans: PricingPlan[] = [
  {
    name: "Basic Care",
    price: "$150–$250",
    period: "/mo",
    description: "The lights stay on and the site stays safe.",
    buttonText: "Request a Website Review",
    buttonHref: "/contact",
    features: ["Hosting", "Backups", "Software updates", "Uptime monitoring"],
  },
  {
    name: "Growth Care",
    price: "$350–$500",
    period: "/mo",
    highlighted: true,
    description: "Everything in Basic, plus small monthly edits. Just text me.",
    buttonText: "Request a Website Review",
    buttonHref: "/contact",
    features: [
      "Everything in Basic Care",
      "Small monthly edits",
      "New photos & copy tweaks",
      "A page here and there",
    ],
  },
  {
    name: "Partner Care",
    price: "$750–$1,500",
    period: "/mo",
    description: "Basically your part-time web team, on call.",
    buttonText: "Request a Website Review",
    buttonHref: "/contact",
    features: [
      "Ongoing design",
      "Ongoing development",
      "Ongoing copywriting",
      "Priority support",
    ],
  },
];

const faqItems = [
  {
    icon: DollarSign,
    title: "Why ranges instead of one price?",
    subtitle: "One fixed number after a quick look.",
    description:
      "No two sites are the same. The range covers page count and how much writing and setup you hand me. After I look at your current site, you get one fixed number, and I stick to it.",
  },
  {
    icon: Scale,
    title: "What if I'm between tiers?",
    subtitle: "We'll pick what you actually need.",
    description:
      "Then we talk. I'll point you to whichever package gets you what you need, not the bigger one.",
  },
  {
    icon: RefreshCw,
    title: "Do I have to get a Care Plan?",
    subtitle: "Totally optional.",
    description:
      "No. It's there because most people would rather never think about hosting and updates again. Skip it, and your site is still 100% yours.",
  },
  {
    icon: KeyRound,
    title: "Who owns the website?",
    subtitle: "You do. Always.",
    description:
      "You own all of it: the design, the files, the domain, the hosting login. Walk away whenever you want and take everything with you.",
  },
  {
    icon: PenLine,
    title: "Do you write the copy?",
    subtitle: "Yes, it's included.",
    description:
      "Copywriting is built into the project tiers. Send me bullet points and I'll turn them into real pages. No surprise content fee.",
  },
];

export default function PricingPage() {
  return (
    <main className="flex-1">
      {/* Intro */}
      <section className="py-8 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Straight pricing. No &ldquo;request a quote&rdquo; runaround.
          </h1>
          <p className="text-muted-foreground mt-6 text-lg">
            Most developers make you book a call just to hear a number. I&apos;d rather just tell you. Below is what a
            redesign actually costs with me. Real ranges, all-in, no surprise line items. Where you land depends on how
            many pages you need and how much writing and setup you want me to handle. After a quick look at your site,
            I&apos;ll give you one fixed number.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <a href="/contact">Request a Website Review</a>
            </Button>
            <p className="text-muted-foreground mt-3 text-sm">
              Not sure which fits? Send me your site and I&apos;ll tell you. It&apos;s free.
            </p>
          </div>
        </div>
      </section>

      <Pricing
        heading="Redesign packages"
        subheading="One-time projects. Pick the scope that fits, and I'll confirm the exact number after a quick look at your site."
        plans={projectTiers}
      />

      <Pricing
        heading="Then I keep it running"
        subheading="A site needs hosting, updates, and a human when something breaks. Pick a Care Plan and that's handled too. Month to month, cancel anytime, and your files are always yours."
        plans={carePlans}
      />

      <FAQ faqItems={faqItems} />

      <CTA />
    </main>
  );
}
