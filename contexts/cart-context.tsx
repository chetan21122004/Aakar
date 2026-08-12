"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { CART_STORAGE_KEY } from "@/lib/constants"

export type CartItem = {
  variantId: string
  productSlug: string
  name: string
  image: string
  options: { finish?: string; size?: string; wood?: string; fabric?: string }
  pricePaise: number
  qty: number
}

type CartContextValue = {
  items: CartItem[]
  itemCount: number
  subtotalPaise: number
  isReady: boolean
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void
  updateQty: (variantId: string, qty: number) => void
  removeItem: (variantId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as CartItem[]
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setItems(loadCart())
    setIsReady(true)
  }, [])

  useEffect(() => {
    if (!isReady) return
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items, isReady])

  const addItem = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.variantId === item.variantId)
      if (existing) {
        return prev.map((i) =>
          i.variantId === item.variantId ? { ...i, qty: i.qty + qty } : i
        )
      }
      return [...prev, { ...item, qty }]
    })
  }, [])

  const updateQty = useCallback((variantId: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.variantId !== variantId))
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.variantId === variantId ? { ...i, qty } : i))
    )
  }, [])

  const removeItem = useCallback((variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  )

  const subtotalPaise = useMemo(
    () => items.reduce((sum, item) => sum + item.pricePaise * item.qty, 0),
    [items]
  )

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotalPaise,
      isReady,
      addItem,
      updateQty,
      removeItem,
      clearCart,
    }),
    [items, itemCount, subtotalPaise, isReady, addItem, updateQty, removeItem, clearCart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
