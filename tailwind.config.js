/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sov: {
          dark: '#070b12',
          surface: '#0d131f',
          card: '#121a29',
          'card-hover': '#162033',
          border: '#1e293b',
          'border-light': '#2d3e58',
          accent: '#06b6d4',
          'accent-glow': '#0891b2',
          amber: '#f59e0b',
          emerald: '#10b981',
          red: '#ef4444',
          muted: '#94a3b8',
          text: '#f1f5f9'
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -5px rgba(6, 182, 212, 0.25)',
        'glow-emerald': '0 0 20px -5px rgba(16, 185, 129, 0.25)',
        'glow-amber': '0 0 20px -5px rgba(245, 158, 11, 0.25)',
      }
    },
  },
  plugins: [],
}
