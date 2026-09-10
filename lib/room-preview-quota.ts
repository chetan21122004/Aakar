import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import type { SupabaseClient } from "@supabase/supabase-js"
import { ROOM_PREVIEW_DAILY_LIMIT } from "@/lib/constants"

function kolkataDate() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date())
}

function isMissingQuotaStore(error: { message?: string; code?: string } | null) {
  const text = `${error?.message ?? ""} ${error?.code ?? ""}`
  return /does not exist|42P01|PGRST205|schema cache|could not find the function/i.test(text)
}

async function quotaFile(userId: string) {
  const directory = path.join(process.cwd(), ".data", "room-preview-quota")
  await mkdir(directory, { recursive: true })
  return path.join(directory, `${userId}-${kolkataDate()}.json`)
}

async function readFileCount(userId: string) {
  try {
    const raw = JSON.parse(await readFile(await quotaFile(userId), "utf8")) as { count?: number }
    return Math.max(0, Number(raw.count) || 0)
  } catch {
    return 0
  }
}

async function writeFileCount(userId: string, count: number) {
  await writeFile(await quotaFile(userId), JSON.stringify({ count }), "utf8")
}

export async function getRoomPreviewRemaining(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase.rpc("room_preview_usage_today")
  if (!error && typeof data === "number") {
    return Math.max(0, ROOM_PREVIEW_DAILY_LIMIT - data)
  }
  if (error && !isMissingQuotaStore(error)) {
    throw error
  }
  return Math.max(0, ROOM_PREVIEW_DAILY_LIMIT - (await readFileCount(userId)))
}

export async function consumeRoomPreviewSlot(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase.rpc("consume_room_preview")
  if (!error && typeof data === "number") {
    if (data < 0) return { ok: false, remaining: 0 }
    return { ok: true, remaining: ROOM_PREVIEW_DAILY_LIMIT - data }
  }
  if (error && !isMissingQuotaStore(error)) {
    throw error
  }

  const used = await readFileCount(userId)
  if (used >= ROOM_PREVIEW_DAILY_LIMIT) {
    return { ok: false, remaining: 0 }
  }
  const next = used + 1
  await writeFileCount(userId, next)
  return { ok: true, remaining: ROOM_PREVIEW_DAILY_LIMIT - next }
}

export async function refundRoomPreviewSlot(supabase: SupabaseClient, userId: string) {
  const { error } = await supabase.rpc("refund_room_preview")
  if (!error || !isMissingQuotaStore(error)) return
  const used = await readFileCount(userId)
  await writeFileCount(userId, Math.max(0, used - 1))
}
