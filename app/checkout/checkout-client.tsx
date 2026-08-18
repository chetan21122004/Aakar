"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { useCart } from "@/contexts/cart-context"
import {
  FREE_SHIPPING_THRESHOLD_PAISE,
  SHIPPING_PAISE,
} from "@/lib/constants"
import { formatINR, formatOptionsLabel } from "@/lib/format"
import { getOrCreateGuestToken } from "@/lib/guest-token"

const checkoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone required"),
  email: z.string().email("Valid email required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(6, "Valid pincode required"),
})

type CheckoutForm = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotalPaise, clearCart, isReady, syncToServer } = useCart()
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const shippingPaise =
    subtotalPaise >= FREE_SHIPPING_THRESHOLD_PAISE ? 0 : items.length > 0 ? SHIPPING_PAISE : 0
  const totalPaise = subtotalPaise + shippingPaise

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({ resolver: zodResolver(checkoutSchema) })

  useEffect(() => {
    if (isReady && items.length === 0) {
      router.replace("/cart")
    }
  }, [isReady, items.length, router])

  const onSubmit = async (data: CheckoutForm) => {
    setPaying(true)
    setError(null)
    try {
      await syncToServer()
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, guestToken: getOrCreateGuestToken() }),
      })
      const result = await res.json()
      if (!res.ok) {
        setError(typeof result.error === "string" ? result.error : "Checkout failed")
        setPaying(false)
        return
      }
      clearCart()
      router.push(`/order-confirmation?orderId=${result.orderId}`)
    } catch {
      setError("Something went wrong. Please try again.")
      setPaying(false)
    }
  }

  if (!isReady || items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 text-center type-body">Loading...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2">
          <div>
            <h1 className="type-h1 mb-8">Checkout</h1>
            {error && (
              <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="type-label block mb-2">Full Name</label>
                <input {...register("name")} className="w-full border border-border bg-input px-4 py-3 font-sans text-sm" />
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="type-label block mb-2">Phone</label>
                  <input {...register("phone")} className="w-full border border-border bg-input px-4 py-3 font-sans text-sm" />
                  {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="type-label block mb-2">Email</label>
                  <input {...register("email")} type="email" className="w-full border border-border bg-input px-4 py-3 font-sans text-sm" />
                  {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <label className="type-label block mb-2">Address</label>
                <input {...register("address")} className="w-full border border-border bg-input px-4 py-3 font-sans text-sm" />
                {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>}
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <label className="type-label block mb-2">City</label>
                  <input {...register("city")} className="w-full border border-border bg-input px-4 py-3 font-sans text-sm" />
                </div>
                <div>
                  <label className="type-label block mb-2">State</label>
                  <input {...register("state")} className="w-full border border-border bg-input px-4 py-3 font-sans text-sm" />
                </div>
                <div>
                  <label className="type-label block mb-2">Pincode</label>
                  <input {...register("pincode")} className="w-full border border-border bg-input px-4 py-3 font-sans text-sm" />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full" disabled={paying}>
                {paying ? "Placing order..." : `Place Order - ${formatINR(totalPaise)}`}
              </button>
              <p className="font-sans text-xs text-muted-foreground text-center">
                Payment via Razorpay coming soon. Your order will be saved as pending payment.
              </p>
            </form>
          </div>

          <div className="border border-border bg-card p-6 h-fit">
            <h2 className="type-h3 text-lg mb-6">Order Summary</h2>
            <ul className="space-y-4 mb-6">
              {items.map((item) => (
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
            <div className="border-t border-border pt-4 space-y-2 font-sans text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatINR(subtotalPaise)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shippingPaise === 0 ? "Free" : formatINR(shippingPaise)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-border">
                <span>Total</span>
                <span>{formatINR(totalPaise)}</span>
              </div>
            </div>
            <Link href="/cart" className="block text-center mt-6 font-sans text-sm text-muted-foreground hover:text-foreground">
              ← Back to cart
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
