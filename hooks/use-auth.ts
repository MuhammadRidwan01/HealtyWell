import { useState, useEffect, useCallback } from 'react'
import { useAuth as useAuthContext } from "@/contexts/auth-context"

type User = {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  address?: string;
  createdAt?: string;
}

/**
 * Hook untuk menggunakan konteks autentikasi.
 *
 * Mengembalikan objek dengan properti berikut:
 *
 * - `user`: objek pengguna yang sedang login, atau `null` jika belum ada yang login.
 * - `token`: token autentikasi yang sedang digunakan, atau `null` jika belum ada yang login.
 * - `isAuthenticated`: boolean yang menunjukkan apakah pengguna sudah login atau belum.
 * - `login`: fungsi untuk melakukan login.
 * - `register`: fungsi untuk melakukan registrasi.
 * - `logout`: fungsi untuk melakukan logout.
 * - `loading`: boolean yang menunjukkan apakah sedang ada proses loading.
 * - `error`: pesan error jika ada, atau `null` jika tidak ada error.
 * - `clearError`: fungsi untuk menghapus pesan error.
 */
export function useAuth() {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Function to load auth state from localStorage
  const loadAuthState = useCallback(() => {
    setIsLoading(true)
    try {
      const storedToken = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')
      
      if (storedToken && storedUser) {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
        setIsAuthenticated(true)
      } else {
        setToken(null)
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error("Error loading auth state:", error)
      // Clear invalid data
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setToken(null)
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Load auth state on component mount
  useEffect(() => {
    loadAuthState()
    
    // Set up event listener for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === 'user') {
        loadAuthState()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // Custom event for auth changes within the same window
    const handleAuthChange = () => {
      loadAuthState()
    }
    
    window.addEventListener('authStateChanged', handleAuthChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('authStateChanged', handleAuthChange)
    }
  }, [loadAuthState])

  // Login function
  const login = useCallback((newToken: string, userData: User) => {
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(userData))
    setToken(newToken)
    setUser(userData)
    setIsAuthenticated(true)
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('authStateChanged'))
  }, [])

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('authStateChanged'))
  }, [])

  return {
    token,
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshAuth: loadAuthState
  }
}