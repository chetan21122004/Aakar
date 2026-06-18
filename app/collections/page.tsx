import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { CollectionCard } from "@/components/collection-card"
import { CTASection } from "@/components/cta-section"

const collections = [
  {
    title: "Sofas & Seating",
    description: "Hand-upholstered comfort seating with solid wood frames. Timeless designs that become family heirlooms.",
    image: "/images/bottle-water.png",
    itemCount: 12,
  },
  {
    title: "Dining Tables",
    description: "Expansive tables crafted from premium solid woods. Perfect for gathering and creating memories.",
    image: "/images/bottle-mountain.png",
    itemCount: 8,
  },
  {
    title: "Coffee Tables",
    description: "Statement pieces with hand-turned details and inlays. Functional art for your living room.",
    image: "/images/bottle-lake.png",
    itemCount: 6,
  },
  {
    title: "Wardrobes & Storage",
    description: "Spacious storage solutions with traditional joinery. Beauty meets practicality.",
    image: "/images/product-forest.png",
    itemCount: 10,
  },
  {
    title: "Beds & Frames",
    description: "Substantial bed frames designed for heirloom quality. Crafted to last generations.",
    image: "/images/bottle-stream.png",
    itemCount: 7,
  },
  {
    title: "Custom Bespoke",
    description: "Work directly with our artisans to create furniture made for your unique space.",
    image: "/images/bottle-fire.png",
  },
]

export const metadata = {
  title: "Collections | Aakar Woodcraft",
  description: "Browse our furniture collections organized by category",
}

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-24 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto mb-16">
          <h1 className="font-serif text-5xl font-light text-foreground mb-4">
            Shop by Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our curated collections of handcrafted wooden furniture, organized by room and style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {collections.map((collection) => (
            <CollectionCard key={collection.title} {...collection} />
          ))}
        </div>
      </section>

      <CTASection
        title="Looking for Something Specific?"
        subtitle="Browse our full product catalog or speak with our design consultants."
        primaryText="View All Products"
        primaryHref="/shop"
        secondaryText="Schedule Consultation"
        secondaryHref="/contact"
      />

      <FooterSection />
    </main>
  )
}
