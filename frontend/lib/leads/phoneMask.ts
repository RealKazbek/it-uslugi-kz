const NATIONAL_LENGTH = 10;

/**
 * Digits of the national part (without the +7 country code). The prefix is dropped when written as "+7", as a
 * leading 8, or as a leading 7 on an 11-digit paste; a bare leading 7 is a national digit (KZ mobiles start with 7xx).
 */
function nationalDigits(input: string): string {
  const digits = input.replace(/\D/g, '');
  const hasPrefix = input.trim().startsWith('+7') || digits[0] === '8' || (digits[0] === '7' && digits.length > NATIONAL_LENGTH);
  return (hasPrefix ? digits.slice(1) : digits).slice(0, NATIONAL_LENGTH);
}

/** Progressive mask for Kazakhstan numbers: "+7 (707) 123-45-67". Returns "" when there are no digits yet. */
export function formatKzPhone(input: string): string {
  const d = nationalDigits(input);
  if (d.length === 0) return '';
  let out = `+7 (${d.slice(0, 3)}`;
  if (d.length > 3) out += `) ${d.slice(3, 6)}`;
  if (d.length > 6) out += `-${d.slice(6, 8)}`;
  if (d.length > 8) out += `-${d.slice(8, 10)}`;
  return out;
}

/** True when the input holds all ten national digits. */
export function isCompleteKzPhone(input: string): boolean {
  return nationalDigits(input).length === NATIONAL_LENGTH;
}
