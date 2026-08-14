"use client"

import { usePathname } from "next/navigation"
import type { CSSProperties, ReactNode } from "react"

const routeArtwork: Array<[string, string]> = [
  ["/collections/still-mandu", "/catalog/still-mandu-bed.webp"],
  ["/collections/hampi-rift", "/catalog/hampi-rift-sofa.webp"],
  ["/collections/fatehpur-sikri", "/catalog/fatehpur-sikri-sofa.webp"],
  ["/collections/bishnupur-temples", "/catalog/bishnupur-bed.webp"],
  ["/products/", "/catalog/still-mandu-coffee-table.webp"],
  ["/shop", "/catalog/hampi-rift-sofa.webp"],
  ["/collections", "/catalog/bishnupur-dining-table.webp"],
  ["/the-console", "/catalog/hampi-rift-console.webp"],
  ["/craft-materials", "/catalog/fatehpur-sikri-armchair.webp"],
  ["/process", "/catalog/still-mandu-dining-table.webp"],
  ["/for-architects", "/catalog/bishnupur-dining-table.webp"],
  ["/see-in-your-room", "/catalog/hampi-rift-sofa.webp"],
  ["/about", "/catalog/still-mandu-bed.webp"],
  ["/blog", "/catalog/bishnupur-console.webp"],
  ["/contact", "/catalog/fatehpur-sikri-sofa.webp"],
  ["/faq", "/catalog/still-mandu-lounge-chair.webp"],
  ["/cart", "/catalog/hampi-rift-console.webp"],
  ["/checkout", "/catalog/bishnupur-console.webp"],
  ["/order-confirmation", "/catalog/bishnupur-bed.webp"],
  ["/login", "/catalog/still-mandu-bed.webp"],
  ["/signup", "/catalog/still-mandu-bed.webp"],
  ["/account", "/catalog/still-mandu-bed.webp"],
]

export function RouteTheme({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const artwork = routeArtwork.find(([prefix]) => pathname.startsWith(prefix))?.[1]
  const isHome = pathname === "/"
  const style = artwork ? ({ "--route-art": `url(${artwork})` } as CSSProperties) : undefined

  return <div className={isHome ? "site-route--home" : "site-route--inner"} style={style}>{children}</div>
}
