import { NextResponse } from "next/server"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getOrCreateCart, loadCartItems } from "@/lib/cart-server"
import {
  FREE_SHIPPING_THRESHOLD_PAISE,
  SHIPPING_PAISE,
} from "@/lib/constants"

const checkoutSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().min(6),
  guestToken: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = checkoutSchema.parse(await request.json())
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const admin = createAdminClient()

    const cartId = await getOrCreateCart(user?.id, body.guestToken)
    const items = await loadCartItems(cartId)
    if (!items.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    const variantIds = items.map((i) => i.variantId)
    const { data: variants, error: variantError } = await admin
      .from("product_variants")
      .select(`id, sku, options, price_paise, products ( slug, name, production_time_label )`)
      .in("id", variantIds)
      .eq("is_active", true)

    if (variantError || !variants?.length) {
      return NextResponse.json({ error: "Invalid cart items" }, { status: 400 })
    }

    const variantMap = new Map(variants.map((v) => [v.id, v]))
    let subtotalPaise = 0
    const orderItems: {
      variant_id: string
      product_slug: string
      name: string
      sku: string
      options: Record<string, string>
      unit_price_paise: number
      qty: number
      line_total_paise: number
      lead_time_days: number | null
    }[] = []

    for (const item of items) {
      const variant = variantMap.get(item.variantId)
      if (!variant) {
        return NextResponse.json({ error: "Product no longer available" }, { status: 400 })
      }
      const product = variant.products as { slug: string; name: string; production_time_label: string | null } | null
      const unitPrice = variant.price_paise
      const lineTotal = unitPrice * item.qty
      subtotalPaise += lineTotal
      orderItems.push({
        variant_id: variant.id,
        product_slug: product?.slug ?? item.productSlug,
        name: product?.name ?? item.name,
        sku: variant.sku,
        options: (variant.options as Record<string, string>) ?? {},
        unit_price_paise: unitPrice,
        qty: item.qty,
        line_total_paise: lineTotal,
        lead_time_days: null,
      })
    }

    const shippingPaise =
      subtotalPaise >= FREE_SHIPPING_THRESHOLD_PAISE ? 0 : SHIPPING_PAISE
    const totalPaise = subtotalPaise + shippingPaise

    const { data: order, error: orderError } = await admin
      .from("orders")
      .insert({
        user_id: user?.id ?? null,
        email: body.email,
        phone: body.phone,
        status: "pending_payment",
        shipping_name: body.name,
        shipping_phone: body.phone,
        shipping_email: body.email,
        shipping_address: body.address,
        shipping_city: body.city,
        shipping_state: body.state,
        shipping_pincode: body.pincode,
        subtotal_paise: subtotalPaise,
        shipping_paise: shippingPaise,
        total_paise: totalPaise,
        lead_time_label: "4–6 weeks",
      })
      .select("id, order_number")
      .single()

    if (orderError || !order) throw orderError

    await admin.from("order_items").insert(
      orderItems.map((item) => ({ ...item, order_id: order.id }))
    )
    await admin.from("order_events").insert({
      order_id: order.id,
      status: "pending_payment",
      actor: "customer",
      note: "Order placed",
    })
    await admin.from("cart_items").delete().eq("cart_id", cartId)

    return NextResponse.json({
      orderId: order.id,
      orderNumber: order.order_number,
      totalPaise,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error("POST /api/orders", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
