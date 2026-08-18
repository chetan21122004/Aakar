import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { mergeGuestCartIntoUser } from "@/lib/cart-server"

export async function POST(request: Request) {
  try {
    const { guestToken } = (await request.json()) as { guestToken?: string }
    if (!guestToken) {
      return NextResponse.json({ error: "guestToken required" }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    await mergeGuestCartIntoUser(guestToken, user.id)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("POST /api/cart/merge", error)
    return NextResponse.json({ error: "Failed to merge cart" }, { status: 500 })
  }
}
