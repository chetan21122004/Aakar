import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { ProductGridSection } from "@/components/sections/product-grid-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { GallerySection } from "@/components/sections/gallery-section";
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
      <PhilosophySection />
      <ProductGridSection />
      <FeaturedProductsSection />
      <TechnologySection />
      <GallerySection />
      <CollectionSection />
      <EditorialSection />
      <TestimonialsSection />
      <CTASection
        title="Planning Custom Furniture for Your Home?"
        subtitle="Tell us what you need and we will help you create a furniture piece that fits your space, style, and budget."
        primaryText="Request a Quote"
        primaryHref="/contact"
        secondaryText="WhatsApp Us"
        secondaryHref={`https://wa.me/${contactInfo.whatsapp}`}
        dark
      />
      <FooterSection />
    </main>
  );
}
