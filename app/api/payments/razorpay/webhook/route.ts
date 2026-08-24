import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { markOrderPaid, markPaymentFailed, verifyWebhookSignature } from "@/lib/razorpay"

type RazorpayPaymentEntity = {
  id?: string
  order_id?: string
  amount?: number
  status?: string
}

type RazorpayWebhookPayload = {
  event?: string
  payload?: {
    payment?: {
      entity?: RazorpayPaymentEntity
    }
  }
}

export async function POST(request: Request) {
  const rawBody = await request.text()
  const signature = request.headers.get("x-razorpay-signature")

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 })
  }

  let event: RazorpayWebhookPayload
  try {
    event = JSON.parse(rawBody) as RazorpayWebhookPayload
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const payment = event.payload?.payment?.entity
  const providerOrderId = payment?.order_id
  const providerPaymentId = payment?.id

  if (!providerOrderId) {
    return NextResponse.json({ ok: true })
  }

  try {
    if (event.event === "payment.captured" && providerPaymentId) {
      const admin = createAdminClient()
      const { data: row } = await admin
        .from("payments")
        .select("order_id")
        .eq("provider_order_id", providerOrderId)
        .maybeSingle()

      if (row?.order_id) {
        await markOrderPaid({
          orderId: row.order_id,
          providerOrderId,
          providerPaymentId,
          rawPayload: event,
        })
      }
    }

    if (event.event === "payment.failed") {
      await markPaymentFailed({
        providerOrderId,
        rawPayload: event,
      })
    }
  } catch (error) {
    console.error("POST /api/payments/razorpay/webhook", error)
    return NextResponse.json({ error: "Webhook handling failed" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
