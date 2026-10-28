import { describe, expect, it } from 'vitest';
import { buildCityView } from './view';
import type { CityDto, ProductCardDto } from '@/types/api';

const product = (slug: string, category: string, title: string): ProductCardDto => ({
  slug,
  category,
  title,
  short: 's',
  price_from_kzt: 60000,
  unit: 'once',
});

const dto: CityDto = {
  slug: 'almaty',
  name: 'Алматы',
  loc: 'в Алматы',
  region: 'город республиканского значения',
  market_context: 'Крупный деловой центр.',
  sectors: ['торговля', 'туризм', 'образование'],
  in_person: true,
  gen: 'Алматы',
  attr: null,
  product_focus: [
    product('sait-dlya-stomatologii', 'websites', 'Сайт для стоматологии'),
    product('telegram-bot-zapis', 'bots', 'Telegram-бот записи'),
  ],
  nearby: [{ slug: 'konaev', name_ru: 'Конаев', name_kk: 'Қонаев' }],
};

describe('buildCityView', () => {
  const view = buildCityView({ dto, lang: 'ru', rate: 500, catalog: [], minPriceKzt: 3000 });

  it('uses the Russian city forms and the remote sentence with the Almaty in-person note', () => {
    expect(view.h1).toBe('IT-услуги в Алматы');
    expect(view.remote).toContain('личная встреча возможна в Алматы');
    expect(view.remote).toContain('В Алматы можно встретиться лично');
    expect(view.title.length).toBeLessThanOrEqual(70);
  });

  it('gives each focus product a city-specific reason', () => {
    expect(view.focus).toHaveLength(2);
    expect(view.focus[0]?.reason).toContain('Для бизнеса Алматы');
    expect(view.focus[0]?.reason).toContain('торговля');
    expect(view.focus[0]?.href).toBe('/products/sait-dlya-stomatologii');
  });

  it('builds the 3-question FAQ with the city forms', () => {
    expect(view.faq).toHaveLength(3);
    expect(view.faq[0]?.q).toBe('Можно ли заказать работу в Алматы дистанционно?');
    expect(view.faq[1]?.a).toContain('Сайт для стоматологии');
  });

  it('uses the Kazakh attributive form and no in-person note outside Almaty', () => {
    const kk = buildCityView({
      dto: { ...dto, slug: 'taraz', loc: 'Таразда', attr: 'Тараздағы', in_person: false, sectors: ['сауда'] },
      lang: 'kk',
      rate: 500,
      catalog: [],
      minPriceKzt: null,
    });
    expect(kk.nearby[0]?.name).toBe('Қонаев');
    expect(kk.faq[0]?.a).not.toContain('Алматыда жеке кездесуге болады');
  });
});
