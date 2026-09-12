"use client"

import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { clearLocalSession } from "@/lib/local-auth"

export function SignOutButton() {
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
      className="font-sans text-sm text-muted-foreground hover:text-foreground underline underline-offset-2"
    >
      Sign out
    </button>
  )
}
