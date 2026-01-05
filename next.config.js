/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  env: {
    NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL: process.env.GOOGLE_CALENDAR_BOOKING_URL,
  },
}

module.exports = nextConfig
