import type { ProductDict } from '../types';

export const productKk: ProductDict = {
  descriptionTemplate: (short, priceText) => `${short} Бағасы: ${priceText}. Қазақстан бойынша қашықтан жұмыс істейміз.`,
  remote: 'Қазақстан бойынша қашықтан жұмыс істейміз.',
  estimate: 'Не кіреді',
  total: 'Баға',
  forWhom: 'Кімге арналған',
  notIncluded: 'Не кірмейді',
  notIncludedLead: 'Күтпеген жайттар болмауы үшін, негізгі бағаға мыналар кірмейді және бөлек талқыланады:',
  process: 'Жұмыс қалай жүреді',
  related: 'Тағы не пайдаға асуы мүмкін',
  faq: 'Жиі қойылатын сұрақтар',
  ctaTitle: 'Тапсырмаңызды талқылайық па?',
  ctaText: 'Өнім атауы мен осы бетке сілтеме хабарламаға WhatsApp-та өзі қойылады.',
  priceNote: 'Баға бастапқы; соңғы соманы жұмыс басталғанға дейін айтамыз.',
  payNote: 'Төлем шарттары және орындаушының мәртебесі',
  leadTitle: 'Немесе өтінім қалдырыңыз',
  leadText: 'Таңдаған арнаңыз бойынша жауап береміз: WhatsApp, Telegram, телефон немесе email. Байланыс тек жауап беру үшін қажет.',
  galleryLabel: 'Суреттер',
  photoAlt: (title, n) => `${title}: ${n}-сурет`,
  orderTitle: 'Тапсырыс беру',
  orderHint: 'Өнім атауы хабарламаға өзі қойылады.',
};
