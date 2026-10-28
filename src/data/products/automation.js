export default [
  {
    slug: 'zayavki-v-google-sheets',
    category: 'automation',
    title: {
      ru: 'Заявки с сайта в Google Sheets',
      kk: 'Сайттан түскен өтінімдерді Google Sheets-ке жіберу',
      en: 'Website leads into Google Sheets',
    },
    short: {
      ru: 'Каждая заявка с сайта или из бота автоматически попадает в аккуратную таблицу Google Sheets.',
      kk: 'Сайттан немесе боттан түскен әр өтінім автоматты түрде ретті Google Sheets кестесіне түседі.',
      en: 'Every lead from your site or bot lands automatically in a tidy Google Sheets table.',
    },
    description: {
      ru: 'Я подключаю форму на сайте, Telegram-бота или рекламную форму к таблице Google, чтобы заявки не терялись в переписках. В таблице появляются дата, имя, телефон, источник и статус, а вы отмечаете, что уже обработано. Подходит как первый шаг к порядку в продажах, когда CRM ещё не нужна.',
      kk: 'Өтінімдер хат алмасуда жоғалмауы үшін сайттағы форманы, Telegram-ботты немесе жарнама формасын Google кестесіне қосамын. Кестеде күні, аты, телефоны, қайдан келгені және мәртебесі пайда болады, ал өңделгенін өзіңіз белгілейсіз. CRM әлі қажет емес кезде сатудағы тәртіпке алғашқы қадам ретінде қолайлы.',
      en: 'I connect your site form, Telegram bot or ad form to a Google spreadsheet so leads do not get lost in chats. The sheet gets the date, name, phone, source and status, and you mark what has already been handled. It is a good first step toward order in sales when a CRM is not needed yet.',
    },
    priceFrom: 25000,
    unit: 'once',
    days: { min: 2, max: 4 },
    includes: {
      ru: [
        'Таблица Google Sheets со столбцами под ваши данные',
        'Подключение формы сайта, бота или рекламной формы',
        'Автоматическая отметка даты, времени и источника заявки',
        'Столбец статуса с выпадающим списком (новая, в работе, закрыта)',
        'Защита от дублей при повторной отправке формы',
        'Проверка на тестовых заявках',
        'Короткая инструкция по работе с таблицей',
      ],
      kk: [
        'Деректеріңізге сай бағандары бар Google Sheets кестесі',
        'Сайт формасын, ботты немесе жарнама формасын қосу',
        'Өтінімнің күнін, уақытын және көзін автоматты белгілеу',
        'Ашылмалы тізімі бар мәртебе бағаны (жаңа, жұмыста, жабылған)',
        'Форма қайта жіберілгенде көшірмеден қорғау',
        'Сынақ өтінімдермен тексеру',
        'Кестемен жұмыс істеудің қысқа нұсқаулығы',
      ],
      en: [
        'A Google Sheets table with columns matched to your data',
        'Connecting a site form, a bot or an ad form',
        'Automatic stamping of date, time and lead source',
        'A status column with a drop-down (new, in progress, closed)',
        'Protection against duplicates when a form is submitted twice',
        'Testing with sample leads',
        'A short guide to working with the sheet',
      ],
    },
    notIncluded: {
      ru: [
        'Создание самого сайта или формы, если их ещё нет',
        'Платные тарифы сервисов-посредников, если для вашей формы они понадобятся',
        'Обзвон клиентов и работа с заявками после того, как они попали в таблицу',
      ],
      kk: [
        'Сайттың немесе форманың өзін жасау, егер олар әлі жоқ болса',
        'Формаңызға қажет болса, делдал сервистердің ақылы тарифтері',
        'Өтінімдер кестеге түскеннен кейін клиенттерге қоңырау шалу және онымен жұмыс',
      ],
      en: [
        'Building the site or form itself if you do not have one yet',
        'Paid plans of third-party services, should your form need one',
        'Calling customers and working the leads after they reach the sheet',
      ],
    },
    forWhom: {
      ru: 'Для небольших компаний, где заявки приходят с сайта, из рекламы и мессенджеров, а учёт ведётся в голове или в блокноте.',
      kk: 'Өтінімдер сайттан, жарнамадан және мессенджерлерден келетін, ал есеп ойда немесе қолжазбада жүргізілетін шағын компанияларға арналған.',
      en: 'For small companies where leads arrive from the site, ads and messengers, while tracking happens in someone\'s head or a notebook.',
    },
    faq: [
      {
        q: {
          ru: 'Нужно ли платить за Google Sheets?',
          kk: 'Google Sheets үшін төлеу керек пе?',
          en: 'Do I have to pay for Google Sheets?',
        },
        a: {
          ru: 'Для обычного аккаунта Google таблицы бесплатны. Таблица остаётся на вашем аккаунте, и доступ к ней вы раздаёте сами.',
          kk: 'Қарапайым Google аккаунты үшін кестелер тегін. Кесте сіздің аккаунтыңызда қалады, оған қолжетімділікті өзіңіз бересіз.',
          en: 'Sheets are free with a regular Google account. The table stays in your account, and you control who has access.',
        },
      },
      {
        q: {
          ru: 'Можно ли подключить несколько источников в одну таблицу?',
          kk: 'Бір кестеге бірнеше көзді қосуға бола ма?',
          en: 'Can several sources feed one sheet?',
        },
        a: {
          ru: 'Да, например сайт, бот и форма из рекламы. В столбце «Источник» будет видно, откуда пришла каждая заявка.',
          kk: 'Иә, мысалы сайт, бот және жарнамадан келген форма. «Көз» бағанында әр өтінімнің қайдан келгені көрінеді.',
          en: 'Yes, for example a site, a bot and an ad form. The Source column shows where each lead came from.',
        },
      },
      {
        q: {
          ru: 'Что, если я захочу позже перейти на CRM?',
          kk: 'Кейін CRM-ге көшкім келсе ше?',
          en: 'What if I later want to move to a CRM?',
        },
        a: {
          ru: 'Таблицу легко выгрузить в CSV и загрузить в большинство систем. Если вырастете, я смогу построить CRM на тех же данных.',
          kk: 'Кестені CSV-ға оңай шығарып, көптеген жүйеге жүктеуге болады. Өссеңіз, сол деректер негізінде CRM жасай аламын.',
          en: 'The table exports easily to CSV and loads into most systems. If you outgrow it, I can build a CRM on the same data.',
        },
      },
    ],
    relatedProducts: ['uvedomleniya-o-zayavkah', 'crm-dlya-malogo-biznesa', 'otchety-v-telegram'],
  },
  {
    slug: 'uvedomleniya-o-zayavkah',
    category: 'automation',
    title: {
      ru: 'Мгновенные уведомления о заявках',
      kk: 'Өтінімдер туралы лезде хабарлама',
      en: 'Instant lead notifications',
    },
    short: {
      ru: 'Новая заявка сразу приходит вам в Telegram или на почту, чтобы вы отвечали первым.',
      kk: 'Жаңа өтінім сізге бірден Telegram-ға немесе поштаға келеді, сонда сіз бірінші жауап бересіз.',
      en: 'A new lead reaches your Telegram or email at once, so you can be the first to reply.',
    },
    description: {
      ru: 'Клиент чаще выбирает того, кто ответил быстрее. Я настраиваю так, чтобы при каждой заявке с сайта вам приходило сообщение с именем, телефоном и текстом, а в сообщении была кнопка для звонка или ответа в WhatsApp. Можно добавить в чат нескольких сотрудников.',
      kk: 'Клиент көбіне тез жауап бергенді таңдайды. Мен сайттан әр өтінім түскенде сізге аты, телефоны және мәтіні бар хабарлама келетіндей, ал хабарламада қоңырау шалуға немесе WhatsApp-та жауап беруге арналған түйме болатындай етіп баптаймын. Чатқа бірнеше қызметкерді қосуға болады.',
      en: 'Customers tend to pick whoever replies first. I set things up so every site request sends you a message with the name, phone and text, plus a button to call or reply on WhatsApp. Several team members can be added to the chat.',
    },
    priceFrom: 15000,
    unit: 'once',
    days: { min: 1, max: 3 },
    includes: {
      ru: [
        'Подключение формы на сайте к уведомлениям',
        'Сообщение в Telegram с именем, телефоном и текстом заявки',
        'Кнопки «Позвонить» и «Ответить в WhatsApp» в сообщении',
        'Дублирование на электронную почту по желанию',
        'Общий чат для нескольких сотрудников или менеджеров',
        'Тестовые заявки, чтобы убедиться в работе',
      ],
      kk: [
        'Сайттағы форманы хабарламаларға қосу',
        'Аты, телефоны және өтінім мәтіні бар Telegram хабарламасы',
        'Хабарламада «Қоңырау шалу» және «WhatsApp-та жауап беру» түймелері',
        'Қалау бойынша электрондық поштаға көшірме',
        'Бірнеше қызметкер немесе менеджерге арналған ортақ чат',
        'Жұмысын тексеру үшін сынақ өтінімдер',
      ],
      en: [
        'Connecting the form on your site to notifications',
        'A Telegram message with the name, phone and request text',
        'Call and reply-on-WhatsApp buttons inside the message',
        'A duplicate to email, if you want it',
        'A shared chat for several employees or managers',
        'Test requests to make sure everything works',
      ],
    },
    notIncluded: {
      ru: [
        'Разработка самого сайта или формы',
        'Сложная логика распределения заявок по менеджерам: это уже ближе к CRM',
        'Гарантия доставки, если Telegram или почтовый сервис временно недоступны',
      ],
      kk: [
        'Сайттың немесе форманың өзін әзірлеу',
        'Өтінімдерді менеджерлерге бөлудің күрделі логикасы: бұл CRM-ге жақынырақ',
        'Telegram немесе пошта сервисі уақытша қолжетімсіз болса, жеткізу кепілі',
      ],
      en: [
        'Building the site or form itself',
        'Complex logic for distributing leads across managers, which is closer to a CRM',
        'A delivery guarantee if Telegram or the email service is temporarily unavailable',
      ],
    },
    forWhom: {
      ru: 'Для компаний, где заявки с сайта лежат в почте часами. Особенно полезно автосервисам, клиникам, строителям и всем, у кого счёт идёт на минуты.',
      kk: 'Сайттан түскен өтінімдер поштада сағаттап жататын компанияларға арналған. Әсіресе автосервистерге, клиникаларға, құрылысшыларға және есеп минутпен жүретіндердің бәріне пайдалы.',
      en: 'For companies whose site requests sit in an inbox for hours. It helps car services, clinics, builders and anyone for whom minutes count.',
    },
    faq: [
      {
        q: {
          ru: 'Работает ли это с моим текущим сайтом?',
          kk: 'Бұл менің қазіргі сайтыммен жұмыс істей ме?',
          en: 'Will this work with my current site?',
        },
        a: {
          ru: 'В большинстве случаев да: достаточно, чтобы форма умела отправлять данные на адрес или письмо. Если сайт сделан на конструкторе, я посмотрю его возможности перед началом.',
          kk: 'Көп жағдайда иә: форма деректерді мекенжайға немесе хатқа жібере алса жеткілікті. Сайт конструкторда жасалса, бастамас бұрын оның мүмкіндіктерін қараймын.',
          en: 'In most cases yes: it is enough that the form can send data to an address or by email. If the site is built on a constructor, I check its options before starting.',
        },
      },
      {
        q: {
          ru: 'Можно ли получать уведомления в рабочую группу?',
          kk: 'Хабарламаларды жұмыс тобына алуға бола ма?',
          en: 'Can notifications go to a team group?',
        },
        a: {
          ru: 'Да, бота можно добавить в групповой чат. Тогда заявку увидят все участники, а вы решите, кто берёт её в работу.',
          kk: 'Иә, ботты топтық чатқа қосуға болады. Сонда өтінімді барлық қатысушы көреді, ал оны кім алатынын өзіңіз шешесіз.',
          en: 'Yes, the bot can be added to a group chat. Everyone in it sees the request, and you decide who takes it.',
        },
      },
      {
        q: {
          ru: 'Нужно ли что-то платить после настройки?',
          kk: 'Баптаудан кейін бір нәрсе төлеу керек пе?',
          en: 'Is there any ongoing fee after setup?',
        },
        a: {
          ru: 'Сам бот Telegram бесплатный. Если форме потребуется платный сервис-посредник, я предупрежу об этом до начала работы.',
          kk: 'Telegram боты тегін. Формаға ақылы делдал сервис қажет болса, жұмыс басталғанға дейін ескертемін.',
          en: 'The Telegram bot itself is free. If your form needs a paid intermediary service, I will tell you before the work starts.',
        },
      },
    ],
    relatedProducts: ['zayavki-v-google-sheets', 'telegram-bot-zayavki', 'lending'],
  },
  {
    slug: 'crm-dlya-malogo-biznesa',
    category: 'automation',
    title: {
      ru: 'Простая CRM для малого бизнеса',
      kk: 'Шағын бизнеске арналған қарапайым CRM',
      en: 'A simple CRM for a small business',
    },
    short: {
      ru: 'Лёгкая CRM под ваш процесс: клиенты, сделки, статусы и напоминания без лишних модулей.',
      kk: 'Сіздің процеске арналған жеңіл CRM: клиенттер, мәмілелер, мәртебелер және еске салғыштар, артық модульсіз.',
      en: 'A lightweight CRM built around your process: clients, deals, statuses and reminders without extra modules.',
    },
    description: {
      ru: 'Готовые CRM часто перегружены функциями, которыми вы не пользуетесь. Я собираю простую систему под ваши этапы работы с клиентом: от заявки до оплаты. Данные можно хранить в Google Sheets с формами и скриптами или в небольшом веб-приложении, в зависимости от размера команды.',
      kk: 'Дайын CRM-дер көбіне өзіңіз қолданбайтын функциялармен шамадан тыс жүктелген. Мен клиентпен жұмыстың сіздің кезеңдеріңізге арналған қарапайым жүйені жинаймын: өтінімнен төлемге дейін. Команда мөлшеріне қарай деректерді формалар мен скрипттері бар Google Sheets-те немесе шағын веб-қосымшада сақтауға болады.',
      en: 'Off-the-shelf CRMs are often loaded with features you never use. I build a simple system around your own stages of working with a client, from first request to payment. Depending on team size, the data can live in Google Sheets with forms and scripts or in a small web application.',
    },
    priceFrom: 90000,
    unit: 'once',
    days: { min: 10, max: 20 },
    includes: {
      ru: [
        'Разбор вашего процесса продаж и согласование этапов',
        'Карточки клиентов с историей контактов и заметками',
        'Воронка сделок со статусами и ответственным',
        'Напоминания о задачах и просроченных звонках',
        'Автоматический приём заявок с сайта и из ботов',
        'Роли доступа для владельца и менеджеров',
        'Выгрузка данных и обучение команды',
      ],
      kk: [
        'Сату процесін талдау және кезеңдерді келісу',
        'Байланыс тарихы мен жазбалары бар клиент карточкалары',
        'Мәртебелері мен жауапты адамы бар мәмілелер воронкасы',
        'Тапсырмалар мен кешіккен қоңыраулар туралы еске салғыштар',
        'Сайттан және боттардан өтінімдерді автоматты қабылдау',
        'Иесі мен менеджерлерге арналған қолжетімділік рөлдері',
        'Деректерді шығару және команданы оқыту',
      ],
      en: [
        'A review of your sales process and agreement on the stages',
        'Client cards with contact history and notes',
        'A deal pipeline with statuses and an owner for each deal',
        'Reminders about tasks and overdue calls',
        'Automatic intake of leads from the site and bots',
        'Access roles for the owner and managers',
        'Data export and training for your team',
      ],
    },
    notIncluded: {
      ru: [
        'Телефония, бухгалтерия, склад и другие модули большой CRM-системы',
        'Перенос старых данных, если они в хаотичном виде: объём такой работы оцениваем отдельно',
        'Оплата хостинга или платных сервисов, если решение будет их использовать',
      ],
      kk: [
        'Телефония, бухгалтерия, қойма және үлкен CRM жүйесінің басқа модульдері',
        'Ескі деректерді көшіру, егер олар ретсіз күйде болса: мұндай жұмыстың көлемін бөлек бағалаймыз',
        'Шешім пайдаланса, хостинг немесе ақылы сервистер төлемі',
      ],
      en: [
        'Telephony, accounting, warehouse and other modules of a large CRM system',
        'Migrating old data if it is in a messy state, which we estimate separately',
        'Hosting or paid-service fees, if the solution uses them',
      ],
    },
    forWhom: {
      ru: 'Для команд из 2-15 человек, которые ведут клиентов в таблицах и мессенджерах и хотят порядок без дорогой подписки на крупную CRM.',
      kk: 'Клиенттерді кестелер мен мессенджерлерде жүргізетін және қымбат үлкен CRM жазылымынсыз тәртіп қалайтын 2-15 адамнан тұратын командаларға арналған.',
      en: 'For teams of 2 to 15 people who manage clients in spreadsheets and messengers and want order without an expensive subscription to a large CRM.',
    },
    faq: [
      {
        q: {
          ru: 'Чем это лучше готовой CRM?',
          kk: 'Бұл дайын CRM-нен немен жақсы?',
          en: 'How is this better than a ready-made CRM?',
        },
        a: {
          ru: 'Здесь нет ежемесячной платы за места и лишних функций, а этапы повторяют ваш реальный процесс. Минус в том, что возможности ограничены тем, что мы вместе заложим, а не готовым набором на сотни функций.',
          kk: 'Мұнда орын үшін ай сайынғы төлем мен артық функциялар жоқ, ал кезеңдер сіздің нақты процесті қайталайды. Кемшілігі: мүмкіндіктер жүздеген функциясы бар дайын жиынтықпен емес, бірге қосқанымызбен шектеледі.',
          en: 'There is no monthly fee per seat and no surplus features, and the stages follow your real process. The downside is that capabilities are limited to what we build in together, not a ready set of hundreds of functions.',
        },
      },
      {
        q: {
          ru: 'Данные будут принадлежать мне?',
          kk: 'Деректер маған тиесілі бола ма?',
          en: 'Will the data belong to me?',
        },
        a: {
          ru: 'Да. Система разворачивается на вашем аккаунте или хостинге, а выгрузить данные в таблицу можно в любой момент.',
          kk: 'Иә. Жүйе сіздің аккаунтыңызда немесе хостингте орнатылады, ал деректерді кез келген уақытта кестеге шығаруға болады.',
          en: 'Yes. The system is deployed under your own account or hosting, and the data can be exported to a spreadsheet at any time.',
        },
      },
      {
        q: {
          ru: 'Можно ли потом добавить функции?',
          kk: 'Кейін функция қосуға бола ма?',
          en: 'Can features be added later?',
        },
        a: {
          ru: 'Можно. Я делаю структуру так, чтобы новые поля и этапы добавлялись без переделки всего. Доработки оцениваются отдельно.',
          kk: 'Болады. Құрылымды жаңа өрістер мен кезеңдер бәрін қайта жасамай қосылатындай етіп жасаймын. Жетілдірулер бөлек бағаланады.',
          en: 'Yes. I structure the system so new fields and stages can be added without rebuilding everything. Extensions are quoted separately.',
        },
      },
    ],
    relatedProducts: ['zayavki-v-google-sheets', 'otchety-v-telegram', 'veb-prilozhenie'],
  },
  {
    slug: 'onlain-zapis-google-calendar',
    category: 'automation',
    title: {
      ru: 'Онлайн-запись с Google Календарём',
      kk: 'Google Күнтізбесімен онлайн жазылу',
      en: 'Online booking synced with Google Calendar',
    },
    short: {
      ru: 'Клиенты выбирают свободное время на сайте, а запись сама попадает в ваш Google Календарь.',
      kk: 'Клиенттер сайтта бос уақытты таңдайды, ал жазылу өзі Google Күнтізбеңізге түседі.',
      en: 'Clients pick a free slot on your site and the booking lands in your Google Calendar by itself.',
    },
    description: {
      ru: 'Страница записи показывает только свободные слоты, учитывая ваш график и уже занятое время в календаре. После выбора клиент оставляет имя и телефон, а вы получаете событие в календаре и уведомление. Это избавляет от переписки «а на когда есть окошко» и двойных записей.',
      kk: 'Жазылу беті сіздің кестеңіз бен күнтізбедегі бос емес уақытты ескеріп, тек бос слоттарды көрсетеді. Таңдағаннан кейін клиент есімі мен телефонын қалдырады, ал сіз күнтізбеде оқиға мен хабарлама аласыз. Бұл «қай уақытқа бос орын бар» деген хат алмасудан және қос жазылудан құтқарады.',
      en: 'The booking page shows only free slots, taking into account your schedule and the time already busy in your calendar. After choosing, the client leaves a name and phone, and you get an event in your calendar plus a notification. This ends the back-and-forth of asking when you are free and prevents double bookings.',
    },
    priceFrom: 30000,
    unit: 'once',
    days: { min: 3, max: 6 },
    includes: {
      ru: [
        'Страница записи, встроенная в сайт или отдельная ссылка',
        'Настройка рабочих часов, перерывов и длительности услуг',
        'Синхронизация с вашим Google Календарём',
        'Защита от двойной записи на одно время',
        'Уведомление вам в Telegram о каждой новой записи',
        'Подтверждение клиенту и напоминание перед визитом',
        'Возможность отмены или переноса по ссылке',
      ],
      kk: [
        'Сайтқа орнатылған жазылу беті немесе бөлек сілтеме',
        'Жұмыс сағаттарын, үзілістерді және қызмет ұзақтығын баптау',
        'Google Күнтізбеңізбен синхрондау',
        'Бір уақытқа қос жазылудан қорғау',
        'Әр жаңа жазылу туралы сізге Telegram хабарламасы',
        'Клиентке растау және келу алдында еске салу',
        'Сілтеме арқылы бас тарту немесе ауыстыру мүмкіндігі',
      ],
      en: [
        'A booking page embedded in your site or a standalone link',
        'Setup of working hours, breaks and service durations',
        'Synchronisation with your Google Calendar',
        'Protection against double booking the same slot',
        'A Telegram notification to you for each new booking',
        'Confirmation for the client and a reminder before the visit',
        'Cancel or reschedule through a link',
      ],
    },
    notIncluded: {
      ru: [
        'Онлайн-оплата при записи: её можно подключить отдельно',
        'Платная подписка на сервисы, если для напоминаний потребуется SMS',
        'Дизайн сайта, в который встраивается запись',
      ],
      kk: [
        'Жазылу кезіндегі онлайн-төлем: оны бөлек қосуға болады',
        'Еске салуға SMS қажет болса, сервистердің ақылы жазылымы',
        'Жазылу енгізілетін сайттың дизайны',
      ],
      en: [
        'Online payment at booking, which can be connected separately',
        'Paid service subscriptions if reminders need SMS',
        'The design of the site the booking is embedded into',
      ],
    },
    forWhom: {
      ru: 'Для мастеров, врачей, репетиторов, консультантов и студий, которые принимают по записи и устали вести её вручную.',
      kk: 'Жазылу бойынша қабылдайтын және оны қолмен жүргізуден шаршаған шеберлерге, дәрігерлерге, репетиторларға, кеңесшілер мен студияларға арналған.',
      en: 'For stylists, doctors, tutors, consultants and studios that work by appointment and are tired of managing it by hand.',
    },
    faq: [
      {
        q: {
          ru: 'Чем это отличается от бота записи?',
          kk: 'Бұл жазылу ботынан немен ерекшеленеді?',
          en: 'How is this different from a booking bot?',
        },
        a: {
          ru: 'Здесь запись идёт через страницу на сайте и синхронизируется с календарём, а бот работает внутри Telegram. Если клиенты сидят в мессенджере, лучше бот, если приходят с сайта, то эта страница.',
          kk: 'Мұнда жазылу сайттағы бет арқылы өтіп, күнтізбемен синхрондалады, ал бот Telegram ішінде жұмыс істейді. Клиенттер мессенджерде отырса, бот жақсырақ, сайттан келсе, осы бет.',
          en: 'Here booking goes through a page on your site and syncs with the calendar, while a bot works inside Telegram. If clients live in the messenger, a bot suits better; if they come from your site, this page does.',
        },
      },
      {
        q: {
          ru: 'Можно ли вести несколько мастеров?',
          kk: 'Бірнеше шеберді жүргізуге бола ма?',
          en: 'Can it handle several specialists?',
        },
        a: {
          ru: 'Да, у каждого мастера свой календарь и график, а клиент выбирает специалиста или любое свободное время.',
          kk: 'Иә, әр шебердің өз күнтізбесі мен кестесі болады, ал клиент маманды немесе кез келген бос уақытты таңдайды.',
          en: 'Yes, each specialist has their own calendar and schedule, and the client picks a person or any free time.',
        },
      },
      {
        q: {
          ru: 'Нужен ли клиенту аккаунт Google?',
          kk: 'Клиентке Google аккаунты керек пе?',
          en: 'Does the client need a Google account?',
        },
        a: {
          ru: 'Нет. Аккаунт Google нужен только вам для календаря, клиенту достаточно имени и номера телефона.',
          kk: 'Жоқ. Google аккаунты тек сізге күнтізбе үшін керек, клиентке есімі мен телефон нөмірі жеткілікті.',
          en: 'No. A Google account is needed only on your side for the calendar; the client just provides a name and phone number.',
        },
      },
    ],
    relatedProducts: ['telegram-bot-zapis', 'sait-dlya-salona-krasoty', 'uvedomleniya-o-zayavkah'],
  },
  {
    slug: 'otchety-v-telegram',
    category: 'automation',
    title: {
      ru: 'Автоматические отчёты в Telegram',
      kk: 'Telegram-ға автоматты есептер',
      en: 'Automatic reports sent to Telegram',
    },
    short: {
      ru: 'Ежедневная или еженедельная сводка по продажам и заявкам приходит вам в Telegram без ручной работы.',
      kk: 'Сату мен өтінімдер бойынша күнделікті немесе апталық шолу қолмен жұмыссыз сізге Telegram-ға келеді.',
      en: 'A daily or weekly summary of sales and leads arrives in your Telegram with no manual work.',
    },
    description: {
      ru: 'Вместо того чтобы открывать таблицы и считать вручную, вы получаете короткое сообщение с главными цифрами за день или неделю. Источником могут быть Google Sheets, ваша база или экспорт из магазина. Набор показателей мы выбираем вместе, чтобы отчёт читался за полминуты.',
      kk: 'Кестелерді ашып, қолмен санаудың орнына күн немесе апта бойынша негізгі сандары бар қысқа хабарлама аласыз. Дерек көзі Google Sheets, сіздің база немесе дүкеннен экспорт болуы мүмкін. Есеп жарты минутта оқылуы үшін көрсеткіштер жиынтығын бірге таңдаймыз.',
      en: 'Instead of opening spreadsheets and adding things up by hand, you get a short message with the key numbers for the day or week. The source can be Google Sheets, your database or an export from your shop. We choose the set of metrics together so the report can be read in thirty seconds.',
    },
    priceFrom: 30000,
    unit: 'once',
    days: { min: 3, max: 6 },
    includes: {
      ru: [
        'Согласование списка показателей: заявки, выручка, конверсия, остатки',
        'Подключение к вашему источнику данных',
        'Скрипт, который собирает цифры по расписанию',
        'Сообщение в Telegram в личный чат или рабочую группу',
        'Сравнение с предыдущим днём или неделей',
        'Расписание отправки, удобное вам',
        'Инструкция, как поменять набор показателей',
      ],
      kk: [
        'Көрсеткіштер тізімін келісу: өтінімдер, түсім, конверсия, қалдықтар',
        'Деректер көзіңізге қосылу',
        'Сандарды кесте бойынша жинайтын скрипт',
        'Жеке чатқа немесе жұмыс тобына Telegram хабарламасы',
        'Алдыңғы күн немесе аптамен салыстыру',
        'Өзіңізге ыңғайлы жіберу кестесі',
        'Көрсеткіштер жиынтығын қалай өзгерту туралы нұсқаулық',
      ],
      en: [
        'Agreeing the list of metrics: leads, revenue, conversion, stock',
        'Connecting to your data source',
        'A script that collects the figures on a schedule',
        'A Telegram message to a private chat or a work group',
        'Comparison with the previous day or week',
        'A delivery schedule that suits you',
        'A guide on how to change the set of metrics',
      ],
    },
    notIncluded: {
      ru: [
        'Наведение порядка в исходных данных: отчёт честно покажет и неполные цифры',
        'Графики и интерактивные дашборды, это отдельная задача',
        'Хостинг для скрипта, если вам не подойдёт бесплатный вариант',
      ],
      kk: [
        'Бастапқы деректерді ретке келтіру: есеп толымсыз сандарды да ашық көрсетеді',
        'Графиктер мен интерактивті дашбордтар, бұл бөлек міндет',
        'Тегін нұсқа сәйкес келмесе, скрипт үшін хостинг',
      ],
      en: [
        'Cleaning up the source data, since the report will faithfully show incomplete figures too',
        'Charts and interactive dashboards, which are a separate task',
        'Hosting for the script if a free option does not fit you',
      ],
    },
    forWhom: {
      ru: 'Для владельцев магазинов, студий и отделов продаж, которым нужна картина дня без ручных подсчётов.',
      kk: 'Күн көрінісін қолмен есептеусіз білгісі келетін дүкен, студия иелеріне және сату бөлімдеріне арналған.',
      en: 'For shop owners, studios and sales teams who want a picture of the day without manual counting.',
    },
    faq: [
      {
        q: {
          ru: 'Какие данные можно использовать?',
          kk: 'Қандай деректерді қолдануға болады?',
          en: 'What data can be used?',
        },
        a: {
          ru: 'Google Sheets, CSV-выгрузки, базы данных и сервисы с API. Если данные только в закрытой программе без выгрузки, придётся сначала найти способ их получить.',
          kk: 'Google Sheets, CSV шығарулары, дерекқорлар және API бар сервистер. Деректер шығарусыз жабық бағдарламада ғана болса, алдымен оларды алу жолын табу керек.',
          en: 'Google Sheets, CSV exports, databases and services with an API. If the data sits only in a closed program with no export, we first have to find a way to get at it.',
        },
      },
      {
        q: {
          ru: 'Можно ли получать отчёт по запросу?',
          kk: 'Есепті сұраныс бойынша алуға бола ма?',
          en: 'Can I request a report on demand?',
        },
        a: {
          ru: 'Да, можно добавить команду в бота, после которой он присылает свежую сводку немедленно.',
          kk: 'Иә, ботқа команда қосуға болады, одан кейін ол жаңа шолуды бірден жібереді.',
          en: 'Yes, a command can be added to the bot so it sends a fresh summary immediately.',
        },
      },
      {
        q: {
          ru: 'Увидят ли отчёт посторонние?',
          kk: 'Есепті бөгде адамдар көре ме?',
          en: 'Can outsiders see the report?',
        },
        a: {
          ru: 'Отчёт уходит только в указанный вами чат или группу. Бот отвечает на команды только участникам из вашего списка.',
          kk: 'Есеп тек сіз көрсеткен чатқа немесе топқа кетеді. Бот командаларға тек сіздің тізіміңіздегі қатысушыларға жауап береді.',
          en: 'The report goes only to the chat or group you specify, and the bot answers commands only from people on your list.',
        },
      },
    ],
    relatedProducts: ['zayavki-v-google-sheets', 'crm-dlya-malogo-biznesa', 'integraciya-api'],
  },
  {
    slug: 'integraciya-api',
    category: 'automation',
    title: {
      ru: 'Интеграция сервисов через API',
      kk: 'Сервистерді API арқылы біріктіру',
      en: 'API integration between your services',
    },
    short: {
      ru: 'Соединяю ваши сайт, магазин, CRM, платежи и мессенджеры, чтобы данные передавались сами.',
      kk: 'Сайтты, дүкенді, CRM-ді, төлемдер мен мессенджерлерді жалғап, деректер өздігінен берілетін етемін.',
      en: 'I connect your site, shop, CRM, payments and messengers so data moves between them on its own.',
    },
    description: {
      ru: 'Если вы вручную переносите заказы из одного сервиса в другой, это можно автоматизировать через API. Я пишу небольшой скрипт или сервис, который забирает данные в одном месте и передаёт в другое по понятным правилам. Перед началом проверяю, что у обоих сервисов есть нужный доступ и документация.',
      kk: 'Тапсырыстарды бір сервистен екіншісіне қолмен көшіретін болсаңыз, мұны API арқылы автоматтандыруға болады. Мен деректерді бір жерден алып, екіншісіне түсінікті ережемен беретін шағын скрипт немесе сервис жазамын. Бастамас бұрын екі сервисте де қажет рұқсат пен құжаттама барын тексеремін.',
      en: 'If you manually copy orders from one service to another, this can be automated through an API. I write a small script or service that picks data up in one place and passes it to another by clear rules. Before starting I check that both services provide the needed access and documentation.',
    },
    priceFrom: 40000,
    unit: 'once',
    days: { min: 5, max: 10 },
    includes: {
      ru: [
        'Анализ задачи и схема: что, откуда и куда передаётся',
        'Проверка доступа и документации API обоих сервисов',
        'Скрипт или небольшой сервис на Python или JavaScript',
        'Обработка ошибок и повторные попытки при сбоях',
        'Журнал событий, чтобы видеть, что и когда передалось',
        'Тестирование на тестовых данных и затем на рабочих',
        'Передача кода и инструкция по запуску',
      ],
      kk: [
        'Міндетті талдау және схема: не, қайдан және қайда беріледі',
        'Екі сервистің API рұқсаты мен құжаттамасын тексеру',
        'Python немесе JavaScript-те скрипт не шағын сервис',
        'Қателерді өңдеу және ақау кезінде қайталау әрекеттері',
        'Не және қашан берілгенін көру үшін оқиғалар журналы',
        'Алдымен сынақ, содан кейін жұмыс деректерімен тестілеу',
        'Кодты табыстау және іске қосу нұсқаулығы',
      ],
      en: [
        'Task analysis and a diagram of what moves from where to where',
        'Checking API access and documentation of both services',
        'A script or small service in Python or JavaScript',
        'Error handling and retries on failure',
        'An event log so you can see what was passed and when',
        'Testing on sample data first, then on live data',
        'Handover of the code and a launch guide',
      ],
    },
    notIncluded: {
      ru: [
        'Платный доступ к API, если сервис берёт за него плату',
        'Интеграция с системами, у которых нет открытого API или доступа для сторонних разработчиков',
        'Хостинг для постоянной работы скрипта, если он не помещается в бесплатные лимиты',
      ],
      kk: [
        'Сервис ақы алатын болса, API-ге ақылы қолжетімділік',
        'Ашық API-і жоқ немесе сыртқы әзірлеушілерге қолжетімділігі жоқ жүйелермен біріктіру',
        'Тегін лимитке сыймаса, скриптің үнемі жұмыс істеуіне арналған хостинг',
      ],
      en: [
        'Paid API access, if a service charges for it',
        'Integration with systems that have no open API or no access for outside developers',
        'Hosting for continuous operation of the script if it does not fit free limits',
      ],
    },
    forWhom: {
      ru: 'Для бизнеса, где данные вручную копируются между сайтом, CRM, таблицами и платёжными сервисами. Подойдёт и зарубежным клиентам, которым нужен разработчик для небольших интеграций.',
      kk: 'Деректер сайт, CRM, кестелер және төлем сервистері арасында қолмен көшірілетін бизнеске арналған. Шағын интеграцияларға әзірлеуші керек шетелдік клиенттерге де қолайлы.',
      en: 'For businesses that copy data by hand between a site, CRM, spreadsheets and payment services. It also suits foreign clients who need a developer for small integrations.',
    },
    faq: [
      {
        q: {
          ru: 'Как понять, возможна ли интеграция?',
          kk: 'Біріктіру мүмкін екенін қалай түсінуге болады?',
          en: 'How do I know whether an integration is possible?',
        },
        a: {
          ru: 'Пришлите названия сервисов и опишите, что хотите передавать. Я посмотрю документацию и скажу, реально ли это и какие ограничения есть, до начала оплаты.',
          kk: 'Сервис атауларын жіберіп, не беруді қалайтыныңызды сипаттаңыз. Құжаттаманы қарап, төлемге дейін бұл шынайы ма және қандай шектеулер бар екенін айтамын.',
          en: 'Send the names of the services and describe what you want to pass along. I will read the documentation and tell you, before any payment, whether it is realistic and what limits apply.',
        },
      },
      {
        q: {
          ru: 'Где будет работать скрипт?',
          kk: 'Скрипт қайда жұмыс істейді?',
          en: 'Where will the script run?',
        },
        a: {
          ru: 'Либо на вашем сервере или хостинге, либо в облачной функции. Мы выберем вариант, который не потребует от вас постоянного обслуживания.',
          kk: 'Не сіздің серверде немесе хостингте, не бұлттық функцияда. Сізден үнемі қызмет көрсетуді талап етпейтін нұсқаны таңдаймыз.',
          en: 'Either on your own server or hosting, or as a cloud function. We will choose an option that does not require constant upkeep from you.',
        },
      },
      {
        q: {
          ru: 'Что будет, если сервис изменит свой API?',
          kk: 'Сервис өз API-ін өзгертсе не болады?',
          en: 'What if a service changes its API?',
        },
        a: {
          ru: 'Такое случается, и интеграцию придётся подправить. Небольшие правки в течение первого месяца после сдачи я делаю без доплаты, дальше по договорённости.',
          kk: 'Бұл болып тұрады, сонда интеграцияны түзету керек. Тапсырғаннан кейінгі алғашқы айда шағын түзетулерді қосымша ақысыз жасаймын, одан әрі келісім бойынша.',
          en: 'It happens, and the integration then needs adjusting. Small fixes during the first month after delivery are free, and after that we agree separately.',
        },
      },
    ],
    relatedProducts: ['parsing-dannyh', 'crm-dlya-malogo-biznesa', 'magazin-s-kaspi-xml'],
  },
  {
    slug: 'parsing-dannyh',
    category: 'automation',
    title: {
      ru: 'Парсинг данных с сайтов в таблицу',
      kk: 'Сайттардан деректерді кестеге жинау (парсинг)',
      en: 'Web data scraping into a spreadsheet',
    },
    short: {
      ru: 'Собираю открытые данные с сайтов в таблицу: цены, каталоги, контакты компаний, объявления.',
      kk: 'Сайттардағы ашық деректерді кестеге жинаймын: бағалар, каталогтар, компания байланыстары, хабарландырулар.',
      en: 'I collect publicly available data from websites into a spreadsheet: prices, catalogs, company contacts, listings.',
    },
    description: {
      ru: 'Парсинг нужен, когда информацию с десятков страниц надо собрать в одном месте: например, цены конкурентов или каталог поставщика. Я пишу скрипт на Python, который обходит указанные страницы и сохраняет данные в Excel, CSV или Google Sheets. Берутся только открытые сведения, а сайты, где это запрещено, мы обсуждаем отдельно.',
      kk: 'Парсинг ондаған беттегі ақпаратты бір жерге жинау керек болғанда қажет: мысалы, бәсекелестер бағасы немесе жеткізуші каталогы. Мен көрсетілген беттерді аралап, деректерді Excel, CSV немесе Google Sheets-ке сақтайтын Python скриптін жазамын. Тек ашық мәліметтер алынады, ал мұны тыйым салатын сайттарды бөлек талқылаймыз.',
      en: 'Scraping helps when information from dozens of pages has to be gathered in one place, such as competitor prices or a supplier catalog. I write a Python script that walks through the pages you specify and saves the data to Excel, CSV or Google Sheets. Only public information is taken, and sites that forbid it are discussed separately.',
    },
    priceFrom: 20000,
    unit: 'once',
    days: { min: 2, max: 5 },
    includes: {
      ru: [
        'Анализ структуры сайта-источника и согласование полей',
        'Скрипт на Python для сбора выбранных данных',
        'Очистка и приведение данных к единому виду',
        'Выгрузка в Excel, CSV или Google Sheets',
        'Возможность повторного запуска для обновления данных',
        'Пауза между запросами, чтобы не перегружать чужой сайт',
        'Инструкция по запуску скрипта',
      ],
      kk: [
        'Дереккөз сайттың құрылымын талдау және өрістерді келісу',
        'Таңдалған деректерді жинауға арналған Python скрипті',
        'Деректерді тазалау және бір түрге келтіру',
        'Excel, CSV немесе Google Sheets-ке шығару',
        'Деректерді жаңарту үшін қайта іске қосу мүмкіндігі',
        'Бөтен сайтты шамадан тыс жүктемеу үшін сұраулар арасындағы үзіліс',
        'Скриптті іске қосу нұсқаулығы',
      ],
      en: [
        'Analysis of the source site structure and agreement on fields',
        'A Python script to collect the chosen data',
        'Cleaning and normalising the data into one format',
        'Export to Excel, CSV or Google Sheets',
        'The ability to run it again to refresh the data',
        'A pause between requests so the other site is not overloaded',
        'A guide for running the script',
      ],
    },
    notIncluded: {
      ru: [
        'Сбор закрытых данных, личных сведений и всего, что запрещено правилами сайта или законом',
        'Обход защиты от ботов и капч на сложных сайтах',
        'Постоянная поддержка скрипта: если источник изменит вёрстку, потребуется доработка',
      ],
      kk: [
        'Жабық деректерді, жеке мәліметтерді және сайт ережесі не заң тыйым салған барлық нәрсені жинау',
        'Күрделі сайттардағы боттан қорғауды және капчаны айналып өту',
        'Скриптке тұрақты қолдау: дереккөз беттің құрылымын өзгертсе, жетілдіру қажет болады',
      ],
      en: [
        'Collecting restricted data, personal information, or anything forbidden by site rules or by law',
        'Bypassing bot protection and captchas on complicated sites',
        'Ongoing support of the script: if the source changes its layout, it needs an update',
      ],
    },
    forWhom: {
      ru: 'Для владельцев магазинов, которым нужен мониторинг цен, а также для менеджеров, собирающих списки компаний или каталог поставщика.',
      kk: 'Баға мониторингі керек дүкен иелеріне, сондай-ақ компаниялар тізімін немесе жеткізуші каталогын жинайтын менеджерлерге арналған.',
      en: 'For shop owners who need price monitoring, and for managers building lists of companies or a supplier catalog.',
    },
    faq: [
      {
        q: {
          ru: 'Законен ли парсинг?',
          kk: 'Парсинг заңды ма?',
          en: 'Is scraping legal?',
        },
        a: {
          ru: 'Сбор открытой информации обычно допустим, но у сайтов могут быть правила, запрещающие автоматический сбор. Я смотрю условия источника заранее и не работаю с персональными данными и закрытыми разделами.',
          kk: 'Ашық ақпаратты жинау әдетте рұқсат етіледі, бірақ сайттарда автоматты жинауға тыйым салатын ережелер болуы мүмкін. Мен дереккөздің шарттарын алдын ала қараймын және дербес деректермен, жабық бөлімдермен жұмыс істемеймін.',
          en: 'Collecting public information is usually acceptable, but sites may have rules against automated collection. I read the source terms in advance and do not work with personal data or restricted sections.',
        },
      },
      {
        q: {
          ru: 'Сколько данных можно собрать?',
          kk: 'Қанша деректі жинауға болады?',
          en: 'How much data can be collected?',
        },
        a: {
          ru: 'От сотен до десятков тысяч строк, в зависимости от сайта. Объём влияет на время работы скрипта, а в цене учитывается сложность сайта, а не число строк.',
          kk: 'Сайтқа байланысты жүздеген жолдан он мыңдаған жолға дейін. Көлем скриптің жұмыс уақытына әсер етеді, ал бағада жолдар саны емес, сайттың күрделілігі ескеріледі.',
          en: 'From hundreds to tens of thousands of rows, depending on the site. Volume affects how long the script runs, while the price reflects the complexity of the site rather than the row count.',
        },
      },
      {
        q: {
          ru: 'Данные будут обновляться автоматически?',
          kk: 'Деректер автоматты түрде жаңарып тұра ма?',
          en: 'Will the data refresh automatically?',
        },
        a: {
          ru: 'Базовая версия запускается вручную одной командой. Запуск по расписанию с отправкой в таблицу возможен как доработка.',
          kk: 'Негізгі нұсқа бір командамен қолмен іске қосылады. Кесте бойынша іске қосып, кестеге жіберу жетілдіру ретінде мүмкін.',
          en: 'The basic version runs manually with one command. Scheduled runs that push into a sheet are possible as an extension.',
        },
      },
    ],
    relatedProducts: ['integraciya-api', 'kaspi-xml', 'ai-opisaniya-tovarov'],
  },
];
