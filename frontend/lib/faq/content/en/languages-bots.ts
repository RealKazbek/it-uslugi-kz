import type { FaqGroup } from '../../site';

export const languagesBotsEn: FaqGroup[] = [
  {
    id: 'languages',
    title: 'Site languages',
    items: [
      { id: 'lang-three', q: 'What languages can a site be in?', a: 'Russian, Kazakh and English. Any combination is possible, and we add a language switcher to the site.' },
      { id: 'translation', q: 'How do you translate texts?', a: 'We translate for meaning, not word by word. We check terms and service names against your materials.' },
      { id: 'kk-check', q: 'Who checks the Kazakh text?', a: 'A native speaker checks the Kazakh text before it is published. If you prefer, you can also send the text to your own specialist for review.' },
    ],
  },
  {
    id: 'bots-ai',
    title: 'Bots and AI',
    items: [
      { id: 'bot-what', q: 'What can a bot do?', a: 'It answers typical questions, takes requests, shows the catalogue and prices, and passes the conversation to a manager. We describe the set of features in the brief.' },
      { id: 'whatsapp-vs-tg', q: 'WhatsApp or Telegram: which should I choose?', a: 'Telegram is quicker to launch and needs no separate phone number. WhatsApp is handier if your clients already write there, but connecting it needs separate setup and approval. We will advise based on your audience.' },
      { id: 'ai-limits', q: 'What can AI do, and where is a check needed?', a: 'AI helps answer typical questions and prepare drafts. It can make mistakes, so a person checks important answers and prices, and complex cases go to a manager.' },
      { id: 'data-privacy', q: 'How is client data protected?', a: 'We keep only the data needed for a request. Secret keys are stored in server settings, not in the code. Data processing terms are discussed in the agreement.' },
    ],
  },
];
