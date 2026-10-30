import type { ProductDict } from '../types';

export const productEn: ProductDict = {
  descriptionTemplate: (short, priceText) => `${short} Price ${priceText}. Remote work from Kazakhstan.`,
  remote: 'Remote work from Kazakhstan.',
  estimate: 'What is included',
  total: 'Price',
  forWhom: 'Who it is for',
  notIncluded: 'Not included',
  notIncludedLead: 'To avoid surprises, here is what the base price does not cover and what is discussed separately:',
  process: 'How the work goes',
  related: 'You may also need',
  faq: 'FAQ',
  ctaTitle: 'Shall we discuss your project?',
  ctaText: 'The product name and a link to this page are filled into the WhatsApp message for you.',
  priceNote: 'This is a starting price; we give the final amount before work starts. USD is approximate.',
  payNote: 'Payment terms and our status',
  leadTitle: 'Or send a request',
  leadText: 'We will reply in the channel you choose: WhatsApp, Telegram, phone or email. Your contact is used only to reply.',
  galleryLabel: 'Photos',
  photoAlt: (title, n) => `${title}: illustration ${n}`,
  orderTitle: 'Order',
  orderHint: 'The service name is added to the message for you.',
};
