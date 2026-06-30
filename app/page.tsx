import { Header } from "@/components/header";

import { HeroSection } from "@/components/sections/hero-section";

// import { ModernHeirloomsSection } from "@/components/sections/modern-heirlooms-section";

import { PhilosophySection } from "@/components/sections/philosophy-section";
import { ProductGridSection } from "@/components/sections/product-grid-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { ShopByCategorySection } from "@/components/sections/shop-by-category-section";

import { TrustBarSection } from "@/components/sections/trust-bar-section";
import { CraftDetailsSection } from "@/components/sections/craft-details-section";

import { ArchitectsTeaserSection } from "@/components/sections/architects-teaser-section";

import { TechnologySection } from "@/components/sections/technology-section";

import { GallerySection } from "@/components/sections/gallery-section";

import { EditorialSection } from "@/components/sections/editorial-section";

import { TestimonialsSection } from "@/components/sections/testimonials-section";

import { CTASection } from "@/components/cta-section";

import { FooterSection } from "@/components/sections/footer-section";
      
      {/* AR feature — commented out pending stakeholder review; restore by uncommenting */}

import { contactInfo } from "@/lib/data";
      <TrustBarSection />



export default function Home() {

  return (

    <main className="min-h-screen bg-background">

      <Header />

      <HeroSection />

      {/* <ModernHeirloomsSection /> */}

      <ShopByCategorySection />

      <CraftDetailsSection />

      <PhilosophySection />

      <ProductGridSection />

      <FeaturedProductsSection />

      <ArchitectsTeaserSection />

      <TechnologySection />

      <GallerySection />

      <EditorialSection />

      <TestimonialsSection />

      <CTASection

        title="Start Your Enquiry"

        subtitle="Each piece is made to order. Share your requirements and we will guide you through material selection, dimensions, and timelines."

        primaryText="Contact Us"

        primaryHref="/contact"

        secondaryText="WhatsApp Us"

        secondaryHref={`https://wa.me/${contactInfo.whatsapp}`}

        dark

      />

      <FooterSection />

    </main>

  );

}


