import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const admin = createAdminClient()
    const { data: order, error } = await admin
      .from("orders")
      .select(
        `id, order_number, user_id, email, phone, status, shipping_name, shipping_phone, shipping_email,
         shipping_address, shipping_city, shipping_state, shipping_pincode,
         subtotal_paise, shipping_paise, total_paise, placed_at,
         order_items ( variant_id, product_slug, name, sku, options, unit_price_paise, qty, line_total_paise )`
      )
      .eq("id", id)
      .maybeSingle()

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    if (user && (order as { user_id?: string | null }).user_id && (order as { user_id: string }).user_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json({ order })
  } catch (error) {
    console.error("GET /api/orders/[id]", error)
    return NextResponse.json({ error: "Failed to load order" }, { status: 500 })
  }
}
