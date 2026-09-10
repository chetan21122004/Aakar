import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { ShopGrid } from "@/components/shop-grid"
import { getCatalogProducts } from "@/lib/catalog"

export const metadata = {
  title: "Shop Custom Wooden Furniture | Aakar Woodcraft",
  description:
    "Browse furniture from Still Mandu, Hampi Rift, Fatehpur Sikri, and Bishnupur Temples.",
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string }>
}) {
  const { collection } = await searchParams
  const products = await getCatalogProducts()

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="px-4 pb-10 pt-24 md:px-12 md:pb-24 md:pt-32 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-end justify-between gap-3 md:hidden">
            <div>
              <p className="type-label mb-1.5">Shop</p>
              <h1 className="font-hero text-[1.85rem] leading-[1.02] tracking-[-0.03em] text-ink">Furniture</h1>
            </div>
            <span className="rounded-full bg-[#F3EDE4] px-3 py-1 font-sans text-[11px] text-ink/60">
              {products.length} pieces
            </span>
          </div>

          <div className="mb-12 hidden items-end gap-6 border-b border-ink/10 pb-10 md:grid md:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <p className="type-label mb-4">The collection</p>
              <h1 className="type-h1 mb-4">Furniture shaped by architecture</h1>
              <p className="type-body max-w-2xl text-lg">
                Explore pieces from four architecture-led collections using the original concept renders.
              </p>
            </div>
            <div className="font-condensed text-sm uppercase tracking-[.12em] text-ink/55">
              {products.length} considered pieces
            </div>
          </div>

          <ShopGrid products={products} initialCollection={collection} />
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
