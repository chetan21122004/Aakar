import { NextResponse } from "next/server"
import { z } from "zod"
import { createClient } from "@supabase/supabase-js"
import { tryCreateAdminClient } from "@/lib/supabase/admin"
import { confirmAuthUserEmail } from "@/lib/supabase/confirm-user"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(request: Request) {
  try {
    const { email, password } = schema.parse(await request.json())
    const normalized = email.trim().toLowerCase()
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
    const admin = tryCreateAdminClient()
    if (!url || !anon || !admin) {
      return NextResponse.json({ error: "Account service is not configured." }, { status: 503 })
    }

    const supabase = createClient(url, anon, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
    const { error } = await supabase.auth.signInWithPassword({
      email: normalized,
      password,
    })

    const unconfirmed = Boolean(error && /not confirmed/i.test(error.message))
    if (error && !unconfirmed) {
      return NextResponse.json(
        { error: "Email or password is incorrect. Create an account if you are new." },
        { status: 400 },
      )
    }

    if (unconfirmed) {
      await confirmAuthUserEmail(admin, normalized)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid sign in details" }, { status: 400 })
    }
    return NextResponse.json({ error: "Could not complete sign in." }, { status: 500 })
  }
}
