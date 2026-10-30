import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/ui/cn';

type DivProps = HTMLAttributes<HTMLDivElement>;

/** Surface for catalog items. Pass `interactive` for the lift-on-hover Kaspi-style tile. */
export function Card({ className, interactive = false, ...props }: DivProps & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-line bg-card text-card-foreground',
        interactive && 'transition-shadow duration-base ease-out hover:shadow-card-hover',
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: DivProps) {
  return <div className={cn('flex flex-col gap-1.5 p-5', className)} {...props} />;
}

export function CardContent({ className, ...props }: DivProps) {
  return <div className={cn('p-5 pt-0', className)} {...props} />;
}

export function CardFooter({ className, ...props }: DivProps) {
  return <div className={cn('flex items-center gap-3 p-5 pt-0', className)} {...props} />;
}
