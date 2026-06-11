import type { Metadata } from "next";

import { ServicePage } from "@/components/marketing/service/service-page";
import { SERVICE_DATA } from "@/lib/service-data";

export const metadata: Metadata = {
  title: "Squarespace Development | Derrick Valentine",
  description:
    "Clean, professional Squarespace sites set up fast, styled past the template and tuned for search, with a clear price up front.",
};

const service = SERVICE_DATA.squarespace!;

export default function SquarespaceServicePage() {
  return <ServicePage service={service} />;
}
