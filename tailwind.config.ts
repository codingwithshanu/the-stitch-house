import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF5EE',
          200: '#F4ECE1',
          300: '#E8DC output',
          400: '#DACAB6',
          500: '#C7B49D',
        },
        rosewood: {
          50: '#FDF2F4',
          100: '#FBE8EC',
          200: '#F7D0D9',
          300: '#F0A8B8',
          400: '#E4748E',
          500: '#CE3E62',
          600: '#B02648',
          700: '#941B39',
          800: '#7C1831',
          900: '#67182C',
          950: '#3A0815',
        },
        gold: {
          50: '#FCFAF2',
          100: '#F8F3E2',
          200: '#EFE5C3',
          300: '#E3D29E',
          400: '#D5BC73',
          500: '#C5A059',
          600: '#AD8442',
          700: '#8C6633',
          800: '#72522D',
          900: '#5F4428',
        },
        charcoal: {
          50: '#F6F6F6',
          100: '#E7E7E7',
          200: '#D1D1D1',
          300: '#B0B0B0',
          400: '#888888',
          500: '#6D6D6D',
          600: '#5D5D5D',
          700: '#4F4F4F',
          800: '#2A2626',
          900: '#181515',
          950: '#0D0B0B',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(124, 24, 49, 0.06)',
        'luxury': '0 10px 30px -5px rgba(28, 25, 23, 0.08)',
        'card-hover': '0 20px 40px -15px rgba(124, 24, 49, 0.12)',
      }
    },
  },
  plugins: [],
};
export default config;
