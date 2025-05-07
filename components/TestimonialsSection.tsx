"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { QuoteIcon } from "lucide-react"

export function TestimonialsSection() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show theme-aware content after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Return a placeholder or loading state
  }

  return (
    <section className="w-full py-16 md:py-24 " id="testimonial">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <Badge className="bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400 hover:bg-teal-500/20 dark:hover:bg-teal-500/30">
            Testimonials
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-slate-900 dark:text-white">
            What Our Clients Say
          </h2>
          <p className="mx-auto max-w-[700px] text-slate-600 dark:text-slate-400 md:text-lg">
            Hear from people who have transformed their lives with our health and wellness programs.
          </p>
        </div>
        
        <div className="mx-auto max-w-5xl">
          <Carousel className="w-full" >
            <CarouselContent>
              <CarouselItem>
                <div className="flex flex-col gap-6 rounded-xl bg-white dark:bg-slate-800 p-8 shadow-sm md:flex-row md:p-10">
                  <div className="flex flex-col items-center md:items-start">
                    <Avatar className="h-20 w-20 border-2 border-white dark:border-slate-700 shadow-sm">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Sarah Johnson" className="object-cover" />
                      <AvatarFallback className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">SJ</AvatarFallback>
                    </Avatar>
                    
                    <div className="mt-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-yellow-500"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <QuoteIcon className="h-8 w-8 text-slate-200 dark:text-slate-700 mb-2 mx-auto md:mx-0" />
                    <blockquote className="mb-4 text-lg font-medium text-slate-700 dark:text-slate-300">
                      "The personalized nutrition plan completely transformed my relationship with food. I've lost
                      30 pounds and have more energy than ever before. The coaches are incredibly supportive and
                      knowledgeable."
                    </blockquote>
                    
                    <div className="inline-flex flex-col items-center md:items-start">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Sarah Johnson</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Nutrition Program Member, 8 months</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              
              <CarouselItem>
                <div className="flex flex-col gap-6 rounded-xl bg-white dark:bg-slate-800 p-8 shadow-sm md:flex-row md:p-10">
                  <div className="flex flex-col items-center md:items-start">
                    <Avatar className="h-20 w-20 border-2 border-white dark:border-slate-700 shadow-sm">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Michael Chen" className="object-cover" />
                      <AvatarFallback className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">MC</AvatarFallback>
                    </Avatar>
                    
                    <div className="mt-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-yellow-500"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <QuoteIcon className="h-8 w-8 text-slate-200 dark:text-slate-700 mb-2 mx-auto md:mx-0" />
                    <blockquote className="mb-4 text-lg font-medium text-slate-700 dark:text-slate-300">
                      "The virtual consultations have been a game-changer for managing my chronic condition. I can
                      connect with specialists without the hassle of travel, and the integrated health tracking
                      helps me stay on top of my progress."
                    </blockquote>
                    
                    <div className="inline-flex flex-col items-center md:items-start">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Michael Chen</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Virtual Care Patient, 1 year</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              
              <CarouselItem>
                <div className="flex flex-col gap-6 rounded-xl bg-white dark:bg-slate-800 p-8 shadow-sm md:flex-row md:p-10">
                  <div className="flex flex-col items-center md:items-start">
                    <Avatar className="h-20 w-20 border-2 border-white dark:border-slate-700 shadow-sm">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Emily Rodriguez" className="object-cover" />
                      <AvatarFallback className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">ER</AvatarFallback>
                    </Avatar>
                    
                    <div className="mt-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-yellow-500"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <QuoteIcon className="h-8 w-8 text-slate-200 dark:text-slate-700 mb-2 mx-auto md:mx-0" />
                    <blockquote className="mb-4 text-lg font-medium text-slate-700 dark:text-slate-300">
                      "The mental wellness program helped me develop healthy coping mechanisms for stress and anxiety. 
                      The mindfulness techniques I've learned have improved my sleep quality and overall wellbeing tremendously."
                    </blockquote>
                    
                    <div className="inline-flex flex-col items-center md:items-start">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Emily Rodriguez</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Mental Wellness Program, 6 months</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            
            <div className="mt-6 flex justify-center gap-2">
              <CarouselPrevious className="relative h-9 w-9 rounded-full border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700" />
              <CarouselNext className="relative h-9 w-9 rounded-full border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700" />
            </div>
          </Carousel>
        </div>
        
        {/* Testimonial stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          <div className="flex flex-col items-center rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
            <span className="text-3xl font-bold text-teal-600 dark:text-teal-500">95%</span>
            <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">Client satisfaction</p>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
          <span className="text-3xl font-bold text-teal-600 dark:text-teal-500">10k+</span>
            <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">Active members</p>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
            <span className="text-3xl font-bold text-teal-600 dark:text-teal-500">87%</span>
            <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">Achieved goals</p>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
            <span className="text-3xl font-bold text-teal-600 dark:text-teal-500">4.8/5</span>
            <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">Average rating</p>
          </div>
        </div>
        
        
      </div>
    </section>
  )
}