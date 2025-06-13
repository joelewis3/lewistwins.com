/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration for Cloudflare Pages compatibility
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'dist',
  images: {
    unoptimized: true
  },
  experimental: {
    runtime: 'nodejs'
  }
}

export default nextConfig
