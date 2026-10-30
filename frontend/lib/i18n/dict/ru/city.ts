import type { CityDict, CityFaqInput } from '../types';

function example(input: CityFaqInput): string {
  return input.example ? ` Например, для «${input.example.title}»: ${input.example.reason}` : '';
}

export const cityRu: CityDict = {
  title: (name) => `IT-услуги ${name}: сайты, боты, автоматизация | Perne`,
  h1: (forms) => `IT-услуги ${forms.loc}`,
  description: (forms, min) => `Сайты, Telegram-боты и автоматизация ${forms.loc}. Цены ${min}. Работаю удалённо по Казахстану.`,
  intro: (context, sectors) => `${context} Заметные сферы города: ${sectors.join(', ')}.`,
  remote: 'Работаю удалённо по всему Казахстану, личная встреча возможна в Алматы.',
  focusHeading: 'Что чаще всего подходит бизнесу в этом городе',
  focusLead: 'Шесть продуктов, которые лучше всего соответствуют местным сферам.',
  catalogHeading: (form) => `Весь каталог для бизнеса ${form}`,
  nearbyHeading: 'Соседние города',
  faqHeading: 'Частые вопросы',
  faq: (input) => [
    {
      q: `Можно ли заказать работу ${input.loc} дистанционно?`,
      a: `Да, всё делаю удалённо: созвон, переписка в WhatsApp или Telegram, показ экрана.${input.inPerson ? ' В Алматы можно встретиться лично.' : ''}`,
    },
    {
      q: `Что чаще всего заказывают для бизнеса ${input.gen}?`,
      a: `С учётом сфер города (${input.sectors.slice(0, 3).join(', ')}) чаще всего подходят: ${input.titles.slice(0, 3).join('; ')}.${example(input)}`,
    },
    {
      q: `Отличается ли цена для ${input.gen}?`,
      a: 'Нет, цена не зависит от города. Итоговую сумму называю до начала работ и фиксирую в письменном соглашении.',
    },
  ],
};
