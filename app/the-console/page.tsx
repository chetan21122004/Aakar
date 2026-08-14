import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { CTASection } from "@/components/cta-section"
import { ConsoleSpecifications } from "@/components/console-specifications"
import { FadeInUp } from "@/components/motion/scroll-motion"
import { products } from "@/lib/data"

export const metadata = {
  title: "Hampi Rift Console | Aakar Woodcraft",
  description:
    "Discover the Hampi Rift Console—an architectural composition of divided forms, grounded proportions, and quiet utility.",
}

const consoleProduct = products.find((product) => product.slug === "fluted-console")!

const designNotes = [
  {
    title: "Monolithic Presence",
    description: "A grounded silhouette inspired by the strength and stillness of Hampi's stone landscape.",
    image: "/catalog/hampi-rift-console.webp",
  },
  {
    title: "Divided Form",
    description: "Separate volumes create rhythm and visual tension while remaining balanced as a whole.",
    image: "/catalog/hampi-rift-media-unit.webp",
  },
  {
    title: "Quiet Utility",
    description: "A restrained object designed to work comfortably in entryways, living rooms, and dining spaces.",
    image: "/catalog/hampi-rift-sofa.webp",
  },
]

const finishOptions = [
  { title: "Natural Oil", description: "A tactile, low-sheen finish that keeps the grain present." },
  { title: "Matte Lacquer", description: "A smooth protective finish with a restrained surface sheen." },
  { title: "Dark Stain", description: "A deeper tonal option that emphasizes the console's silhouette." },
]

export default function TheConsolePage() {
  return (
    <main className="min-h-screen bg-sand">
      <Header />

      <section className="px-5 pb-14 pt-32 md:px-10 md:pb-20 lg:px-16 lg:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          <FadeInUp>
            <p className="type-label mb-5">Hampi Rift Collection</p>
            <h1 className="text-[clamp(3.2rem,7vw,6.75rem)] leading-[.9]">Hampi Rift Console</h1>
            <p className="mt-6 max-w-xl text-xl font-light leading-snug text-ink/80 md:text-2xl">
              Strength, division, and balance in one grounded form.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/60">
              Inspired by Hampi's broken yet powerful landscape, the console brings together solid volumes and intentional separations—complete without appearing perfect.
            </p>
            <div className="mt-8 flex items-center gap-5">
              <p className="type-price">{consoleProduct.price}</p>
              <span className="h-8 w-px bg-umber/20" />
              <p className="text-sm text-ink/55">Made to order</p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-clay px-7 py-3.5 font-condensed text-sm font-semibold uppercase tracking-[.14em] text-sand transition-colors hover:bg-umber">
                Enquire about this piece <ArrowRight size={16} />
              </Link>
              <Link href="/products/fluted-console" className="inline-flex items-center justify-center rounded-full border border-ink/25 px-7 py-3.5 font-condensed text-sm font-semibold uppercase tracking-[.14em] text-ink transition-colors hover:bg-stone">
                View product
              </Link>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.08} className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-stone md:rounded-[2.5rem]">
            <Image
              src="/catalog/hampi-rift-console.webp"
              alt="Hampi Rift Console composed from divided architectural forms"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </FadeInUp>
        </div>
      </section>

      <section className="border-y border-umber/15 bg-stone px-5 py-8 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-3">
          {["Architectural silhouette", "Custom sizing available", consoleProduct.productionTime ?? "Made to order"].map((item) => (
            <div key={item} className="flex items-center justify-center gap-3 border-umber/20 py-2 sm:border-r sm:last:border-r-0">
              <Check size={16} className="text-clay" />
              <p className="font-condensed text-sm font-semibold uppercase tracking-[.12em] text-ink/75">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <FadeInUp className="mb-10 max-w-2xl md:mb-14">
            <p className="type-label mb-3">Design language</p>
            <h2 className="text-3xl md:text-4xl">A complete form, shaped by incompleteness.</h2>
          </FadeInUp>
          <div className="grid gap-6 md:grid-cols-3">
            {designNotes.map((note, index) => (
              <FadeInUp key={note.title} delay={index * 0.06} className="group rounded-[1.75rem] bg-stone p-4 md:p-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-sand">
                  <Image src={note.image} alt={note.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="px-2 pb-2 pt-6">
                  <h3 className="text-xl">{note.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">{note.description}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-24 lg:px-16">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-umber/10 bg-stone lg:grid-cols-2 md:rounded-[2.5rem]">
          <FadeInUp className="p-8 md:p-12 lg:p-14">
            <p className="type-label mb-3">Dimensions</p>
            <h2 className="mb-10 text-3xl md:text-4xl">Specifications</h2>
            <ConsoleSpecifications />
          </FadeInUp>
          <div className="border-t border-umber/15 bg-sand p-8 md:p-12 lg:border-l lg:border-t-0 lg:p-14">
            <p className="type-label mb-3">Finish palette</p>
            <h2 className="text-3xl md:text-4xl">Made for your interior.</h2>
            <p className="mt-5 text-sm leading-relaxed text-ink/60">
              Select a tonal direction during the enquiry process. Final material and finish specifications are confirmed before production.
            </p>
            <div className="mt-8 space-y-3">
              {finishOptions.map((finish) => (
                <div key={finish.title} className="rounded-[1.25rem] border border-umber/15 bg-stone p-5">
                  <h3 className="text-lg">{finish.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{finish.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink px-5 py-16 text-sand md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <FadeInUp>
            <p className="font-condensed text-xs font-semibold uppercase tracking-[.2em] text-clay">01 / Production</p>
            <h3 className="mt-4 text-2xl text-sand">{consoleProduct.productionTime}</h3>
            <p className="mt-4 text-sm leading-relaxed text-sand/60">Production begins after dimensions and finish are approved.</p>
          </FadeInUp>
          <FadeInUp delay={0.05}>
            <p className="font-condensed text-xs font-semibold uppercase tracking-[.2em] text-clay">02 / Delivery</p>
            <h3 className="mt-4 text-2xl text-sand">Planned with your space</h3>
            <p className="mt-4 text-sm leading-relaxed text-sand/60">Delivery requirements are discussed and confirmed with the order.</p>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="font-condensed text-xs font-semibold uppercase tracking-[.2em] text-clay">03 / Care</p>
            <h3 className="mt-4 text-2xl text-sand">Simple, regular care</h3>
            <p className="mt-4 text-sm leading-relaxed text-sand/60">Use a soft dry cloth and protect the surface from prolonged moisture and direct sunlight.</p>
          </FadeInUp>
        </div>
      </section>

      <CTASection
        title="Make the Hampi Rift Console yours"
        subtitle="Share your space, preferred dimensions, and finish direction. We will guide you through the next step."
        primaryText="Start Your Enquiry"
        primaryHref="/contact"
        secondaryText="Shop the Collection"
        secondaryHref="/collections/hampi-rift"
        dark
      />

      <FooterSection />
    </main>
  )
}
