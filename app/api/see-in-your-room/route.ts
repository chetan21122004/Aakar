import { NextResponse } from "next/server"
import { getProductBySlugFromDb } from "@/lib/catalog"
import { catalogProducts } from "@/lib/products"
import {
  loadProductImage,
  mimeFromFilename,
} from "@/lib/gemini-see-in-room"
import { composeFurnitureInRoom } from "@/lib/openai-see-in-room"
import { mkdir, open, readdir } from "node:fs/promises"
import path from "node:path"
import { randomUUID } from "node:crypto"

export const runtime = "nodejs"
export const maxDuration = 180

async function reserveLocalTestAttempt() {
  if (process.env.NODE_ENV === "production") return
  const directory = path.join(process.cwd(), ".room-preview-tests")
  await mkdir(directory, { recursive: true })
  const lock = await open(path.join(directory, "lock"), "wx").catch(() => null)
  if (!lock) throw new Error("Another preview request is being prepared. Please try again shortly.")
  try {
    const attempts = (await readdir(directory)).filter((name) => name.endsWith(".attempt"))
    if (attempts.length >= 3) throw new Error("The three-preview local test limit has been reached.")
    const marker = await open(path.join(directory, `${randomUUID()}.attempt`), "wx")
    await marker.close()
  } finally {
    await lock.close()
    const { unlink } = await import("node:fs/promises")
    await unlink(path.join(directory, "lock")).catch(() => undefined)
  }
}

const ALLOWED_ROOM_TYPES = new Set(["image/jpeg", "image/png", "image/webp"])
const MAX_ROOM_BYTES = 8 * 1024 * 1024

async function resolveProduct(slug: string) {
  const fromDb = await getProductBySlugFromDb(slug)
  if (fromDb) return fromDb
  return catalogProducts.find((product) => product.slug === slug) ?? null
}

function errorStatus(message: string) {
  if (
    message.includes("not configured") ||
    message.includes("unavailable") ||
    message.includes("contact the studio")
  ) {
    return 503
  }
  if (message.includes("capacity") || message.includes("too long") || message.includes("Could not generate")) {
    return 502
  }
  return 500
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY?.trim()) {
      return NextResponse.json(
        { error: "Room previews are not configured on this server yet." },
        { status: 503 },
      )
    }

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
        { status: 400 },
      )
    }

    const product = await resolveProduct(productSlug)
    if (!product) {
      return NextResponse.json({ error: "That product could not be found." }, { status: 404 })
    }

    const roomBuffer = Buffer.from(await roomPhoto.arrayBuffer())
    const productImage = await loadProductImage(product.image)

    await reserveLocalTestAttempt()
    const placementRaw = String(formData.get("placementHint") ?? "").trim()
    const preview = await composeFurnitureInRoom({
      room: { mimeType: roomMime, data: roomBuffer.toString("base64") },
      product: productImage,
      productName: product.name,
      category: product.category,
      dimensions: product.dimensions,
      placementHint: placementRaw || undefined,
    })

    return NextResponse.json(
      {
        image: `data:${preview.mimeType};base64,${preview.data}`,
        productName: product.name,
        productSlug: product.slug,
      },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch (error) {
    const message =
      error instanceof Error && error.name === "TimeoutError"
        ? "The preview took too long. Please try again later."
        : error instanceof Error
          ? error.message
          : "Couldn't create a preview. Please try again later."
    return NextResponse.json({ error: message }, { status: errorStatus(message) })
  }
}
