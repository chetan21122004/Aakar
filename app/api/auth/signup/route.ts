import { NextResponse } from "next/server"
import { z } from "zod"
import { createAdminClient } from "@/lib/supabase/admin"

const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(6),
})

export async function POST(request: Request) {
  try {
    const body = signupSchema.parse(await request.json())
    const admin = createAdminClient()
    const { data, error } = await admin.auth.admin.createUser({
      email: body.email,
      password: body.password,
      email_confirm: true,
      user_metadata: { full_name: body.name, phone: body.phone },
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (data.user) {
      await admin.from("profiles").upsert({
        id: data.user.id,
        full_name: body.name,
        phone: body.phone,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid signup details" }, { status: 400 })
    }

    console.error("POST /api/auth/signup", error)
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 })
  }
}
