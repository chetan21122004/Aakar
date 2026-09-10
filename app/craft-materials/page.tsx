import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { CTASection } from "@/components/cta-section"
import { FadeInUp } from "@/components/motion/scroll-motion"

export const metadata = {
  title: "Craft & Materials | Aakar Woodcraft",
  description:
    "Traditional woodworking methods meet contemporary design. Explore our process, materials, joinery, and finishing standards.",
}

const processSteps = [
  {
    step: "01",
    title: "Wood selection",
    description:
      "Solid Indian Walnut, chosen for grain and colour. Boards are air-dried 18–24 months before they enter the workshop.",
    image: "/images/craft/woodstack.jpg",
  },
  {
    step: "02",
    title: "Joinery",
    description:
      "Precision wood-to-wood joints form the structure. No screws — time-tested methods adapted for modern forms.",
    image: "/images/craft/process.jpg",
  },
  {
    step: "03",
    title: "Hand finishing",
    description:
      "Seven grits of sanding, hand-carved fluting, softened edges, then sealed in natural oil or matte lacquer.",
    image: "/images/craft/detail.jpg",
  },
  {
    step: "04",
    title: "Quality control",
    description:
      "Every joint and surface is checked. Only pieces that meet workshop standard leave. We stand behind each one.",
    image: "/images/craft/featured.jpg",
  },
]

const materials = [
  {
    title: "Walnut",
    description:
      "Rich brown tones with natural variation. Dense, durable, and ages beautifully. Sourced from certified plantations.",
    highlights: ["Dense grain", "Warm colour", "Excellent durability"],
    image: "/images/featured/material-wood.jpg",
  },
  {
    title: "Brass hardware",
    description:
      "Brushed brass handles and accents from specialist metalworkers. Develops a gentle patina over time.",
    highlights: ["Solid brass", "No plating", "Ages gracefully"],
    image: "/images/featured/material-metal.jpg",
  },
  {
    title: "Natural finishes",
    description:
      "Oil-based finishes that penetrate the wood and enhance its character. Low VOC, and safe for homes.",
    highlights: ["Food-safe", "Low VOC", "Easy to maintain"],
    image: "/images/featured/material-linen.jpg",
  },
]

const finishingStats = [
  { value: "7", label: "Sanding grits", description: "80 to 320 grit, each surface progressively refined." },
  { value: "3", label: "Finish coats", description: "Thin coats, hand-rubbed and buffed between applications." },
  { value: "48", label: "Hours curing", description: "Each layer cures fully before the next is applied." },
]

const pillars = [
  {
    title: "Responsible sourcing",
    description: "Certified plantations only. No illegal logging. No endangered species.",
  },
  {
    title: "Low VOC finishes",
    description: "Natural oil and water-based finishes. Food-safe. No harsh chemistry.",
  },
  {
    title: "Minimal waste",
    description: "Offcuts are reused where possible. Each build is planned to reduce waste.",
  },
  {
    title: "Built to last",
    description: "Designed to be repaired, not replaced. Solid construction for decades of use.",
  },
]

export default function CraftMaterialsPage() {
  return (
    <main className="min-h-screen bg-sand">
      <Header />

      <section className="px-5 pb-14 pt-32 md:px-10 md:pb-20 lg:px-16 lg:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
          <FadeInUp>
            <p className="type-label mb-5">Workshop standards</p>
            <h1 className="max-w-2xl text-[clamp(2.75rem,6.5vw,5.75rem)] leading-[.92]">
              Craft you can see in the grain.
            </h1>
            <p className="mt-7 max-w-xl text-lg font-light leading-relaxed text-ink/70 md:text-xl">
              Traditional woodworking, contemporary form. Solid timber, hand joinery, and finishes chosen to last — not to be replaced.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#process"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-clay px-7 py-3.5 font-condensed text-sm font-semibold uppercase tracking-[.14em] text-sand transition-colors hover:bg-umber"
              >
                See the process <ArrowRight size={16} />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full border border-ink/25 px-7 py-3.5 font-condensed text-sm font-semibold uppercase tracking-[.14em] text-ink transition-colors hover:bg-stone"
              >
                Shop the collection
              </Link>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.08} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-stone md:aspect-[4/3] md:rounded-[2.5rem]">
            <Image
              src="/images/craft/timber.jpg"
              alt="Close walnut grain used in Aakar furniture"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />
          </FadeInUp>
        </div>
      </section>

      <section id="process" className="px-5 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <FadeInUp className="max-w-2xl">
            <p className="type-label mb-4">Our process</p>
            <h2 className="text-3xl md:text-4xl">Four stages, one standard.</h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/65">
              From raw timber to a finished piece — each stage is slow on purpose.
            </p>
          </FadeInUp>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((item, index) => (
              <FadeInUp key={item.step} delay={index * 0.06} className="overflow-hidden rounded-[1.75rem] bg-stone">
                <div className="relative aspect-[5/4]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 md:p-7">
                  <p className="font-condensed text-xs font-semibold tracking-[0.16em] text-clay">{item.step}</p>
                  <h3 className="mt-2 !normal-case !tracking-[-0.02em] font-hero text-xl font-medium text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">{item.description}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-umber/15 bg-stone px-5 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <FadeInUp className="mx-auto max-w-2xl text-center">
            <p className="type-label mb-4">Materials</p>
            <h2 className="text-3xl md:text-4xl">Chosen for character, built for years.</h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-ink/65">
              Walnut, brass, and natural finishes — selected for how they look now, and how they will look in twenty years.
            </p>
          </FadeInUp>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {materials.map((material, index) => (
              <FadeInUp key={material.title} delay={index * 0.06} className="overflow-hidden rounded-[1.75rem] bg-sand">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={material.image}
                    alt={material.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 md:p-7">
                  <h3 className="!normal-case !tracking-[-0.02em] font-hero text-xl font-medium text-ink">
                    {material.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">{material.description}</p>
                  <ul className="mt-5 space-y-1.5">
                    {material.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2 text-sm text-ink/70">
                        <span className="mt-2 h-px w-3 shrink-0 bg-clay" aria-hidden />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeInUp className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-stone md:aspect-[5/4] md:rounded-[2.5rem]">
            <Image
              src="/images/craft/chair.jpg"
              alt="Solid wood furniture joinery and turned leg"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </FadeInUp>

          <FadeInUp delay={0.08}>
            <p className="type-label mb-4">Joinery &amp; finish</p>
            <h2 className="text-3xl md:text-4xl">No screws. No shortcuts.</h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/65">
              Mortise and tenon is the foundation — each joint cut and fitted by hand. Surfaces are sanded through seven grits, then sealed so the timber stays the hero.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {finishingStats.map((stat) => (
                <div key={stat.label} className="border-t border-umber/20 pt-5">
                  <p className="font-hero text-4xl font-light tracking-tight text-ink">{stat.value}</p>
                  <p className="mt-2 font-condensed text-[11px] font-semibold uppercase tracking-[0.14em] text-clay">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{stat.description}</p>
                </div>
              ))}
            </div>
          </FadeInUp>
        </div>
      </section>

      <section className="bg-[#2A241F] px-5 py-16 text-sand md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
            <FadeInUp>
              <p className="mb-4 font-condensed text-xs font-semibold uppercase tracking-[0.18em] text-[#D9C8B7]">
                Built to last
              </p>
              <h2 className="text-3xl text-sand md:text-4xl">The most sustainable piece is the one you keep.</h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-sand/70">
                Solid wood, traditional joinery, and a 2-year structural warranty. Inspected at every stage before it leaves the workshop.
              </p>
            </FadeInUp>
            <div className="grid gap-6 sm:grid-cols-2">
              {pillars.map((pillar, index) => (
                <FadeInUp key={pillar.title} delay={index * 0.05} className="border-t border-sand/15 pt-5">
                  <h3 className="!normal-case !tracking-[-0.02em] font-hero text-lg font-medium text-sand">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-sand/65">{pillar.description}</p>
                </FadeInUp>
              ))}
            </div>
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
