import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/utils/theme-provider"
import ClientThemeWrapper from "@/components/utils/ClientThemeWrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Solar Power Tracker",
  description: "Solar Power Tracker",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap content in a client-only component to fix hydration */}
        <ClientThemeWrapper>{children}</ClientThemeWrapper>
      </body>
    </html>
  )
}
