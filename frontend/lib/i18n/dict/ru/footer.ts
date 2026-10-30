import type { FooterDict } from '../types';

export const footerRu: FooterDict = {
  description: 'Сайты, Telegram-боты и автоматизация для бизнеса.',
  team: 'Команда разработчиков, удалённо по всему Казахстану',
  services: 'Услуги',
  popular: 'Популярное',
  cities: 'Города',
  info: 'Информация',
  contactsHeading: 'Связь',
  request: 'Оставить заявку',
  agreement: 'Письменное соглашение · оплата 50/50',
  hours: (value) => `Ежедневно, ${value}`,
  navLabel: (name) => `Раздел «${name}»`,
};
