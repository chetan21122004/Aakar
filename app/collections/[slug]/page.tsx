import Image from "next/image"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { ProductCard } from "@/components/product-card"
import { conceptCollections, getConceptBySlug } from "@/lib/concepts"
import { getCatalogProducts } from "@/lib/catalog"

export function generateStaticParams() {
  return conceptCollections.map((collection) => ({ slug: collection.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const collection = getConceptBySlug(slug)
  if (!collection) return {}
  return { title: `${collection.name} Collection | Aakar Woodcraft`, description: collection.narrative }
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const collection = getConceptBySlug(slug)
  if (!collection) notFound()

  const allProducts = await getCatalogProducts()
  const products = allProducts.filter((product) => collection.productSlugs.includes(product.slug))

  return (
    <main className="min-h-screen bg-sand">
      <Header />
      <section className="px-5 pb-16 pt-32 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
          <div>
            <p className="font-condensed text-xs font-semibold uppercase tracking-[.22em] text-umber">{collection.eyebrow}</p>
            <h1 className="mt-4 font-serif text-6xl font-light text-ink md:text-7xl">{collection.name}</h1>
            <p className="mt-6 max-w-xl font-hero text-lg font-light leading-relaxed text-ink/68">{collection.narrative}</p>
          </div>
          <div className="grid grid-cols-[1.25fr_.75fr] gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]"><Image src={collection.image} alt={`${collection.name} collection`} fill priority className="object-cover" /></div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-[2rem]"><Image src={collection.accentImage} alt={`${collection.name} detail`} fill className="object-cover" /></div>
          </div>
        </div>
      </section>
      <section className="bg-stone px-5 py-16 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-6"><div><p className="font-condensed text-xs font-semibold uppercase tracking-[.2em] text-umber">The pieces</p><h2 className="mt-2 font-serif text-4xl font-light text-ink">Shop the collection</h2></div><p className="text-sm text-ink/55">{products.length} pieces</p></div>
          <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.slug} product={product} />)}</div>
        </div>
      </section>
      <FooterSection />
    </main>
  )
}
