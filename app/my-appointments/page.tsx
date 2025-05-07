'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle, ChevronRight, FileText, Loader2, MessageSquare, User } from "lucide-react"
import { Footer } from "@/components/Footer"
import {AnimatePresence, motion} from "framer-motion"

interface Consultation {
  id: number
  status: string
  notes?: string
  doctor: {
    name: string
    specialization: string
    photoUrl?: string
  }
}


export default function MyAppointmentsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)
  const [startingConsultation, setStartingConsultation] = useState<number | null>(null)
  const router = useRouter()
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  }
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12
      }
    }
  }
  
  const handleSessionInvalid = () => {
    toast({
      title: "Invalid session",
      description: "Please login again.",
      variant: "destructive",
    })

    // Hapus token dan data user
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    // Redirect ke halaman login atau home
    router.push("/")
  }

  const fetchConsultations = () => {
    const token = localStorage.getItem("token")
    if (!token) {
      handleSessionInvalid()
      return
    }

    fetch("https://backend.hostspot.online/consultations", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.status === 401) {
          handleSessionInvalid()
          return
        }

        const text = await res.text()
        try {
          const data = JSON.parse(text)
          if (Array.isArray(data)) {
            setConsultations(data)
          } else {
            console.error("Data bukan array:", data)
            setConsultations([])
          }
        } catch (err) {
          console.error("Gagal parse JSON:", err)
          setConsultations([])
        }

        setLoading(false)
      })
      .catch((err) => {
        console.error("Fetch gagal:", err)
        setConsultations([])
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchConsultations()
  }, [])

  const startConsultation = (id: number) => {
    const token = localStorage.getItem("token")
    if (!token) {
      handleSessionInvalid()
      return
    }

    setStartingConsultation(id)

    fetch(`https://backend.hostspot.online/consultations/${id}/start`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.status === 401) {
          handleSessionInvalid()
          return
        }

        if (res.ok) {
          toast({
            title: "Consultation started",
            description: "You will be redirected to the chat page.",
          })
          
          // Refresh data konsultasi
          fetchConsultations()
          
          // Redirect ke halaman chat
          router.push(`/chat/${id}`)
        } else {
          const errorText = await res.text()
          toast({
            title: "Failed to start consultation",
            description: errorText || "An error occurred on the server",
            variant: "destructive",
          })
        }
      })
      .catch((err) => {
        console.error("Start consultation failed:", err)
        toast({
          title: "Gagal memulai konsultasi",
          description: "Terjadi kesalahan pada jaringan",
          variant: "destructive",
        })
      })
      .finally(() => {
        setStartingConsultation(null)
      })
  }
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading consultations...</span>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Active</span>
      case "completed":
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Completed</span>
      case "pending":
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
      default:
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">{status}</span>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/50 to-white dark:from-gray-900 dark:to-gray-950">
      <motion.header 
        className="bg-white dark:bg-gray-900 shadow-sm py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <div className="rounded-full bg-teal-500 p-2">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Consultation History</h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Button 
                variant="outline" 
                onClick={() => router.push("/doctors")}
                className="border-teal-200 hover:border-teal-500 hover:bg-teal-50 dark:border-gray-700 dark:hover:border-teal-800 dark:hover:bg-teal-900/20"
              >
                Back to Doctor List
              </Button>
            </motion.div>
          </div>
        </div>

      </motion.header>
      <main className="container px-4 md:px-6 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-12 h-12 border-4 border-teal-200 border-t-teal-500 rounded-full"
            />
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {consultations.length === 0 ? 'No Consultations Yet' : 'Your Consultations'}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  {consultations.length === 0 
                    ? 'Start consulting with a doctor to get medical assistance' 
                    : `Total ${consultations.length} consultations`}
                </p>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => router.push("/doctors")}
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                >
                  <User className="mr-2 h-4 w-4" />
                  New Consultation
                </Button>
              </motion.div>
            </motion.div>
            {consultations.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="rounded-2xl border border-dashed border-teal-200 dark:border-teal-900/50 bg-white dark:bg-gray-800 p-10 text-center shadow-sm"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: 0.5, 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="rounded-full bg-teal-100 dark:bg-teal-900/30 p-3 inline-flex mx-auto mb-4"
                >
                  <MessageSquare className="h-8 w-8 text-teal-500" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                  No consultation history yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  Start consulting with a doctor to get medical assistance tailored to your needs
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={() => router.push("/doctors")}
                    className="bg-teal-500 hover:bg-teal-600 text-white"
                  >
                    Find a Doctor
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-6"
              >
                <AnimatePresence>
                  {consultations.map((c) => (
                    <motion.div
                      key={c.id}
                      variants={item}
                      layoutId={`consultation-${c.id}`}
                      className={`relative overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg ${
                        c.status === 'active' 
                          ? 'bg-white dark:bg-gray-800 border-l-4 border-l-teal-500' 
                          : c.status === 'pending'
                            ? 'bg-white dark:bg-gray-800 border-l-4 border-l-yellow-500'
                            : c.status === 'completed'
                              ? 'bg-white dark:bg-gray-800 border-l-4 border-l-green-500'
                              : 'bg-white dark:bg-gray-800 border-l-4 border-l-red-500'
                      }`}
                    >
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="shrink-0 flex flex-col items-center"
                          >
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-teal-100 dark:border-teal-900/50 relative">
                              <img
                                src={c.doctor.photoUrl || "/default-doctor.png"}
                                alt={c.doctor.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 rounded-full shadow-inner"></div>
                            </div>
                            <div className="mt-2 text-center">
                              <div className="flex items-center justify-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                <Calendar className="h-3 w-3" />
                                {new Date(c.createdAt).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'short',
                                })}
                              </div>
                            </div>
                          </motion.div>
                          
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                              <div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                  {c.doctor.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  {c.doctor.specialization}
                                </p>
                                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                  <Calendar className="h-3 w-3" />
                                  <span>
                                    Created: {formatDate(c.createdAt)}
                                  </span>
                                </div>
                                {c.status === 'completed' && (
                                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    <CheckCircle className="h-3 w-3 text-green-500" />
                                    <span>
                                      Completed: {formatDate(c.updatedAt)}
                                    </span>
                                  </div>
                                )}
                              </div>
                              
                              <div>
                                {getStatusBadge(c.status)}
                              </div>
                            </div>
                            
                            {c.notes && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ duration: 0.3 }}
                                className={`mb-4 p-4 rounded-lg ${
                                  c.status === 'completed'
                                    ? 'bg-green-50 border border-green-100 dark:bg-green-900/10 dark:border-green-900/30'
                                    : c.status === 'pending'
                                      ? 'bg-yellow-50 border border-yellow-100 dark:bg-yellow-900/10 dark:border-yellow-900/30'
                                      : 'bg-gray-50 border border-gray-100 dark:bg-gray-800 dark:border-gray-700'
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  <div className={`mt-0.5 ${
                                    c.status === 'completed'
                                      ? 'text-green-500'
                                      : c.status === 'pending'
                                        ? 'text-yellow-500'
                                        : 'text-gray-500'
                                  }`}>
                                    <FileText className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <p className={`text-sm font-medium ${
                                      c.status === 'completed'
                                        ? 'text-green-800 dark:text-green-400'
                                        : c.status === 'pending'
                                          ? 'text-yellow-800 dark:text-yellow-400'
                                          : 'text-gray-800 dark:text-gray-300'
                                    }`}>
                                      {c.status === 'completed' ? 'Diagnosis:' : 'Notes:'}
                                    </p>
                                    <p className={`text-sm mt-1 ${
                                      c.status === 'completed'
                                        ? 'text-green-700 dark:text-green-300'
                                        : c.status === 'pending'
                                          ? 'text-yellow-700 dark:text-yellow-300'
                                          : 'text-gray-700 dark:text-gray-300'
                                    }`}>
                                      {c.notes}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                            
                            <div className="flex flex-wrap gap-3 mt-4">
                              {c.status === "active" && (
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button
                                    onClick={() => router.push(`/chat/${c.id}`)}
                                    className="bg-teal-500 hover:bg-teal-600 text-white"
                                  >
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Continue Chat
                                  </Button>
                                </motion.div>
                              )}
                              
                              {c.status === "completed" && (
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button
                                    variant="outline"
                                    onClick={() => router.push(`/chat/${c.id}`)}
                                    className="border-teal-200 hover:border-teal-500 hover:bg-teal-50 dark:border-gray-700 dark:hover:border-teal-600 dark:hover:bg-teal-900/20"
                                  >
                                    <FileText className="mr-2 h-4 w-4" />
                                    View Chat History
                                  </Button>
                                </motion.div>
                              )}
                              
                              {c.status === "pending" && (
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button
                                    onClick={() => startConsultation(c.id)}
                                    disabled={startingConsultation === c.id}
                                    className={`bg-yellow-500 hover:bg-yellow-600 text-white ${
                                      startingConsultation === c.id ? 'opacity-80' : ''
                                    }`}
                                  >
                                    {startingConsultation === c.id ? (
                                      <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Starting...
                                      </>
                                    ) : (
                                      <>
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        Start Consultation
                                      </>
                                    )}
                                  </Button>
                                </motion.div>
                              )}
                              
                              {c.status === "completed" && (
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button
                                    variant="outline"
                                    onClick={() => router.push("/doctors")}
                                    className="border-green-200 hover:border-green-500 hover:bg-green-50 dark:border-gray-700 dark:hover:border-green-600 dark:hover:bg-green-900/20"
                                  >
                                    <User className="mr-2 h-4 w-4" />
                                    New Consultation
                                  </Button>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}
      </main>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Footer />
      </motion.div>
    </div>
  )
}