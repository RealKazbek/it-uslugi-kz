import type { FaqGroup } from '../../site';

export const rightsRemoteEn: FaqGroup[] = [
  {
    id: 'rights-code',
    title: 'Rights and code',
    items: [
      { id: 'code-owner', q: 'Who owns the code and materials?', a: 'The code, files and access are handed over to you after full payment. The project is yours, and we do not keep it.' },
      { id: 'access', q: 'Will I get access to the site and admin panel?', a: 'Yes. We register all logins and access in your name or hand them over at delivery. We do not keep anything only on our side.' },
      { id: 'domain', q: 'Will the domain and accounts be in my name?', a: 'Yes. We register the domain, hosting, email and services in your name. We only help with the setup.' },
      { id: 'no-lock', q: 'Can the project be moved to another team?', a: 'Yes. We do not lock you in: the project can be passed to another developer. Documentation and launch instructions are part of the handover.' },
    ],
  },
  {
    id: 'remote-kz',
    title: 'Remote work across Kazakhstan',
    items: [
      { id: 'remote-cities', q: 'Do you work outside Almaty?', a: 'Yes, we work remotely with clients in any city in Kazakhstan. Prices do not depend on the city.' },
      { id: 'no-visit', q: 'Do I need to visit an office?', a: 'No. The whole process runs online: chat, calls and screen sharing. An in-person meeting is possible if you prefer, but it is not required.' },
      { id: 'time-zones', q: 'How do you handle time zones?', a: 'We agree on call times and reply hours in advance, taking your time zone into account.' },
      { id: 'calls', q: 'Can we have a call?', a: 'Yes, a call or screen share can be scheduled in WhatsApp or Telegram. One or two calls during the brief stage are usually enough.' },
    ],
  },
];
