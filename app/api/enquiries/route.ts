import { NextResponse } from "next/server"
import { z } from "zod"
import { createAdminClient } from "@/lib/supabase/admin"

const enquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(10),
  source: z.enum(["contact", "product", "architects", "see_in_room"]).default("contact"),
  productSlug: z.string().optional(),
  website: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = enquirySchema.parse(await request.json())

    if (body.website) {
      return NextResponse.json({ ok: true })
    }

    const admin = createAdminClient()
    let productId: string | null = null
    if (body.productSlug) {
      const { data: product } = await admin
        .from("products")
        .select("id")
        .eq("slug", body.productSlug)
        .maybeSingle()
      productId = product?.id ?? null
    }

    const { error } = await admin.from("enquiries").insert({
      name: body.name,
      email: body.email,
      phone: body.phone ?? null,
      project_type: body.projectType ?? null,
      message: body.message,
      source: body.source,
      product_id: productId,
    })

    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error("POST /api/enquiries", error)
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 })
  }
}
