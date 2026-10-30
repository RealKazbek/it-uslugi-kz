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
        whatsapp: { DEFAULT: channel('whatsapp'), foreground: channel('whatsapp-foreground'), hover: channel('whatsapp-hover') },
        telegram: channel('telegram'),
        surface: { 100: channel('surface-100'), 200: channel('surface-200'), tint: channel('surface-tint') },
        ink: { DEFAULT: channel('ink'), muted: channel('ink-muted') },
        line: channel('line'),
        brand: { DEFAULT: channel('brand'), soft: channel('brand-soft') },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-md)',
        xl: 'var(--radius-lg)',
        '2xl': 'var(--radius-lg)',
        '3xl': 'var(--radius-lg)',
      },
      fontSize: {
        display: ['var(--fs-display)', { lineHeight: 'var(--lh-display)', fontWeight: '800' }],
        h2: ['var(--fs-h2)', { lineHeight: 'var(--lh-h2)', fontWeight: '800' }],
        stat: ['var(--fs-stat)', { lineHeight: 'var(--lh-stat)', fontWeight: '800' }],
        h3: ['1.375rem', { lineHeight: '1.75rem', fontWeight: '700' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        body: ['1rem', { lineHeight: '1.5rem' }],
        label: ['0.875rem', { lineHeight: '1.25rem', fontWeight: '600' }],
      },
      spacing: { s1: 'var(--space-1)', s2: 'var(--space-2)', s3: 'var(--space-3)', s4: 'var(--space-4)', s5: 'var(--space-5)' },
      boxShadow: {
        'card-hover': 'var(--shadow-card-hover)',
        pop: 'var(--shadow-pop)',
      },
      transitionDuration: { fast: 'var(--duration-fast)', base: 'var(--duration-base)', slow: 'var(--duration-slow)' },
      transitionTimingFunction: { out: 'var(--ease-out)' },
      maxWidth: { prose: '70ch' },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'dial-pulse': { '0%': { transform: 'scale(1)', opacity: '0.4' }, '27%': { transform: 'scale(1.5)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '0' } },
      },
      animation: {
        'accordion-down': 'accordion-down var(--duration-base) var(--ease-out)',
        'accordion-up': 'accordion-up var(--duration-base) var(--ease-out)',
        'dial-pulse': 'dial-pulse 6s var(--ease-out) infinite',
      },
    },
  },
  plugins: [animate],
};

export default config;
