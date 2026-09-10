export const primaryNavLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Console", href: "/the-console" },
  { label: "Craft", href: "/craft-materials" },
  { label: "Architects", href: "/for-architects" },
] as const

export const moreNavLinks = [
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
] as const

export const contactLink = { label: "Contact", href: "/contact" } as const

export const navLinks = [...primaryNavLinks, ...moreNavLinks, contactLink] as const
