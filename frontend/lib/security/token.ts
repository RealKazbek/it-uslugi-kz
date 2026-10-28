import { timingSafeEqual } from 'node:crypto';

/**
 * Constant-time check of the X-Internal-Token header against the configured secret.
 * Denies everything when the expected value is empty. Unequal lengths are denied without comparing bytes.
 */
export function isValidInternalToken(provided: string | null, expected: string): boolean {
  if (expected === '' || provided === null) return false;
  const a = Buffer.from(provided, 'utf8');
  const b = Buffer.from(expected, 'utf8');
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
