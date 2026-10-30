import type { LeadDict } from '../types';

export const leadRu: LeadDict = {
  labels: { name: 'Имя', contact: 'Телефон', channel: 'Как ответить', message: 'Задача', service: 'Услуга' },
  channels: { whatsapp: 'WhatsApp', telegram: 'Telegram', phone: 'Звонок', email: 'Email' },
  placeholders: { name: 'Как к вам обращаться', contact: '+7 (___) ___-__-__', message: 'Коротко опишите задачу' },
  notSelected: 'Не выбрано',
  submit: 'Отправить заявку',
  sending: 'Отправляем…',
  success: 'Заявка отправлена. Ответим в выбранном канале.',
  error: 'Не удалось отправить заявку. Напишите в WhatsApp или Telegram.',
  throttled: 'Слишком много заявок за короткое время. Попробуйте через несколько минут или напишите в WhatsApp.',
  invalid: 'Проверьте поля формы.',
  errors: {
    name: 'Укажите имя: от 2 до 80 символов.',
    contact: 'Укажите телефон в формате +7 (777) 000-00-00.',
    message: 'Сообщение не длиннее 2000 символов.',
    channel: 'Выберите, как ответить.',
  },
  modalTitle: 'Оставить заявку',
  modalSubtitle: 'Ответим в выбранном канале в рабочее время',
  close: 'Закрыть',
  done: 'Готово',
};
