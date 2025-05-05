import { useAuth as useAuthContext } from "@/contexts/auth-context"

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
  return useAuthContext();
}