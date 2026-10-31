import { NextResponse } from "next/server"
import { z } from "zod"
import { tryCreateAdminClient } from "@/lib/supabase/admin"
import { confirmAuthUserEmail } from "@/lib/supabase/confirm-user"
import { createClient } from "@/lib/supabase/server"

const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(6),
})

async function signInAfterSignup(email: string, password: string) {
  const supabase = await createClient()
  let { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error && /not confirmed/i.test(error.message)) {
    const admin = tryCreateAdminClient()
    if (admin) {
      await confirmAuthUserEmail(admin, email)
      const retry = await supabase.auth.signInWithPassword({ email, password })
      data = retry.data
      error = retry.error
    }
  }

  return { data, error }
}

export async function POST(request: Request) {
  try {
    const body = signupSchema.parse(await request.json())
    const email = body.email.trim().toLowerCase()
    const admin = tryCreateAdminClient()

    if (!admin) {
      return NextResponse.json(
        { error: "Account service is not configured on the server." },
        { status: 503 },
      )
    }

    const { data, error } = await admin.auth.admin.createUser({
      email,
      password: body.password,
      email_confirm: true,
      user_metadata: { full_name: body.name, phone: body.phone },
    })

    if (error) {
      const alreadyExists = /already|registered|exists/i.test(error.message)
      if (!alreadyExists) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }
      const existing = await confirmAuthUserEmail(admin, email)
      if (!existing) {
        return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 })
      }
      await admin.from("profiles").upsert({
        id: existing.id,
        full_name: body.name,
        phone: body.phone,
      })
    } else if (data.user) {
      await admin.from("profiles").upsert({
        id: data.user.id,
        full_name: body.name,
        phone: body.phone,
      })
    }

    const { data: signedIn, error: signInError } = await signInAfterSignup(email, body.password)
    if (signInError || !signedIn.user) {
      return NextResponse.json(
        { error: signInError?.message || "Account created. Please sign in." },
        { status: 400 },
      )
    }

    return NextResponse.json({
      ok: true,
      email: signedIn.user.email ?? email,
      name: body.name,
      phone: body.phone,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid signup details" }, { status: 400 })
    }

    console.error("POST /api/auth/signup", error)
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 })
  }
}
