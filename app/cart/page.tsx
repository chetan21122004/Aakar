"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingBag } from "lucide-react"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { useCart } from "@/contexts/cart-context"
import {
  FREE_SHIPPING_THRESHOLD_PAISE,
  SHIPPING_PAISE,
} from "@/lib/constants"
import { formatINR, formatOptionsLabel } from "@/lib/format"

export default function CartPage() {
  const { items, subtotalPaise, updateQty, removeItem } = useCart()

  const shippingPaise =
    subtotalPaise >= FREE_SHIPPING_THRESHOLD_PAISE ? 0 : items.length > 0 ? SHIPPING_PAISE : 0
  const totalPaise = subtotalPaise + shippingPaise

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="type-h1 mb-10">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <ShoppingBag size={48} className="mb-4 text-muted-foreground" />
              <p className="type-h3 text-xl mb-2">Your cart is empty</p>
              <p className="type-body mb-8">Discover handcrafted furniture made for modern Indian homes.</p>
              <Link href="/shop" className="btn-primary">
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                {items.map((item) => (
                  <div key={item.variantId} className="flex gap-5 border-b border-border pb-6">
                    <div className="relative h-28 w-28 shrink-0 overflow-hidden bg-muted">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <Link href={`/products/${item.productSlug}`} className="type-h3 text-lg hover:text-primary">
                        {item.name}
                      </Link>
                      <p className="font-sans text-sm text-muted-foreground mt-1">
                        {formatOptionsLabel(item.options)}
                      </p>
                      <p className="type-price-sm mt-2">{formatINR(item.pricePaise)}</p>
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => updateQty(item.variantId, item.qty - 1)}
                          className="flex h-8 w-8 items-center justify-center border border-border"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-sans text-sm tabular-nums w-6 text-center">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.variantId, item.qty + 1)}
                          className="flex h-8 w-8 items-center justify-center border border-border"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.variantId)}
                          className="ml-4 font-sans text-sm text-muted-foreground hover:text-destructive"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="type-price-sm hidden sm:block">
                      {formatINR(item.pricePaise * item.qty)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="border border-border bg-card p-6 sticky top-28">
                  <h2 className="type-h3 text-lg mb-6">Order Summary</h2>
                  <div className="space-y-3 font-sans text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="tabular-nums">{formatINR(subtotalPaise)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="tabular-nums">
                        {shippingPaise === 0 ? "Free" : formatINR(shippingPaise)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-3 text-base font-medium">
                      <span>Total</span>
                      <span className="tabular-nums">{formatINR(totalPaise)}</span>
                    </div>
                  </div>
                  <Link href="/checkout" className="btn-primary w-full text-center mt-6 block">
                    Proceed to Checkout
                  </Link>
                  <p className="font-sans text-xs text-muted-foreground text-center mt-4">
                    Free shipping on orders over ₹1,00,000
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
