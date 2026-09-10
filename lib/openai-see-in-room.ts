import "server-only"

type InlineImage = { mimeType: string; data: string }

export async function composeFurnitureInRoom(input: {
  room: InlineImage
  product: InlineImage
  productName: string
  category: string
  dimensions?: string
  placementHint?: string
}) {
  const key = process.env.OPENAI_API_KEY?.trim()
  if (!key) throw new Error("Room previews are not configured yet.")
  const form = new FormData()
  form.set("model", process.env.OPENAI_IMAGE_MODEL || "gpt-image-2.5-sunburst")
  form.set("quality", process.env.OPENAI_IMAGE_QUALITY || "low")
  form.set("size", "1024x1024")
  form.set("n", "1")
  form.set("output_format", "png")
  form.set("prompt", [
    "Edit the FIRST image, the customer's room photograph. Place only the furniture product from the SECOND reference image in that room.",
    `Product: ${input.productName}. Category: ${input.category}.`,
    input.dimensions ? `Catalog dimensions: ${input.dimensions}. Use these as approximate scale guidance.` : "Use a plausible scale for this furniture type.",
    "Preserve the room architecture, floor, walls, windows, camera angle, lighting, and existing furniture.",
    "Preserve the product silhouette, proportions, colour, material, legs, grain, and detailing. Do not redesign it or copy its background or other objects.",
    input.placementHint ? input.placementHint : "Place the piece in a sensible unoccupied area.",
    "Match perspective and natural contact shadows. Add no unrelated decoration, text, labels, or watermarks.",
  ].join("\n"))
  for (const [name, image] of [["room", input.room], ["product", input.product]] as const) {
    const extension = image.mimeType === "image/jpeg" ? "jpg" : image.mimeType.split("/")[1]
    form.append("image[]", new Blob([new Uint8Array(Buffer.from(image.data, "base64"))], { type: image.mimeType }), `${name}.${extension}`)
  }

  // One paid attempt only: retries can incur additional image charges.
  const response = await fetch("https://api.openai.com/v1/images/edits", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}` },
    body: form,
    signal: AbortSignal.timeout(150_000),
  })
  if (!response.ok) {
    // Never expose provider responses, credentials, or room images in logs.
    if (response.status === 401 || response.status === 403) throw new Error("Room previews are unavailable. Please contact the studio.")
    if (response.status === 429) throw new Error("Preview capacity has been reached. Please try again later.")
    throw new Error("Could not generate a preview. Please try another room photo.")
  }
  const payload = await response.json() as { data?: { b64_json?: string }[] }
  const data = payload.data?.[0]?.b64_json
  if (!data) throw new Error("No preview was returned. Please try another photo.")
  return { mimeType: "image/png", data }
}
