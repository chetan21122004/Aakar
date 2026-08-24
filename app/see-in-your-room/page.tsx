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
  { step: "01", title: "Choose a Furniture Product", description: "Pick a piece from our shop that you're interested in." },
  { step: "02", title: "Upload a Photo of Your Room", description: "Share a photo of the space where the piece would go." },
  { step: "03", title: "Preview the Furniture in Your Space", description: "See an approximate visual of how the piece could fit." },
  { step: "04", title: "Request a Quote with the Visual", description: "Send the preview along with your enquiry to our team." },
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
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl font-light text-foreground md:text-5xl mb-6">
            See Furniture in Your Room
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Preview how selected furniture could look in your own space before requesting a quote.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.step} className="text-center sm:text-left">
              <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center font-serif text-base text-foreground mb-4 mx-auto sm:mx-0">
                {step.step}
              </div>
              <h3 className="font-serif text-base text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <SeeInYourRoomTool products={products} initialProductSlug={productSlug} />
      </section>

      <FooterSection />
    </main>
  )
}
