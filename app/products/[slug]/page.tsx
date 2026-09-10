import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { ProductCard } from "@/components/product-card"
import { ProductPurchasePanel } from "@/components/product-purchase-panel"
import { ProductDetailInfo } from "@/components/product-detail-info"
import { ProductReviews } from "@/components/product-reviews"
import { getCatalogProducts, getProductBySlugFromDb, getProductSlugs } from "@/lib/catalog"
import { getProductReviews } from "@/lib/product-reviews"
import { getConceptForProduct } from "@/lib/concepts"

export async function generateStaticParams() {
  const slugs = await getProductSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlugFromDb(slug)
  if (!product) return {}
  return {
    title: `${product.name} | Aakar Woodcraft`,
    description: product.description,
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlugFromDb(slug)
  if (!product) notFound()

  const allProducts = await getCatalogProducts()
  const collection = getConceptForProduct(product.slug)
  const collectionMates = collection
    ? allProducts.filter((p) => collection.productSlugs.includes(p.slug) && p.id !== product.id)
    : []
  const categoryMates = allProducts.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id,
  )
  const relatedProducts = [...collectionMates, ...categoryMates]
    .filter((item, index, list) => list.findIndex((p) => p.id === item.id) === index)
    .slice(0, 8)
  const alsoViewed = allProducts
    .filter((p) => p.id !== product.id && !relatedProducts.some((r) => r.id === p.id))
    .slice(0, 4)

  const reviews = getProductReviews(product.slug, product.options.finish)

  return (
    <main className="min-h-screen bg-sand pb-24 sm:pb-0">
      <Header />

      <section className="product-detail-hero px-5 pb-12 pt-32 md:px-10 lg:px-16">
        <div className="mx-auto mb-8 max-w-[90rem] font-sans text-sm text-[#6B5E54]">
          <Link href="/" className="transition-colors hover:text-[#0F1111]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="transition-colors hover:text-[#0F1111]">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#0F1111]">{product.name}</span>
        </div>

        <div className="mx-auto max-w-[90rem]">
          <ProductPurchasePanel
            product={product}
            ratingAverage={reviews.average}
            ratingCount={reviews.count}
          />
          <ProductDetailInfo product={product} />
          <ProductReviews summary={reviews} />
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="border-t border-[#E7E0D8] bg-[#FFFcf8] px-5 py-16 md:px-10 md:py-20 lg:px-16">
          <div className="mx-auto max-w-[90rem]">
            <h2 className="font-hero !text-2xl !font-medium !normal-case !tracking-[-0.02em] text-[#0F1111] md:!text-3xl">
              Inspired by this piece
            </h2>
            <p className="mt-2 font-sans text-sm text-[#6B5E54]">
              From the same collection and category — pieces that sit well together.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {alsoViewed.length > 0 && (
        <section className="border-t border-[#E7E0D8] px-5 py-16 md:px-10 md:py-20 lg:px-16">
          <div className="mx-auto max-w-[90rem]">
            <h2 className="font-hero !text-2xl !font-medium !normal-case !tracking-[-0.02em] text-[#0F1111] md:!text-3xl">
              Customers also viewed
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {alsoViewed.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FooterSection />
    </main>
  )
}
