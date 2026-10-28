import type { LeadDict } from '../types';

export const leadRu: LeadDict = {
  labels: { name: 'Имя', contact: 'Телефон, Telegram или email', channel: 'Как ответить', message: 'Задача' },
  channels: { whatsapp: 'WhatsApp', telegram: 'Telegram', phone: 'Телефон', email: 'Email' },
  placeholders: { name: 'Как к вам обращаться', contact: '+7 777 000 00 00 или @username', message: 'Коротко опишите задачу' },
  submit: 'Отправить заявку',
  sending: 'Отправляем…',
  success: 'Заявка отправлена. Отвечу в выбранном канале.',
  error: 'Не удалось отправить заявку. Напишите в WhatsApp или Telegram.',
  throttled: 'Слишком много заявок за короткое время. Попробуйте через несколько минут или напишите в WhatsApp.',
  invalid: 'Проверьте поля формы.',
  errors: {
    name: 'Укажите имя: от 2 до 80 символов.',
    contact: 'Укажите контакт: от 3 до 100 символов.',
    message: 'Сообщение не длиннее 2000 символов.',
    channel: 'Выберите, как ответить.',
  },
};
