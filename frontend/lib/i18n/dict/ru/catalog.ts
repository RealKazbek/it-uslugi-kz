import type { CatalogDict } from '../types';

export const catalogRu: CatalogDict = {
  title: 'Каталог услуг: сайты, боты, AI, автоматизация | RK Dev',
  description: (count, min) =>
    `Каталог из ${count} готовых продуктов: сайты, магазины, боты, AI-ассистенты, автоматизация и уроки. Цены ${min}, фильтр и поиск.`,
  h1: 'Каталог услуг',
  lead: 'Выберите готовый формат под вашу задачу: у каждого продукта есть цена, срок, состав работ и честный список того, что в него не входит.',
  filterAll: 'Все категории',
  filterLabel: 'Категория',
  searchLabel: 'Поиск по каталогу',
  searchPlaceholder: 'Например: бот, сайт, Kaspi',
  empty: 'Ничего не найдено. Попробуйте другой запрос или напишите мне.',
  categories: 'Категории',
  countLabel: (n) => `Продуктов: ${n}`,
  hubTitle: (name) => `${name}: каталог и цены | RK Dev`,
  hubDescription: (short, min) => `${short}. Цены ${min}. Работаю удалённо по Казахстану.`,
  hubH1: (name) => `${name}: каталог и цены`,
  hubList: 'Продукты в категории',
  hubOthers: 'Другие категории',
  sortLabel: 'Сортировка',
  sorts: { popular: 'Сначала популярные', priceAsc: 'Сначала дешевле', priceDesc: 'Сначала дороже', fast: 'Сначала быстрые' },
  results: (n) => `Найдено: ${n}`,
  reset: 'Сбросить фильтры',
  listHeading: 'Продукты',
};
