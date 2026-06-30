import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { FAQAccordion } from "@/components/faq-accordion"
import { faqItems, faqQuickStats } from "@/lib/data"

export const metadata = {
  title: "Frequently Asked Questions | Aakar Woodcraft",
  description: "Common questions about our process, materials, and delivery.",
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16 text-center">
            <h1 className="font-serif text-4xl font-light text-foreground md:text-5xl mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Common questions about our process, materials, and delivery.
            </p>
          </div>

          <FAQAccordion items={faqItems} />

          {/* Quick stats */}
          <div className="mt-16 grid grid-cols-1 gap-8 border-t border-border pt-16 sm:grid-cols-3">
            {faqQuickStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-2xl md:text-3xl text-foreground font-light">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 p-8 bg-muted/50 text-center">
            <h3 className="font-serif text-2xl text-foreground mb-3">Didn&apos;t find your answer?</h3>
            <p className="text-muted-foreground mb-6">
              Our team is happy to help with any questions about your furniture project.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-primary text-white font-semibold hover:bg-primary-light transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
