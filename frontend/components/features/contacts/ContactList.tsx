export interface ContactItem {
  label: string;
  href: string;
  text: string;
  external: boolean;
}

/** Contact channels as a plain list. External links open in a new tab. */
export function ContactList({ items }: { items: ContactItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.label}>
          {item.label}:{' '}
          <a
            href={item.href}
            {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}
