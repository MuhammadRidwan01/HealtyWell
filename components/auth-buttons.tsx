"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon, LogOut, Settings, User, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
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
      username: form.get('username') || form.get('email-signup')?.toString().split('@')[0], // Use provided username or generate from email
    }

    if (!data.dateOfBirth) {
      setRegisterError("Please select your date of birth")
      toast({
        title: "Date of Birth Required",
        description: "Please select your date of birth",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (data.password !== form.get('confirm-password')) {
      setRegisterError("Passwords do not match")
      toast({
        title: "Password Mismatch",
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
        description: "Your profile has been successfully updated.",
      })
      
      // Close edit mode
      setIsEditMode(false)
    } catch (err) {
      console.error("Profile update error:", err);
      toast({
        title: "Update Error",
        description: "There was a problem updating your profile.",
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
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
  }

  return (
    <>
      {isLoggedIn ? (
        // Show user profile when logged in
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={userData?.username || "User"} />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userDisplayData.fullName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userData?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsProfileDialogOpen(true)}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        // Show login/signup buttons when not logged in
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="hidden md:flex border-teal-200 hover:border-teal-300 hover:bg-teal-50 dark:border-teal-800 dark:hover:border-teal-700 dark:hover:bg-teal-900/50"
            onClick={() => setIsDialogOpen(true)}
          >
            Sign In
          </Button>
          <Button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
            onClick={() => setIsDialogOpen(true)}
          >
            Get Started
          </Button>
        </div>
      )}

      {/* Auth Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button variant="link" className="h-auto p-0 text-xs text-teal-600 hover:text-teal-700">
                      Forgot password?
                    </Button>
                  </div>
                  <Input id="password" name="password" type="password" required />
                </div>
                {loginError && (
                  <div className="text-sm text-red-500">{loginError}</div>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-teal-600 hover:text-teal-700"
                  onClick={() => {
                    const signUpTab = document.querySelector('[value="signup"]') as HTMLElement;
                    if (signUpTab) signUpTab.click();
                  }}
                >
                  Sign up
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" name="first-name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" name="last-name" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username">Username (optional)</Label>
                  <Input id="username" name="username" placeholder="johndoe" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of birth</Label>
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
                        {dob ? format(dob, "PPP") : <span>Pick a date</span>}
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
                  <Input id="email-signup" name="email-signup" type="email" placeholder="your.email@example.com" required />
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
                  <div className="text-sm text-red-500">{registerError}</div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-teal-600 hover:text-teal-700"
                  onClick={() => {
                    const signInTab = document.querySelector('[value="signin"]') as HTMLElement;
                    if (signInTab) signInTab.click();
                  }}
                >
                  Sign in
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Profile Dialog */}
      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder-avatar.jpg" alt={userData?.username || "User"} />
                <AvatarFallback className="text-2xl">{getUserInitials()}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{userDisplayData.fullName}</h3>
                <p className="text-sm text-muted-foreground">@{userDisplayData.username}</p>
              </div>
            </div>
            
            <Separator />
            
            {isEditMode ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-first-name">First name</Label>
                    <Input 
                      id="edit-first-name" 
                      name="edit-first-name" 
                      defaultValue={userData?.firstName || ""} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-last-name">Last name</Label>
                    <Input 
                      id="edit-last-name" 
                      name="edit-last-name" 
                      defaultValue={userData?.lastName || ""} 
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-dob">Date of birth</Label>
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
                        {dob ? format(dob, "PPP") : <span>Pick a date</span>}
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
                  <Label htmlFor="edit-phone">Phone number</Label>
                  <Input 
                    id="edit-phone" 
                    name="edit-phone" 
                    defaultValue={userData?.phoneNumber || ""} 
                    placeholder="e.g. +1 (555) 123-4567"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-address">Address</Label>
                  <Input 
                    id="edit-address" 
                    name="edit-address" 
                    defaultValue={userData?.address || ""} 
                    placeholder="Your address"
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditMode(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>Saving...</span>
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
                      <p className="text-sm">{userData?.email}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Date of Birth</h4>
                      <p className="text-sm">{userDisplayData.dateOfBirth}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
                      <p className="text-sm">{userDisplayData.phoneNumber}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Member Since</h4>
                      <p className="text-sm">{userDisplayData.memberSince}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Address</h4>
                    <p className="text-sm">{userDisplayData.address}</p>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                  <Button 
                    onClick={() => setIsEditMode(true)}
                    className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                  >
                    Edit Profile
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}