import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { ProductCard } from "@/components/product-card"
import { CTASection } from "@/components/cta-section"

const products = [
  { id: "modern-sofa", title: "Modern Sofa", category: "Sofas", price: "₹45,000", image: "/images/bottle-water.png" },
  { id: "teak-dining", title: "Teak Dining Table", category: "Dining", price: "₹65,000", image: "/images/bottle-mountain.png" },
  { id: "walnut-coffee", title: "Walnut Coffee Table", category: "Coffee Tables", price: "₹28,000", image: "/images/bottle-lake.png" },
  { id: "oak-wardrobe", title: "Oak Wardrobe", category: "Storage", price: "₹85,000", image: "/images/product-forest.png" },
  { id: "maple-bed", title: "Maple Platform Bed", category: "Beds", price: "₹72,000", image: "/images/bottle-stream.png" },
  { id: "sheesham-desk", title: "Sheesham Desk", category: "Desks", price: "₹35,000", image: "/images/bottle-fire.png" },
  { id: "rosewood-cabinet", title: "Rosewood Cabinet", category: "Storage", price: "₹55,000", image: "/images/bottle-canyon.png" },
  { id: "cedar-bench", title: "Cedar Bench", category: "Seating", price: "₹32,000", image: "/images/bottle-snow.png" },
  { id: "custom-sofa", title: "Custom Upholstered Sofa", category: "Sofas", price: "From ₹50,000", image: "/images/bottle-bike.png" },
]

export const metadata = {
  title: "Shop | Aakar Woodcraft",
  description: "Browse our collection of handcrafted wooden furniture",
}

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-24 pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h1 className="font-serif text-5xl font-light text-foreground mb-4">
              Our Collection
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore our range of handcrafted wooden furniture, each piece created with traditional techniques and the finest materials.
            </p>
          </div>

          {/* Filter Options */}
          <div className="mb-12 flex gap-4 overflow-x-auto pb-4">
            <button className="px-6 py-2 bg-primary text-white font-semibold whitespace-nowrap hover:bg-primary-light transition-colors">
              All Items
            </button>
            <button className="px-6 py-2 border border-border text-foreground font-semibold whitespace-nowrap hover:bg-muted transition-colors">
              Sofas & Seating
            </button>
            <button className="px-6 py-2 border border-border text-foreground font-semibold whitespace-nowrap hover:bg-muted transition-colors">
              Dining
            </button>
            <button className="px-6 py-2 border border-border text-foreground font-semibold whitespace-nowrap hover:bg-muted transition-colors">
              Storage
            </button>
            <button className="px-6 py-2 border border-border text-foreground font-semibold whitespace-nowrap hover:bg-muted transition-colors">
              Custom
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need Something Custom?"
        subtitle="Our artisans can create bespoke furniture tailored to your exact specifications."
        primaryText="Request Custom Piece"
        primaryHref="/contact"
        secondaryText="View Process"
        secondaryHref="/about"
      />

      <FooterSection />
    </main>
  )
}
