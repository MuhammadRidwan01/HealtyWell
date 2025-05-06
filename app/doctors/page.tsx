'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Footer } from "@/components/Footer"
import { LiveChat } from "@/components/live-chat"
import { Bot, Star, Clock, Award, ChevronRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/Header"

interface Doctor {
  id: number
  name: string
  specialization: string
  experience: number
  rating: number
  photoUrl?: string
  bio: string
}

export default function DoctorListPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
        stiffness: 100,
        damping: 10
      }
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  // Listen for scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      toast({ 
        title: "Akses Ditolak", 
        description: "Silakan login dahulu", 
        variant: "destructive" 
      })
      router.push("/")
      return
    }

    fetch("https://backend.hostspot.online/doctors", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setDoctors(data)
        setFilteredDoctors(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        toast({ 
          title: "Gagal", 
          description: "Tidak bisa mengambil daftar dokter." 
        })
        setLoading(false)
      })
  }, [router])

  // Filter doctors based on search term and specialty
  useEffect(() => {
    let results = doctors;
    
    if (searchTerm) {
      results = results.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedSpecialty) {
      results = results.filter(doc => 
        doc.specialization === selectedSpecialty
      );
    }
    
    setFilteredDoctors(results);
  }, [searchTerm, selectedSpecialty, doctors]);

  // Get unique specialties for filter
  const specialties = [...new Set(doctors.map(doc => doc.specialization))];

  const handleBooking = async (doctorId: number) => {
    const token = localStorage.getItem("token")
    
    try {
      const res = await fetch("https://backend.hostspot.online/consultations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ doctorId }),
      })

      if (!res.ok) {
        toast({ 
          title: "Gagal Booking", 
          description: "Konsultasi sudah aktif atau error lainnya.",
          variant: "destructive"
        })
        return
      }

      await res.json()
      toast({
        title: "Booking Berhasil",
        description: "Anda akan diarahkan ke halaman konsultasi",
        variant: "default"
      })
      router.push(`/my-appointments`)
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Terjadi kesalahan saat memproses permintaan",
        variant: "destructive"
      })
    }
  }

  return (
    <>
      <Header/>

      <main className="flex-1 min-h-screen">
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="py-20 md:py-28 bg-gradient-to-b from-teal-50 via-teal-50/50 to-white dark:from-gray-900 dark:via-gray-900/80 dark:to-gray-950"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-6">
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.8, 
                  type: "spring", 
                  stiffness: 200,
                  damping: 15
                }}
                className="inline-block rounded-full bg-teal-100 p-3 dark:bg-teal-900/30"
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
                className="h-5 w-5 text-white"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
              >
                <span className="relative">
                  AI-Powered 
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-teal-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  />
                </span>{" "}
                <span className="bg-gradient-to-r from-teal-500 to-teal-700 dark:from-teal-400 dark:to-teal-600 bg-clip-text text-transparent">Health Services</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-300"
              >
                Experience the future of healthcare with our intelligent AI assistants that provide personalized health guidance 24/7
              </motion.p>
              
              <motion.div 
                className="w-full max-w-md mx-auto mt-8 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                <Input
                  type="text"
                  placeholder="Cari dokter atau spesialisasi..."
                  className="pl-10 border-teal-200 focus:border-teal-500 focus:ring-teal-500 dark:border-gray-700 dark:focus:border-teal-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap gap-2 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <Button
                  variant={selectedSpecialty === null ? "default" : "outline"}
                  className={`rounded-full text-sm ${
                    selectedSpecialty === null 
                      ? "bg-teal-500 hover:bg-teal-600 text-white" 
                      : "border-teal-200 hover:border-teal-500 hover:text-teal-700 dark:border-gray-700"
                  }`}
                  onClick={() => setSelectedSpecialty(null)}
                >
                  Semua
                </Button>
                {specialties.map((specialty) => (
                  <Button
                    key={specialty}
                    variant={selectedSpecialty === specialty ? "default" : "outline"}
                    className={`rounded-full text-sm ${
                      selectedSpecialty === specialty 
                        ? "bg-teal-500 hover:bg-teal-600 text-white" 
                        : "border-teal-200 hover:border-teal-500 hover:text-teal-700 dark:border-gray-700"
                    }`}
                    onClick={() => setSelectedSpecialty(specialty)}
                  >
                    {specialty}
                  </Button>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        <section className="py-12 container px-4 md:px-6">
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
              <motion.h2 
                className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {filteredDoctors.length} Dokter Tersedia
              </motion.h2>
              
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filteredDoctors.map((doc) => (
                    <motion.div
                      key={doc.id}
                      variants={item}
                      layoutId={`doctor-${doc.id}`}
                      className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-100 dark:border-gray-700 group"
                      whileHover={{ 
                        y: -5,
                        transition: { 
                          duration: 0.2,
                          type: "spring",
                          stiffness: 300
                        }
                      }}
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-teal-600" />
                      <div className="p-5">
                        <div className="flex items-start gap-4">
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="relative"
                          >
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-teal-100 dark:border-teal-900/50">
                              <img
                                src={doc.photoUrl || "/default-doctor.png"}
                                alt={doc.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute bottom-0 right-0 bg-teal-500 rounded-full p-1 border-2 border-white dark:border-gray-800">
                              <Award className="h-4 w-4 text-white" />
                            </div>
                          </motion.div>
                          
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                              {doc.name}
                            </h3>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-400 px-2 py-0.5 rounded-full text-xs font-medium">
                                {doc.specialization}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400" />
                                <span className="text-sm font-medium">{doc.rating}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-teal-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">{doc.experience} tahun</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm mt-4 text-gray-600 dark:text-gray-300 line-clamp-3">
                          {doc.bio}
                        </p>
                        
                        <div className="mt-5 flex justify-end">
                          <Button 
                            className="bg-teal-500 hover:bg-teal-600 text-white flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
                            onClick={() => handleBooking(doc.id)}
                          >
                            <span>Konsultasi Sekarang</span>
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
              
              {filteredDoctors.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-gray-500 dark:text-gray-400">Tidak ada dokter yang sesuai dengan kriteria pencarian Anda.</p>
                </motion.div>
              )}
            </>
          )}
        </section>
      </main>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Footer />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
      >
        <LiveChat />
      </motion.div>
    </>
  )
}