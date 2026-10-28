import type { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'outline';

const BASE =
  'inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-base font-semibold no-underline transition-colors';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-tg text-tgtext hover:opacity-90',
  outline: 'border border-line text-ink hover:bg-mist',
};

/** Class names for a button look, usable on <a> and <button>. */
export function buttonClasses(variant: ButtonVariant = 'primary', extra = ''): string {
  return `${BASE} ${VARIANTS[variant]} ${extra}`.trim();
}

interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}

/** External or internal link styled as a button. External links open in a new tab. */
export function ButtonLink({ href, variant = 'primary', className = '', children }: ButtonLinkProps) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={buttonClasses(variant, className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}
