/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa'

const nextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
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
