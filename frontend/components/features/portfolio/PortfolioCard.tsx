import { Code2, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import type { CaseView } from '@/lib/portfolio/caseViews';

export interface PortfolioCardLabels {
  stack: string;
  imageAlt: (title: string) => string;
}

/** Project card: screenshot (or a styled placeholder), stack badges, clamped description, external links. */
export function PortfolioCard({ item, labels }: { item: CaseView; labels: PortfolioCardLabels }) {
  return (
    <Card interactive className="flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-accent">
        {item.image ? (
          <Image
            src={item.image}
            alt={labels.imageAlt(item.title)}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <div aria-hidden="true" className="flex size-full items-center gap-3 px-6 text-accent-foreground">
            <Code2 className="size-8 shrink-0" />
            <span className="text-5xl font-extrabold">{item.title.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h2 className="text-xl">{item.title}</h2>
        {item.stack.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label={labels.stack}>
            {item.stack.map((tech) => (
              <li key={tech}>
                <Badge variant="outline">{tech}</Badge>
              </li>
            ))}
          </ul>
        )}
        <p className="line-clamp-3 text-muted-foreground">{item.description}</p>
        <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-2">
          {item.links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary-hover no-underline hover:text-foreground hover:underline"
              >
                {link.label}
                <ExternalLink aria-hidden="true" className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
