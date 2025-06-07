/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Konfigurasi khusus untuk Cloudflare Pages
  experimental: {
    serverComponentsExternalPackages: [],
  },
}

export default nextConfig