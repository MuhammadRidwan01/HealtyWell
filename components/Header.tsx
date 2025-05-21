"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { SearchBar } from "@/components/search-bar"
import { AuthButtons } from "@/components/auth-buttons"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { usePathname } from 'next/navigation'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/servics", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    ...(isAuthenticated ? [
      { href: "/doctors", label: "Ai Doctor" },
      { href: "/my-appointments", label: "My Appointments" },
    ] : []),
    ...(isAuthenticated ? [{ href: "/dashboard", label: "Dashboard" }] : [])
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
      scrolled && "shadow-sm border-transparent bg-background/98"
    )}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="rounded-full bg-gradient-to-br from-teal-400 to-teal-600 p-1.5 shadow-sm transition-transform duration-200">
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
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-teal-700">HealtyWell</span>
          </Link>
        </div>

        <nav className="hidden md:flex md:gap-8">
          {menuItems.map((item, index) => (
            <Link 
              key={index}
              href={item.href} 
              className={cn(
                "relative text-sm font-medium transition-colors group",
                pathname === item.href 
                  ? "text-teal-600" 
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {item.label}
              <span className={cn(
                "absolute inset-x-0 -bottom-1 h-0.5 bg-teal-500 transition-all duration-300",
                pathname === item.href 
                  ? "scale-x-100" 
                  : "scale-x-0 group-hover:scale-x-100"
              )}></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <SearchBar />
          </div>
          <AuthButtons />
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden relative overflow-hidden group">
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
                  className="h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:text-teal-500"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]">
              <div className="flex flex-col gap-6 mt-8">
                <div className="mb-4">
                  <SearchBar />
                </div>
                <nav className="flex flex-col gap-4">
                  {menuItems.map((item, index) => (
                    <Link 
                      key={index}
                      href={item.href} 
                      className={cn(
                        "text-lg font-medium transition-colors relative group pl-4",
                        pathname === item.href 
                          ? "text-teal-600" 
                          : "text-foreground hover:text-teal-500"
                      )}
                    >
                      <span className={cn(
                        "absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-teal-500 transition-all duration-300",
                        pathname === item.href 
                          ? "opacity-100 scale-100" 
                          : "opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-75"
                      )}></span>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}