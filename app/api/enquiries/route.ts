import { NextResponse } from "next/server"
import { z } from "zod"
import { ENQUIRY_SOURCES } from "@/lib/enquiries"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

const emptyToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value

const enquirySchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.preprocess(emptyToUndefined, z.string().trim().min(7).optional()),
  projectType: z.preprocess(emptyToUndefined, z.string().trim().min(1).optional()),
  message: z.string().trim().min(10),
  source: z.enum(ENQUIRY_SOURCES).default("contact"),
  productSlug: z.preprocess(emptyToUndefined, z.string().trim().min(1).optional()),
  website: z.preprocess(emptyToUndefined, z.string().optional()),
})

function isUnsupportedSourceEnum(error: { code?: string; message?: string } | null) {
  if (!error) return false
  const message = error.message?.toLowerCase() ?? ""
  return (
    error.code === "22P02" ||
    message.includes("enquiry_source") ||
    message.includes("invalid input value for enum")
  )
}

export async function POST(request: Request) {
  try {
    let json: unknown
    try {
      json = await request.json()
    } catch {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }
    const body = enquirySchema.parse(json)

    if (body.website) {
      return NextResponse.json({ ok: true })
    }

    const admin = createAdminClient()
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    let productId: string | null = null
    if (body.productSlug) {
      const { data: product } = await admin
        .from("products")
        .select("id")
        .eq("slug", body.productSlug)
        .maybeSingle()
      productId = product?.id ?? null
    }

    const projectType =
      body.source === "consultation"
        ? body.projectType
          ? body.projectType.startsWith("consultation:")
            ? body.projectType
            : `consultation:${body.projectType}`
          : "consultation:home"
        : (body.projectType ?? null)

    const row = {
      name: body.name,
      email: body.email,
      phone: body.phone ?? null,
      project_type: projectType,
      message: body.message,
      source: body.source,
      product_id: productId,
      user_id: user?.id ?? null,
    }

    const { error } = await admin.from("enquiries").insert(row)

    if (error && body.source === "consultation" && isUnsupportedSourceEnum(error)) {
      const { error: fallbackError } = await admin.from("enquiries").insert({
        ...row,
        source: "contact",
      })
      if (fallbackError) throw fallbackError
      return NextResponse.json({ ok: true })
    }

    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 })
    }
    console.error("POST /api/enquiries", error)
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 })
  }
}
