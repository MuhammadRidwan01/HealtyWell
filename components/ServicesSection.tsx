"use client"

import { ChevronRight, ArrowRight, Activity, Heart, Utensils, Brain, Zap, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ServicesSection() {
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
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-transparent to-slate-50 dark:to-slate-900/30 transition-colors duration-300">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge 
              variant="outline" 
              className="border-teal-500 text-teal-500 dark:border-teal-400 dark:text-teal-400 px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 hover:bg-teal-50 dark:hover:bg-teal-900/20"
            >
              Our Services
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl/tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
              Comprehensive Health & Wellness Solutions
            </h2>
            <p className="mx-auto max-w-[700px] text-slate-600 dark:text-slate-400 md:text-xl mt-4">
              Discover our range of personalized services designed to enhance your wellbeing.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Virtual Consultations */}
          <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/5 dark:bg-slate-800/80 dark:backdrop-blur-sm dark:border-slate-700/50 dark:hover:border-teal-500/30 border border-slate-200 hover:border-teal-100">
            <CardHeader className="p-6">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 dark:from-teal-600 dark:to-teal-400 text-white shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform duration-300">
                <Activity className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">Virtual Consultations</CardTitle>
              <CardDescription className="dark:text-slate-400 mt-2">
                Connect with healthcare professionals from the comfort of your home.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-2">
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center">
                  <div className="mr-2 h-5 w-5 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
                    <ChevronRight className="h-3 w-3 text-teal-500 dark:text-teal-400" />
                  </div>
                  <span>24/7 access to certified professionals</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-5 w-5 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
                    <ChevronRight className="h-3 w-3 text-teal-500 dark:text-teal-400" />
                  </div>
                  <span>Secure video conferencing</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-5 w-5 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
                    <ChevronRight className="h-3 w-3 text-teal-500 dark:text-teal-400" />
                  </div>
                  <span>Digital prescription services</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-6">
              <Button 
                variant="outline" 
                className="w-full group-hover:bg-gradient-to-r group-hover:from-teal-500 group-hover:to-teal-600 group-hover:text-white dark:border-slate-600 dark:text-slate-200 dark:group-hover:border-teal-500 transition-all duration-300"
              >
                <span className="mr-2">Learn More</span> 
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardFooter>
          </Card>

          {/* Fitness Programs */}
          <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 dark:bg-slate-800/80 dark:backdrop-blur-sm dark:border-slate-700/50 dark:hover:border-blue-500/30 border border-slate-200 hover:border-blue-100">
            <CardHeader className="p-6">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-400 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Fitness Programs</CardTitle>
              <CardDescription className="dark:text-slate-400 mt-2">
                Customized workout plans to help you achieve your fitness goals.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-2">
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center">
                  <div className="mr-2 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <ChevronRight className="h-3 w-3 text-blue-500 dark:text-blue-400" />
                  </div>
                  <span>Personalized workout routines</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <ChevronRight className="h-3 w-3 text-blue-500 dark:text-blue-400" />
                  </div>
                  <span>Progress tracking and analytics</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <ChevronRight className="h-3 w-3 text-blue-500 dark:text-blue-400" />
                  </div>
                  <span>Live and on-demand classes</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-6">
              <Button 
                variant="outline" 
                className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-blue-600 group-hover:text-white dark:border-slate-600 dark:text-slate-200 dark:group-hover:border-blue-500 transition-all duration-300"
              >
                <span className="mr-2">Learn More</span> 
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardFooter>
          </Card>

          {/* Nutritional Guidance */}
          <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-green-500/5 dark:bg-slate-800/80 dark:backdrop-blur-sm dark:border-slate-700/50 dark:hover:border-green-500/30 border border-slate-200 hover:border-green-100">
            <CardHeader className="p-6">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 dark:from-green-600 dark:to-green-400 text-white shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform duration-300">
                <Utensils className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">Nutritional Guidance</CardTitle>
              <CardDescription className="dark:text-slate-400 mt-2">
                Expert advice on nutrition to fuel your body and mind.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-2">
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center">
                  <div className="mr-2 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                    <ChevronRight className="h-3 w-3 text-green-500 dark:text-green-400" />
                  </div>
                  <span>Customized meal plans</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                    <ChevronRight className="h-3 w-3 text-green-500 dark:text-green-400" />
                  </div>
                  <span>Dietary assessments</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                    <ChevronRight className="h-3 w-3 text-green-500 dark:text-green-400" />
                  </div>
                  <span>Nutritionist consultations</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-6">
              <Button 
                variant="outline" 
                className="w-full group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:to-green-600 group-hover:text-white dark:border-slate-600 dark:text-slate-200 dark:group-hover:border-green-500 transition-all duration-300"
              >
                <span className="mr-2">Learn More</span> 
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardFooter>
          </Card>

          {/* Mental Wellness */}
          <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5 dark:bg-slate-800/80 dark:backdrop-blur-sm dark:border-slate-700/50 dark:hover:border-purple-500/30 border border-slate-200 hover:border-purple-100">
            <CardHeader className="p-6">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-600 dark:to-purple-400 text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">Mental Wellness</CardTitle>
              <CardDescription className="dark:text-slate-400 mt-2">
                Support for your mental health and emotional wellbeing.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-2">
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center">
                  <div className="mr-2 h-5 w-5 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                    <ChevronRight className="h-3 w-3 text-purple-500 dark:text-purple-400" />
                  </div>
                  <span>Therapy and counseling</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-5 w-5 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                    <ChevronRight className="h-3 w-3 text-purple-500 dark:text-purple-400" />
                  </div>
                  <span>Stress management techniques</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-5 w-5 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                    <ChevronRight className="h-3 w-3 text-purple-500 dark:text-purple-400" />
                  </div>
                  <span>Mindfulness and meditation</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-6">
              <Button 
                variant="outline" 
                className="w-full group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-purple-600 group-hover:text-white dark:border-slate-600 dark:text-slate-200 dark:group-hover:border-purple-500 transition-all duration-300"
              >
                <span className="mr-2">Learn More</span> 
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardFooter>
          </Card>

          {/* Wellness Coaching */}
          <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 dark:bg-slate-800/80 dark:backdrop-blur-sm dark:border-slate-700/50 dark:hover:border-amber-500/30 border border-slate-200 hover:border-amber-100">
            <CardHeader className="p-6">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-600 dark:to-amber-400 text-white shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">Wellness Coaching</CardTitle>
              <CardDescription className="dark:text-slate-400 mt-2">
                Holistic guidance to transform your lifestyle and habits.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-2">
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center">
                  <div className="mr-2 h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                    <ChevronRight className="h-3 w-3 text-amber-500 dark:text-amber-400" />
                  </div>
                  <span>One-on-one coaching sessions</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                    <ChevronRight className="h-3 w-3 text-amber-500 dark:text-amber-400" />
                  </div>
                  <span>Goal setting and accountability</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                    <ChevronRight className="h-3 w-3 text-amber-500 dark:text-amber-400" />
                  </div>
                  <span>Lifestyle transformation plans</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-6">
              <Button 
                variant="outline" 
                className="w-full group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-white dark:border-slate-600 dark:text-slate-200 dark:group-hover:border-amber-500 transition-all duration-300"
              >
                <span className="mr-2">Learn More</span> 
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardFooter>
          </Card>

          {/* Preventive Health */}
          <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/5 dark:bg-slate-800/80 dark:backdrop-blur-sm dark:border-slate-700/50 dark:hover:border-rose-500/30 border border-slate-200 hover:border-rose-100">
            <CardHeader className="p-6">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-rose-600 dark:from-rose-600 dark:to-rose-400 text-white shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300">Preventive Health</CardTitle>
              <CardDescription className="dark:text-slate-400 mt-2">
                Proactive measures to maintain optimal health and prevent illness.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-2">
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center">
                  <div className="mr-2 h-5 w-5 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center">
                    <ChevronRight className="h-3 w-3 text-rose-500 dark:text-rose-400" />
                  </div>
                  <span>Health screenings and assessments</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-5 w-5 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center">
                    <ChevronRight className="h-3 w-3 text-rose-500 dark:text-rose-400" />
                  </div>
                  <span>Immunization services</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-5 w-5 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center">
                    <ChevronRight className="h-3 w-3 text-rose-500 dark:text-rose-400" />
                  </div>
                  <span>Chronic disease management</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-6">
              <Button 
                variant="outline" 
                className="w-full group-hover:bg-gradient-to-r group-hover:from-rose-500 group-hover:to-rose-600 group-hover:text-white dark:border-slate-600 dark:text-slate-200 dark:group-hover:border-rose-500 transition-all duration-300"
              >
                <span className="mr-2">Learn More</span> 
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        
      </div>
    </section>
  )
}