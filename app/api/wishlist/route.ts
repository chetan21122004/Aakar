import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getOrCreateWishlist, getWishlistProductIds } from "@/lib/cart-server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET(request: Request) {
  try {
    const guestToken = request.headers.get("x-guest-token")
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const wishlistId = await getOrCreateWishlist(user?.id, guestToken)
    const productIds = await getWishlistProductIds(wishlistId)
    return NextResponse.json({ productIds })
  } catch {
    return NextResponse.json({ productIds: [] })
  }
}

export async function POST(request: Request) {
  try {
    const guestToken = request.headers.get("x-guest-token")
    const { productId } = (await request.json()) as { productId: string }
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const wishlistId = await getOrCreateWishlist(user?.id, guestToken)
    const admin = createAdminClient()
    await admin.from("wishlist_items").upsert(
      { wishlist_id: wishlistId, product_id: productId },
      { onConflict: "wishlist_id,product_id" }
    )
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("POST /api/wishlist", error)
    return NextResponse.json({ error: "Failed to add" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const guestToken = request.headers.get("x-guest-token")
    const { productId } = (await request.json()) as { productId: string }
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const wishlistId = await getOrCreateWishlist(user?.id, guestToken)
    const admin = createAdminClient()
    await admin.from("wishlist_items").delete().eq("wishlist_id", wishlistId).eq("product_id", productId)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("DELETE /api/wishlist", error)
    return NextResponse.json({ error: "Failed to remove" }, { status: 500 })
  }
}
