import type { NextConfig } from "next"
import withPWA from 'next-pwa'

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
}

withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

export default {
  ...withPWA,
  ...nextConfig
}
