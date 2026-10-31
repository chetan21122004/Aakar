import { NextResponse } from "next/server"
import { z } from "zod"
import { tryCreateAdminClient } from "@/lib/supabase/admin"
import { confirmAuthUserEmail } from "@/lib/supabase/confirm-user"
import { createClient } from "@/lib/supabase/server"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(request: Request) {
  try {
    const { email, password } = schema.parse(await request.json())
    const normalized = email.trim().toLowerCase()
    const supabase = await createClient()

    let { data, error } = await supabase.auth.signInWithPassword({
      email: normalized,
      password,
    })

    if (error && /not confirmed/i.test(error.message)) {
      const admin = tryCreateAdminClient()
      if (!admin) {
        return NextResponse.json({ error: "Account service is not configured." }, { status: 503 })
      }
      await confirmAuthUserEmail(admin, normalized)
      const retry = await supabase.auth.signInWithPassword({
        email: normalized,
        password,
      })
      data = retry.data
      error = retry.error
    }

    if (error || !data.user) {
      return NextResponse.json(
        { error: "Email or password is incorrect. Create an account if you are new." },
        { status: 400 },
      )
    }

    const name =
      (data.user.user_metadata?.full_name as string | undefined) ||
      (data.user.user_metadata?.name as string | undefined) ||
      normalized

    return NextResponse.json({
      ok: true,
      email: data.user.email ?? normalized,
      name,
      phone: (data.user.user_metadata?.phone as string | undefined) ?? "",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid sign in details" }, { status: 400 })
    }
    console.error("POST /api/auth/login", error)
    return NextResponse.json({ error: "Could not complete sign in." }, { status: 500 })
  }
}
