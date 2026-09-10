import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getOrCreateCart, loadCartItems, syncCartItems } from "@/lib/cart-server"
import { tryCreateAdminClient } from "@/lib/supabase/admin"
import type { CartItem } from "@/contexts/cart-context"

export async function GET(request: Request) {
  try {
    if (!tryCreateAdminClient()) {
      return NextResponse.json({ items: [] })
    }
    const guestToken = request.headers.get("x-guest-token")
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const cartId = await getOrCreateCart(user?.id, guestToken)
    const items = await loadCartItems(cartId)
    return NextResponse.json({ items })
  } catch (error) {
    console.error("GET /api/cart", error)
    return NextResponse.json({ items: [] })
  }
}

export async function PUT(request: Request) {
  try {
    if (!tryCreateAdminClient()) {
      return NextResponse.json({ ok: true })
    }
    const guestToken = request.headers.get("x-guest-token")
    const body = (await request.json()) as { items: CartItem[] }
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const cartId = await getOrCreateCart(user?.id, guestToken)
    await syncCartItems(cartId, body.items ?? [])
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("PUT /api/cart", error)
    return NextResponse.json({ ok: true })
  }
}
