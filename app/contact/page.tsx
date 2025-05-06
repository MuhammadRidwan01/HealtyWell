"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { LiveChat } from "@/components/live-chat"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle,
  Loader2
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      toast({
        title: "Message Sent",
        description: "We've received your message and will respond shortly.",
        variant: "success"
      })
      
      // Reset form after showing success state
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        })
      }, 3000)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-teal-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="container px-4 md:px-6">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-6">
                Get in <span className="text-teal-500">Touch</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 md:text-xl mb-8">
                Have questions about our services or need personalized health guidance? 
                Our team is here to help you on your wellness journey.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Contact Form */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="order-2 md:order-1"
              >
                <Card className="overflow-hidden border-none shadow-lg dark:bg-gray-800/50 backdrop-blur-sm">
                  <CardContent className="p-6 md:p-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        Fill out the form below and we'll get back to you as soon as possible.
                      </p>
                    </div>

                    {isSubmitted ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-12 text-center"
                      >
                        <div className="rounded-full bg-teal-100 p-3 dark:bg-teal-900/30 mb-4">
                          <CheckCircle className="h-8 w-8 text-teal-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                        <p className="text-gray-600 dark:text-gray-300 max-w-md">
                          Thank you for reaching out. Our team will review your message and get back to you shortly.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Full Name
                            </label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="John Doe"
                              required
                              className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Email Address
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="john@example.com"
                              required
                              className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Subject
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="How can we help you?"
                            required
                            className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Message
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Please provide details about your inquiry..."
                            required
                            className="min-h-[150px] border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                          />
                        </div>
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="order-1 md:order-2"
              >
                <div className="space-y-8">
                  <motion.div variants={fadeIn}>
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                      Our support team is available Monday through Friday from 9am to 5pm.
                      Feel free to reach out through any of the channels below.
                    </p>
                  </motion.div>

                  <motion.div 
                    variants={fadeIn}
                    className="grid gap-6 sm:grid-cols-2"
                  >
                    <Card className="border-none shadow-md dark:bg-gray-800/30 backdrop-blur-sm">
                      <CardContent className="p-6 flex items-start space-x-4">
                        <div className="rounded-full bg-teal-100 p-3 dark:bg-teal-900/30">
                          <MapPin className="h-5 w-5 text-teal-500" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Our Location</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            123 Wellness Avenue<br />
                            Jakarta, Indonesia 12345
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-md dark:bg-gray-800/30 backdrop-blur-sm">
                      <CardContent className="p-6 flex items-start space-x-4">
                        <div className="rounded-full bg-teal-100 p-3 dark:bg-teal-900/30">
                          <Phone className="h-5 w-5 text-teal-500" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Phone Number</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            +62 (21) 1234-5678<br />
                            +62 812-3456-7890
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-md dark:bg-gray-800/30 backdrop-blur-sm">
                      <CardContent className="p-6 flex items-start space-x-4">
                        <div className="rounded-full bg-teal-100 p-3 dark:bg-teal-900/30">
                          <Mail className="h-5 w-5 text-teal-500" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Email Address</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            info@wellness.com<br />
                            support@wellness.com
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-md dark:bg-gray-800/30 backdrop-blur-sm">
                      <CardContent className="p-6 flex items-start space-x-4">
                        <div className="rounded-full bg-teal-100 p-3 dark:bg-teal-900/30">
                          <Clock className="h-5 w-5 text-teal-500" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Opening Hours</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Monday - Friday: 9am - 5pm<br />
                            Saturday: 10am - 3pm
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <LiveChat />
    </div>
  )
}