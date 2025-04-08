"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { getSupabaseBrowserClient, type User } from "@/lib/supabase"

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string, metadata: any) => Promise<any>
  signOut: () => Promise<void>
  signInWithProvider: (provider: "google" | "linkedin") => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      try {
        const supabase = getSupabaseBrowserClient()
        const { data } = await supabase.auth.getSession()

        if (data.session?.user) {
          setUser(data.session.user)

          // Check if user is admin (AVIILUZ000@GMAIL.COM)
          const isAdminUser = data.session.user.email?.toLowerCase() === "aviiluz1000@gmail.com"
          setIsAdmin(isAdminUser)

          // Update last login time in a real implementation
          // For the mock, we'll just log this
          console.log("Updated last login time for user:", data.session.user.id)
        }
      } catch (error) {
        console.error("Error checking auth state:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()

    // Set up auth state change listener
    const supabase = getSupabaseBrowserClient()
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user)

        // Check if user is admin
        const isAdminUser = session.user.email?.toLowerCase() === "aviiluz1000@gmail.com"
        setIsAdmin(isAdminUser)

        // Update last login time in a real implementation
        console.log("Auth state changed for user:", session.user.id)
      } else {
        setUser(null)
        setIsAdmin(false)
      }
    })

    // Return cleanup function
    return () => {
      if (data && data.subscription && data.subscription.unsubscribe) {
        data.subscription.unsubscribe()
      }
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      return { data, error: null }
    } catch (error: any) {
      return { data: { user: null }, error }
    }
  }

  const signUp = async (email: string, password: string, metadata: any) => {
    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      })

      if (error) throw error

      // In a real implementation, we would create a user record in the users table
      console.log("Created new user:", data.user?.id)

      return { data, error: null }
    } catch (error: any) {
      return { data: { user: null }, error }
    }
  }

  const signInWithProvider = async (provider: "google" | "linkedin") => {
    try {
      // In a mock implementation, we'll just log this
      console.log(`Signing in with ${provider}`)

      // For demo purposes, let's simulate a successful sign-in with a mock user
      const mockUser = {
        id: `user-${Date.now()}`,
        email: `user-${Date.now()}@example.com`,
        user_metadata: { full_name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User` },
      }

      setUser(mockUser)
      setIsAdmin(false)
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error)
    }
  }

  const signOut = async () => {
    try {
      const supabase = getSupabaseBrowserClient()
      await supabase.auth.signOut()
      setUser(null)
      setIsAdmin(false)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin,
        signIn,
        signUp,
        signOut,
        signInWithProvider,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
