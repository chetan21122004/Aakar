"use client"

import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { formatINR, formatOptionsLabel } from "@/lib/format"

type OrderItem = {
  variant_id: string
  product_slug: string
  name: string
  sku: string
  options: { finish?: string }
  unit_price_paise: number
  qty: number
  line_total_paise: number
}

type Order = {
  id: string
  order_number: string
  status: string
  shipping_name: string
  shipping_phone: string
  shipping_address: string
  shipping_city: string
  shipping_state: string
  shipping_pincode: string
  total_paise: number
  order_items: OrderItem[]
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!orderId) {
      setLoading(false)
      return
    }
    fetch(`/api/orders/${orderId}`)
      .then((res) => res.json())
      .then((data) => setOrder(data.order ?? null))
      .catch(() => setOrder(null))
      .finally(() => setLoading(false))
  }, [orderId])

  if (loading) {
    return <div className="pt-32 pb-20 text-center type-body">Loading...</div>
  }

  return (
    <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-2xl mx-auto text-center">
        {order ? (
          <>
            <CheckCircle size={56} className="mx-auto mb-6 text-primary" />
            <h1 className="type-h1 mb-3">Order Received</h1>
            <p className="type-body mb-2">
              Thank you, {order.shipping_name}. Your order has been placed successfully.
            </p>
            <p className="font-sans text-sm text-muted-foreground mb-8">
              Order number: <span className="font-medium text-foreground">{order.order_number}</span>
            </p>

            <div className="mb-6 rounded border border-amber-200 bg-amber-50 px-4 py-3 font-sans text-sm text-amber-900">
              Status: {order.status.replace("_", " ")} — Razorpay payment integration coming soon.
            </div>

            <div className="border border-border bg-card p-6 text-left mb-8">
              <h2 className="type-h3 text-lg mb-4">Order Details</h2>
              <ul className="space-y-4 mb-6">
                {order.order_items.map((item) => (
                  <li key={item.variant_id} className="flex justify-between gap-3">
                    <div className="text-left">
                      <p className="font-sans text-sm font-medium">{item.name}</p>
                      <p className="font-sans text-xs text-muted-foreground">
                        {formatOptionsLabel(item.options)} × {item.qty}
                      </p>
                    </div>
                    <p className="type-price-sm">{formatINR(item.line_total_paise)}</p>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border pt-4 space-y-1 font-sans text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-medium">{formatINR(order.total_paise)}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border font-sans text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Shipping to</p>
                <p>{order.shipping_address}</p>
                <p>
                  {order.shipping_city}, {order.shipping_state} — {order.shipping_pincode}
                </p>
                <p className="mt-1">{order.shipping_phone}</p>
              </div>
            </div>

            <Link href="/shop" className="btn-primary">
              Continue Shopping
            </Link>
          </>
        ) : (
          <>
            <h1 className="type-h1 mb-4">No Order Found</h1>
            <p className="type-body mb-8">Place an order to see your confirmation here.</p>
            <Link href="/shop" className="btn-primary">
              Shop Now
            </Link>
          </>
        )}
      </div>
    </section>
  )
}

export default function OrderConfirmationPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<div className="pt-32 pb-20 text-center type-body">Loading...</div>}>
        <OrderConfirmationContent />
      </Suspense>
      <FooterSection />
    </main>
  )
}
