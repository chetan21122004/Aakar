import { readFile } from "node:fs/promises"
import path from "node:path"

const DEFAULT_MODELS = ["gemini-2.5-flash-image", "gemini-3.1-flash-image-preview"]

type InlineImage = {
  mimeType: string
  data: string
}

type GeminiPart = {
  text?: string
  inlineData?: { mimeType?: string; data?: string }
  inline_data?: { mime_type?: string; mimeType?: string; data?: string }
}

type GeminiResponse = {
  error?: { message?: string; status?: string; code?: number }
  promptFeedback?: { blockReason?: string }
  candidates?: Array<{
    finishReason?: string
    content?: { parts?: GeminiPart[] }
  }>
}

export function getGeminiApiKey() {
  return (process.env.GEMINI_API_KEY ?? "").trim()
}

function imageModels() {
  const preferred = (process.env.GEMINI_IMAGE_MODEL ?? "").trim()
  return [...new Set([preferred, ...DEFAULT_MODELS].filter(Boolean))]
}

export function mimeFromFilename(filename: string) {
  const ext = path.extname(filename).toLowerCase()
  if (ext === ".png") return "image/png"
  if (ext === ".webp") return "image/webp"
  if (ext === ".gif") return "image/gif"
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg"
  return ""
}

export async function loadProductImage(imagePath: string): Promise<InlineImage> {
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    const res = await fetch(imagePath)
    if (!res.ok) {
      throw new Error("Could not load the product image.")
    }
    const buffer = Buffer.from(await res.arrayBuffer())
    const headerType = res.headers.get("content-type")?.split(";")[0]?.trim()
    return {
      mimeType: headerType && headerType.startsWith("image/") ? headerType : mimeFromFilename(imagePath) || "image/jpeg",
      data: buffer.toString("base64"),
    }
  }

  const relative = imagePath.replace(/^\/+/, "").replace(/\\/g, "/")
  const absolute = path.join(process.cwd(), "public", relative)
  const buffer = await readFile(absolute)
  return {
    mimeType: mimeFromFilename(absolute) || "image/webp",
    data: buffer.toString("base64"),
  }
}

function buildPrompt(input: {
  productName: string
  category: string
  dimensions?: string
}) {
  const sizeLine = input.dimensions
    ? `Approximate real-world size: ${input.dimensions}. Scale the piece accordingly.`
    : "Scale the piece to a realistic size for this type of furniture in the room."

  return [
    "Edit the first photograph so the furniture from the second image appears naturally in that room.",
    `Furniture: ${input.productName} (${input.category || "furniture"}).`,
    sizeLine,
    "The second image is a catalog photo. Extract only the furniture piece itself. Ignore any studio background, floor, walls, or extra objects from that catalog photo.",
    "Keep the room's architecture, walls, floor, windows, existing objects, lighting, and camera angle unchanged.",
    "Match perspective, shadows, and wood/finish details of the catalog piece. Do not invent a different design.",
    "Place it in a sensible spot for this furniture type, such as against a wall or in an open floor area.",
    "Photorealistic result only. No text, captions, watermarks, or labels.",
  ].join(" ")
}

function extractImage(payload: GeminiResponse): InlineImage | null {
  const parts = payload.candidates?.[0]?.content?.parts ?? []
  for (const part of parts) {
    const inline = part.inlineData ?? part.inline_data
    const data = inline?.data
    if (!data) continue
    const mimeType =
      inline.mimeType ||
      ("mime_type" in inline ? String(inline.mime_type) : "") ||
      "image/png"
    return { mimeType, data }
  }
  return null
}

function isMissingModel(status: number, payload: GeminiResponse) {
  const message = payload.error?.message?.toLowerCase() ?? ""
  return status === 404 || message.includes("not found") || message.includes("is not found")
}

async function generateWithModel(input: {
  apiKey: string
  model: string
  room: InlineImage
  product: InlineImage
  prompt: string
}) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${input.model}:generateContent`
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": input.apiKey,
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType: input.room.mimeType, data: input.room.data } },
            { inlineData: { mimeType: input.product.mimeType, data: input.product.data } },
            { text: input.prompt },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    }),
  })

  const payload = (await res.json()) as GeminiResponse
  const retryAfter = Number.parseInt(res.headers.get("retry-after") ?? "", 10)
  return {
    status: res.status,
    payload,
    retryAfterMs: Number.isFinite(retryAfter) ? retryAfter * 1000 : undefined,
  }
}

const PREVIEW_UNAVAILABLE = "Couldn't create a preview. Please try again later."

function isQuotaExhausted(payload: GeminiResponse) {
  const message = payload.error?.message?.toLowerCase() ?? ""
  const status = payload.error?.status?.toUpperCase() ?? ""
  return (
    status === "RESOURCE_EXHAUSTED" ||
    message.includes("quota") ||
    message.includes("billing") ||
    message.includes("exceeded")
  )
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function composeFurnitureInRoom(input: {
  room: InlineImage
  product: InlineImage
  productName: string
  category: string
  dimensions?: string
}) {
  const apiKey = getGeminiApiKey()
  if (!apiKey) {
    throw new Error(PREVIEW_UNAVAILABLE)
  }

  const prompt = buildPrompt(input)
  const models = imageModels()

  for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt++) {
      const { status, payload, retryAfterMs } = await generateWithModel({
        apiKey,
        model,
        room: input.room,
        product: input.product,
        prompt,
      })

      const image = extractImage(payload)
      if (image) return image

      if (isMissingModel(status, payload)) {
        break
      }

      if (payload.promptFeedback?.blockReason) {
        throw new Error("This photo couldn't be used. Try another one.")
      }

      const finishReason = payload.candidates?.[0]?.finishReason
      if (finishReason && finishReason !== "STOP" && finishReason !== "MAX_TOKENS") {
        throw new Error("This photo couldn't be used. Try another one.")
      }

      console.error("Gemini see-in-room error", { model, status, error: payload.error })

      if (status === 429) {
        if (!isQuotaExhausted(payload) && attempt === 0) {
          await sleep(Math.min(retryAfterMs ?? 8000, 15000))
          continue
        }
        throw new Error(PREVIEW_UNAVAILABLE)
      }
      if (status === 401 || status === 403) {
        throw new Error(PREVIEW_UNAVAILABLE)
      }
      throw new Error(PREVIEW_UNAVAILABLE)
    }
  }

  throw new Error(PREVIEW_UNAVAILABLE)
}
