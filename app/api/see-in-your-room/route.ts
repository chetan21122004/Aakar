import { NextResponse } from "next/server"
import { getProductBySlugFromDb } from "@/lib/catalog"
import { catalogProducts } from "@/lib/products"
import { isLocalhostHost, ROOM_PREVIEW_DAILY_LIMIT } from "@/lib/constants"
import {
  loadProductImage,
  mimeFromFilename,
} from "@/lib/gemini-see-in-room"
import { composeFurnitureInRoom } from "@/lib/openai-see-in-room"
import {
  consumeRoomPreviewSlot,
  refundRoomPreviewSlot,
} from "@/lib/room-preview-quota"
import { createClient } from "@/lib/supabase/server"
import {
  loadProductImage,
  mimeFromFilename,
} from "@/lib/gemini-see-in-room"
import { composeFurnitureInRoom } from "@/lib/openai-see-in-room"
import {
  consumeRoomPreviewSlot,
  refundRoomPreviewSlot,
} from "@/lib/room-preview-quota"
import { createClient } from "@/lib/supabase/server"

export const runtime = "nodejs"
export const maxDuration = 180

const ALLOWED_ROOM_TYPES = new Set(["image/jpeg", "image/png", "image/webp"])
const MAX_ROOM_BYTES = 8 * 1024 * 1024

async function resolveProduct(slug: string) {
  const fromDb = await getProductBySlugFromDb(slug)
  if (fromDb) return fromDb
  return catalogProducts.find((product) => product.slug === slug) ?? null
}

function errorStatus(message: string) {
  if (message.includes("Sign in")) return 401
  if (message.includes("daily limit") || message.includes("5 previews")) return 429
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
  let consumedFor: string | null = null
  let supabase: Awaited<ReturnType<typeof createClient>> | null = null

  try {
    supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: "Sign in to use the room preview." },
        { status: 401 },
      )
    }

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

    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? new URL(request.url).host
    const skipQuota = isLocalhostHost(host)
    let remaining: number | null = null

    if (!skipQuota) {
      const slot = await consumeRoomPreviewSlot(supabase, user.id)
      if (!slot.ok) {
        return NextResponse.json(
          {
            error: `You have used today's ${ROOM_PREVIEW_DAILY_LIMIT} previews. Please try again tomorrow.`,
            remaining: 0,
          },
          { status: 429 },
        )
      }
      consumedFor = user.id
      remaining = slot.remaining
    }

    const roomBuffer = Buffer.from(await roomPhoto.arrayBuffer())
    const productImage = await loadProductImage(product.image)
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
        remaining,
      },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch (error) {
    if (consumedFor && supabase) {
      await refundRoomPreviewSlot(supabase, consumedFor).catch(() => undefined)
    }
    const message =
      error instanceof Error && error.name === "TimeoutError"
        ? "The preview took too long. Please try again later."
        : error instanceof Error
          ? error.message
          : "Couldn't create a preview. Please try again later."
    return NextResponse.json({ error: message }, { status: errorStatus(message) })
  }
}
