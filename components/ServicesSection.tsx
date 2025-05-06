"use client"

import {
  ChevronRight,
  ArrowRight,
  Activity,
  Heart,
  Utensils,
  Brain,
  Zap,
  Clock,
  X,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const services = [
  {
    title: "Virtual Consultations",
    description: "Connect with healthcare professionals from the comfort of your home.",
    fullDescription:
      "Virtual consultations provide an accessible way to receive medical advice without visiting a clinic. Our certified professionals are available around the clock, offering secure video sessions, digital prescriptions, and consistent follow-up. This service ensures privacy, efficiency, and convenience for individuals seeking timely healthcare solutions.",
    icon: Activity,
    color: "teal",
    items: [
      "24/7 access to certified professionals",
      "Secure video conferencing",
      "Digital prescription services",
    ],
  },
  {
    title: "Fitness Programs",
    description: "Customized workout plans to help you achieve your fitness goals.",
    fullDescription:
      "Our fitness programs are designed to help you build strength, improve flexibility, and stay motivated. With personalized plans, real-time tracking, and expert-led classes, you'll have the tools and guidance you need to reach your physical peak. Whether you're a beginner or advanced, our programs adapt to your goals and progress.",
    icon: Heart,
    color: "blue",
    items: [
      "Personalized workout routines",
      "Progress tracking and analytics",
      "Live and on-demand classes",
    ],
  },
  {
    title: "Nutritional Guidance",
    description: "Expert advice on nutrition to fuel your body and mind.",
    fullDescription:
      "Proper nutrition is key to overall health. Our services provide in-depth dietary analysis, meal planning based on individual needs, and access to certified nutritionists. Whether you're managing a condition or simply aiming to eat healthier, we provide support and education tailored to your unique lifestyle.",
    icon: Utensils,
    color: "green",
    items: [
      "Customized meal plans",
      "Dietary assessments",
      "Nutritionist consultations",
    ],
  },
  {
    title: "Mental Wellness",
    description: "Support for your mental health and emotional wellbeing.",
    fullDescription:
      "Our mental wellness services include therapy, mindfulness training, and emotional resilience coaching. We offer confidential, judgment-free environments to explore your thoughts and feelings. Resources include virtual therapy sessions, stress-reduction techniques, and mental health assessments to promote balance and inner peace.",
    icon: Brain,
    color: "purple",
    items: [
      "Therapy and counseling",
      "Stress management techniques",
      "Mindfulness and meditation",
    ],
  },
  {
    title: "Wellness Coaching",
    description: "Holistic guidance to transform your lifestyle and habits.",
    fullDescription:
      "Wellness coaching empowers you to make sustainable lifestyle changes. Through regular coaching sessions, goal-setting tools, and accountability tracking, we guide you toward improved health, better habits, and lasting change. It's a collaborative journey tailored to your pace and personal wellness vision.",
    icon: Zap,
    color: "amber",
    items: [
      "One-on-one coaching sessions",
      "Goal setting and accountability",
      "Lifestyle transformation plans",
    ],
  },
  {
    title: "Preventive Health",
    description: "Proactive care to identify and prevent health issues early.",
    fullDescription:
      "Preventive health focuses on early detection and proactive care. We offer routine screenings, personalized care plans, and vaccination services to keep you ahead of potential health risks. It's about staying informed, making empowered choices, and reducing the likelihood of future health problems.",
    icon: Clock,
    color: "rose",
    items: [
      "Annual health screenings",
      "Vaccination programs",
      "Preventive care plans",
    ],
  },
]

export function ServicesSection() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [openService, setOpenService] = useState<null | number>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

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
          {services.map((service, idx) => {
            const Icon = service.icon
            const color = service.color

            return (
              <Card
                key={idx}
                className={`group overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-${color}-500/5 dark:bg-slate-800/80 dark:backdrop-blur-sm dark:border-slate-700/50 dark:hover:border-${color}-500/30 border border-slate-200 hover:border-${color}-100`}
              >
                <CardHeader className="p-6">
                  <div
                    className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-${color}-400 to-${color}-600 dark:from-${color}-600 dark:to-${color}-400 text-white shadow-lg shadow-${color}-500/20 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className={`text-xl text-slate-900 dark:text-white group-hover:text-${color}-600 dark:group-hover:text-${color}-400 transition-colors duration-300`}>
                    {service.title}
                  </CardTitle>
                  <CardDescription className="dark:text-slate-400 mt-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-2">
                  <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    {service.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center">
                        <div className={`mr-2 h-5 w-5 rounded-full bg-${color}-100 dark:bg-${color}-900/50 flex items-center justify-center`}>
                          <ChevronRight className={`h-3 w-3 text-${color}-500 dark:text-${color}-400`} />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-6">
                  <Button
                    variant="outline"
                    onClick={() => setOpenService(idx)}
                    className={`w-full group-hover:bg-gradient-to-r group-hover:from-${color}-500 group-hover:to-${color}-600 group-hover:text-white dark:border-slate-600 dark:text-slate-200 dark:group-hover:border-${color}-500 transition-all duration-300`}
                  >
                    <span className="mr-2">Learn More</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>

      {openService !== null && (
        <Dialog open={true} onOpenChange={() => setOpenService(null)}>
          <DialogContent className="max-w-lg sm:max-w-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
            <DialogHeader>
              <DialogTitle>{services[openService].title}</DialogTitle>
              <DialogDescription className="pt-2 text-slate-600 dark:text-slate-400">
                {services[openService].fullDescription}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 text-sm text-slate-700 dark:text-slate-300 space-y-2">
              {services[openService].items.map((item, idx) => (
                <p key={idx}>• {item}</p>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  )
}
