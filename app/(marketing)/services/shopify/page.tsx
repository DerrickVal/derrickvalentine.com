import type { Metadata } from "next";

import { ServicePage } from "@/components/marketing/service/service-page";
import { SERVICE_DATA } from "@/lib/service-data";

export const metadata: Metadata = {
  title: "Shopify Development | Derrick Valentine",
  description:
    "Shopify stores that load fast and sell. New builds, redesigns, migrations, and speed work, with a clear price up front.",
};

const service = SERVICE_DATA.shopify!;

export default function ShopifyServicePage() {
  return <ServicePage service={service} />;
}
