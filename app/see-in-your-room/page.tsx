import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { getCatalogProducts } from "@/lib/catalog"
import { catalogProducts } from "@/lib/products"
import { SeeInYourRoomTool, type SeeInRoomProduct } from "./see-in-your-room-tool"

export const metadata = {
  title: "See in Your Room | Aakar Woodcraft",
  description: "Preview how selected furniture could look in your own space before requesting a quote.",
}

const steps = [
  { step: "1", title: "Photo" },
  { step: "2", title: "Mark the spot" },
  { step: "3", title: "Generate" },
  { step: "4", title: "Quote" },
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

      <section className="px-5 pb-8 pt-24 md:px-10 md:pb-10 md:pt-28 lg:px-16 lg:pt-32">
        <div className="mx-auto mb-6 flex max-w-7xl flex-col gap-4 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="type-label mb-2">Visual preview</p>
            <h1 className="text-[clamp(2rem,4.2vw,3.4rem)] leading-[.95]">See the piece in your room.</h1>
            <p className="mt-3 max-w-xl text-base font-light leading-relaxed text-ink/70 md:text-lg">
              Upload a photo, mark the floor with the square or pen, then generate a preview. Your photo stays on this device if you refresh.
            </p>
          </div>
          <ol className="flex flex-wrap gap-2 lg:justify-end">
            {steps.map((step) => (
              <li
                key={step.step}
                className="inline-flex items-center gap-2 rounded-full border border-[#E7E0D8] bg-[#FFFcf8] px-3 py-1.5"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-clay font-sans text-[11px] font-medium text-white">
                  {step.step}
                </span>
                <span className="font-sans text-[13px] text-ink">{step.title}</span>
              </li>
            ))}
          </ol>
        </div>

        <SeeInYourRoomTool products={products} initialProductSlug={productSlug} />
      </section>

      <FooterSection />
    </main>
  )
}
