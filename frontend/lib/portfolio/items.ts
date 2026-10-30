// Honest portfolio entries ported from the old site. No client counts, metrics or reviews.
import type { Lang } from '@/lib/i18n/locales';

export interface PortfolioLink {
  label: Record<Lang, string>;
  url: string;
}

export interface PortfolioItem {
  slug: string;
  title: Record<Lang, string>;
  stack: string[];
  description: Record<Lang, string>;
  links: PortfolioLink[];
}

export const PORTFOLIO: PortfolioItem[] = [
  {
    slug: 'terracon',
    title: { ru: 'TerraCon', kk: 'TerraCon', en: 'TerraCon' },
    stack: ['Next.js', 'Tailwind'],
    description: {
      ru: 'Сайт на Next.js и Tailwind для строительной компании, которая занимается спортивными покрытиями: каталог с фильтрами и корзина. Рядом работает Telegram-бот для связи с менеджером.',
      kk: 'Спорттық жабындармен айналысатын құрылыс компаниясына арналған Next.js пен Tailwind негізіндегі сайт: сүзгілері бар каталог және себет. Менеджермен байланысу үшін Telegram-бот та бар.',
      en: 'A Next.js and Tailwind website for a construction company that installs sports surfaces: a catalog with filters and a cart. A Telegram bot for contacting the manager works alongside it.',
    },
    links: [
      { label: { ru: 'Сайт terracon.kz', kk: 'terracon.kz сайты', en: 'Website terracon.kz' }, url: 'https://terracon.kz' },
      { label: { ru: 'Telegram-бот', kk: 'Telegram-бот', en: 'Telegram bot' }, url: 'https://t.me/terracon_manager_bot' },
    ],
  },
  {
    slug: 'telegram-business-ai',
    title: { ru: 'AI-ассистент для Telegram Business', kk: 'Telegram Business үшін ЖИ-көмекші', en: 'AI assistant for Telegram Business' },
    stack: ['Python', 'aiogram', 'DeepSeek'],
    description: {
      ru: 'Ассистент на Python и aiogram с моделью DeepSeek: отвечает клиентам по базе знаний, помнит диалог, имеет админ-панель. Когда владелец отвечает сам, ассистент автоматически замолкает на 60 минут.',
      kk: 'Python мен aiogram және DeepSeek моделі негізіндегі көмекші: клиенттерге білім қоры бойынша жауап береді, диалогты есте сақтайды, әкімшілік панелі бар. Иесі өзі жауап жазса, көмекші 60 минутқа автоматты түрде тоқтайды.',
      en: 'An assistant built with Python, aiogram and the DeepSeek model: it answers clients from a knowledge base, remembers the conversation and has an admin panel. When the owner replies personally, the assistant goes silent for 60 minutes automatically.',
    },
    links: [{ label: { ru: 'Демо в Telegram', kk: 'Telegram-дағы демо', en: 'Demo in Telegram' }, url: 'https://t.me/RealKazbekBot' }],
  },
  {
    slug: 'car',
    title: { ru: 'Car', kk: 'Car', en: 'Car' },
    stack: [],
    description: {
      ru: 'Демонстрационный фронтенд-проект Car.',
      kk: 'Car — фронтендтің демонстрациялық жобасы.',
      en: 'Car is a frontend demo project.',
    },
    links: [{ label: { ru: 'Открыть демо', kk: 'Демоны ашу', en: 'Open the demo' }, url: 'https://realkazbek.github.io/Car/' }],
  },
];
