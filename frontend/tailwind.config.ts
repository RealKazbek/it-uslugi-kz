import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const channel = (name: string): string => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: channel('background'),
        foreground: channel('foreground'),
        card: { DEFAULT: channel('card'), foreground: channel('card-foreground') },
        muted: { DEFAULT: channel('muted'), foreground: channel('muted-foreground') },
        border: channel('border'),
        input: channel('input'),
        ring: channel('ring'),
        primary: {
          DEFAULT: channel('primary'),
          foreground: channel('primary-foreground'),
          hover: channel('primary-hover'),
        },
        secondary: { DEFAULT: channel('secondary'), foreground: channel('secondary-foreground') },
        accent: { DEFAULT: channel('accent'), foreground: channel('accent-foreground') },
        success: channel('success'),
        whatsapp: { DEFAULT: channel('whatsapp'), foreground: channel('whatsapp-foreground') },
        telegram: { DEFAULT: channel('telegram'), foreground: channel('telegram-foreground') },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        pop: 'var(--shadow-pop)',
      },
      transitionDuration: { fast: 'var(--duration-fast)', base: 'var(--duration-base)', slow: 'var(--duration-slow)' },
      transitionTimingFunction: { out: 'var(--ease-out)' },
      maxWidth: { prose: '70ch' },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },
      animation: {
        'accordion-down': 'accordion-down var(--duration-base) var(--ease-out)',
        'accordion-up': 'accordion-up var(--duration-base) var(--ease-out)',
      },
    },
  },
  plugins: [animate],
};

export default config;
