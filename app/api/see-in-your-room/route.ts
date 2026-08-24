import { NextResponse } from "next/server"
import { getProductBySlugFromDb } from "@/lib/catalog"
import { catalogProducts } from "@/lib/products"
import {
  composeFurnitureInRoom,
  loadProductImage,
  mimeFromFilename,
} from "@/lib/gemini-see-in-room"

export const runtime = "nodejs"
export const maxDuration = 60

const ALLOWED_ROOM_TYPES = new Set(["image/jpeg", "image/png", "image/webp"])
const MAX_ROOM_BYTES = 8 * 1024 * 1024

async function resolveProduct(slug: string) {
  const fromDb = await getProductBySlugFromDb(slug)
  if (fromDb) return fromDb
  return catalogProducts.find((product) => product.slug === slug) ?? null
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const productSlug = String(formData.get("productSlug") ?? "").trim()
    const roomPhoto = formData.get("roomPhoto")

    if (!productSlug) {
      return NextResponse.json({ error: "Select a furniture product." }, { status: 400 })
    }
    if (!(roomPhoto instanceof File) || roomPhoto.size === 0) {
      return NextResponse.json({ error: "Upload a photo of your room." }, { status: 400 })
    }
    if (roomPhoto.size > MAX_ROOM_BYTES) {
      return NextResponse.json({ error: "Room photo must be under 8MB." }, { status: 400 })
    }

    const roomMime = roomPhoto.type || mimeFromFilename(roomPhoto.name)
    if (!ALLOWED_ROOM_TYPES.has(roomMime)) {
      return NextResponse.json(
        { error: "Please upload a JPG, PNG, or WEBP photo of your room." },
        { status: 400 }
      )
    }

    const product = await resolveProduct(productSlug)
    if (!product) {
      return NextResponse.json({ error: "That product could not be found." }, { status: 404 })
    }

    const roomBuffer = Buffer.from(await roomPhoto.arrayBuffer())
    const productImage = await loadProductImage(product.image)

    const preview = await composeFurnitureInRoom({
      room: { mimeType: roomMime, data: roomBuffer.toString("base64") },
      product: productImage,
      productName: product.name,
      category: product.category,
      dimensions: product.dimensions,
    })

    return NextResponse.json({
      image: `data:${preview.mimeType};base64,${preview.data}`,
      productName: product.name,
      productSlug: product.slug,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Couldn't create a preview. Please try again later."
    console.error("POST /api/see-in-your-room", error)
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
