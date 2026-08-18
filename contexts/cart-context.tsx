"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { CART_STORAGE_KEY } from "@/lib/constants"
import { getOrCreateGuestToken } from "@/lib/guest-token"

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
  syncToServer: () => Promise<void>
}

const CartContext = createContext<CartContextValue | null>(null)

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false
  const item = value as CartItem
  return (
    typeof item.variantId === "string" &&
    typeof item.productSlug === "string" &&
    typeof item.name === "string" &&
    typeof item.pricePaise === "number" &&
    typeof item.qty === "number"
  )
}

function normalizeCart(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return []
  return raw.filter(isCartItem)
}

function loadLocalCart(): CartItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    return normalizeCart(JSON.parse(raw))
  } catch {
    return []
  }
}

async function fetchServerCart(guestToken: string): Promise<CartItem[]> {
  const res = await fetch("/api/cart", {
    headers: { "x-guest-token": guestToken },
  })
  if (!res.ok) return []
  const data = (await res.json()) as { items: CartItem[] }
  return normalizeCart(data.items)
}

async function pushServerCart(guestToken: string, items: CartItem[]) {
  await fetch("/api/cart", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-guest-token": guestToken,
    },
    body: JSON.stringify({ items }),
  })
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isReady, setIsReady] = useState(false)
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const syncToServer = useCallback(async (nextItems?: CartItem[]) => {
    const guestToken = getOrCreateGuestToken()
    if (!guestToken) return
    await pushServerCart(guestToken, nextItems ?? items)
  }, [items])

  useEffect(() => {
    let cancelled = false
    async function init() {
      const guestToken = getOrCreateGuestToken()
      const local = loadLocalCart()
      let server: CartItem[] = []
      try {
        server = await fetchServerCart(guestToken)
      } catch {
        server = []
      }
      if (!cancelled) {
        setItems(server.length ? server : local)
        setIsReady(true)
      }
    }
    init()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!isReady) return
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    if (syncTimer.current) clearTimeout(syncTimer.current)
    syncTimer.current = setTimeout(() => {
      void syncToServer(items)
    }, 400)
    return () => {
      if (syncTimer.current) clearTimeout(syncTimer.current)
    }
  }, [items, isReady, syncToServer])

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
      syncToServer,
    }),
    [items, itemCount, subtotalPaise, isReady, addItem, updateQty, removeItem, clearCart, syncToServer]
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
