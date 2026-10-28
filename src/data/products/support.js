export default [
  {
    slug: 'ispravlenie-oshibok',
    category: 'support',
    title: {
      ru: 'Исправление ошибок на сайте',
      kk: 'Сайттағы қателерді түзету',
      en: 'Website bug fixing',
    },
    short: {
      ru: 'Находим причину сбоя на сайте и чиним: форму, вёрстку, медленную загрузку или ошибку после обновления.',
      kk: 'Сайттағы ақаудың себебін тауып, түзетеміз: форма, беттеу, баяу жүктелу немесе жаңартудан кейінгі қате.',
      en: 'I find what broke your site and fix it: a form, a layout, slow loading or an error after an update.',
    },
    description: {
      ru: 'Если форма не отправляется, страница «поехала» на телефоне или сайт выдаёт ошибку после обновления, нужна точечная диагностика, а не новый сайт. Сначала я воспроизвожу проблему и называю причину, затем исправляю её и проверяю результат в разных браузерах и на телефоне. Работаю с сайтами на React, Next.js, Django и обычным HTML.',
      kk: 'Форма жіберілмесе, бет телефонда бұзылып көрінсе немесе сайт жаңартудан кейін қате шығарса, жаңа сайт емес, нақты диагностика керек. Алдымен мәселені қайталап, себебін айтамын, содан кейін түзетіп, нәтижені әртүрлі браузерде және телефонда тексеремін. React, Next.js, Django және қарапайым HTML сайттарымен жұмыс істеймін.',
      en: 'When a form stops sending, a page breaks on phones or the site throws an error after an update, you need targeted diagnosis rather than a new website. I reproduce the problem, tell you the cause, fix it and check the result in several browsers and on a phone. I work with sites built on React, Next.js, Django or plain HTML.',
    },
    priceFrom: 5000,
    unit: 'once',
    days: { min: 1, max: 2 },
    includes: {
      ru: [
        'Воспроизведение проблемы и поиск причины',
        'Исправление ошибки в коде или настройках',
        'Проверка в Chrome, Safari и на телефоне',
        'Правка сломанной вёрстки и неработающих форм',
        'Короткий отчёт: что было не так и что изменено',
        'Откат изменений, если правка что-то задела',
      ],
      kk: [
        'Мәселені қайталап көру және себебін табу',
        'Кодтағы немесе баптаудағы қатені түзету',
        'Chrome, Safari және телефонда тексеру',
        'Бұзылған беттеуді және істемейтін формаларды жөндеу',
        'Қысқа есеп: не бұзылған және не өзгерген',
        'Түзету басқа жерге әсер етсе, өзгерісті кері қайтару',
      ],
      en: [
        'Reproducing the problem and finding its cause',
        'Fixing the error in code or configuration',
        'Testing in Chrome, Safari and on a phone',
        'Repairing broken layouts and non-working forms',
        'A short report of what was wrong and what changed',
        'Rolling the change back if a fix affects something else',
      ],
    },
    notIncluded: {
      ru: [
        'Новые функции и разделы: это отдельная доработка',
        'Исправление ошибок, вызванных сбоем на стороне хостинга',
        'Работа с сайтами на закрытых конструкторах без доступа к коду',
      ],
      kk: [
        'Жаңа функциялар мен бөлімдер: бұл бөлек жұмыс',
        'Хостинг жағындағы ақаудан туындаған қателерді түзету',
        'Коды жабық конструкторлардағы сайттармен жұмыс',
      ],
      en: [
        'New features and sections, which count as separate development',
        'Errors caused by an outage on the hosting provider side',
        'Sites on closed builders where I cannot access the code',
      ],
    },
    forWhom: {
      ru: 'Владельцам сайтов, у которых что-то перестало работать, а разработчик недоступен или сайт достался от подрядчика без документации.',
      kk: 'Сайты бір жерінен істемей қалған, әзірлеушісі қол жетпейтін немесе сайт құжатсыз келіп түскен иелеріне арналған.',
      en: 'For site owners whose website stopped working when the original developer is unavailable, or who inherited a site with no documentation.',
    },
    faq: [
      {
        q: {
          ru: 'Сколько стоит исправление, если ошибка сложная?',
          kk: 'Қате күрделі болса, түзету қанша тұрады?',
          en: 'What if the bug turns out to be complicated?',
        },
        a: {
          ru: 'Цена от 5 000 ₸ относится к простым правкам. После диагностики я называю итоговую сумму и сроки, и работу начинаю только после вашего согласия.',
          kk: 'Бағасы 5 000 ₸-ден қарапайым түзетулерге қатысты. Диагностикадан кейін қорытынды соманы мен мерзімді айтамын, жұмысты тек сіз келіскен соң бастаймын.',
          en: 'The 5,000 KZT starting price covers simple fixes. After diagnosis I give you the final amount and timeline, and I start only after you agree.',
        },
      },
      {
        q: {
          ru: 'Какой доступ мне нужно дать?',
          kk: 'Маған қандай қолжетімділік беру керек?',
          en: 'What access do I need to give you?',
        },
        a: {
          ru: 'Обычно достаточно доступа к хостингу или репозиторию. Перед работой я делаю копию сайта, чтобы любую правку можно было отменить.',
          kk: 'Әдетте хостингке немесе репозиторийге қолжетімділік жеткілікті. Жұмыс алдында сайттың көшірмесін жасаймын, сонда кез келген түзетуді кері қайтаруға болады.',
          en: 'Hosting or repository access is usually enough. Before I touch anything I make a copy of the site so any change can be undone.',
        },
      },
      {
        q: {
          ru: 'Можно ли потом заказать регулярный присмотр?',
          kk: 'Кейін тұрақты қарауды тапсыруға бола ма?',
          en: 'Can I have someone keep an eye on the site afterwards?',
        },
        a: {
          ru: 'Да, для этого есть ежемесячная поддержка. Если ошибки повторяются, я подскажу, стоит ли переходить на неё или достаточно разовой правки.',
          kk: 'Иә, ол үшін айлық қолдау бар. Қателер қайталанса, соған көшкен жөн бе, әлде бір реттік түзету жеткілікті ме, соны айтамын.',
          en: 'Yes, monthly support exists for that. If errors keep coming back, I will tell you whether it is worth switching to it or whether a one-off fix is enough.',
        },
      },
    ],
    relatedProducts: ['podderzhka-saita', 'dorabotka-saita', 'uskorenie-saita'],
  },
  {
    slug: 'podderzhka-saita',
    category: 'support',
    title: {
      ru: 'Ежемесячная поддержка сайта',
      kk: 'Сайтты айлық қолдау',
      en: 'Monthly website support',
    },
    short: {
      ru: 'Обновления, резервные копии, мелкие правки и быстрая реакция на сбои за фиксированную сумму в месяц.',
      kk: 'Жаңартулар, резервтік көшірмелер, шағын өзгерістер және ақауға жылдам жауап: айына тіркелген сома.',
      en: 'Updates, backups, small edits and quick response to outages for a fixed monthly fee.',
    },
    description: {
      ru: 'Сайт нужно не только запустить, но и содержать: обновлять библиотеки, следить за сертификатом и доменом, вносить мелкие правки в тексты и цены. За фиксированную сумму в месяц я беру это на себя и пишу вам, если что-то требует решения. Подходит сайтам, которые я делал, и чужим, если у меня есть доступ к коду или панели.',
      kk: 'Сайтты іске қосу ғана емес, оны күтіп отыру да керек: кітапханаларды жаңарту, сертификат пен доменді қадағалау, мәтіндер мен бағаларға шағын өзгерістер енгізу. Айына тіркелген сомаға мұны мен өзіме аламын және шешім қажет болса, сізге жазамын. Мен жасаған сайттарға да, коды немесе панеліне қолжетімділік болса, басқа сайттарға да жарайды.',
      en: 'A website needs to be maintained after launch: libraries updated, the certificate and domain watched, small text and price edits made. For a fixed monthly fee I take this on and message you when something needs a decision. It works for sites I built and for other sites, as long as I have access to the code or admin panel.',
    },
    priceFrom: 15000,
    unit: 'month',
    days: { min: 1, max: 2 },
    includes: {
      ru: [
        'Еженедельная проверка: сайт открывается, формы отправляют заявки',
        'Обновление зависимостей и плагинов с проверкой после обновления',
        'Резервная копия сайта и базы данных раз в неделю',
        'Контроль срока действия домена и SSL-сертификата',
        'Мелкие правки текстов, цен и картинок в рамках согласованного лимита часов',
        'Ответ на сообщение о сбое в рабочие дни в течение дня',
      ],
      kk: [
        'Апта сайынғы тексеру: сайт ашылады, формалар өтінімдерді жібереді',
        'Тәуелділіктер мен плагиндерді жаңарту және жаңартудан кейін тексеру',
        'Сайттың және деректер қорының аптасына бір рет резервтік көшірмесі',
        'Домен мен SSL-сертификаттың мерзімін қадағалау',
        'Келісілген сағат лимиті шегінде мәтін, баға және суреттерге шағын өзгерістер',
        'Ақау туралы хабарламаға жұмыс күндері бір күн ішінде жауап беру',
      ],
      en: [
        'A weekly check that the site opens and forms deliver requests',
        'Dependency and plugin updates, tested afterwards',
        'A weekly backup of the site and its database',
        'Tracking domain and SSL certificate expiry dates',
        'Small text, price and image edits within an agreed number of hours',
        'A reply to an outage report within one working day',
      ],
    },
    notIncluded: {
      ru: [
        'Новые разделы и крупные функции: оцениваются отдельно',
        'Оплата домена и хостинга: платится вами регистратору и хостеру',
        'Круглосуточное дежурство: отвечаю в рабочие дни',
      ],
      kk: [
        'Жаңа бөлімдер мен ірі функциялар: бөлек бағаланады',
        'Домен мен хостинг төлемі: оны сіз тіркеушіге және хостерге төлейсіз',
        'Тәулік бойы кезекшілік: жұмыс күндері жауап беремін',
      ],
      en: [
        'New sections and larger features, which are quoted separately',
        'Domain and hosting fees, which you pay directly to the registrar and host',
        'Round-the-clock on-call duty; I reply on working days',
      ],
    },
    forWhom: {
      ru: 'Владельцам бизнес-сайтов, которым некогда заниматься техническими мелочами и нужен один человек, к которому можно обратиться.',
      kk: 'Техникалық ұсақ-түйекке уақыты жоқ және бір адамға жүгінгісі келетін бизнес-сайт иелеріне арналған.',
      en: 'For owners of business websites who have no time for technical chores and want one person to turn to.',
    },
    faq: [
      {
        q: {
          ru: 'Что входит в лимит часов на правки?',
          kk: 'Өзгерістерге арналған сағат лимитіне не кіреді?',
          en: 'How does the hours limit for edits work?',
        },
        a: {
          ru: 'Лимит мы согласуем заранее, исходя из размера сайта. Если правок бывает больше, я предупрежу и предложу либо увеличить пакет, либо оплатить лишние часы отдельно.',
          kk: 'Лимитті сайттың көлеміне қарай алдын ала келісеміз. Өзгерістер көп болса, ескертіп, не пакетті ұлғайтуды, не артық сағаттарды бөлек төлеуді ұсынамын.',
          en: 'We agree the limit in advance based on the size of the site. If you need more edits, I warn you and suggest either a bigger package or paying for the extra hours separately.',
        },
      },
      {
        q: {
          ru: 'Можно ли отказаться в любой момент?',
          kk: 'Кез келген уақытта бас тартуға бола ма?',
          en: 'Can I stop at any time?',
        },
        a: {
          ru: 'Да, поддержка помесячная. Перед окончанием я передаю вам актуальную резервную копию и список всех доступов.',
          kk: 'Иә, қолдау айлық. Аяқтар алдында сізге өзекті резервтік көшірме мен барлық қолжетімділіктердің тізімін беремін.',
          en: 'Yes, support is month by month. When we finish I hand over the latest backup and a list of all accesses.',
        },
      },
      {
        q: {
          ru: 'Вы поддерживаете сайты, сделанные не вами?',
          kk: 'Сіз жасамаған сайттарды қолдайсыз ба?',
          en: 'Do you support sites you did not build?',
        },
        a: {
          ru: 'Да, если сайт написан на знакомом мне стеке и есть доступ к коду. Сначала я бесплатно смотрю сайт и честно говорю, возьмусь ли.',
          kk: 'Иә, егер сайт маған таныс стекте жазылған болса және кодқа қолжетімділік болса. Алдымен сайтты тегін қарап, алатынымды не алмайтынымды ашық айтамын.',
          en: 'Yes, if it is written in a stack I know and I have access to the code. I first look at the site for free and tell you honestly whether I will take it on.',
        },
      },
    ],
    relatedProducts: ['ispravlenie-oshibok', 'domen-hosting-ssl', 'seo-audit'],
  },
  {
    slug: 'redizain',
    category: 'support',
    title: {
      ru: 'Редизайн сайта',
      kk: 'Сайт редизайны',
      en: 'Website redesign',
    },
    short: {
      ru: 'Обновляем внешний вид и структуру устаревшего сайта, сохраняя адреса страниц и важное содержимое.',
      kk: 'Ескірген сайттың сыртқы түрі мен құрылымын жаңартамыз, бет мекенжайлары мен маңызды мазмұнды сақтаймыз.',
      en: 'A fresh look and structure for an outdated site, keeping page addresses and the content that matters.',
    },
    description: {
      ru: 'Сайт десятилетней давности плохо смотрится на телефоне и теряет клиентов ещё до первого звонка. Я перерисовываю внешний вид, упрощаю структуру и делаю адаптивную вёрстку, а тексты и страницы, которые уже приводят посетителей, оставляю. Адреса страниц сохраняю или настраиваю перенаправления, чтобы не потерять позиции в поиске.',
      kk: 'Он жыл бұрынғы сайт телефонда нашар көрінеді және алғашқы қоңырауға дейін-ақ клиенттерді жоғалтады. Мен сыртқы түрін қайта сызамын, құрылымды жеңілдетемін және адаптивті беттеме жасаймын, ал келушілерді әкеліп жүрген мәтіндер мен беттерді қалдырамын. Іздеудегі орындарды жоғалтпау үшін бет мекенжайларын сақтаймын немесе бағыттауларды баптаймын.',
      en: 'A site that is ten years old looks poor on a phone and loses customers before the first call. I redraw the visual design, simplify the structure and build a responsive layout, while keeping the texts and pages that already bring visitors. Page addresses stay the same, or I set up redirects, so search rankings are not lost.',
    },
    priceFrom: 60000,
    unit: 'once',
    days: { min: 7, max: 14 },
    includes: {
      ru: [
        'Разбор текущего сайта: что оставить, что убрать, что переписать',
        'Новый дизайн главной и ключевых страниц',
        'Адаптивная вёрстка для телефона, планшета и компьютера',
        'Сохранение адресов страниц или настройка 301-перенаправлений',
        'Перенос существующих текстов и фотографий в новый макет',
        'Ускорение загрузки: сжатие картинок и чистка лишних скриптов',
        'Проверка форм и ссылок перед запуском',
      ],
      kk: [
        'Қазіргі сайтты талдау: нені қалдыру, нені алып тастау, нені қайта жазу',
        'Басты беттің және негізгі беттердің жаңа дизайны',
        'Телефон, планшет және компьютерге арналған адаптивті беттеме',
        'Бет мекенжайларын сақтау немесе 301-бағыттауларды баптау',
        'Бар мәтіндер мен фотосуреттерді жаңа макетке көшіру',
        'Жүктелуді жылдамдату: суреттерді сығу және артық скрипттерді тазалау',
        'Іске қосар алдында формалар мен сілтемелерді тексеру',
      ],
      en: [
        'A review of the current site: what to keep, remove or rewrite',
        'A new design for the home page and key pages',
        'A responsive layout for phone, tablet and desktop',
        'Keeping page addresses or setting up 301 redirects',
        'Moving your existing texts and photos into the new layout',
        'Faster loading through image compression and removing unused scripts',
        'Checking forms and links before launch',
      ],
    },
    notIncluded: {
      ru: [
        'Новые тексты и фотосъёмка: используем ваши материалы',
        'Новые функции вроде корзины или личного кабинета',
        'Оплата хостинга и домена регистратору и хостеру',
      ],
      kk: [
        'Жаңа мәтіндер мен фотосъёмка: сіздің материалдарыңызды пайдаланамыз',
        'Себет немесе жеке кабинет сияқты жаңа функциялар',
        'Хостинг пен доменге тіркеушіге және хостерге төленетін төлем',
      ],
      en: [
        'New copywriting and photography; we use your existing materials',
        'New functions such as a cart or a customer account',
        'Hosting and domain fees paid to the registrar and host',
      ],
    },
    forWhom: {
      ru: 'Компаниям с работающим, но устаревшим сайтом, который выглядит несовременно и неудобен на телефоне.',
      kk: 'Жұмыс істейтін, бірақ ескірген, заманауи көрінбейтін және телефонда ыңғайсыз сайты бар компанияларға арналған.',
      en: 'For businesses with a working but dated website that looks old-fashioned and is awkward to use on a phone.',
    },
    faq: [
      {
        q: {
          ru: 'Потеряю ли я позиции в Google и Яндексе?',
          kk: 'Google мен Яндекстегі орнымды жоғалтамын ба?',
          en: 'Will I lose my Google rankings?',
        },
        a: {
          ru: 'Риск есть при любой смене сайта, поэтому я сохраняю адреса и заголовки важных страниц и настраиваю перенаправления. Гарантировать позиции нельзя, но я снижаю риск их потери.',
          kk: 'Сайтты ауыстырған кезде тәуекел әрқашан бар, сондықтан маңызды беттердің мекенжайы мен тақырыптарын сақтап, бағыттауларды баптаймын. Орындарға кепілдік беруге болмайды, бірақ жоғалту қаупін азайтамын.',
          en: 'Any site change carries some risk, so I keep the addresses and headings of important pages and set up redirects. I cannot guarantee rankings, but I reduce the chance of losing them.',
        },
      },
      {
        q: {
          ru: 'Нужно ли менять платформу?',
          kk: 'Платформаны ауыстыру керек пе?',
          en: 'Do we need to change platforms?',
        },
        a: {
          ru: 'Не всегда. Если нынешняя платформа справляется, я переделываю только оформление. Если она мешает, предложу перенос и объясню почему.',
          kk: 'Міндетті емес. Қазіргі платформа жарайтын болса, тек безендіруді өзгертемін. Ол кедергі болса, көшіруді ұсынып, себебін түсіндіремін.',
          en: 'Not always. If the current platform copes, I only redo the design. If it gets in the way, I will suggest a move and explain why.',
        },
      },
      {
        q: {
          ru: 'Увижу ли я макет до запуска?',
          kk: 'Іске қосқанға дейін макетті көремін бе?',
          en: 'Will I see the design before launch?',
        },
        a: {
          ru: 'Да. Я показываю макет главной страницы до вёрстки, и мы вносим правки. Новый сайт запускаю только после вашего одобрения.',
          kk: 'Иә. Беттемеге дейін басты беттің макетін көрсетемін, өзгерістерді бірге енгіземіз. Жаңа сайтты сіз мақұлдағаннан кейін ғана іске қосамын.',
          en: 'Yes. I show the home page design before building it and we make changes. I launch the new site only after you approve it.',
        },
      },
    ],
    relatedProducts: ['perenos-saita', 'uskorenie-saita', 'korporativnyi-sait'],
  },
  {
    slug: 'dorabotka-saita',
    category: 'support',
    title: {
      ru: 'Доработка сайта',
      kk: 'Сайтты жетілдіру',
      en: 'Website improvements',
    },
    short: {
      ru: 'Добавляем на готовый сайт новую страницу, форму, калькулятор или интеграцию без переделки с нуля.',
      kk: 'Дайын сайтқа жаңа бет, форма, калькулятор немесе интеграцияны басынан қайта жасамай қосамыз.',
      en: 'I add a new page, form, calculator or integration to an existing site without rebuilding it from scratch.',
    },
    description: {
      ru: 'Бизнес растёт, и сайту нужны новые возможности: страница с услугой, форма заявки с уведомлением в Telegram, калькулятор стоимости, онлайн-запись. Я изучаю существующий код, встраиваю нужное в ваш дизайн и стараюсь не ломать то, что уже работает. Перед правками делаю копию сайта.',
      kk: 'Бизнес өседі, сайтқа жаңа мүмкіндіктер керек болады: қызмет беті, Telegram-ға хабарлайтын өтінім формасы, құн калькуляторы, онлайн-жазылу. Мен бар кодты зерттеп, қажетті нәрсені сіздің дизайныңызға енгіземін және істеп тұрғанды бұзбауға тырысамын. Өзгерістерден бұрын сайттың көшірмесін жасаймын.',
      en: 'Your business grows and the site needs new capabilities: a service page, a request form that notifies you in Telegram, a price calculator, online booking. I study the existing code, build the addition into your design and take care not to break what already works. I make a copy of the site before changing anything.',
    },
    priceFrom: 15000,
    unit: 'once',
    days: { min: 2, max: 5 },
    includes: {
      ru: [
        'Обсуждение задачи и точная смета до начала работы',
        'Изучение существующего кода и структуры сайта',
        'Реализация новой страницы, формы или функции в вашем стиле',
        'Подключение уведомлений о заявках в Telegram или на почту',
        'Проверка на телефоне и в основных браузерах',
        'Копия сайта до правок и инструкция, как пользоваться новой функцией',
      ],
      kk: [
        'Міндетті талқылау және жұмыс басталғанға дейін нақты смета',
        'Бар код пен сайт құрылымын зерттеу',
        'Жаңа бетті, форманы немесе функцияны сіздің стильде жасау',
        'Өтінімдер туралы хабарламаларды Telegram-ға немесе поштаға қосу',
        'Телефонда және негізгі браузерлерде тексеру',
        'Өзгерістерге дейінгі көшірме және жаңа функцияны пайдалану нұсқаулығы',
      ],
      en: [
        'A discussion of the task and an exact estimate before work starts',
        'A study of the existing code and site structure',
        'Building the new page, form or feature in your style',
        'Connecting request notifications to Telegram or email',
        'Testing on a phone and in the main browsers',
        'A copy of the site from before the changes and a short guide to the new feature',
      ],
    },
    notIncluded: {
      ru: [
        'Полная переделка дизайна: для неё есть редизайн',
        'Сайты на закрытых конструкторах, где нельзя менять код',
        'Платные сервисы и подписки, которые вы подключаете к сайту',
      ],
      kk: [
        'Дизайнды толық өзгерту: ол үшін редизайн бар',
        'Кодты өзгертуге болмайтын жабық конструкторлардағы сайттар',
        'Сіз сайтқа қосатын ақылы сервистер мен жазылымдар',
      ],
      en: [
        'A full visual overhaul, which is what the redesign service is for',
        'Sites on closed builders where the code cannot be changed',
        'Paid third-party services and subscriptions you connect to the site',
      ],
    },
    forWhom: {
      ru: 'Владельцам готовых сайтов, которым нужно одно конкретное улучшение, а не новый проект.',
      kk: 'Жаңа жоба емес, бір нақты жақсартуды қажет ететін дайын сайт иелеріне арналған.',
      en: 'For owners of existing sites who need one specific improvement rather than a new project.',
    },
    faq: [
      {
        q: {
          ru: 'От чего зависит цена доработки?',
          kk: 'Жетілдірудің бағасы неге байланысты?',
          en: 'What determines the price?',
        },
        a: {
          ru: 'От объёма задачи и состояния кода. Простую страницу или форму можно сделать от 15 000 ₸, для интеграций и логики цену называю после просмотра сайта.',
          kk: 'Тапсырма көлемі мен код жағдайына байланысты. Қарапайым бет немесе форма 15 000 ₸-ден жасалады, интеграция мен логика үшін бағаны сайтты көргеннен кейін айтамын.',
          en: 'On the size of the task and the state of the code. A simple page or form starts at 15,000 KZT; for integrations and logic I quote after looking at the site.',
        },
      },
      {
        q: {
          ru: 'А если код написан плохо?',
          kk: 'Код нашар жазылған болса ше?',
          en: 'What if the existing code is messy?',
        },
        a: {
          ru: 'Я скажу об этом до начала и объясню, как это влияет на цену. Иногда дешевле переписать небольшой кусок, чем обходить проблему.',
          kk: 'Бұл туралы жұмыс басталғанға дейін айтып, бағаға қалай әсер ететінін түсіндіремін. Кейде мәселені айналып өткенше шағын бөлікті қайта жазған арзанырақ.',
          en: 'I will say so before we start and explain how it affects the price. Sometimes rewriting a small piece is cheaper than working around the problem.',
        },
      },
      {
        q: {
          ru: 'Можно ли заказать несколько правок сразу?',
          kk: 'Бірнеше өзгерісті бірден тапсыруға бола ма?',
          en: 'Can I order several changes at once?',
        },
        a: {
          ru: 'Да, список задач я оцениваю целиком, и вместе обычно выходит дешевле, чем по отдельности. Сроки зависят от количества пунктов.',
          kk: 'Иә, тапсырмалар тізімін түгел бағалаймын, бірге әдетте бөлек-бөлек тапсырғаннан арзанырақ болады. Мерзім тармақтар санына байланысты.',
          en: 'Yes. I estimate the whole list, and doing them together is usually cheaper than separately. The timeline depends on the number of items.',
        },
      },
    ],
    relatedProducts: ['podderzhka-saita', 'zayavki-v-google-sheets', 'uvedomleniya-o-zayavkah'],
  },
  {
    slug: 'domen-hosting-ssl',
    category: 'support',
    title: {
      ru: 'Домен, хостинг и SSL',
      kk: 'Домен, хостинг және SSL',
      en: 'Domain, hosting and SSL setup',
    },
    short: {
      ru: 'Помогаю выбрать и оформить домен и хостинг, подключить его к сайту и включить защищённое соединение.',
      kk: 'Домен мен хостингті таңдап, рәсімдеуге, оны сайтқа қосуға және қауіпсіз қосылымды іске қосуға көмектесемін.',
      en: 'I help you choose and register a domain and hosting, connect them to your site and switch on HTTPS.',
    },
    description: {
      ru: 'Домен, DNS-записи и сертификат кажутся простыми, пока сайт не перестаёт открываться. Я подберу зону и хостинг под ваш проект, помогу зарегистрировать домен на вас, настрою DNS и включу HTTPS с автоматическим продлением сертификата. Домен всегда оформляется на ваше имя, а доступы остаются у вас.',
      kk: 'Домен, DNS жазбалары және сертификат сайт ашылмай қалғанша қарапайым көрінеді. Жобаңызға лайық аймақ пен хостингті таңдап, доменді сіздің атыңызға тіркеуге көмектесемін, DNS-ті баптап, сертификатты автоматты жаңартатын HTTPS-ті қосамын. Домен әрқашан сіздің атыңызға рәсімделеді, қолжетімділіктер сізде қалады.',
      en: 'Domains, DNS records and certificates seem simple until a site stops opening. I help pick a domain zone and hosting that suit your project, register the domain in your name, configure DNS and switch on HTTPS with automatic certificate renewal. The domain is always registered to you and the logins stay with you.',
    },
    priceFrom: 10000,
    unit: 'once',
    days: { min: 1, max: 2 },
    includes: {
      ru: [
        'Подбор доменного имени и зоны (.kz, .com и другие)',
        'Помощь с регистрацией домена на ваше имя',
        'Выбор тарифа хостинга под нагрузку сайта',
        'Настройка DNS-записей для сайта',
        'Подключение SSL-сертификата и автоматическое продление',
        'Перенаправление с http на https и с www на основной адрес',
      ],
      kk: [
        'Домен атауы мен аймағын таңдау (.kz, .com және басқалар)',
        'Доменді сіздің атыңызға тіркеуге көмектесу',
        'Сайт жүктемесіне сай хостинг тарифін таңдау',
        'Сайтқа арналған DNS жазбаларын баптау',
        'SSL-сертификатты қосу және автоматты жаңарту',
        'http-тен https-ке және www-дан негізгі мекенжайға бағыттау',
      ],
      en: [
        'Choosing a domain name and zone (.kz, .com and others)',
        'Help registering the domain in your name',
        'Picking a hosting plan that fits the site load',
        'Configuring DNS records for the site',
        'Installing an SSL certificate with automatic renewal',
        'Redirects from http to https and from www to the main address',
      ],
    },
    notIncluded: {
      ru: [
        'Плата за домен и хостинг: вы платите её регистратору и хостеру напрямую',
        'Разработка самого сайта: услуга касается только инфраструктуры',
        'Перенос сайта с другого хостинга: он оформляется отдельно',
      ],
      kk: [
        'Домен мен хостинг ақысы: оны тіркеушіге және хостерге тікелей төлейсіз',
        'Сайттың өзін әзірлеу: қызмет тек инфрақұрылымға қатысты',
        'Сайтты басқа хостингтен көшіру: ол бөлек рәсімделеді',
      ],
      en: [
        'Domain and hosting fees, which you pay directly to the registrar and the host',
        'Building the website itself; this service covers infrastructure only',
        'Moving a site from another host, which is a separate service',
      ],
    },
    forWhom: {
      ru: 'Тем, кто запускает первый сайт или сменил адрес и не хочет разбираться в DNS и сертификатах самостоятельно.',
      kk: 'Алғашқы сайтын іске қосып жатқан немесе мекенжайын өзгерткен және DNS пен сертификатқа өзі бойлағысы келмейтіндерге арналған.',
      en: 'For people launching a first site or changing an address who would rather not work out DNS and certificates themselves.',
    },
    faq: [
      {
        q: {
          ru: 'На чьё имя будет оформлен домен?',
          kk: 'Домен кімнің атына рәсімделеді?',
          en: 'Whose name will the domain be registered to?',
        },
        a: {
          ru: 'На ваше. Вы сами создаёте аккаунт у регистратора и оплачиваете домен, а я подсказываю шаги и настраиваю DNS по вашему доступу.',
          kk: 'Сіздің атыңызға. Тіркеушіден аккаунтты өзіңіз ашып, доменді өзіңіз төлейсіз, ал мен қадамдарды айтып, сіз берген қолжетімділікпен DNS-ті баптаймын.',
          en: 'Yours. You create the registrar account and pay for the domain yourself; I guide the steps and configure DNS using access you provide.',
        },
      },
      {
        q: {
          ru: 'Сколько стоят домен и хостинг?',
          kk: 'Домен мен хостинг қанша тұрады?',
          en: 'How much do the domain and hosting cost?',
        },
        a: {
          ru: 'Цены зависят от зоны и тарифа выбранного провайдера и меняются, поэтому я называю актуальные варианты на момент выбора. Эти суммы не входят в стоимость моей работы.',
          kk: 'Бағалар таңдалған провайдердің аймағы мен тарифіне байланысты және өзгеріп тұрады, сондықтан таңдау сәтіндегі өзекті нұсқаларды айтамын. Бұл сомалар менің жұмысымның құнына кірмейді.',
          en: 'Prices depend on the zone and the provider plan and change over time, so I list current options when you choose. These amounts are not part of the price of my work.',
        },
      },
      {
        q: {
          ru: 'Что делать, если сайт показывает «Не защищено»?',
          kk: 'Сайт «Қорғалмаған» деп көрсетсе не істеу керек?',
          en: 'What if my browser says the site is not secure?',
        },
        a: {
          ru: 'Обычно сертификат просрочен или не подключён. Я проверю причину, установлю новый сертификат и включу автопродление, чтобы это не повторилось.',
          kk: 'Әдетте сертификаттың мерзімі өткен немесе қосылмаған. Себебін тексеріп, жаңа сертификатты орнатып, мұның қайталанбауы үшін автоматты жаңартуды қосамын.',
          en: 'Usually the certificate has expired or was never installed. I check the cause, install a new certificate and turn on auto-renewal so it does not happen again.',
        },
      },
    ],
    relatedProducts: ['pochta-na-domene', 'perenos-saita', 'podderzhka-saita'],
  },
  {
    slug: 'perenos-saita',
    category: 'support',
    title: {
      ru: 'Перенос сайта на другой хостинг',
      kk: 'Сайтты басқа хостингке көшіру',
      en: 'Website migration to a new host',
    },
    short: {
      ru: 'Переношу сайт и базу данных на новый хостинг без потери данных и с минимальным простоем.',
      kk: 'Сайт пен деректер қорын жаңа хостингке деректерді жоғалтпай және минималды тоқтаумен көшіремін.',
      en: 'I move your site and database to a new host without losing data and with minimal downtime.',
    },
    description: {
      ru: 'Хостинг подорожал, работает нестабильно или старый тариф закрывают, и сайт нужно перевезти. Я копирую файлы и базу данных, поднимаю сайт на новом сервере, проверяю его по временному адресу и только потом переключаю домен. Старый хостинг остаётся включённым, пока вы не убедитесь, что всё работает.',
      kk: 'Хостинг қымбаттады, тұрақсыз істейді немесе ескі тариф жабылады, сондықтан сайтты көшіру керек. Мен файлдар мен деректер қорын көшіріп, сайтты жаңа серверде көтеремін, уақытша мекенжай бойынша тексеремін, содан кейін ғана доменді ауыстырамын. Барлығы жұмыс істейтініне көз жеткізгенше ескі хостинг қосулы қалады.',
      en: 'Your hosting got more expensive, runs unreliably or the old plan is being shut down, so the site has to move. I copy the files and database, set the site up on the new server, test it at a temporary address and only then switch the domain. The old host stays active until you confirm everything works.',
    },
    priceFrom: 15000,
    unit: 'once',
    days: { min: 1, max: 3 },
    includes: {
      ru: [
        'Полная копия файлов и базы данных перед переносом',
        'Развёртывание сайта на новом хостинге или VPS',
        'Проверка сайта по временному адресу до переключения',
        'Переключение домена и DNS в удобное для вас время',
        'Установка SSL-сертификата на новом месте',
        'Перенос почтовых ящиков на домене, если они есть',
      ],
      kk: [
        'Көшіруге дейін файлдар мен деректер қорының толық көшірмесі',
        'Сайтты жаңа хостингте немесе VPS-те орналастыру',
        'Ауыстырғанға дейін сайтты уақытша мекенжай бойынша тексеру',
        'Доменді және DNS-ті өзіңізге ыңғайлы уақытта ауыстыру',
        'Жаңа орында SSL-сертификатты орнату',
        'Доменде пошта жәшіктері болса, оларды көшіру',
      ],
      en: [
        'A full copy of files and database before the move',
        'Deploying the site on the new host or VPS',
        'Testing the site at a temporary address before switching',
        'Switching the domain and DNS at a time that suits you',
        'Installing the SSL certificate at the new location',
        'Moving mailboxes on your domain, if there are any',
      ],
    },
    notIncluded: {
      ru: [
        'Оплата нового хостинга: вы платите её хостеру напрямую',
        'Исправление ошибок, которые были на сайте до переноса',
        'Перенос с конструкторов, которые не дают выгрузить сайт',
      ],
      kk: [
        'Жаңа хостингтің ақысы: оны хостерге тікелей төлейсіз',
        'Көшіруге дейін сайтта болған қателерді түзету',
        'Сайтты экспорттауға рұқсат бермейтін конструкторлардан көшіру',
      ],
      en: [
        'Fees for the new hosting, which you pay directly to the host',
        'Fixing bugs that existed on the site before the move',
        'Moves from site builders that do not allow exporting the site',
      ],
    },
    forWhom: {
      ru: 'Владельцам сайтов, которые меняют хостинг и боятся потерять данные, заявки или доступность сайта.',
      kk: 'Хостингті ауыстырып жатқан және деректерді, өтінімдерді немесе сайттың қолжетімділігін жоғалтудан қорқатын сайт иелеріне арналған.',
      en: 'For site owners changing hosts who worry about losing data, enquiries or uptime.',
    },
    faq: [
      {
        q: {
          ru: 'Будет ли сайт недоступен во время переноса?',
          kk: 'Көшіру кезінде сайт қолжетімсіз болады ма?',
          en: 'Will the site go offline during the move?',
        },
        a: {
          ru: 'Сайт продолжает работать на старом месте, пока новое проверяется. Обновление DNS занимает от минут до нескольких часов, но сайт в это время открывается либо там, либо там.',
          kk: 'Жаңа орын тексерілгенше сайт ескі жерінде жұмыс істей береді. DNS жаңаруы бірнеше минуттан бірнеше сағатқа дейін созылады, бірақ осы уақытта сайт не бұл жерде, не ол жерде ашылады.',
          en: 'The site keeps running at the old host while the new one is tested. DNS updates take from minutes to a few hours, but during that time the site opens from one place or the other.',
        },
      },
      {
        q: {
          ru: 'Какие данные мне нужны для переноса?',
          kk: 'Көшіру үшін маған қандай деректер керек?',
          en: 'What information do you need from me?',
        },
        a: {
          ru: 'Доступ к старому хостингу или панели, доступ к управлению доменом и аккаунт на новом хостинге. Всё это можно закрыть паролями и сменить после переноса.',
          kk: 'Ескі хостингке немесе панельге қолжетімділік, доменді басқаруға қолжетімділік және жаңа хостингтегі аккаунт. Мұның бәрін құпиясөзбен қорғап, көшіруден кейін ауыстыруға болады.',
          en: 'Access to the old hosting or panel, access to domain management and an account at the new host. You can change all those passwords after the move.',
        },
      },
      {
        q: {
          ru: 'Подойдёт ли это для сайта на WordPress?',
          kk: 'Бұл WordPress сайтына жарай ма?',
          en: 'Does this work for a WordPress site?',
        },
        a: {
          ru: 'Да, если есть доступ к файлам и базе данных. Для закрытых конструкторов, откуда нельзя выгрузить сайт, перенос невозможен, и я скажу об этом сразу.',
          kk: 'Иә, файлдар мен деректер қорына қолжетімділік болса. Сайтты экспорттау мүмкін емес жабық конструкторлар үшін көшіру мүмкін емес, мұны бірден айтамын.',
          en: 'Yes, as long as I can reach the files and the database. For closed builders that cannot export a site, a move is not possible and I will tell you that straight away.',
        },
      },
    ],
    relatedProducts: ['domen-hosting-ssl', 'pochta-na-domene', 'podderzhka-saita'],
  },
  {
    slug: 'pochta-na-domene',
    category: 'support',
    title: {
      ru: 'Почта на домене',
      kk: 'Доменде пошта',
      en: 'Business email on your domain',
    },
    short: {
      ru: 'Настраиваю почту вида info@вашсайт.kz, чтобы письма не попадали в спам и работали в телефоне.',
      kk: 'info@сіздіңсайт.kz түріндегі поштаны баптаймын, хаттар спамға түспейді және телефонда жұмыс істейді.',
      en: 'I set up addresses like info@yoursite.com so your emails do not land in spam and work on your phone.',
    },
    description: {
      ru: 'Адрес на домене выглядит солиднее, чем почта на бесплатном сервисе, и письма с него меньше попадают в спам, если правильно настроены записи. Я подключаю домен к почтовому сервису, создаю ящики, добавляю записи SPF, DKIM и DMARC и настраиваю почту на телефоне и компьютере. После этого вы получаете короткую инструкцию.',
      kk: 'Доменіңіздегі мекенжай тегін сервистегі поштадан сенімдірек көрінеді, ал жазбалар дұрыс бапталса, одан шыққан хаттар спамға аз түседі. Мен доменді пошта сервисіне қосып, жәшіктер ашып, SPF, DKIM және DMARC жазбаларын қосамын, поштаны телефонда және компьютерде баптаймын. Содан кейін сізге қысқа нұсқаулық беремін.',
      en: 'An address on your own domain looks more credible than a free mailbox, and its messages are less likely to go to spam when the records are set correctly. I connect the domain to an email service, create the mailboxes, add the SPF, DKIM and DMARC records and set up mail on your phone and computer. You then get a short guide.',
    },
    priceFrom: 8000,
    unit: 'once',
    days: { min: 1, max: 1 },
    includes: {
      ru: [
        'Подключение домена к почтовому сервису',
        'Создание до 5 почтовых ящиков',
        'DNS-записи MX, SPF, DKIM и DMARC',
        'Настройка почты на телефоне и в почтовой программе',
        'Тестовая отправка в основные почтовые сервисы',
        'Короткая инструкция по входу и смене пароля',
      ],
      kk: [
        'Доменді пошта сервисіне қосу',
        '5 пошта жәшігіне дейін ашу',
        'MX, SPF, DKIM және DMARC DNS жазбалары',
        'Поштаны телефонда және пошта бағдарламасында баптау',
        'Негізгі пошта сервистеріне сынақ хат жіберу',
        'Кіру және құпиясөзді ауыстыру бойынша қысқа нұсқаулық',
      ],
      en: [
        'Connecting the domain to an email service',
        'Creating up to 5 mailboxes',
        'MX, SPF, DKIM and DMARC DNS records',
        'Setting up mail on your phone and in an email client',
        'Test messages to the main email providers',
        'A short guide to signing in and changing the password',
      ],
    },
    notIncluded: {
      ru: [
        'Плата почтового сервиса за ящики, если выбранный тариф платный',
        'Перенос старых писем из другого ящика, если их очень много',
        'Рассылки большому числу адресов: это отдельная настройка',
      ],
      kk: [
        'Таңдалған тариф ақылы болса, пошта сервисінің жәшіктер үшін ақысы',
        'Басқа жәшіктегі ескі хаттарды көшіру, егер олар өте көп болса',
        'Көп мекенжайға жаппай жіберу: бұл бөлек баптау',
      ],
      en: [
        'The email provider fee for mailboxes if the chosen plan is paid',
        'Migrating a very large archive of old messages from another mailbox',
        'Bulk mailing to many addresses, which is a separate setup',
      ],
    },
    forWhom: {
      ru: 'Компаниям и предпринимателям, которые пишут клиентам с gmail.com и хотят адрес со своим названием.',
      kk: 'Клиенттерге gmail.com-нан жазатын және өз атауы бар мекенжай қалайтын компаниялар мен кәсіпкерлерге арналған.',
      en: 'For businesses and freelancers who write to clients from a free mailbox and want an address with their own name.',
    },
    faq: [
      {
        q: {
          ru: 'Нужен ли для почты хостинг?',
          kk: 'Пошта үшін хостинг керек пе?',
          en: 'Do I need web hosting to have domain email?',
        },
        a: {
          ru: 'Не обязательно. Почту можно держать у отдельного почтового сервиса, а сайт при этом хранить где угодно. Подходящий вариант подскажу по вашему бюджету.',
          kk: 'Міндетті емес. Поштаны бөлек пошта сервисінде ұстап, сайтты қалаған жерде сақтауға болады. Бюджетіңізге сай нұсқаны айтамын.',
          en: 'Not necessarily. Mail can live with a separate email provider while the site is stored anywhere else. I will suggest an option that fits your budget.',
        },
      },
      {
        q: {
          ru: 'Что такое SPF и DKIM и зачем они?',
          kk: 'SPF пен DKIM деген не және олар не үшін?',
          en: 'What are SPF and DKIM and why do they matter?',
        },
        a: {
          ru: 'Это DNS-записи, которые подтверждают, что письма отправили именно вы. Без них почтовые сервисы чаще отправляют ваши сообщения в спам.',
          kk: 'Бұл хаттарды нақ сіз жібергеніңізді растайтын DNS жазбалары. Оларсыз пошта сервистері хаттарыңызды жиірек спамға салады.',
          en: 'They are DNS records that prove a message really came from you. Without them, mail providers send your messages to spam more often.',
        },
      },
      {
        q: {
          ru: 'Могу ли я пользоваться почтой с телефона?',
          kk: 'Поштаны телефоннан пайдалана аламын ба?',
          en: 'Can I read this mail on my phone?',
        },
        a: {
          ru: 'Да. Я добавляю ящик в почтовое приложение на iPhone или Android и проверяю, что письма приходят и отправляются.',
          kk: 'Иә. Жәшікті iPhone немесе Android-тағы пошта қосымшасына қосып, хаттардың келіп, жіберілетінін тексеремін.',
          en: 'Yes. I add the mailbox to the mail app on your iPhone or Android and check that messages arrive and send correctly.',
        },
      },
    ],
    relatedProducts: ['domen-hosting-ssl', 'sait-vizitka', 'podderzhka-saita'],
  },
  {
    slug: 'kompyuternaya-pomosch',
    category: 'support',
    title: {
      ru: 'Компьютерная помощь удалённо',
      kk: 'Компьютерге қашықтан көмек',
      en: 'Remote computer help',
    },
    short: {
      ru: 'Помогу по видеосвязи или через удалённый доступ: установка программ, настройка, вирусы, лишние тормоза.',
      kk: 'Бейнебайланыс немесе қашықтан қолжетімділік арқылы көмектесемін: бағдарлама орнату, баптау, вирустар, баяулау.',
      en: 'Help by video call or remote access: installing software, settings, malware and slow-downs.',
    },
    description: {
      ru: 'Компьютер или телефон тормозит, не печатает, не пускает в аккаунт или вам нужно установить программу. Мы созвонимся, и я подключусь к вашему экрану через безопасную программу удалённого доступа только на время сеанса. Объясняю простыми словами, что делаю, чтобы в следующий раз вы справились сами.',
      kk: 'Компьютер немесе телефон баяулайды, басып шығармайды, аккаунтқа кіргізбейді немесе бағдарлама орнату керек. Біз қоңыраулас боламыз, мен тек сеанс уақытына қауіпсіз қашықтан қолжетімділік бағдарламасы арқылы экраныңызға қосыламын. Келесі жолы өзіңіз қатесіз істей алуыңыз үшін не істеп жатқанымды қарапайым тілмен түсіндіремін.',
      en: 'Your computer or phone is slow, will not print, locks you out of an account, or you need a program installed. We get on a call and I connect to your screen through a secure remote access tool, only for the length of the session. I explain in plain words what I am doing so that next time you can manage on your own.',
    },
    priceFrom: 3000,
    unit: 'hour',
    days: { min: 1, max: 1 },
    includes: {
      ru: [
        'Установка и настройка программ, мессенджеров и принтера',
        'Проверка компьютера на вирусы и лишние программы',
        'Ускорение работы: чистка автозагрузки и места на диске',
        'Помощь с почтой, паролями и входом в аккаунты',
        'Настройка Wi-Fi-роутера и подключения устройств',
        'Объяснение шагов простыми словами по ходу работы',
      ],
      kk: [
        'Бағдарламаларды, мессенджерлер мен принтерді орнату және баптау',
        'Компьютерді вирусқа және артық бағдарламаларға тексеру',
        'Жұмысты жылдамдату: автожүктеме мен диск орнын тазалау',
        'Пошта, құпиясөздер және аккаунттарға кіру бойынша көмек',
        'Wi-Fi-роутерді және құрылғыларды қосуды баптау',
        'Қадамдарды жұмыс барысында қарапайым тілмен түсіндіру',
      ],
      en: [
        'Installing and configuring programs, messengers and a printer',
        'Scanning the computer for malware and unneeded programs',
        'Speeding things up by cleaning startup items and disk space',
        'Help with email, passwords and signing in to accounts',
        'Setting up a Wi-Fi router and connecting devices',
        'Explaining each step in plain words as we go',
      ],
    },
    notIncluded: {
      ru: [
        'Ремонт техники и замена комплектующих: работаю только удалённо',
        'Выезд на дом: в Алматы возможен по договорённости, отдельно',
        'Восстановление данных с вышедших из строя дисков',
      ],
      kk: [
        'Техниканы жөндеу және бөлшектерін ауыстыру: тек қашықтан жұмыс істеймін',
        'Үйге шығу: Алматыда келісім бойынша мүмкін, бөлек төленеді',
        'Істен шыққан дисктерден деректерді қалпына келтіру',
      ],
      en: [
        'Hardware repair or replacing parts; I work remotely only',
        'On-site visits, which in Almaty are possible by agreement and charged separately',
        'Recovering data from failed drives',
      ],
    },
    forWhom: {
      ru: 'Частным лицам и семьям, которым нужна понятная помощь с компьютером или телефоном без поездки в сервис.',
      kk: 'Сервиске бармай, компьютер немесе телефон бойынша түсінікті көмек қажет жеке тұлғалар мен отбасыларға арналған.',
      en: 'For individuals and families who need clear help with a computer or phone without taking it to a repair shop.',
    },
    faq: [
      {
        q: {
          ru: 'Безопасно ли давать удалённый доступ?',
          kk: 'Қашықтан қолжетімділік беру қауіпсіз бе?',
          en: 'Is it safe to give remote access?',
        },
        a: {
          ru: 'Вы сами запускаете программу и видите всё, что я делаю на экране. Доступ работает только во время сеанса, и вы можете прервать его в любой момент.',
          kk: 'Бағдарламаны өзіңіз іске қосасыз және экрандағы әрекеттерімнің бәрін көресіз. Қолжетімділік тек сеанс кезінде жұмыс істейді, оны кез келген сәтте тоқтата аласыз.',
          en: 'You start the program yourself and see everything I do on screen. Access works only during the session and you can end it at any moment.',
        },
      },
      {
        q: {
          ru: 'Как считается оплата за час?',
          kk: 'Сағаттық төлем қалай есептеледі?',
          en: 'How is the hourly rate counted?',
        },
        a: {
          ru: 'Платите за фактически потраченное время. Если задача простая, я скажу об этом заранее и не буду растягивать сеанс.',
          kk: 'Нақты жұмсалған уақыт үшін төлейсіз. Тапсырма қарапайым болса, алдын ала айтып, сеансты созбаймын.',
          en: 'You pay for the time actually spent. If the task is simple I will say so up front and will not stretch the session.',
        },
      },
      {
        q: {
          ru: 'Работаете ли вы с Mac и телефонами?',
          kk: 'Mac пен телефондармен жұмыс істейсіз бе?',
          en: 'Do you work with Mac and phones?',
        },
        a: {
          ru: 'Да, с Windows, macOS, а также с Android и iPhone в части настроек и приложений. Ограничения, например по закрытым корпоративным устройствам, называю заранее.',
          kk: 'Иә, Windows, macOS және Android пен iPhone-ның баптаулары мен қосымшалары бойынша жұмыс істеймін. Шектеулерді, мысалы жабық корпоративтік құрылғылар бойынша, алдын ала айтамын.',
          en: 'Yes, with Windows and macOS, and with settings and apps on Android and iPhone. I tell you about limits in advance, for example with locked-down company devices.',
        },
      },
    ],
    relatedProducts: ['kompyuternaya-gramotnost', 'pochta-na-domene', 'ispravlenie-oshibok'],
  },
];
