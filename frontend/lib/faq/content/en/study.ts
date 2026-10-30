import type { FaqGroup } from '../../site';

export const studyEn: FaqGroup[] = [
  {
    id: 'study',
    title: 'Study',
    items: [
      { id: 'study-help', q: 'How do you help students?', a: 'We explain the topic, go through the difficult parts together and check that you understood. This way you learn it yourself.' },
      { id: 'study-work', q: 'Do you do students’ work for them?', a: 'No. We do not write or complete work on behalf of students. We help them understand the material, and the student does the work themselves.' },
      { id: 'study-check', q: 'How do you check knowledge?', a: 'We go through the tasks together, then you solve similar ones yourself and we check the answers. This shows whether the topic has been learned.' },
      { id: 'study-format', q: 'How do lessons run?', a: 'Online, in WhatsApp, Telegram or by call. We agree on topics and a schedule in advance.' },
    ],
  },
];
