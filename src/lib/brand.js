// "RK" monogram: rounded square + two geometric letters drawn as strokes (no fonts, no external images).
const LETTERS = '<path d="M6 24V8h6.5a4.25 4.25 0 0 1 0 8.5H6M12 16.5L16 24" /><path d="M20 8v16M28 8l-8 9M22.5 14.5L28 24" />';
const STROKE = 'fill="none" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"';

// Inline version: colors come from CSS (.logo) so it follows the accent color and dark mode.
export const logoInline = () =>
  `<svg class="logo" viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" focusable="false"><rect width="32" height="32" rx="7"/><g ${STROKE}>${LETTERS}</g></svg>`;

export const ACCENT = '#1670A8';

// Standalone favicon.svg with fixed colors.
export const faviconSvg = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="${ACCENT}"/><g ${STROKE} stroke="#fff">${LETTERS}</g></svg>\n`;
