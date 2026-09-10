import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { CTASection } from "@/components/cta-section"
import { CollectionsHub } from "@/components/collections-hub"
import { getCatalogProducts } from "@/lib/catalog"

export const metadata = {
  title: "Collections | Aakar Woodcraft",
  description:
    "Explore Still Mandu, Hampi Rift, Fatehpur Sikri, and Bishnupur Temples.",
}

export default async function CollectionsPage() {
  const products = await getCatalogProducts()

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="px-4 pb-5 pt-24 md:px-12 md:pb-16 md:pt-32 lg:px-20">
        <div className="mx-auto max-w-3xl md:text-center">
          <p className="type-label mb-2 md:mb-4">Collections</p>
          <h1 className="font-hero text-[1.85rem] leading-[1.02] tracking-[-0.03em] text-ink md:mb-6 md:font-serif md:text-5xl md:font-light">
            Four studies in wood
          </h1>
          <p className="mt-2 hidden text-lg leading-relaxed text-muted-foreground md:block">
            Four furniture studies rooted in Indian architecture, memory, landscape, and material.
          </p>
        </div>
      </section>

      <CollectionsHub products={products} />

      <div className="hidden md:block">
        <CTASection
          title="Start Your Enquiry"
          subtitle="Share your requirements and we will guide you through material selection, dimensions, and timelines."
          primaryText="Contact Us"
          primaryHref="/contact"
          dark
        />
      </div>

      <FooterSection />
    </main>
  )
}
