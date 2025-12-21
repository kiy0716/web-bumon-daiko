/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  env: {
    NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL: process.env.GOOGLE_CALENDAR_BOOKING_URL,
  },
}

module.exports = nextConfig
