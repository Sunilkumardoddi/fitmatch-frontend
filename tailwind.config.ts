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

