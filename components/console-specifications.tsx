"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"

const MIN_WIDTH = 120
const MAX_WIDTH = 180
const DEFAULT_WIDTH = 150

export function ConsoleSpecifications() {
  const [width, setWidth] = useState(DEFAULT_WIDTH)

  const rows = [
    {
      label: "Width",
      value: (
        <div className="space-y-4">
          <p className="font-sans text-base tabular-nums text-foreground">{width} cm</p>
          <Slider
            min={MIN_WIDTH}
            max={MAX_WIDTH}
            step={1}
            value={[width]}
            onValueChange={(value) => setWidth(value[0] ?? DEFAULT_WIDTH)}
            aria-label="Adjustable width"
          />
          <p className="text-sm text-muted-foreground">
            Adjustable between {MIN_WIDTH}–{MAX_WIDTH} cm
          </p>
        </div>
      ),
    },
    { label: "Depth", value: "40 cm" },
    { label: "Height", value: "75 cm" },
  ]

  return (
    <div className="border border-border">
      {rows.map((row, index) => (
        <div
          key={row.label}
          className={`grid grid-cols-1 gap-2 border-border px-6 py-5 sm:grid-cols-[140px_1fr] sm:gap-8 ${
            index < rows.length - 1 ? "border-b" : ""
          }`}
        >
          <p className="type-label">{row.label}</p>
          {typeof row.value === "string" ? (
            <p className="font-sans text-base tabular-nums text-foreground">{row.value}</p>
          ) : (
            row.value
          )}
        </div>
      ))}
    </div>
  )
}
