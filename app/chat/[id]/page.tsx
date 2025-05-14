"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Image from "next/image";

export default function ChatPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const [consultation, setConsultation] = useState<any>(null);
  const [messages, setMessages] = useState<Array<{ role: string; message: string }>>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [consultations, setConsultations] = useState<Array<any>>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      toast({ title: "Token tidak ditemukan", variant: "destructive" });
      router.push("/");
      return;
    }

    fetchConsultation();
    fetchConsultations();
  }, [id]);
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

        const text: string = await res.text()
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
  const fetchConsultation = async () => {
    try {
      const res = await fetch(`https://backend.hostspot.online/consultations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 403) {
        // Handle unauthorized access to consultation
        router.push("/404");
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch consultation");
      }

      const data = await res.json();
      setConsultation(data);
      setMessages(data.aiResponses || []);
    } catch (error) {
      console.error("Error fetching consultation:", error);
      toast({ title: "Gagal mengambil data konsultasi", variant: "destructive" });
      router.push("/my-appointments");
    }
  };


  const sendMessage = async () => {
    if (!input.trim() || isSending) return;

    setIsSending(true);

    // Immediately show user message
    const userMessage = { role: "user", message: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Show typing indicator
    setIsTyping(true);

    try {
      const res = await fetch(`https://backend.hostspot.online/consultations/${id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      const aiResponse = await res.json();
      setIsTyping(false);
      setMessages(prev => [...prev, aiResponse]);

      // Check if diagnosis is provided (ending the consultation)
      if (aiResponse.message.includes("#DIAGNOSIS") && aiResponse.message.includes("#END")) {
        handleConsultationEnd(aiResponse.message);
      }
    } catch (error) {
      setIsTyping(false);
      toast({
        title: "Failed to send message",
        description: "Please try again later",        
        variant: "destructive"
      });
    }

    setIsSending(false);
  };

  const handleConsultationEnd = async (diagnosisMessage: string) => {
    try {
      // Ekstrak teks antara #DIAGNOSIS dan #END
      const diagnosisOnly = extractDiagnosis(diagnosisMessage);

      // Mark consultation as completed
      await fetch(`https://backend.hostspot.online/consultations/${id}/end`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      // Save diagnosis notes only
      await fetch(`https://backend.hostspot.online/consultations/${id}/notes`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes: diagnosisOnly }),
      });

      toast({ title: "Konsultasi telah diselesaikan." });

      // Refresh consultation data to show diagnosis
      fetchConsultation();
    } catch (error) {
      console.error("Error ending consultation:", error);
      toast({
        title: "Gagal menyelesaikan konsultasi",
        description: "Silakan coba lagi nanti",
        variant: "destructive",
      });
    }
  };

  // Fungsi bantu untuk mengekstrak diagnosis
  const extractDiagnosis = (text: string) => {
    const start = text.indexOf("#DIAGNOSIS");
    const end = text.indexOf("#END");
    if (start !== -1 && end !== -1 && end > start) {
      return text.slice(start + "#DIAGNOSIS".length, end).trim();
    }
    return "Diagnosis tidak ditemukan.";
  };


  const formatMessage = (message: string) => {
    if (message.includes("#DIAGNOSIS") && message.includes("#END")) {
      return message
        .replace("#DIAGNOSIS", "<strong class='text-teal-700 block mb-2 text-lg'>Diagnosis:</strong>")
        .replace("#END", "")
        .trim();
    }
    return message;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const isCompleted = consultation?.status === "completed";
  return (
    <>
      <Header />
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="block absolute">
          <Button
            variant="ghost"
            size="icon"
            className="text-teal-600 dark:text-teal-400"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-12 w-12" />
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: isSidebarOpen ? 1 : 0,
            x: isSidebarOpen ? 0 : -20,
            display: isSidebarOpen ? 'block' : 'none'
          }}
          className="absolute top-0 left-0 z-50 w-64 h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 border-r border-gray-200 dark:border-gray-700 overflow-y-auto md:relative md:block"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-teal-600 dark:text-teal-400">Other Consultations</h3>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-teal-600 dark:text-teal-400"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-20">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-500"></div>
            </div>
          ) : (
            <div className="space-y-2">
              {consultations.map((consultation) => (
                <Link
                  key={consultation.id}
                  href={`/chat/${consultation.id}`}
                  className={`block p-3 rounded-lg transition-all duration-200 ${consultation.id === id
                      ? "bg-teal-500 text-white"
                      : "hover:bg-teal-50 dark:hover:bg-teal-900/30"
                    }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <div className="font-medium">{consultation.doctor.name}</div>
                  <div className="text-sm opacity-75">{consultation.status}</div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
        {/* Main Chat Area */}
        <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 p-3 md:p-4 space-y-4 flex flex-col min-h-[calc(100vh-100px)]"
    >
      {/* Gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-teal-500/10 dark:from-teal-500/20 to-transparent blur-3xl -z-10" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
      >
        <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-teal-600 to-teal-400 dark:from-teal-400 dark:to-teal-300 text-transparent bg-clip-text">
          Konsultasi dengan {consultation?.doctor?.name || "Dokter"}
        </h2>
        {consultation?.doctor?.specialization && (
          <span className="text-sm bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 px-3 py-1 rounded-full whitespace-nowrap">
            {consultation.doctor.specialization}
          </span>
        )}
      </motion.div>

      {/* Message container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-lg flex-1 overflow-hidden flex flex-col"
      >
        <div 
          // ref={messagesContainerRef}
          className="flex-1 overflow-y-auto pb-2 space-y-3 scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-transparent"
        >
          <AnimatePresence>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400 py-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-lg font-medium mb-2">No messages yet</p>
                <p>Start your consultation by sending your first message</p>
              </motion.div>
            ) : (
              messages.map((msg, idx) => (
                <motion.div 
                  key={idx} 
                  className={`flex items-start gap-3 mb-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {msg.role !== "user" && (
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden flex-shrink-0 shadow-md">
                      <Image
                        src={consultation?.doctor?.photoUrl || "/doctor-avatar.png"}
                        alt={`${consultation?.doctor?.name || "Doctor"}'s photo`}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <motion.div
                    className={`p-3 md:p-4 rounded-xl shadow-md ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-500 text-white max-w-[80%]"
                        : "bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 max-w-[80%]"
                    }`}
                  >
                    <div
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(msg.message).replace(
                          /\*\*(.*?)\*\*/g,
                          '<strong class="font-semibold">$1</strong>'
                        )
                      }}
                    />
                  </motion.div>

                  {msg.role === "user" && (
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-teal-100 dark:bg-teal-800 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 dark:text-teal-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))
            )}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 mb-4"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden flex-shrink-0 shadow-md">
                  <Image
                    src={consultation?.doctor?.photoUrl || "/doctor-avatar.png"}
                    alt="Doctor typing"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="bg-white/90 dark:bg-gray-800/90 p-3 md:p-4 rounded-xl shadow-md flex items-center space-x-2">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-teal-500 dark:bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-teal-500 dark:bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-teal-500 dark:bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isCompleted && consultation?.notes && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg shadow-md border border-yellow-200 dark:border-yellow-700"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: formatMessage(consultation.notes)
                }}
              />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Footer - Navigation or Input */}
      {isCompleted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mt-4"
        >
          <Link href="/my-appointments" passHref>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-500 dark:to-teal-400 text-white px-4 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 text-center"
            >
              View Consultation History
            </motion.a>
          </Link>
          <Link href="/dashboard" passHref>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-400 border-2 border-teal-500 px-4 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 text-center"
            >
              Back to Dashboard
            </motion.a>
          </Link>
        </motion.div>
      ) : (
        <>
          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative flex items-start gap-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-l-4 border-yellow-400 dark:border-yellow-500 p-3 rounded-lg shadow-inner text-sm text-yellow-800 dark:text-yellow-100 mb-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0 mt-0.5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 18.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" />
            </svg>
            <div>
              <p className="font-medium mb-0.5">Disclaimer!!</p>
              <p className="text-xs md:text-sm">
                This AI response is informative and does not replace direct evaluation from medical professionals. If symptoms persist, immediately visit a healthcare facility.
              </p>
            </div>
          </motion.div>

          {/* Input area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center gap-2 mt-1"
          >
            <textarea
              className="w-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 outline-none resize-none dark:text-gray-200 min-h-[60px]"
              placeholder="Tell us about your complaints..."                
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isSending}
              rows={2}
              autoFocus
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={sendMessage}
              className={`w-full sm:w-auto bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-500 dark:to-teal-400 text-white px-5 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center min-w-[100px] ${
                !input.trim() || isSending ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isSending || !input.trim()}
            >
              {isSending ? (
                <span className="inline-block animate-pulse">Sending...</span>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                  Send
                </>
              )}
            </motion.button>
          </motion.div>
        </>
      )}
    </motion.div>
      </div>
      <Footer />
    </>);

}