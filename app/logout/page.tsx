"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function LogoutPage() {
  const router = useRouter()
  const { signOut } = useAuth()

  useEffect(() => {
    const handleLogout = async () => {
      await signOut()
      router.push("/")
    }

    handleLogout()
  }, [router, signOut])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Logging out...</h2>
        <p>You will be redirected shortly.</p>
      </div>
    </div>
  )
}
