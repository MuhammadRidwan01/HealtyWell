"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { MessageSquare, Send, X, Sparkles, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Helper function to generate unique IDs
const generateUniqueId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Chat session type
type ChatSession = {
  id: string;
  title: string;
  messages: {
    id: string;
    content: string;
    sender: "user" | "agent";
    timestamp: string;
  }[];
};

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSessionId, setActiveSessionId] = useState<string>("")
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const { token } = useAuth()

  // Load chat sessions from localStorage on component mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('chatSessions')
    
    if (savedSessions) {
      try {
        const parsedSessions = JSON.parse(savedSessions)
        setChatSessions(parsedSessions)
        
        // Set active session to the last one or create a new one if none exists
        if (parsedSessions.length > 0) {
          setActiveSessionId(parsedSessions[parsedSessions.length - 1].id)
        } else {
          createNewSession()
        }
      } catch (error) {
        console.error("Error parsing saved chat sessions:", error)
        createNewSession()
      }
    } else {
      createNewSession()
    }
  }, [])

  // Save chat sessions to localStorage whenever they change
  useEffect(() => {
    if (chatSessions.length > 0) {
      localStorage.setItem('chatSessions', JSON.stringify(chatSessions))
    }
  }, [chatSessions])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        setTimeout(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }, 100); // Small delay to ensure content is rendered
      }
    }
  }, [chatSessions, activeSessionId, isLoading]);

  // Create a new chat session
  const createNewSession = () => {
    const newSessionId = generateUniqueId()
    const newSession: ChatSession = {
      id: newSessionId,
      title: "Percakapan Baru",
      messages: [
        {
          id: generateUniqueId(),
          content: "Halo! Saya asisten kesehatan AI Anda. Bagaimana saya bisa membantu Anda hari ini?",
          sender: "agent",
          timestamp: new Date().toISOString(),
        }
      ]
    }
    
    setChatSessions(prev => [...prev, newSession])
    setActiveSessionId(newSessionId)
  }

  // Delete a chat session
  const deleteSession = (sessionId: string) => {
    setChatSessions(prev => prev.filter(session => session.id !== sessionId))
    
    // If the active session is deleted, set active to the last remaining session or create a new one
    if (sessionId === activeSessionId) {
      const remainingSessions = chatSessions.filter(session => session.id !== sessionId)
      if (remainingSessions.length > 0) {
        setActiveSessionId(remainingSessions[remainingSessions.length - 1].id)
      } else {
        createNewSession()
      }
    }
    
    setDeleteDialogOpen(false)
    setSessionToDelete(null)
  }

  // Get the active chat session
  const getActiveSession = () => {
    return chatSessions.find(session => session.id === activeSessionId) || null
  }

  // Update session title based on AI response
  const updateSessionTitle = (sessionId: string, newTitle: string) => {
    setChatSessions(prev => 
      prev.map(session => 
        session.id === sessionId 
          ? { ...session, title: newTitle } 
          : session
      )
    )
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isLoading || !activeSessionId) return

    const activeSession = getActiveSession()
    if (!activeSession) return

    // Add user message
    const userMessage = {
      id: generateUniqueId(),
      content: newMessage,
      sender: "user" as const,
      timestamp: new Date().toISOString(),
    }

    // Update chat session with user message
    setChatSessions(prev => 
      prev.map(session => 
        session.id === activeSessionId 
          ? { ...session, messages: [...session.messages, userMessage] } 
          : session
      )
    )
    
    setNewMessage("")
    setIsLoading(true)

    try {
      // Format conversation history for the API
      const history = activeSession.messages.map(msg => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content
      }));

      // Make API call to backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/health-support/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            message: userMessage.content,
            history: history
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response from health support");
      }

      const data = await response.json();
      
      if (data && data.message) {
        const aiResponse = {
          id: generateUniqueId(),
          content: data.message,
          sender: "agent" as const,
          timestamp: new Date().toISOString(),
        };
        
        // Update chat session with AI response
        setChatSessions(prev => 
          prev.map(session => 
            session.id === activeSessionId 
              ? { ...session, messages: [...session.messages, aiResponse] } 
              : session
          )
        )
        
        // Update topic from AI response if provided
        if (data.topic) {
          updateSessionTitle(activeSessionId, data.topic);
        } else if (activeSession.messages.length <= 2) {
          // If this is the first exchange and no topic was provided, generate one from the content
          const userFirstMessage = userMessage.content.substring(0, 50);
          updateSessionTitle(activeSessionId, `Tentang ${userFirstMessage}...`);
        }
      } else {
        throw new Error("Failed to get response from health support");
      }
      
    } catch (error) {
      console.error("Error sending message to health support:", error);
      
      // Add error message
      const errorMessage = {
        id: generateUniqueId(),
        content: "Maaf, saya mengalami kesulitan terhubung saat ini. Silakan coba lagi nanti.",
        sender: "agent" as const,
        timestamp: new Date().toISOString(),
      };
      
      // Update chat session with error message
      setChatSessions(prev => 
        prev.map(session => 
          session.id === activeSessionId 
            ? { ...session, messages: [...session.messages, errorMessage] } 
            : session
        )
      )
      
      toast({
        title: "Kesalahan Koneksi",
        description: "Gagal terhubung ke layanan dukungan kesehatan.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const activeSession = getActiveSession();

  return (
    <>
      {/* Chat Button - Floating without pulse effect */}
      <Button
        className="fixed bottom-4 right-4 z-50 h-14 w-14 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 p-0 shadow-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
        <span className="sr-only">Open chat</span>
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 z-50 flex h-[600px] w-full flex-col bg-background shadow-2xl transition-all duration-300 
                      sm:bottom-[20px] sm:right-[20px] sm:h-[550px] sm:w-[350px] sm:max-h-[calc(100vh-40px)] sm:rounded-2xl md:w-[400px] overflow-hidden">
          {/* Header - Fixed at the top */}
          <div className="flex items-center justify-between bg-gradient-to-r from-teal-500 to-teal-600 p-3 sm:p-4 text-white shadow-md">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-white shadow-md">
                  <AvatarImage src="/ai-assistant.png" alt="AI Health Assistant" />
                  <AvatarFallback className="bg-gradient-to-br from-teal-700 to-teal-900 text-white font-medium">AI</AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-1 -right-1 flex h-3 w-3 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-green-500 ring-2 ring-white"></span>
              </div>
              <div>
                <div className="flex items-center gap-1 sm:gap-2">
                <h3 className="text-sm sm:text-base font-bold tracking-wide">AI Health Assistant</h3>
                  <span className="flex items-center rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-medium text-green-800 dark:bg-green-800/30 dark:text-green-500">
                    <Sparkles className="mr-0.5 h-3 w-3" />
                    Online
                  </span>
                </div>
                <p className="text-xs text-teal-50/80">Siap membantu pertanyaan kesehatan Anda</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-teal-600/50"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Main Content - Tabs for Chat and History */}
          <Tabs defaultValue="chat" className="flex flex-1 flex-col overflow-hidden">
            <TabsList className="grid w-full grid-cols-2 bg-muted/30 p-1">
              <TabsTrigger value="chat" className="data-[state=active]:bg-background">
                Chat
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-background">
                Riwayat
              </TabsTrigger>
            </TabsList>

            {/* Chat Tab Content */}
            <TabsContent value="chat" className="flex flex-1 flex-col overflow-hidden data-[state=active]:flex-1">
              {/* This div ensures proper layout with fixed height for messages and input */}
              <div className="flex flex-1 flex-col overflow-hidden">
                {/* Messages Area - Scrollable */}
                <ScrollArea 
                  ref={scrollAreaRef}
                  className="flex-1 px-4 py-4"
                >
                  <div className="space-y-4">
                    {activeSession?.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                            message.sender === "user"
                              ? "bg-teal-500 text-white"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`mt-1 text-right text-[10px] ${
                              message.sender === "user"
                                ? "text-teal-50/70"
                                : "text-muted-foreground"
                            }`}
                          >
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-[85%] rounded-2xl bg-muted px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="h-2 w-2 animate-bounce rounded-full bg-teal-500"></div>
                            <div
                              className="h-2 w-2 animate-bounce rounded-full bg-teal-500"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                              className="h-2 w-2 animate-bounce rounded-full bg-teal-500"
                              style={{ animationDelay: "0.4s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input Area - Fixed at bottom */}
                <div className="border-t bg-background p-4">
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Ketik pesan Anda..."
                      className="flex-1 bg-muted/30"
                      disabled={isLoading}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!newMessage.trim() || isLoading}
                      className="bg-teal-500 text-white hover:bg-teal-600"
                    >
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Kirim</span>
                    </Button>
                  </form>
                </div>
              </div>
            </TabsContent>

            {/* History Tab Content */}
            <TabsContent value="history" className="data-[state=active]:flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Percakapan Sebelumnya</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 text-xs"
                    onClick={createNewSession}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Baru
                  </Button>
                </div>
                
                {chatSessions.length === 0 ? (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-muted-foreground">Belum ada percakapan</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {chatSessions.map((session) => (
                      <div
                        key={session.id}
                        className={`flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50 ${
                          session.id === activeSessionId ? "bg-muted" : ""
                        }`}
                      >
                        <button
                          className="flex-1 text-left"
                          onClick={() => setActiveSessionId(session.id)}
                        >
                          <h4 className="font-medium truncate">{session.title}</h4>
                          <p className="text-xs text-muted-foreground truncate">
                            {session.messages.length} pesan
                          </p>
                        </button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => {
                            setSessionToDelete(session.id)
                            setDeleteDialogOpen(true)
                          }}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Hapus</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Percakapan</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus percakapan ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => sessionToDelete && deleteSession(sessionToDelete)}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}