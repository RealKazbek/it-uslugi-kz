// Site-wide settings. Edit contacts, the USD rate and the legal text here.
export const config = {
  brand: 'RK Dev',
  siteUrl: 'https://uslugi.realkazbek.site',
  telegram: 'RealKazbek',
  email: '37765@iitu.edu.kz',
  whatsapp: '77066620060', // digits only
  phone: '+77066620060',
  phoneDisplay: '8 706 662 00 60',
  portfolioUrl: 'https://realkazbek.site',
  github: 'https://github.com/RealKazbek',
  usdRate: 500, // KZT per 1 USD, approximate; used for the "≈ $N" hints on en pages

  // The only place where the words about the legal status may appear (see scripts/check.js).
  legal: {
    ru: 'Работаю как самозанятое физическое лицо, без ИП и ТОО. Перед началом фиксируем объём работ и цену в письменном соглашении. Оплата: 50% предоплата и 50% после сдачи работы, переводом на Kaspi. Счёт-фактуры и НДС не выставляю.',
    kk: 'Өзін-өзі жұмыспен қамтыған жеке тұлға ретінде жұмыс істеймін, ЖК немесе ЖШС ашылмаған. Жұмыс басталар алдында көлем мен бағаны жазбаша келісімде бекітеміз. Төлем: 50% алдын ала және 50% жұмыс тапсырылғаннан кейін, Kaspi аударымымен. Шот-фактура мен ҚҚС жоқ.',
    en: 'I work as a self-employed individual, not as a registered company. Before we start, we fix the scope and price in a written agreement. Payment: 50% upfront and 50% after delivery, by Kaspi transfer (for clients outside Kazakhstan we agree on a transfer method in advance). I do not issue VAT invoices.',
  },

  person: {
    name: { ru: 'Казбек Асанбек', kk: 'Қазбек Асанбек', en: 'Kazbek Assanbek' },
    role: {
      ru: 'фриланс full-stack разработчик из Алматы',
      kk: 'Алматыдағы фриланс full-stack әзірлеуші',
      en: 'freelance full-stack developer based in Almaty, Kazakhstan',
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
      en: [
        'I live and work in Almaty.',
        'Third-year student of Computer Engineering at IITU.',
        'I work as a freelancer: you talk to me directly, with no managers or middlemen.',
      ],
    },
  },

  stack: [
    'React', 'Next.js', 'TypeScript', 'Django', 'DRF', 'PostgreSQL', 'Tailwind',
    'Python', 'aiogram', 'Docker', 'Nginx', 'GitHub Actions', 'Linux',
  ],

  // Optional screenshot: put src/assets/portfolio/{slug}.webp and it is rendered automatically.
  portfolio: [
    {
      slug: 'terracon',
      title: { ru: 'TerraCon', kk: 'TerraCon', en: 'TerraCon' },
      stack: ['Next.js', 'Tailwind'],
      description: {
        ru: 'Сайт на Next.js и Tailwind для строительной компании, которая занимается спортивными покрытиями: каталог с фильтрами и корзина. Рядом работает Telegram-бот для связи с менеджером.',
        kk: 'Спорттық жабындармен айналысатын құрылыс компаниясына арналған Next.js пен Tailwind негізіндегі сайт: сүзгілері бар каталог және себет. Менеджермен байланысу үшін Telegram-бот та бар.',
        en: 'A Next.js and Tailwind website for a construction company that installs sports surfaces: a catalog with filters and a cart. A Telegram bot for contacting the manager works alongside it.',
      },
      links: [
        { label: { ru: 'Сайт terracon.kz', kk: 'terracon.kz сайты', en: 'Website terracon.kz' }, url: 'https://terracon.kz' },
        { label: { ru: 'Telegram-бот', kk: 'Telegram-бот', en: 'Telegram bot' }, url: 'https://t.me/terracon_manager_bot' },
      ],
    },
    {
      slug: 'telegram-business-ai',
      title: { ru: 'AI-ассистент для Telegram Business', kk: 'Telegram Business үшін AI-көмекші', en: 'AI assistant for Telegram Business' },
      stack: ['Python', 'aiogram', 'DeepSeek'],
      description: {
        ru: 'Ассистент на Python и aiogram с моделью DeepSeek: отвечает клиентам по базе знаний, помнит диалог, имеет админ-панель. Когда владелец отвечает сам, ассистент автоматически замолкает на 60 минут.',
        kk: 'Python мен aiogram және DeepSeek моделі негізіндегі көмекші: клиенттерге білім қоры бойынша жауап береді, диалогты есте сақтайды, әкімшілік панелі бар. Иесі өзі жауап жазса, көмекші 60 минутқа автоматты түрде тоқтайды.',
        en: 'An assistant built with Python, aiogram and the DeepSeek model: it answers clients from a knowledge base, remembers the conversation and has an admin panel. When the owner replies personally, the assistant goes silent for 60 minutes automatically.',
      },
      links: [{ label: { ru: 'Демо в Telegram', kk: 'Telegram-дағы демо', en: 'Demo in Telegram' }, url: 'https://t.me/RealKazbekBot' }],
    },
    {
      slug: 'car',
      title: { ru: 'Car', kk: 'Car', en: 'Car' },
      stack: [],
      description: {
        ru: 'Демонстрационный фронтенд-проект Car.',
        kk: 'Car — фронтендтің демонстрациялық жобасы.',
        en: 'Car is a frontend demo project.',
      },
      links: [{ label: { ru: 'Открыть демо', kk: 'Демоны ашу', en: 'Open the demo' }, url: 'https://realkazbek.github.io/Car/' }],
    },
  ],
};
