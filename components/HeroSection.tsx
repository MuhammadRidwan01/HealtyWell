"use client"

import Image from "next/image"
import { Play, ArrowRight, CheckCircle, Calendar, Users, BarChart3, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show theme toggle after component mounts to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    setIsVisible(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24 transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-white/5 bg-center"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-teal-500/10 dark:from-teal-500/20 to-transparent blur-3xl pointer-events-none"></div>


      {/* Theme toggle */}
      {mounted && (
        <div className="absolute top-6 right-6 z-20">
          <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
            <Sun className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
            />
            <Moon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Main hero content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left content column */}
          <div className={cn(
            "col-span-1 lg:col-span-5 transition-all duration-700 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}>
            <Badge className="mb-4 bg-teal-500 text-white hover:bg-teal-600">
              New Programs
            </Badge>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
              Your Journey to Optimal Health Starts Here
            </h1>

            <p className="text-lg text-slate-700 dark:text-gray-300 mb-8">
              Personalized wellness plans designed by experts to help you achieve your health goals.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button size="lg" className="bg-teal-500 text-white hover:bg-teal-600 group">
                Explore Personalized Plans
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-slate-300 bg-white/50 text-slate-800 backdrop-blur-sm hover:bg-white/80 dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              >
                <Play className="mr-2 h-4 w-4" /> Watch How It Works
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Personalized Plans", "Expert Guidance", "Proven Results"].map((feature, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-2 text-slate-800 dark:text-white transition-all duration-700",
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                    i === 0 && "delay-[300ms]",
                    i === 1 && "delay-[400ms]",
                    i === 2 && "delay-[500ms]"
                  )}
                >
                  <CheckCircle className="h-5 w-5 text-teal-500 dark:text-teal-400 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Center image column */}
          <div className={cn(
            "col-span-1 lg:col-span-4 relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
            "transition-all duration-700 delay-[200ms]"
          )}>
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Wellness lifestyle"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

            {/* Floating badge */}
            <div className="absolute top-6 right-6 bg-white/80 dark:bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 dark:border-white/20">
              <span className="text-slate-800 dark:text-white font-medium">Featured Program</span>
            </div>
          </div>

          {/* Right stats column */}
          <div className="col-span-1 lg:col-span-3 space-y-6">
            {/* Stats cards */}
            {[
              {
                icon: <Users className="h-5 w-5 text-teal-500 dark:text-teal-400" />,
                value: "10K+",
                label: "Active members in our community",
                delay: "delay-[400ms]"
              },
              {
                icon: <Calendar className="h-5 w-5 text-teal-500 dark:text-teal-400" />,
                value: "95%",
                label: "Success rate with our programs",
                delay: "delay-[500ms]"
              },
              {
                icon: <BarChart3 className="h-5 w-5 text-teal-500 dark:text-teal-400" />,
                value: "30+",
                label: "Expert-designed wellness plans",
                delay: "delay-[600ms]"
              }
            ].map((stat, i) => (
              <div
                key={i}
                className={cn(
                  "bg-white/80 dark:bg-white/10 backdrop-blur-md p-4 rounded-xl border border-slate-200 dark:border-white/20 shadow-sm transition-all duration-700",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                  stat.delay
                )}
              >
                <div className="flex items-center gap-3 mb-2">
                  {stat.icon}
                  <div className="text-teal-600 dark:text-teal-400 text-2xl font-bold">{stat.value}</div>
                </div>
                <div className="text-slate-700 dark:text-white text-sm">{stat.label}</div>
              </div>
            ))}


            <div className={cn(
              "bg-white/80 dark:bg-white/10 backdrop-blur-md p-5 rounded-xl border border-slate-200 dark:border-white/20 shadow-sm transition-all duration-700",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              "delay-[700ms]"
            )}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">JD</span>
                </div>
                <div>
                  <div className="text-slate-900 dark:text-white font-medium">Jane Doe</div>
                  <div className="text-slate-500 dark:text-white/70 text-xs">Member since 2022</div>
                </div>
              </div>
              <p className="text-slate-700 dark:text-white/90 text-sm italic">
                "This program transformed my approach to health. I've never felt better!"
              </p>
            </div>
          </div>
        </div>

        {/* Bottom features section */}
        <div className="mt-16 lg:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Personalized Plans",
              description: "Custom programs tailored to your specific health goals and needs.",
              icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-500 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
              delay: "delay-[300ms]"
            },
            {
              title: "Expert Guidance",
              description: "Access to certified professionals who will guide your journey.",
              icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-500 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
              delay: "delay-[400ms]"
            },
            {
              title: "Track Progress",
              description: "Monitor your improvements with our advanced tracking tools.",
              icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-500 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
              delay: "delay-[500ms]"
            }
          ].map((feature, i) => (
            <div
              key={i}
              className={cn(
                "bg-white/60 dark:bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm transition-all duration-700",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                feature.delay
              )}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-slate-700 dark:text-gray-300">{feature.description}</p>
              <Button variant="link" className="text-teal-600 dark:text-teal-400 p-0 mt-4 hover:text-teal-700 dark:hover:text-teal-300 group">
                Learn more
                <ArrowRight className="ml-1 h-4 w-4 inline transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className={cn(
          "mt-16 bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl p-8 md:p-10 relative overflow-hidden transition-all duration-700 shadow-lg",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          "delay-[800ms]"
        )}>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 transform rotate-45 translate-x-1/2 -translate-y-1/4"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to start your journey?</h2>
              <p className="text-teal-50">Join thousands who have transformed their lives with our programs.</p>
            </div>
            <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50 min-w-[200px] shadow-md">
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}