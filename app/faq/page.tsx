import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { FAQAccordion } from "@/components/faq-accordion"
import { faqItems } from "@/lib/data"

export const metadata = {
  title: "Frequently Asked Questions | Aakar Woodcraft",
  description: "Answers to common questions about custom furniture, materials, timelines, and enquiries.",
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
              Answers to common questions about custom furniture, materials, timelines, and enquiries.
            </p>
          </div>

          <FAQAccordion items={faqItems} />

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
