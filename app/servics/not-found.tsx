"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { LiveChat } from "@/components/live-chat"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function NotFound() {
  // Track whether the component has mounted to avoid hydration issues
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

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

  // Function to go back to the previous route
  const handleGoBack = () => {
    router.back()
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
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 to-emerald-500 dark:from-gray-950 dark:to-gray-900"
      style={{
        backgroundImage: `radial-gradient(circle at 20% 40%, #14b8a6 0%, rgba(0, 0, 0, 0) 400px), 
                         radial-gradient(circle at 80% 60%, rgba(224, 242, 254, 0.15) 0%, rgba(0, 0, 0, 0) 700px)`,
      }}
    >
      {/* Background animations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400/30 dark:bg-teal-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-400/30 dark:bg-blue-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/30 dark:bg-cyan-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '15s' }}></div>
        
        {/* Additional animate-in blobs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-teal-500/20 dark:bg-teal-600/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/3 left-1/4 w-60 h-60 bg-emerald-500/20 dark:bg-emerald-600/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Custom animation keyframes */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        @keyframes floatAnimation {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        
        .animate-float {
          animation: floatAnimation 3s ease-in-out infinite;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 2s infinite alternate;
        }
      `}</style>
      <Header />
      <main className="flex-1">
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="py-16 md:py-24 flex items-center justify-center"
        >
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-6xl font-bold text-teal-500 mb-6">404</h1>
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Page Not Found</h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 mb-4">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            
            {/* Display the requested URL */}
            <div className="mx-auto max-w-[600px] mb-8 p-3 bg-gray-300/20 dark:bg-gray-800/20 rounded-md">
              <p className="font-mono text-sm md:text-base break-all">
                <span className="font-semibold">Requested URL:</span> {pathname}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGoBack}
                className="inline-flex h-10 items-center justify-center rounded-md bg-teal-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500"
              >
                Go Back
              </button>
              <Link 
                href="/" 
                className="inline-flex h-10 items-center justify-center rounded-md border border-teal-500 px-8 text-sm font-medium text-teal-500 shadow-sm transition-colors hover:bg-teal-50 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500"
              >
                Home
              </Link>
              <Link 
                href="/doctors" 
                className="inline-flex h-10 items-center justify-center rounded-md border border-teal-500 px-8 text-sm font-medium text-teal-500 shadow-sm transition-colors hover:bg-teal-50 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500"
              >
                Doctors List
              </Link>
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">You might be interested in:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <Link 
                  href="/about" 
                  className="p-4 border border-gray-200 rounded-lg hover:border-teal-500 hover:shadow-md transition-all"
                >
                  <h4 className="font-bold mb-2">About Us</h4>
                  <p className="text-sm text-gray-200">Learn more about HealtyWell and our mission</p>
                </Link>
                <Link 
                  href="/blog" 
                  className="p-4 border border-gray-200 rounded-lg hover:border-teal-500 hover:shadow-md transition-all"
                >
                  <h4 className="font-bold mb-2">Blog</h4>
                  <p className="text-sm text-gray-200">Read our latest health and wellness articles</p>
                </Link>
                <Link 
                  href="/contact" 
                  className="p-4 border border-gray-200 rounded-lg hover:border-teal-500 hover:shadow-md transition-all"
                >
                  <h4 className="font-bold mb-2">Contact Us</h4>
                  <p className="text-sm text-gray-200">Get in touch with our team</p>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
      <LiveChat />
      </section>
    </div>
  )
}