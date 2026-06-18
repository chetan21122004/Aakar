import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { CTASection } from "@/components/cta-section"
import Image from "next/image"

export const metadata = {
  title: "About Us | Aakar Woodcraft",
  description: "Learn about our craft, heritage, and commitment to sustainable woodworking",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-light text-foreground mb-6">
            Our Story
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            For over two decades, Aakar Woodcraft has been creating timeless wooden furniture using traditional Indian woodworking techniques passed down through generations.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl font-light text-foreground mb-16 text-center">
            Our Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                <div className="text-2xl text-primary">🌲</div>
              </div>
              <h3 className="font-serif text-2xl text-foreground">Sustainability</h3>
              <p className="text-muted-foreground">
                We source wood responsibly from certified sustainable forests, ensuring our craft preserves nature for generations to come.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center">
                <div className="text-2xl">✋</div>
              </div>
              <h3 className="font-serif text-2xl text-foreground">Craftsmanship</h3>
              <p className="text-muted-foreground">
                Every piece is handcrafted by skilled artisans using time-honored joinery techniques, not mass production.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-accent/10 flex items-center justify-center">
                <div className="text-2xl">⏳</div>
              </div>
              <h3 className="font-serif text-2xl text-foreground">Timelessness</h3>
              <p className="text-muted-foreground">
                We design furniture meant to last lifetimes, transcending trends. Quality that becomes more beautiful with age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl font-light text-foreground mb-12 text-center">
            Our Process
          </h2>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Wood Selection</h3>
                <p className="text-muted-foreground">
                  We carefully select premium solid wood from sustainable sources, chosen for grain, durability, and beauty.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-semibold">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Design & Planning</h3>
                <p className="text-muted-foreground">
                  Our designers create detailed plans, considering proportions, functionality, and aesthetic harmony.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-accent text-foreground flex items-center justify-center font-semibold">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Master Craftsmanship</h3>
                <p className="text-muted-foreground">
                  Skilled artisans hand-craft each piece using traditional joinery and finishes, paying meticulous attention to detail.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                  4
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Quality Assurance</h3>
                <p className="text-muted-foreground">
                  Every piece undergoes rigorous inspection to ensure it meets our standards for durability and beauty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Create Your Perfect Piece"
        subtitle="Work with our artisans to design furniture that's uniquely yours."
        primaryText="Start Your Project"
        primaryHref="/contact"
        secondaryText="Browse Collections"
        secondaryHref="/collections"
        dark
      />

      <FooterSection />
    </main>
  )
}
