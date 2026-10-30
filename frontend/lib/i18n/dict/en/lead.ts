import type { LeadDict } from '../types';

export const leadEn: LeadDict = {
  labels: { name: 'Name', contact: 'Phone', channel: 'How to reply', message: 'Your task', service: 'Service' },
  channels: { whatsapp: 'WhatsApp', telegram: 'Telegram', phone: 'Call', email: 'Email' },
  placeholders: { name: 'What should we call you', contact: '+7 (___) ___-__-__', message: 'Briefly describe the task' },
  notSelected: 'Not selected',
  submit: 'Send request',
  sending: 'Sending…',
  success: 'Request sent. We will reply in the channel you chose.',
  error: 'The request could not be sent. Please message us on WhatsApp or Telegram.',
  throttled: 'Too many requests in a short time. Try again in a few minutes or message us on WhatsApp.',
  invalid: 'Please check the form fields.',
  errors: {
    name: 'Enter your name: 2 to 80 characters.',
    contact: 'Enter a phone number in the format +7 (777) 000-00-00.',
    message: 'The message must be 2000 characters or fewer.',
    channel: 'Choose how we should reply.',
  },
  modalTitle: 'Request a quote',
  modalSubtitle: 'We reply in the channel you choose during working hours',
  close: 'Close',
  done: 'Done',
};
