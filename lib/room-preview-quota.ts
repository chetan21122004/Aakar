import { mkdir, readFile, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import type { SupabaseClient } from "@supabase/supabase-js"
import { ROOM_PREVIEW_DAILY_LIMIT } from "@/lib/constants"
import { tryCreateAdminClient } from "@/lib/supabase/admin"

function kolkataDate() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date())
}

function isServerlessHost() {
  return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NEXT_RUNTIME === "edge")
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

function safeFileKey(userId: string) {
  return Buffer.from(userId).toString("base64url").slice(0, 120)
}

function isMissingQuotaStore(error: { message?: string; code?: string } | null) {
  const text = `${error?.message ?? ""} ${error?.code ?? ""}`
  return /does not exist|42P01|PGRST205|schema cache|could not find the function|relation.*room_preview/i.test(text)
}

async function quotaFile(userId: string) {
  const directory = isServerlessHost()
    ? path.join(os.tmpdir(), "aakar-room-preview-quota")
    : path.join(process.cwd(), ".data", "room-preview-quota")
  await mkdir(directory, { recursive: true })
  return path.join(directory, `${safeFileKey(userId)}-${kolkataDate()}.json`)
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

async function readAdminCount(userId: string) {
  const admin = tryCreateAdminClient()
  if (!admin || !isUuid(userId)) return null

  const today = kolkataDate()
  const { data, error } = await admin
    .from("room_preview_daily_usage")
    .select("count")
    .eq("user_id", userId)
    .eq("usage_date", today)
    .maybeSingle()

  if (error) {
    if (isMissingQuotaStore(error)) return null
    throw error
  }

  return Math.max(0, Number(data?.count) || 0)
}

async function consumeViaAdmin(userId: string) {
  const admin = tryCreateAdminClient()
  if (!admin || !isUuid(userId)) return null

  const today = kolkataDate()
  const used = (await readAdminCount(userId)) ?? 0
  if (used >= ROOM_PREVIEW_DAILY_LIMIT) {
    return { ok: false as const, remaining: 0 }
  }

  const next = used + 1
  const { error } = await admin.from("room_preview_daily_usage").upsert(
    {
      user_id: userId,
      usage_date: today,
      count: next,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,usage_date" },
  )

  if (error) {
    if (isMissingQuotaStore(error)) return null
    throw error
  }

  return { ok: true as const, remaining: ROOM_PREVIEW_DAILY_LIMIT - next }
}

async function refundViaAdmin(userId: string) {
  const admin = tryCreateAdminClient()
  if (!admin || !isUuid(userId)) return

  const today = kolkataDate()
  const used = (await readAdminCount(userId)) ?? 0
  if (used <= 0) return

  const { error } = await admin
    .from("room_preview_daily_usage")
    .upsert(
      {
        user_id: userId,
        usage_date: today,
        count: Math.max(0, used - 1),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,usage_date" },
    )

  if (error && !isMissingQuotaStore(error)) {
    throw error
  }
}

async function consumeViaFile(userId: string) {
  const used = await readFileCount(userId)
  if (used >= ROOM_PREVIEW_DAILY_LIMIT) {
    return { ok: false as const, remaining: 0 }
  }
  const next = used + 1
  await writeFileCount(userId, next)
  return { ok: true as const, remaining: ROOM_PREVIEW_DAILY_LIMIT - next }
}

async function fallbackRemaining(userId: string) {
  const fromAdmin = await readAdminCount(userId)
  if (fromAdmin !== null) {
    return Math.max(0, ROOM_PREVIEW_DAILY_LIMIT - fromAdmin)
  }
  return Math.max(0, ROOM_PREVIEW_DAILY_LIMIT - (await readFileCount(userId)))
}

async function fallbackConsume(userId: string) {
  const fromAdmin = await consumeViaAdmin(userId)
  if (fromAdmin) return fromAdmin
  return consumeViaFile(userId)
}

async function fallbackRefund(userId: string) {
  const admin = tryCreateAdminClient()
  if (admin && isUuid(userId)) {
    await refundViaAdmin(userId).catch(() => undefined)
    return
  }
  const used = await readFileCount(userId)
  await writeFileCount(userId, Math.max(0, used - 1))
}

export async function getRoomPreviewRemaining(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase.rpc("room_preview_usage_today")
  if (!error && typeof data === "number") {
    return Math.max(0, ROOM_PREVIEW_DAILY_LIMIT - data)
  }
  if (error && !isMissingQuotaStore(error)) {
    throw error
  }
  return fallbackRemaining(userId)
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

  return fallbackConsume(userId)
}

export async function refundRoomPreviewSlot(supabase: SupabaseClient, userId: string) {
  const { error } = await supabase.rpc("refund_room_preview")
  if (!error) return
  if (!isMissingQuotaStore(error)) return
  await fallbackRefund(userId)
}
