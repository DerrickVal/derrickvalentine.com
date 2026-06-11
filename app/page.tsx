import Image from "next/image";

import HeroSection from "@/components/shadcn-studio/blocks/hero-section-37/hero-section-37";
import Features from "@/components/shadcn-studio/blocks/features-section-01/features-section-01";
import CompareUILib from "@/components/shadcn-studio/blocks/compare-01/compare-01";
import SocialProof from "@/components/shadcn-studio/blocks/social-proof-01/social-proof-01";
import TestimonialsComponent, {
  type TestimonialItem,
} from "@/components/shadcn-studio/blocks/testimonials-component-01/testimonials-component-01";
import CTA from "@/components/shadcn-studio/blocks/cta-section-01/cta-section-01";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutTemplate, PenLine, Server, RefreshCw, Phone } from "lucide-react";

// ── Section 3: what I take off your plate ───────────────────────────────────
const featuresList = [
  {
    icon: LayoutTemplate,
    title: "Design & build",
    description:
      "A site that looks like you and works on every screen, not just the one I built it on.",
    cardBorderColor: "border-primary/40 hover:border-primary",
    avatarTextColor: "text-primary",
    avatarBgColor: "bg-primary/10",
  },
  {
    icon: PenLine,
    title: "Words, too",
    description:
      'No copy? Send me bullet points and I\'ll write it. No surprise "content fee."',
    cardBorderColor:
      "border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400",
    avatarTextColor: "text-green-600 dark:text-green-400",
    avatarBgColor: "bg-green-600/10 dark:bg-green-400/10",
  },
  {
    icon: Server,
    title: "Hosting",
    description:
      "I host it. You'll never log into some hosting company you've never heard of.",
    cardBorderColor:
      "border-amber-600/40 hover:border-amber-600 dark:border-amber-400/40 dark:hover:border-amber-400",
    avatarTextColor: "text-amber-600 dark:text-amber-400",
    avatarBgColor: "bg-amber-600/10 dark:bg-amber-400/10",
  },
  {
    icon: RefreshCw,
    title: "Updates",
    description:
      "New photo, new service, new hours? Text me. Usually live within 48 hours.",
    cardBorderColor:
      "border-sky-600/40 hover:border-sky-600 dark:border-sky-400/40 dark:hover:border-sky-400",
    avatarTextColor: "text-sky-600 dark:text-sky-400",
    avatarBgColor: "bg-sky-600/10 dark:bg-sky-400/10",
  },
  {
    icon: Phone,
    title: "One person",
    description:
      "No account managers, no bid threads. You get me, by call or text.",
    cardBorderColor: "border-destructive/40 hover:border-destructive",
    avatarTextColor: "text-destructive",
    avatarBgColor: "bg-destructive/10",
  },
];

// ── Section 4: how it works (custom 3-step; no Studio block fit) ─────────────
const steps = [
  {
    n: "1",
    title: "Send me your site",
    body: "Book a free Website Review. I'll look at what you've got and tell you, plainly, what I'd fix and what it would cost.",
  },
  {
    n: "2",
    title: "I redesign it",
    body: "You send your photos and the words (or I write them). I handle the rest: design, build, the nerdy parts.",
  },
  {
    n: "3",
    title: "I keep it running",
    body: "I host it and maintain it. Anything you need after launch is one text away.",
  },
];

// ── Section 6: me vs the alternatives ────────────────────────────────────────
const compareRowData = [
  {
    name: "What it's like",
    isKey: true,
    columnData: [
      "Who you deal with",
      "Getting changes done",
      "Hosting & maintenance",
      "Copywriting",
      "When life happens",
      "Pricing",
    ],
  },
  {
    name: "Typical agency",
    columnData: [
      "A sales rep + a rotating team",
      "File a ticket and wait",
      "Often extra, or a third party",
      "An add-on, upcharged",
      "Reschedule fees, rigid process",
      "Padded for overhead",
    ],
  },
  {
    name: "Derrick",
    isHighlighted: true,
    columnData: [
      "Me, the person who builds it",
      "Text me; usually live in 48 hours",
      "I host it and maintain it",
      "I'll write it, no crazy upcharge",
      "Reschedule freely, no shame",
      "Fair, flat, all-in",
    ],
  },
  {
    name: "Freelance marketplace",
    columnData: [
      "A faceless bid (or a ghost)",
      "Hope they reply",
      "Your problem to solve",
      "Per-word haggling",
      "Hit or miss",
      "Race to the bottom, or surprise scope",
    ],
  },
];

// ── Section 7: bona fides ────────────────────────────────────────────────────
const socialProofFeatures = [
  { title: "10+ years building and looking after websites", description: "" },
  { title: "One point of contact, by call or text", description: "" },
  { title: "Hosting, updates, and the nerdy parts, handled", description: "" },
  { title: "Every niche: nonprofits, trades, creatives, local business", description: "" },
];

// ── Section 8: testimonials (real quotes, names, and photos from the old site) ─
const testimonials: TestimonialItem[] = [
  {
    name: "Khari Bell",
    role: "Chef",
    company: "The Kulinary Project",
    avatar: "/testimonials/khari-bell.jpg",
    rating: 5,
    content:
      "Working with Derrick has made my life so easy. He quickly understood my vision and created a mockup to match it. All I had to do was upload my images and send him the text, and he handled everything else while I ran my business. The best part has been after: if I ever need anything, I know I can just call him and the site will be updated in 48 hours.",
  },
  {
    name: "Clarence Miles",
    role: "Executive Director",
    company: "Uniting Our Youth",
    avatar: "/testimonials/clarence-miles.jpg",
    rating: 5,
    content:
      "Derrick is great. He went above and beyond to understand how my nonprofit worked, even spending several days volunteering at one of my locations to better understand how we operate. Since getting my site redone, I've received 3 new funders who found me through the website alone.",
  },
  {
    name: "Shanelle Harrison",
    role: "Artist",
    company: "",
    avatar: "/testimonials/shanelle-harrison.jpg",
    rating: 5,
    content:
      "I've made several websites with Derrick over the years: my portfolio, the site for my book, and my skincare line. If I need web work done, I only work with Derrick. It's nice knowing that if I hand a project to him, it's going to be handled properly and with care.",
  },
  {
    name: "Kayleigh Brown",
    role: "Photographer",
    company: "",
    avatar: "/testimonials/kayleigh-brown.jpg",
    rating: 5,
    content:
      "When I met Derrick I was already working with a web development team. He gave me free advice about growing my brand and what I should consider doing. When that team fell through, I called him to finish the project. I wish I'd started with him. There's no comparison.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
        <HeroSection />

        <Features featuresList={featuresList} />

        {/* How it works */}
        <section className="py-8 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 space-y-4 sm:mb-16">
              <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">How it works</h2>
              <p className="text-muted-foreground text-xl">
                From your current site to handled, in three steps.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {steps.map((step) => (
                <Card key={step.n} className="shadow-none">
                  <CardContent>
                    <span className="bg-primary text-primary-foreground mb-6 flex size-10 items-center justify-center rounded-md text-lg font-semibold">
                      {step.n}
                    </span>
                    <h6 className="mb-2 text-lg font-semibold">{step.title}</h6>
                    <p className="text-muted-foreground">{step.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Before / After — real MCRC Howard County redesign (interactive slider TODO) */}
        <section className="py-8 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 space-y-4 text-center">
              <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
                Same organization. A very different website.
              </h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                A recent redesign for the Mediation &amp; Conflict Resolution Center of Howard County.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <figure className="overflow-hidden rounded-xl border">
                <figcaption className="bg-muted text-muted-foreground px-4 py-2 text-sm font-medium">
                  Before
                </figcaption>
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/work/mcrchoward/before/home.jpg"
                    alt="MCRC Howard County, original site"
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              </figure>
              <figure className="overflow-hidden rounded-xl border">
                <figcaption className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">
                  After
                </figcaption>
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/work/mcrchoward/after/home.jpg"
                    alt="MCRC Howard County redesign"
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              </figure>
            </div>
          </div>
        </section>

        <CompareUILib rowdata={compareRowData} />

        <SocialProof features={socialProofFeatures} />

        <TestimonialsComponent testimonials={testimonials} />

        <CTA />
    </main>
  );
}
