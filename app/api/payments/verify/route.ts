import { NextResponse } from "next/server"
import { z } from "zod"
import { markOrderPaid, verifyPaymentSignature } from "@/lib/razorpay"

const verifySchema = z.object({
  orderId: z.string().uuid(),
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
  guestToken: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = verifySchema.parse(await request.json())

    const valid = verifyPaymentSignature({
      orderId: body.razorpay_order_id,
      paymentId: body.razorpay_payment_id,
      signature: body.razorpay_signature,
    })

    if (!valid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 })
    }

    await markOrderPaid({
      orderId: body.orderId,
      providerOrderId: body.razorpay_order_id,
      providerPaymentId: body.razorpay_payment_id,
      rawPayload: {
        razorpay_order_id: body.razorpay_order_id,
        razorpay_payment_id: body.razorpay_payment_id,
        razorpay_signature: body.razorpay_signature,
      },
      guestToken: body.guestToken,
    })

    return NextResponse.json({ ok: true, orderId: body.orderId })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    const message = error instanceof Error ? error.message : "Failed to verify payment"
    console.error("POST /api/payments/verify", error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
