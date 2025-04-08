"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase"

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get("code")

  useEffect(() => {
    const handleCallback = async () => {
      if (code) {
        const supabase = getSupabaseBrowserClient()
        await supabase.auth.exchangeCodeForSession(code)
      }

      // Redirect to dashboard after sign in process completes
      router.push("/dashboard")
    }

    handleCallback()
  }, [code, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Completing authentication...</h2>
        <p>You will be redirected shortly.</p>
      </div>
    </div>
  )
}
