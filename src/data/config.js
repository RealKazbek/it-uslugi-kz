// Site-wide settings. Edit contacts here. Empty whatsapp/phone hide the related buttons.
export const config = {
  brand: 'RK Dev',
  siteUrl: 'https://uslugi.realkazbek.site',
  telegram: 'RealKazbek',
  email: 'g7kazbek@gmail.com',
  whatsapp: '', // digits only, e.g. '77001234567'
  phone: '', // e.g. '+77001234567'
  portfolioUrl: 'https://realkazbek.site',
  github: 'https://github.com/RealKazbek',

  person: {
    name: { ru: 'Казбек Асанбек', kk: 'Қазбек Асанбек' },
    role: {
      ru: 'фриланс full-stack разработчик из Алматы',
      kk: 'Алматыдағы фриланс full-stack әзірлеуші',
    },
    facts: {
      ru: [
        'Живу и работаю в Алматы.',
        'Студент 3 курса, специальность Computer Engineering, IITU.',
        'Работаю как фрилансер: общаюсь с заказчиком напрямую, без менеджеров и посредников.',
      ],
      kk: [
        'Алматыда тұрамын және жұмыс істеймін.',
        'IITU-дың Computer Engineering мамандығының 3-курс студентімін.',
        'Фрилансер ретінде жұмыс істеймін: тапсырыс берушімен делдалсыз, тікелей сөйлесемін.',
      ],
    },
  },

  stack: [
    'React', 'Next.js', 'TypeScript', 'Django', 'DRF', 'PostgreSQL', 'Tailwind',
    'Python', 'aiogram', 'Docker', 'Nginx', 'GitHub Actions', 'Linux',
  ],

  portfolio: [
    {
      slug: 'terracon',
      title: 'TerraCon',
      stack: ['Next.js', 'Tailwind'],
      description: {
        ru: 'Сайт на Next.js и Tailwind для строительной компании, которая занимается спортивными покрытиями: каталог с фильтрами и корзина. Рядом работает Telegram-бот для связи с менеджером.',
        kk: 'Спорттық жабындармен айналысатын құрылыс компаниясына арналған Next.js пен Tailwind негізіндегі сайт: сүзгілері бар каталог және себет. Менеджермен байланысу үшін Telegram-бот та бар.',
      },
      links: [
        { label: { ru: 'Сайт terracon.kz', kk: 'terracon.kz сайты' }, url: 'https://terracon.kz' },
        { label: { ru: 'Telegram-бот', kk: 'Telegram-бот' }, url: 'https://t.me/terracon_manager_bot' },
      ],
    },
    {
      slug: 'telegram-business-ai',
      title: { ru: 'AI-ассистент для Telegram Business', kk: 'Telegram Business үшін AI-көмекші' },
      stack: ['Python', 'aiogram', 'DeepSeek'],
      description: {
        ru: 'Ассистент на Python и aiogram с моделью DeepSeek: отвечает клиентам по базе знаний, помнит диалог, имеет админ-панель. Когда владелец отвечает сам, ассистент автоматически замолкает на 60 минут.',
        kk: 'Python мен aiogram және DeepSeek моделі негізіндегі көмекші: клиенттерге білім қоры бойынша жауап береді, диалогты есте сақтайды, әкімшілік панелі бар. Иесі өзі жауап жазса, көмекші 60 минутқа автоматты түрде тоқтайды.',
      },
      links: [{ label: { ru: 'Демо в Telegram', kk: 'Telegram-дағы демо' }, url: 'https://t.me/RealKazbekBot' }],
    },
    {
      slug: 'car',
      title: 'Car',
      stack: [],
      description: {
        ru: 'Демонстрационный фронтенд-проект Car.',
        kk: 'Car — фронтендтің демонстрациялық жобасы.',
      },
      links: [{ label: { ru: 'Открыть демо', kk: 'Демоны ашу' }, url: 'https://realkazbek.github.io/Car/' }],
    },
  ],
};
