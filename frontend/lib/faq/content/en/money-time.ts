import type { FaqGroup } from '../../site';

export const moneyTimeEn: FaqGroup[] = [
  {
    id: 'payment',
    title: 'Payment and prices',
    items: [
      { id: 'pay-split', q: 'How does payment work?', a: 'Payment is split in two: 50% before work starts and 50% after the project is delivered. Both stages are recorded in a written agreement.' },
      { id: 'price-from', q: 'What does "from" mean in a price?', a: 'It is the starting price of the basic set of work described on the product page. The final amount depends on the scope and is named before work begins.' },
      { id: 'price-factors', q: 'What affects the price?', a: 'The scope: number of pages or screens, integrations, languages, design needs and timing. The clearer the brief, the more accurate the estimate.' },
      { id: 'pay-methods', q: 'Can I pay by bank transfer or Kaspi?', a: 'We accept card transfers and Kaspi transfers. If your accounting needs a document about the payment, tell us before you pay and we will say what we can prepare.' },
      { id: 'price-no-hidden', q: 'Are there any hidden fees?', a: 'No. The estimate covers everything agreed in the order. Any extra work is described and agreed before we start it.' },
    ],
  },
  {
    id: 'timing',
    title: 'Timelines',
    items: [
      { id: 'time-typical', q: 'How long does the work take?', a: 'It depends on the task. A landing page takes a few days; a site with a catalogue and a bot usually takes several weeks. We name the exact timeline before work starts and record it in the agreement.' },
      { id: 'time-start', q: 'When can we start?', a: 'The start date depends on our current workload. Send us your task and we will name the nearest start date.' },
      { id: 'time-delay', q: 'What if materials are late?', a: 'The timeline moves by as many days as texts, photos or access were late. We warn you about this in advance in the chat.' },
    ],
  },
];
