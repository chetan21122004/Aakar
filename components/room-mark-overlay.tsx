"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Eraser, PenLine, Square } from "lucide-react"
import { cn } from "@/lib/utils"

export type PlacementBox = {
  left: number
  top: number
  width: number
  height: number
}

type Point = { x: number; y: number }
type Tool = "box" | "pen"

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

function overlayToImage(
  point: Point,
  imageSize: { width: number; height: number },
  overlaySize: { width: number; height: number },
) {
  const scale = Math.max(overlaySize.width / imageSize.width, overlaySize.height / imageSize.height)
  const drawW = imageSize.width * scale
  const drawH = imageSize.height * scale
  const ox = (overlaySize.width - drawW) / 2
  const oy = (overlaySize.height - drawH) / 2
  return {
    x: clamp01((point.x * overlaySize.width - ox) / drawW),
    y: clamp01((point.y * overlaySize.height - oy) / drawH),
  }
}

function boxFromPoints(points: Point[]): PlacementBox | null {
  if (points.length < 2) return null
  const xs = points.map((point) => point.x)
  const ys = points.map((point) => point.y)
  const left = Math.min(...xs)
  const top = Math.min(...ys)
  const width = Math.max(...xs) - left
  const height = Math.max(...ys) - top
  if (width < 0.03 || height < 0.03) return null
  return { left, top, width, height }
}

export function placementHint(box: PlacementBox | null) {
  if (!box) return ""
  const left = Math.round(box.left * 100)
  const right = Math.round((box.left + box.width) * 100)
  const top = Math.round(box.top * 100)
  const bottom = Math.round((box.top + box.height) * 100)
  return `The customer marked a placement area covering roughly left ${left}%–${right}% and top ${top}%–${bottom}% of the room photograph. Place the furniture on the floor inside that marked area. Do not draw boxes, pens, arrows, or any annotation in the output.`
}

export function RoomMarkOverlay({
  imageSrc,
  imageSize,
  onPlacementChange,
}: {
  imageSrc: string
  imageSize: { width: number; height: number } | null
  onPlacementChange: (box: PlacementBox | null) => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tool, setTool] = useState<Tool>("box")
  const [rect, setRect] = useState<{ start: Point; end: Point } | null>(null)
  const [strokes, setStrokes] = useState<Point[][]>([])
  const drawing = useRef(false)
  const rectRef = useRef(rect)
  const strokesRef = useRef(strokes)
  rectRef.current = rect
  strokesRef.current = strokes

  const redraw = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const { width, height } = canvas
    ctx.clearRect(0, 0, width, height)
    ctx.strokeStyle = "rgba(168, 111, 71, 0.95)"
    ctx.fillStyle = "rgba(168, 111, 71, 0.18)"
    ctx.lineWidth = 3
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.setLineDash([8, 6])

    if (rect) {
      const x = Math.min(rect.start.x, rect.end.x) * width
      const y = Math.min(rect.start.y, rect.end.y) * height
      const w = Math.abs(rect.end.x - rect.start.x) * width
      const h = Math.abs(rect.end.y - rect.start.y) * height
      ctx.fillRect(x, y, w, h)
      ctx.strokeRect(x, y, w, h)
    }

    ctx.setLineDash([])
    strokes.forEach((stroke) => {
      if (stroke.length < 2) return
      ctx.beginPath()
      ctx.moveTo(stroke[0].x * width, stroke[0].y * height)
      stroke.slice(1).forEach((point) => ctx.lineTo(point.x * width, point.y * height))
      ctx.stroke()
    })
  }, [rect, strokes])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const frame = canvas.parentElement
    if (!frame) return
    const sync = () => {
      const next = frame.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(next.width))
      canvas.height = Math.max(1, Math.round(next.height))
      redraw()
    }
    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [redraw, imageSrc])

  useEffect(() => {
    redraw()
  }, [redraw])

  const publish = useCallback(
    (nextRect: { start: Point; end: Point } | null, nextStrokes: Point[][]) => {
      const overlayPoints: Point[] = []
      if (nextRect) overlayPoints.push(nextRect.start, nextRect.end)
      nextStrokes.forEach((stroke) => overlayPoints.push(...stroke))
      const overlayBox = boxFromPoints(overlayPoints)
      if (!overlayBox || !imageSize || !canvasRef.current) {
        onPlacementChange(overlayBox)
        return
      }
      const overlaySize = { width: canvasRef.current.width, height: canvasRef.current.height }
      const a = overlayToImage({ x: overlayBox.left, y: overlayBox.top }, imageSize, overlaySize)
      const b = overlayToImage(
        { x: overlayBox.left + overlayBox.width, y: overlayBox.top + overlayBox.height },
        imageSize,
        overlaySize,
      )
      onPlacementChange({
        left: Math.min(a.x, b.x),
        top: Math.min(a.y, b.y),
        width: Math.abs(b.x - a.x),
        height: Math.abs(b.y - a.y),
      })
    },
    [imageSize, onPlacementChange],
  )

  const pointFromEvent = (event: React.PointerEvent<HTMLCanvasElement>): Point | null => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const bounds = canvas.getBoundingClientRect()
    return {
      x: clamp01((event.clientX - bounds.left) / bounds.width),
      y: clamp01((event.clientY - bounds.top) / bounds.height),
    }
  }

  const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const point = pointFromEvent(event)
    if (!point) return
    event.currentTarget.setPointerCapture(event.pointerId)
    drawing.current = true
    if (tool === "box") {
      const next = { start: point, end: point }
      setRect(next)
    } else {
      setStrokes((current) => [...current, [point]])
    }
  }

  const onPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return
    const point = pointFromEvent(event)
    if (!point) return
    if (tool === "box") {
      setRect((current) => (current ? { ...current, end: point } : current))
    } else {
      setStrokes((current) => {
        const copy = [...current]
        const last = copy[copy.length - 1]
        if (!last) return current
        copy[copy.length - 1] = [...last, point]
        return copy
      })
    }
  }

  const onPointerUp = () => {
    if (!drawing.current) return
    drawing.current = false
    publish(rectRef.current, strokesRef.current)
  }

  const clear = () => {
    setRect(null)
    setStrokes([])
    onPlacementChange(null)
  }

  return (
    <div className="absolute inset-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full touch-none cursor-crosshair"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />
      <div className="absolute left-3 top-3 z-10 flex gap-1.5 rounded-full border border-[#E7E0D8] bg-[#F6EFE5]/95 p-1 shadow-sm">
        <button
          type="button"
          onClick={() => setTool("box")}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full",
            tool === "box" ? "bg-clay text-white" : "text-ink hover:bg-white",
          )}
          aria-label="Mark a rectangle"
          title="Mark area"
        >
          <Square size={16} />
        </button>
        <button
          type="button"
          onClick={() => setTool("pen")}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full",
            tool === "pen" ? "bg-clay text-white" : "text-ink hover:bg-white",
          )}
          aria-label="Draw with pen"
          title="Pen"
        >
          <PenLine size={16} />
        </button>
        <button
          type="button"
          onClick={clear}
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-white"
          aria-label="Clear marks"
          title="Clear"
        >
          <Eraser size={16} />
        </button>
      </div>
    </div>
  )
}
