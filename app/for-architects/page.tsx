import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { CTASection } from "@/components/cta-section"
import { FadeInUp } from "@/components/motion/scroll-motion"
import {
  architectBenefits,
  architectCaseStudies,
  architectCollaborationSteps,
  architectOfferings,
  architectTechnicalInfo,
  architectTestimonial,
} from "@/lib/data"

export const metadata = {
  title: "For Architects & Designers | Aakar Woodcraft",
  description:
    "A focused furniture collaboration service for residential, hospitality, and interior design projects.",
}

export default function ForArchitectsPage() {
  return (
    <main className="min-h-screen bg-sand">
      <Header />

      <section className="px-5 pb-14 pt-32 md:px-10 md:pb-20 lg:px-16 lg:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
          <FadeInUp>
            <p className="type-label mb-5">Trade &amp; Collaborations</p>
            <h1 className="max-w-2xl text-[clamp(3rem,7vw,6.25rem)] leading-[.92]">
              A considered partner for considered spaces.
            </h1>
            <p className="mt-7 max-w-xl text-lg font-light leading-relaxed text-ink/70 md:text-xl">
              We work with architects and interior designers to adapt our furniture language to residential and hospitality projects.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-clay px-7 py-3.5 font-condensed text-sm font-semibold uppercase tracking-[.14em] text-sand transition-colors hover:bg-umber">
                Discuss a project <ArrowRight size={16} />
              </Link>
              <Link href="#project-support" className="inline-flex items-center justify-center rounded-full border border-ink/25 px-7 py-3.5 font-condensed text-sm font-semibold uppercase tracking-[.14em] text-ink transition-colors hover:bg-stone">
                View capabilities
              </Link>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.08} className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-stone md:rounded-[2.5rem]">
            <Image
              src="/catalog/still-mandu-dining-table.webp"
              alt="Still Mandu dining table for an interior project"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />
          </FadeInUp>
        </div>
      </section>

      <section id="project-support" className="border-y border-umber/15 bg-stone px-5 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <FadeInUp>
            <p className="type-label mb-4">Project support</p>
            <h2 className="text-3xl md:text-4xl">Built around your design intent.</h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink/65">
              A direct, collaborative process with the information and coordination needed to specify confidently.
            </p>
          </FadeInUp>
          <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {architectOfferings.map((item, index) => (
              <FadeInUp key={item} delay={index * 0.04} className="flex items-start gap-3 border-t border-umber/20 pt-5">
                <Check size={17} className="mt-0.5 shrink-0 text-clay" />
                <p className="text-sm leading-relaxed text-ink/75">{item}</p>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <FadeInUp className="mb-12 max-w-2xl">
            <p className="type-label mb-3">How we collaborate</p>
            <h2 className="text-3xl md:text-4xl">A clear path from brief to delivery.</h2>
          </FadeInUp>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {architectCollaborationSteps.map((item, index) => (
              <FadeInUp key={item.step} delay={index * 0.05} className="rounded-[1.75rem] border border-umber/10 bg-stone p-7">
                <p className="font-condensed text-xs font-semibold tracking-[.2em] text-clay">{item.step}</p>
                <h3 className="mt-10 text-xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/65">{item.description}</p>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <FadeInUp className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="type-label mb-3">Selected work</p>
              <h2 className="text-3xl md:text-4xl">Furniture within a larger vision.</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink/60">Examples of how our collection language can support different spatial contexts.</p>
          </FadeInUp>
          <div className="grid gap-6 md:grid-cols-2">
            {architectCaseStudies.map((study, index) => (
              <FadeInUp key={study.title} delay={index * 0.08} className="group overflow-hidden rounded-[2rem] bg-stone p-4 md:p-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-sand">
                  <Image src={study.image} alt={study.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="px-2 pb-2 pt-6">
                  <h3 className="text-xl">{study.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">{study.description}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-5 py-16 text-sand md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <FadeInUp>
            <p className="font-condensed text-xs font-semibold uppercase tracking-[.22em] text-clay">Why Aakar</p>
            <blockquote className="mt-5 text-2xl font-light leading-snug text-sand md:text-3xl">
              “{architectTestimonial.quote}”
            </blockquote>
            <p className="mt-6 text-sm text-sand/55">{architectTestimonial.name}</p>
          </FadeInUp>
          <div className="grid gap-8 sm:grid-cols-3">
            {architectBenefits.map((benefit, index) => (
              <FadeInUp key={benefit.title} delay={index * 0.05}>
                <h3 className="text-lg text-sand">{benefit.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-sand/60">{benefit.description}</p>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <FadeInUp className="mb-10">
            <p className="type-label mb-3">Specification support</p>
            <h2 className="text-3xl md:text-4xl">The details your project needs.</h2>
          </FadeInUp>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {architectTechnicalInfo.map((item, index) => (
              <FadeInUp key={item.title} delay={index * 0.04} className="rounded-[1.5rem] border border-umber/15 p-6">
                <h3 className="text-lg">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/60">{item.description}</p>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Bring us into the project early"
        subtitle="Share the brief, dimensions, quantities, and timeline. We will respond with the clearest next step."
        primaryText="Book a Consultation"
        primaryHref="/contact"
        secondaryText="Explore Collections"
        secondaryHref="/collections"
        dark
      />

      <FooterSection />
    </main>
  )
}
