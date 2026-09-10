import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { ShopGrid } from "@/components/shop-grid"
import { getCatalogProducts } from "@/lib/catalog"

export const metadata = {
  title: "Shop Custom Wooden Furniture | Aakar Woodcraft",
  description:
    "Browse furniture from Still Mandu, Hampi Rift, Fatehpur Sikri, and Bishnupur Temples.",
}

export default async function ShopPage() {
  const products = await getCatalogProducts()

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="px-6 pb-24 pt-32 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 grid items-end gap-6 border-b border-ink/10 pb-10 md:grid-cols-[1fr_auto]">
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

          <ShopGrid products={products} />
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
