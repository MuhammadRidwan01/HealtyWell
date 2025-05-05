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

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cek apakah pengguna sudah login saat aplikasi dimuat
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
        // Hapus data yang rusak
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  // Fungsi untuk membersihkan error
  const clearError = () => setError(null)

  // Fungsi untuk login dengan penanganan error yang lebih baik
  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    
    try {
      // Kirim permintaan login ke API
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        // Penanganan error spesifik berdasarkan status code
        if (res.status === 401) {
          // Unauthorized - Invalid credentials
          if (data.message.includes('Email')) {
            throw new Error('Email tidak ditemukan. Silakan periksa email Anda atau daftar.');
          } else if (data.message.includes('password')) {
            throw new Error('Password salah. Silakan coba lagi.');
          } else {
            throw new Error('Kredensial tidak valid. Silakan periksa email dan password Anda.');
          }
        } else {
          // Error lainnya
          throw new Error(data.message || "Login gagal. Silakan coba lagi nanti.");
        }
      }
      
      // Simpan token
      localStorage.setItem('token', data.access_token)
      setToken(data.access_token)
      
      // Ambil data pengguna dengan token
      const userRes = await fetch('http://localhost:5000/auth/user', {
        headers: {
          'Authorization': `Bearer ${data.access_token}`
        }
      })
      
      if (!userRes.ok) {
        throw new Error("Gagal mengambil data pengguna")
      }
      
      const userData = await userRes.json()
      
      // Simpan data pengguna
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      
    } catch (err) {
      console.error("Login error:", err)
      setError(err instanceof Error ? err.message : "Terjadi kesalahan saat login")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Fungsi untuk registrasi dengan penanganan error yang lebih baik
  const register = async (userData: RegisterData) => {
    setLoading(true)
    setError(null)
    
    try {
      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await res.json()

      if (!res.ok) {
        // Penanganan error spesifik berdasarkan status code
        if (res.status === 409) {
          // Conflict - Email atau username sudah ada
          if (data.message.includes('Email')) {
            throw new Error('Email sudah digunakan. Silakan gunakan alamat email yang berbeda.');
          } else if (data.message.includes('Username')) {
            throw new Error('Username sudah diambil. Silakan pilih username yang berbeda.');
          } else {
            throw new Error(data.message);
          }
        } else if (res.status === 400) {
          // Bad Request - Validation errors
          throw new Error('Silakan periksa input Anda: ' + data.message);
        } else {
          // Error lainnya
          throw new Error(
            Array.isArray(data.message) 
              ? data.message[0] 
              : data.message || "Registrasi gagal. Silakan coba lagi nanti."
          );
        }
      }
      
      // Registrasi berhasil, tapi tidak otomatis login
      // Pengguna perlu login secara manual setelah registrasi
      
    } catch (err) {
      console.error("Registration error:", err)
      setError(err instanceof Error ? err.message : "Terjadi kesalahan saat registrasi")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Fungsi untuk logout
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
    throw new Error("useAuth harus digunakan di dalam AuthProvider")
  }
  
  return context
}