"use client"

import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { clearLocalSession } from "@/lib/local-auth"

import { cn } from "@/lib/utils"

type SignOutButtonProps = {
  variant?: "link" | "outline"
  className?: string
}

export function SignOutButton({ variant = "link", className }: SignOutButtonProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    clearLocalSession()
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch {
      /* local sign-out is enough */
    }
    router.push("/")
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className={cn(
        variant === "outline"
          ? "inline-flex items-center justify-center border border-border bg-background px-4 py-2.5 font-sans text-sm font-medium text-foreground transition-colors hover:bg-muted"
          : "font-sans text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground",
        className,
      )}
    >
      Sign out
    </button>
  )
}
