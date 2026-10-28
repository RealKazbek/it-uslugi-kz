export default [
  {
    slug: 'telegram-bot-zapis',
    category: 'bots',
    title: {
      ru: 'Telegram-бот для записи клиентов',
      kk: 'Клиенттерді жазуға арналған Telegram-бот',
      en: 'Telegram appointment booking bot',
    },
    short: {
      ru: 'Бот показывает свободные слоты, записывает клиента и напоминает ему о визите.',
      kk: 'Бот бос уақыттарды көрсетеді, клиентті жазады және оған келу туралы еске салады.',
      en: 'A bot that shows free time slots, books the client and reminds them before the visit.',
    },
    description: {
      ru: 'Клиент выбирает услугу, мастера и свободное время прямо в чате, а запись сразу попадает в ваше расписание. Бот не даёт записать двоих на одно время и присылает напоминание накануне, из-за чего реже случаются неявки. Подходит всем, кто принимает по записи и устал отвечать на одни и те же сообщения.',
      kk: 'Клиент қызметті, шебері мен бос уақытты тікелей чатта таңдайды, ал жазылу бірден сіздің кестеңізге түседі. Бот екі адамды бір уақытқа жазуға жол бермейді және алдыңғы күні еске салады, сондықтан келмей қалу сирек болады. Алдын ала жазылумен қабылдайтын және бір хабарға қайта-қайта жауап беруден шаршағандарға жарайды.',
      en: 'The client picks a service, a specialist and a free time right in the chat, and the booking lands in your schedule at once. The bot will not book two people into the same slot and sends a reminder the day before, which cuts down on no-shows. It suits anyone who works by appointment and is tired of answering the same messages.',
    },
    priceFrom: 35000,
    unit: 'once',
    days: { min: 4, max: 8 },
    includes: {
      ru: [
        'Диалог записи: услуга, специалист, дата и время',
        'Расписание с рабочими часами, перерывами и выходными',
        'Защита от двойной записи на одно и то же время',
        'Напоминание клиенту о визите за заданное время',
        'Уведомление вам о каждой новой записи и отмене',
        'Отмена и перенос записи самим клиентом',
        'Разработка на Python и aiogram, запуск на сервере',
      ],
      kk: [
        'Жазылу диалогы: қызмет, маман, күн мен уақыт',
        'Жұмыс сағаттары, үзілістері және демалыс күндері бар кесте',
        'Бір уақытқа қос жазылудан қорғау',
        'Клиентке белгіленген уақытта келу туралы еске салу',
        'Әрбір жаңа жазылу мен бас тарту туралы сізге хабарлама',
        'Клиенттің жазылуды өзі болдырмауы және ауыстыруы',
        'Python мен aiogram-да әзірлеу, серверде іске қосу',
      ],
      en: [
        'Booking dialogue covering service, specialist, date and time',
        'Schedule with working hours, breaks and days off',
        'Protection against double booking the same time',
        'Reminder to the client a set time before the visit',
        'Alert to you on every new booking and cancellation',
        'Cancel and reschedule by the client',
        'Built with Python and aiogram and deployed on a server',
      ],
    },
    notIncluded: {
      ru: [
        'Предоплата и онлайн-оплата визита: подключаются отдельно по договорённости через API провайдера',
        'Сервер для бота: оформляется на вас и оплачивается по тарифу провайдера',
        'Тексты услуг и цены: список услуг предоставляете вы',
      ],
      kk: [
        'Алдын ала төлем және визитті онлайн төлеу: провайдердің API-і арқылы келісім бойынша бөлек қосылады',
        'Бот сервері: сіздің атыңызға ресімделеді, провайдер тарифімен төленеді',
        'Қызмет мәтіндері мен бағалар: қызметтер тізімін өзіңіз бересіз',
      ],
      en: [
        'Prepayment or online payment for the visit, which can be added separately through a provider API by agreement',
        'The server for the bot, set up in your name and paid at the provider rate',
        'Service descriptions and prices, as the list of services comes from you',
      ],
    },
    forWhom: {
      ru: 'Для салонов, барбершопов, кабинетов врачей, психологов, студий и репетиторов, у которых клиенты приходят в определённое время. Лучше всего работает там, где клиенты и так сидят в Telegram.',
      kk: 'Клиенттері белгілі бір уақытта келетін салондарға, барбершоптарға, дәрігер мен психолог кабинеттеріне, студиялар мен репетиторларға арналған. Клиенттері Telegram-да отыратын жерде жақсы жұмыс істейді.',
      en: 'For salons, barbershops, doctors, psychologists, studios and tutors whose clients come at a set time. It works best where clients are already in Telegram.',
    },
    faq: [
      {
        q: {
          ru: 'Где я вижу записи?',
          kk: 'Жазылуларды қайдан көремін?',
          en: 'Where do I see the bookings?',
        },
        a: {
          ru: 'Каждая запись приходит вам сообщением в Telegram, а общий список доступен командой в боте. Если удобнее, записи можно дублировать в Google Календарь или таблицу, это обсуждается заранее.',
          kk: 'Әр жазылу сізге Telegram-да хабарлама болып келеді, ал жалпы тізім боттағы команда арқылы қолжетімді. Ыңғайлырақ болса, жазылуларды Google күнтізбесіне немесе кестеге көшіруге болады, бұл алдын ала келіседі.',
          en: 'Each booking reaches you as a Telegram message, and the full list is available through a command in the bot. If you prefer, bookings can also be mirrored to Google Calendar or a spreadsheet, which we agree on beforehand.',
        },
      },
      {
        q: {
          ru: 'Можно ли вести несколько мастеров?',
          kk: 'Бірнеше шеберді жүргізуге бола ма?',
          en: 'Can it handle several specialists?',
        },
        a: {
          ru: 'Да, у каждого мастера своё расписание и свой набор услуг. Клиент выбирает конкретного человека или любого свободного.',
          kk: 'Иә, әр шебердің өз кестесі мен қызметтер жиыны болады. Клиент нақты адамды немесе кез келген бос шебері таңдайды.',
          en: 'Yes, each specialist has their own schedule and set of services. The client picks a particular person or whoever is free.',
        },
      },
      {
        q: {
          ru: 'Что, если клиент не пользуется Telegram?',
          kk: 'Клиент Telegram қолданбаса ше?',
          en: 'What if the client does not use Telegram?',
        },
        a: {
          ru: 'Тогда запись по телефону или через сайт остаётся как раньше, и вы можете добавить такую запись в бот вручную. Бот дополняет ваши каналы, а не заменяет их.',
          kk: 'Онда телефонмен немесе сайт арқылы жазылу бұрынғыдай қалады, ал мұндай жазылуды ботқа қолмен қосуға болады. Бот сіздің арналарыңызды толықтырады, ауыстырмайды.',
          en: 'Then booking by phone or through the site stays as it was, and you can add that booking to the bot by hand. The bot complements your channels instead of replacing them.',
        },
      },
    ],
    relatedProducts: ['onlain-zapis-google-calendar', 'sait-dlya-salona-krasoty', 'telegram-bot-zayavki'],
  },
  {
    slug: 'telegram-bot-zayavki',
    category: 'bots',
    title: {
      ru: 'Telegram-бот для приёма заявок',
      kk: 'Өтінім қабылдайтын Telegram-бот',
      en: 'Telegram lead-capture bot',
    },
    short: {
      ru: 'Бот задаёт клиенту несколько вопросов и присылает вам готовую заявку.',
      kk: 'Бот клиентке бірнеше сұрақ қояды да, сізге дайын өтінімді жібереді.',
      en: 'A bot that asks the customer a few questions and sends you a complete enquiry.',
    },
    description: {
      ru: 'Вместо длинной переписки бот сам собирает нужные данные: что нужно, когда, на какой номер перезвонить. Готовая заявка приходит вам одним сообщением, а клиент получает подтверждение. Это простое решение, если главная задача — не терять обращения и не уточнять детали заново.',
      kk: 'Ұзақ хат алмасудың орнына бот қажетті деректерді өзі жинайды: не керек, қашан, қай нөмірге қоңырау шалу керек. Дайын өтінім сізге бір хабарламамен келеді, ал клиент растау алады. Басты міндет — өтінімді жоғалтпау және мәліметтерді қайта сұрамау болса, бұл қарапайым шешім.',
      en: 'Instead of a long chat, the bot collects the details itself: what is needed, by when and which number to call back. The finished enquiry reaches you as a single message and the customer gets a confirmation. It is a simple fix when the main goal is not to lose enquiries or ask for the details twice.',
    },
    priceFrom: 30000,
    unit: 'once',
    days: { min: 3, max: 5 },
    includes: {
      ru: [
        'Сценарий вопросов под вашу сферу: от 3 до 6 шагов',
        'Проверка формата телефона и обязательных полей',
        'Отправка заявки вам в личные сообщения или в рабочий чат',
        'Подтверждение клиенту и короткая благодарность в конце',
        'Запись заявок в Google Таблицу, если она вам нужна',
        'Разработка на Python и aiogram, запуск на сервере',
      ],
      kk: [
        'Саланызға арналған сұрақтар сценарийі: 3-тен 6 қадамға дейін',
        'Телефон пішімін және міндетті өрістерді тексеру',
        'Өтінімді сізге жеке хабарламамен немесе жұмыс чатына жіберу',
        'Клиентке растау және соңында қысқаша алғыс',
        'Қажет болса, өтінімдерді Google кестесіне жазу',
        'Python мен aiogram-да әзірлеу, серверде іске қосу',
      ],
      en: [
        'A question flow for your field, from 3 to 6 steps',
        'Validation of the phone format and required fields',
        'Delivery of the enquiry to your private chat or a work group',
        'Confirmation to the customer with a short thank-you at the end',
        'Logging enquiries to a Google Sheet if you want it',
        'Built with Python and aiogram and deployed on a server',
      ],
    },
    notIncluded: {
      ru: [
        'Реклама и привлечение людей в бота: это отдельная задача',
        'Сервер для бота: оформляется на вас и оплачивается по тарифу провайдера',
        'Обработка самих заявок: перезванивать и отвечать клиентам будете вы',
      ],
      kk: [
        'Жарнама және адамдарды ботқа тарту: бұл бөлек міндет',
        'Бот сервері: сіздің атыңызға ресімделеді, провайдер тарифімен төленеді',
        'Өтінімдерді өңдеудің өзі: қоңырау шалып, клиенттерге жауап беруді өзіңіз атқарасыз',
      ],
      en: [
        'Advertising and driving people to the bot, which is a separate task',
        'The server for the bot, set up in your name and paid at the provider rate',
        'Handling the enquiries themselves, as calling back and replying is up to you',
      ],
    },
    forWhom: {
      ru: 'Для мастеров, небольших компаний и фрилансеров, которым пишут в Telegram с вопросами про цену и сроки. Подходит, когда клиентов мало на запись по слотам, а вот заявки на расчёт нужно собирать аккуратно.',
      kk: 'Telegram-да баға мен мерзім туралы жазатын шеберлерге, шағын компаниялар мен фрилансерлерге арналған. Слотпен жазылатын клиент аз, ал есептеуге арналған өтінімді ұқыпты жинау керек болғанда жарайды.',
      en: 'For tradespeople, small companies and freelancers who get messages in Telegram asking about price and timing. It fits when you do not need slot booking but do need to collect quote requests neatly.',
    },
    faq: [
      {
        q: {
          ru: 'Сколько вопросов может задать бот?',
          kk: 'Бот қанша сұрақ қоя алады?',
          en: 'How many questions can the bot ask?',
        },
        a: {
          ru: 'Лучше уложиться в 3-6 шагов: длинная анкета отпугивает. Конкретный набор вопросов обсуждаем под вашу сферу, и его можно будет менять.',
          kk: '3-6 қадамға сыйғызған жөн: ұзын сауалнама адамдарды үркітеді. Нақты сұрақтар жиынын саланызға қарай талқылаймыз, оны кейін өзгертуге болады.',
          en: 'It is best to keep to 3 to 6 steps, because a long form puts people off. We agree on the exact questions for your field, and they can be changed later.',
        },
      },
      {
        q: {
          ru: 'Куда придёт заявка?',
          kk: 'Өтінім қайда келеді?',
          en: 'Where does the enquiry go?',
        },
        a: {
          ru: 'В ваш личный чат с ботом или в рабочую группу, где сидят несколько сотрудников. Можно подключить дублирование на почту.',
          kk: 'Ботпен жеке чатыңызға немесе бірнеше қызметкер отыратын жұмыс тобына келеді. Поштаға көшіруді қосуға болады.',
          en: 'To your private chat with the bot or to a work group where several staff members are present. Mirroring to email can be added.',
        },
      },
      {
        q: {
          ru: 'Чем он отличается от бота для записи?',
          kk: 'Ол жазылу ботынан несімен ерекшеленеді?',
          en: 'How is it different from the booking bot?',
        },
        a: {
          ru: 'Здесь нет расписания и слотов: бот собирает контакты и суть запроса, а договариваетесь вы уже сами. Если нужно выбирать время, возьмите бот для записи.',
          kk: 'Мұнда кесте мен слоттар жоқ: бот байланыс пен сұраныс мәнін жинайды, ал келісімді өзіңіз жасайсыз. Уақыт таңдау керек болса, жазылу ботын алыңыз.',
          en: 'This one has no schedule or slots: the bot gathers the contact and the substance of the request and you take it from there. If clients need to pick a time, choose the booking bot.',
        },
      },
    ],
    relatedProducts: ['telegram-bot-zapis', 'zayavki-v-google-sheets', 'uvedomleniya-o-zayavkah'],
  },
  {
    slug: 'telegram-bot-katalog',
    category: 'bots',
    title: {
      ru: 'Telegram-бот с каталогом',
      kk: 'Каталогы бар Telegram-бот',
      en: 'Telegram catalog bot',
    },
    short: {
      ru: 'Бот-витрина: категории, карточки товаров с фото и кнопка «Заказать».',
      kk: 'Бот-витрина: санаттар, фотосы бар тауар карточкалары және «Тапсырыс беру» батырмасы.',
      en: 'A storefront bot with categories, product cards with photos and an Order button.',
    },
    description: {
      ru: 'Покупатель листает категории, смотрит фото, цену и описание и нажимает «Заказать». Вам приходит сообщение с названием товара и контактом клиента. Каталог берётся из таблицы, поэтому вы меняете цены в привычном Excel или Google Таблице, а не просите программиста.',
      kk: 'Сатып алушы санаттарды парақтап, фотоны, бағаны және сипаттаманы қарап, «Тапсырыс беру» батырмасын басады. Сізге тауар атауы мен клиент байланысы бар хабарлама келеді. Каталог кестеден алынады, сондықтан бағаны бағдарламашыдан сұрамай, әдеттегі Excel немесе Google кестесінде өзгертесіз.',
      en: 'The buyer browses categories, looks at the photo, price and description, and taps Order. You get a message with the product name and the customer contact. The catalog is read from a spreadsheet, so you change prices in the familiar Excel or Google Sheets instead of asking a programmer.',
    },
    priceFrom: 50000,
    unit: 'once',
    days: { min: 7, max: 12 },
    includes: {
      ru: [
        'Дерево категорий и карточки товаров с фото, ценой и описанием',
        'Листание карточек кнопками и поиск по названию',
        'Каталог из Google Таблицы, которую вы правите сами',
        'Кнопка «Заказать» с уточнением количества и контакта',
        'Уведомление о новом заказе вам в Telegram',
        'Разработка на Python и aiogram, запуск на сервере',
      ],
      kk: [
        'Санаттар ағашы және фотосы, бағасы мен сипаттамасы бар тауар карточкалары',
        'Карточкаларды батырмамен парақтау және атау бойынша іздеу',
        'Өзіңіз түзететін Google кестесінен алынатын каталог',
        'Санын және байланысты нақтылайтын «Тапсырыс беру» батырмасы',
        'Жаңа тапсырыс туралы сізге Telegram-да хабарлама',
        'Python мен aiogram-да әзірлеу, серверде іске қосу',
      ],
      en: [
        'Category tree and product cards with photo, price and description',
        'Browsing by buttons and search by name',
        'A catalog read from a Google Sheet that you edit yourself',
        'An Order button that asks for quantity and contact',
        'Alert about each new order in your Telegram',
        'Built with Python and aiogram and deployed on a server',
      ],
    },
    notIncluded: {
      ru: [
        'Фото, названия и описания товаров: предоставляете вы',
        'Корзина на много позиций и онлайн-оплата: для этого лучше Telegram Mini App',
        'Сервер для бота: оформляется на вас и оплачивается по тарифу провайдера',
      ],
      kk: [
        'Тауар фотосуреттері, атаулары мен сипаттамалары: оларды сіз ұсынасыз',
        'Көп позициялы себет және онлайн төлем: ол үшін Telegram Mini App дұрысырақ',
        'Бот сервері: сіздің атыңызға ресімделеді, провайдер тарифімен төленеді',
      ],
      en: [
        'Product photos, names and descriptions, which you provide',
        'A multi-item cart and online payment, for which a Telegram Mini App is a better fit',
        'The server for the bot, set up in your name and paid at the provider rate',
      ],
    },
    forWhom: {
      ru: 'Для небольших магазинов и продавцов, у которых ассортимент до пары сотен позиций и покупатели общаются в Telegram. Это замена бесконечным альбомам и пересылке фото в личку.',
      kk: 'Ассортименті екі жүздей позицияға дейінгі және сатып алушылары Telegram-да сөйлесетін шағын дүкендер мен сатушыларға арналған. Шексіз альбомдар мен суретті жеке хабарға жіберудің орнын басады.',
      en: 'For small shops and sellers with a range of up to a couple of hundred items whose buyers talk in Telegram. It replaces endless photo albums and forwarding pictures in private messages.',
    },
    faq: [
      {
        q: {
          ru: 'Сколько товаров можно загрузить?',
          kk: 'Қанша тауар жүктеуге болады?',
          en: 'How many products can it hold?',
        },
        a: {
          ru: 'Несколько сотен позиций работают без проблем. Для тысяч товаров с фильтрами удобнее Mini App или интернет-магазин, и я скажу об этом сразу.',
          kk: 'Бірнеше жүз позиция қиындықсыз жұмыс істейді. Сүзгілері бар мыңдаған тауарға Mini App немесе интернет-дүкен ыңғайлырақ, мұны бірден айтамын.',
          en: 'A few hundred items work without trouble. For thousands of products with filters a Mini App or an online store is more convenient, and I will say so up front.',
        },
      },
      {
        q: {
          ru: 'Как обновлять цены?',
          kk: 'Бағаны қалай жаңартуға болады?',
          en: 'How do I update prices?',
        },
        a: {
          ru: 'Вы правите ячейки в Google Таблице, и бот при следующем обновлении показывает новые значения. Менять код не нужно.',
          kk: 'Google кестесіндегі ұяшықтарды түзетесіз, бот келесі жаңартуда жаңа мәндерді көрсетеді. Кодты өзгертудің қажеті жоқ.',
          en: 'You edit cells in the Google Sheet and the bot shows the new values on its next refresh. No code needs changing.',
        },
      },
      {
        q: {
          ru: 'Как оплачивается заказ?',
          kk: 'Тапсырыс қалай төленеді?',
          en: 'How is an order paid for?',
        },
        a: {
          ru: 'Бот передаёт заказ вам, а оплату вы согласуете с клиентом так же, как сейчас. Онлайн-оплату можно подключить отдельно через API выбранного провайдера.',
          kk: 'Бот тапсырысты сізге береді, ал төлемді қазіргідей клиентпен келісесіз. Онлайн төлемді таңдалған провайдердің API-і арқылы бөлек қосуға болады.',
          en: 'The bot passes the order to you and you arrange payment with the customer the way you do now. Online payment can be added separately through the API of the provider you choose.',
        },
      },
    ],
    relatedProducts: ['telegram-mini-app-magazin', 'katalog-s-zakazom-v-whatsapp', 'telegram-bot-dostavka'],
  },
  {
    slug: 'telegram-bot-dostavka',
    category: 'bots',
    title: {
      ru: 'Telegram-бот для заказа с доставкой',
      kk: 'Жеткізумен тапсырыс беретін Telegram-бот',
      en: 'Telegram ordering and delivery bot',
    },
    short: {
      ru: 'Бот для кафе, пекарен и магазинов: меню, корзина, адрес доставки и статусы заказа.',
      kk: 'Кафе, наубайхана және дүкендерге арналған бот: мәзір, себет, жеткізу мекенжайы және тапсырыс мәртебелері.',
      en: 'A bot for cafes, bakeries and shops with a menu, cart, delivery address and order statuses.',
    },
    description: {
      ru: 'Покупатель собирает заказ из меню, указывает адрес или отправляет геолокацию и выбирает доставку либо самовывоз. Вы получаете заказ с адресом и суммой, меняете его статус кнопкой, а клиент видит, что заказ принят и выехал. Это уже полноценный сценарий заказа, а не просто витрина с кнопкой.',
      kk: 'Сатып алушы мәзірден тапсырыс жинайды, мекенжайды көрсетеді немесе геолокация жібереді және жеткізуді не өзі алып кетуді таңдайды. Сіз мекенжайы мен сомасы бар тапсырысты аласыз, оның мәртебесін батырмамен өзгертесіз, ал клиент тапсырыстың қабылданғанын және жолға шыққанын көреді. Бұл витрина мен батырма емес, тапсырыс берудің толық сценарийі.',
      en: 'The customer builds an order from the menu, enters an address or shares a location, and chooses delivery or pickup. You receive the order with the address and total, change its status with a button, and the customer sees that it was accepted and is on its way. This is a complete ordering flow, not just a showcase with a button.',
    },
    priceFrom: 60000,
    unit: 'once',
    days: { min: 10, max: 15 },
    includes: {
      ru: [
        'Меню с категориями, фото, ценой и вариантами блюд или товаров',
        'Корзина с изменением количества и подсчётом суммы',
        'Выбор доставки или самовывоза, ввод адреса или геолокация',
        'Минимальная сумма заказа и стоимость доставки по вашим правилам',
        'Кнопки статусов для вас: принят, готовится, передан курьеру',
        'Сообщения клиенту при каждой смене статуса',
        'Копия заказов в рабочий чат или таблицу',
      ],
      kk: [
        'Санаттары, фотосы, бағасы және тамақ не тауар нұсқалары бар мәзір',
        'Санын өзгертетін және соманы есептейтін себет',
        'Жеткізу не өзі алып кетуді таңдау, мекенжай енгізу немесе геолокация',
        'Сіздің ережеңіз бойынша тапсырыстың ең аз сомасы және жеткізу құны',
        'Сізге арналған мәртебе батырмалары: қабылданды, дайындалуда, курьерге берілді',
        'Әр мәртебе өзгергенде клиентке хабарлама',
        'Тапсырыстардың көшірмесі жұмыс чатына немесе кестеге',
      ],
      en: [
        'Menu with categories, photos, prices and item options',
        'Cart with editable quantities and a running total',
        'Choice of delivery or pickup, with address entry or location sharing',
        'Minimum order amount and delivery fee under your own rules',
        'Status buttons for you: accepted, preparing, handed to courier',
        'A message to the customer on every status change',
        'A copy of orders to a work group or a spreadsheet',
      ],
    },
    notIncluded: {
      ru: [
        'Курьеры и транспорт: доставку организуете вы',
        'Оплата картой в боте: подключается отдельно по договорённости через API провайдера',
        'Сервер для бота: оформляется на вас и оплачивается по тарифу провайдера',
      ],
      kk: [
        'Курьерлер мен көлік: жеткізуді өзіңіз ұйымдастырасыз',
        'Ботта картамен төлем: провайдердің API-і арқылы келісім бойынша бөлек қосылады',
        'Бот сервері: сіздің атыңызға ресімделеді, провайдер тарифімен төленеді',
      ],
      en: [
        'Couriers and vehicles, as you organise the delivery yourself',
        'Card payment in the bot, which can be added separately through a provider API by agreement',
        'The server for the bot, set up in your name and paid at the provider rate',
      ],
    },
    forWhom: {
      ru: 'Для кафе, пекарен, домашней кухни, магазинов продуктов и цветов, которые доставляют по городу. Нужен, когда заказы идут десятками и вручную в переписке их уже трудно вести.',
      kk: 'Қала бойынша жеткізетін кафелерге, наубайханаларға, үй асханасына, азық-түлік және гүл дүкендеріне арналған. Тапсырыс ондап келіп, оны хат алмасуда қолмен жүргізу қиындағанда керек.',
      en: 'For cafes, bakeries, home kitchens, grocery and flower shops that deliver around town. It is needed once orders come in by the dozen and tracking them by hand in chat gets difficult.',
    },
    faq: [
      {
        q: {
          ru: 'Как бот узнаёт адрес клиента?',
          kk: 'Бот клиент мекенжайын қалай біледі?',
          en: 'How does the bot get the customer address?',
        },
        a: {
          ru: 'Клиент вводит адрес текстом или присылает геолокацию из Telegram. Адрес приходит вам вместе с заказом, и курьер может открыть его на карте.',
          kk: 'Клиент мекенжайды мәтінмен енгізеді немесе Telegram-нан геолокация жібереді. Мекенжай сізге тапсырыспен бірге келеді, курьер оны картадан аша алады.',
          en: 'The customer types the address or sends a location from Telegram. The address reaches you with the order, and the courier can open it on a map.',
        },
      },
      {
        q: {
          ru: 'Можно ли временно закрыть приём заказов?',
          kk: 'Тапсырыс қабылдауды уақытша жабуға бола ма?',
          en: 'Can I pause taking orders temporarily?',
        },
        a: {
          ru: 'Да, в боте задаются часы работы, а вручную приём можно приостановить командой. Вне часов клиент видит сообщение, когда магазин откроется.',
          kk: 'Иә, ботта жұмыс уақыты белгіленеді, ал қабылдауды команда арқылы қолмен тоқтатуға болады. Жұмыс уақытынан тыс клиент дүкеннің қашан ашылатыны туралы хабарды көреді.',
          en: 'Yes, working hours are set in the bot, and you can pause intake by hand with a command. Outside hours the customer sees when you open.',
        },
      },
      {
        q: {
          ru: 'Чем он отличается от бота с каталогом?',
          kk: 'Ол каталог ботынан несімен ерекшеленеді?',
          en: 'How is it different from the catalog bot?',
        },
        a: {
          ru: 'Каталог только показывает товары и передаёт запрос. Этот бот ведёт заказ целиком: корзина, адрес, доставка, статусы и уведомления клиенту.',
          kk: 'Каталог тек тауарды көрсетіп, сұранысты жібереді. Бұл бот тапсырысты түгел жүргізеді: себет, мекенжай, жеткізу, мәртебелер және клиентке хабарламалар.',
          en: 'The catalog bot only shows products and passes on a request. This bot runs the whole order: cart, address, delivery, statuses and customer notifications.',
        },
      },
    ],
    relatedProducts: ['sait-dlya-kafe', 'telegram-mini-app-magazin', 'internet-magazin-cvetov'],
  },
  {
    slug: 'telegram-bot-rassylka',
    category: 'bots',
    title: {
      ru: 'Telegram-бот для рассылок',
      kk: 'Тарату жүргізетін Telegram-бот',
      en: 'Telegram newsletter bot',
    },
    short: {
      ru: 'Бот собирает подписчиков и рассылает им акции и новости сегментам и по расписанию.',
      kk: 'Бот жазылушыларды жинап, оларға акциялар мен жаңалықтарды сегменттерге және кесте бойынша таратады.',
      en: 'A bot that collects subscribers and sends them offers and news by segment and on a schedule.',
    },
    description: {
      ru: 'Рассылка в Telegram-канале видна всем подряд, а бот пишет подписчикам лично и только тем, кому это интересно. Люди подписываются сами, выбирают темы, а вы отправляете сообщение с текстом, фото и кнопкой на нужную группу. По отчёту видно, сколько человек получили сообщение.',
      kk: 'Telegram-арнадағы жаңалық барлығына көрінеді, ал бот жазылушыларға жеке жазады және тек қызықтыратын адамдарға жібереді. Адамдар өздері жазылып, тақырыптарды таңдайды, ал сіз мәтіні, фотосы және батырмасы бар хабарламаны керекті топқа жібересіз. Есеп бойынша хабарламаны қанша адам алғаны көрінеді.',
      en: 'A post in a Telegram channel is visible to everyone, whereas a bot writes to subscribers personally and only to people who care about the topic. People subscribe themselves and pick topics, and you send a message with text, a photo and a button to the chosen group. A report shows how many people received it.',
    },
    priceFrom: 30000,
    unit: 'once',
    days: { min: 3, max: 6 },
    includes: {
      ru: [
        'Подписка по команде или ссылке, отписка в один тап',
        'Выбор тем: подписчик отмечает, что ему интересно',
        'Рассылка текста, фото и кнопки-ссылки для всех или для выбранной темы',
        'Отложенная отправка в заданное время',
        'Отчёт: сколько сообщений доставлено и сколько нет',
        'Пауза между отправками, чтобы не упереться в лимиты Telegram',
      ],
      kk: [
        'Команда немесе сілтеме арқылы жазылу, бір басумен жазылымнан шығу',
        'Тақырыптарды таңдау: жазылушы өзіне қызықтыларын белгілейді',
        'Мәтінді, фотоны және сілтеме батырмасын барлығына немесе таңдалған тақырыпқа тарату',
        'Белгіленген уақытқа кейінге қалдырылған жіберу',
        'Есеп: қанша хабарлама жеткізілді, қаншасы жеткізілмеді',
        'Telegram лимиттеріне тірелмеу үшін жіберулер арасындағы үзіліс',
      ],
      en: [
        'Subscribe by command or link and unsubscribe in one tap',
        'Topic choice, where each subscriber marks what interests them',
        'Sending text, a photo and a link button to everyone or to one topic',
        'Scheduled sending at a set time',
        'A report of how many messages were delivered and how many were not',
        'Pacing between sends so the bot stays within Telegram limits',
      ],
    },
    notIncluded: {
      ru: [
        'Тексты рассылок и картинки: готовите вы',
        'Привлечение подписчиков: бот собирает тех, кто пришёл, но трафик не создаёт',
        'Сервер для бота: оформляется на вас и оплачивается по тарифу провайдера',
      ],
      kk: [
        'Тарату мәтіндері мен суреттер: оларды өзіңіз дайындайсыз',
        'Жазылушыларды тарту: бот келгендерді жинайды, бірақ трафик жасамайды',
        'Бот сервері: сіздің атыңызға ресімделеді, провайдер тарифімен төленеді',
      ],
      en: [
        'Newsletter copy and images, which you prepare',
        'Attracting subscribers, as the bot collects people who come but does not generate traffic',
        'The server for the bot, set up in your name and paid at the provider rate',
      ],
    },
    forWhom: {
      ru: 'Для магазинов, студий и сообществ, которым нужно сообщать об акциях и новинках постоянной аудитории. Не годится для спама: писать можно только тем, кто сам подписался на бота.',
      kk: 'Тұрақты аудиторияға акциялар мен жаңалықтар туралы хабарлау керек дүкендерге, студиялар мен қауымдастықтарға арналған. Спамға жарамайды: тек ботқа өзі жазылғандарға ғана жазуға болады.',
      en: 'For shops, studios and communities that need to tell a regular audience about offers and new arrivals. It is not meant for spam, since you can only write to people who subscribed to the bot themselves.',
    },
    faq: [
      {
        q: {
          ru: 'Могу ли я загрузить в бота готовую базу номеров?',
          kk: 'Ботқа дайын нөмірлер базасын жүктей аламын ба?',
          en: 'Can I load an existing phone list into the bot?',
        },
        a: {
          ru: 'Нет, Telegram не позволяет боту писать человеку, который сам не запустил бота, и по номеру телефона это сделать нельзя. Подписчиков нужно привести ссылкой на бота.',
          kk: 'Жоқ, Telegram боттың өзін іске қоспаған адамға жазуына рұқсат етпейді, телефон нөмірі бойынша мұны істеуге болмайды. Жазылушыларды ботқа сілтемемен әкелу керек.',
          en: 'No. Telegram does not let a bot message a person who has not started it, and a phone number does not change that. Subscribers have to be brought in through a link to the bot.',
        },
      },
      {
        q: {
          ru: 'Есть ли лимит на количество получателей?',
          kk: 'Алушылар санына лимит бар ма?',
          en: 'Is there a limit on the number of recipients?',
        },
        a: {
          ru: 'Telegram ограничивает скорость отправки, поэтому бот шлёт сообщения небольшими порциями. На несколько тысяч подписчиков рассылка занимает минуты, а не секунды.',
          kk: 'Telegram жіберу жылдамдығын шектейді, сондықтан бот хабарламаларды шағын порциямен жібереді. Бірнеше мың жазылушыға тарату секундтарды емес, минуттарды алады.',
          en: 'Telegram limits the sending rate, so the bot sends in small batches. For a few thousand subscribers a mailing takes minutes rather than seconds.',
        },
      },
      {
        q: {
          ru: 'Что будет, если человек заблокирует бота?',
          kk: 'Адам ботты бұғаттаса не болады?',
          en: 'What happens if someone blocks the bot?',
        },
        a: {
          ru: 'Бот отмечает такого подписчика как недоступного и перестаёт пытаться ему писать. В отчёте эти случаи считаются отдельно.',
          kk: 'Бот мұндай жазылушыны қолжетімсіз деп белгілеп, оған жазуға әрекеттенуді тоқтатады. Есепте мұндай жағдайлар бөлек есептеледі.',
          en: 'The bot marks that subscriber as unreachable and stops trying to write to them. The report counts these cases separately.',
        },
      },
    ],
    relatedProducts: ['telegram-bot-zayavki', 'otchety-v-telegram', 'ai-assistent-telegram'],
  },
  {
    slug: 'telegram-bot-faq',
    category: 'bots',
    title: {
      ru: 'Telegram-бот с ответами на частые вопросы',
      kk: 'Жиі қойылатын сұрақтарға жауап беретін Telegram-бот',
      en: 'Telegram FAQ bot',
    },
    short: {
      ru: 'Бот отвечает на типовые вопросы по кнопкам и зовёт вас, когда ответа в нём нет.',
      kk: 'Бот типтік сұрақтарға батырмалар арқылы жауап береді, жауап жоқ болса сізді шақырады.',
      en: 'A bot that answers common questions through buttons and calls you in when it has no answer.',
    },
    description: {
      ru: 'Цены, адрес, график работы, условия возврата: на такие вопросы вы отвечаете десятки раз. Бот выдаёт готовые ответы по кнопкам меню и мгновенно, в любое время суток. Если клиенту нужен живой человек, бот передаёт ему ваш контакт или пересылает вопрос вам.',
      kk: 'Баға, мекенжай, жұмыс кестесі, қайтару шарттары: мұндай сұрақтарға ондаған рет жауап бересіз. Бот мәзір батырмалары арқылы дайын жауаптарды тәулік бойы лезде береді. Клиентке тірі адам керек болса, бот сіздің байланысыңызды береді немесе сұрақты сізге жібереді.',
      en: 'Prices, address, opening hours, return policy: you answer these questions dozens of times. The bot gives ready answers from menu buttons, instantly and at any hour. If the customer needs a real person, the bot hands over your contact or forwards the question to you.',
    },
    priceFrom: 25000,
    unit: 'once',
    days: { min: 2, max: 5 },
    includes: {
      ru: [
        'Меню с кнопками и вложенными разделами по темам вопросов',
        'Готовые тексты ответов, которые вы утверждаете до запуска',
        'Кнопка «Связаться с человеком» с пересылкой вопроса вам',
        'Раздел контактов: адрес, часы работы, ссылка на карту',
        'Статистика: какие вопросы нажимают чаще всего',
        'Правка текстов ответов через файл без участия программиста',
      ],
      kk: [
        'Сұрақ тақырыптары бойынша батырмалары мен ішкі бөлімдері бар мәзір',
        'Іске қосар алдында сіз бекітетін жауаптардың дайын мәтіндері',
        'Сұрақты сізге жіберетін «Адаммен байланысу» батырмасы',
        'Байланыс бөлімі: мекенжай, жұмыс сағаттары, картаға сілтеме',
        'Статистика: қандай сұрақтар жиірек басылады',
        'Жауап мәтіндерін бағдарламашысыз файл арқылы түзету',
      ],
      en: [
        'Button menu with nested sections by question topic',
        'Ready-made answer texts that you approve before launch',
        'A Contact a person button that forwards the question to you',
        'A contacts section with address, opening hours and a map link',
        'Statistics on which questions get tapped most often',
        'Editing answer texts through a file with no programmer involved',
      ],
    },
    notIncluded: {
      ru: [
        'Свободный диалог: бот отвечает по заготовленным кнопкам, а не понимает любой вопрос',
        'Написание всех ответов с нуля: содержание ответов даёте вы',
        'Сервер для бота: оформляется на вас и оплачивается по тарифу провайдера',
      ],
      kk: [
        'Еркін диалог: бот дайын батырмалар бойынша жауап береді, кез келген сұрақты түсінбейді',
        'Барлық жауаптарды нөлден жазу: жауаптың мазмұнын сіз бересіз',
        'Бот сервері: сіздің атыңызға ресімделеді, провайдер тарифімен төленеді',
      ],
      en: [
        'Free-form conversation, since the bot answers from prepared buttons and does not understand any question',
        'Writing every answer from scratch, as you provide the substance',
        'The server for the bot, set up in your name and paid at the provider rate',
      ],
    },
    forWhom: {
      ru: 'Для бизнеса с однотипными вопросами клиентов: магазины, сервисы, клиники, учебные центры. Самый недорогой бот в линейке, его хорошо брать для первого знакомства с автоматизацией.',
      kk: 'Клиенттерінің сұрақтары бірдей бизнеске: дүкендер, сервистер, клиникалар, оқу орталықтары. Қатардағы ең үнемді бот, автоматтандырумен алғаш танысуға жақсы.',
      en: 'For businesses whose customers ask similar things, such as shops, service companies, clinics and training centres. It is the cheapest bot in the line-up and a good first step into automation.',
    },
    faq: [
      {
        q: {
          ru: 'Бот понимает свободный текст?',
          kk: 'Бот еркін мәтінді түсінеді ме?',
          en: 'Does the bot understand free text?',
        },
        a: {
          ru: 'Нет, этот бот работает по кнопкам и заготовленным ответам. Если нужно отвечать на вопросы своими словами по вашей базе знаний, смотрите ИИ-ассистента в Telegram.',
          kk: 'Жоқ, бұл бот батырмалар мен дайын жауаптар бойынша жұмыс істейді. Сіздің білім қорыңыз бойынша сұрақтарға өз сөзімен жауап беру керек болса, Telegram-дағы ЖИ-көмекшіні қараңыз.',
          en: 'No, this bot works through buttons and prepared answers. If you need it to answer in its own words from your knowledge base, look at the AI assistant for Telegram.',
        },
      },
      {
        q: {
          ru: 'Как поменять текст ответа?',
          kk: 'Жауап мәтінін қалай өзгертуге болады?',
          en: 'How do I change an answer?',
        },
        a: {
          ru: 'Тексты лежат в отдельном файле, и обновить их можно без правки кода. Я покажу, как это делается, при сдаче.',
          kk: 'Мәтіндер бөлек файлда тұрады, оларды кодты түзетпей жаңартуға болады. Мұны қалай істейтінімді тапсыру кезінде көрсетемін.',
          en: 'The texts live in a separate file and can be updated without touching the code. I show how at handover.',
        },
      },
      {
        q: {
          ru: 'Что видит клиент, если ответа нет?',
          kk: 'Жауап болмаса, клиент не көреді?',
          en: 'What does the customer see if there is no answer?',
        },
        a: {
          ru: 'Бот предлагает написать вопрос, пересылает его вам и сообщает клиенту, что ответ придёт в рабочее время. Так обращение не теряется.',
          kk: 'Бот сұрақты жазуды ұсынады, оны сізге жібереді және клиентке жауап жұмыс уақытында келетінін хабарлайды. Сонда өтінім жоғалмайды.',
          en: 'The bot invites them to type the question, forwards it to you and tells the customer a reply will come in working hours. That way the enquiry is not lost.',
        },
      },
    ],
    relatedProducts: ['ai-assistent-telegram', 'telegram-bot-zayavki', 'whatsapp-bot'],
  },
  {
    slug: 'telegram-bot-dlya-kursov',
    category: 'bots',
    title: {
      ru: 'Telegram-бот для онлайн-курсов',
      kk: 'Онлайн-курстарға арналған Telegram-бот',
      en: 'Telegram bot for online courses',
    },
    short: {
      ru: 'Бот выдаёт уроки по порядку, проверяет доступ и напоминает ученикам заниматься.',
      kk: 'Бот сабақтарды ретімен береді, қолжетімділікті тексереді және оқушыларға оқуды еске салады.',
      en: 'A bot that delivers lessons in order, checks access and nudges students to keep learning.',
    },
    description: {
      ru: 'Ученик открывает бота и получает урок за уроком в заданном темпе, а не весь курс сразу. Бот помнит, где человек остановился, принимает ответы на задания и напоминает о занятии, если он пропал. Вы видите прогресс группы и отправляете студентам объявления.',
      kk: 'Оқушы ботты ашып, бүкіл курсты емес, сабақты бірінен соң бірін белгіленген қарқынмен алады. Бот адамның қай жерде тоқтағанын есіне сақтайды, тапсырмалардың жауабын қабылдайды және ол жоғалып кетсе, сабақ туралы еске салады. Сіз топтың үлгерімін көресіз және студенттерге хабарландыру жібересіз.',
      en: 'A student opens the bot and gets lesson after lesson at a set pace, not the whole course at once. The bot remembers where the person stopped, accepts answers to assignments and nudges them if they go quiet. You see the group progress and send announcements to students.',
    },
    priceFrom: 45000,
    unit: 'once',
    days: { min: 7, max: 12 },
    includes: {
      ru: [
        'Структура курса: модули и уроки с текстом, видео- или файловыми материалами',
        'Открытие уроков по порядку или по расписанию',
        'Список учеников с кодом доступа или ручным допуском от вас',
        'Приём ответов на задания текстом или файлом с пересылкой вам',
        'Напоминания тем, кто давно не заходил',
        'Простая панель для вас: кто на каком уроке и кто прошёл курс',
        'Объявления ученикам из бота одной командой',
      ],
      kk: [
        'Курс құрылымы: мәтіні, бейне немесе файл материалдары бар модульдер мен сабақтар',
        'Сабақтарды ретімен немесе кесте бойынша ашу',
        'Қолжетімділік коды бар немесе сіз қолмен жіберетін оқушылар тізімі',
        'Тапсырма жауаптарын мәтінмен немесе файлмен қабылдап, сізге жіберу',
        'Ұзақ кірмегендерге еске салу',
        'Сізге арналған қарапайым панель: кім қай сабақта және кім курсты аяқтады',
        'Бот арқылы оқушыларға бір командамен хабарландыру',
      ],
      en: [
        'Course structure with modules and lessons made of text, video or file materials',
        'Unlocking lessons in order or on a schedule',
        'A student list with an access code or manual approval from you',
        'Receiving assignment answers as text or a file, forwarded to you',
        'Reminders for students who have not logged in for a while',
        'A simple panel for you showing who is on which lesson and who finished',
        'Announcements to students from the bot with one command',
      ],
    },
    notIncluded: {
      ru: [
        'Сами материалы курса: тексты, видео и задания готовите вы',
        'Оплата курса внутри бота: подключается отдельно по договорённости через API провайдера',
        'Видеохостинг: файлы лежат на площадке, которую вы выбрали',
      ],
      kk: [
        'Курстың өз материалдары: мәтіндер, бейнелер мен тапсырмаларды өзіңіз дайындайсыз',
        'Бот ішінде курс ақысын төлеу: провайдердің API-і арқылы келісім бойынша бөлек қосылады',
        'Бейне хостинг: файлдар өзіңіз таңдаған алаңда тұрады',
      ],
      en: [
        'The course materials themselves, since you prepare the texts, videos and assignments',
        'Paying for the course inside the bot, which can be added separately through a provider API by agreement',
        'Video hosting, as files live on the platform you choose',
      ],
    },
    forWhom: {
      ru: 'Для авторов курсов, репетиторов, тренеров и школ, которые ведут обучение в Telegram и хотят дать порядок: уроки по расписанию вместо хаоса в общем чате.',
      kk: 'Telegram-да оқытатын және реттілік беруді қалайтын курс авторларына, репетиторларға, жаттықтырушыларға және мектептерге арналған: ортақ чаттағы тәртіпсіздіктің орнына кесте бойынша сабақтар.',
      en: 'For course authors, tutors, trainers and schools that teach in Telegram and want structure, with lessons on a schedule instead of chaos in a shared chat.',
    },
    faq: [
      {
        q: {
          ru: 'Как защитить курс от пересылки?',
          kk: 'Курсты таратудан қалай қорғауға болады?',
          en: 'Can the course be protected from being shared?',
        },
        a: {
          ru: 'Полностью защитить нельзя, но можно включить запрет пересылки и сохранения материалов. Доступ по персональному коду и ручное одобрение отсекают случайных людей.',
          kk: 'Толық қорғау мүмкін емес, бірақ материалдарды жіберу мен сақтауға тыйым қосуға болады. Жеке код бойынша қолжетімділік және қолмен бекіту кездейсоқ адамдарды қалдырмайды.',
          en: 'Full protection is not possible, but forwarding and saving of materials can be switched off in Telegram. Access by personal code and manual approval keep random people out.',
        },
      },
      {
        q: {
          ru: 'Сколько учеников выдержит бот?',
          kk: 'Бот қанша оқушыға шыдайды?',
          en: 'How many students can it handle?',
        },
        a: {
          ru: 'Сотни учеников одной группы бот обслуживает без проблем, это обычная нагрузка. Если планируется несколько тысяч, скажите заранее, и я подберу подходящий сервер.',
          kk: 'Бір топтың жүздеген оқушысына бот қиындықсыз қызмет көрсетеді, бұл әдеттегі жүктеме. Бірнеше мың жоспарланса, алдын ала айтыңыз, сәйкес серверді таңдаймын.',
          en: 'Hundreds of students in a group is a normal load for the bot. If you plan for several thousand, tell me in advance and I will choose a suitable server.',
        },
      },
      {
        q: {
          ru: 'Можно ли выдавать сертификат?',
          kk: 'Сертификат беруге бола ма?',
          en: 'Can it issue a certificate?',
        },
        a: {
          ru: 'Бот может отправить файл-сертификат или картинку после прохождения всех уроков. Макет сертификата готовите вы или заказываете отдельно.',
          kk: 'Бот барлық сабақтан өткеннен кейін сертификат-файлды немесе суретті жібере алады. Сертификат макетін өзіңіз дайындайсыз немесе бөлек тапсырыс бересіз.',
          en: 'The bot can send a certificate file or image once all lessons are completed. You prepare the certificate design or order it separately.',
        },
      },
    ],
    relatedProducts: ['sait-dlya-uchebnogo-centra', 'telegram-bot-rassylka', 'telegram-bot-faq'],
  },
  {
    slug: 'whatsapp-bot',
    category: 'bots',
    title: {
      ru: 'WhatsApp-бот для бизнеса',
      kk: 'Бизнеске арналған WhatsApp-бот',
      en: 'WhatsApp bot for business',
    },
    short: {
      ru: 'Бот на WhatsApp Business Platform: автоответы, меню, сбор заявок и передача вам.',
      kk: 'WhatsApp Business Platform-дағы бот: автожауаптар, мәзір, өтінім жинау және сізге беру.',
      en: 'A bot on the WhatsApp Business Platform with auto-replies, a menu, enquiry capture and handover to you.',
    },
    description: {
      ru: 'WhatsApp — основной мессенджер ваших клиентов, и бот отвечает им там же, где они привыкли писать. Он здоровается, показывает меню, собирает данные заявки и передаёт диалог вам. Работает через WhatsApp Business Platform (Cloud API) от Meta или через провайдера, и у этой платформы свои правила и тарифы.',
      kk: 'WhatsApp — клиенттеріңіздің негізгі мессенджері, ал бот оларға әдетте жазатын жерінде жауап береді. Ол сәлем береді, мәзірді көрсетеді, өтінім деректерін жинайды және диалогты сізге береді. Ол Meta-ның WhatsApp Business Platform (Cloud API) платформасы немесе провайдер арқылы жұмыс істейді, бұл платформаның өз ережелері мен тарифтері бар.',
      en: 'WhatsApp is where most of your customers are, and the bot replies in the place they already use to write. It greets them, shows a menu, collects the enquiry details and hands the chat over to you. It runs on the WhatsApp Business Platform (Cloud API) from Meta or through a provider, and that platform has its own rules and pricing.',
    },
    priceFrom: 40000,
    unit: 'once',
    days: { min: 5, max: 10 },
    includes: {
      ru: [
        'Подключение к WhatsApp Business Platform (Cloud API) напрямую или через провайдера',
        'Приветствие и меню с вариантами ответа кнопками или списком',
        'Сценарий сбора заявки: имя, запрос, удобное время для связи',
        'Автоответ вне рабочих часов с указанием, когда вам ответят',
        'Уведомление вам о новой заявке и передача диалога человеку',
        'Заготовленные ответы на частые вопросы',
      ],
      kk: [
        'WhatsApp Business Platform (Cloud API) платформасына тікелей немесе провайдер арқылы қосу',
        'Сәлемдесу және батырма не тізім түріндегі жауап нұсқалары бар мәзір',
        'Өтінім жинау сценарийі: аты, сұраныс, байланысқа ыңғайлы уақыт',
        'Жұмыс уақытынан тыс сізге қашан жауап беретіні көрсетілген автожауап',
        'Жаңа өтінім туралы сізге хабарлама және диалогты адамға беру',
        'Жиі қойылатын сұрақтарға дайын жауаптар',
      ],
      en: [
        'Connection to the WhatsApp Business Platform (Cloud API), directly or via a provider',
        'Greeting and a menu with answer options as buttons or a list',
        'A flow that collects an enquiry: name, request, preferred contact time',
        'Out-of-hours auto-reply stating when you will answer',
        'Alert to you about each new enquiry and handover of the chat to a person',
        'Prepared replies to frequent questions',
      ],
    },
    notIncluded: {
      ru: [
        'Оплата Meta или провайдера: платформа берёт плату за сообщения по своим тарифам, это отдельно',
        'Верификация бизнес-аккаунта и номера: проходится по правилам Meta, нужен отдельный номер',
        'Рассылки по чужим базам: правила WhatsApp запрещают писать без согласия получателя',
      ],
      kk: [
        'Meta немесе провайдер төлемі: платформа хабарламаға өз тарифтері бойынша ақы алады, бұл бөлек',
        'Бизнес-аккаунт пен нөмірді верификациялау: Meta ережелері бойынша өтеді, бөлек нөмір қажет',
        'Бөтен базалар бойынша тарату: WhatsApp ережелері алушының келісімінсіз жазуға тыйым салады',
      ],
      en: [
        'Fees to Meta or the provider, as the platform charges for messages under its own pricing, separately',
        'Business account and number verification, done under Meta rules and needing a dedicated number',
        'Mass messaging to lists you did not collect, because WhatsApp rules forbid writing without the recipient consent',
      ],
    },
    forWhom: {
      ru: 'Для компаний, чьи клиенты пишут преимущественно в WhatsApp, и ответы на первые вопросы можно автоматизировать. Если заказов немного, возможно, достаточно каталога с кнопкой заказа в WhatsApp.',
      kk: 'Клиенттері негізінен WhatsApp-қа жазатын және алғашқы сұрақтарға жауапты автоматтандыруға болатын компанияларға арналған. Тапсырыс аз болса, WhatsApp-қа тапсырыс батырмасы бар каталог жеткілікті болуы мүмкін.',
      en: 'For companies whose customers mostly write on WhatsApp and where the first answers can be automated. If orders are few, a catalog with a WhatsApp order button may be enough.',
    },
    faq: [
      {
        q: {
          ru: 'Подойдёт ли мой обычный номер WhatsApp?',
          kk: 'Менің қарапайым WhatsApp нөмірім жарай ма?',
          en: 'Can I use my regular WhatsApp number?',
        },
        a: {
          ru: 'Для Cloud API нужен номер, не привязанный к обычному приложению WhatsApp, поэтому чаще берут отдельную SIM-карту. Это требование платформы, а не моё решение.',
          kk: 'Cloud API үшін қарапайым WhatsApp қолданбасына байланбаған нөмір қажет, сондықтан жиі бөлек SIM-карта алады. Бұл платформаның талабы, менің шешімім емес.',
          en: 'The Cloud API needs a number that is not tied to the ordinary WhatsApp app, so people often take a separate SIM card. That is a platform requirement, not my decision.',
        },
      },
      {
        q: {
          ru: 'Сколько стоят сообщения бота?',
          kk: 'Боттың хабарламалары қанша тұрады?',
          en: 'How much do the bot messages cost?',
        },
        a: {
          ru: 'Цена в списке относится только к моей работе. Meta или провайдер взимают плату за разговоры по актуальным тарифам, и я помогу прикинуть расходы под ваш объём.',
          kk: 'Тізімдегі баға тек менің жұмысыма қатысты. Meta немесе провайдер әңгімелер үшін өзекті тарифтер бойынша ақы алады, сіздің көлеміңізге шығынды бағалауға көмектесемін.',
          en: 'The listed price covers only my work. Meta or the provider charges for conversations under their current pricing, and I will help estimate the cost for your volume.',
        },
      },
      {
        q: {
          ru: 'Чем отличается от Telegram-бота?',
          kk: 'Telegram-боттан несімен ерекшеленеді?',
          en: 'How does it differ from a Telegram bot?',
        },
        a: {
          ru: 'У WhatsApp строже правила и есть плата за сообщения, а также ограничение на первые сообщения клиенту вне 24-часового окна. Зато там почти все ваши клиенты, а в Telegram бот проще и дешевле в работе.',
          kk: 'WhatsApp-та ережелер қатаңырақ, хабарламаға ақы бар, сондай-ақ 24 сағаттық терезеден тыс клиентке бірінші хабарлама жіберуге шектеу бар. Бірақ онда клиенттеріңіздің басым бөлігі отыр, ал Telegram-да бот қарапайымырақ әрі арзанырақ.',
          en: 'WhatsApp has stricter rules, a per-message fee and limits on first messages to a customer outside the 24-hour window. But most of your customers are there, while a Telegram bot is simpler and cheaper to run.',
        },
      },
    ],
    relatedProducts: ['ai-assistent-whatsapp', 'katalog-s-zakazom-v-whatsapp', 'telegram-bot-faq'],
  },
];
