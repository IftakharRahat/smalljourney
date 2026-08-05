/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0F172A',
        deepPurple: '#312E81',
        warmGold: '#FBBF24',
        softPink: '#FBCFE8',
        cream: '#FFF8F0',
        starGlow: '#FDE68A',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        handwriting: ['"Dancing Script"', '"Caveat"', 'cursive'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 5px rgba(251, 191, 36, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.9))' },
        }
      }
    },
  },
  plugins: [],
}
