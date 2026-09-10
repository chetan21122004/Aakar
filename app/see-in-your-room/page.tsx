import Image from "next/image"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { FadeInUp } from "@/components/motion/scroll-motion"
import { getCatalogProducts } from "@/lib/catalog"
import { catalogProducts } from "@/lib/products"
import { SeeInYourRoomTool, type SeeInRoomProduct } from "./see-in-your-room-tool"

export const metadata = {
  title: "See in Your Room | Aakar Woodcraft",
  description: "Preview how selected furniture could look in your own space before requesting a quote.",
}

const steps = [
  { step: "01", title: "Choose a piece", description: "Start from a product, or pick one here." },
  { step: "02", title: "Add your room", description: "Take a photo or upload one from your phone." },
  { step: "03", title: "Generate a preview", description: "We place the piece into your photo." },
  { step: "04", title: "Request a quote", description: "Send the visual with your enquiry." },
]

function toToolProducts(products: { slug: string; name: string; category: string; image: string; price: string }[]): SeeInRoomProduct[] {
  return products.map((product) => ({
    slug: product.slug,
    name: product.name,
    category: product.category,
    image: product.image,
    price: product.price,
  }))
}

export default async function SeeInYourRoomPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>
}) {
  const { product: productSlug } = await searchParams
  const dbProducts = await getCatalogProducts()
  const products = toToolProducts(dbProducts.length ? dbProducts : catalogProducts)

  return (
    <main className="min-h-screen bg-sand">
      <Header />

      <section className="px-5 pb-10 pt-32 md:px-10 md:pb-14 lg:px-16 lg:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <FadeInUp>
            <p className="type-label mb-5">Visual preview</p>
            <h1 className="max-w-xl text-[clamp(2.6rem,6vw,5rem)] leading-[.92]">
              See the piece in your room.
            </h1>
            <p className="mt-6 max-w-lg text-lg font-light leading-relaxed text-ink/70">
              Upload a photo of your space. We’ll place the furniture into it so you can judge scale, colour, and presence before you order.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.08} className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-stone md:rounded-[2.5rem]">
            <Image
              src="/images/see-in-your-space/visualize-in-space.png"
              alt="Furniture previewed inside a living room"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </FadeInUp>
        </div>
      </section>

      <section className="px-5 pb-10 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <FadeInUp
              key={step.step}
              delay={index * 0.05}
              className="rounded-[1.5rem] bg-stone px-5 py-6 md:px-6"
            >
              <p className="font-condensed text-xs font-semibold tracking-[0.16em] text-clay">{step.step}</p>
              <h2 className="mt-3 !text-lg !font-medium !normal-case !tracking-[-0.02em] font-hero text-ink">
                {step.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{step.description}</p>
            </FadeInUp>
          ))}
        </div>
      </section>

      <section id="preview" className="px-5 pb-24 md:px-10 lg:px-16">
        <SeeInYourRoomTool products={products} initialProductSlug={productSlug} />
      </section>

      <FooterSection />
    </main>
  )
}
