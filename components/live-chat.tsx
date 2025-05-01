"use client"

import type React from "react"

import { useState } from "react"
import { MessageSquare, Send, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! How can I help you today?",
      sender: "agent",
      timestamp: new Date(Date.now() - 60000).toISOString(),
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      content: newMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, userMessage])
    setNewMessage("")

    // Simulate agent response after a short delay
    setTimeout(() => {
      const agentMessage = {
        id: messages.length + 2,
        content:
          "Thank you for your message. One of our health advisors will respond shortly. Is there anything specific you'd like to know about our services?",
        sender: "agent",
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, agentMessage])
    }, 1000)
  }

  return (
    <>
      {/* Chat Button */}
      <Button
        className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full bg-teal-500 p-0 shadow-lg hover:bg-teal-600"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-6 w-6 text-white" />
        <span className="sr-only">Open chat</span>
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 flex w-80 flex-col rounded-lg border bg-background shadow-xl md:w-96">
          <div className="flex items-center justify-between border-b bg-teal-500 p-4 text-white">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Support Agent" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-sm font-medium">Health Support</h3>
                <p className="text-xs opacity-80">Online | Typically replies in minutes</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-white hover:bg-teal-600"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close chat</span>
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-teal-500 text-white" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="mt-1 text-right text-xs opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <form onSubmit={handleSendMessage} className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" className="bg-teal-500 hover:bg-teal-600">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
