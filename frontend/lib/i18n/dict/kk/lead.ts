import type { LeadDict } from '../types';

export const leadKk: LeadDict = {
  labels: { name: 'Аты', contact: 'Телефон', channel: 'Қалай жауап беру керек', message: 'Тапсырма', service: 'Қызмет' },
  channels: { whatsapp: 'WhatsApp', telegram: 'Telegram', phone: 'Қоңырау', email: 'Email' },
  placeholders: { name: 'Сізге қалай жүгінейін', contact: '+7 (___) ___-__-__', message: 'Тапсырманы қысқаша сипаттаңыз' },
  notSelected: 'Таңдалмаған',
  submit: 'Өтінім жіберу',
  sending: 'Жіберіліп жатыр…',
  success: 'Өтінім жіберілді. Таңдалған арна бойынша жауап береміз.',
  error: 'Өтінімді жіберу мүмкін болмады. WhatsApp немесе Telegram-ға жазыңыз.',
  throttled: 'Қысқа уақыт ішінде тым көп өтінім. Бірнеше минуттан кейін қайталаңыз немесе WhatsApp-қа жазыңыз.',
  invalid: 'Форма өрістерін тексеріңіз.',
  errors: {
    name: 'Атыңызды жазыңыз: 2-ден 80 таңбаға дейін.',
    contact: 'Телефонды +7 (777) 000-00-00 форматында жазыңыз.',
    message: 'Хабарлама 2000 таңбадан аспауы керек.',
    channel: 'Қалай жауап беру керегін таңдаңыз.',
  },
  modalTitle: 'Өтінім қалдыру',
  modalSubtitle: 'Таңдалған арна бойынша жұмыс уақытында жауап береміз',
  close: 'Жабу',
  done: 'Дайын',
};
