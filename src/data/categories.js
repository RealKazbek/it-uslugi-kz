// Order here is the display order everywhere (catalog, prices, home).
export const categories = [
  {
    slug: 'websites',
    name: { ru: 'Сайты', kk: 'Сайттар', en: 'Websites' },
    short: {
      ru: 'Лендинги, сайты-визитки, корпоративные сайты и сайты для конкретных отраслей',
      kk: 'Лендингтер, сайт-визиткалар, корпоративтік және салаға арналған сайттар',
      en: 'Landing pages, business-card sites, company websites and industry-specific sites',
    },
    intro: {
      ru: 'Сайт, который объясняет, чем вы занимаетесь, показывает цены и приводит заявки в мессенджер. Выберите готовый формат под вашу отрасль или опишите свою задачу: состав работ и цену фиксируем до старта.',
      kk: 'Сіздің не істейтініңізді түсіндіретін, бағаны көрсететін және өтінімдерді мессенджерге жеткізетін сайт. Саланызға дайын форматты таңдаңыз немесе өз тапсырмаңызды сипаттаңыз: жұмыс құрамы мен бағаны бастамас бұрын келісеміз.',
      en: 'A website that explains what you do, shows your prices and sends enquiries straight to your messenger. Pick a ready format for your industry or describe your own task; the scope and price are fixed before work starts.',
    },
  },
  {
    slug: 'ecommerce',
    name: { ru: 'Интернет-магазины', kk: 'Интернет-дүкендер', en: 'Online stores' },
    short: {
      ru: 'Интернет-магазины, каталоги с заказом в WhatsApp, выгрузка для Kaspi и мини-приложения в Telegram',
      kk: 'Интернет-дүкендер, WhatsApp арқылы тапсырыс беретін каталогтар, Kaspi үшін жүктеме және Telegram мини-қосымшалары',
      en: 'Online stores, catalogs with WhatsApp ordering, Kaspi price feeds and Telegram mini apps',
    },
    intro: {
      ru: 'Витрина товаров с корзиной или с заказом в мессенджере, если вам не нужна полноценная касса. Отдельно можно заказать XML-файл с ценами для Kaspi, если магазин или каталог у вас уже есть.',
      kk: 'Себеті бар немесе мессенджер арқылы тапсырыс алатын тауар витринасы, егер сізге толыққанды касса қажет болмаса. Егер дүкеніңіз немесе каталогыңыз бұрыннан бар болса, Kaspi үшін бағалары бар XML-файлды бөлек тапсырыс беруге болады.',
      en: 'A product showcase with a cart, or with ordering through a messenger when you do not need a full checkout. If you already have a store or catalog, you can also order just the XML price feed for Kaspi.',
    },
  },
  {
    slug: 'bots',
    name: { ru: 'Боты', kk: 'Боттар', en: 'Bots' },
    short: {
      ru: 'Telegram- и WhatsApp-боты для записи, заявок, каталога, доставки и рассылок',
      kk: 'Жазылу, өтінімдер, каталог, жеткізу және хабарлама тарату үшін Telegram және WhatsApp боттары',
      en: 'Telegram and WhatsApp bots for bookings, enquiries, catalogs, delivery and mailings',
    },
    intro: {
      ru: 'Бот берёт на себя рутину: принимает записи и заявки, показывает каталог, отвечает на типовые вопросы и сразу сообщает вам о новом клиенте. Работает там, где клиенты уже общаются, без установки отдельного приложения.',
      kk: 'Бот күнделікті жұмысты өз мойнына алады: жазылулар мен өтінімдерді қабылдайды, каталогты көрсетеді, типтік сұрақтарға жауап береді және жаңа клиент туралы сізге бірден хабарлайды. Клиенттер бұрыннан сөйлесетін жерде жұмыс істейді, бөлек қосымша орнатудың қажеті жоқ.',
      en: 'A bot takes over the routine: it accepts bookings and enquiries, shows a catalog, answers typical questions and notifies you about each new client at once. It works where your clients already chat, with no separate app to install.',
    },
  },
  {
    slug: 'ai',
    name: { ru: 'AI-ассистенты', kk: 'ЖИ-көмекшілер', en: 'AI assistants' },
    short: {
      ru: 'AI-ассистенты для Telegram, WhatsApp и сайта, базы знаний и описания товаров',
      kk: 'Telegram, WhatsApp және сайтқа арналған ЖИ-көмекшілер, білім қорлары және тауар сипаттамалары',
      en: 'AI assistants for Telegram, WhatsApp and your website, knowledge bases and product descriptions',
    },
    intro: {
      ru: 'Ассистент отвечает клиентам по вашей базе знаний: цены, условия, адреса, частые вопросы. Сложные случаи он передаёт вам, а владелец в любой момент может вмешаться в диалог сам.',
      kk: 'Көмекші клиенттерге сіздің білім қорыңыз бойынша жауап береді: бағалар, шарттар, мекенжайлар, жиі қойылатын сұрақтар. Күрделі жағдайларды сізге береді, ал иесі кез келген сәтте сөйлесуге өзі араласа алады.',
      en: 'The assistant answers clients from your own knowledge base: prices, terms, addresses, frequent questions. It hands complicated cases over to you, and the owner can step into any conversation at any moment.',
    },
  },
  {
    slug: 'automation',
    name: { ru: 'Автоматизация и CRM', kk: 'Автоматтандыру және CRM', en: 'Automation and CRM' },
    short: {
      ru: 'Заявки в Google Sheets, CRM, уведомления, отчёты, интеграции по API и парсинг данных',
      kk: 'Google Sheets-ке өтінімдер, CRM, хабарландырулар, есептер, API арқылы интеграциялар және деректерді парсинг',
      en: 'Leads into Google Sheets, CRM, notifications, reports, API integrations and data scraping',
    },
    intro: {
      ru: 'Убираем ручную работу между сайтом, мессенджером, таблицей и вашей почтой. Заявка попадает в таблицу или CRM сама, вы получаете уведомление, а отчёт приходит в Telegram без лишних действий.',
      kk: 'Сайт, мессенджер, кесте және поштаңыз арасындағы қолмен жасалатын жұмысты жоямыз. Өтінім кестеге немесе CRM-ге өзі түседі, сізге хабарландыру келеді, ал есеп артық әрекетсіз Telegram-ға жіберіледі.',
      en: 'We remove the manual work between your website, messenger, spreadsheet and mailbox. A lead lands in a sheet or CRM by itself, you get a notification, and a report arrives in Telegram without extra steps.',
    },
  },
  {
    slug: 'seo-maps',
    name: { ru: 'SEO и карты', kk: 'SEO және карталар', en: 'SEO and maps' },
    short: {
      ru: 'Карточки в 2GIS, Google Maps и Яндекс Картах, SEO-аудит, продвижение и ускорение сайта',
      kk: '2GIS, Google Maps және Яндекс Карталардағы карточкалар, SEO-аудит, жылжыту және сайтты жылдамдату',
      en: 'Business cards on 2GIS, Google Maps and Yandex Maps, SEO audits, promotion and site speed',
    },
    intro: {
      ru: 'Чтобы вас находили, когда ищут услугу рядом: аккуратные карточки на картах, понятная структура сайта и быстрая загрузка. Результат поисковой выдачи никто не может обещать, поэтому берусь за то, что зависит от работы: настройку и исправление.',
      kk: 'Жақын жердегі қызметті іздегенде сізді табуы үшін: картадағы ұқыпты карточкалар, түсінікті сайт құрылымы және жылдам жүктелу. Іздеу нәтижесіне ешкім кепілдік бере алмайды, сондықтан жұмысқа байланысты нәрсені орындаймын: баптау мен түзету.',
      en: 'So that people find you when they search for a service nearby: tidy cards on the maps, a clear site structure and fast loading. Nobody can promise a search ranking, so I take on what depends on the work itself: setup and fixes.',
    },
  },
  {
    slug: 'support',
    name: { ru: 'Поддержка и доработка', kk: 'Қолдау және жетілдіру', en: 'Support and maintenance' },
    short: {
      ru: 'Исправление ошибок, поддержка и редизайн сайта, домен, хостинг, почта и компьютерная помощь',
      kk: 'Қателерді түзету, сайтты қолдау және редизайн, домен, хостинг, пошта және компьютерлік көмек',
      en: 'Bug fixes, site support and redesign, domain, hosting, email and remote computer help',
    },
    intro: {
      ru: 'Если сайт уже есть, но что-то сломалось, устарело или не хватает функции, это можно поправить без переделки с нуля. Здесь же мелкие технические задачи: домен, SSL, перенос на другой хостинг, почта на своём домене и помощь с компьютером для частных лиц.',
      kk: 'Сайт бұрыннан бар, бірақ бірдеңе бұзылса, ескірсе немесе функция жетіспесе, оны басынан қайта жасамай-ақ түзетуге болады. Мұнда ұсақ техникалық тапсырмалар да бар: домен, SSL, басқа хостингке көшіру, өз доменіңіздегі пошта және жеке тұлғаларға компьютерлік көмек.',
      en: 'If you already have a site but something broke, got outdated or lacks a feature, it can be fixed without rebuilding from scratch. Small technical jobs live here too: domain, SSL, moving to another host, email on your own domain and remote computer help for private people.',
    },
  },
  {
    slug: 'education',
    name: { ru: 'Обучение', kk: 'Оқыту', en: 'Lessons' },
    short: {
      ru: 'Уроки программирования для школьников и компьютерная грамотность для взрослых',
      kk: 'Оқушыларға бағдарламалау сабақтары және ересектерге компьютерлік сауаттылық',
      en: 'Programming lessons for school students and computer basics for adults',
    },
    intro: {
      ru: 'Индивидуальные занятия онлайн: программирование для школьников и компьютерная грамотность для взрослых. Начинаем с короткого знакомства, чтобы понять цель и уровень, и дальше идём в удобном вам темпе.',
      kk: 'Онлайн жеке сабақтар: оқушыларға бағдарламалау және ересектерге компьютерлік сауаттылық. Мақсат пен деңгейді түсіну үшін қысқа танысудан бастаймыз, одан әрі өзіңізге ыңғайлы қарқынмен жүреміз.',
      en: 'One-to-one lessons online: programming for school students and computer basics for adults. We start with a short introduction to understand the goal and the level, then move at a pace that suits you.',
    },
  },
];
