"use client"

import { useState } from "react"
import { User, Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

export function AuthButtons() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dob, setDob] = useState<Date>()
  const { toast } = useToast()

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = new FormData(e.currentTarget)
    const data = {
      email: form.get('email'),
      password: form.get('password'),
    }

    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const error = await res.json()
        toast({
          title: "Login Failed",
          description: error.message || res.statusText,
          variant: "destructive",
        })
        return
      }

      const result = await res.json()
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      })
      console.log(result)
      
      // Store user data in localStorage or context
      localStorage.setItem('user', JSON.stringify(result.user))
      localStorage.setItem('token', result.token)
      
      // Close the dialog after successful login
      setIsDialogOpen(false)
    } catch (err) {
      toast({
        title: "Login Error",
        description: String(err),
        variant: "destructive",
      })
    }
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = new FormData(e.currentTarget)
    const data = {
      firstName: form.get('first-name'),
      lastName: form.get('last-name'),
      dateOfBirth: dob ? format(dob, "yyyy-MM-dd") : null, // Format date properly
      email: form.get('email-signup'),
      password: form.get('password-signup'),
      confirmPassword: form.get('confirm-password'),
      username: (form.get('email-signup') as string).split('@')[0], // bisa generate dari email
    }

    if (!data.dateOfBirth) {
      toast({
        title: "Date of Birth Required",
        description: "Please select your date of birth",
        variant: "destructive",
      })
      return
    }

    if (data.password !== data.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    try {
      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await res.json()

      if (!res.ok) {
        // Check for various error conditions
        if (responseData.message && 
            (responseData.message.includes('email already exists') || 
             responseData.message.includes('duplicate key') || 
             responseData.message.includes('already registered'))) {
          // Handle existing email case
          toast({
            title: "Email Already Registered",
            description: "This email is already registered. Please sign in instead.",
            variant: "destructive",
          })
          // Auto-switch to sign-in tab and pre-fill the email
          document.querySelector('[value="signin"]')?.click()
          const emailInput = document.getElementById('email') as HTMLInputElement;
          if (emailInput) {
            emailInput.value = data.email as string;
          }
        } else {
          toast({
            title: "Registration Failed",
            description: responseData.message || "An error occurred during registration",
            variant: "destructive",
          })
        }
        return
      }

      toast({
        title: "Registration Successful",
        description: "Your account has been created! Please sign in.",
      })
      console.log(responseData)
      
      // Switch to the sign-in tab after successful registration
      document.querySelector('[value="signin"]')?.click()
    } catch (err) {
      console.error("Registration error:", err);
      toast({
        title: "Registration Error",
        description: "There was a problem connecting to the server. Please try again later.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <div className="hidden items-center gap-2 md:flex">
        <Button variant="ghost" onClick={() => setIsDialogOpen(true)}>
          Sign In
        </Button>
        <Button onClick={() => setIsDialogOpen(true)}>Sign Up</Button>
      </div>
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsDialogOpen(true)}>
        <User className="h-5 w-5" />
        <span className="sr-only">User account</span>
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="mt-6">
              <form onSubmit={handleLogin}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="name@example.com" required />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Button variant="link" className="h-auto p-0 text-xs">
                        Forgot password?
                      </Button>
                    </div>
                    <Input id="password" name="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full bg-teal-500 text-white hover:bg-teal-600">
                    Sign In
                  </Button>
                </div>
              </form>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button variant="outline" className="w-full">
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
                      className="mr-2 h-4 w-4"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    Facebook
                  </Button>
                  <Button variant="outline" className="w-full">
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
                      className="mr-2 h-4 w-4"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                    Google
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="signup" className="mt-6">
              <form
                onSubmit={handleRegister}
              >
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" name="first-name" type="text" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" name="last-name" type="text" required />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date-of-birth">Date of Birth</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date-of-birth"
                          name="date-of-birth"
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !dob && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dob ? format(dob, "PPP") : "Select date of birth"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dob}
                          onSelect={setDob}
                          initialFocus
                          disabled={(date) => date > new Date()}
                          fromYear={1920}
                          toYear={new Date().getFullYear()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input id="email-signup" name="email-signup" type="email" placeholder="name@example.com" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input id="password-signup" name="password-signup" type="password" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" name="confirm-password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full bg-teal-500 text-white hover:bg-teal-600">
                    Create Account
                  </Button>
                </div>
              </form>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button variant="outline" className="w-full">
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
                      className="mr-2 h-4 w-4"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    Facebook
                  </Button>
                  <Button variant="outline" className="w-full">
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
                      className="mr-2 h-4 w-4"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                    Google
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}