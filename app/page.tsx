import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { ShopByCategorySection } from "@/components/sections/shop-by-category-section";
import { CraftDetailsSection } from "@/components/sections/craft-details-section";
import { BrandPhilosophySection } from "@/components/sections/brand-philosophy-section";
import { CraftMaterialsShowcaseSection } from "@/components/sections/craft-materials-showcase-section";
import { ModularHomesSection } from "@/components/sections/modular-homes-section";
import { JournalVoicesSection } from "@/components/sections/journal-voices-section";
import { RecentlyViewedSection } from "@/components/sections/recently-viewed-section";
import { EnquiryCurveSection } from "@/components/sections/enquiry-curve-section";
import { FooterSection } from "@/components/sections/footer-section";
import { getCatalogProducts } from "@/lib/catalog";

export default async function Home() {
  const products = await getCatalogProducts();

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ShopByCategorySection products={products} />
      <CraftDetailsSection />
      <BrandPhilosophySection />
      <CraftMaterialsShowcaseSection />
      <ModularHomesSection />
      <JournalVoicesSection />
      <RecentlyViewedSection products={products} />
      <EnquiryCurveSection />
      <FooterSection />
    </main>
  );
}
