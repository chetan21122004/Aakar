import { createHmac } from "crypto"
import { createAdminClient } from "@/lib/supabase/admin"
import { getOrCreateCart } from "@/lib/cart-server"

const RAZORPAY_API = "https://api.razorpay.com/v1"

export function getRazorpayKeyId() {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim()
  if (!keyId) {
    throw new Error("Missing NEXT_PUBLIC_RAZORPAY_KEY_ID")
  }
  return keyId
}

function getRazorpayKeySecret() {
  const secret = process.env.RAZORPAY_KEY_SECRET?.trim()
  if (!secret) {
    throw new Error(
      "Missing RAZORPAY_KEY_SECRET. Copy the Test Key Secret from Razorpay Dashboard → Account & Settings → API Keys."
    )
  }
  return secret
}

export function assertRazorpayConfigured() {
  getRazorpayKeyId()
  getRazorpayKeySecret()
}

function authHeader() {
  const credentials = Buffer.from(`${getRazorpayKeyId()}:${getRazorpayKeySecret()}`).toString("base64")
  return `Basic ${credentials}`
}

export type RazorpayOrder = {
  id: string
  amount: number
  currency: string
  receipt: string | null
  status: string
}

export async function createRazorpayOrder(input: {
  amountPaise: number
  receipt: string
  notes: Record<string, string>
}): Promise<RazorpayOrder> {
  const res = await fetch(`${RAZORPAY_API}/orders`, {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: input.amountPaise,
      currency: "INR",
      receipt: input.receipt.slice(0, 40),
      notes: input.notes,
    }),
  })

  const data = (await res.json()) as RazorpayOrder & { error?: { description?: string } }
  if (!res.ok) {
    throw new Error(data.error?.description ?? "Failed to create Razorpay order")
  }
  return data
}

export function verifyPaymentSignature(input: {
  orderId: string
  paymentId: string
  signature: string
}) {
  const expected = createHmac("sha256", getRazorpayKeySecret())
    .update(`${input.orderId}|${input.paymentId}`)
    .digest("hex")
  return expected === input.signature
}

export function verifyWebhookSignature(rawBody: string, signature: string | null) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET?.trim()
  if (!secret || !signature) return false
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex")
  return expected === signature
}

export async function markOrderPaid(input: {
  orderId: string
  providerOrderId: string
  providerPaymentId: string
  rawPayload: unknown
  guestToken?: string | null
}) {
  const admin = createAdminClient()

  const { data: order, error: orderError } = await admin
    .from("orders")
    .select("id, status, user_id")
    .eq("id", input.orderId)
    .maybeSingle()

  if (orderError || !order) {
    throw new Error("Order not found")
  }

  const { data: payment } = await admin
    .from("payments")
    .select("id, status")
    .eq("order_id", input.orderId)
    .eq("provider_order_id", input.providerOrderId)
    .maybeSingle()

  if (!payment) {
    throw new Error("Payment record not found for this order")
  }

  if (payment.status !== "captured") {
    await admin
      .from("payments")
      .update({
        provider_payment_id: input.providerPaymentId,
        status: "captured",
        raw_payload: input.rawPayload,
      })
      .eq("id", payment.id)
  }

  if (order.status !== "paid") {
    await admin
      .from("orders")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
      })
      .eq("id", input.orderId)

    await admin.from("order_events").insert({
      order_id: input.orderId,
      status: "paid",
      actor: "system",
      note: "Razorpay payment captured",
    })
  }

  try {
    const cartId = await getOrCreateCart(order.user_id, input.guestToken)
    await admin.from("cart_items").delete().eq("cart_id", cartId)
  } catch {
    if (order.user_id) {
      const { data: cart } = await admin
        .from("carts")
        .select("id")
        .eq("user_id", order.user_id)
        .maybeSingle()
      if (cart) {
        await admin.from("cart_items").delete().eq("cart_id", cart.id)
      }
    }
  }

  return { alreadyPaid: order.status === "paid" }
}

export async function markPaymentFailed(input: {
  providerOrderId: string
  rawPayload: unknown
}) {
  const admin = createAdminClient()
  await admin
    .from("payments")
    .update({
      status: "failed",
      raw_payload: input.rawPayload,
    })
    .eq("provider_order_id", input.providerOrderId)
    .neq("status", "captured")
}
