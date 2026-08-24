"use client"

import { useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Download, ImagePlus, Loader2, Sofa, X } from "lucide-react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export type SeeInRoomProduct = {
  slug: string
  name: string
  category: string
  image: string
  price: string
}

type SeeInYourRoomToolProps = {
  products: SeeInRoomProduct[]
  initialProductSlug?: string
}

async function compressRoomPhoto(file: File) {
  const bitmap = await createImageBitmap(file)
  const maxEdge = 1600
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement("canvas")
  canvas.width = Math.max(1, Math.round(bitmap.width * scale))
  canvas.height = Math.max(1, Math.round(bitmap.height * scale))
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Could not prepare the room photo.")
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => (result ? resolve(result) : reject(new Error("Could not prepare the room photo."))),
      "image/jpeg",
      0.86
    )
  })

  return new File([blob], "room.jpg", { type: "image/jpeg" })
}

export function SeeInYourRoomTool({ products, initialProductSlug }: SeeInYourRoomToolProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [roomPreview, setRoomPreview] = useState<string | null>(null)
  const [roomFile, setRoomFile] = useState<File | null>(null)
  const [selectedSlug, setSelectedSlug] = useState(initialProductSlug ?? "")
  const [pickerOpen, setPickerOpen] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const selectedProduct = useMemo(
    () => products.find((product) => product.slug === selectedSlug) ?? null,
    [products, selectedSlug]
  )

  const canGenerate = Boolean(roomFile && selectedProduct) && !generating

  const resetPreview = () => {
    setResult(null)
    setError(null)
  }

  const handleRoomFile = (file: File | undefined) => {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose a photo file.")
      return
    }
    if (file.size > 12 * 1024 * 1024) {
      toast.error("Please use a photo under 12MB.")
      return
    }

    const url = URL.createObjectURL(file)
    setRoomPreview((current) => {
      if (current) URL.revokeObjectURL(current)
      return url
    })
    setRoomFile(file)
    resetPreview()
  }

  const handleGenerate = async () => {
    if (!roomFile || !selectedProduct) return
    setGenerating(true)
    setError(null)

    try {
      const compressed = await compressRoomPhoto(roomFile)
      const formData = new FormData()
      formData.append("roomPhoto", compressed)
      formData.append("productSlug", selectedProduct.slug)

      const res = await fetch("/api/see-in-your-room", {
        method: "POST",
        body: formData,
      })
      const payload = (await res.json()) as { image?: string; error?: string }
      if (!res.ok || !payload.image) {
        throw new Error(payload.error || "Couldn't create a preview. Please try again later.")
      }
      setResult(payload.image)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Couldn't create a preview. Please try again later."
      setError(message)
      toast.error("Preview failed")
    } finally {
      setGenerating(false)
    }
  }

  const quoteHref = selectedProduct
    ? `/contact?product=${encodeURIComponent(selectedProduct.slug)}&source=see_in_room`
    : "/contact"

  return (
    <>
      <div className="max-w-5xl mx-auto bg-muted/40 p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">1. Upload Room Photo</h3>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(event) => handleRoomFile(event.target.files?.[0])}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="aspect-[4/3] w-full bg-white border border-dashed border-border flex items-center justify-center overflow-hidden relative"
              >
                {roomPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={roomPreview} alt="Uploaded room" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <span className="flex flex-col items-center gap-2 px-6 text-sm text-muted-foreground">
                    <ImagePlus size={22} />
                    No photo uploaded
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 w-full border border-foreground/20 text-foreground font-semibold py-3 hover:bg-foreground hover:text-background transition-colors"
              >
                {roomPreview ? "Change Room Photo" : "Upload Room Photo"}
              </button>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">2. Select Furniture</h3>
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className="aspect-[4/3] w-full bg-white border border-dashed border-border flex items-center justify-center overflow-hidden relative"
              >
                {selectedProduct ? (
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="flex flex-col items-center gap-2 px-6 text-sm text-muted-foreground">
                    <Sofa size={22} />
                    No product selected
                  </span>
                )}
              </button>
              {selectedProduct && (
                <p className="mt-2 text-sm text-foreground">
                  {selectedProduct.name}
                  <span className="text-muted-foreground"> · {selectedProduct.category}</span>
                </p>
              )}
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className="mt-3 w-full border border-foreground/20 text-foreground font-semibold py-3 hover:bg-foreground hover:text-background transition-colors"
              >
                {selectedProduct ? "Change Product" : "Select Product"}
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="font-semibold text-foreground mb-3">Preview Result</h3>
            <div className="flex-1 aspect-[4/3] w-full bg-white border border-dashed border-border flex items-center justify-center overflow-hidden relative">
              {generating && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/80 px-6 text-center">
                  <Loader2 className="animate-spin text-foreground" size={28} />
                  <p className="text-sm text-muted-foreground">Placing the piece in your room. This can take about 15–30 seconds.</p>
                </div>
              )}
              {result ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={result} alt="Furniture preview in your room" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                !generating && (
                  <p className="text-sm text-muted-foreground text-center px-6">
                    Your preview will appear here once a room photo and product are selected.
                  </p>
                )
              )}
            </div>

            {error && <p className="mt-3 text-sm leading-relaxed text-destructive">{error}</p>}

            <button
              type="button"
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="mt-3 w-full bg-foreground text-background font-semibold py-3 hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
              {generating ? "Generating preview…" : "Generate Preview"}
            </button>

            <div className="mt-3 flex gap-3">
              {result && (
                <a
                  href={result}
                  download={`${selectedProduct?.slug ?? "aakar"}-in-your-room.png`}
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-foreground/20 text-foreground font-semibold py-3 hover:bg-foreground hover:text-background transition-colors"
                >
                  <Download size={16} />
                  Save
                </a>
              )}
              <Link
                href={quoteHref}
                className={`${result ? "flex-1" : "w-full"} block text-center bg-primary text-primary-foreground font-semibold py-3 hover:bg-umber transition-colors`}
              >
                Request a Quote
              </Link>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              This is an approximate visual, not an exact scale or AR overlay.
            </p>
          </div>
        </div>
      </div>

      <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Select furniture</DialogTitle>
            <DialogDescription>Choose a piece to preview in your room photo.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {products.map((product) => {
              const isActive = product.slug === selectedSlug
              return (
                <button
                  key={product.slug}
                  type="button"
                  onClick={() => {
                    setSelectedSlug(product.slug)
                    setPickerOpen(false)
                    resetPreview()
                  }}
                  className={`text-left border p-2 transition-colors ${
                    isActive ? "border-foreground" : "border-border hover:border-foreground/40"
                  }`}
                >
                  <div className="relative mb-2 aspect-[4/3] overflow-hidden bg-muted">
                    <Image src={product.image} alt="" fill className="object-cover" />
                  </div>
                  <p className="text-sm font-medium text-foreground line-clamp-2">{product.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{product.category}</p>
                </button>
              )
            })}
          </div>
          {selectedSlug && (
            <button
              type="button"
              onClick={() => {
                setSelectedSlug("")
                resetPreview()
              }}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <X size={14} />
              Clear selection
            </button>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
