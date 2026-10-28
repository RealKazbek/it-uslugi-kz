import { layout, ctaButtons } from '../lib/layout.js';
import { config } from '../data/config.js';
import { esc } from '../lib/escape.js';
import { urls, abs, tgUrl, waUrl } from '../lib/urls.js';
import { pick } from '../lib/hash.js';
import { fmt, priceWithUnit, unitText } from '../lib/price.js';
import { T } from '../lib/i18n.js';
import { termText, cap, endDot, lcName } from '../lib/text.js';
import { svcRef } from '../lib/refs.js';
import { nicheSite } from '../lib/niche.js';
import { services, cities, niches, serviceBy, cityBy, nicheBy } from '../lib/data.js';
import { linkCols, faqHtml, ctaBlock } from '../lib/components.js';
import { professionalService, faqPage } from '../lib/jsonld.js';
import { add } from '../lib/site.js';
import { present } from './ctx.js';
import { fit, TITLE_MAX, DESC_MAX } from '../lib/fit.js';
import { shortOf } from '../content/names.js';

const noBrand = (s) => s.replace(/ \| RK Dev$/, '');

const minPrice = Math.min(...services.map((s) => s.priceFrom));
const siteServices = services.filter((s) => s.site);
const minSitePrice = Math.min(...(siteServices.length ? siteServices : services).map((s) => s.priceFrom));
// Kazakh: city attributive form + lowercase service name ("Оралдағы лендинг").
const kkPhrase = (c, name) => `${c.kk.attr} ${lcName(name)}`;
const from = (lang, n) => (lang === 'ru' ? `от ${fmt(n)}` : `${fmt(n)} бастап`);
const pairs = (pathRu, pathKk) => ({ ru: pathRu, kk: pathKk });

// ---------- home ----------
function home(lang) {
  const t = T[lang];
  const path = urls.home(lang);
  const ru = lang === 'ru';
  const svcLinks = services.map((s) => ({
    href: urls.serviceHub(lang, s.slug),
    text: s.name[lang],
    hint: from(lang, s.priceFrom),
  }));
  const cityLinks = cities.map((c) => ({ href: urls.cityHub(lang, c.slug), text: c[lang].name }));
  const facts = config.person.facts[lang].map((f) => `<li>${esc(f)}</li>`).join('');
  const description = ru
    ? `Фриланс-разработчик из Алматы: сайты, Telegram-боты, AI-ассистенты, CRM и автоматизация для бизнеса по всему Казахстану. Цены от ${fmt(minPrice)}.`
    : `Алматыдағы фриланс әзірлеуші: бизнеске сайттар, Telegram-боттар, ЖИ-көмекшілер, CRM және автоматтандыру. Бағасы ${fmt(minPrice)} бастап.`;
  const main = `<h1>${esc(t.hub.homeH1)}</h1>
<p class="lead">${esc(t.hub.homeLead)}</p>
<p class="btns">${ctaButtons(lang, t.ui.defaultMsg, { mail: true })}</p>
<section><h2>${esc(t.ui.services)}</h2>${linkCols(svcLinks)}</section>
<section><h2>${esc(t.ui.cities)}</h2>${linkCols(cityLinks)}</section>
<section><h2>${esc(ru ? 'Сайты для вашей отрасли' : 'Өз салаңызға сайт')}</h2>
<p>${ru ? `Подготовлены страницы для ${niches.length} видов бизнеса: от стоматологий до грузоперевозок.` : `${niches.length} бизнес түріне арналған беттер дайындалған (орыс тілінде).`} <a href="${urls.nicheIndex()}">${esc(t.ui.nav.niches)}</a></p></section>
<section><h2>${esc(ru ? 'Обо мне' : 'Мен туралы')}</h2><p><strong>${esc(config.person.name[lang])}</strong> — ${esc(config.person.role[lang])}.</p><ul class="ticks">${facts}</ul>
<p>${esc(ru ? 'Стек:' : 'Стек:')} ${esc(config.stack.join(', '))}.</p>
<p><a href="${urls.prices()}">${esc(t.ui.nav.prices)}</a> · <a href="${urls.portfolio()}">${esc(t.ui.nav.portfolio)}</a> · <a href="${urls.contacts()}">${esc(t.ui.nav.contacts)}</a></p></section>`;
  const alternates = pairs('/', '/kk/');
  add(path, layout({ lang, title: t.hub.homeTitle, description, path, alternates, main, jsonld: [professionalService({ lang })] }), alternates);
}

// ---------- service hub ----------
function serviceHub(lang, s) {
  const t = T[lang];
  const ru = lang === 'ru';
  const path = urls.serviceHub(lang, s.slug);
  const days = termText(lang, s);
  const cityLinks = cities.map((c) => ({
    href: urls.serviceCity(lang, s.slug, c.slug),
    text: ru ? `${s.name.ru} ${c.ru.loc}` : kkPhrase(c, s.name.kk),
  }));
  const kkName = lcName(s.name.kk);
  const shortName = shortOf(s.slug, lang, s.name[lang]);
  const shortKk = lcName(shortOf(s.slug, 'kk', s.name.kk));
  const mkTitle = (nm, nmKk) => (ru ? `${nm} в Казахстане — от ${fmt(s.priceFrom)} | RK Dev` : `Қазақстандағы ${nmKk} — ${fmt(s.priceFrom)} бастап | RK Dev`);
  const title = fit([mkTitle(s.name.ru, kkName), mkTitle(shortName, shortKk), noBrand(mkTitle(shortName, shortKk)), noBrand(mkTitle(s.name.ru, kkName))], TITLE_MAX);
  const descBase = ru ? `${endDot(s.short.ru)} Цена от ${fmt(s.priceFrom)} ${unitText('ru', s.unit)}.` : `${endDot(s.short.kk)} Бағасы ${fmt(s.priceFrom)} бастап (${unitText('kk', s.unit)}).`;
  const descTail = ru ? ' Работаю удалённо по всему Казахстану, в Алматы возможна личная встреча.' : ' Қазақстан бойынша қашықтан жұмыс істеймін.';
  const description = fit([descBase + descTail, descBase], DESC_MAX);
  const faq = s.faq.map((f) => ({ q: f.q[lang], a: f.a[lang] }));
  const incl = s.included[lang].map((i) => `<li>${esc(i)}</li>`).join('');
  const hx = { r: svcRef(s.name.ru), svcL: kkName, price: fmt(s.priceFrom) };
  const msg = t.msgHub(hx);
  const rel = present(s.related, serviceBy).map((r) => ({ href: urls.serviceHub(lang, r), text: serviceBy[r].name[lang], hint: from(lang, serviceBy[r].priceFrom) }));
  const main = `<h1>${esc(ru ? `${s.name.ru} в Казахстане — от ${fmt(s.priceFrom)}` : `Қазақстандағы ${kkName} — ${fmt(s.priceFrom)} бастап`)}</h1>
<p class="lead">${esc(endDot(s.short[lang]))} ${esc(t.ui.audience)}: ${esc(endDot(s.audience[lang]))}</p>
<section><h2>${esc(ru ? 'Что входит в базовую цену' : 'Негізгі бағаға не кіреді')}</h2><ul class="ticks">${incl}</ul>
<p>${esc(ru ? 'Цена' : 'Баға')}: <strong>${esc(from(lang, s.priceFrom))}</strong>, ${esc(unitText(lang, s.unit))}${days ? ` · ${esc(days)}` : ''}.</p></section>
<section><h2>${esc(ru ? `Выберите город для услуги «${s.name.ru}»` : `«${cap(kkName)}» қызметі үшін қаланы таңдаңыз`)}</h2>${linkCols(cityLinks)}</section>
${faqHtml(t.ui.faq, faq)}
${rel.length ? `<section><h2>${esc(ru ? 'Связанные услуги' : 'Байланысты қызметтер')}</h2>${linkCols(rel)}</section>` : ''}
${ctaBlock(lang, pick(t.ctaHub(hx), path), msg)}`;
  const alternates = pairs(urls.serviceHub('ru', s.slug), urls.serviceHub('kk', s.slug));
  const crumbs = [{ name: t.ui.nav.home, path: urls.home(lang) }, { name: s.name[lang], path }];
  add(path, layout({ lang, title, description, path, alternates, crumbs, main, jsonld: [professionalService({ lang }), faqPage(faq)], ctaMsg: msg }), alternates);
}

// ---------- city hub ----------
function cityHub(lang, c) {
  const t = T[lang];
  const ru = lang === 'ru';
  const path = urls.cityHub(lang, c.slug);
  const svcLinks = services.map((s) => ({
    href: urls.serviceCity(lang, s.slug, c.slug),
    text: ru ? `${s.name.ru} ${c.ru.loc}` : kkPhrase(c, s.name.kk),
    hint: from(lang, s.priceFrom),
  }));
  const nicheList = ru ? niches : present(c.nicheFocus, nicheBy).map((n) => nicheBy[n]);
  const nicheLinks = nicheList.map((n) => ({
    href: urls.nicheCity(n.slug, c.slug),
    text: `Сайт для ${n.forRu} ${c.ru.loc}`,
    lang: ru ? undefined : 'ru',
  }));
  const title0 = ru ? `IT-услуги ${c.ru.loc}: сайты, боты, автоматизация | RK Dev` : `${c.kk.attr} IT-қызметтер: сайттар, боттар, автоматтандыру | RK Dev`;
  const title = fit([title0, noBrand(title0)], TITLE_MAX);
  const description = ru
    ? `Сайты, Telegram-боты и автоматизация ${c.ru.loc}: ${services.length} услуг с ценами от ${fmt(minPrice)}. ${c.inPerson ? 'Возможна личная встреча.' : 'Работа удалённо.'}`
    : `${c.kk.attr} сайттар, Telegram-боттар және автоматтандыру: ${services.length} қызмет, бағасы ${fmt(minPrice)} бастап. ${c.inPerson ? 'Жеке кездесуге болады.' : 'Қашықтан жұмыс.'}`;
  const sectors = c.sectors[lang].join(', ');
  const lead = ru
    ? `${endDot(c.context.ru)} Здесь собраны услуги RK Dev для бизнеса ${c.ru.loc}: цены, сроки и страницы по отдельным нишам. ${c.inPerson ? 'Я живу в Алматы, поэтому возможна личная встреча.' : 'Работаю удалённо: звонки, Telegram, показ экрана.'}`
    : `${endDot(c.context.kk)} Мұнда ${c.kk.attr} бизнеске арналған RK Dev қызметтері жиналған: бағалар, мерзімдер және салалар бойынша беттер. ${c.inPerson ? 'Мен Алматыда тұрамын, сондықтан жеке кездесуге болады.' : 'Қашықтан жұмыс істеймін: қоңырау, Telegram, экранды көрсету.'}`;
  const main = `<h1>${esc(ru ? `IT-услуги ${c.ru.loc}` : `${c.kk.attr} IT-қызметтер`)}</h1>
<p class="lead">${esc(lead)}</p>
<p>${esc(ru ? `Заметные сферы города: ${sectors}.` : `${c.kk.attr} басты салалар: ${sectors}.`)}</p>
<section><h2>${esc(ru ? `Все услуги ${c.ru.loc}` : `${c.kk.attr} барлық қызметтер`)}</h2>${linkCols(svcLinks)}</section>
<section><h2>${esc(ru ? `Сайты для бизнеса ${c.ru.loc} по нишам` : `${c.kk.attr} бизнеске арналған салалық сайттар`)}</h2>${linkCols(nicheLinks)}${ru ? '' : '<p class="note">Салалар беттері орыс тілінде.</p>'}</section>`;
  const alternates = pairs(urls.cityHub('ru', c.slug), urls.cityHub('kk', c.slug));
  const crumbs = [{ name: t.ui.nav.home, path: urls.home(lang) }, { name: c[lang].name, path }];
  const msg = ru ? `Здравствуйте! Хочу обсудить задачу для бизнеса ${c.ru.loc}.` : `Сәлеметсіз бе! ${c.kk.attr} бизнес үшін тапсырманы талқылағым келеді.`;
  add(path, layout({ lang, title, description, path, alternates, crumbs, main, jsonld: [professionalService({ lang, cityName: c.ru.name })], ctaMsg: msg }), alternates);
}

// ---------- niches ----------
function nicheIndex() {
  const t = T.ru;
  const path = urls.nicheIndex();
  const links = niches.map((n) => ({ href: urls.nicheHub(n.slug), text: `Сайт для ${n.forRu}` }));
  const main = `<h1>Сайты для бизнеса по нишам</h1>
<p class="lead">Выберите свою отрасль: для каждой описано, какие страницы и функции нужны сайту, какие услуги подойдут и сколько это стоит. Цены на сайты стартуют от ${esc(fmt(minSitePrice))}.</p>
<section><h2>Все ниши (${niches.length})</h2>${linkCols(links)}</section>`;
  add(path, layout({ lang: 'ru', title: 'Сайты для бизнеса по нишам — каталог | RK Dev', description: `Каталог страниц «сайт для…»: ${niches.length} видов бизнеса, состав сайта, услуги и цены в городах Казахстана.`, path, crumbs: [{ name: t.ui.nav.home, path: '/' }, { name: t.ui.nav.niches, path }], main }));
}

function nicheHub(n) {
  const t = T.ru;
  const path = urls.nicheHub(n.slug);
  const { fitting, price } = nicheSite(n);
  const cityLinks = cities.map((c) => ({ href: urls.nicheCity(n.slug, c.slug), text: `Сайт для ${n.forRu} ${c.ru.loc}` }));
  const svcLinks = fitting.map((s) => ({ href: urls.serviceHub('ru', s.slug), text: s.name.ru, hint: `от ${priceWithUnit('ru', s.priceFrom, s.unit)}` }));
  const features = n.features.map((f) => `<li>${esc(f)}</li>`).join('');
  const main = `<h1>Сайт для ${esc(n.forRu)} — от ${esc(fmt(price))}</h1>
<p class="lead">Каким должен быть сайт для ${esc(n.forRu)}, из каких страниц он состоит и сколько стоит разработка. Выберите город, чтобы увидеть локальную страницу.</p>
<section><h2>Что нужно на сайте</h2><ul class="ticks">${features}</ul></section>
<section><h2>Подходящие услуги</h2>${linkCols(svcLinks)}</section>
<section class="qa"><h2>Вопрос клиентов</h2><p><strong>${esc(n.question)}</strong></p><p>${esc(n.answer)}</p></section>
<section><h2>Выберите город</h2>${linkCols(cityLinks)}</section>`;
  const msg = `Здравствуйте! Нужен сайт для ${n.forRu}. Хочу обсудить задачу.`;
  add(path, layout({ lang: 'ru', title: fit([`Сайт для ${n.forRu} в Казахстане — от ${fmt(price)} | RK Dev`, `Сайт для ${n.forRu} в Казахстане — от ${fmt(price)}`, `Сайт для ${n.forRu} — от ${fmt(price)} | RK Dev`, `Сайт для ${n.forRu} — от ${fmt(price)}`], TITLE_MAX), description: `Сайт для ${n.forRu}: состав страниц, подходящие услуги и цены от ${fmt(price)}. Страницы по ${cities.length} городам Казахстана.`, path, crumbs: [{ name: t.ui.nav.home, path: '/' }, { name: t.ui.nav.niches, path: urls.nicheIndex() }, { name: cap(n.name.ru), path }], main, ctaMsg: msg }));
}

// ---------- prices / portfolio / contacts / 404 ----------
function prices() {
  const path = urls.prices();
  const rows = services.map((s) => `<tr><th scope="row"><a href="${urls.serviceHub('ru', s.slug)}">${esc(s.name.ru)}</a></th><td class="num">от ${esc(fmt(s.priceFrom))}<span class="unit"> ${esc(unitText('ru', s.unit))}</span></td><td>${esc(unitText('ru', s.unit))}</td><td>${esc(termText('ru', s) || '—')}</td></tr>`).join('');
  const main = `<h1>Цены на IT-услуги — от ${esc(fmt(minPrice))}</h1>
<p class="lead">Полный прайс-лист RK Dev. Все цены стартовые: итоговая сумма зависит от объёма работ и называется до начала. Цена не зависит от города — работаю по всему Казахстану.</p>
<div class="table-wrap"><table class="prices"><thead><tr><th scope="col">Услуга</th><th scope="col">Цена</th><th scope="col">Формат</th><th scope="col">Срок или старт</th></tr></thead><tbody>${rows}</tbody></table></div>
<section><h2>Услуги в вашем городе</h2>${linkCols(cities.map((c) => ({ href: urls.cityHub('ru', c.slug), text: c.ru.name })))}</section>
${ctaBlock('ru', { title: 'Нужна точная смета?', text: 'Опишите задачу в Telegram — назову сумму и срок.' }, 'Здравствуйте! Хочу уточнить смету.')}`;
  add(path, layout({ lang: 'ru', title: `Цены на сайты, ботов и автоматизацию — от ${fmt(minPrice)} | RK Dev`, description: `Прайс-лист на ${services.length} услуг: сайты, Telegram-боты, CRM, SEO, автоматизация. Стартовые цены в тенге и сроки.`, path, crumbs: [{ name: 'Главная', path: '/' }, { name: 'Цены', path }], main }));
}

function portfolio() {
  const path = urls.portfolio();
  const items = config.portfolio.map((p) => {
    const title = typeof p.title === 'string' ? p.title : p.title.ru;
    const links = p.links.map((l) => `<a href="${esc(l.url)}" rel="noopener">${esc(l.label.ru)}</a>`).join(' · ');
    return `<article class="work"><h2>${esc(title)}</h2><p>${esc(p.description.ru)}</p>${p.stack.length ? `<p class="hint">${esc(p.stack.join(', '))}</p>` : ''}<p>${links}</p></article>`;
  }).join('');
  const main = `<h1>Портфолио</h1>
<p class="lead">Несколько работ, которые можно открыть и посмотреть самому. Больше — на <a href="${esc(config.portfolioUrl)}" rel="noopener">${esc(config.portfolioUrl.replace('https://', ''))}</a> и в <a href="${esc(config.github)}" rel="noopener">GitHub</a>.</p>
${items}
<p>Стек: ${esc(config.stack.join(', '))}.</p>
${ctaBlock('ru', { title: 'Нужно что-то подобное?', text: 'Расскажите о задаче в Telegram.' }, 'Здравствуйте! Посмотрел портфолио, хочу обсудить задачу.')}`;
  add(path, layout({ lang: 'ru', title: 'Портфолио: сайт TerraCon, AI-ассистент, Car | RK Dev', description: 'Примеры работ: сайт на Next.js для TerraCon, AI-ассистент для Telegram Business на aiogram и демо-проект Car.', path, crumbs: [{ name: 'Главная', path: '/' }, { name: 'Портфолио', path }], main }));
}

function contacts() {
  const path = urls.contacts();
  const li = [`<li>Telegram: <a href="${esc(tgUrl())}" rel="noopener">@${esc(config.telegram)}</a></li>`];
  if (config.email) li.push(`<li>Email: <a href="mailto:${esc(config.email)}">${esc(config.email)}</a></li>`);
  if (config.whatsapp) li.push(`<li>WhatsApp: <a href="${esc(waUrl())}" rel="noopener">написать</a></li>`);
  if (config.phone) li.push(`<li>Телефон: <a href="tel:${esc(config.phone)}">${esc(config.phone)}</a></li>`);
  li.push(`<li>Сайт-портфолио: <a href="${esc(config.portfolioUrl)}" rel="noopener">${esc(config.portfolioUrl.replace('https://', ''))}</a></li>`);
  li.push(`<li>GitHub: <a href="${esc(config.github)}" rel="noopener">RealKazbek</a></li>`);
  const facts = config.person.facts.ru.map((f) => `<li>${esc(f)}</li>`).join('');
  const main = `<h1>Контакты</h1>
<p class="lead">Самый быстрый способ связаться — Telegram. Опишите задачу в паре предложений, и я отвечу.</p>
<p class="btns">${ctaButtons('ru', 'Здравствуйте! Хочу обсудить задачу.', { phone: true, mail: true })}</p>
<section><h2>Где меня найти</h2><ul class="ticks">${li.join('')}</ul></section>
<section><h2>Кто я</h2><p><strong>${esc(config.person.name.ru)}</strong> — ${esc(config.person.role.ru)}.</p><ul class="ticks">${facts}</ul></section>
<section><h2>Что делать дальше</h2><p><a href="${urls.prices()}">Посмотреть цены</a>, <a href="${urls.portfolio()}">открыть портфолио</a> или <a href="${urls.nicheIndex()}">найти страницу для своей отрасли</a>.</p></section>`;
  add(path, layout({ lang: 'ru', title: 'Контакты: Telegram, email | RK Dev', description: `Как связаться с RK Dev: Telegram @${config.telegram}, email, портфолио и GitHub. Фриланс-разработчик из Алматы.`, path, crumbs: [{ name: 'Главная', path: '/' }, { name: 'Контакты', path }], main }));
}

function notFound() {
  const path = urls.notFound();
  const main = `<h1>Страница не найдена</h1><p class="lead">Такой страницы нет. Вернитесь на <a href="/">главную</a> или откройте <a href="${urls.prices()}">цены</a>.</p>`;
  add(path, layout({ lang: 'ru', title: 'Страница не найдена | RK Dev', description: 'Запрошенная страница не найдена. Перейдите на главную страницу RK Dev или к прайс-листу.', path, main, noindex: true }), null, { indexable: false });
}

export function buildHubs() {
  for (const lang of ['ru', 'kk']) {
    home(lang);
    for (const s of services) serviceHub(lang, s);
    for (const c of cities) cityHub(lang, c);
  }
  nicheIndex();
  for (const n of niches) nicheHub(n);
  prices();
  portfolio();
  contacts();
  notFound();
}
