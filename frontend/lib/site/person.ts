// The "who we are" block on the contacts page. Team voice; only facts we can stand behind (no headcount, years or client claims).
import type { Lang } from '@/lib/i18n/locales';
import { SITE_NAME } from './brand';

export const person: { name: Record<Lang, string>; role: Record<Lang, string>; facts: Record<Lang, string[]> } = {
  name: { ru: SITE_NAME, kk: SITE_NAME, en: SITE_NAME },
  role: {
    ru: 'команда разработчиков из Алматы',
    kk: 'Алматыдағы әзірлеушілер командасы',
    en: 'a team of developers based in Almaty, Kazakhstan',
  },
  facts: {
    ru: ['Базируемся в Алматы, работаем удалённо по всему Казахстану.', 'Работаем командой: дизайн, разработка и запуск под одной задачей.', 'Общаемся с заказчиком напрямую, без посредников.'],
    kk: ['Алматыда орналасқанбыз, бүкіл Қазақстан бойынша қашықтан жұмыс істейміз.', 'Команда болып жұмыс істейміз: дизайн, әзірлеу және іске қосу бір тапсырма аясында.', 'Тапсырыс берушімен делдалсыз, тікелей сөйлесеміз.'],
    en: ['We are based in Almaty and work remotely across Kazakhstan.', 'We work as a team: design, development and launch under one task.', 'You talk to us directly, with no middlemen.'],
  },
};
