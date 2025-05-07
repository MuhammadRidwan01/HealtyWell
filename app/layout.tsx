import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HealthyWell - Your Health & Wellness Platform",
  description:
    "health and wellness platform for managing your wellbeing. Founded by MUHAMMAD RIDWAN (Co-Founder & CEO), REVAN FAHRIANSYAH (Co-Founder & CTO), and PIERRE MAYSAR ALZHEYREY (Co-Founder & CTO).",
  keywords: "health, wellness, fitness, nutrition, mental health, telemedicine",
  generator: "healthywell.dev"
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}