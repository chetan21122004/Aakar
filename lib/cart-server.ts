import { createAdminClient } from "@/lib/supabase/admin"
import type { CartItem } from "@/contexts/cart-context"

export async function getOrCreateCart(userId?: string | null, guestToken?: string | null) {
  const admin = createAdminClient()

  if (userId) {
    const { data: existing } = await admin
      .from("carts")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle()
    if (existing) return existing.id

    const { data: created, error } = await admin
      .from("carts")
      .insert({ user_id: userId })
      .select("id")
      .single()
    if (error) throw error
    return created.id
  }

  if (!guestToken) throw new Error("Guest token required")

  const { data: existing } = await admin
    .from("carts")
    .select("id")
    .eq("guest_token", guestToken)
    .maybeSingle()
  if (existing) return existing.id

  const { data: created, error } = await admin
    .from("carts")
    .insert({ guest_token: guestToken })
    .select("id")
    .single()
  if (error) throw error
  return created.id
}

export async function loadCartItems(cartId: string): Promise<CartItem[]> {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from("cart_items")
    .select(
      `qty, variant_id,
       product_variants ( id, sku, options, price_paise,
         products ( slug, name, product_images ( path, sort_order ) )
       )`
    )
    .eq("cart_id", cartId)

  if (error || !data) return []

  return data
    .map((row) => {
      const variant = row.product_variants as {
        id: string
        options: { finish?: string }
        price_paise: number
        products: {
          slug: string
          name: string
          product_images: { path: string; sort_order: number }[]
        } | null
      } | null
      if (!variant?.products) return null

      const images = [...(variant.products.product_images ?? [])].sort(
        (a, b) => a.sort_order - b.sort_order
      )

      return {
        variantId: variant.id,
        productSlug: variant.products.slug,
        name: variant.products.name,
        image: images[0]?.path ?? "/catalog/hampi-rift-console.webp",
        options: variant.options ?? {},
        pricePaise: variant.price_paise,
        qty: row.qty,
      } satisfies CartItem
    })
    .filter(Boolean) as CartItem[]
}

export async function syncCartItems(cartId: string, items: CartItem[]) {
  const admin = createAdminClient()
  await admin.from("cart_items").delete().eq("cart_id", cartId)

  if (!items.length) return

  const rows = items.map((item) => ({
    cart_id: cartId,
    variant_id: item.variantId,
    qty: item.qty,
  }))

  const { error } = await admin.from("cart_items").insert(rows)
  if (error) throw error
}

export async function mergeGuestCartIntoUser(guestToken: string, userId: string) {
  const admin = createAdminClient()

  const { data: guestCart } = await admin
    .from("carts")
    .select("id")
    .eq("guest_token", guestToken)
    .maybeSingle()
  if (!guestCart) return

  const guestItems = await loadCartItems(guestCart.id)
  const userCartId = await getOrCreateCart(userId)
  const userItems = await loadCartItems(userCartId)

  const merged = [...userItems]
  for (const guestItem of guestItems) {
    const existing = merged.find((i) => i.variantId === guestItem.variantId)
    if (existing) {
      existing.qty += guestItem.qty
    } else {
      merged.push(guestItem)
    }
  }

  await syncCartItems(userCartId, merged)
  await admin.from("carts").delete().eq("id", guestCart.id)
}

export async function getOrCreateWishlist(userId?: string | null, guestToken?: string | null) {
  const admin = createAdminClient()

  if (userId) {
    const { data: existing } = await admin.from("wishlists").select("id").eq("user_id", userId).maybeSingle()
    if (existing) return existing.id
    const { data: created, error } = await admin.from("wishlists").insert({ user_id: userId }).select("id").single()
    if (error) throw error
    return created.id
  }

  if (!guestToken) throw new Error("Guest token required")
  const { data: existing } = await admin.from("wishlists").select("id").eq("guest_token", guestToken).maybeSingle()
  if (existing) return existing.id
  const { data: created, error } = await admin.from("wishlists").insert({ guest_token: guestToken }).select("id").single()
  if (error) throw error
  return created.id
}

export async function getWishlistProductIds(wishlistId: string): Promise<string[]> {
  const admin = createAdminClient()
  const { data } = await admin.from("wishlist_items").select("product_id").eq("wishlist_id", wishlistId)
  return (data ?? []).map((r) => r.product_id)
}
