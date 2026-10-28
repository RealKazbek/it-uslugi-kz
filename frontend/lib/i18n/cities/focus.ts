// City-specific reason for a recommended product. The sentence combines the city's own sector
// (from the backend data) with a category sentence. City pages exist in ru and kk only.
import type { CityLang } from '@/lib/city/types';

type CategoryReasons = Record<string, string>;

const REASON_RU: CategoryReasons = {
  websites: 'сайт даёт клиентам понятный способ найти и выбрать вас.',
  ecommerce: 'магазин принимает заказы без ожидания звонка.',
  bots: 'бот отвечает клиентам круглосуточно и передаёт разговор вам.',
  ai: 'ассистент отвечает на типовые вопросы по вашей базе знаний.',
  automation: 'заявки попадают туда, где с ними работают, без ручной передачи.',
  'seo-maps': 'карточка на картах помогает найти вас рядом с клиентами.',
  support: 'сайт остаётся в рабочем состоянии, а правки делаются быстро.',
  education: 'занятия онлайн, в удобном для вас расписании.',
};

const REASON_KK: CategoryReasons = {
  websites: 'сайт клиенттерге сізді оңай табуға және таңдауға мүмкіндік береді.',
  ecommerce: 'дүкен қоңырауды күтпей-ақ тапсырыс қабылдайды.',
  bots: 'бот клиенттерге тәулік бойы жауап береді және әңгімені сізге береді.',
  ai: 'көмекші білім қоры бойынша типтік сұрақтарға жауап береді.',
  automation: 'өтінімдер қолмен көшірусіз қажетті жерге түседі.',
  'seo-maps': 'картадағы карточка сізді клиенттердің жанынан табуға көмектеседі.',
  support: 'сайт жұмыс күйінде қалады, түзетулер тез жасалады.',
  education: 'сабақтар онлайн, сізге ыңғайлы кестемен өтеді.',
};

export interface FocusContext {
  lang: CityLang;
  gen: string | null;
  attr: string | null;
  sectors: string[];
}

/** One sentence per (city, product): sector chosen by the product's position, then the category reason. */
export function focusReason(ctx: FocusContext, category: string, index: number): string {
  const sector = ctx.sectors.length > 0 ? ctx.sectors[index % ctx.sectors.length] : '';
  const reasons = ctx.lang === 'ru' ? REASON_RU : REASON_KK;
  const reason = reasons[category] ?? '';
  if (ctx.lang === 'ru') {
    const lead = ctx.gen ? `Для бизнеса ${ctx.gen}` : 'Для местного бизнеса';
    return `${lead}${sector ? `, где заметна сфера «${sector}»` : ''}: ${reason}`;
  }
  const lead = ctx.attr ? `${ctx.attr} бизнеске` : 'Жергілікті бизнеске';
  return `${lead}${sector ? `, мұнда «${sector}» маңызды` : ''}: ${reason}`;
}
