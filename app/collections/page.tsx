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

      <section className="px-6 pb-16 pt-32 md:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="type-label mb-4">Collections</p>
          <h1 className="mb-6 font-serif text-4xl font-light text-foreground md:text-5xl">
            Our Collections
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Four furniture studies rooted in Indian architecture, memory, landscape, and material.
          </p>
        </div>
      </section>

      <CollectionsHub products={products} />

      <CTASection
        title="Start Your Enquiry"
        subtitle="Share your requirements and we will guide you through material selection, dimensions, and timelines."
        primaryText="Contact Us"
        primaryHref="/contact"
        dark
      />

      <FooterSection />
    </main>
  )
}
