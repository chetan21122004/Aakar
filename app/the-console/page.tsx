import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { CTASection } from "@/components/cta-section"
import { ConsoleSpecifications } from "@/components/console-specifications"
import { products } from "@/lib/data"

export const metadata = {
  title: "The Signature Fluted Console | Aakar Woodcraft",
  description:
    "Our most celebrated console — vertical fluting, rounded edges, solid Indian walnut, and brushed brass hardware. Made to order with pan-India white-glove delivery.",
}

const consoleProduct = products.find((p) => p.slug === "fluted-console")!

const designFeatures = [
  "Vertical fluting detail across front panel",
  "Soft rounded edges on all surfaces",
  "Two interior shelves",
  "Solid wood construction (no veneers)",
  "Mortise and tenon joinery",
  "Hand-finished to museum standards",
]

const materials = [
  {
    label: "Primary Wood",
    value: "Solid Indian Walnut",
  },
  {
    label: "Hardware",
    value: "Brushed Brass",
  },
  {
    label: "Finish",
    value: "Hand-rubbed Natural Oil",
  },
]

const finishOptions = [
  {
    title: "Natural Oil",
    description: "Matte, tactile finish that enhances grain",
  },
  {
    title: "Matte Lacquer",
    description: "Smooth, protective surface with subtle sheen",
  },
  {
    title: "Dark Stain",
    description: "Deep, rich tone with natural variation",
  },
]

const craftDetails = [
  {
    title: "Hand-Carved Fluting",
    description:
      "Vertical grooves carved and refined by hand for consistent depth and rhythm.",
    image:
      "https://images.unsplash.com/photo-1631510390389-c1e4fb20ff31?q=80&w=1200&auto=format&fit=crop",
    alt: "Close-up of fluted wood detailing on a console",
    badge: "Fluting",
  },
  {
    title: "Rounded Edges",
    description:
      "All edges hand-sanded through multiple grits for a soft, inviting touch.",
    image:
      "https://images.unsplash.com/photo-1568347760450-1ef7874c5f5f?q=80&w=1200&auto=format&fit=crop",
    alt: "Wooden console with softly rounded edges in an entryway",
    badge: "Rounded Edges",
  },
  {
    title: "Brass Hardware",
    description:
      "Brushed brass handles that develop a beautiful patina with use over time.",
    image:
      "https://images.unsplash.com/photo-1736506159893-22cca29b8018?q=80&w=1200&auto=format&fit=crop",
    alt: "Close-up of brushed brass hardware on solid walnut",
    badge: "Brass Hardware",
  },
]

export default function TheConsolePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <p className="type-label mb-4">Signature Piece</p>
            <h1 className="type-h1 mb-4">The Signature Fluted Console</h1>
            <p className="font-serif text-xl text-foreground mb-6">
              A study in restraint and detail.
            </p>
            <p className="type-body mb-8">{consoleProduct.longDescription}</p>
            <p className="type-price mb-8">{consoleProduct.price}</p>
            <Link href="/contact" className="btn-primary">
              Enquire Now
            </Link>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={consoleProduct.image}
              alt="The Signature Fluted Console in solid Indian walnut"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Design Features */}
      <section className="bg-muted/40 px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="type-h2 mb-10 text-center">Design Features</h2>
          <ul className="space-y-3">
            {designFeatures.map((feature) => (
              <li key={feature} className="type-body text-sm flex gap-3">
                <span className="text-accent shrink-0">—</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Specifications */}
      <section className="px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="type-h2 mb-3 text-center">Specifications</h2>
          <p className="type-label mb-10 text-center">Dimensions</p>
          <ConsoleSpecifications />
        </div>
      </section>

      {/* Materials */}
      <section className="bg-muted/40 px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="type-h2 mb-12 text-center">Materials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {materials.map((material) => (
              <div key={material.label} className="text-center">
                <p className="type-label mb-2">{material.label}</p>
                <p className="font-serif text-lg text-foreground">{material.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finish Options */}
      <section className="px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="type-h2 mb-4 text-center">Available Finishes</h2>
          <p className="type-body text-center mb-12">
            Choose the finish that best suits your space and aesthetic
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {finishOptions.map((finish) => (
              <div key={finish.title} className="text-center sm:text-left border border-border p-8">
                <h3 className="font-serif text-lg text-foreground mb-2">{finish.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{finish.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craft Detail Callouts */}
      <section className="px-6 md:px-12 lg:px-20 py-20 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="type-h2 mb-12 text-center">Craft Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {craftDetails.map((detail) => (
              <div key={detail.title}>
                <div className="relative aspect-[4/3] overflow-hidden mb-6">
                  <Image src={detail.image} alt={detail.alt} fill className="object-cover" />
                  <div className="absolute bottom-6 left-6">
                    <span className="rounded-none bg-ink/90 px-4 py-2 text-sm font-medium text-sand backdrop-blur-md">
                      {detail.badge}
                    </span>
                  </div>
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">{detail.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production & Delivery */}
      <section className="bg-muted/40 px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-12">
          <div className="text-center sm:text-left">
            <p className="type-label mb-3">Production</p>
            <h3 className="font-serif text-3xl text-foreground mb-4">{consoleProduct.productionTime}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Each console is made to order. Production begins after final approval of dimensions
              and finish.
            </p>
          </div>
          <div className="text-center sm:text-left">
            <p className="type-label mb-3">Delivery &amp; Installation</p>
            <h3 className="font-serif text-xl text-foreground mb-4">
              Pan-India white-glove delivery included
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Carefully packed and delivered by our trusted partners. Installation assistance
              included.
            </p>
          </div>
        </div>
      </section>

      {/* Care Instructions */}
      <section className="px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="type-h2 mb-6">Care Instructions</h2>
          <p className="type-body mb-4">
            Wipe with a soft dry cloth. Apply wood conditioner every 6 months. Avoid direct
            sunlight and moisture.
          </p>
          <p className="text-sm text-muted-foreground">
            Detailed care guide provided with delivery.
          </p>
        </div>
      </section>

      <CTASection
        title="Ready to Order?"
        subtitle="Start your enquiry and we will guide you through material selection, dimensions, and finishes."
        primaryText="Start Your Enquiry"
        primaryHref="/contact"
        dark
      />

      <FooterSection />
    </main>
  )
}
