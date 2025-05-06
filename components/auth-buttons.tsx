"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon, LogOut, Settings, User, Loader2, LayoutDashboard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Add this function at the top of the file, outside the AuthButtons component
function dispatchAuthStateChangedEvent() {
  // Create and dispatch a custom event when auth state changes
  const event = new Event('authStateChanged');
  window.dispatchEvent(event);
}

type UserData = {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  dateOfBirth?: string
  phoneNumber?: string
  address?: string
  createdAt: string
}

export function AuthButtons() {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [registerError, setRegisterError] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [dob, setDob] = useState<Date | undefined>(undefined)

  // Check if user is already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUserData(parsedUser)
        setIsLoggedIn(true)
        
        // Set date of birth if available
        if (parsedUser.dateOfBirth) {
          setDob(new Date(parsedUser.dateOfBirth))
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error)
        // Clear invalid data
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    }
  }, [])

  // Prepare user display data
  const userDisplayData = {
    fullName: userData ? `${userData.firstName || ''} ${userData.lastName || ''}`.trim() : "User",
    username: userData?.username || "user",
    dateOfBirth: userData?.dateOfBirth ? format(new Date(userData.dateOfBirth), "PPP") : "Not set",
    phoneNumber: userData?.phoneNumber || "Not set",
    address: userData?.address || "Not set",
    memberSince: userData?.createdAt ? format(new Date(userData.createdAt), "MMMM yyyy") : "Recently"
  }

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!userData) return "U";
    return `${userData.firstName?.[0] || ""}${userData.lastName?.[0] || ""}`;
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setLoginError("")

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

      const result = await res.json()

      if (!res.ok) {
        setLoginError(result.message || "Invalid credentials")
        toast({
          title: "Login Failed",
          description: result.message || "Invalid credentials",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }
      
      // Store token in localStorage
      localStorage.setItem('token', result.access_token)
      
      // Fetch user data with the token
      const userRes = await fetch('http://localhost:5000/auth/user', {
        headers: {
          'Authorization': `Bearer ${result.access_token}`
        }
      })
      
      if (userRes.ok) {
        const userData = await userRes.json()
        // Store user data
        localStorage.setItem('user', JSON.stringify(userData))
        // Update state
        setIsLoggedIn(true)
        setUserData(userData)
        
        // Dispatch auth state changed event
        dispatchAuthStateChangedEvent();
        
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        })
        
        // Close the dialog after successful login
        setIsDialogOpen(false)
      } else {
        toast({
          title: "Error Fetching User Data",
          description: "Logged in but couldn't fetch user details",
          variant: "destructive",
        })
      }
    } catch (err) {
      setLoginError("Connection error. Please try again later.")
      toast({
        title: "Login Error",
        description: "Connection error. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setRegisterError("")

    const form = new FormData(e.currentTarget)
    const data = {
      firstName: form.get('first-name'),
      lastName: form.get('last-name'),
      dateOfBirth: dob ? format(dob, "yyyy-MM-dd") : null,
      email: form.get('email-signup'),
      password: form.get('password-signup'),
      username: form.get('username') || form.get('email-signup')?.toString().split('@')[0], // Use email username as fallback
    }

    // Check if passwords match
    if (data.password !== form.get('confirm-password')) {
      setRegisterError("Passwords do not match")
      toast({
        title: "Registration Failed",
        description: "Passwords do not match",
        variant: "destructive",
      })
      setIsLoading(false)
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
            (Array.isArray(responseData.message) ? 
              responseData.message.some((msg: string) => 
                msg.toLowerCase().includes('already exists') || 
                msg.toLowerCase().includes('duplicate')
              ) : 
              responseData.message.toLowerCase().includes('already exists') || 
              responseData.message.toLowerCase().includes('duplicate')
            )) {
        
          setRegisterError("This email is already registered. Please sign in instead.")
          toast({
            title: "Email Already Registered",
            description: "This email is already registered. Please sign in instead.",
            variant: "destructive",
          })
          
          // Switch to sign-in tab and pre-fill the email
          const signInTab = document.querySelector('[value="signin"]') as HTMLElement;
          if (signInTab) {
            signInTab.click();
            
            // Wait for tab switch to complete before trying to fill the email field
            setTimeout(() => {
              const emailInput = document.getElementById('email') as HTMLInputElement;
              if (emailInput) {
                emailInput.value = data.email as string;
              }
            }, 100);
          }
        } else {
          setRegisterError(Array.isArray(responseData.message) ? 
            responseData.message[0] : 
            responseData.message || "An error occurred during registration")
          toast({
            title: "Registration Failed",
            description: Array.isArray(responseData.message) ? 
              responseData.message[0] : 
              responseData.message || "An error occurred during registration",
            variant: "destructive",
          })
        }
        setIsLoading(false)
        return
      }

      toast({
        title: "Registration Successful",
        description: "Your account has been created! Please sign in.",
      })
      
      // Switch to the sign-in tab after successful registration
      const signInTab = document.querySelector('[value="signin"]') as HTMLElement;
      if (signInTab) {
        signInTab.click();
        
        // Pre-fill the email field
        setTimeout(() => {
          const emailInput = document.getElementById('email') as HTMLInputElement;
          if (emailInput) {
            emailInput.value = data.email as string;
          }
        }, 100);
      }
    } catch (err) {
      console.error("Registration error:", err);
      setRegisterError("There was a problem connecting to the server. Please try again later.")
      toast({
        title: "Registration Error",
        description: "There was a problem connecting to the server. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleUpdateProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const form = new FormData(e.currentTarget)
    const data = {
      firstName: form.get('edit-first-name'),
      lastName: form.get('edit-last-name'),
      dateOfBirth: dob ? format(dob, "yyyy-MM-dd") : userData?.dateOfBirth,
      phoneNumber: form.get('edit-phone'),
      address: form.get('edit-address'),
    }

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error("Not authenticated")
      }

      const res = await fetch('http://localhost:5000/auth/update-profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const errorData = await res.json()
        toast({
          title: "Update Failed",
          description: errorData.message || "Failed to update profile",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const updatedUser = await res.json()
      // Update local storage and state
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUserData(updatedUser)
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      })
      
      // Exit edit mode
      setIsEditMode(false)
      
      // Dispatch auth state changed event since user data was updated
      dispatchAuthStateChangedEvent();
    } catch (err) {
      console.error("Profile update error:", err);
      toast({
        title: "Update Error",
        description: "There was a problem updating your profile. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  function handleLogout() {
    // Clear local storage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // Reset state
    setIsLoggedIn(false)
    setUserData(null)
    setDob(undefined)
    
    // Dispatch auth state changed event
    dispatchAuthStateChangedEvent();
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    
    // Close profile dialog if open
    setIsProfileDialogOpen(false)
  }

  return (
    <div className="flex items-center gap-2">
      {isLoggedIn ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={userDisplayData.fullName} />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userDisplayData.fullName}</p>
                  <p className="text-xs leading-none text-muted-foreground">@{userDisplayData.username}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsProfileDialogOpen(true)}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Dialog */}
          <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <div className="flex flex-col items-center gap-4 py-2">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={userDisplayData.fullName} />
                  <AvatarFallback className="text-xl">{getUserInitials()}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{userDisplayData.fullName}</h3>
                  <p className="text-sm text-muted-foreground">@{userDisplayData.username}</p>
                  <p className="text-xs text-muted-foreground">Member since {userDisplayData.memberSince}</p>
                </div>
              </div>
              
              <Separator />
              
              {isEditMode ? (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-first-name">First Name</Label>
                      <Input 
                        id="edit-first-name" 
                        name="edit-first-name" 
                        defaultValue={userData?.firstName} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-last-name">Last Name</Label>
                      <Input 
                        id="edit-last-name" 
                        name="edit-last-name" 
                        defaultValue={userData?.lastName} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-dob">Date of Birth</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dob && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dob ? format(dob, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dob}
                          onSelect={setDob}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Phone Number</Label>
                    <Input 
                      id="edit-phone" 
                      name="edit-phone" 
                      defaultValue={userData?.phoneNumber || ''} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-address">Address</Label>
                    <Input 
                      id="edit-address" 
                      name="edit-address" 
                      defaultValue={userData?.address || ''} 
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setIsEditMode(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Save Changes
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{userData?.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Date of Birth</p>
                        <p className="text-sm text-muted-foreground">{userDisplayData.dateOfBirth}</p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">{userDisplayData.phoneNumber}</p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">{userDisplayData.address}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                    <Button onClick={() => setIsEditMode(true)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <Button onClick={() => setIsDialogOpen(true)}>Sign In</Button>
      )}

      {/* Auth Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="mt-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button variant="link" className="h-auto p-0 text-xs">
                      Forgot password?
                    </Button>
                  </div>
                  <Input id="password" name="password" type="password" required />
                </div>
                {loginError && (
                  <p className="text-sm text-destructive">{loginError}</p>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup" className="mt-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" name="first-name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" name="last-name" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username (optional)</Label>
                  <Input id="username" name="username" />
                </div>
                <div className="space-y-2">
                  <Label>Date of Birth (optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dob && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dob ? format(dob, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dob}
                        onSelect={setDob}
                        initialFocus
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input id="email-signup" name="email-signup" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input id="password-signup" name="password-signup" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" name="confirm-password" type="password" required />
                </div>
                {registerError && (
                  <p className="text-sm text-destructive">{registerError}</p>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}