import React from "react"
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { Providers } from '@/components/providers'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'Aakar Woodcraft | Custom Wooden Furniture for Modern Indian Homes',
  description: 'Handcrafted custom wooden furniture, artistic collections, and made-to-order pieces for modern Indian homes.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}>
        <Providers>
          {children}
        </Providers>
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}
