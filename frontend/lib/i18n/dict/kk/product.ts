import type { ProductDict } from '../types';

export const productKk: ProductDict = {
  titleTemplate: (title, priceText) => `${title} — ${priceText} | RK Dev`,
  descriptionTemplate: (short, priceText) => `${short} Бағасы: ${priceText}. Қазақстан бойынша қашықтан жұмыс істеймін.`,
  remote: 'Қазақстан бойынша қашықтан жұмыс істеймін.',
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
  priceNote: 'Баға бастапқы; соңғы соманы жұмыс басталғанға дейін айтамын.',
  payNote: 'Төлем шарттары және орындаушының мәртебесі',
  leadTitle: 'Немесе өтінім қалдырыңыз',
  leadText: 'WhatsApp немесе Telegram-да жауап беремін. Байланыс тек жауап беру үшін қажет.',
};
