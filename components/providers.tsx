"use client"

import { CartProvider } from "@/contexts/cart-context"
import { Toaster } from "sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <Toaster position="bottom-right" richColors />
    </CartProvider>
  )
}
