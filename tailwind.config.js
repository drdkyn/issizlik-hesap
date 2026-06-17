/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sgk: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#b3c5d8',
          300: '#8ca8c4',
          400: '#658bb0',
          500: '#3e6e9c',
          600: '#2d5278',
          700: '#1c3654',
          800: '#0b1a30',
        },
      },
    },
  },
  plugins: [],
};
