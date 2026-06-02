import Navbar from "@/components/layout/navbar";
import HeroSection from "@/components/shadcn-studio/blocks/hero-section-37/hero-section-37";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <HeroSection />
      </main>
    </div>
  );
}
