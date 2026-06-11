import type { Metadata } from "next";

import { ServicePage } from "@/components/marketing/service/service-page";
import { SERVICE_DATA } from "@/lib/service-data";

export const metadata: Metadata = {
  title: "WordPress Development | Derrick Valentine",
  description:
    "Custom WordPress builds, redesigns, rescues, and migrations. Fast, secure, and easy for your team to update, with a clear price up front.",
};

const service = SERVICE_DATA.wordpress!;

export default function WordPressServicePage() {
  return <ServicePage service={service} />;
}
