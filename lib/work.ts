// Portfolio data for /work. Placeholder projects + the two filter axes, verbatim
// from design-reference/Work.dc.html (the `class Component`). Real case studies
// (with before/after media) land later under public/work/<slug>/.
// TODO(content): replace with Derrick's real ~7 case studies.

export interface WorkProject {
  name: string;
  industry: (typeof INDUSTRIES)[number];
  platform: string;
  style: (typeof STYLES)[number];
  metric: string;
}

export const INDUSTRIES = [
  "All",
  "Roofing",
  "Restaurant",
  "Salon",
  "E-commerce",
  "Legal",
  "Healthcare",
] as const;

export const STYLES = ["All", "Bold", "Minimal", "Classic", "Playful"] as const;

export const PROJECTS: WorkProject[] = [
  { name: "Northside Roofing", industry: "Roofing", platform: "WordPress", style: "Bold", metric: "+38% estimate calls" },
  { name: "Maple & Vine", industry: "Restaurant", platform: "Squarespace", style: "Classic", metric: "+30% reservations" },
  { name: "Studio Bloom", industry: "Salon", platform: "Webflow", style: "Minimal", metric: "+44% time on site" },
  { name: "Harbor Goods", industry: "E-commerce", platform: "Shopify", style: "Bold", metric: "+52% mobile conv." },
  { name: "Reyes Law", industry: "Legal", platform: "Webflow", style: "Classic", metric: "2× consultations" },
  { name: "Peak Dental", industry: "Healthcare", platform: "WordPress", style: "Minimal", metric: "+27% bookings" },
  { name: "Cedar & Co", industry: "Restaurant", platform: "Webflow", style: "Playful", metric: "Booked-out weekends" },
  { name: "Summit Roofing", industry: "Roofing", platform: "Squarespace", style: "Minimal", metric: "Cleaner quote flow" },
  { name: "Glow Bar", industry: "Salon", platform: "Squarespace", style: "Playful", metric: "+40% gift cards" },
  { name: "Ironclad Fitness", industry: "E-commerce", platform: "Shopify", style: "Bold", metric: "+33% order value" },
  { name: "Hartwell Clinic", industry: "Healthcare", platform: "Squarespace", style: "Classic", metric: "Faster intake" },
  { name: "Vellum Studio", industry: "E-commerce", platform: "Webflow", style: "Minimal", metric: "+48% conversion" },
];
