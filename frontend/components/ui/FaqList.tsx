export interface FaqItem {
  q: string;
  a: string;
}

/** Native disclosure list: works without JavaScript. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q} className="group py-4">
          <summary className="cursor-pointer list-none font-semibold">{item.q}</summary>
          <p className="mt-2 max-w-prose text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
