/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration for Cloudflare Pages compatibility
  images: {
    unoptimized: true
  },
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: '/category/:id',
        destination: '/category/[id]'
      }
    ]
  }
}

export default nextConfig
