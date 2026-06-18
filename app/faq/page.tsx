import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { FAQAccordion } from "@/components/faq-accordion"

const faqItems = [
  {
    question: "How is Aakar furniture made?",
    answer: "Each piece is handcrafted by skilled artisans using traditional Indian woodworking techniques. We use solid wood (no veneers or particle board) and traditional joinery methods that have been perfected over centuries. This approach ensures durability and beauty that actually improves with age."
  },
  {
    question: "What types of wood do you use?",
    answer: "We work with premium solid woods including Teak, Sheesham, Rosewood, Oak, Maple, and Walnut. All our wood is sourced from certified sustainable forests. Each wood type has unique characteristics in terms of grain, color, and durability, and we select the best timber for each piece."
  },
  {
    question: "Can I customize furniture to my specifications?",
    answer: "Absolutely! We offer bespoke services where you can work directly with our design team. You can specify dimensions, wood type, finish, and upholstery (for seating). Custom pieces typically take 8-12 weeks from design to delivery."
  },
  {
    question: "What is the warranty on Aakar furniture?",
    answer: "All Aakar furniture comes with a 5-year warranty against manufacturing defects in joinery and wood. We also offer a lifetime warranty on structural integrity. Our pieces are designed to last generations with proper care."
  },
  {
    question: "How do I care for my wooden furniture?",
    answer: "Keep furniture away from direct sunlight and extreme temperature/humidity changes. Dust regularly with a soft cloth. Use coasters under glasses and placemats under plates. For deep cleaning, use a wood-specific cleaner. We provide detailed care instructions with every purchase."
  },
  {
    question: "Do you offer delivery and installation?",
    answer: "Yes, we offer nationwide delivery with professional installation. Delivery costs depend on your location. We disassemble larger pieces if needed for transport and reassemble them at your home. Installation is included for furniture that requires assembly."
  },
  {
    question: "What are your payment options?",
    answer: "We accept bank transfers, credit/debit cards, and online payment methods. For custom orders, we require 50% advance payment and balance upon delivery. All orders are subject to our payment terms, which will be discussed with you."
  },
  {
    question: "Can I return furniture if I'm not satisfied?",
    answer: "We stand behind our craftsmanship. For stock items, you have 7 days from delivery to return or exchange. Custom pieces cannot be returned as they are made specifically for you. All returns are subject to inspection."
  },
  {
    question: "How long do orders take?",
    answer: "Stock items ship within 2-3 weeks. Custom orders typically take 8-12 weeks depending on complexity. Delivery times depend on your location. We'll provide you with a specific timeline when you place your order."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we ship within India. International shipping may be available for specific requests. Please contact us to discuss international orders and shipping costs."
  },
]

export const metadata = {
  title: "FAQ | Aakar Woodcraft",
  description: "Frequently asked questions about Aakar Woodcraft furniture, materials, and services",
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-24 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <h1 className="font-serif text-5xl font-light text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our furniture, materials, and services.
            </p>
          </div>

          <FAQAccordion items={faqItems} />

          {/* Contact CTA */}
          <div className="mt-16 p-8 bg-muted/50 text-center">
            <h3 className="font-serif text-2xl text-foreground mb-3">Didn&apos;t find your answer?</h3>
            <p className="text-muted-foreground mb-6">
              Our design team is happy to help with any questions about your furniture project.
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
