import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { getCatalogProducts } from "@/lib/catalog"
import { isLocalhostHost, ROOM_PREVIEW_DAILY_LIMIT } from "@/lib/constants"
import { catalogProducts } from "@/lib/products"
import { getRoomPreviewRemaining } from "@/lib/room-preview-quota"
import { createClient } from "@/lib/supabase/server"
import { cookies, headers } from "next/headers"
import { AUTH_COOKIE, parseAuthCookie } from "@/lib/auth-session"
import { SeeInYourRoomTool, type SeeInRoomProduct } from "./see-in-your-room-tool"

export const metadata = {
  title: "See in Your Room | Aakar Woodcraft",
  description: "Preview how selected furniture could look in your own space before requesting a quote.",
}

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
  const requestHeaders = await headers()
  const skipQuota = isLocalhostHost(requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host"))
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const cookieStore = await cookies()
  const localSession = parseAuthCookie(cookieStore.get(AUTH_COOKIE)?.value)
  const remainingPreviews =
    skipQuota
      ? null
      : user
        ? await getRoomPreviewRemaining(supabase, user.id).catch(() => ROOM_PREVIEW_DAILY_LIMIT)
        : localSession
          ? await getRoomPreviewRemaining(supabase, localSession.email).catch(() => ROOM_PREVIEW_DAILY_LIMIT)
          : 0
  const dbProducts = await getCatalogProducts()
  const products = toToolProducts(dbProducts.length ? dbProducts : catalogProducts)

  return (
    <main className="min-h-screen bg-sand">
      <Header />

      <section className="px-5 pb-8 pt-24 md:px-10 md:pb-10 md:pt-28 lg:px-16 lg:pt-32">
        <SeeInYourRoomTool
          products={products}
          initialProductSlug={productSlug}
          remainingPreviews={remainingPreviews}
          skipQuota={skipQuota}
        />
      </section>

      <FooterSection />
    </main>
  )
}
