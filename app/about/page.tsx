import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { CTASection } from "@/components/cta-section"
import { FadeInUp } from "@/components/motion/scroll-motion"

export const metadata = {
  title: "About Aakar Woodcraft | Form. Crafted. Timeless.",
  description:
    "Contemporary furniture rooted in material honesty, architectural form, and enduring Indian craft.",
}

const beliefs = [
  {
    number: "01",
    title: "Quality Over Quantity",
    description:
      "We work slowly and deliberately, with attention placed on proportion, material, and the way every detail meets.",
  },
  {
    number: "02",
    title: "Material Honesty",
    description:
      "The character of wood is never treated as a surface effect. Grain, tone, and natural variation remain part of the design.",
  },
  {
    number: "03",
    title: "Designed For Time",
    description:
      "Our pieces are conceived beyond seasonal trends—quiet forms intended to live comfortably in a home for years.",
  },
]

const principles = [
  "Made to order, with considered production",
  "Architectural forms balanced by everyday function",
  "Details that reward touch and close observation",
  "Clear communication from enquiry to delivery",
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-sand">
      <Header />

      <section className="px-5 pb-14 pt-32 md:px-10 md:pb-20 lg:px-16 lg:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
          <FadeInUp>
            <p className="type-label mb-5">The Studio</p>
            <h1 className="max-w-xl text-[clamp(3rem,7vw,6.5rem)] leading-[.92]">
              Form shaped by story and craft.
            </h1>
            <p className="mt-7 max-w-xl text-lg font-light leading-relaxed text-ink/70 md:text-xl">
              Aakar Woodcraft creates contemporary furniture for modern Indian spaces—rooted in architecture, natural material, and a quieter way of making.
            </p>
            <Link
              href="/collections"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 font-condensed text-sm font-semibold uppercase tracking-[.14em] text-sand transition-colors hover:bg-umber"
            >
              Explore our collections
              <ArrowRight size={16} />
            </Link>
          </FadeInUp>

          <FadeInUp delay={0.08} className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-stone md:rounded-[2.5rem]">
            <Image
              src="/catalog/bishnupur-bed.webp"
              alt="Bishnupur-inspired bed by Aakar Woodcraft"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </FadeInUp>
        </div>
      </section>

      <section className="border-y border-umber/15 bg-stone px-5 py-16 md:px-10 md:py-20 lg:px-16">
        <FadeInUp className="mx-auto max-w-5xl text-center">
          <p className="type-label mb-5">Our Philosophy</p>
          <h2 className="text-[clamp(2rem,5vw,4.5rem)] leading-[1.02]">
            Furniture should hold presence without demanding attention.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base font-light leading-relaxed text-ink/70 md:text-lg">
            We believe in restraint, useful beauty, and forms that become more familiar with time. Every collection begins with a place, a memory, or an architectural idea, then becomes an object made for everyday life.
          </p>
        </FadeInUp>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <FadeInUp className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="type-label mb-3">What guides us</p>
              <h2 className="text-3xl md:text-4xl">Three enduring beliefs</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink/60">
              A simple framework for every object we design and every project we take on.
            </p>
          </FadeInUp>

          <div className="grid gap-5 md:grid-cols-3">
            {beliefs.map((belief, index) => (
              <FadeInUp key={belief.title} delay={index * 0.06} className="rounded-[1.75rem] border border-umber/10 bg-stone p-7 md:p-8">
                <p className="font-condensed text-xs font-semibold tracking-[.2em] text-clay">{belief.number}</p>
                <h3 className="mt-8 text-xl">{belief.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/65">{belief.description}</p>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-24 lg:px-16">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-ink text-sand lg:grid-cols-2 md:rounded-[2.5rem]">
          <div className="relative min-h-[360px] lg:min-h-[560px]">
            <Image
              src="/catalog/hampi-rift-console.webp"
              alt="Hampi Rift console from Aakar Woodcraft"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <FadeInUp className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
            <p className="font-condensed text-xs font-semibold uppercase tracking-[.22em] text-clay">Our approach</p>
            <h2 className="mt-4 text-3xl text-sand md:text-4xl">From an idea to an object with purpose.</h2>
            <p className="mt-6 text-base font-light leading-relaxed text-sand/70">
              We study proportion, silhouette, and how a piece sits within a room. The final object should feel resolved from every angle and remain intuitive in use.
            </p>
            <ul className="mt-8 space-y-4">
              {principles.map((principle) => (
                <li key={principle} className="flex items-start gap-3 border-t border-sand/15 pt-4 text-sm text-sand/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  {principle}
                </li>
              ))}
            </ul>
          </FadeInUp>
        </div>
      </section>

      <CTASection
        title="Visit the world of Aakar"
        subtitle="Explore the collections or speak with us about a piece made for your space."
        primaryText="Explore Collections"
        primaryHref="/collections"
        secondaryText="Start a Conversation"
        secondaryHref="/contact"
        dark
      />

      <FooterSection />
    </main>
  )
}
