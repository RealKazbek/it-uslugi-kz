import { describe, expect, it } from 'vitest';
import { buildIndex, search, type SearchIndex } from './index';
import type { SearchDoc } from './types';

const DOCS: SearchDoc[] = [
  { id: 'p1', kind: 'product', title: 'Telegram-бот для заявок', subtitle: 'Боты', href: '/p1', keywords: 'бот телеграм заявки telegram bot', weight: 50 },
  { id: 'p2', kind: 'product', title: 'Telegram-бот для магазина', subtitle: 'Боты', href: '/p2', keywords: 'телеграм магазин бот', weight: 30 },
  { id: 'p3', kind: 'product', title: 'WhatsApp-бот', subtitle: 'Боты', href: '/p3', keywords: 'ватсап whatsapp бот', weight: 40 },
  { id: 'p4', kind: 'product', title: 'Сайт для кафе', subtitle: 'Сайты', href: '/p4', keywords: 'сайт кафе ресторан лендинг', weight: 20 },
  { id: 'p5', kind: 'product', title: 'Интернет-магазин', subtitle: 'Сайты', href: '/p5', keywords: 'магазин shop ecommerce сайт', weight: 35 },
  { id: 'p6', kind: 'product', title: 'Лендинг', subtitle: 'Сайты', href: '/p6', keywords: 'лендинг landing одностраничный сайт', weight: 10 },
  { id: 'p7', kind: 'product', title: 'Instagram-бот', subtitle: 'Боты', href: '/p7', keywords: 'инстаграм инста бот', weight: 5 },
  { id: 'p8', kind: 'product', title: 'CRM для продаж', subtitle: 'Автоматизация', href: '/p8', keywords: 'црм crm продажи', weight: 5 },
  { id: 'p9', kind: 'product', title: 'Видеонаблюдение для дома', subtitle: 'Камеры', href: '/p9', keywords: 'камеры cctv видеонаблюдение', weight: 5 },
  { id: 'p10', kind: 'product', title: 'Каспи-магазин интеграция', subtitle: 'Сайты', href: '/p10', keywords: 'kaspi каспи магазин', weight: 5 },
  { id: 'c1', kind: 'category', title: 'Боты', href: '/c1', keywords: 'bot telegram whatsapp боты', weight: 0 },
  { id: 'c2', kind: 'category', title: 'Сайты', href: '/c2', keywords: 'сайт website landing', weight: 0 },
  { id: 'f1', kind: 'faq', title: 'Сколько стоит Telegram-бот?', subtitle: 'Цены', href: '/f1', keywords: 'стоимость бот телеграм', weight: 0 },
  { id: 'g1', kind: 'page', title: 'Обучение и репетиторство', href: '/g1', keywords: 'курсы обучение tutor learn', weight: 0 },
  { id: 'g2', kind: 'page', title: 'Нейросеть для текста', href: '/g2', keywords: 'ии ai нейро gpt чатгпт', weight: 0 },
];

const index: SearchIndex = buildIndex(DOCS);
const ids = (query: string, limit?: number): string[] =>
  search(index, query, limit === undefined ? {} : { limit }).map((h) => h.doc.id);

describe('search', () => {
  it('finds Telegram by Cyrillic and Latin query with the same ranking', () => {
    expect(ids('телеграм').slice(0, 2)).toEqual(['p1', 'p2']);
    expect(ids('telegram')).toEqual(ids('телеграм'));
  });

  it('matches synonyms: "бот тг" puts Telegram bots first', () => {
    const top = ids('бот тг');
    expect(top[0]).toBe('p1');
    expect(top).not.toContain('p3');
  });

  it('mixed script query "tg бот" works', () => {
    expect(ids('tg бот')[0]).toBe('p1');
  });

  it('"сайт для кафе" ranks the cafe site product first', () => {
    expect(ids('сайт для кафе')[0]).toBe('p4');
  });

  it('tolerates typos', () => {
    expect(ids('телеграмм')[0]).toBe('p1');
    expect(ids('telegarm')[0]).toBe('p1');
    expect(ids('ватсаб')[0]).toBe('p3');
    expect(ids('вотсап')[0]).toBe('p3');
  });

  it('matches Kazakh and synonym-only queries', () => {
    expect(ids('ai')[0]).toBe('g2');
    expect(ids('обучение')[0]).toBe('g1');
  });

  it('applies AND across tokens', () => {
    expect(ids('кафе лендинг')).toEqual(['p4']);
    expect(ids('кафе instagram')).toEqual([]);
  });

  it('returns nothing for empty, whitespace or stopword-only queries', () => {
    expect(ids('')).toEqual([]);
    expect(ids('   ')).toEqual([]);
    expect(ids('для и the')).toEqual([]);
  });

  it('respects the limit with a default of 20', () => {
    expect(ids('бот', 2)).toHaveLength(2);
    expect(ids('бот').length).toBeLessThanOrEqual(20);
  });

  it('filters by kinds', () => {
    const hits = search(index, 'сайт', { kinds: ['category'] });
    expect(hits.map((h) => h.doc.id)).toEqual(['c2']);
  });

  it('stays fast for 500 docs over 20 keystrokes', () => {
    const big: SearchDoc[] = Array.from({ length: 500 }, (_, i) => ({
      id: `d${i}`,
      kind: 'product',
      title: `Telegram-бот номер ${i} для магазина`,
      subtitle: 'Боты',
      href: `/d${i}`,
      keywords: 'сайт лендинг crm shop bot ' + String(i),
      weight: i,
    }));
    const bigIndex = buildIndex(big);
    const start = performance.now();
    for (let k = 2; k <= 21; k++) search(bigIndex, 'телеграм бот'.slice(0, k % 12 + 1));
    expect(performance.now() - start).toBeLessThan(200);
  });
});
