import { cn } from "@/lib/utils"

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-950 border-amber-200/80",
  confirmed: "bg-sky-100 text-sky-950 border-sky-200/80",
  processing: "bg-sky-100 text-sky-950 border-sky-200/80",
  shipped: "bg-violet-100 text-violet-950 border-violet-200/80",
  delivered: "bg-emerald-100 text-emerald-950 border-emerald-200/80",
  cancelled: "bg-neutral-200 text-neutral-700 border-neutral-300/80",
}

function formatStatus(status: string) {
  return status.replace(/_/g, " ")
}

export function OrderStatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase()
  const style = STATUS_STYLES[key] ?? "bg-muted text-foreground border-border"

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-0.5 font-sans text-[11px] font-semibold capitalize tracking-wide",
        style,
      )}
    >
      {formatStatus(status)}
    </span>
  )
}
