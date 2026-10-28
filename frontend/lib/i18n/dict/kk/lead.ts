import type { LeadDict } from '../types';

export const leadKk: LeadDict = {
  labels: { name: 'Аты', contact: 'Телефон, Telegram немесе email', channel: 'Қалай жауап беру керек', message: 'Тапсырма' },
  channels: { whatsapp: 'WhatsApp', telegram: 'Telegram', phone: 'Телефон', email: 'Email' },
  placeholders: { name: 'Сізге қалай жүгінейін', contact: '+7 777 000 00 00 немесе @username', message: 'Тапсырманы қысқаша сипаттаңыз' },
  submit: 'Өтінім жіберу',
  sending: 'Жіберіліп жатыр…',
  success: 'Өтінім жіберілді. Таңдалған арна бойынша жауап беремін.',
  error: 'Өтінімді жіберу мүмкін болмады. WhatsApp немесе Telegram-ға жазыңыз.',
  throttled: 'Қысқа уақыт ішінде тым көп өтінім. Бірнеше минуттан кейін қайталаңыз немесе WhatsApp-қа жазыңыз.',
  invalid: 'Форма өрістерін тексеріңіз.',
  errors: {
    name: 'Атыңызды жазыңыз: 2-ден 80 таңбаға дейін.',
    contact: 'Байланысты жазыңыз: 3-тен 100 таңбаға дейін.',
    message: 'Хабарлама 2000 таңбадан аспауы керек.',
    channel: 'Қалай жауап беру керегін таңдаңыз.',
  },
};
