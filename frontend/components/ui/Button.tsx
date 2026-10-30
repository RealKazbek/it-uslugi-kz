import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/ui/cn';

/**
 * Button look. Variants: default (accent), secondary, outline, ghost, whatsapp, telegram, link.
 * Sizes: sm, default, lg, icon. Every size keeps a 44px touch target except `sm` (40px, use in dense UI only).
 */
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold no-underline transition-colors duration-base ease-out disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-5 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-muted',
        outline: 'border border-input bg-background text-foreground hover:bg-muted',
        ghost: 'text-foreground hover:bg-muted',
        whatsapp: 'bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90',
        telegram: 'bg-telegram text-telegram-foreground hover:bg-telegram/90',
        link: 'h-auto min-h-0 px-0 text-primary underline hover:text-primary-hover',
      },
      size: {
        sm: 'min-h-10 px-3 text-sm',
        default: 'min-h-11 px-5 text-base',
        lg: 'min-h-12 px-7 text-lg',
        icon: 'size-11',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render the child element (a link, Next <Link>) with button styles instead of a <button>. */
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

interface ButtonLinkProps extends VariantProps<typeof buttonVariants> {
  href: string;
  className?: string;
  children: ReactNode;
}

/** Link styled as a button. External (http/https) links open in a new tab with rel=noopener noreferrer. */
export function ButtonLink({ href, variant, size, className, children }: ButtonLinkProps) {
  const external = /^https?:\/\//.test(href);
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    </Button>
  );
}
