import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { CTASection } from "@/components/cta-section"
import Image from "next/image"

export const metadata = {
  title: "About Aakar Woodcraft | Custom Furniture Craftsmanship",
  description: "Learn how Aakar Woodcraft crafts custom wooden furniture with artistry, precision, and purpose for modern Indian homes.",
}

const materials = [
  {
    title: "Solid Wood",
    description: "Sheesham, mango, teak, and oak — no particleboard or MDF veneers.",
  },
  {
    title: "Natural Finishes",
    description: "Hand-rubbed oils and natural-tone stains that let the grain show through.",
  },
  {
    title: "Premium Upholstery",
    description: "Carefully sourced fabrics chosen for comfort, durability, and feel.",
  },
  {
    title: "Quality Hardware",
    description: "Soft-close hinges, reinforced joints, and fittings built to outlast trends.",
  },
]

const values = [
  {
    title: "Craftsmanship",
    description: "Every piece is shaped by hand, using techniques passed down through generations of Indian carpentry.",
  },
  {
    title: "Honest Materials",
    description: "We use what we say we use — solid wood construction, never disguised particleboard.",
  },
  {
    title: "Custom Design",
    description: "Every dimension, finish, and detail can be adapted to fit your space and your taste.",
  },
  {
    title: "Long-Lasting Quality",
    description: "Furniture built to be repaired and refinished for decades, not replaced after a few years.",
  },
  {
    title: "Client-Focused Process",
    description: "From first enquiry to final installation, we keep you involved in every decision.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl font-light text-foreground md:text-5xl mb-6">
            About Aakar Woodcraft
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Crafting custom wooden furniture with artistry, precision, and purpose.
          </p>
        </div>
      </section>

      {/* Brand story */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">Our Story</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Aakar Woodcraft was built around a simple idea: furniture should be made for the home it
            lives in, not the other way around. We work directly with you to design and build pieces
            that fit your space, your wood and finish preferences, and the way you actually live —
            crafted by hand, piece by piece, rather than pulled off an assembly line.
          </p>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="bg-muted/40 px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">Craftsmanship</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Each piece passes through the hands of skilled artisans who use traditional joinery —
            mortise-and-tenon, dovetail — rather than relying solely on glue and screws. Every surface
            is sanded and finished by hand across multiple passes, so the final piece feels as good as
            it looks.
          </p>
        </div>
      </section>

      {/* Materials We Use */}
      <section className="px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-12 text-center">
            Materials We Use
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {materials.map((material) => (
              <div key={material.title} className="text-center sm:text-left">
                <h3 className="font-serif text-lg text-foreground mb-2">{material.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{material.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop / Team */}
      <section className="bg-muted/40 px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1687422810663-c316494f725a?q=80&w=1600&auto=format&fit=crop"
              alt="Craftsman shaping a piece of wood by hand in the workshop"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
              Our Workshop &amp; Team
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Behind every piece is a small team of carpenters, finishers, and designers who treat
              furniture-making as a craft, not just a production process. We work in a workshop where
              every order is treated as a one-off project — measured, planned, and built specifically
              for the person who asked for it.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-12 text-center">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {values.map((value) => (
              <div key={value.title}>
                <h3 className="font-serif text-lg text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Start Your Custom Furniture Enquiry"
        subtitle="Tell us about your space and requirement, and our team will help you design the right piece."
        primaryText="Start Your Custom Furniture Enquiry"
        primaryHref="/contact"
        secondaryText="Browse Collections"
        secondaryHref="/collections"
        dark
      />

      <FooterSection />
    </main>
  )
}
