import { NextResponse } from "next/server"
import { z } from "zod"
import { tryCreateAdminClient } from "@/lib/supabase/admin"
import { confirmAuthUserEmail } from "@/lib/supabase/confirm-user"

const schema = z.object({
  email: z.string().email(),
})

/** Legacy clients: confirm email only (no redundant password check). */
export async function POST(request: Request) {
  try {
    const { email } = schema.parse(await request.json())
    const normalized = email.trim().toLowerCase()
    const admin = tryCreateAdminClient()
    if (!admin) {
      return NextResponse.json({ error: "Account service is not configured." }, { status: 503 })
    }

    await confirmAuthUserEmail(admin, normalized)
    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid sign in details" }, { status: 400 })
    }
    return NextResponse.json({ error: "Could not complete sign in." }, { status: 500 })
  }
}
