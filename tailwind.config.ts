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
          DEFAULT: '#111111',
          foreground: '#FFFFFF',
          hover: '#262626',
        },
        fit: {
          optimal: '#15803d',
          snug: '#1d4ed8',
          roomy: '#b45309',
          tight: '#b91c1c',
        },
        atelier: {
          canvas: '#FAFAF8',
          surface: '#FFFFFF',
          muted: '#F4F4F2',
          border: '#E7E5E4',
          line: '#D6D3D1',
          ink: '#111111',
          graphite: '#444444',
          subtle: '#737373',
          brass: '#8C6239',
          sage: '#2D4A3E',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['Space Grotesk', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.375rem',
      },
    },
  },
  plugins: [],
};
export default config;
