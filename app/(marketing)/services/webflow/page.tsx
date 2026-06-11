import type { Metadata } from "next";

import { ServicePage } from "@/components/marketing/service/service-page";
import { SERVICE_DATA } from "@/lib/service-data";

export const metadata: Metadata = {
  title: "Webflow Development | Derrick Valentine",
  description:
    "Custom, animated, CMS-powered Webflow sites your team can actually run. New builds, redesigns, and migrations, with a clear price up front.",
};

const service = SERVICE_DATA.webflow!;

export default function WebflowServicePage() {
  return <ServicePage service={service} />;
}
