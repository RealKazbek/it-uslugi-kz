import type { ProductDict } from '../types';

export const productRu: ProductDict = {
  descriptionTemplate: (short, priceText) => `${short} Цена: ${priceText}. Работаю удалённо по Казахстану.`,
  remote: 'Работаю удалённо по Казахстану.',
  estimate: 'Что входит',
  total: 'Цена',
  forWhom: 'Кому подходит',
  notIncluded: 'Что не входит',
  notIncludedLead: 'Чтобы не было сюрпризов, вот что в базовую цену не входит и обсуждается отдельно:',
  process: 'Как проходит работа',
  related: 'Что ещё может пригодиться',
  faq: 'Частые вопросы',
  ctaTitle: 'Обсудим вашу задачу?',
  ctaText: 'Название продукта и ссылка на эту страницу подставятся в сообщение WhatsApp сами.',
  priceNote: 'Цена стартовая; итоговую сумму называю до начала работ.',
  payNote: 'Условия оплаты и статус исполнителя',
  leadTitle: 'Или оставьте заявку',
  leadText: 'Отвечу в выбранном вами канале: WhatsApp, Telegram, телефон или email. Контакт нужен только для ответа.',
};
