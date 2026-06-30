import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { CTASection } from "@/components/cta-section"

export const metadata = {
  title: "About Aakar Woodcraft | Form. Crafted. Timeless.",
  description:
    "We design contemporary forms rooted in traditional woodworking craft. Every piece is made to order with no mass production, no compromise on materials, and no shortcuts in construction.",
}

const beliefs = [
  {
    title: "Quality Over Quantity",
    description:
      "We work slowly, deliberately, and with absolute precision. Our goal is not to make more—it is to make better.",
  },
  {
    title: "Transparency",
    description:
      "We openly share our methods, materials, and timelines. No hidden processes. No marketing language.",
  },
  {
    title: "Longevity",
    description:
      "Furniture designed to be passed down. Built to last decades. Made to age beautifully.",
  },
]

const principles = [
  {
    title: "No Mass Production",
    description:
      "Every piece is made to order. We control the entire process from wood selection to final finishing.",
  },
  {
    title: "Traditional Joinery",
    description:
      "Mortise and tenon joints. Dovetails. Time-tested methods that ensure structural integrity for generations.",
  },
  {
    title: "Hand Finishing",
    description:
      "Every surface hand-sanded through 7 grits. Hand-rubbed finishes that enhance the natural beauty of wood.",
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
            About Aakar
          </h1>
          <p className="font-serif text-2xl md:text-3xl text-foreground font-light mb-6">
            Form. Crafted. Timeless.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We design contemporary forms rooted in traditional woodworking craft. Every piece is made
            to order in our controlled workshop environment. No mass production. No compromise on
            materials. No shortcuts in construction.
          </p>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="bg-muted/40 px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">Our Philosophy</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            We believe in restraint. In letting the material speak. In forms that endure. Our
            furniture is designed for homes that value quality over trends—pieces built to last, not
            to be replaced.
          </p>
        </div>
      </section>

      {/* Our Approach */}
      <section className="px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">Our Approach</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Each piece begins with careful material selection. Solid wood. Traditional joinery. Hand
            finishing. We work slowly, deliberately, and with absolute precision. Our goal is not
            to make more—it is to make better.
          </p>
        </div>
      </section>

      {/* What We Believe In */}
      <section className="bg-muted/40 px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-12 text-center">
            What We Believe In
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {beliefs.map((belief) => (
              <div key={belief.title} className="text-center sm:text-left">
                <h3 className="font-serif text-lg text-foreground mb-2">{belief.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{belief.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder story */}
      <section className="px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-base leading-relaxed text-muted-foreground mb-8">
            Founded by craftspeople and designers who believe modern Indian homes deserve furniture
            that reflects both contemporary sensibility and enduring craft.
          </p>
          <blockquote className="font-serif text-xl md:text-2xl text-foreground font-light leading-relaxed">
            &ldquo;We design for homes that value substance over trends.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Our Principles */}
      <section className="bg-muted/40 px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-12 text-center">
            Our Principles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {principles.map((principle) => (
              <div key={principle.title} className="text-center sm:text-left">
                <h3 className="font-serif text-lg text-foreground mb-2">{principle.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Visit Our Workshop"
        subtitle="See how we work. Understand our process. Experience the materials firsthand. Workshop visits available by appointment."
        primaryText="Schedule a Visit"
        primaryHref="/contact"
        dark
      />

      <FooterSection />
    </main>
  )
}
