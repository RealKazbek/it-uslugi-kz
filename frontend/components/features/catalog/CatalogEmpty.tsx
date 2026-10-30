import { SearchX } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { ButtonLink } from '@/components/ui/Button';

export function CatalogEmpty({ text, ctaLabel, ctaHref }: { text: string; ctaLabel: string; ctaHref: string }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border bg-muted px-6 py-12 text-center">
      <SearchX aria-hidden="true" className="size-10 text-muted-foreground" />
      <p className="max-w-md text-lg text-muted-foreground">{text}</p>
      <ButtonLink href={ctaHref} variant="whatsapp">
        <SiWhatsapp aria-hidden="true" />
        {ctaLabel}
      </ButtonLink>
    </div>
  );
}
