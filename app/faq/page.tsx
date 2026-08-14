import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { FAQAccordion } from "@/components/faq-accordion"
import { CTASection } from "@/components/cta-section"
import { FadeInUp } from "@/components/motion/scroll-motion"
import { faqItems, faqQuickStats } from "@/lib/data"

export const metadata = {
  title: "Frequently Asked Questions | Aakar Woodcraft",
  description: "Answers about Aakar Woodcraft products, customization, care, production, and delivery.",
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-sand">
      <Header />

      <section className="px-5 pb-14 pt-32 md:px-10 md:pb-20 lg:px-16 lg:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <FadeInUp>
            <p className="type-label mb-5">Help &amp; Information</p>
            <h1 className="max-w-2xl text-[clamp(3rem,7vw,6.25rem)] leading-[.92]">
              Clear answers, before you decide.
            </h1>
            <p className="mt-7 max-w-xl text-lg font-light leading-relaxed text-ink/70 md:text-xl">
              Everything you need to know about ordering, customization, production, delivery, and caring for your furniture.
            </p>
            <Link href="#questions" className="mt-8 inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 font-condensed text-sm font-semibold uppercase tracking-[.14em] text-sand transition-colors hover:bg-umber">
              Browse questions <ArrowRight size={16} />
            </Link>
          </FadeInUp>

          <FadeInUp delay={0.08} className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-stone md:rounded-[2.5rem]">
            <Image
              src="/catalog/bishnupur-armchair.webp"
              alt="Bishnupur-inspired armchair by Aakar Woodcraft"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </FadeInUp>
        </div>
      </section>

      <section className="border-y border-umber/15 bg-stone px-5 py-10 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-3">
          {faqQuickStats.map((stat, index) => (
            <FadeInUp key={stat.label} delay={index * 0.05} className="text-center sm:border-r sm:border-umber/20 sm:last:border-r-0">
              <p className="text-3xl font-normal text-ink md:text-4xl">{stat.value}</p>
              <p className="mt-2 font-condensed text-xs font-semibold uppercase tracking-[.16em] text-umber">{stat.label}</p>
            </FadeInUp>
          ))}
        </div>
      </section>

      <section id="questions" className="scroll-mt-24 px-5 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-16">
          <FadeInUp className="lg:sticky lg:top-32 lg:self-start">
            <p className="type-label mb-3">Frequently asked</p>
            <h2 className="text-3xl md:text-4xl">The practical details.</h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/60">
              Start here for the essentials. If your question is specific to a room, product, or project, our team can help directly.
            </p>
            <div className="mt-8 rounded-[1.5rem] border border-umber/15 p-6">
              <MessageCircle size={22} className="text-clay" />
              <h3 className="mt-5 text-lg">Need a personal answer?</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">Tell us what you are considering and we will guide you to the right next step.</p>
              <Link href="/contact" className="mt-5 inline-flex items-center gap-2 font-condensed text-sm font-semibold uppercase tracking-[.12em] text-clay transition-colors hover:text-umber">
                Contact the studio <ArrowRight size={15} />
              </Link>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.06}>
            <FAQAccordion items={faqItems} />
          </FadeInUp>
        </div>
      </section>

      <CTASection
        title="Still deciding on the right piece?"
        subtitle="Share your space, requirements, and questions. We will help you understand what is possible."
        primaryText="Talk to the Studio"
        primaryHref="/contact"
        secondaryText="Explore the Shop"
        secondaryHref="/shop"
        dark
      />

      <FooterSection />
    </main>
  )
}
