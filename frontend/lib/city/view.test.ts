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
  days_min: 3,
  days_max: 7,
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
  attr: 'Алматыдағы',
  product_focus: [
    product('sait-dlya-stomatologii', 'websites', 'Сайт для стоматологии'),
    product('telegram-bot-zapis', 'bots', 'Telegram-бот записи'),
  ],
  nearby: [{ slug: 'konaev', name_ru: 'Конаев', name_kk: 'Қонаев' }],
  focus_why: {
    'sait-dlya-stomatologii': 'В Алматы много частных клиник.',
    'telegram-bot-zapis': 'Люди записываются в Telegram.',
  },
};

describe('buildCityView', () => {
  const view = buildCityView({ dto, lang: 'ru', rate: 500, catalog: [], minPriceKzt: 3000 });

  it('uses the Russian forms and states the in-person note only in the FAQ', () => {
    expect(view.h1).toBe('IT-услуги в Алматы');
    expect(view.remote).toBe('Работаю удалённо по всему Казахстану, личная встреча возможна в Алматы.');
    expect(view.faq[0]?.a).toContain('В Алматы можно встретиться лично');
    expect(view.remote).not.toContain('можно встретиться лично.');
    expect(view.title.length).toBeLessThanOrEqual(70);
  });

  it('shows the hand-written reason for each focus product', () => {
    expect(view.focus).toHaveLength(2);
    expect(view.focus[0]?.reason).toBe('В Алматы много частных клиник.');
    expect(view.focus[0]?.href).toBe('/products/sait-dlya-stomatologii');
  });

  it('uses one reason in FAQ answer 2', () => {
    expect(view.faq).toHaveLength(3);
    expect(view.faq[0]?.q).toBe('Можно ли заказать работу в Алматы дистанционно?');
    expect(view.faq[1]?.a).toContain('Например, для «Сайт для стоматологии»: В Алматы много частных клиник.');
  });

  it('uses the Kazakh attributive form for the h1 and no in-person note outside Almaty', () => {
    const kk = buildCityView({
      dto: { ...dto, slug: 'taraz', loc: 'Тараз', attr: 'Тараздағы', in_person: false, sectors: ['сауда'], focus_why: {} },
      lang: 'kk',
      rate: 500,
      catalog: [],
      minPriceKzt: null,
    });
    expect(kk.h1).toBe('Тараздағы IT-қызметтер');
    expect(kk.nearby[0]?.name).toBe('Қонаев');
    expect(kk.faq[0]?.a).not.toContain('Алматыда жеке кездесуге болады');
    expect(kk.focus[0]?.reason).toBe('');
  });
});
