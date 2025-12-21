import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          light: '#60a5fa',
          dark: '#1e40af',
        },
        secondary: {
          DEFAULT: '#64748b',
          light: '#94a3b8',
          dark: '#475569',
        },
      },
    },
  },
  plugins: [],
}
export default config
