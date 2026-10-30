import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/ui/cn';

/** Text field: 44px tall, visible 3:1 outline, accent focus ring. Always pair with a visible <label>. */
export function Input({ className, type = 'text', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        'min-h-11 w-full rounded-lg border border-input bg-background px-3 text-base text-foreground placeholder:text-muted-foreground disabled:opacity-60 aria-[invalid=true]:border-primary',
        className,
      )}
      {...props}
    />
  );
}
