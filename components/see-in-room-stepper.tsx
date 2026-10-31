"use client"

import { Camera, Check, Download, PenLine, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const STEPS = [
  { id: 1, title: "Photo", short: "Photo", icon: Camera },
  { id: 2, title: "Mark the spot", short: "Mark", icon: PenLine },
  { id: 3, title: "Generate", short: "Generate", icon: Sparkles },
  { id: 4, title: "Save", short: "Save", icon: Download },
] as const

type SeeInRoomStepperProps = {
  activeStep: number
  className?: string
}

export function SeeInRoomStepper({ activeStep, className }: SeeInRoomStepperProps) {
  const clampedActive = Math.min(4, Math.max(1, activeStep))

  return (
    <nav
      aria-label="Preview steps"
      className={cn("w-full lg:max-w-xl lg:ml-auto", className)}
    >
      <ol className="grid grid-cols-4 gap-0 rounded-2xl border border-[#E7E0D8] bg-[#FFFcf8] p-2 shadow-sm sm:p-2.5">
        {STEPS.map((step, index) => {
          const done = step.id < clampedActive
          const current = step.id === clampedActive
          const Icon = step.icon

          return (
            <li key={step.id} className="relative flex min-w-0 flex-col items-center px-0.5 sm:px-1">
              {index < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute left-[calc(50%+1.1rem)] top-[1.15rem] hidden h-px w-[calc(100%-2.2rem)] sm:block",
                    done ? "bg-clay/70" : "bg-[#E7E0D8]",
                  )}
                />
              )}
              <span
                className={cn(
                  "relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors sm:h-10 sm:w-10",
                  done && "border-clay bg-clay text-white",
                  current && !done && "border-clay bg-clay text-white ring-4 ring-clay/20",
                  !done && !current && "border-[#E7E0D8] bg-sand text-ink/35",
                )}
              >
                {done ? <Check size={16} strokeWidth={2.5} /> : <Icon size={16} strokeWidth={current ? 2.25 : 2} />}
              </span>
              <span
                className={cn(
                  "mt-2 w-full truncate text-center font-sans text-[10px] font-medium leading-tight sm:text-[11px]",
                  current ? "text-ink" : done ? "text-ink/70" : "text-ink/40",
                )}
              >
                <span className="hidden sm:inline">{step.title}</span>
                <span className="sm:hidden">{step.short}</span>
              </span>
            </li>
          )
        })}
      </ol>
      <p className="mt-2 text-center font-sans text-[11px] text-ink/45 sm:text-left lg:text-right">
        Step {clampedActive} of 4 ·{" "}
        <span className="text-ink/65">{STEPS[clampedActive - 1]?.title}</span>
      </p>
    </nav>
  )
}

export function computeSeeInRoomStep(input: {
  hasPhoto: boolean
  hasMark: boolean
  hasProduct: boolean
  generating: boolean
  hasResult: boolean
}) {
  if (input.hasResult) return 4
  if (input.generating) return 3
  if (input.hasPhoto && input.hasProduct) return 3
  if (input.hasPhoto && input.hasMark) return 3
  if (input.hasPhoto) return 2
  return 1
}
