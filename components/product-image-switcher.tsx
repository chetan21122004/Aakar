"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

type ProductImageSwitcherProps = {
  href: string
  images: string[]
  alt: string
  sizes: string
  imageClassName?: string
}

export function ProductImageSwitcher({ href, images, alt, sizes, imageClassName }: ProductImageSwitcherProps) {
  const unique = [...new Set(images.filter(Boolean))]
  const [index, setIndex] = useState(0)
  const src = unique[index] ?? unique[0]

  if (!src) return null

  const show = (next: number) => {
    const count = unique.length
    setIndex((next + count) % count)
  }

  return (
    <>
      <Link href={href} className="absolute inset-0 block">
        <Image src={src} alt={alt} fill sizes={sizes} className={imageClassName} />
      </Link>
      {unique.length > 1 && (
        <div className="absolute inset-x-2 bottom-2 z-10 flex items-center justify-center gap-1">
          <button
            type="button"
            aria-label="Previous image"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              show(index - 1)
            }}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 font-sans text-xs text-[#302A26] shadow-sm"
          >
            ‹
          </button>
          <div className="flex max-w-[70%] flex-wrap items-center justify-center gap-1">
            {unique.map((_, imageIndex) => (
              <button
                key={imageIndex}
                type="button"
                aria-label={`Show image ${imageIndex + 1}`}
                aria-current={imageIndex === index}
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  setIndex(imageIndex)
                }}
                className={`h-1.5 w-1.5 rounded-full ${imageIndex === index ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next image"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              show(index + 1)
            }}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 font-sans text-xs text-[#302A26] shadow-sm"
          >
            ›
          </button>
        </div>
      )}
    </>
  )
}
