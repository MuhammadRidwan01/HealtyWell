"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface UserData {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: UserData | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username?: string;
  dateOfBirth?: string;
}

// Ekspor AuthContext agar bisa diimpor di file lain
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check if user is already logged in when the application loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')
        
        if (storedToken && storedUser) {
          setToken(storedToken)
          setUser(JSON.parse(storedUser))
        }
      } catch (err) {
        console.error("Error checking authentication:", err)
        // Remove corrupted data
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  // Function to clear error
  const clearError = () => setError(null)

  // Login function with better error handling
  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    
    try {
      // Send login request to API
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        // Specific error handling based on status code
        if (res.status === 401) {
          // Unauthorized - Invalid credentials
          if (data.message.includes('Email')) {
            throw new Error('Email not found. Please check your email or register.');
          } else if (data.message.includes('password')) {
            throw new Error('Wrong password. Please try again.');
          } else {
            throw new Error('Invalid credentials. Please check your email and password.');
          }
        } else {
          // Other errors
          throw new Error(data.message || "Login failed. Please try again later.");
        }
      }
      
      // Save token
      localStorage.setItem('token', data.access_token)
      setToken(data.access_token)
      
      // Get user data with token
      const userRes = await fetch('http://localhost:3000/auth/user', {
        headers: {
          'Authorization': `Bearer ${data.access_token}`
        }
      })
      
      if (!userRes.ok) {
        throw new Error("Failed to fetch user data")
      }
      
      const userData = await userRes.json()
      
      // Save user data
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      
    } catch (err) {
      console.error("Login error:", err)
      setError(err instanceof Error ? err.message : "An error occurred during login")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Registration function with better error handling
  const register = async (userData: RegisterData) => {
    setLoading(true)
    setError(null)
    
    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await res.json()

      if (!res.ok) {
        // Specific error handling based on status code
        if (res.status === 409) {
          // Conflict - Email or username already exists
          if (data.message.includes('Email')) {
            throw new Error('Email is already in use. Please use a different email address.');
          } else if (data.message.includes('Username')) {
            throw new Error('Username is already taken. Please choose a different username.');
          } else {
            throw new Error(data.message);
          }
        } else if (res.status === 400) {
          // Bad Request - Validation errors
          throw new Error('Please check your input: ' + data.message);
        } else {
          // Other errors
          throw new Error(
            Array.isArray(data.message) 
              ? data.message[0] 
              : data.message || "Registration failed. Please try again later."
          );
        }
      }
      
      // Registration successful, but no automatic login
      // User needs to login manually after registration
      
    } catch (err) {
      console.error("Registration error:", err)
      setError(err instanceof Error ? err.message : "An error occurred during registration")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    register,
    logout,
    loading,
    error,
    clearError
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook untuk menggunakan konteks autentikasi
export function useAuth() {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  
  return context
}