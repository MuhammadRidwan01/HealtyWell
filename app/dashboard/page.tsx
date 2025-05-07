"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, User, Calendar, Activity, Heart, Brain, Apple, TrendingUp, Droplets, CalendarIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts"
import {motion} from "framer-motion"
// Data untuk charts
const activityData = [
    { name: "Sen", steps: 7500, calories: 320, target: 10000 },
    { name: "Sel", steps: 9200, calories: 380, target: 10000 },
    { name: "Rab", steps: 8400, calories: 350, target: 10000 },
    { name: "Kam", steps: 7900, calories: 330, target: 10000 },
    { name: "Jum", steps: 10500, calories: 450, target: 10000 },
    { name: "Sab", steps: 11200, calories: 480, target: 10000 },
    { name: "Min", steps: 6800, calories: 290, target: 10000 },
];

const nutritionData = [
    { name: "Sen", protein: 65, carbs: 120, fat: 45 },
    { name: "Sel", protein: 72, carbs: 110, fat: 40 },
    { name: "Rab", protein: 68, carbs: 115, fat: 42 },
    { name: "Kam", protein: 70, carbs: 125, fat: 38 },
    { name: "Jum", protein: 75, carbs: 105, fat: 35 },
    { name: "Sab", protein: 80, carbs: 95, fat: 30 },
    { name: "Min", protein: 62, carbs: 130, fat: 48 },
];

const sleepData = [
    { name: "Sen", hours: 6.5, quality: 75 },
    { name: "Sel", hours: 7.2, quality: 85 },
    { name: "Rab", hours: 6.8, quality: 80 },
    { name: "Kam", hours: 7.5, quality: 90 },
    { name: "Jum", hours: 8.0, quality: 95 },
    { name: "Sab", hours: 8.5, quality: 92 },
    { name: "Min", hours: 7.8, quality: 88 },
];

const healthScoreData = [
    { name: "Aktivitas Fisik", value: 78 },
    { name: "Nutrisi", value: 65 },
    { name: "Tidur", value: 85 },
    { name: "Kesehatan Mental", value: 72 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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

export default function DashboardPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState<any>(null)
    const router = useRouter()
    const { toast } = useToast()
    const [consultations, setConsultations] = useState<Consultation[]>([])
    const handleSessionInvalid = () => {
        toast({
          title: "Sesi tidak valid",
          description: "Silakan login kembali.",
          variant: "destructive",
        })
    
        // Hapus token dan data user
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    
        // Redirect ke halaman login atau home
        router.push("/")
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
    
    useEffect(() => {
        // Periksa apakah pengguna sudah login
        const token = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')
        console.log("User:", storedUser)
        if (!token || !storedUser) {
            // Jika tidak login, arahkan ke halaman utama
            toast({
                title: "Akses Ditolak",
                description: "Anda harus login untuk mengakses dashboard.",
                variant: "destructive"
            })
            router.push('/')
            return
        }

        try {
            // Jika login, ambil data pengguna
            setUserData(JSON.parse(storedUser))

            // Simulasi loading data dashboard
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        } catch (err) {
            console.error("Error parsing user data:", err)
            toast({
                title: "Terjadi Kesalahan",
                description: "Gagal memuat data pengguna. Silakan coba lagi.",
                variant: "destructive"
            })
            router.push('/')
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
      
            })
            .catch((err) => {
              console.error("Fetch gagal:", err)
              setConsultations([])
            })
    }, [router, toast])
    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                    <p className="text-sm text-muted-foreground">Memuat dashboard...</p>
                </div>
            </div>
        )
    }

    const getUserInitials = () => {
        if (!userData) return "U"

        const firstInitial = userData.firstName ? userData.firstName.charAt(0).toUpperCase() : ""
        const lastInitial = userData.lastName ? userData.lastName.charAt(0).toUpperCase() : ""

        return firstInitial + lastInitial || userData.email.charAt(0).toUpperCase()
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-10 dark:from-gray-900 dark:to-gray-950">
            {/* Header */}
            <header className="sticky top-0 z-30 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push('/')}
                            className="mr-2"
                        >
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
                                className="h-5 w-5"
                            >
                                <path d="m12 19-7-7 7-7" />
                                <path d="M19 12H5" />
                            </svg>
                            <span className="sr-only">Kembali</span>
                        </Button>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">Dashboard Kesehatan</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            onClick={() => {
                                localStorage.removeItem('token')
                                localStorage.removeItem('user')
                                toast({
                                    title: "Berhasil Keluar",
                                    description: "Anda telah berhasil keluar dari akun.",
                                })
                                router.push('/')
                            }}
                            className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                        >
                            Keluar
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container py-8">
                {/* User Profile Section */}
                <div className="mb-8 grid gap-6 md:grid-cols-[1fr_2fr]">
                    <Card className="overflow-hidden border-none shadow-md dark:bg-gray-800/50 backdrop-blur-sm">
                        <CardHeader className="pb-2 bg-gradient-to-r from-teal-500/10 to-teal-600/10">
                            <CardTitle>Profil Pengguna</CardTitle>
                            <CardDescription>Your personal information</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center space-y-4 pt-4">
                                <Avatar className="h-24 w-24 ring-2 ring-teal-500 ring-offset-2 dark:ring-offset-gray-900">
                                    <AvatarImage src="/placeholder-avatar.jpg" alt={userData?.username || "User"} />
                                    <AvatarFallback className="text-2xl bg-gradient-to-br from-teal-400 to-teal-600 text-white">{getUserInitials()}</AvatarFallback>
                                </Avatar>
                                <div className="text-center">
                                    <h3 className="text-xl font-bold">{userData?.firstName} {userData?.lastName}</h3>
                                    <p className="text-sm text-muted-foreground">{userData?.email}</p>
                                </div>
                                {/* <div className="w-full space-y-3 pt-4">
                                    <div className="flex items-center justify-between rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                                        <span className="text-sm font-medium">Age:</span>
                                        <span className="text-sm font-semibold">{userData?.age || "Not filled"}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                                        <span className="text-sm font-medium">Gender:</span>
                                        <span className="text-sm font-semibold">{userData?.gender || "Not filled"}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                                        <span className="text-sm font-medium">Height:</span>
                                        <span className="text-sm font-semibold">{userData?.height ? `${userData.height} cm` : "Not filled"}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                                        <span className="text-sm font-medium">Weight:</span>
                                        <span className="text-sm font-semibold">{userData?.weight ? `${userData.weight} kg` : "Not filled"}</span>
                                    </div>
                                </div>                                <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-md hover:shadow-lg transition-all duration-200">Edit Profil</Button> */}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-md dark:bg-gray-800/50 backdrop-blur-sm">
                        <CardHeader className="pb-2 bg-gradient-to-r from-teal-500/10 to-teal-600/10">
                            <CardTitle>Health Summary</CardTitle>
                            <CardDescription>Your current health status</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4">
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
                                        <div className="p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-lg font-semibold">{c.doctor.name}</h3>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    c.status === 'active' ? 'bg-teal-100 text-teal-800' :
                                                    c.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    c.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {c.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{c.doctor.specialization}</p>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <CalendarIcon className="w-4 h-4 mr-1" />
                                                {c.notes || 'No additional notes'}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Dashboard Tabs */}
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4 md:w-auto bg-gray-100 p-1 dark:bg-gray-800 rounded-lg">
                        <TabsTrigger value="overview" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700">Ringkasan</TabsTrigger>
                        <TabsTrigger value="activity" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700">Aktivitas</TabsTrigger>
                        <TabsTrigger value="nutrition" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700">Nutrisi</TabsTrigger>
                        <TabsTrigger value="appointments" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700">Jadwal</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                            <Card className="border-none shadow-md hover:shadow-lg transition-all duration-200 dark:bg-gray-800/50 backdrop-blur-sm">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Daily Steps</CardTitle>
                                    <div className="rounded-full bg-teal-100 p-2 dark:bg-teal-900/20">
                                        <TrendingUp className="h-4 w-4 text-teal-600" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">8,423</div>
                                    <p className="text-xs text-muted-foreground">
                                        <span className="text-green-500 font-medium">+12%</span> from last week
                                    </p>
                                    <div className="mt-4 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full" style={{ width: '84.2%' }}></div>
                                    </div>
                                    <p className="mt-1 text-xs text-right text-muted-foreground">84.2% of target</p>
                                </CardContent>                            </Card>

                            <Card className="border-none shadow-md hover:shadow-lg transition-all duration-200 dark:bg-gray-800/50 backdrop-blur-sm">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Kalori Terbakar</CardTitle>
                                    <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-900/20">
                                        <Activity className="h-4 w-4 text-orange-600" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">456</div>
                                    <p className="text-xs text-muted-foreground">
                                        <span className="text-green-500 font-medium">+5%</span> dari minggu lalu
                                    </p>
                                    <div className="mt-4 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" style={{ width: '65%' }}></div>
                                    </div>
                                    <p className="mt-1 text-xs text-right text-muted-foreground">65% dari target</p>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-md hover:shadow-lg transition-all duration-200 dark:bg-gray-800/50 backdrop-blur-sm">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Sleep Hours</CardTitle>
                                    <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/20">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-blue-600"
                                        >
                                            <path d="M12 21a9 9 0 0 0 0-18C7 3 3 7 3 12c0 5 4 9 9 9Z" />
                                            <path d="M12 3v9l5.2 3" />
                                        </svg>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">7.2 hours</div>
                                    <p className="text-xs text-muted-foreground">
                                        <span className="text-green-500 font-medium">+0.5 hours</span> from last week
                                    </p>
                                    <div className="mt-4 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{ width: '90%' }}></div>
                                    </div>
                                    <p className="mt-1 text-xs text-right text-muted-foreground">90% of target</p>
                                </CardContent>                            </Card>

                            <Card className="border-none shadow-md hover:shadow-lg transition-all duration-200 dark:bg-gray-800/50 backdrop-blur-sm">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Konsumsi Air</CardTitle>
                                    <div className="rounded-full bg-sky-100 p-2 dark:bg-sky-900/20">
                                        <Droplets className="h-4 w-4 text-sky-600" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">1.8 L</div>
                                    <p className="text-xs text-muted-foreground">
                                        <span className="text-red-500 font-medium">-0.2 L</span> dari minggu lalu
                                    </p>
                                    <div className="mt-4 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full" style={{ width: '75%' }}></div>
                                    </div>
                                    <p className="mt-1 text-xs text-right text-muted-foreground">75% dari target</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                            <Card className="lg:col-span-2 border-none shadow-md dark:bg-gray-800/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle>Aktivitas Mingguan</CardTitle>
                                    <CardDescription>Ringkasan aktivitas fisik Anda selama seminggu terakhir</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart
                                                data={activityData}
                                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                            >
                                                <defs>
                                                    <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                                    </linearGradient>
                                                    <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                                        border: 'none'
                                                    }}
                                                />
                                                <Legend />
                                                <Area
                                                    type="monotone"
                                                    dataKey="steps"
                                                    stroke="#0ea5e9"
                                                    fillOpacity={1}
                                                    fill="url(#colorSteps)"
                                                    name="Langkah"
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="calories"
                                                    stroke="#f97316"
                                                    fillOpacity={1}
                                                    fill="url(#colorCalories)"
                                                    name="Kalori"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-md dark:bg-gray-800/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle>Tips Kesehatan</CardTitle>
                                    <CardDescription>Rekomendasi untuk meningkatkan kesehatan Anda</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2 h-4 w-4 text-teal-500"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <span>Tingkatkan konsumsi air menjadi 2L per hari</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2 h-4 w-4 text-teal-500"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <span>Tambahkan 15 menit latihan kardio setiap hari</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2 h-4 w-4 text-teal-500"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <span>Praktikkan teknik pernapasan dalam saat merasa stres</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2 h-4 w-4 text-teal-500"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <span>Jaga keseimbangan antara pekerjaan dan istirahat</span>
                                        </li>
                                    </ul>
                                    <Button variant="link" className="mt-4 px-0 text-teal-600">
                                        Lihat semua tips
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="activity" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 sm:grid-cols-1">
                            <Card className="border-none shadow-md dark:bg-gray-800/50 backdrop-blur-sm w-full">
                                <CardHeader>
                                    <CardTitle>Aktivitas Harian</CardTitle>
                                    <CardDescription>Perbandingan langkah dan kalori terbakar</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                data={activityData}
                                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                                        border: 'none'
                                                    }}
                                                />
                                                <Legend />
                                                <Bar dataKey="steps" name="Langkah" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                                                <Bar dataKey="calories" name="Kalori" fill="#f97316" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-md dark:bg-gray-800/50 backdrop-blur-sm w-full">
                                <CardHeader>
                                    <CardTitle>Target Aktivitas</CardTitle>
                                    <CardDescription>Progres terhadap target mingguan Anda</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                data={activityData}
                                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                                        border: 'none'
                                                    }}
                                                />
                                                <Legend />
                                                <Line
                                                    type="monotone"
                                                    dataKey="steps"
                                                    stroke="#0ea5e9"
                                                    strokeWidth={2}
                                                    dot={{ r: 4, strokeWidth: 2 }}
                                                    activeDot={{ r: 6, strokeWidth: 2 }}
                                                    name="Langkah"
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="target"
                                                    stroke="#10b981"
                                                    strokeWidth={2}
                                                    strokeDasharray="5 5"
                                                    dot={false}
                                                    name="Target"
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="col-span-full border-none shadow-md dark:bg-gray-800/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle>Rekomendasi Aktivitas</CardTitle>
                                    <CardDescription>Aktivitas yang disarankan berdasarkan profil Anda</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                        <div className="rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 shadow-sm">
                                            <div className="rounded-full bg-blue-100 p-2 w-10 h-10 flex items-center justify-center mb-3 dark:bg-blue-800/30">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="h-5 w-5 text-blue-600"
                                                >
                                                    <path d="M19 4v16" />
                                                    <path d="M5 4v16" />
                                                    <path d="M19 12H5" />
                                                </svg>
                                            </div>
                                            <h3 className="font-semibold mb-1">Yoga Pagi</h3>
                                            <p className="text-sm text-muted-foreground mb-3">15 menit yoga ringan untuk memulai hari</p>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <span className="bg-blue-100 dark:bg-blue-800/30 text-blue-600 px-2 py-1 rounded-full">Pemula</span>
                                            </div>
                                        </div>

                                        <div className="rounded-lg overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 shadow-sm">
                                            <div className="rounded-full bg-green-100 p-2 w-10 h-10 flex items-center justify-center mb-3 dark:bg-green-800/30">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="h-5 w-5 text-green-600"
                                                >
                                                    <path d="M18 8c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" />
                                                    <path d="M10 19c0 1.7-1.3 3-3 3s-3-1.3-3-3 1.3-3 3-3 3 1.3 3 3z" />
                                                    <path d="M17 19c0 1.7 1.3 3 3 3s3-1.3 3-3-1.3-3-3-3-3 1.3-3 3z" />
                                                    <path d="M14 14v5" />
                                                    <path d="M7 16v3" />
                                                    <path d="M20 16v3" />
                                                </svg>
                                            </div>
                                            <h3 className="font-semibold mb-1">Jalan Cepat</h3>
                                            <p className="text-sm text-muted-foreground mb-3">30 menit jalan cepat di sore hari</p>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <span className="bg-green-100 dark:bg-green-800/30 text-green-600 px-2 py-1 rounded-full">Sedang</span>
                                            </div>
                                        </div>

                                        <div className="rounded-lg overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 shadow-sm">
                                            <div className="rounded-full bg-orange-100 p-2 w-10 h-10 flex items-center justify-center mb-3 dark:bg-orange-800/30">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="h-5 w-5 text-orange-600"
                                                >
                                                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                    <path d="M12 18v-6" />
                                                    <path d="M8 18v-1" />
                                                    <path d="M16 18v-3" />
                                                </svg>
                                            </div>
                                            <h3 className="font-semibold mb-1">HIIT Workout</h3>
                                            <p className="text-sm text-muted-foreground mb-3">20 menit latihan intensitas tinggi</p>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <span className="bg-orange-100 dark:bg-orange-800/30 text-orange-600 px-2 py-1 rounded-full">Lanjutan</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="nutrition" className="space-y-4">
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            <Card className="border-none shadow-md dark:bg-gray-800/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle>Asupan Nutrisi</CardTitle>
                                    <CardDescription>Distribusi makronutrien mingguan Anda</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                data={nutritionData}
                                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                                barSize={20}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                                        border: 'none'
                                                    }}
                                                />
                                                <Legend />
                                                <Bar dataKey="protein" name="Protein (g)" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
                                                <Bar dataKey="carbs" name="Karbohidrat (g)" stackId="a" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                                                <Bar dataKey="fat" name="Lemak (g)" stackId="a" fill="#f97316" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-md dark:bg-gray-800/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle>Kualitas Tidur</CardTitle>
                                    <CardDescription>Durasi dan kualitas tidur mingguan</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                data={sleepData}
                                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                                <YAxis yAxisId="left" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                                <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                                        border: 'none'
                                                    }}
                                                />
                                                <Legend />
                                                <Line
                                                    yAxisId="left"
                                                    type="monotone"
                                                    dataKey="hours"
                                                    stroke="#8b5cf6"
                                                    strokeWidth={2}
                                                    dot={{ r: 4, strokeWidth: 2 }}
                                                    activeDot={{ r: 6, strokeWidth: 2 }}
                                                    name="Jam Tidur"
                                                />
                                                <Line
                                                    yAxisId="right"
                                                    type="monotone"
                                                    dataKey="quality"
                                                    stroke="#ec4899"
                                                    strokeWidth={2}
                                                    dot={{ r: 4, strokeWidth: 2 }}
                                                    activeDot={{ r: 6, strokeWidth: 2 }}
                                                    name="Kualitas (%)"
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="col-span-1 md:col-span-2 border-none shadow-md dark:bg-gray-800/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle>Rekomendasi Nutrisi</CardTitle>
                                    <CardDescription>Makanan yang disarankan berdasarkan profil Anda</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                                        <div className="rounded-lg overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 shadow-sm">
                                            <div className="rounded-full bg-green-100 p-2 w-10 h-10 flex items-center justify-center mb-3 dark:bg-green-800/30">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="h-5 w-5 text-green-600"
                                                >
                                                    <path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM15.42 15.42l6.37-6.37a4.5 4.5 0 0 0-6.37-6.36L9.06 9.05" />
                                                </svg>
                                            </div>
                                            <h3 className="font-semibold mb-1">Sayuran Hijau</h3>
                                            <p className="text-sm text-muted-foreground mb-3">Tingkatkan asupan sayuran hijau untuk vitamin dan mineral</p>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <span className="bg-green-100 dark:bg-green-800/30 text-green-600 px-2 py-1 rounded-full">Prioritas Tinggi</span>
                                            </div>
                                        </div>

                                        <div className="rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 shadow-sm">
                                            <div className="rounded-full bg-blue-100 p-2 w-10 h-10 flex items-center justify-center mb-3 dark:bg-blue-800/30">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="h-5 w-5 text-blue-600"
                                                >
                                                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                                                </svg>
                                            </div>
                                            <h3 className="font-semibold mb-1">Ikan Berlemak</h3>
                                            <p className="text-sm text-muted-foreground mb-3">Konsumsi ikan salmon atau tuna untuk omega-3</p>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <span className="bg-blue-100 dark:bg-blue-800/30 text-blue-600 px-2 py-1 rounded-full">Prioritas Sedang</span>
                                            </div>
                                        </div>

                                        <div className="rounded-lg overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 shadow-sm">
                                            <div className="rounded-full bg-purple-100 p-2 w-10 h-10 flex items-center justify-center mb-3 dark:bg-purple-800/30">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="h-5 w-5 text-purple-600"
                                                >
                                                    <path d="M12 2a9 9 0 0 0-9 9c0 4 3 8 9 11 6-3 9-7 9-11a9 9 0 0 0-9-9Z" />
                                                    <path d="M12 14v.01" />
                                                </svg>
                                            </div>
                                            <h3 className="font-semibold mb-1">Biji-bijian Utuh</h3>
                                            <p className="text-sm text-muted-foreground mb-3">Ganti nasi putih dengan beras merah atau quinoa</p>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <span className="bg-purple-100 dark:bg-purple-800/30 text-purple-600 px-2 py-1 rounded-full">Prioritas Sedang</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="appointments" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card className="border-none shadow-md dark:bg-gray-800/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle>Jadwal Konsultasi</CardTitle>
                                    <CardDescription>Jadwal konsultasi kesehatan Anda yang akan datang</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-4 rounded-lg border p-4 dark:border-gray-700">
                                            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/20">
                                                <Calendar className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className="font-medium">Konsultasi Nutrisi</p>
                                                <p className="text-sm text-muted-foreground">Dr. Anita Wijaya</p>
                                                <div className="flex items-center pt-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="mr-1 h-4 w-4 text-muted-foreground"
                                                    >
                                                        <circle cx="12" cy="12" r="10" />
                                                        <polyline points="12 6 12 12 16 14" />
                                                    </svg>
                                                    <span className="text-xs text-muted-foreground">Senin, 15 Juli 2024 • 10:00 WIB</span>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">Detail</Button>
                                        </div>

                                        <div className="flex items-start space-x-4 rounded-lg border p-4 dark:border-gray-700">
                                            <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/20">
                                                <Calendar className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className="font-medium">Pemeriksaan Fisik Rutin</p>
                                                <p className="text-sm text-muted-foreground">Dr. Budi Santoso</p>
                                                <div className="flex items-center pt-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="mr-1 h-4 w-4 text-muted-foreground"
                                                    >
                                                        <circle cx="12" cy="12" r="10" />
                                                        <polyline points="12 6 12 12 16 14" />
                                                    </svg>
                                                    <span className="text-xs text-muted-foreground">Rabu, 24 Juli 2024 • 13:30 WIB</span>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">Detail</Button>
                                        </div>

                                        <Button className="w-full">Buat Janji Baru</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-md dark:bg-gray-800/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle>Pengingat Obat</CardTitle>
                                    <CardDescription>Jadwal konsumsi obat dan suplemen Anda</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-4 rounded-lg border p-4 dark:border-gray-700">
                                            <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-900/20">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="h-5 w-5 text-orange-600"
                                                >
                                                    <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                                                    <path d="m17 3-5 5" />
                                                    <path d="M19 5 5 19" />
                                                    <path d="m21 7-5 5" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className="font-medium">Vitamin D</p>
                                                <p className="text-sm text-muted-foreground">1 tablet, setelah sarapan</p>
                                                <div className="flex items-center pt-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="mr-1 h-4 w-4 text-muted-foreground"
                                                    >
                                                        <circle cx="12" cy="12" r="10" />
                                                        <polyline points="12 6 12 12 16 14" />
                                                    </svg>
                                                    <span className="text-xs text-muted-foreground">Setiap hari • 08:00 WIB</span>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">Tandai</Button>
                                        </div>

                                        <div className="flex items-start space-x-4 rounded-lg border p-4 dark:border-gray-700">
                                            <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/20">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="h-5 w-5 text-purple-600"
                                                >
                                                    <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                                                    <path d="m17 3-5 5" />
                                                    <path d="M19 5 5 19" />
                                                    <path d="m21 7-5 5" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className="font-medium">Omega-3</p>
                                                <p className="text-sm text-muted-foreground">2 kapsul, setelah makan malam</p>
                                                <div className="flex items-center pt-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="mr-1 h-4 w-4 text-muted-foreground"
                                                    >
                                                        <circle cx="12" cy="12" r="10" />
                                                        <polyline points="12 6 12 12 16 14" />
                                                    </svg>
                                                    <span className="text-xs text-muted-foreground">Setiap hari • 19:00 WIB</span>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">Tandai</Button>
                                        </div>

                                        <Button className="w-full">Kelola Pengingat</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="col-span-2 border-none shadow-md dark:bg-gray-800/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle>Riwayat Pemeriksaan</CardTitle>
                                    <CardDescription>Riwayat pemeriksaan kesehatan Anda</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="relative">
                                        <div className="absolute h-full w-px bg-gray-200 dark:bg-gray-700 left-4 sm:left-4 top-0"></div>
                                        <ol className="space-y-6 relative">
                                            <li className="pl-8 sm:pl-10">
                                                <div className="absolute left-0 flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/20 text-teal-600 -translate-x-1/2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="h-4 w-4"
                                                    >
                                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                                    </svg>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                                    <div>
                                                        <h3 className="font-semibold text-sm sm:text-base">Pemeriksaan Kesehatan Tahunan</h3>
                                                        <p className="text-xs sm:text-sm text-muted-foreground">RS Medika Jaya</p>
                                                    </div>
                                                    <time className="text-xs text-muted-foreground">10 Januari 2024</time>
                                                </div>
                                                <p className="mt-2 text-xs sm:text-sm">
                                                    Hasil pemeriksaan menunjukkan kondisi kesehatan yang baik. Tekanan darah, gula darah, dan kolesterol
                                                    dalam batas normal.
                                                </p>
                                                <Button variant="link" className="px-0 h-auto text-xs sm:text-sm text-teal-600 mt-1">
                                                    Lihat Detail
                                                </Button>
                                            </li>

                                            <li className="pl-8 sm:pl-10">
                                                <div className="absolute left-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 -translate-x-1/2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="h-4 w-4"
                                                    >
                                                        <path d="M2 3h20" />
                                                        <path d="M20 3v20H9a4 4 0 0 1-4-4V3" />
                                                        <path d="M13 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                    </svg>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                                    <div>
                                                        <h3 className="font-semibold text-sm sm:text-base">Konsultasi Gizi</h3>
                                                        <p className="text-xs sm:text-sm text-muted-foreground">Klinik Nutrisi Sehat</p>
                                                    </div>
                                                    <time className="text-xs text-muted-foreground">5 Maret 2024</time>
                                                </div>
                                                <p className="mt-2 text-xs sm:text-sm">
                                                    Evaluasi pola makan dan rekomendasi untuk meningkatkan asupan protein dan serat. Disarankan untuk
                                                    mengurangi konsumsi gula.
                                                </p>
                                                <Button variant="link" className="px-0 h-auto text-xs sm:text-sm text-teal-600 mt-1">
                                                    Lihat Detail
                                                </Button>
                                            </li>

                                            <li className="pl-8 sm:pl-10">
                                                <div className="absolute left-0 flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 -translate-x-1/2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="h-4 w-4"
                                                    >
                                                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                                    </svg>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                                    <div>
                                                        <h3 className="font-semibold text-sm sm:text-base">Pemeriksaan Jantung</h3>
                                                        <p className="text-xs sm:text-sm text-muted-foreground">RS Kardiologi Indonesia</p>
                                                    </div>
                                                    <time className="text-xs text-muted-foreground">20 Mei 2024</time>
                                                </div>
                                                <p className="mt-2 text-xs sm:text-sm">
                                                    Hasil EKG normal. Fungsi jantung dalam kondisi baik. Disarankan untuk tetap menjaga pola hidup sehat dan
                                                    rutin berolahraga.
                                                </p>
                                                <Button variant="link" className="px-0 h-auto text-xs sm:text-sm text-teal-600 mt-1">
                                                    Lihat Detail
                                                </Button>
                                            </li>
                                        </ol>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}