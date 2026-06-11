import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

// /book sits OUTSIDE the (marketing) group so it can pair the full nav header
// (with the CTA swapped to "Message me") with the SLIM footer, per Book a Call.dc.html.
export default function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader cta={{ label: "Message me", href: "/contact" }} />
      <main className="flex-1">{children}</main>
      <SiteFooter variant="slim" />
    </div>
  );
}
