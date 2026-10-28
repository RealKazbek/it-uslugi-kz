import type { LeadDict } from '../types';

export const leadEn: LeadDict = {
  labels: { name: 'Name', contact: 'Phone, Telegram or email', channel: 'How to reply', message: 'Your task' },
  channels: { whatsapp: 'WhatsApp', telegram: 'Telegram', phone: 'Phone', email: 'Email' },
  placeholders: { name: 'What should I call you', contact: '+7 777 000 00 00 or @username', message: 'Briefly describe the task' },
  submit: 'Send request',
  sending: 'Sending…',
  success: 'Request sent. I will reply in the channel you chose.',
  error: 'The request could not be sent. Please message me on WhatsApp or Telegram.',
  throttled: 'Too many requests in a short time. Try again in a few minutes or message me on WhatsApp.',
  invalid: 'Please check the form fields.',
  errors: {
    name: 'Enter your name: 2 to 80 characters.',
    contact: 'Enter a contact: 3 to 100 characters.',
    message: 'The message must be 2000 characters or fewer.',
    channel: 'Choose how I should reply.',
  },
};
