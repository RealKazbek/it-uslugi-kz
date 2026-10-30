import type { ReactNode } from 'react';

export interface EstimateCardProps {
  title: string;
  items: string[];
  totalLabel: string;
  totalText: string;
  timelineText: string;
  footer?: ReactNode;
}

/** Receipt-style estimate: included items with dotted leaders, the total line, then the timeline. */
export function EstimateCard({ title, items, totalLabel, totalText, timelineText, footer }: EstimateCardProps) {
  return (
    <section aria-labelledby="estimate-title" className="border-y-2 border-dashed border-border py-5">
      <h2 id="estimate-title" className="text-xl">
        {title}
      </h2>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="receipt-row">
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="receipt-row mt-5 border-t border-border pt-4 text-lg font-bold">
        <span>{totalLabel}</span>
        <span className="tabular-nums">{totalText}</span>
      </div>
      <p className="mt-2 text-muted-foreground">{timelineText}</p>
      {footer}
    </section>
  );
}
