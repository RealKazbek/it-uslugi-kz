import { normalize } from './normalize';

/** Each group lists words that mean the same thing. Matching is symmetric within a group. */
const GROUPS: readonly (readonly string[])[] = [
  ['тг', 'tg', 'телега', 'телеграм', 'telegram'],
  ['ватсап', 'вотсап', 'вацап', 'whatsapp', 'wa'],
  ['бот', 'bot', 'боты', 'bots', 'чатбот', 'chatbot'],
  ['сайт', 'сайты', 'site', 'website', 'веб', 'web', 'лендинг', 'landing'],
  ['магазин', 'магазины', 'shop', 'store', 'ecommerce'],
  ['инста', 'instagram', 'инстаграм'],
  ['каспи', 'kaspi'],
  ['ии', 'ai', 'нейро', 'нейросеть', 'gpt', 'чатгпт'],
  ['црм', 'crm'],
  ['видеонаблюдение', 'cctv', 'камеры'],
  ['обучение', 'учеба', 'учёба', 'репетитор', 'tutor', 'learn'],
  ['бағдарлама', 'бағдарламалар', 'программа', 'программы', 'program'],
  ['оқыту', 'курс', 'курсы', 'course'],
];

const GROUP_BY_TOKEN: ReadonlyMap<string, readonly string[]> = buildGroupIndex(GROUPS);

function buildGroupIndex(groups: readonly (readonly string[])[]): Map<string, readonly string[]> {
  const index = new Map<string, readonly string[]>();
  for (const group of groups) {
    const members = [...new Set(group.map(normalize))];
    for (const member of members) index.set(member, members);
  }
  return index;
}

/** Returns the token itself plus every synonym of it (empty list of synonyms if unknown). */
export function expandToken(token: string): string[] {
  const members = GROUP_BY_TOKEN.get(token) ?? [];
  return [token, ...members.filter((m) => m !== token)];
}
