import Image from 'next/image';
import type { PortfolioItem } from '@/lib/portfolio/items';
import { portfolioImagePath } from '@/lib/portfolio/images';
import type { Lang } from '@/lib/i18n/locales';

interface PortfolioCardProps {
  item: PortfolioItem;
  lang: Lang;
  hasImage: boolean;
  labels: { stack: string; demo: string; imageAlt: (title: string) => string };
}

/** Honest card: description, stack and links. Screenshot only when the file exists. */
export function PortfolioCard({ item, lang, hasImage, labels }: PortfolioCardProps) {
  return (
    <article className="space-y-3 border-t border-border pt-6">
      <h2 className="text-xl">{item.title}</h2>
      {hasImage && (
        <Image
          src={portfolioImagePath(item.slug)}
          alt={labels.imageAlt(item.title)}
          width={1200}
          height={750}
          sizes="(min-width: 768px) 40rem, 100vw"
          className="h-auto w-full rounded-lg"
        />
      )}
      <p className="max-w-prose">{item.description[lang]}</p>
      {item.stack.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {labels.stack}: {item.stack.join(', ')}
        </p>
      )}
      <ul className="flex flex-wrap gap-x-5 gap-y-1">
        {item.links.map((link) => (
          <li key={link.url}>
            <a href={link.url} rel="noopener noreferrer" target="_blank" className="font-semibold">
              {link.label[lang]}
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}
