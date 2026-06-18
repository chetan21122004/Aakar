import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { ShopGrid } from "@/components/shop-grid"

export const metadata = {
  title: "Shop Custom Wooden Furniture | Aakar Woodcraft",
  description:
    "Browse handcrafted furniture pieces across sofas, dining tables, coffee tables, wardrobes, beds, chairs, consoles, and storage.",
}

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 max-w-2xl">
            <h1 className="type-h1 mb-4">
              Shop Custom Wooden Furniture
            </h1>
            <p className="type-body text-lg">
              Browse handcrafted furniture pieces across sofas, dining tables, coffee tables,
              wardrobes, beds, chairs, consoles, and storage.
            </p>
          </div>

          <ShopGrid />
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
