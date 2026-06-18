import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { ProductCard } from "@/components/product-card"
import { ProductPurchasePanel } from "@/components/product-purchase-panel"
import { catalogProducts, getProductBySlug } from "@/lib/products"

export function generateStaticParams() {
  return catalogProducts.map((product) => ({ slug: product.slug }))
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then((p) => {
    const product = getProductBySlug(p.slug)
    if (!product) return {}
    return {
      title: `${product.name} | Aakar Woodcraft`,
      description: product.description,
    }
  })
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const relatedProducts = catalogProducts
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4)

  return (
    <main className="min-h-screen bg-background pb-24 sm:pb-0">
      <Header />

      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto mb-10 font-sans text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-foreground transition-colors">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/${product.categorySlug}`} className="hover:text-foreground transition-colors">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="max-w-7xl mx-auto">
          <ProductPurchasePanel product={product} />
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="px-6 md:px-12 lg:px-20 py-20 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <h2 className="type-h2 mb-10 text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
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
