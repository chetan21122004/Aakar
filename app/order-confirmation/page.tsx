"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle } from "lucide-react"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { ORDER_STORAGE_KEY } from "@/lib/constants"
import type { CartItem } from "@/contexts/cart-context"
import { formatINR, formatOptionsLabel } from "@/lib/format"

type StoredOrder = {
  orderId: string
  createdAt: string
  shipping: {
    name: string
    phone: string
    email: string
    address: string
    city: string
    state: string
    pincode: string
  }
  items: CartItem[]
  subtotalPaise: number
  shippingPaise: number
  totalPaise: number
  status: string
}

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<StoredOrder | null>(null)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(ORDER_STORAGE_KEY)
      if (raw) setOrder(JSON.parse(raw) as StoredOrder)
    } catch {
      setOrder(null)
    }
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          {order ? (
            <>
              <CheckCircle size={56} className="mx-auto mb-6 text-primary" />
              <h1 className="type-h1 mb-3">Order Confirmed</h1>
              <p className="type-body mb-2">
                Thank you, {order.shipping.name}. Your order has been placed successfully.
              </p>
              <p className="font-sans text-sm text-muted-foreground mb-8">
                Order number: <span className="font-medium text-foreground">{order.orderId}</span>
              </p>

              <div className="mb-6 rounded border border-amber-200 bg-amber-50 px-4 py-3 font-sans text-sm text-amber-900">
                Demo checkout — Razorpay payment integration coming soon. No real charge was made.
              </div>

              <div className="border border-border bg-card p-6 text-left mb-8">
                <h2 className="type-h3 text-lg mb-4">Order Details</h2>
                <ul className="space-y-4 mb-6">
                  {order.items.map((item) => (
                    <li key={item.variantId} className="flex gap-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-muted">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-sans text-sm font-medium">{item.name}</p>
                        <p className="font-sans text-xs text-muted-foreground">
                          {formatOptionsLabel(item.options)} × {item.qty}
                        </p>
                      </div>
                      <p className="type-price-sm">{formatINR(item.pricePaise * item.qty)}</p>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-border pt-4 space-y-1 font-sans text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total paid</span>
                    <span className="font-medium">{formatINR(order.totalPaise)}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border font-sans text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Shipping to</p>
                  <p>{order.shipping.address}</p>
                  <p>
                    {order.shipping.city}, {order.shipping.state} — {order.shipping.pincode}
                  </p>
                  <p className="mt-1">{order.shipping.phone}</p>
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

      <FooterSection />
    </main>
  )
}
