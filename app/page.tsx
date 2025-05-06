"use client";

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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount and when auth state changes
  useEffect(() => {
    // Initial check
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    // Listen for auth state changes
    const handleAuthChange = () => {
      const currentToken = localStorage.getItem('token');
      const wasAuthenticated = isAuthenticated;
      const nowAuthenticated = !!currentToken;
      
      // Update authentication state
      setIsAuthenticated(nowAuthenticated);
      
      // If auth state actually changed, refresh the page
      if (wasAuthenticated !== nowAuthenticated) {
        router.refresh();
      }
    };

    // Add event listener for custom auth state change event
    window.addEventListener('authStateChanged', handleAuthChange);

    // Cleanup
    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange);
    };
  }, [isAuthenticated, router]);

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
  );
}