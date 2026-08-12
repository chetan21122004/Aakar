"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, X } from "lucide-react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useCart } from "@/contexts/cart-context"
import { formatINR, formatOptionsLabel } from "@/lib/format"

type CartDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, subtotalPaise, updateQty, removeItem } = useCart()

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-full max-h-none rounded-none sm:max-w-md">
        <DrawerHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <DrawerTitle className="type-h3 text-xl">Your Cart</DrawerTitle>
            <DrawerClose asChild>
              <button type="button" aria-label="Close cart" className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag size={40} className="mb-4 text-muted-foreground" />
              <p className="type-h3 text-lg mb-2">Your cart is empty</p>
              <p className="type-body text-sm mb-6">Browse our collection and add pieces you love.</p>
              <Link href="/shop" className="btn-primary" onClick={() => onOpenChange(false)}>
                Shop Now
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-muted">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.productSlug}`}
                      className="font-serif text-base text-foreground hover:text-primary line-clamp-1"
                      onClick={() => onOpenChange(false)}
                    >
                      {item.name}
                    </Link>
                    <p className="font-sans text-xs text-muted-foreground mt-0.5">
                      {formatOptionsLabel(item.options)}
                    </p>
                    <p className="type-price-sm mt-1">{formatINR(item.pricePaise)}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateQty(item.variantId, item.qty - 1)}
                        className="flex h-7 w-7 items-center justify-center border border-border"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-sans text-sm tabular-nums w-4 text-center">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.variantId, item.qty + 1)}
                        className="flex h-7 w-7 items-center justify-center border border-border"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.variantId)}
                        className="ml-auto font-sans text-xs text-muted-foreground hover:text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <DrawerFooter className="border-t border-border">
            <div className="flex justify-between mb-4">
              <span className="font-sans text-sm text-muted-foreground">Subtotal</span>
              <span className="type-price-sm text-base">{formatINR(subtotalPaise)}</span>
            </div>
            <Link href="/cart" className="btn-secondary w-full text-center" onClick={() => onOpenChange(false)}>
              View Cart
            </Link>
            <Link href="/checkout" className="btn-primary w-full text-center" onClick={() => onOpenChange(false)}>
              Checkout
            </Link>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}
