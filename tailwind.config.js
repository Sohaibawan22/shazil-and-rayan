/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#060810',
        'secondary-dark': '#0B0D12',
        'brand-gold': '#F5C71A',
        'brand-gold-hover': '#E0B212',
        'text-gray': '#9ca3af',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
