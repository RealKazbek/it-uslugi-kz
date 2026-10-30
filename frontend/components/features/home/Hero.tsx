import { CheckCircle2, LayoutGrid, MapPin } from 'lucide-react';
import { SiTelegram, SiWhatsapp } from 'react-icons/si';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { telegramLink, whatsappGeneralLink } from '@/lib/format/links';
import { getDict } from '@/lib/i18n/dict';
import type { Lang } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import { HeroStats, type HeroStatItem } from './HeroStats';
import { HeroVisual } from './HeroVisual';

export interface HeroStatsInput {
  products: number;
  categories: number;
  languages: number;
  cities: number;
}

/** Home hero: pitch, CTAs and counters on the left, device collage on the right (below on mobile). */
export function Hero({ lang, stats }: { lang: Lang; stats: HeroStatsInput }) {
  const d = getDict(lang);
  const labels = d.home.stats;
  const items: HeroStatItem[] = [
    { value: stats.products, label: labels.products },
    { value: stats.categories, label: labels.categories },
    { value: stats.languages, label: labels.languages },
    { value: stats.cities, label: labels.cities },
  ].filter((item) => item.value > 0);

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(60rem_30rem_at_85%_-10%,rgb(var(--primary)/0.08),transparent)] py-10 md:py-16">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-6">
          <Badge variant="soft" className="gap-1.5 px-3 py-1 text-sm">
            <MapPin aria-hidden="true" className="size-4" />
            {d.home.heroBadge}
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl xl:text-6xl">{d.home.h1}</h1>
          <p className="max-w-xl text-lg text-muted-foreground">{d.home.lead}</p>
          <ul className="space-y-2">
            {d.home.heroPoints.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href={whatsappGeneralLink(lang)} variant="whatsapp" size="lg">
              <SiWhatsapp aria-hidden="true" />
              {d.home.ctaWhatsapp}
            </ButtonLink>
            <ButtonLink href={localePath(lang, '/catalog')} variant="outline" size="lg">
              <LayoutGrid aria-hidden="true" />
              {d.common.cta.allProducts}
            </ButtonLink>
            <ButtonLink href={telegramLink()} variant="ghost">
              <SiTelegram aria-hidden="true" className="text-telegram" />
              {d.common.cta.telegram}
            </ButtonLink>
          </div>
          <HeroStats items={items} />
        </div>
        <HeroVisual chips={d.home.heroChips} />
      </Container>
    </section>
  );
}
