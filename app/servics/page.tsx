"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { LiveChat } from "@/components/live-chat"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowRight, Bot, Brain, Activity, Heart, Utensils, Moon, Shield, MessageSquare } from "lucide-react"

export default function ServicesPage() {
  // Track whether the component has mounted to avoid hydration issues
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  const featureVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  }

  const stepVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  if (!isMounted) {
    // Return a placeholder with the same structure to avoid layout shift
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
        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="py-16 md:py-24 bg-gradient-to-b from-teal-50 to-white dark:from-gray-900 dark:to-gray-950"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                className="inline-block rounded-full bg-teal-100 p-2 dark:bg-teal-900/30"
              >
                <div className="rounded-full bg-gradient-to-br from-teal-400 to-teal-600 p-4 shadow-sm transition-transform duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10 text-white"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
              >
                AI-Powered <span className="text-teal-500">Health Services</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
              >
                Experience the future of healthcare with our intelligent AI assistants that provide personalized health guidance 24/7
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Main Services Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="py-12 md:py-16"
        >
          <div className="container px-4 md:px-6">
            <motion.div variants={fadeIn} className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">AI Health Assistant Services</h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our AI-powered health assistants provide personalized guidance, monitoring, and support for all aspects of your wellness journey
              </p>
            </motion.div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "AI Health Assessment",
                  description: "Advanced AI analysis of your health data to provide personalized insights and recommendations.",
                  icon: <Activity className="h-10 w-10 text-teal-500" />,
                  features: [
                    "AI-powered health risk prediction",
                    "Personalized health score calculation",
                    "Continuous health trend monitoring",
                    "Early warning system for health changes"
                  ]
                },
                {
                  title: "Nutrition AI Assistant",
                  description: "Intelligent meal planning and nutritional guidance based on your health goals and dietary preferences.",
                  icon: <Utensils className="h-10 w-10 text-teal-500" />,
                  features: [
                    "AI-generated meal plans",
                    "Real-time nutritional analysis of foods",
                    "Smart grocery list generation",
                    "Dietary pattern optimization"
                  ]
                },
                {
                  title: "Fitness AI Coach",
                  description: "Smart workout recommendations that adapt to your progress, preferences, and available equipment.",
                  icon: <Activity className="h-10 w-10 text-teal-500" />,
                  features: [
                    "AI workout plan generation",
                    "Form analysis and correction",
                    "Adaptive exercise progression",
                    "Recovery optimization algorithms"
                  ]
                },
                {
                  title: "Mental Wellness AI",
                  description: "Cognitive and emotional support through AI-powered techniques for stress management and mental health.",
                  icon: <Brain className="h-10 w-10 text-teal-500" />,
                  features: [
                    "AI mood tracking and analysis",
                    "Personalized meditation guidance",
                    "Cognitive behavioral technique suggestions",
                    "Stress pattern recognition"
                  ]
                },
                {
                  title: "Sleep AI Optimizer",
                  description: "Intelligent sleep analysis and personalized recommendations to improve your sleep quality.",
                  icon: <Moon className="h-10 w-10 text-teal-500" />,
                  features: [
                    "AI sleep pattern analysis",
                    "Smart sleep schedule recommendations",
                    "Environmental optimization suggestions",
                    "Sleep-wake cycle improvement"
                  ]
                },
                {
                  title: "Health Monitoring AI",
                  description: "Continuous monitoring and analysis of your vital signs and health metrics through connected devices.",
                  icon: <Heart className="h-10 w-10 text-teal-500" />,
                  features: [
                    "Real-time health data analysis",
                    "Anomaly detection algorithms",
                    "Personalized normal ranges",
                    "Health trend visualization"
                  ]
                }
              ].map((service, index) => (
                <motion.div 
                  key={index}
                  variants={cardVariant}
                  className="group"
                >
                  <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <div className="mb-4 flex justify-center">
                        <motion.div 
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 0 25px rgba(20, 184, 166, 0.5)" 
                          }}
                          className="p-3 rounded-full bg-teal-100 dark:bg-teal-900/30"
                        >
                          {service.icon}
                        </motion.div>
                      </div>
                      <CardTitle className="text-center text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">{service.description}</p>
                      <motion.ul 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-2"
                      >
                        {service.features.map((feature, idx) => (
                          <motion.li 
                            key={idx}
                            variants={featureVariant}
                            className="flex items-center gap-2"
                          >
                            <Check className="h-4 w-4 text-teal-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </CardContent>
                    <CardFooter>
                      <a href="/doctors" className="w-full">
                      <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 group">
                        Try Now
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                      </a>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
          className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900"
        >
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">How Our AI Health Assistant Works</h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Experience a seamless journey to better health with our intelligent AI system
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12">
              {[
                {
                  step: 1,
                  title: "Initial Setup",
                  description: "Connect your devices and input your health data to get started.",
                  icon: <Shield className="h-10 w-10 text-teal-500" />
                },
                {
                  step: 2,
                  title: "Personalized Recommendations",
                  description: "Receive tailored health, nutrition, and fitness advice based on your data.",
                  icon: <MessageSquare className="h-10 w-10 text-teal-500" />
                },
                {
                  step: 3,
                  title: "Continuous Monitoring",
                  description: "Track your progress and receive real-time updates on your health metrics.",
                  icon: <Heart className="h-10 w-10 text-teal-500" />
                },
                {
                  step: 4,
                  title: "Adjustments and Support",
                  description: "Get ongoing support and adjustments to your plan as needed.",
                  icon: <Brain className="h-10 w-10 text-teal-500" />
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  variants={stepVariant}
                  className="group"
                >
                  <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <div className="mb-4 flex justify-center">
                        <motion.div 
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 0 25px rgba(20, 184, 166, 0.5)" 
                          }}
                          className="p-3 rounded-full bg-teal-100 dark:bg-teal-900/30"
                        >
                          {step.icon}
                        </motion.div>
                      </div>
                      <CardTitle className="text-center text-xl">Step {step.step}: {step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
      <LiveChat />
    </div>
  )
}