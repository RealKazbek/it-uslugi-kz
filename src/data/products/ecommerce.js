export default [
  {
    slug: 'internet-magazin',
    category: 'ecommerce',
    title: {
      ru: 'Интернет-магазин под ключ',
      kk: 'Интернет-дүкен толық кешенімен',
      en: 'Custom online store',
    },
    short: {
      ru: 'Интернет-магазин с каталогом, корзиной и заказами на своём коде, без платы за конструктор.',
      kk: 'Каталогы, себеті және тапсырыстары бар, конструкторға ақы төлеусіз жеке кодта жазылған интернет-дүкен.',
      en: 'A custom-coded store with catalog, cart and orders, with no monthly platform fee.',
    },
    description: {
      ru: 'Магазин пишется на Next.js или Django под ваш ассортимент, а не собирается на шаблоне конструктора. Покупатель выбирает товар в каталоге, кладёт его в корзину и оформляет заказ, а вы получаете заявку на почту и в Telegram. Товарами вы управляете сами через понятную админку.',
      kk: 'Дүкен конструктор шаблонында емес, сіздің тауар түріңізге арнап Next.js немесе Django-да жазылады. Сатып алушы каталогтан тауар таңдап, себетке салады және тапсырыс береді, ал сіз өтінімді поштаға және Telegram-ға аласыз. Тауарларды түсінікті әкімшілік панелі арқылы өзіңіз басқарасыз.',
      en: 'The store is written in Next.js or Django around your range of goods rather than assembled from a website-builder template. A customer browses the catalog, adds items to the cart and places an order, and you get the order by email and in Telegram. You manage products yourself through a simple admin panel.',
    },
    priceFrom: 180000,
    unit: 'once',
    days: { min: 15, max: 30 },
    includes: {
      ru: [
        'Каталог с категориями, карточками товаров, поиском и фильтрами',
        'Корзина и оформление заказа с выбором доставки',
        'Админка: добавление товаров, цен, остатков и статусов заказов',
        'Уведомления о новых заказах на почту и в Telegram',
        'Адаптивная вёрстка под телефон и быстрая загрузка',
        'SEO-основа: метатеги, микроразметка товаров, sitemap',
        'Запуск на вашем домене, передача доступов и короткая инструкция',
      ],
      kk: [
        'Санаттары, тауар карточкалары, іздеуі және сүзгілері бар каталог',
        'Себет және жеткізу тәсілін таңдайтын тапсырыс рәсімдеу',
        'Әкімшілік панелі: тауар, баға, қалдық қосу және тапсырыс мәртебелері',
        'Жаңа тапсырыстар туралы поштаға және Telegram-ға хабарлама',
        'Телефонға бейімделген әрі жылдам жүктелетін беттер',
        'SEO негізі: метатегтер, тауар микробелгілеуі, sitemap',
        'Өз доменіңізде іске қосу, қолжетімділікті беру және қысқаша нұсқаулық',
      ],
      en: [
        'Catalog with categories, product pages, search and filters',
        'Cart and checkout with a choice of delivery method',
        'Admin panel to add products, prices, stock and order statuses',
        'New-order alerts by email and in Telegram',
        'Mobile-first layout that loads fast',
        'SEO basics: meta tags, product structured data, sitemap',
        'Launch on your domain, access handover and a short how-to guide',
      ],
    },
    notIncluded: {
      ru: [
        'Фотографии, описания и цены товаров: их предоставляете вы',
        'Онлайн-оплата картой: подключается отдельно по договорённости через API провайдера',
        'Домен и хостинг оплачиваются по тарифам провайдера',
      ],
      kk: [
        'Тауар фотосуреттері, сипаттамалары және бағалары: оларды өзіңіз ұсынасыз',
        'Картамен онлайн төлем: провайдердің API-і арқылы келісім бойынша бөлек қосылады',
        'Домен мен хостинг провайдердің тарифтері бойынша төленеді',
      ],
      en: [
        'Product photos, descriptions and prices, which you provide',
        'Online card payment, which can be added separately through a provider API by agreement',
        'Domain and hosting, paid at the provider rates',
      ],
    },
    forWhom: {
      ru: 'Подходит магазинам с собственным ассортиментом, которые хотят продавать со своего сайта, а не только в мессенджерах и на маркетплейсах. Хорош, когда конструктор уже тесен, а ежемесячная плата за платформу не устраивает.',
      kk: 'Өз тауар ассортименті бар және тек мессенджерлер мен маркетплейстерде емес, өз сайтынан сатқысы келетін дүкендерге сай келеді. Конструктор тарлық ете бастағанда және платформаға ай сайынғы ақы ұнамағанда ыңғайлы.',
      en: 'Fits shops with their own range that want to sell from their own site instead of relying only on messengers and marketplaces. A good choice once a website builder feels limiting or its monthly fee no longer makes sense.',
    },
    faq: [
      {
        q: {
          ru: 'Почему не конструктор, а свой код?',
          kk: 'Неге конструктор емес, жеке код?',
          en: 'Why custom code instead of a website builder?',
        },
        a: {
          ru: 'Нет ежемесячной платы за платформу, а структуру и поведение магазина можно подогнать под ваши процессы. Обратная сторона: обновления и доработки делает разработчик, а не вы кнопкой в конструкторе.',
          kk: 'Платформаға ай сайынғы ақы жоқ, ал дүкеннің құрылымы мен жұмысын өз процестеріңізге бейімдеуге болады. Кері жағы: жаңартулар мен жетілдірулерді конструктордағы батырмамен сіз емес, әзірлеуші жасайды.',
          en: 'There is no monthly platform fee, and the structure and behaviour can be shaped to your own processes. The trade-off is that updates and changes are made by a developer rather than by clicking in a builder.',
        },
      },
      {
        q: {
          ru: 'Смогу ли я сам добавлять товары?',
          kk: 'Тауарды өзім қоса аламын ба?',
          en: 'Will I be able to add products myself?',
        },
        a: {
          ru: 'Да. В админке товар добавляется формой: название, фото, цена, остаток, категория. Если товаров много, можно загрузить их таблицей, это обсуждается заранее.',
          kk: 'Иә. Әкімшілік панелінде тауар форма арқылы қосылады: атауы, фото, бағасы, қалдығы, санаты. Тауар көп болса, кестемен жүктеуге болады, бұл алдын ала келіседі.',
          en: 'Yes. In the admin panel a product is added through a form with name, photo, price, stock and category. If you have many items, a bulk upload from a spreadsheet can be arranged beforehand.',
        },
      },
      {
        q: {
          ru: 'Как принимать оплату на сайте?',
          kk: 'Сайтта төлемді қалай қабылдауға болады?',
          en: 'How do I accept payments on the site?',
        },
        a: {
          ru: 'В базовую стоимость оплата картой не входит. Заказ приходит вам, и вы согласуете оплату с покупателем по привычной схеме. Онлайн-оплату можно подключить отдельно через API выбранного провайдера, после его подключения.',
          kk: 'Базалық құнға картамен төлем кірмейді. Тапсырыс сізге келеді, ал төлемді сатып алушымен әдеттегі тәсілмен келісесіз. Онлайн төлемді таңдалған провайдердің API-і арқылы бөлек қосуға болады.',
          en: 'Card payment is not part of the base price. The order reaches you and you settle payment with the buyer in your usual way. Online payment can be added separately through the API of the provider you choose, once you have an account with them.',
        },
      },
    ],
    relatedProducts: ['magazin-s-kaspi-xml', 'telegram-bot-katalog', 'seo-audit'],
  },
  {
    slug: 'magazin-s-kaspi-xml',
    category: 'ecommerce',
    title: {
      ru: 'Интернет-магазин с выгрузкой в Kaspi',
      kk: 'Kaspi-ге жүктемесі бар интернет-дүкен',
      en: 'Online store with Kaspi price feed',
    },
    short: {
      ru: 'Собственный магазин и XML-прайс для Kaspi.kz, генерируемый из той же базы товаров.',
      kk: 'Өз дүкеніңіз бен сол тауар базасынан жасалатын Kaspi.kz үшін XML-прайс.',
      en: 'Your own store plus a Kaspi.kz XML price feed generated from the same product database.',
    },
    description: {
      ru: 'Один каталог питает и ваш сайт, и прайс-лист для Kaspi.kz в формате XML. Вы меняете цену или остаток один раз в админке, и обновляются обе витрины. Так не приходится вести две таблицы вручную и сверять их.',
      kk: 'Бір каталог сіздің сайтыңызды да, Kaspi.kz үшін XML пішіміндегі прайс-тізімді де қамтамасыз етеді. Бағаны немесе қалдықты әкімшілік панелінде бір рет өзгертесіз, сонда екі витрина да жаңарады. Сондықтан екі кестені қолмен жүргізіп, салыстырудың қажеті жоқ.',
      en: 'One catalog drives both your own website and the XML price list for Kaspi.kz, the largest marketplace in Kazakhstan. You change a price or stock level once in the admin panel and both storefronts update. That saves you from keeping two spreadsheets in sync by hand.',
    },
    priceFrom: 220000,
    unit: 'once',
    days: { min: 20, max: 35 },
    includes: {
      ru: [
        'Интернет-магазин: каталог, карточки, корзина, оформление заказа',
        'Единая база товаров с ценами, остатками и категориями',
        'XML-прайс для кабинета продавца Kaspi.kz по требуемой структуре',
        'Настройка по ссылке: Kaspi сам забирает файл с вашего адреса по расписанию',
        'Сопоставление ваших категорий и артикулов с полями прайса Kaspi',
        'Админка для товаров и заказов, уведомления в Telegram',
        'Проверка файла на ошибки и инструкция, как загрузить его в кабинет',
      ],
      kk: [
        'Интернет-дүкен: каталог, карточкалар, себет, тапсырыс рәсімдеу',
        'Баға, қалдық және санаттары бар бірыңғай тауар базасы',
        'Kaspi.kz сатушы кабинеті үшін талап етілген құрылымдағы XML-прайс',
        'Сілтеме арқылы баптау: Kaspi файлды сіздің мекенжайыңыздан кесте бойынша өзі алады',
        'Санаттарыңыз бен артикулдарыңызды Kaspi прайсының өрістерімен сәйкестендіру',
        'Тауар мен тапсырысқа арналған әкімшілік панелі, Telegram хабарламалары',
        'Файлды қателікке тексеру және оны кабинетке жүктеу нұсқаулығы',
      ],
      en: [
        'The store itself: catalog, product pages, cart and checkout',
        'A single product database with prices, stock and categories',
        'An XML price list for the Kaspi.kz merchant cabinet in the required structure',
        'Setup by link, so Kaspi fetches the file from your address on a schedule',
        'Mapping your categories and SKUs to the fields of the Kaspi price list',
        'Admin panel for products and orders, with Telegram alerts',
        'Error check of the file and instructions for uploading it to the cabinet',
      ],
    },
    notIncluded: {
      ru: [
        'Аккаунт продавца на Kaspi.kz и комиссии маркетплейса: это ваши отношения с Kaspi',
        'Фото, описания и цены товаров: предоставляете вы',
        'Модерация карточек на стороне Kaspi: её результат от меня не зависит',
      ],
      kk: [
        'Kaspi.kz-тегі сатушы аккаунты және маркетплейс комиссиялары: бұл сіздің Kaspi-мен қарым-қатынасыңыз',
        'Тауар фотосуреттері, сипаттамалары және бағалары: оларды сіз ұсынасыз',
        'Kaspi жағындағы карточкаларды модерациялау: оның нәтижесі маған байланысты емес',
      ],
      en: [
        'The Kaspi.kz seller account and marketplace commissions, which are between you and Kaspi',
        'Product photos, descriptions and prices, which you provide',
        'Card moderation on the Kaspi side, whose outcome I cannot control',
      ],
    },
    forWhom: {
      ru: 'Для продавцов, которые уже торгуют или собираются торговать на Kaspi.kz и хотят параллельно иметь свой сайт с единым учётом товара. Особенно полезно при большом ассортименте, где ручная правка цен в двух местах отнимает время.',
      kk: 'Kaspi.kz-те сауда жасап жүрген немесе бастағалы жатқан және қатар тауар есебі біріңғай өз сайтын қалайтын сатушыларға арналған. Ассортимент көп болып, бағаны екі жерде қолмен түзету уақыт алатын жағдайда өте пайдалы.',
      en: 'For sellers who already trade on Kaspi.kz, or plan to, and also want their own site with one stock record. It helps most with a large range, where editing prices in two places by hand eats up time.',
    },
    faq: [
      {
        q: {
          ru: 'Что такое XML-прайс для Kaspi?',
          kk: 'Kaspi үшін XML-прайс деген не?',
          en: 'What is a Kaspi XML price feed?',
        },
        a: {
          ru: 'Это файл с вашими товарами, ценами и остатками в формате, который принимает кабинет продавца Kaspi.kz. Он избавляет от ручного ввода каждой позиции и обновляется автоматически.',
          kk: 'Бұл Kaspi.kz сатушы кабинеті қабылдайтын пішімдегі тауарларыңыз, бағалар мен қалдықтар жазылған файл. Ол әр позицияны қолмен енгізуден құтқарады және автоматты түрде жаңарады.',
          en: 'It is a file listing your products, prices and stock in the format the Kaspi.kz merchant cabinet accepts. It removes the need to enter each item by hand and refreshes automatically.',
        },
      },
      {
        q: {
          ru: 'Нужен ли мне аккаунт продавца на Kaspi заранее?',
          kk: 'Маған Kaspi-де сатушы аккаунты алдын ала керек пе?',
          en: 'Do I need a Kaspi seller account beforehand?',
        },
        a: {
          ru: 'Для загрузки прайса в Kaspi аккаунт нужен, и открываете его вы сами на условиях Kaspi. Сайт и файл можно подготовить заранее, а подключить прайс, когда кабинет будет готов.',
          kk: 'Прайсты Kaspi-ге жүктеу үшін аккаунт қажет, оны Kaspi талаптарымен өзіңіз ашасыз. Сайт пен файлды алдын ала дайындап, кабинет дайын болғанда прайсты қосуға болады.',
          en: 'To load the feed into Kaspi you need an account, which you open yourself on Kaspi terms. The site and the file can be prepared in advance and the feed connected once the cabinet is ready.',
        },
      },
      {
        q: {
          ru: 'Цены на сайте и в Kaspi будут одинаковыми?',
          kk: 'Сайттағы және Kaspi-дегі бағалар бірдей болады ма?',
          en: 'Will prices on the site and on Kaspi be the same?',
        },
        a: {
          ru: 'Необязательно. Можно задать отдельную цену для Kaspi, например с учётом комиссии маркетплейса, или поставить одну на обе витрины. Правило выбираете вы.',
          kk: 'Міндетті емес. Kaspi үшін, мысалы маркетплейс комиссиясын ескеріп, бөлек баға қоюға немесе екі витринаға бір баға белгілеуге болады. Ережені өзіңіз таңдайсыз.',
          en: 'Not necessarily. You can set a separate price for Kaspi, for example to cover the marketplace commission, or use one price on both. The rule is yours to choose.',
        },
      },
    ],
    relatedProducts: ['kaspi-xml', 'internet-magazin', 'ai-opisaniya-tovarov'],
  },
  {
    slug: 'kaspi-xml',
    category: 'ecommerce',
    title: {
      ru: 'XML-прайс для Kaspi.kz',
      kk: 'Kaspi.kz үшін XML-прайс',
      en: 'Kaspi.kz XML price feed',
    },
    short: {
      ru: 'Готовый XML-файл или автоматическая выгрузка вашего каталога в кабинет продавца Kaspi.',
      kk: 'Каталогыңызды Kaspi сатушы кабинетіне жүктейтін дайын XML-файл немесе автоматты жүктеме.',
      en: 'A ready XML file, or an automatic export of your existing catalog, for the Kaspi merchant cabinet.',
    },
    description: {
      ru: 'Если у вас уже есть таблица, сайт или учётная база с товарами, я превращаю их в XML-прайс, который принимает Kaspi.kz. Файл можно обновлять автоматически по расписанию, и цены с остатками в кабинете будут совпадать с вашими. Это отдельная небольшая услуга, магазин для неё создавать не нужно.',
      kk: 'Егер сізде тауарлары бар кесте, сайт немесе есеп базасы болса, мен оларды Kaspi.kz қабылдайтын XML-прайсқа айналдырамын. Файлды кесте бойынша автоматты жаңартуға болады, сонда кабинеттегі бағалар мен қалдықтар сіздікімен сәйкес келеді. Бұл бөлек шағын қызмет, оған дүкен жасаудың қажеті жоқ.',
      en: 'If you already have a spreadsheet, a website or an inventory database with your products, I turn it into an XML price list that Kaspi.kz accepts. The file can refresh on a schedule, so prices and stock in the cabinet match yours. It is a small standalone service and you do not need to build a store for it.',
    },
    priceFrom: 25000,
    unit: 'once',
    days: { min: 2, max: 4 },
    includes: {
      ru: [
        'Анализ вашего источника данных: таблица, сайт или база',
        'Скрипт, который собирает XML по структуре прайса Kaspi',
        'Сопоставление ваших колонок и категорий с полями Kaspi',
        'Публикация файла по постоянной ссылке для автозагрузки',
        'Обновление по расписанию, чтобы цены и остатки не отставали',
        'Проверка файла на ошибки перед первой загрузкой',
      ],
      kk: [
        'Деректер көзін талдау: кесте, сайт немесе база',
        'Kaspi прайсының құрылымы бойынша XML жинайтын скрипт',
        'Бағандарыңыз бен санаттарыңызды Kaspi өрістерімен сәйкестендіру',
        'Файлды автожүктеу үшін тұрақты сілтеме бойынша жариялау',
        'Баға мен қалдық артта қалмауы үшін кесте бойынша жаңарту',
        'Алғашқы жүктеуден бұрын файлды қателікке тексеру',
      ],
      en: [
        'Review of your data source, whether a spreadsheet, a site or a database',
        'A script that builds the XML to the Kaspi price-list structure',
        'Mapping your columns and categories to Kaspi fields',
        'Publishing the file at a permanent link for automatic loading',
        'Scheduled refresh so prices and stock do not fall behind',
        'Error check of the file before the first upload',
      ],
    },
    notIncluded: {
      ru: [
        'Аккаунт продавца Kaspi и комиссии маркетплейса: это ваши отношения с Kaspi',
        'Фото и описания товаров: предоставляете вы',
        'Хостинг для файла, если у вас нет своего: оплачивается по тарифам провайдера',
      ],
      kk: [
        'Kaspi сатушы аккаунты мен маркетплейс комиссиялары: бұл сіздің Kaspi-мен қарым-қатынасыңыз',
        'Тауар фотосуреттері мен сипаттамалары: оларды сіз ұсынасыз',
        'Файлға арналған хостинг, егер өзіңізде болмаса: провайдер тарифі бойынша төленеді',
      ],
      en: [
        'The Kaspi seller account and marketplace commissions, which are between you and Kaspi',
        'Product photos and descriptions, which you provide',
        'Hosting for the file if you have none, paid at the provider rate',
      ],
    },
    forWhom: {
      ru: 'Для продавцов Kaspi.kz, у которых товары лежат в Excel, Google Таблице или на сайте, и обновлять цены в кабинете вручную надоело. Подходит и тем, кто только выходит на маркетплейс с готовым прайсом.',
      kk: 'Тауарлары Excel-де, Google кестесінде немесе сайтта жатқан және кабинетте бағаны қолмен жаңартудан жалыққан Kaspi.kz сатушыларына арналған. Дайын прайспен маркетплейске енді шығып жатқандарға да жарайды.',
      en: 'For Kaspi.kz sellers whose products live in Excel, Google Sheets or on a website and who are tired of updating prices in the cabinet by hand. It also suits newcomers entering the marketplace with a ready price list.',
    },
    faq: [
      {
        q: {
          ru: 'Из чего можно сделать XML?',
          kk: 'XML-ді неден жасауға болады?',
          en: 'What can the XML be built from?',
        },
        a: {
          ru: 'Из таблицы Excel или Google, из CSV, из вашего сайта или из базы данных. Если данные лежат в другой учётной системе, выгрузку из неё обсуждаем отдельно.',
          kk: 'Excel немесе Google кестесінен, CSV-ден, сайтыңыздан немесе деректер базасынан жасауға болады. Деректер басқа есеп жүйесінде болса, одан жүктеуді бөлек талқылаймыз.',
          en: 'From an Excel or Google spreadsheet, a CSV, your website or a database. If the data sits in another accounting system, exporting from it is discussed separately.',
        },
      },
      {
        q: {
          ru: 'Как часто обновляется файл?',
          kk: 'Файл қаншалықты жиі жаңарады?',
          en: 'How often does the file update?',
        },
        a: {
          ru: 'Частоту задаём при настройке, например раз в час или раз в сутки. Как часто Kaspi забирает файл, зависит уже от настроек вашего кабинета.',
          kk: 'Жиілікті баптау кезінде белгілейміз, мысалы сағатына бір рет немесе тәулігіне бір рет. Kaspi файлды қаншалықты жиі алатыны енді кабинет баптауларына байланысты.',
          en: 'We set the frequency during setup, for example hourly or daily. How often Kaspi picks up the file then depends on your cabinet settings.',
        },
      },
      {
        q: {
          ru: 'Если Kaspi не принял файл, что дальше?',
          kk: 'Kaspi файлды қабылдамаса, не істеу керек?',
          en: 'What if Kaspi rejects the file?',
        },
        a: {
          ru: 'Я проверяю структуру до загрузки и исправляю ошибки формата, которые показывает кабинет. Отказы по самим товарам, например по категории или модерации, решаются на стороне Kaspi.',
          kk: 'Жүктеуге дейін құрылымды тексеріп, кабинет көрсететін пішім қателерін түзетемін. Тауарлардың өздеріне қатысты бас тартулар, мысалы санат немесе модерация бойынша, Kaspi жағында шешіледі.',
          en: 'I check the structure before uploading and fix any format errors the cabinet reports. Rejections about the products themselves, such as category or moderation, are settled on the Kaspi side.',
        },
      },
    ],
    relatedProducts: ['magazin-s-kaspi-xml', 'zayavki-v-google-sheets', 'parsing-dannyh'],
  },
  {
    slug: 'katalog-s-zakazom-v-whatsapp',
    category: 'ecommerce',
    title: {
      ru: 'Каталог с заказом в WhatsApp',
      kk: 'WhatsApp арқылы тапсырыс беретін каталог',
      en: 'Catalog with WhatsApp ordering',
    },
    short: {
      ru: 'Лёгкий сайт-каталог, где корзина превращается в готовое сообщение вам в WhatsApp.',
      kk: 'Себеттегі тауарлар сізге WhatsApp-қа дайын хабарламаға айналатын жеңіл каталог-сайт.',
      en: 'A lightweight catalog site where the cart turns into a ready-made WhatsApp message to you.',
    },
    description: {
      ru: 'Покупатель выбирает товары на сайте, а по кнопке «Заказать» открывается WhatsApp с готовым списком позиций, количеством и суммой. Никакой регистрации и онлайн-оплаты, всё общение остаётся в привычном мессенджере. Это самый простой способ начать онлайн-продажи для небольшого магазина.',
      kk: 'Сатып алушы сайтта тауарларды таңдайды, ал «Тапсырыс беру» батырмасымен позициялар тізімі, саны және сомасы дайын WhatsApp ашылады. Тіркелу де, онлайн төлем де жоқ, барлық сөйлесу әдеттегі мессенджерде қалады. Бұл шағын дүкен үшін онлайн саудаға бастаудың ең қарапайым жолы.',
      en: 'The customer picks products on the site, and an Order button opens WhatsApp with a prepared list of items, quantities and the total. There is no sign-up and no online payment, so the whole conversation stays in a messenger people already use. It is the simplest way for a small shop to start selling online.',
    },
    priceFrom: 80000,
    unit: 'once',
    days: { min: 7, max: 12 },
    includes: {
      ru: [
        'Каталог с категориями и карточками товаров с фото и ценой',
        'Лёгкая корзина, которая работает без регистрации',
        'Кнопка заказа: формирует текст сообщения и открывает WhatsApp',
        'Поле для имени, адреса и комментария перед отправкой',
        'Файл с товарами, который вы правите сами, например таблица',
        'Адаптивная вёрстка и быстрая загрузка на мобильном интернете',
      ],
      kk: [
        'Санаттары мен фотосы және бағасы бар тауар карточкалары бар каталог',
        'Тіркелусіз жұмыс істейтін жеңіл себет',
        'Тапсырыс батырмасы: хабарлама мәтінін құрып, WhatsApp-ты ашады',
        'Жіберер алдында аты, мекенжайы және пікірге арналған өріс',
        'Өзіңіз түзететін тауар файлы, мысалы кесте',
        'Мобильді интернетте жылдам жүктелетін, бейімделген беттер',
      ],
      en: [
        'Catalog with categories and product cards showing photo and price',
        'A light cart that works without registration',
        'An order button that builds the message text and opens WhatsApp',
        'Fields for name, address and a comment before sending',
        'A product file you edit yourself, such as a spreadsheet',
        'Responsive layout that loads fast on mobile internet',
      ],
    },
    notIncluded: {
      ru: [
        'Автоматическая обработка заказов: сообщение читаете и подтверждаете вы сами',
        'Фото, описания и цены товаров: предоставляете вы',
        'Онлайн-оплата и складской учёт: это уже другая, более крупная задача',
      ],
      kk: [
        'Тапсырыстарды автоматты өңдеу: хабарламаны өзіңіз оқып, растайсыз',
        'Тауар фотосуреттері, сипаттамалары және бағалары: оларды сіз ұсынасыз',
        'Онлайн төлем және қойма есебі: бұл басқа, неғұрлым ауқымды міндет',
      ],
      en: [
        'Automatic order processing: you read and confirm each message yourself',
        'Product photos, descriptions and prices, which you provide',
        'Online payment and stock accounting, which is a larger, separate task',
      ],
    },
    forWhom: {
      ru: 'Для небольших магазинов, мастерских и домашних производств, где заказы и так принимают в WhatsApp. Подойдёт, если нужен аккуратный каталог по ссылке вместо пересылки фото вручную.',
      kk: 'Тапсырыстар қазірдің өзінде WhatsApp-ta қабылданатын шағын дүкендерге, шеберханаларға және үйдегі өндірістерге арналған. Суретті қолмен жіберудің орнына сілтемемен ыңғайлы каталог керек болса, жарайды.',
      en: 'For small shops, workshops and home producers who already take orders in WhatsApp. It fits when you want a tidy catalog behind a link instead of forwarding photos by hand.',
    },
    faq: [
      {
        q: {
          ru: 'Нужен ли для этого WhatsApp Business API?',
          kk: 'Ол үшін WhatsApp Business API керек пе?',
          en: 'Does this need the WhatsApp Business API?',
        },
        a: {
          ru: 'Нет. Кнопка открывает обычный чат на ваш номер, подойдёт и обычное приложение, и WhatsApp Business. Никаких платежей Meta или провайдеру за это не нужно.',
          kk: 'Жоқ. Батырма сіздің нөміріңізге қарапайым чатты ашады, қарапайым қолданба да, WhatsApp Business те жарайды. Бұл үшін Meta-ға немесе провайдерге ешқандай төлем қажет емес.',
          en: 'No. The button opens a normal chat with your number, so the regular app or WhatsApp Business both work. No payment to Meta or to a provider is needed for it.',
        },
      },
      {
        q: {
          ru: 'Как менять цены и товары?',
          kk: 'Бағаны және тауарды қалай өзгертуге болады?',
          en: 'How do I change prices and products?',
        },
        a: {
          ru: 'Товары хранятся в простом файле, например в таблице, и вы правите его без программиста. После правки сайт показывает обновлённые данные, порядок я объясняю при сдаче.',
          kk: 'Тауарлар қарапайым файлда, мысалы кестеде сақталады, оны бағдарламашысыз өзіңіз түзетесіз. Түзетуден кейін сайт жаңартылған деректерді көрсетеді, ретін тапсыру кезінде түсіндіремін.',
          en: 'Products are kept in a simple file such as a spreadsheet, so you can edit them without a programmer. After an edit the site shows the updated data, and I explain the routine at handover.',
        },
      },
      {
        q: {
          ru: 'Чем это отличается от интернет-магазина?',
          kk: 'Бұл интернет-дүкеннен несімен ерекшеленеді?',
          en: 'How is this different from a full online store?',
        },
        a: {
          ru: 'Здесь нет личных кабинетов, админки заказов и онлайн-оплаты: заказ уходит в чат, и вы ведёте его вручную. Зато и стоит заметно дешевле, и запускается быстрее. Если оборот вырастет, каталог можно развить до полноценного магазина.',
          kk: 'Мұнда жеке кабинеттер, тапсырыс әкімшілігі және онлайн төлем жоқ: тапсырыс чатқа кетеді де, оны қолмен жүргізесіз. Бірақ арзанырақ әрі тезірек іске қосылады. Айналым өссе, каталогты толыққанды дүкенге дейін дамытуға болады.',
          en: 'There are no customer accounts, order admin or online payment here: the order goes to a chat and you handle it manually. In return it costs noticeably less and launches faster. If volume grows, the catalog can be extended into a full store.',
        },
      },
    ],
    relatedProducts: ['whatsapp-bot', 'sait-dlya-kafe', 'internet-magazin'],
  },
  {
    slug: 'telegram-mini-app-magazin',
    category: 'ecommerce',
    title: {
      ru: 'Магазин в Telegram Mini App',
      kk: 'Telegram Mini App ішіндегі дүкен',
      en: 'Store as a Telegram Mini App',
    },
    short: {
      ru: 'Витрина с каталогом и корзиной, которая открывается прямо внутри Telegram.',
      kk: 'Каталогы мен себеті бар, тікелей Telegram ішінде ашылатын витрина.',
      en: 'A storefront with catalog and cart that opens right inside Telegram.',
    },
    description: {
      ru: 'Mini App — это веб-приложение, которое открывается внутри Telegram по кнопке в боте, без скачивания и регистрации. Клиент листает каталог, собирает корзину и отправляет заказ, а бот присылает вам детали. Покупателей Telegram уже узнаёт по профилю, поэтому оформление занимает меньше шагов.',
      kk: 'Mini App — бот батырмасы арқылы Telegram ішінде жүктеусіз және тіркелусіз ашылатын веб-қолданба. Клиент каталогты қарайды, себет жинайды және тапсырыс жібереді, ал бот сізге мәліметтерді жібереді. Telegram сатып алушыны профилінен танитындықтан, рәсімдеу аз қадаммен өтеді.',
      en: 'A Mini App is a web application that opens inside Telegram from a button in a bot, with nothing to download and no sign-up. The customer browses the catalog, builds a cart and sends the order, and the bot delivers the details to you. Telegram already knows who the buyer is from their profile, so checkout takes fewer steps.',
    },
    priceFrom: 120000,
    unit: 'once',
    days: { min: 14, max: 25 },
    includes: {
      ru: [
        'Mini App с каталогом, карточками, поиском и корзиной',
        'Telegram-бот на Python и aiogram, который открывает витрину',
        'Определение покупателя по профилю Telegram без отдельной регистрации',
        'Отправка заказа вам и подтверждение клиенту сообщением в чат',
        'Админка для товаров, цен и статусов заказов',
        'Оформление в цветах Telegram с поддержкой тёмной темы клиента',
        'Размещение на сервере и передача доступов',
      ],
      kk: [
        'Каталогы, карточкалары, іздеуі және себеті бар Mini App',
        'Витринаны ашатын Python мен aiogram-да жазылған Telegram-бот',
        'Бөлек тіркеусіз Telegram профилі бойынша сатып алушыны анықтау',
        'Тапсырысты сізге жіберу және клиентке чатта хабарламамен растау',
        'Тауар, баға және тапсырыс мәртебелеріне арналған әкімшілік панелі',
        'Клиенттің қараңғы тақырыбын қолдайтын Telegram түстеріндегі безендіру',
        'Серверге орналастыру және қолжетімділікті беру',
      ],
      en: [
        'A Mini App with catalog, product pages, search and cart',
        'A Telegram bot in Python and aiogram that opens the storefront',
        'Buyer identification from the Telegram profile, with no separate sign-up',
        'Order delivery to you and a confirmation message to the customer',
        'Admin panel for products, prices and order statuses',
        'Styling that follows Telegram colours, including the customer dark theme',
        'Server deployment and access handover',
      ],
    },
    notIncluded: {
      ru: [
        'Фото, описания и цены товаров: предоставляете вы',
        'Приём платежей внутри приложения: подключается отдельно по договорённости через API провайдера',
        'Сервер для запуска: оформляется на вас и оплачивается по тарифу провайдера',
      ],
      kk: [
        'Тауар фотосуреттері, сипаттамалары және бағалары: оларды сіз ұсынасыз',
        'Қолданба ішінде төлем қабылдау: провайдердің API-і арқылы келісім бойынша бөлек қосылады',
        'Іске қосуға арналған сервер: сіздің атыңызға ресімделеді, провайдер тарифімен төленеді',
      ],
      en: [
        'Product photos, descriptions and prices, which you provide',
        'Taking payments inside the app, which can be added separately through a provider API by agreement',
        'The server it runs on, set up in your name and paid at the provider rate',
      ],
    },
    forWhom: {
      ru: 'Для бизнеса, чья аудитория уже сидит в Telegram: частные продавцы, кофейни, магазины с постоянными покупателями. Выбирайте, если хотите больше удобства, чем у обычного бота с кнопками.',
      kk: 'Аудиториясы Telegram-да отыратын бизнеске: жеке сатушылар, кофеханалар, тұрақты сатып алушылары бар дүкендер. Батырмалы қарапайым боттан гөрі жайлылық қаласаңыз, таңдаңыз.',
      en: 'For businesses whose audience already lives in Telegram, such as independent sellers, coffee shops and shops with regular customers. Pick it when you want more comfort than a plain bot with buttons.',
    },
    faq: [
      {
        q: {
          ru: 'Чем Mini App лучше обычного бота?',
          kk: 'Mini App қарапайым боттан немен артық?',
          en: 'Why a Mini App rather than a regular bot?',
        },
        a: {
          ru: 'В боте всё сводится к кнопкам и сообщениям, а Mini App показывает полноценную витрину с фото, фильтрами и корзиной. Клиенту удобнее выбирать из большого каталога.',
          kk: 'Ботта бәрі батырмалар мен хабарламаларға саяды, ал Mini App фотосы, сүзгілері және себеті бар толыққанды витринаны көрсетеді. Үлкен каталогтан таңдау клиентке ыңғайлырақ.',
          en: 'A bot boils everything down to buttons and messages, while a Mini App shows a proper storefront with photos, filters and a cart. It is easier for a customer to choose from a large catalog.',
        },
      },
      {
        q: {
          ru: 'Нужен ли отдельный сайт?',
          kk: 'Бөлек сайт керек пе?',
          en: 'Do I need a separate website too?',
        },
        a: {
          ru: 'Нет, Mini App работает сам по себе и открывается по ссылке на бота. Если позже понадобится обычный сайт, он может использовать ту же базу товаров.',
          kk: 'Жоқ, Mini App өздігінен жұмыс істейді және ботқа сілтеме арқылы ашылады. Кейін кәдімгі сайт қажет болса, ол сол тауар базасын пайдалана алады.',
          en: 'No, a Mini App works on its own and opens from a link to the bot. If you later want a regular website, it can reuse the same product database.',
        },
      },
      {
        q: {
          ru: 'Подойдёт ли это тем, кто не пользуется Telegram?',
          kk: 'Бұл Telegram қолданбайтындарға жарай ма?',
          en: 'Will it work for people who do not use Telegram?',
        },
        a: {
          ru: 'Открыть приложение можно только из Telegram, поэтому оно рассчитано на тех, кто в нём уже есть. Для остальных лучше обычный интернет-магазин или каталог с заказом в WhatsApp.',
          kk: 'Қолданбаны тек Telegram-нан ашуға болады, сондықтан ол онда бар адамдарға арналған. Қалғандарына кәдімгі интернет-дүкен немесе WhatsApp арқылы тапсырыс беретін каталог дұрысырақ.',
          en: 'The app can only be opened from Telegram, so it is meant for people already there. For everyone else a regular online store or a catalog with WhatsApp ordering is a better fit.',
        },
      },
    ],
    relatedProducts: ['telegram-bot-katalog', 'internet-magazin', 'telegram-bot-dostavka'],
  },
  {
    slug: 'internet-magazin-cvetov',
    category: 'ecommerce',
    title: {
      ru: 'Интернет-магазин цветов',
      kk: 'Гүл интернет-дүкені',
      en: 'Online flower shop',
    },
    short: {
      ru: 'Магазин цветов с букетами, датой и временем доставки и открыткой к заказу.',
      kk: 'Гүл шоқтары, жеткізу күні мен уақыты және тапсырысқа ашықхаты бар гүл дүкені.',
      en: 'A flower shop with bouquets, delivery date and time slots, and a card message with each order.',
    },
    description: {
      ru: 'Цветы покупают в спешке и к конкретной дате, поэтому главное в таком магазине — быстрый выбор букета и точное время доставки. Покупатель видит букеты по поводу и бюджету, указывает адрес, интервал доставки и текст открытки. Вы получаете заказ со всеми деталями для флориста и курьера.',
      kk: 'Гүлді асығыс әрі нақты күнге алады, сондықтан мұндай дүкенде басты нәрсе — гүл шоғын тез таңдау және жеткізудің нақты уақыты. Сатып алушы гүл шоқтарын себебі мен бюджеті бойынша көреді, мекенжайды, жеткізу аралығын және ашықхат мәтінін көрсетеді. Сіз флорист пен курьерге арналған барлық мәліметі бар тапсырыс аласыз.',
      en: 'Flowers are bought in a hurry and for a specific date, so what matters in such a store is picking a bouquet quickly and getting the delivery time right. The buyer filters bouquets by occasion and budget, then enters the address, a delivery window and the card message. You receive the order with every detail the florist and the courier need.',
    },
    priceFrom: 150000,
    unit: 'once',
    days: { min: 14, max: 25 },
    includes: {
      ru: [
        'Каталог букетов с фильтрами по поводу, цене и цветам',
        'Выбор даты и интервала доставки при оформлении заказа',
        'Поле для текста открытки и пожеланий для курьера',
        'Допы к букету: вазы, открытки, сладости, как отдельные позиции',
        'Расчёт стоимости доставки по зонам города, которые вы зададите',
        'Админка: смена наличия букетов и цен, статусы заказов',
        'Уведомление о заказе вам и флористу в Telegram',
      ],
      kk: [
        'Себебі, бағасы және гүлдері бойынша сүзгілері бар гүл шоқтарының каталогы',
        'Тапсырыс рәсімдеу кезінде жеткізу күні мен аралығын таңдау',
        'Ашықхат мәтіні мен курьерге тілектер өрісі',
        'Гүл шоғына қосымшалар: вазалар, ашықхаттар, тәттілер бөлек позиция ретінде',
        'Өзіңіз белгілейтін қала аймақтары бойынша жеткізу құнын есептеу',
        'Әкімшілік панелі: гүл шоқтарының болуы мен бағасын өзгерту, тапсырыс мәртебелері',
        'Тапсырыс туралы сізге және флористке Telegram-да хабарлау',
      ],
      en: [
        'Bouquet catalog with filters by occasion, price and flowers',
        'Choice of delivery date and time window at checkout',
        'A field for the card message and notes for the courier',
        'Add-ons such as vases, cards and sweets as separate items',
        'Delivery cost by city zones that you define',
        'Admin panel to change availability and prices, plus order statuses',
        'Order alerts for you and the florist in Telegram',
      ],
    },
    notIncluded: {
      ru: [
        'Фотографии букетов: нужна качественная съёмка с вашей стороны',
        'Курьерская служба: доставку организуете вы',
        'Онлайн-оплата картой: подключается отдельно по договорённости через API провайдера',
      ],
      kk: [
        'Гүл шоқтарының фотосуреттері: сапалы түсірілімді өзіңіз ұсынасыз',
        'Курьерлік қызмет: жеткізуді өзіңіз ұйымдастырасыз',
        'Картамен онлайн төлем: провайдердің API-і арқылы келісім бойынша бөлек қосылады',
      ],
      en: [
        'Bouquet photos, since good photography has to come from your side',
        'A courier service, as you organise the delivery yourself',
        'Online card payment, which can be added separately through a provider API by agreement',
      ],
    },
    forWhom: {
      ru: 'Для цветочных салонов и флористов, которые принимают заказы по телефону и в переписке и хотят вынести витрину на сайт. Особенно удобно, когда нужно заранее фиксировать дату и интервал доставки.',
      kk: 'Тапсырысты телефонмен және хат алмасуда қабылдайтын және витринаны сайтқа шығарғысы келетін гүл салондарына мен флористерге арналған. Жеткізу күні мен аралығын алдын ала бекіту қажет болғанда әсіресе ыңғайлы.',
      en: 'For flower shops and florists who take orders by phone and chat and want to move the showcase to a website. It is especially handy when the delivery date and window must be fixed in advance.',
    },
    faq: [
      {
        q: {
          ru: 'Можно ли ограничить срочные заказы?',
          kk: 'Шұғыл тапсырыстарды шектеуге бола ма?',
          en: 'Can I limit last-minute orders?',
        },
        a: {
          ru: 'Да, задаётся минимальный срок до доставки и количество слотов в интервале. Так магазин не примет больше заказов, чем успевает собрать флорист.',
          kk: 'Иә, жеткізуге дейінгі ең аз мерзім мен аралықтағы слот саны белгіленеді. Сонда дүкен флорист жинап үлгеретіннен көп тапсырыс қабылдамайды.',
          en: 'Yes, you set a minimum lead time before delivery and the number of slots per window. That way the shop never accepts more orders than the florist can prepare.',
        },
      },
      {
        q: {
          ru: 'Как работает доставка по зонам?',
          kk: 'Аймақтар бойынша жеткізу қалай жұмыс істейді?',
          en: 'How does zone-based delivery work?',
        },
        a: {
          ru: 'Вы делите город на районы и назначаете цену каждому. Покупатель выбирает район при оформлении, и стоимость доставки прибавляется к заказу автоматически.',
          kk: 'Қаланы аудандарға бөліп, әрқайсысына баға белгілейсіз. Сатып алушы рәсімдеу кезінде ауданды таңдайды, жеткізу құны тапсырысқа автоматты түрде қосылады.',
          en: 'You split the city into districts and set a price for each. The buyer picks a district at checkout and the delivery fee is added to the order automatically.',
        },
      },
      {
        q: {
          ru: 'Как показывать, каких букетов нет в наличии?',
          kk: 'Қандай гүл шоқтары жоқ екенін қалай көрсетуге болады?',
          en: 'How do I show which bouquets are out of stock?',
        },
        a: {
          ru: 'В админке букет скрывается или помечается «под заказ» одним переключателем. На сайте такая позиция не вводит покупателя в заблуждение.',
          kk: 'Әкімшілік панелінде гүл шоғы бір ауыстырғышпен жасырылады немесе «тапсырыс бойынша» деп белгіленеді. Сайтта мұндай позиция сатып алушыны адастырмайды.',
          en: 'In the admin panel a bouquet is hidden or marked as made to order with one switch. On the site such an item does not mislead the buyer.',
        },
      },
    ],
    relatedProducts: ['internet-magazin', 'telegram-bot-dostavka', 'kartochka-2gis-google-maps'],
  },
  {
    slug: 'internet-magazin-odezhdy',
    category: 'ecommerce',
    title: {
      ru: 'Интернет-магазин одежды',
      kk: 'Киім интернет-дүкені',
      en: 'Online clothing store',
    },
    short: {
      ru: 'Магазин одежды с размерами, цветами, наличием по размерам и удобным оформлением заказа.',
      kk: 'Өлшемдері, түстері, өлшем бойынша болуы және ыңғайлы тапсырыс рәсімдеуі бар киім дүкені.',
      en: 'A clothing store with sizes, colours, stock per size and a smooth checkout.',
    },
    description: {
      ru: 'У одежды один товар существует в десятке вариантов, и магазин должен показывать наличие каждого размера и цвета. Покупатель фильтрует каталог по размеру, смотрит галерею фото и добавляет в корзину именно нужный вариант. Вы ведёте остатки по каждому варианту, поэтому нет заказов на то, чего нет.',
      kk: 'Киімде бір тауар ондаған нұсқада болады, сондықтан дүкен әр өлшем мен түстің болуын көрсетуі тиіс. Сатып алушы каталогты өлшем бойынша сүзеді, фото галереяны қарайды және керекті нұсқаны ғана себетке салады. Қалдықты әр нұсқа бойынша жүргізесіз, сондықтан жоқ тауарға тапсырыс түспейді.',
      en: 'One piece of clothing exists in a dozen variants, so the store has to show stock for every size and colour. The shopper filters the catalog by size, browses a photo gallery and adds the exact variant to the cart. You track stock per variant, so orders do not come in for things you do not have.',
    },
    priceFrom: 170000,
    unit: 'once',
    days: { min: 15, max: 30 },
    includes: {
      ru: [
        'Карточка товара с вариантами: размер, цвет, остаток по каждому',
        'Галерея фото на карточке и переключение фото при выборе цвета',
        'Фильтры по размеру, цвету, цене и категории',
        'Таблица размеров, которую вы заполняете для каждой категории',
        'Корзина, оформление заказа и выбор доставки',
        'Админка с остатками по вариантам и загрузкой товаров из таблицы',
        'Уведомления о заказах в Telegram и на почту',
      ],
      kk: [
        'Нұсқалары бар тауар карточкасы: өлшем, түс, әрқайсысы бойынша қалдық',
        'Карточкада фото галерея және түсті таңдағанда фотоны ауыстыру',
        'Өлшем, түс, баға және санат бойынша сүзгілер',
        'Әр санат үшін өзіңіз толтыратын өлшемдер кестесі',
        'Себет, тапсырыс рәсімдеу және жеткізуді таңдау',
        'Нұсқалар бойынша қалдығы бар әкімшілік панелі және кестеден тауар жүктеу',
        'Тапсырыстар туралы Telegram-ға және поштаға хабарлама',
      ],
      en: [
        'Product page with variants, meaning size, colour and stock for each',
        'Photo gallery on the product page that switches with the chosen colour',
        'Filters by size, colour, price and category',
        'A size chart you fill in for each category',
        'Cart, checkout and a choice of delivery method',
        'Admin panel with per-variant stock and product import from a spreadsheet',
        'Order alerts in Telegram and by email',
      ],
    },
    notIncluded: {
      ru: [
        'Фотосъёмка одежды и описания: материал предоставляете вы',
        'Онлайн-оплата картой: подключается отдельно по договорённости через API провайдера',
        'Обработка возвратов и обмена: правила и процесс остаются на вашей стороне',
      ],
      kk: [
        'Киімді фотоға түсіру және сипаттамалар: материалды сіз ұсынасыз',
        'Картамен онлайн төлем: провайдердің API-і арқылы келісім бойынша бөлек қосылады',
        'Қайтарым мен айырбасты өңдеу: ережелер мен процесс сіздің жағыңызда қалады',
      ],
      en: [
        'Clothing photography and descriptions, which you provide',
        'Online card payment, which can be added separately through a provider API by agreement',
        'Returns and exchange handling, as the rules and process stay on your side',
      ],
    },
    forWhom: {
      ru: 'Для бутиков, шоурумов и небольших брендов одежды, которые продают в Instagram и хотят перенести покупателей на собственный сайт. Нужен, когда в переписке уже запутались в размерах и остатках.',
      kk: 'Instagram-да сататын және сатып алушыларды өз сайтына көшіргісі келетін бутиктерге, шоурумдарға және шағын киім брендтеріне арналған. Хат алмасуда өлшемдер мен қалдықта шатасып қалғанда қажет.',
      en: 'For boutiques, showrooms and small clothing brands that sell through Instagram and want to move buyers to their own site. It is useful once you are tired of juggling sizes and stock in chat messages.',
    },
    faq: [
      {
        q: {
          ru: 'Как работают остатки по размерам?',
          kk: 'Өлшемдер бойынша қалдықтар қалай жұмыс істейді?',
          en: 'How does per-size stock work?',
        },
        a: {
          ru: 'Для каждого сочетания размера и цвета хранится своё количество. Когда размер заканчивается, он становится неактивным, а остальные варианты остаются доступными.',
          kk: 'Өлшем мен түстің әр үйлесімі үшін өз саны сақталады. Өлшем таусылғанда ол белсенді емес болады, ал қалған нұсқалар қолжетімді күйінде қалады.',
          en: 'Each combination of size and colour has its own quantity. When a size runs out it becomes inactive, while the other variants stay available.',
        },
      },
      {
        q: {
          ru: 'Можно загрузить сразу всю коллекцию?',
          kk: 'Бүкіл топтаманы бірден жүктеуге бола ма?',
          en: 'Can I upload a whole collection at once?',
        },
        a: {
          ru: 'Да, товары с вариантами загружаются из таблицы по шаблону, который я подготовлю. Фото привязываются к товарам по названию файла.',
          kk: 'Иә, нұсқалары бар тауарлар мен дайындайтын үлгі бойынша кестеден жүктеледі. Фотолар файл атауы арқылы тауарға байланады.',
          en: 'Yes, products with variants are imported from a spreadsheet using a template I prepare. Photos are matched to products by file name.',
        },
      },
      {
        q: {
          ru: 'Чем он отличается от обычного интернет-магазина?',
          kk: 'Ол қарапайым интернет-дүкеннен несімен ерекшеленеді?',
          en: 'How is it different from the general online store?',
        },
        a: {
          ru: 'Здесь вся логика строится вокруг вариантов товара: размеры, цвета, таблица размеров и остатки по каждому. Общий магазин подходит для товаров без таких вариантов.',
          kk: 'Мұнда бүкіл логика тауар нұсқаларының төңірегінде құрылған: өлшемдер, түстер, өлшем кестесі және әрқайсысының қалдығы. Жалпы дүкен мұндай нұсқалары жоқ тауарларға жарайды.',
          en: 'Here all the logic is built around product variants: sizes, colours, a size chart and stock for each. The general store suits goods without such variants.',
        },
      },
    ],
    relatedProducts: ['internet-magazin', 'magazin-s-kaspi-xml', 'ai-opisaniya-tovarov'],
  },
];
