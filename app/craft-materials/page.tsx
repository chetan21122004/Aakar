import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { CTASection } from "@/components/cta-section"

export const metadata = {
  title: "Craft & Materials | Aakar Woodcraft",
  description:
    "Traditional woodworking methods meet contemporary design. Explore our process, materials, joinery, and finishing standards.",
}

const craftProcessSteps = [
  {
    step: "01",
    title: "Wood Selection",
    description:
      "We source only solid Indian Walnut and select pieces with consistent grain and color. Each board is air-dried for 18–24 months before entering our workshop.",
  },
  {
    step: "02",
    title: "Joinery",
    description:
      "Precision joinery forms the backbone of every piece. No screws - just time-tested woodworking methods adapted for modern forms.",
  },
  {
    step: "03",
    title: "Hand Finishing",
    description:
      "Every surface is sanded through 7 grits. Fluting is carved and refined by hand. Edges are softened. The wood is then sealed with natural oil or matte lacquer.",
  },
  {
    step: "04",
    title: "Quality Control",
    description:
      "Each piece is inspected at multiple stages. Only furniture that meets our exacting standards leaves the workshop. We stand behind every piece we make.",
  },
]

const materials = [
  {
    title: "Walnut",
    description:
      "Rich brown tones with natural variation. Dense, durable, and ages beautifully. Sustainably sourced from certified plantations.",
    highlights: ["Dense grain", "Warm color", "Excellent durability", "Natural luster"],
  },
  {
    title: "Brass Hardware",
    description:
      "Brushed brass handles and accents. Sourced from specialized metalworkers. Develops a gentle patina over time.",
    highlights: ["Hand-finished", "Solid brass", "No plating", "Ages gracefully"],
  },
  {
    title: "Natural Finishes",
    description:
      "Oil-based finishes that penetrate the wood and enhance its natural beauty. Low VOC. Safe for homes.",
    highlights: ["Food-safe", "Low VOC", "Easy to maintain", "Natural feel"],
  },
]

const finishingStats = [
  {
    value: "7",
    label: "Sanding Grits",
    description: "From 80 to 320 grit, each surface is progressively refined",
  },
  {
    value: "3",
    label: "Finish Coats",
    description: "Multiple thin coats hand-rubbed and buffed between applications",
  },
  {
    value: "48",
    label: "Hours Curing",
    description: "Allowing each finish layer to cure fully before the next application",
  },
]

const sustainabilityPillars = [
  {
    title: "Responsible Sourcing",
    description:
      "All wood comes from certified sustainable plantations. No illegal logging. No endangered species.",
  },
  {
    title: "Low VOC Finishes",
    description: "Natural oil and water-based finishes. Food-safe. No harmful chemicals.",
  },
  {
    title: "Minimal Waste",
    description:
      "Offcuts are repurposed where possible. We plan each build carefully to reduce material waste.",
  },
  {
    title: "Built to Last",
    description:
      "Furniture designed to be repaired, not replaced. Solid construction that lasts decades.",
  },
]

export default function CraftMaterialsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl font-light text-foreground md:text-5xl mb-6">
            Craft &amp; Materials
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Traditional woodworking methods meet contemporary design. Every piece is handcrafted
            with meticulous attention to detail.
          </p>
        </div>
      </section>

      {/* Our Process - reuses editorial-section 4-column step grid */}
      <section className="border-t border-border">
        <div className="px-6 pt-16 pb-12 text-center md:px-12 md:pt-20 md:pb-16 lg:px-20">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground">Our Process</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground leading-relaxed">
            From raw timber to finished furniture - four stages of careful craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 border-t border-border sm:grid-cols-2 md:grid-cols-4">
          {craftProcessSteps.map((item) => (
            <div
              key={item.step}
              className="border-b border-r border-border p-8 last:border-r-0 sm:[&:nth-child(2)]:border-r-0 md:border-b-0 md:[&:nth-child(2)]:border-r"
            >
              <p className="mb-4 font-serif text-4xl font-light text-secondary">{item.step}</p>
              <h3 className="mb-2 text-lg font-serif font-light text-foreground">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Materials */}
      <section className="px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4 text-center">
            Materials We Use
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-12 max-w-2xl mx-auto leading-relaxed">
            Only the finest materials. Sustainably sourced. Carefully selected for quality and
            character.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {materials.map((material) => (
              <div key={material.title} className="border border-border p-8">
                <h3 className="font-serif text-lg text-foreground mb-3">{material.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {material.description}
                </p>
                <ul className="space-y-2">
                  {material.highlights.map((highlight) => (
                    <li key={highlight} className="text-sm text-muted-foreground flex gap-3">
                      <span className="text-accent shrink-0">—</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Joinery */}
      <section className="bg-muted/40 px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
            Traditional Joinery
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-12">
            We use time-tested joinery methods. No screws. No shortcuts. Just solid construction
            that lasts generations.
          </p>
          <div className="text-left sm:text-center">
            <h3 className="font-serif text-xl text-foreground mb-4">Mortise &amp; Tenon</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              The foundation of fine furniture. Each joint is precisely cut and fitted. This
              centuries-old method creates incredibly strong, lasting connections without metal
              fasteners.
            </p>
            <ul className="space-y-2 inline-block text-left">
              <li className="text-sm text-muted-foreground flex gap-3">
                <span className="text-accent shrink-0">—</span>
                Hand-cut for perfect fit
              </li>
              <li className="text-sm text-muted-foreground flex gap-3">
                <span className="text-accent shrink-0">—</span>
                Stronger than modern fasteners
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Hand Finishing stats */}
      <section className="px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4 text-center">
            Hand Finishing
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-12 max-w-2xl mx-auto leading-relaxed">
            Every surface is hand-sanded through multiple grits. Then sealed with natural finishes
            that enhance the wood&apos;s beauty.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {finishingStats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3">
                  {stat.label}
                </p>
                <p className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Control */}
      <section className="bg-muted/40 px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
            Uncompromising Quality Control
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            Each piece is inspected at multiple stages. Every joint checked. Every surface
            examined. Only furniture that meets our exacting standards leaves our workshop.
          </p>
          <p className="font-serif text-lg text-foreground">
            We stand behind every piece we make with a 2-year structural warranty.
          </p>
        </div>
      </section>

      {/* Sustainability */}
      <section className="px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4 text-center">
            Sustainability Commitment
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-12 max-w-2xl mx-auto leading-relaxed">
            We believe the most sustainable furniture is furniture that lasts. By using solid wood,
            traditional joinery, and timeless design, we create pieces that won&apos;t need
            replacing.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {sustainabilityPillars.map((pillar) => (
              <div key={pillar.title}>
                <h3 className="font-serif text-lg text-foreground mb-2">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to discuss your furniture requirement?"
        subtitle="Share a few details about your space and our team will guide you through materials, dimensions, and finishes."
        primaryText="Request a Quote"
        primaryHref="/contact"
        secondaryText="Explore The Console"
        secondaryHref="/the-console"
        dark
      />

      <FooterSection />
    </main>
  )
}
