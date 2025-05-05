import { CTASection } from "@/components/CTASection";
import { DashboardPreviewSection } from "@/components/DashboardPreviewSection";
import { FeaturedArticlesSection } from "@/components/FeaturedArticlesSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HealthAssessmentSection } from "@/components/HealthAssessmentSection";
import { HeroSection } from "@/components/HeroSection";
import { NewsSection } from "@/components/NewsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { LiveChat } from "@/components/live-chat";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <HealthAssessmentSection />
        <TestimonialsSection />
        <FeaturedArticlesSection />
        <DashboardPreviewSection />
        <NewsSection />
        <CTASection />
        <LiveChat />
      </main>
      <Footer />
    </div>
  )
}