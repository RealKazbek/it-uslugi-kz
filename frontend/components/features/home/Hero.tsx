import type { CSSProperties } from 'react';
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

/** Hero CTA hover lift; press scale comes from buttonVariants. */
const HERO_CTA_LIFT = 'transition-[color,background-color,transform] duration-base ease-out hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none';

export interface HeroStatsInput {
  products: number;
  categories: number;
  cities: number;
}

/** Home hero: pitch, CTAs and counters on the left, device collage on the right (below on mobile). */
export function Hero({ lang, stats }: { lang: Lang; stats: HeroStatsInput }) {
  const d = getDict(lang);
  const labels = d.home.stats;
  const items: HeroStatItem[] = [
    { value: stats.products, label: labels.products },
    { value: stats.categories, label: labels.categories },
    { value: '∞' as const, label: labels.languages },
    { value: stats.cities, label: labels.cities },
  ].filter((item) => item.value === '∞' || item.value > 0);

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(60rem_30rem_at_85%_-10%,rgb(var(--primary)/0.08),transparent)] py-10 md:py-16">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-6">
          <div className="hero-rise" style={{ "--i": 0 } as CSSProperties}>
            <Badge variant="soft" className="gap-1.5 px-3 py-1 text-sm">
              <MapPin aria-hidden="true" className="size-4" />
              {d.home.heroBadge}
            </Badge>
          </div>
          <div className="hero-rise" style={{ "--i": 1 } as CSSProperties}>
            <h1 className="text-display tracking-tight">{d.home.h1}</h1>
          </div>
          <div className="hero-rise" style={{ "--i": 2 } as CSSProperties}>
            <p className="max-w-xl text-lg text-muted-foreground">{d.home.lead}</p>
          </div>
          <div className="hero-rise" style={{ "--i": 3 } as CSSProperties}>
            <ul className="space-y-2">
              {d.home.heroPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-rise" style={{ "--i": 4 } as CSSProperties}>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
              <ButtonLink href={whatsappGeneralLink(lang)} variant="whatsapp" size="lg" className={`col-span-2 ${HERO_CTA_LIFT}`}>
                <SiWhatsapp aria-hidden="true" />
                {d.home.ctaWhatsapp}
              </ButtonLink>
              <ButtonLink href={localePath(lang, '/catalog')} variant="outline" size="lg" className={`px-4 ${HERO_CTA_LIFT}`}>
                <LayoutGrid aria-hidden="true" />
                {d.common.cta.allProducts}
              </ButtonLink>
              <ButtonLink href={telegramLink()} variant="outline" size="lg" className={`px-4 ${HERO_CTA_LIFT}`}>
                <SiTelegram aria-hidden="true" className="text-telegram" />
                {d.common.cta.telegram}
              </ButtonLink>
            </div>
          </div>
          <div className="hero-rise" style={{ "--i": 5 } as CSSProperties}>
            <HeroStats items={items} />
          </div>
        </div>
        <HeroVisual chips={d.home.heroChips} />
      </Container>
    </section>
  );
}
