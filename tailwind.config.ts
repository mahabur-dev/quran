import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        amiri: ['"Amiri"', 'serif'],
        'droid-arabic': ['"Droid Arabic Naskh"', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
