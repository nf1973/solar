// components/utils/ClientThemeWrapper.jsx
"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "./theme-provider"

export default function ClientThemeWrapper({ children }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render content without theme to avoid hydration errors
    return <>{children}</>
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
