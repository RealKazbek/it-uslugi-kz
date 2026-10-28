import { existsSync } from 'node:fs';
import { join } from 'node:path';

const PORTFOLIO_DIR = join(process.cwd(), 'public', 'portfolio');

/** Build-time check: true when public/portfolio/{slug}.webp exists. Server only; never called from components. */
export function portfolioImageExists(slug: string): boolean {
  if (!/^[a-z0-9-]+$/.test(slug)) return false;
  return existsSync(join(PORTFOLIO_DIR, `${slug}.webp`));
}

export function portfolioImagePath(slug: string): string {
  return `/portfolio/${slug}.webp`;
}
