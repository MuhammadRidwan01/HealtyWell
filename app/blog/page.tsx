"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { LiveChat } from "@/components/live-chat"
import { ServicesSection } from "@/components/ServicesSection"
import { useEffect, useState } from "react"
import { FeaturedArticlesSection } from "@/components/FeaturedArticlesSection"

export default function ServicesPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          {/* Content will be loaded after mounting */}
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <FeaturedArticlesSection />
      </main>
      <Footer />
      <LiveChat />
    </div>
  )
}
