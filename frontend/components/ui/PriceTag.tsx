/** A price line with tabular figures so amounts line up. */
export function PriceTag({ text, className = '' }: { text: string; className?: string }) {
  return <span className={`font-semibold tabular-nums ${className}`.trim()}>{text}</span>;
}
