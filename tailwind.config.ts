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
      // ── Brand Color Tokens ──────────────────────────────────────────────
      colors: {
        brand: {
          50: 'hsl(240, 100%, 97%)',
          100: 'hsl(240, 92%, 93%)',
          200: 'hsl(238, 90%, 85%)',
          400: 'hsl(236, 82%, 65%)',
          600: 'hsl(234, 75%, 50%)', // Primary brand — HSL 234° (within 220–270° range)
          800: 'hsl(232, 70%, 35%)',
          900: 'hsl(230, 65%, 22%)',
        },
        accent: {
          400: 'hsl(270, 70%, 60%)', // Secondary accent (indigo-purple)
          600: 'hsl(268, 65%, 45%)',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          400: '#9CA3AF',
          600: '#4B5563',
          800: '#1F2937',
          900: '#111827',
        },
        semantic: {
          success: 'hsl(142, 71%, 45%)',
          warning: 'hsl(38, 92%, 50%)',
          error: 'hsl(0, 84%, 55%)',
          info: 'hsl(217, 91%, 60%)',
        },
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#0F172A',
        },
        // Shadcn CSS variable mappings
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      // ── Font Families ──────────────────────────────────────────────────
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        myanmar: ['Noto Sans Myanmar', 'Pyidaungsu', 'sans-serif'],
      },
      // ── Spacing Scale (all values are multiples of 4px) ────────────────
      // Tailwind's default spacing scale already satisfies value % 4 === 0.
      // No custom spacing values outside multiples of 4 are defined here.
      spacing: {
        // Explicit entries to document the 4px grid contract
        // (Tailwind default: 1=4px, 2=8px, 3=12px, 4=16px, 5=20px, 6=24px …)
        // Extended values all remain multiples of 4:
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px — min-height for Textarea
        '11': '2.75rem', // 44px — touch target minimum
      },
      // ── Border Radius ──────────────────────────────────────────────────
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      // ── Keyframes for loading animations ───────────────────────────────
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.3s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
