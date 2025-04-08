"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
              Clytar
            </span>
          </Link>
          {user && (
            <nav className="hidden md:flex gap-6">
              <Link href="/dashboard" className="text-sm font-medium hover:text-purple-600 transition-colors">
                Dashboard
              </Link>
              <Link href="/analytics" className="text-sm font-medium hover:text-purple-600 transition-colors">
                Analytics
              </Link>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">Log in</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
              >
                <Link href="/login?tab=register">Sign up</Link>
              </Button>
            </>
          ) : (
            <Button asChild variant="outline">
              <Link href="/logout">Log out</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
