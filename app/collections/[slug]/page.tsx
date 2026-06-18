import { notFound } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { ProductCard } from "@/components/product-card"
import { CTASection } from "@/components/cta-section"
import { collections } from "@/lib/data"
import { catalogProducts } from "@/lib/products"

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const collection = collections.find((c) => c.slug === params.slug)
  if (!collection) return {}
  return {
    title: `${collection.name} Collection | Aakar Woodcraft`,
    description: collection.tagline,
  }
}

export default function CollectionDetailPage({ params }: { params: { slug: string } }) {
  const collection = collections.find((c) => c.slug === params.slug)
  if (!collection) notFound()

  const collectionProducts = catalogProducts.filter((p) => p.collectionSlug === collection.slug)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-secondary font-semibold mb-4">
            Collection
          </p>
          <h1 className="font-serif text-4xl font-light text-foreground md:text-5xl mb-6">
            {collection.name} Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {collection.tagline}
          </p>
        </div>
      </section>

      {/* Hero image */}
      <section className="px-6 md:px-12 lg:px-20 mb-20">
        <div className="relative h-[40vh] md:h-[55vh] w-full overflow-hidden max-w-7xl mx-auto">
          <Image
            src={collection.image}
            alt={`${collection.name} collection`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Story */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl text-foreground md:text-3xl mb-6">The Story</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            {collection.description}
          </p>
        </div>
      </section>

      {/* Products in this collection */}
      {collectionProducts.length > 0 && (
        <section className="px-6 md:px-12 lg:px-20 pb-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-2xl text-foreground md:text-3xl mb-10 text-center">
              Pieces from {collection.name}
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {collectionProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Material / design language */}
      <section className="bg-muted/40 px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl text-foreground md:text-3xl mb-6">
            Materials &amp; Design Language
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Every piece in the {collection.name} collection is built from solid wood and finished by hand,
            with construction details and proportions chosen to carry the collection's design language —
            from joinery and texture down to the way light catches each surface. Every dimension and
            finish can be adapted to your space.
          </p>
        </div>
      </section>

      <CTASection
        title={`Bring ${collection.name} Home`}
        subtitle="Share your space and requirement, and our team will help you customize a piece from this collection."
        primaryText="Shop Collection"
        primaryHref="/shop"
        secondaryText="View All Collections"
        secondaryHref="/collections"
      />

      <FooterSection />
    </main>
  )
}
