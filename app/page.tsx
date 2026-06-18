import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { ShopByCategorySection } from "@/components/sections/shop-by-category-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { ProductGridSection } from "@/components/sections/product-grid-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { TrustBarSection } from "@/components/sections/trust-bar-section";
import { CollectionSection } from "@/components/sections/collection-section";
import { EditorialSection } from "@/components/sections/editorial-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CTASection } from "@/components/cta-section";
import { FooterSection } from "@/components/sections/footer-section";
import { contactInfo } from "@/lib/data";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ShopByCategorySection />
      <PhilosophySection />
      <ProductGridSection />
      <FeaturedProductsSection />
      <TechnologySection />
      <GallerySection />
      <TrustBarSection />
      <CollectionSection />
      <EditorialSection />
      <TestimonialsSection />
      <CTASection
        title="Ready to Furnish Your Home?"
        subtitle="Browse our full catalog, customize variants, and checkout in minutes."
        primaryText="Start Shopping"
        primaryHref="/shop"
        secondaryText="WhatsApp Us"
        secondaryHref={`https://wa.me/${contactInfo.whatsapp}`}
        dark
      />
      <FooterSection />
    </main>
  );
}
