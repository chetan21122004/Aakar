import Image from "next/image"
import Link from "next/link"
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

      <section className="px-4 pb-8 pt-24 md:px-10 md:pb-16 md:pt-32 lg:px-16">
        <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-[1.5rem] md:hidden">
          <Image
            src={collection.image}
            alt={`${collection.name} collection`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1A17] via-[#1F1A17]/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <p className="font-condensed text-[11px] font-semibold uppercase tracking-[.2em] text-white/70">
              {collection.eyebrow}
            </p>
            <h1 className="mt-2 font-serif text-4xl font-light leading-none">{collection.name}</h1>
          </div>
        </div>
        <p className="mb-6 font-hero text-[15px] font-light leading-relaxed text-ink/70 md:hidden">
          {collection.narrative}
        </p>

        <div className="mx-auto hidden max-w-7xl gap-10 lg:grid lg:grid-cols-[.82fr_1.18fr] lg:items-center md:grid">
          <div>
            <p className="font-condensed text-xs font-semibold uppercase tracking-[.22em] text-umber">{collection.eyebrow}</p>
            <h1 className="mt-4 font-serif text-6xl font-light text-ink md:text-7xl">{collection.name}</h1>
            <p className="mt-6 max-w-xl font-hero text-lg font-light leading-relaxed text-ink/68">{collection.narrative}</p>
          </div>
          <div className="grid grid-cols-[1.25fr_.75fr] gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
              <Image src={collection.image} alt={`${collection.name} collection`} fill priority className="object-cover" />
            </div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-[2rem]">
              <Image src={collection.accentImage} alt={`${collection.name} detail`} fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone px-4 py-8 md:px-10 md:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-condensed text-[11px] font-semibold uppercase tracking-[.2em] text-umber md:text-xs">The pieces</p>
              <h2 className="mt-1 font-serif text-[1.75rem] font-light text-ink md:text-4xl">Shop the collection</h2>
            </div>
            <p className="font-sans text-xs text-ink/55 md:text-sm">{products.length} pieces</p>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-5 md:mt-9 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <div className="mt-8 md:hidden">
            <Link
              href="/shop"
              className="flex min-h-11 cursor-pointer items-center justify-center rounded-full border border-ink/20 bg-transparent font-sans text-[13px] font-medium text-ink"
            >
              Browse all furniture
            </Link>
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  )
}
