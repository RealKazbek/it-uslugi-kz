const L = (ru, kk, en) => ({ ru, kk, en });
const faq = (n) => Array.from({ length: 3 }, (_, i) => ({
  q: L(`Вопрос ${i + 1} про ${n}?`, `${n} туралы ${i + 1}-сұрақ?`, `Question ${i + 1} about ${n}?`),
  a: L(`Ответ ${i + 1} про ${n}.`, `${n} туралы ${i + 1}-жауап.`, `Answer ${i + 1} about ${n}.`),
}));
const mk = (slug, category, ruT, kkT, enT, priceFrom, unit, days, related) => ({
  slug, category,
  title: L(ruT, kkT, enT),
  short: L(`Короткое описание: ${ruT}.`, `Қысқаша сипаттама: ${kkT}.`, `Short description: ${enT}.`),
  description: L(`Подробное описание продукта ${ruT} для проверки шаблона.`, `${kkT} өнімінің шаблонды тексеруге арналған толық сипаттамасы.`, `A longer description of ${enT} used to test the template.`),
  priceFrom, unit, days,
  includes: {
    ru: [1, 2, 3, 4, 5].map((i) => `${ruT}: пункт ${i}`),
    kk: [1, 2, 3, 4, 5].map((i) => `${kkT}: ${i}-тармақ`),
    en: [1, 2, 3, 4, 5].map((i) => `${enT}: item ${i}`),
  },
  notIncluded: { ru: [`${ruT}: не входит A`, `${ruT}: не входит B`], kk: [`${kkT}: кірмейді A`, `${kkT}: кірмейді B`], en: [`${enT}: excluded A`, `${enT}: excluded B`] },
  forWhom: L(`Для тех, кому нужен ${ruT}.`, `${kkT} қажет адамдарға арналған.`, `For anyone who needs ${enT}.`),
  faq: faq(slug).map((f) => ({ q: { ru: f.q.ru.replace('про', ruT), kk: f.q.kk, en: f.q.en.replace('about', enT) }, a: f.a })),
  relatedProducts: related,
});
export const products = [
  mk('lending', 'websites', 'Лендинг', 'Лендинг', 'Landing page', 45000, 'once', { min: 3, max: 7 }, ['sait-vizitka', 'telegram-bot-zapis', 'x-missing']),
  mk('sait-vizitka', 'websites', 'Сайт-визитка', 'Сайт-визитка', 'Business-card website', 35000, 'once', { min: 0, max: 1 }, ['lending', 'podderzhka-saita']),
  mk('telegram-bot-zapis', 'bots', 'Бот для записи', 'Жазылу боты', 'Booking bot', 35000, 'once', { min: 4, max: 8 }, ['lending', 'seo-prodvizhenie']),
  mk('seo-prodvizhenie', 'seo-maps', 'SEO-продвижение', 'SEO жылжыту', 'SEO promotion', 40000, 'month', { min: 1, max: 3 }, ['lending', 'podderzhka-saita']),
  mk('podderzhka-saita', 'support', 'Поддержка сайта', 'Сайтты қолдау', 'Website support', 15000, 'month', { min: 1, max: 2 }, ['lending', 'sait-vizitka']),
  mk('kompyuternaya-pomosch', 'support', 'Компьютерная помощь', 'Компьютерлік көмек', 'Remote computer help', 3000, 'hour', { min: 1, max: 1 }, ['podderzhka-saita', 'repetitor-programmirovaniya']),
  mk('repetitor-programmirovaniya', 'education', 'Репетитор по программированию', 'Бағдарламалау репетиторы', 'Programming tutor', 4000, 'lesson', { min: 1, max: 3 }, ['kompyuternaya-pomosch', 'lending']),
  mk('ai-assistent-telegram', 'ai', 'AI-ассистент в Telegram', 'Telegram-дағы ЖИ-көмекші', 'AI assistant in Telegram', 60000, 'once', { min: 7, max: 14 }, ['telegram-bot-zapis', 'lending']),
];
