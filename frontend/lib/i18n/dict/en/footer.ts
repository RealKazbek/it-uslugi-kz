import type { FooterDict } from '../types';

export const footerEn: FooterDict = {
  description: 'Websites, Telegram bots and automation for business.',
  team: 'A team of developers working remotely across Kazakhstan',
  services: 'Services',
  popular: 'Popular',
  cities: 'Cities',
  info: 'Information',
  contactsHeading: 'Contact',
  request: 'Request a quote',
  agreement: 'Written agreement · 50/50 payment',
  hours: (value) => `Daily, ${value}`,
  navLabel: (name) => `${name} section`,
};
