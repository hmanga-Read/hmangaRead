/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
    ],
  },
  experimental: { 
    images: { 
      allowFutureImage: true,
    } 
  }
}

module.exports = nextConfig
