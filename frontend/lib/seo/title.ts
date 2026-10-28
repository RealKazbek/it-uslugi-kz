export const TITLE_LIMIT = 70;
const SUFFIX = ' | RK Dev';

export interface PriceTitleInput {
  /** Product or page name, without the price. */
  head: string;
  /** Price text with the USD hint (en), e.g. "from 45,000 ₸ (≈ $90)". */
  priceWithUsd: string;
  /** Same price text without the USD hint. Keeps "от", "бастап" and "from". */
  priceWithoutUsd: string;
}

function cutHead(head: string, room: number): string {
  if (room <= 0) return '';
  if (head.length <= room) return head;
  const cut = head.slice(0, Math.max(1, room - 1));
  const space = cut.lastIndexOf(' ');
  const base = space > room / 2 ? cut.slice(0, space) : cut;
  return `${base.replace(/[\s,;:.-]+$/, '')}…`;
}

/**
 * Title for a page whose name and price must both fit in 70 characters.
 * Order: drop " | RK Dev", then the USD hint, then cut the name at a word boundary.
 * The price text (with "от" / "бастап" / "from") is never cut.
 */
export function fitPriceTitle(input: PriceTitleInput): string {
  const { head, priceWithUsd, priceWithoutUsd } = input;
  const full = `${head} — ${priceWithUsd}${SUFFIX}`;
  if (full.length <= TITLE_LIMIT) return full;
  const noSuffix = `${head} — ${priceWithUsd}`;
  if (noSuffix.length <= TITLE_LIMIT) return noSuffix;
  const noUsd = `${head} — ${priceWithoutUsd}`;
  if (noUsd.length <= TITLE_LIMIT) return noUsd;
  const room = TITLE_LIMIT - ` — ${priceWithoutUsd}`.length;
  return `${cutHead(head, room)} — ${priceWithoutUsd}`;
}
