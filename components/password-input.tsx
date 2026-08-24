"use client"

import { useState, type InputHTMLAttributes } from "react"
import { Eye, EyeOff } from "lucide-react"

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">

export function PasswordInput({ className = "", ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <input
        {...props}
        type={visible ? "text" : "password"}
        className={`w-full border border-border bg-input px-4 py-3 pr-12 font-sans text-sm ${className}`}
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  )
}
