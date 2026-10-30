import { SITE_NAME } from '@/lib/site/brand';

/** Text logo: the site name in Onest 800, 24px, ink. No icon tile. */
export function Wordmark({ className }: { className?: string }) {
  return <span className={`text-2xl font-extrabold leading-none tracking-tight text-foreground ${className ?? ''}`}>{SITE_NAME}</span>;
}
