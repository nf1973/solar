"use client"

import { useState, useEffect } from "react"
import { FaRegMoon, FaRegSun } from "react-icons/fa"
import { useTheme } from "next-themes"

export default function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Avoid SSR/client mismatch

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded"
    >
      {theme === "light" ? <FaRegMoon /> : <FaRegSun />}
    </button>
  )
}
