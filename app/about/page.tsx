"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { LiveChat } from "@/components/live-chat"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { CTASection } from "@/components/CTASection"
import TeamSection from "@/components/TeamSection"

export default function AboutPage() {
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

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
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

  const teamMembers = [
    {
      name: "REVAN FAHRIANSYAH",
      role: "Co-Founder & CTO",
      image: "/REVAN FAHRIANSYAH LAKSONO (2).JPG"
    },
    {
      name: "MUHAMMAD RIDWAN",
      role: "Co-Founder & CEO",
      image: "/MUHAMMAD RIDWAN (2) (1).webp"
    },
    {
      name: "PIERRE MAYSAR ALZHEYREY",
      role: "Co-Founder & CTO",
      image: "/pier.JPG",
    }
  ]

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
                <div className="rounded-full bg-teal-500 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-white"
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
                About <span className="text-teal-500">HealtyWell</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
              >
                Transforming healthcare through personalized wellness solutions
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Our Story Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="py-12 md:py-16"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <motion.div variants={fadeInLeft} className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    HealtyWell was born from a simple yet powerful observation: despite advances in medical technology, 
                    many people still struggle to manage their health effectively in their daily lives.
                  </p>
                  <p>
                    Founded in 2025 by a team of healthcare professionals and technology experts, we set out to bridge 
                    the gap between clinical healthcare and everyday wellness. We believe that true health comes from 
                    consistent, informed choices that people make every day.
                  </p>
                  <p>
                    Our mission is to empower individuals with personalized health insights and actionable recommendations 
                    that fit seamlessly into their lifestyle, making optimal health accessible to everyone.
                  </p>
                </div>
              </motion.div>
                <motion.div 
                variants={fadeInRight}
                className="relative w-full max-w-full h-[400px] overflow-hidden rounded-xl shadow-xl"
                >
                <Image 
                  src="https://www.alliance-scotland.org.uk/health-and-social-care-integration/wp-content/uploads/sites/4/2024/02/Untitled-design-14.png" 
                  alt="HealtyWell founding team" 
                  fill 
                  className="object-cover"
                />
                </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Our Vision Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <motion.div 
                variants={fadeInLeft}
                className="order-2 lg:order-1 relative h-[400px] overflow-hidden rounded-xl shadow-xl"
              >
                <Image 
                  src="https://www.verywellmind.com/thmb/tmd85KCwXZn9er2n5oQTOCBiO1I=/3125x0/filters:no_upscale():max_bytes(150000):strip_icc()/meditation-4157199_round2_standardsizing-7f47dee543b74e3282f6604e8e9ef126.png" 
                  alt="Digital health visualization" 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
              <motion.div 
                variants={fadeInRight}
                className="order-1 lg:order-2 space-y-6"
              >
                <h2 className="text-3xl font-bold tracking-tight">Our Vision</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    We envision a world where preventive healthcare is the norm, not the exception. Where technology 
                    serves as a bridge to better health outcomes, not a barrier.
                  </p>
                  <p>
                    At HealtyWell, we're building a future where personalized health insights are accessible to everyone, 
                    regardless of their background or circumstances. We believe that when people are empowered with the 
                    right information and tools, they can make better health decisions every day.
                  </p>
                  <p>
                    Our platform combines cutting-edge technology with evidence-based health practices to create a 
                    holistic approach to wellness that adapts to each individual's unique needs and goals.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Our Approach Section */}
        {/* <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="py-12 md:py-16"
        >
          <div className="container px-4 md:px-6">
            <motion.div 
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight">Our Approach</h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                We believe in a holistic, personalized approach to health and wellness that considers all aspects of your life.
              </p>
            </motion.div>
            <motion.div 
              variants={staggerContainer}
              className="grid gap-8 md:grid-cols-3"
            >
              {[
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-teal-600"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                  title: "Personalized Care",
                  description: "We understand that every person is unique. Our platform adapts to your specific health profile, goals, and preferences to provide truly personalized recommendations."
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-teal-600"
                    >
                      <path d="m21.73 18-8-14a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2Z" />
                      <path d="m21 13-8-8" />
                      <path d="m13 5 8 8" />
                    </svg>
                  ),
                  title: "Preventive Focus",
                  description: "We believe in addressing health issues before they become problems. Our platform helps you identify risk factors early and take proactive steps to maintain optimal health."
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-teal-600"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  ),
                  title: "Evidence-Based",
                  description: "All our recommendations and insights are grounded in scientific research and clinical best practices. We continuously update our knowledge base with the latest health findings."
                }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  variants={cardVariant}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section> */}

        {/* Team Section */}
        <TeamSection />
        <CTASection />
      </main>
      <Footer />
      <LiveChat />
    </div>
  )
}