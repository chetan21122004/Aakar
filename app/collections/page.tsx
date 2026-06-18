import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { CollectionCard } from "@/components/collection-card"
import { CTASection } from "@/components/cta-section"
import { collections } from "@/lib/data"

export const metadata = {
  title: "Furniture Collections | Aakar Woodcraft",
  description: "Browse our curated furniture collections, each inspired by a different place, material, and design language.",
}

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto mb-16">
          <h1 className="font-serif text-4xl font-light text-foreground md:text-5xl mb-4">
            Furniture Collections Inspired by Craft and Place
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Each collection reflects a different place, material story, and design language —
            explore handcrafted pieces inspired by Indian heritage, natural textures, and modern living.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.slug}
              title={collection.name}
              description={collection.tagline}
              image={collection.image}
              href={`/collections/${collection.slug}`}
              itemCount={collection.pieceCount}
              ctaLabel="View Collection →"
            />
          ))}
        </div>
      </section>

      <CTASection
        title="Looking for Something Specific?"
        subtitle="Browse our full product catalog or share your custom furniture requirement with our team."
        primaryText="Shop All Furniture"
        primaryHref="/shop"
        secondaryText="Request a Quote"
        secondaryHref="/contact"
      />

      <FooterSection />
    </main>
  )
}
