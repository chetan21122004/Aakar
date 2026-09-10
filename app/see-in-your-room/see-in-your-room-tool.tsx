"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Camera, Download, ImagePlus, Loader2, Sofa, Sparkles, Upload, X } from "lucide-react"
import { toast } from "sonner"
import {
  placementHint,
  RoomMarkOverlay,
  type OverlayRect,
  type PlacementBox,
} from "@/components/room-mark-overlay"
import { SEE_IN_ROOM_DRAFT_KEY } from "@/lib/constants"
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

type OverlayMarks = { rect: OverlayRect | null; strokes: { x: number; y: number }[][] }

type Draft = {
  selectedSlug: string
  roomDataUrl: string | null
  roomImageSize: { width: number; height: number } | null
  placement: PlacementBox | null
  overlayMarks: OverlayMarks | null
  result: string | null
}

const MAX_STORED_RESULT = 1_400_000

const generationStages = [
  {
    title: "Reading your room",
    description: "Looking at the floor, walls, perspective and available space.",
  },
  {
    title: "Preparing the furniture",
    description: "Preserving the selected piece's shape, finish and proportions.",
  },
  {
    title: "Placing it naturally",
    description: "Matching scale, camera angle, light and contact shadows.",
  },
  {
    title: "Refining your preview",
    description: "Finishing the composition so it feels coherent and useful.",
  },
]

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
      0.82,
    )
  })

  return new File([blob], "room.jpg", { type: "image/jpeg" })
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function dataUrlToFile(dataUrl: string, name: string) {
  const [header, body] = dataUrl.split(",")
  const mime = header.match(/:(.*?);/)?.[1] ?? "image/jpeg"
  const binary = atob(body)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
  return new File([bytes], name, { type: mime })
}

export function SeeInYourRoomTool({ products, initialProductSlug }: SeeInYourRoomToolProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const uploadInputRef = useRef<HTMLInputElement>(null)
  const [hydrated, setHydrated] = useState(false)
  const [roomPreview, setRoomPreview] = useState<string | null>(null)
  const [roomFile, setRoomFile] = useState<File | null>(null)
  const [selectedSlug, setSelectedSlug] = useState(initialProductSlug ?? "")
  const [pickerOpen, setPickerOpen] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [generationStage, setGenerationStage] = useState(0)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [placement, setPlacement] = useState<PlacementBox | null>(null)
  const [overlayMarks, setOverlayMarks] = useState<OverlayMarks | null>(null)
  const [roomImageSize, setRoomImageSize] = useState<{ width: number; height: number } | null>(null)
  const [markHint, setMarkHint] = useState(false)
  const [roomSession, setRoomSession] = useState(0)

  const selectedProduct = useMemo(
    () => products.find((product) => product.slug === selectedSlug) ?? null,
    [products, selectedSlug],
  )

  const canGenerate = Boolean(roomFile && selectedProduct) && !generating

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SEE_IN_ROOM_DRAFT_KEY)
      if (raw) {
        const draft = JSON.parse(raw) as Draft
        if (draft.roomDataUrl) {
          setRoomPreview(draft.roomDataUrl)
          setRoomFile(dataUrlToFile(draft.roomDataUrl, "room.jpg"))
          setRoomImageSize(draft.roomImageSize ?? null)
          setMarkHint(!draft.placement)
        }
        if (!initialProductSlug && draft.selectedSlug) setSelectedSlug(draft.selectedSlug)
        if (draft.placement) setPlacement(draft.placement)
        if (draft.overlayMarks) setOverlayMarks(draft.overlayMarks)
        if (draft.result && draft.result.length < MAX_STORED_RESULT) setResult(draft.result)
      }
    } catch {
      /* ignore corrupt drafts */
    }
    setHydrated(true)
  }, [initialProductSlug])

  useEffect(() => {
    if (!hydrated) return
    const draft: Draft = {
      selectedSlug,
      roomDataUrl: roomPreview?.startsWith("data:") ? roomPreview : null,
      roomImageSize,
      placement,
      overlayMarks,
      result: result && result.length < MAX_STORED_RESULT ? result : null,
    }
    const timer = window.setTimeout(() => {
      try {
        localStorage.setItem(SEE_IN_ROOM_DRAFT_KEY, JSON.stringify(draft))
      } catch {
        try {
          localStorage.setItem(SEE_IN_ROOM_DRAFT_KEY, JSON.stringify({ ...draft, result: null }))
        } catch {
          /* quota */
        }
      }
    }, 250)
    return () => window.clearTimeout(timer)
  }, [hydrated, overlayMarks, placement, result, roomImageSize, roomPreview, selectedSlug])

  useEffect(() => {
    if (!generating) {
      setGenerationStage(0)
      return
    }

    const timer = window.setInterval(() => {
      setGenerationStage((current) => Math.min(current + 1, generationStages.length - 1))
    }, 18000)

    return () => window.clearInterval(timer)
  }, [generating])

  const resetPreview = () => {
    setResult(null)
    setError(null)
  }

  const handleRoomFile = async (file: File | undefined) => {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose a photo file.")
      return
    }
    if (file.size > 12 * 1024 * 1024) {
      toast.error("Please use a photo under 12MB.")
      return
    }

    try {
      const compressed = await compressRoomPhoto(file)
      const dataUrl = await fileToDataUrl(compressed)
      setRoomPreview(dataUrl)
      setRoomFile(compressed)
      setPlacement(null)
      setOverlayMarks(null)
      setMarkHint(true)
      setRoomSession((current) => current + 1)
      const probe = new window.Image()
      probe.onload = () => setRoomImageSize({ width: probe.naturalWidth, height: probe.naturalHeight })
      probe.src = dataUrl
      resetPreview()
    } catch {
      toast.error("Could not read that photo. Try another image.")
    }
  }

  const handleGenerate = async () => {
    if (!roomFile || !selectedProduct) return
    setGenerating(true)
    setError(null)
    setMarkHint(false)

    try {
      const compressed = await compressRoomPhoto(roomFile)
      const formData = new FormData()
      formData.append("roomPhoto", compressed)
      formData.append("productSlug", selectedProduct.slug)
      const hint = placementHint(placement)
      if (hint) formData.append("placementHint", hint)

      const res = await fetch("/api/see-in-your-room", {
        method: "POST",
        body: formData,
      })
      const payload = (await res.json().catch(() => ({}))) as { image?: string; error?: string }
      if (!res.ok || !payload.image) {
        throw new Error(
          payload.error ||
            (res.status === 502 || res.status === 504
              ? "The preview service is busy. Please try again in a moment."
              : "Couldn't create a preview. Please try again later."),
        )
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
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-[#E7E0D8] bg-[#FFFcf8] p-4 md:rounded-[2rem] md:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-stretch lg:gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-hero !text-xl !font-medium !normal-case !tracking-[-0.03em] text-ink md:!text-2xl">
                Your room
              </h2>
              {roomPreview && <span className="font-sans text-xs text-[#067D62]">Photo saved on this device</span>}
            </div>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="sr-only"
              onChange={(event) => {
                void handleRoomFile(event.target.files?.[0])
                event.currentTarget.value = ""
              }}
            />
            <input
              ref={uploadInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={(event) => {
                void handleRoomFile(event.target.files?.[0])
                event.currentTarget.value = ""
              }}
            />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] border border-dashed border-[#C4B5A5] bg-sand lg:min-h-[28rem] lg:aspect-auto">
              {roomPreview ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={roomPreview} alt="Uploaded room" className="absolute inset-0 h-full w-full object-cover" />
                  <RoomMarkOverlay
                    key={roomSession}
                    imageSrc={roomPreview}
                    imageSize={roomImageSize}
                    highlight={markHint}
                    initialRect={overlayMarks?.rect ?? null}
                    initialStrokes={overlayMarks?.strokes ?? []}
                    onPlacementChange={setPlacement}
                    onMarksChange={setOverlayMarks}
                    onInteract={() => setMarkHint(false)}
                  />
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => uploadInputRef.current?.click()}
                  className="flex h-full min-h-[14rem] w-full flex-col items-center justify-center gap-2 px-6 font-sans text-sm text-ink/55 transition-colors hover:text-ink"
                >
                  <ImagePlus size={22} />
                  Add a room photo to begin
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 font-sans !text-[13px] font-medium !normal-case !tracking-normal text-sand transition-colors hover:bg-umber"
              >
                <Camera size={16} />
                Take photo
              </button>
              <button
                type="button"
                onClick={() => uploadInputRef.current?.click()}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-ink/20 bg-sand px-4 py-2.5 font-sans !text-[13px] font-medium !normal-case !tracking-normal text-ink transition-colors hover:border-ink"
              >
                <Upload size={16} />
                Upload
              </button>
            </div>

            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="flex w-full items-center gap-3 rounded-[1.25rem] border border-[#E7E0D8] bg-sand p-2.5 text-left transition-colors hover:border-clay/50"
            >
              <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-[#EFE7DC]">
                {selectedProduct ? (
                  <Image src={selectedProduct.image} alt="" fill className="object-cover" />
                ) : (
                  <span className="flex h-full items-center justify-center text-ink/40">
                    <Sofa size={18} />
                  </span>
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-sans text-[11px] uppercase tracking-[0.14em] text-clay">Furniture</span>
                <span className="mt-0.5 block truncate font-hero !text-base !font-medium !normal-case !tracking-[-0.02em] text-ink">
                  {selectedProduct ? selectedProduct.name : "Select a piece"}
                </span>
                {selectedProduct && (
                  <span className="font-sans text-xs text-ink/50">{selectedProduct.category}</span>
                )}
              </span>
              <span className="shrink-0 font-sans text-xs text-ink/50">{selectedProduct ? "Change" : "Choose"}</span>
            </button>
          </div>

          <div className="flex flex-col">
            <h2 className="mb-4 font-hero !text-xl !font-medium !normal-case !tracking-[-0.03em] text-ink md:!text-2xl">
              Preview
            </h2>
            <div className="relative flex min-h-[16rem] flex-1 aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[1.5rem] border border-[#E7E0D8] bg-sand lg:min-h-[28rem] lg:aspect-auto">
              {generating && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-sand/95 px-6 text-center backdrop-blur-sm">
                  <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
                    <span className="absolute inset-0 animate-ping rounded-full border border-primary/20 [animation-duration:2.4s]" />
                    <span className="absolute inset-2 animate-spin rounded-full border border-ink/10 border-t-primary [animation-duration:1.8s]" />
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-sand shadow-lg">
                      <Sparkles size={20} className="animate-pulse" />
                    </span>
                  </div>

                  <p className="font-hero !text-lg !font-medium !normal-case !tracking-[-0.02em] text-ink">
                    {generationStages[generationStage].title}
                  </p>
                  <p className="mt-2 max-w-sm font-sans text-sm leading-relaxed text-ink/60">
                    {generationStages[generationStage].description}
                  </p>

                  <div className="mt-6 flex gap-1.5" aria-label={`Step ${generationStage + 1} of ${generationStages.length}`}>
                    {generationStages.map((stage, index) => (
                      <span
                        key={stage.title}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          index <= generationStage ? "w-7 bg-primary" : "w-3 bg-ink/15"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="mt-5 font-sans text-xs text-ink/45">Usually 1–3 minutes. Keep this page open.</p>
                </div>
              )}
              {result ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={result} alt="Furniture preview in your room" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                !generating && (
                  <p className="px-6 text-center font-sans text-sm text-ink/50">
                    Your generated preview will appear here.
                  </p>
                )
              )}
            </div>

            {error && <p className="mt-3 text-sm leading-relaxed text-destructive">{error}</p>}

            <button
              type="button"
              onClick={() => void handleGenerate()}
              disabled={!canGenerate}
              className="mt-4 w-full rounded-full bg-clay py-3.5 font-sans !text-sm font-medium !normal-case !tracking-normal text-white transition-colors hover:bg-umber disabled:pointer-events-none disabled:opacity-40"
            >
              {generating ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Creating your preview
                </span>
              ) : (
                "Generate preview"
              )}
            </button>

            <div className="mt-3 flex gap-3">
              {result && (
                <a
                  href={result}
                  download={`${selectedProduct?.slug ?? "aakar"}-in-your-room.png`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/20 py-3 font-sans !text-[13px] font-medium !normal-case !tracking-normal text-ink transition-colors hover:bg-sand"
                >
                  <Download size={16} />
                  Save
                </a>
              )}
              <Link
                href={quoteHref}
                className={`${result ? "flex-1" : "w-full"} block rounded-full bg-ink py-3 text-center font-sans !text-[13px] font-medium !normal-case !tracking-normal text-sand transition-colors hover:bg-umber`}
              >
                Request a quote
              </Link>
            </div>
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
                  className={`overflow-hidden rounded-2xl border p-2 text-left transition-colors ${
                    isActive ? "border-clay bg-sand" : "border-[#E7E0D8] hover:border-clay/60"
                  }`}
                >
                  <div className="relative mb-2 aspect-[4/3] overflow-hidden rounded-xl bg-sand">
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
