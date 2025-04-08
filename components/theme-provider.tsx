"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { useState } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const storageKey = "theme"
  const defaultTheme = "system"

  const [theme, setTheme] = useState<"light" | "dark" | "system">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem(storageKey) as "light" | "dark" | "system") || defaultTheme
    }
    return defaultTheme
  })

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={theme}
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
