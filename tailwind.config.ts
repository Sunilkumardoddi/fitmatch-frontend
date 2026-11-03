import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          hover: 'hsl(var(--primary-hover))',
        },
        fit: {
          optimal: '#16a34a',
          snug: '#2563eb',
          roomy: '#d97706',
          tight: '#dc2626',
        },
        couture: {
          noir: '#08090D',
          obsidian: '#10121A',
          card: '#161924',
          charcoal: '#202433',
          border: '#2C3042',
          gold: '#D4AF37',
          'gold-light': '#F7E7C4',
          'gold-dark': '#8C6515',
          champagne: '#F5EBD7',
          cashmere: '#FAF9F6',
          emerald: '#0B4F3A',
          burgundy: '#5B1522',
        },
      },
      fontFamily: {
        serif: ['Didot', 'Bodoni MT', 'Cinzel', 'Playfair Display', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.25)',
        'noir-depth': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
      },
      borderRadius: {
        lg: 'var(--radius-lg, 0.75rem)',
        md: 'var(--radius-md, 0.5rem)',
        sm: 'var(--radius-sm, 0.25rem)',
      },
    },
  },
  plugins: [],
};
export default config;

