import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { Providers } from '@/components/providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aakar Woodcraft | Custom Wooden Furniture for Modern Indian Homes',
  description: 'Handcrafted custom wooden furniture, artistic collections, and made-to-order pieces for modern Indian homes.',
  generator: 'v0.app',
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased bg-background text-foreground">
        <Providers>
          {children}
          <WhatsAppButton />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
