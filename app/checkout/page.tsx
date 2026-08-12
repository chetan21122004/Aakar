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
  ORDER_STORAGE_KEY,
  SHIPPING_PAISE,
} from "@/lib/constants"
import { formatINR, formatOptionsLabel } from "@/lib/format"

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
  const { items, subtotalPaise, clearCart, isReady } = useCart()
  const [paying, setPaying] = useState(false)

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

  const onSubmit = (data: CheckoutForm) => {
    setPaying(true)
    const orderId = `AKR-${Date.now().toString(36).toUpperCase()}`
    const order = {
      orderId,
      createdAt: new Date().toISOString(),
      shipping: data,
      items,
      subtotalPaise,
      shippingPaise,
      totalPaise,
      status: "paid" as const,
    }
    sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order))
    clearCart()
    router.push("/order-confirmation")
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
        <div className="max-w-5xl mx-auto">
          <h1 className="type-h1 mb-2">Checkout</h1>
          <p className="type-body mb-10">
            Already have an account?{" "}
            <Link href="/login" className="text-foreground underline underline-offset-2">
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-5">
              <h2 className="type-h3 text-lg">Shipping Details</h2>
              {(
                [
                  ["name", "Full Name"],
                  ["phone", "Phone"],
                  ["email", "Email"],
                  ["address", "Address"],
                  ["city", "City"],
                  ["state", "State"],
                  ["pincode", "Pincode"],
                ] as const
              ).map(([field, label]) => (
                <div key={field}>
                  <label className="type-label block mb-2">{label}</label>
                  <input
                    {...register(field)}
                    className="w-full border border-border bg-input px-4 py-3 font-sans text-sm text-foreground outline-none focus:border-foreground"
                  />
                  {errors[field] && (
                    <p className="mt-1 font-sans text-xs text-destructive">{errors[field]?.message}</p>
                  )}
                </div>
              ))}
            </div>

            <div>
              <div className="border border-border bg-card p-6 sticky top-28">
                <h2 className="type-h3 text-lg mb-6">Order Summary</h2>
                <ul className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <li key={item.variantId} className="flex gap-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-muted">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-sm font-medium line-clamp-1">{item.name}</p>
                        <p className="font-sans text-xs text-muted-foreground">
                          {formatOptionsLabel(item.options)} × {item.qty}
                        </p>
                      </div>
                      <p className="type-price-sm shrink-0">{formatINR(item.pricePaise * item.qty)}</p>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2 border-t border-border pt-4 font-sans text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatINR(subtotalPaise)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shippingPaise === 0 ? "Free" : formatINR(shippingPaise)}</span>
                  </div>
                  <div className="flex justify-between pt-2 text-base font-medium">
                    <span>Total</span>
                    <span>{formatINR(totalPaise)}</span>
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full mt-6" disabled={paying}>
                  {paying ? "Processing..." : `Pay ${formatINR(totalPaise)}`}
                </button>
                <p className="font-sans text-xs text-muted-foreground text-center mt-3">
                  Demo checkout — payment integration coming soon
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
