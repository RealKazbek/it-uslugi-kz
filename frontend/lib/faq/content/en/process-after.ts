import type { FaqGroup } from '../../site';

export const processAfterEn: FaqGroup[] = [
  {
    id: 'process',
    title: 'Working process',
    items: [
      { id: 'brief', q: 'What do you need to get started?', a: 'A short brief: what you sell or need done, who it is for, which sections you need and which examples you like. If you have no brief, we will put one together in a single conversation.' },
      { id: 'mockups', q: 'Will I see mockups before development?', a: 'Yes. We agree on the structure and mockups first, and development starts only after you confirm them. Changes are cheaper at this stage.' },
      { id: 'agreement', q: 'Is there a written agreement?', a: 'Yes. Before we start, we prepare a written agreement covering the scope, timeline, price and payment order. It is confirmed in writing before work begins. We work remotely, so everything is recorded in writing.' },
      { id: 'revisions', q: 'How many revisions are included?', a: 'Revisions to the approved mockup are included within reasonable limits, and the number is recorded in the agreement. New features that are not in the order are priced separately.' },
      { id: 'messengers', q: 'How do we communicate?', a: 'In WhatsApp or Telegram: questions, files and status updates. We schedule calls when needed, at a time that suits you.' },
    ],
  },
  {
    id: 'after-launch',
    title: 'After launch',
    items: [
      { id: 'support', q: 'Is there support after launch?', a: 'Yes. We fix bugs and answer questions about how the site or bot works. Support terms are set out in the agreement in advance.' },
      { id: 'edits', q: 'Can I request changes after launch?', a: 'Yes. Small text and photo changes are usually quick. Larger updates are estimated and agreed separately.' },
      { id: 'hosting', q: 'Who pays for hosting and the domain?', a: 'Hosting and the domain are registered in your name, and you pay renewals directly to the provider. We will advise what to choose and help with the setup.' },
      { id: 'backups', q: 'Do you make backups?', a: 'We make a backup of the project before launch and before major changes. How backups are stored is agreed in the agreement.' },
    ],
  },
];
