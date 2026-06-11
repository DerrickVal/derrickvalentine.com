import {
  ProcessTimeline,
  type ProcessStep,
} from "@/components/marketing/process-timeline";

const STEPS: ProcessStep[] = [
  {
    n: "01",
    title: "Quick call",
    body: "15 minutes. Your platform, your goals, and a real number, no pressure, no pitch.",
    above: false,
  },
  {
    n: "02",
    title: "Plan & price",
    body: "I scope it, price it, and set a timeline, fixed, in writing, before any work starts.",
    above: true,
  },
  {
    n: "03",
    title: "Build",
    body: "You watch it come together, and upload your content, right inside your client portal.",
    above: false,
  },
  {
    n: "04",
    title: "Launch & care",
    body: "We go live, then I keep it fast, secure, and up to date. You focus on the business.",
    above: true,
  },
];

export function HomeProcess() {
  return (
    <ProcessTimeline
      headingLines={["Simple steps from", "call to launch"]}
      steps={STEPS}
    />
  );
}
