export default [
  {
    slug: 'ai-assistent-telegram',
    category: 'ai',
    title: {
      ru: 'ИИ-ассистент в Telegram для ответов клиентам',
      kk: 'Клиенттерге жауап беретін Telegram ИИ-көмекшісі',
      en: 'AI assistant in Telegram that answers your customers',
    },
    short: {
      ru: 'Бот на базе нейросети отвечает клиентам по вашей базе знаний и передаёт сложные вопросы вам.',
      kk: 'Нейрожелі негізіндегі бот клиенттерге білім қоры бойынша жауап беріп, күрделі сұрақтарды сізге жібереді.',
      en: 'A neural-network bot answers customers from your knowledge base and hands tricky questions to you.',
    },
    description: {
      ru: 'Ассистент работает в Telegram, в том числе в Telegram Business, и отвечает на типовые вопросы о ценах, графике, условиях и адресе. Он опирается на материалы, которые вы мне передаёте, и помнит контекст диалога. Такой проект уже работает у меня в портфолио: Python, aiogram и модель DeepSeek, с админ-панелью и автопаузой на 60 минут, когда вам отвечает живой человек.',
      kk: 'Көмекші Telegram-да, соның ішінде Telegram Business-те жұмыс істеп, баға, жұмыс кестесі, шарт және мекенжай туралы жиі қойылатын сұрақтарға жауап береді. Ол сіз берген материалдарға сүйеніп, диалог мәнмәтінін есте сақтайды. Осындай жоба портфолиомда бар: Python, aiogram және DeepSeek моделі, әкімші панелі және иесі өзі жауап бергенде 60 минутқа автоматты кідіріс.',
      en: 'The assistant works in Telegram, including Telegram Business, and answers routine questions about prices, opening hours, terms and address. It relies on the material you give me and remembers the context of each conversation. A project like this is already in my portfolio: Python, aiogram and the DeepSeek model, with an admin panel and a 60-minute auto-pause when the owner replies personally.',
    },
    priceFrom: 60000,
    unit: 'once',
    days: { min: 7, max: 14 },
    includes: {
      ru: [
        'Бот на Python и aiogram, подключённый к вашему аккаунту или Telegram Business',
        'Подключение языковой модели (например, DeepSeek) и настройка тона ответов',
        'Загрузка вашей базы знаний: прайс, условия, адрес, частые вопросы',
        'Память диалога, чтобы бот не переспрашивал одно и то же',
        'Автопауза на 60 минут, когда вы сами отвечаете клиенту',
        'Простая админ-панель для правки базы знаний',
        'Тестирование на реальных вопросах и инструкция по запуску',
      ],
      kk: [
        'Python мен aiogram-да жазылған, сіздің аккаунтыңызға немесе Telegram Business-ке қосылған бот',
        'Тілдік модельді (мысалы, DeepSeek) қосу және жауап мәнерін баптау',
        'Білім қорын жүктеу: прайс, шарттар, мекенжай, жиі қойылатын сұрақтар',
        'Бот бір нәрсені қайта сұрамауы үшін диалог жады',
        'Клиентке өзіңіз жауап бергенде 60 минутқа автоматты кідіріс',
        'Білім қорын түзетуге арналған қарапайым әкімші панелі',
        'Нақты сұрақтармен сынау және іске қосу нұсқаулығы',
      ],
      en: [
        'A bot written in Python and aiogram, connected to your account or Telegram Business',
        'Language model integration (for example DeepSeek) and tuning of the reply tone',
        'Loading your knowledge base: price list, terms, address, common questions',
        'Dialog memory so the bot does not ask the same thing twice',
        'A 60-minute auto-pause whenever you reply to a customer yourself',
        'A simple admin panel for editing the knowledge base',
        'Testing on real questions and a launch guide',
      ],
    },
    notIncluded: {
      ru: [
        'Оплата запросов к модели: её API оплачиваете вы по факту использования',
        'Написание базы знаний с нуля: материалы по вашему бизнесу должны быть от вас',
        'Гарантия безошибочных ответов: нейросеть может ошибаться, поэтому сложные вопросы лучше передавать человеку',
      ],
      kk: [
        'Модельге жасалатын сұраулардың төлемі: оның API-ін қолданысқа қарай өзіңіз төлейсіз',
        'Білім қорын нөлден жазу: бизнесіңіз туралы материал сізден болуы керек',
        'Қатесіз жауап кепілдігі: нейрожелі қателесуі мүмкін, сондықтан күрделі сұрақтарды адамға жіберген дұрыс',
      ],
      en: [
        'Model usage fees: you pay the model API directly, based on actual use',
        'Writing the knowledge base from scratch: the material about your business has to come from you',
        'A guarantee of flawless answers: a neural network can make mistakes, so hard questions are best handed to a person',
      ],
    },
    forWhom: {
      ru: 'Для салонов, клиник, учебных центров и магазинов, где в личные сообщения приходят одни и те же вопросы. Подойдёт, если вы не успеваете отвечать вечером и в выходные.',
      kk: 'Жеке хабарламаларға бірдей сұрақтар түсетін салондарға, клиникаларға, оқу орталықтары мен дүкендерге арналған. Кешке және демалыс күндері жауап беруге үлгермесеңіз, қолайлы.',
      en: 'For salons, clinics, training centres and shops that get the same questions in private messages. It fits if you cannot keep up with replies in the evening and on weekends.',
    },
    faq: [
      {
        q: {
          ru: 'Что будет, если бот не знает ответа?',
          kk: 'Бот жауабын білмесе не болады?',
          en: 'What happens if the bot does not know the answer?',
        },
        a: {
          ru: 'Я настраиваю его так, чтобы он честно сообщал, что уточнит вопрос, и передавал диалог вам. Придумывать цены и условия, которых нет в базе знаний, ему запрещено инструкцией, но полностью исключить ошибки нельзя.',
          kk: 'Мен оны жауабын білмесе, мәселені нақтылайтынын ашық айтып, диалогты сізге беретіндей етіп баптаймын. Білім қорында жоқ баға мен шартты ойдан шығаруға нұсқаумен тыйым салынады, бірақ қателерді толық жоққа шығару мүмкін емес.',
          en: 'I set it up to say openly that it will check and to pass the conversation to you. The instructions forbid inventing prices or terms that are not in the knowledge base, though errors cannot be ruled out completely.',
        },
      },
      {
        q: {
          ru: 'Можно ли самому отвечать клиенту, когда бот включён?',
          kk: 'Бот қосулы тұрғанда клиентке өзім жауап бере аламын ба?',
          en: 'Can I still reply to a customer myself while the bot is on?',
        },
        a: {
          ru: 'Да. Как только вы пишете клиенту сами, бот замолкает в этом диалоге на 60 минут, чтобы вы не мешали друг другу. Потом он снова готов отвечать.',
          kk: 'Иә. Клиентке өзіңіз жазысымен, бот сол диалогта 60 минутқа тоқтайды, сонда сіздер бір-біріңізге кедергі болмайсыздар. Содан кейін ол қайтадан жауап беруге дайын.',
          en: 'Yes. As soon as you write to a customer yourself, the bot stays silent in that dialog for 60 minutes so you do not talk over each other. After that it is ready to answer again.',
        },
      },
      {
        q: {
          ru: 'Сколько стоит работа модели после запуска?',
          kk: 'Іске қосқаннан кейін модельдің жұмысы қанша тұрады?',
          en: 'How much does the model cost after launch?',
        },
        a: {
          ru: 'Это зависит от числа сообщений и выбранной модели. Для небольшого бизнеса расходы на API обычно невелики, точную оценку я дам после теста на ваших вопросах.',
          kk: 'Бұл хабарлама санына және таңдалған модельге байланысты. Шағын бизнеске API шығыны әдетте көп емес, нақты бағаны сіздің сұрақтарыңызбен сынағаннан кейін айтамын.',
          en: 'It depends on the number of messages and the model you pick. For a small business the API cost is usually modest, and I will give a concrete estimate after testing on your own questions.',
        },
      },
    ],
    relatedProducts: ['ai-assistent-whatsapp', 'telegram-bot-faq', 'ai-baza-znanii-dlya-sotrudnikov'],
  },
  {
    slug: 'ai-assistent-whatsapp',
    category: 'ai',
    title: {
      ru: 'ИИ-ассистент в WhatsApp для бизнеса',
      kk: 'Бизнеске арналған WhatsApp ИИ-көмекшісі',
      en: 'AI assistant in WhatsApp for business',
    },
    short: {
      ru: 'Автоматические ответы клиентам в WhatsApp на основе вашей базы знаний, с передачей диалога человеку.',
      kk: 'WhatsApp-та клиенттерге білім қоры негізінде автоматты жауап беріп, диалогты адамға береді.',
      en: 'Automatic WhatsApp replies to customers based on your knowledge base, with a handoff to a person.',
    },
    description: {
      ru: 'В Казахстане многие клиенты пишут именно в WhatsApp, и ассистент берёт на себя первые ответы: цены, адрес, график, наличие. Он работает через WhatsApp Business API и языковую модель, а сложные случаи пересылает вам. Логику памяти и паузы я переношу из своего Telegram-проекта, так что подход проверен на практике.',
      kk: 'Қазақстанда көп клиент дәл WhatsApp-қа жазады, ал көмекші алғашқы жауаптарды өз мойнына алады: баға, мекенжай, кесте, қолда бар-жоғы. Ол WhatsApp Business API мен тілдік модель арқылы жұмыс істейді, күрделі жағдайларды сізге жібереді. Жады мен кідіріс логикасын өзімнің Telegram жобамнан көшіремін, сондықтан тәсіл тәжірибеде сыналған.',
      en: 'Many customers in Kazakhstan write on WhatsApp first, and the assistant takes over the opening replies: prices, address, hours, availability. It runs through the WhatsApp Business API and a language model, and passes complicated cases to you. I reuse the memory and pause logic from my own Telegram project, so the approach has been tried in practice.',
    },
    priceFrom: 80000,
    unit: 'once',
    days: { min: 10, max: 15 },
    includes: {
      ru: [
        'Подключение номера к WhatsApp Business API через выбранного провайдера',
        'Серверная часть на Python, принимающая и отправляющая сообщения',
        'Интеграция с языковой моделью и настройка стиля ответов на русском и казахском',
        'База знаний из ваших материалов и память диалога',
        'Передача разговора вам и пауза, пока отвечает человек',
        'Уведомление в Telegram, когда клиенту нужен живой ответ',
        'Тесты на реальных вопросах и краткая инструкция',
      ],
      kk: [
        'Нөмірді таңдалған провайдер арқылы WhatsApp Business API-ге қосу',
        'Хабарламаларды қабылдап, жіберетін Python серверлік бөлігі',
        'Тілдік модельді қосу және жауап мәнерін орыс, қазақ тілдерінде баптау',
        'Сіздің материалдарыңыздан құралған білім қоры және диалог жады',
        'Диалогты сізге беру және адам жауап беріп жатқанда кідіріс',
        'Клиентке тірі жауап керек болғанда Telegram-ға хабарлама',
        'Нақты сұрақтармен сынау және қысқа нұсқаулық',
      ],
      en: [
        'Connecting your number to the WhatsApp Business API through a chosen provider',
        'A Python back end that receives and sends messages',
        'Language model integration, with reply style tuned for Russian and Kazakh',
        'A knowledge base built from your material, plus dialog memory',
        'Handoff to you and a pause while a person is replying',
        'A Telegram alert when a customer needs a human answer',
        'Testing on real questions and a short guide',
      ],
    },
    notIncluded: {
      ru: [
        'Плата провайдера WhatsApp Business API и тарифы Meta за диалоги: их вносите вы',
        'Оплата запросов к языковой модели по факту использования',
        'Одобрение номера и шаблонов сообщений: это решают Meta и провайдер, срок я не контролирую',
      ],
      kk: [
        'WhatsApp Business API провайдерінің төлемі мен Meta-ның диалог тарифтері: оларды өзіңіз төлейсіз',
        'Тілдік модельге сұраулардың қолданысқа қарай төлемі',
        'Нөмір мен хабарлама үлгілерін бекіту: мұны Meta мен провайдер шешеді, мерзімін бақыламаймын',
      ],
      en: [
        'The WhatsApp Business API provider fee and Meta conversation charges, which you pay',
        'Language model usage fees, billed by actual use',
        'Approval of your number and message templates, which Meta and the provider decide, so I cannot control the timing',
      ],
    },
    forWhom: {
      ru: 'Для компаний, у которых основной канал связи с клиентами WhatsApp, а заявок и вопросов много. Подойдёт магазинам, студиям, клиникам и сервисным компаниям.',
      kk: 'Клиентпен негізгі байланыс арнасы WhatsApp болатын, өтінім мен сұрақ көп компанияларға арналған. Дүкендерге, студияларға, клиникаларға және қызмет көрсету компанияларына қолайлы.',
      en: 'For companies whose main contact channel is WhatsApp and that receive many requests. It suits shops, studios, clinics and service businesses.',
    },
    faq: [
      {
        q: {
          ru: 'Можно ли подключить мой обычный номер WhatsApp?',
          kk: 'Қарапайым WhatsApp нөмірімді қосуға бола ма?',
          en: 'Can I connect my regular WhatsApp number?',
        },
        a: {
          ru: 'Для автоматических ответов нужен номер, подключённый к WhatsApp Business API, и обычный личный аккаунт одновременно в приложении использовать нельзя. Я подскажу, как перенести номер или взять отдельный.',
          kk: 'Автоматты жауап үшін WhatsApp Business API-ге қосылған нөмір керек, ал қарапайым жеке аккаунтты қосымшада бір мезгілде қолдануға болмайды. Нөмірді қалай көшіруге немесе бөлек нөмір алуға болатынын айтып беремін.',
          en: 'Automatic replies need a number connected to the WhatsApp Business API, and a regular personal account cannot be used in the app at the same time. I will advise how to move the number or use a separate one.',
        },
      },
      {
        q: {
          ru: 'Ассистент отвечает на казахском?',
          kk: 'Көмекші қазақша жауап береді ме?',
          en: 'Does the assistant reply in Kazakh?',
        },
        a: {
          ru: 'Да, он отвечает на языке клиента, включая русский и казахский. Качество казахского зависит от модели, поэтому я проверяю ответы на ваших примерах и при необходимости уточняю инструкции.',
          kk: 'Иә, ол клиент тілінде, соның ішінде орыс және қазақ тілдерінде жауап береді. Қазақша сапасы модельге байланысты, сондықтан жауаптарды сіздің мысалдарыңызбен тексеріп, қажет болса нұсқауларды нақтылаймын.',
          en: 'Yes, it answers in the customer language, including Russian and Kazakh. The quality of Kazakh depends on the model, so I check replies against your examples and refine the instructions where needed.',
        },
      },
      {
        q: {
          ru: 'Как быстро можно начать?',
          kk: 'Қаншалықты жылдам бастауға болады?',
          en: 'How quickly can it start?',
        },
        a: {
          ru: 'Разработка занимает 10-15 рабочих дней. Дольше может пойти подключение номера к API: сроки зависят от провайдера и Meta, я заранее предупрежу о возможной задержке.',
          kk: 'Әзірлеу 10-15 жұмыс күнін алады. Нөмірді API-ге қосу ұзақтау болуы мүмкін: мерзім провайдер мен Meta-ға байланысты, мүмкін кешігу туралы алдын ала ескертемін.',
          en: 'Development takes 10-15 working days. Connecting the number to the API can take longer because it depends on the provider and Meta, and I will warn you in advance about any likely delay.',
        },
      },
    ],
    relatedProducts: ['whatsapp-bot', 'ai-assistent-telegram', 'katalog-s-zakazom-v-whatsapp'],
  },
  {
    slug: 'ai-chat-na-sait',
    category: 'ai',
    title: {
      ru: 'ИИ-чат на сайт',
      kk: 'Сайтқа арналған ИИ-чат',
      en: 'AI chat widget for your website',
    },
    short: {
      ru: 'Виджет-чат, который отвечает посетителям сайта по вашим материалам и собирает контакты.',
      kk: 'Сайт келушілеріне сіздің материалдарыңыз бойынша жауап беріп, байланыс деректерін жинайтын чат-виджет.',
      en: 'A chat widget that answers site visitors from your content and collects their contact details.',
    },
    description: {
      ru: 'Небольшое окно чата встраивается в ваш сайт и отвечает посетителям на вопросы об услугах, ценах и сроках. Если человек готов к заказу, чат просит имя и телефон и присылает заявку вам в Telegram. Ответы строятся на текстах, которые вы предоставляете, а не на выдуманных сведениях.',
      kk: 'Шағын чат терезесі сайтыңызға орнатылып, келушілердің қызмет, баға және мерзім туралы сұрақтарына жауап береді. Адам тапсырыс беруге дайын болса, чат есімі мен телефонын сұрап, өтінімді сізге Telegram-ға жібереді. Жауаптар сіз беретін мәтіндерге негізделеді, ойдан шығарылған мәліметке емес.',
      en: 'A small chat window is embedded in your site and answers visitors\' questions about services, prices and lead times. When someone is ready to order, the chat asks for a name and phone number and sends the request to your Telegram. Answers are built on the texts you provide rather than on invented facts.',
    },
    priceFrom: 50000,
    unit: 'once',
    days: { min: 5, max: 10 },
    includes: {
      ru: [
        'Виджет чата, оформленный под цвета вашего сайта',
        'Встраивание в сайт одной вставкой кода или в ваш конструктор',
        'Подключение языковой модели и серверной части',
        'Ответы по материалам сайта и вашему прайсу',
        'Сбор имени и телефона с отправкой заявки в Telegram',
        'Ограничение тем, чтобы чат не уходил в посторонние разговоры',
        'Проверка на телефоне и компьютере',
      ],
      kk: [
        'Сайтыңыздың түсіне сәйкес безендірілген чат виджеті',
        'Сайтқа бір код қыстырмасымен немесе сіздің конструкторға орнату',
        'Тілдік модель мен серверлік бөлікті қосу',
        'Сайт материалдары мен прайс бойынша жауаптар',
        'Аты мен телефонын жинап, өтінімді Telegram-ға жіберу',
        'Чат бөгде әңгімеге кетпеуі үшін тақырыптарды шектеу',
        'Телефон мен компьютерде тексеру',
      ],
      en: [
        'A chat widget styled to match your site colours',
        'Embedding with a single code snippet or in your site builder',
        'Language model and back-end connection',
        'Answers based on your site content and price list',
        'Collecting a name and phone number and sending the request to Telegram',
        'Topic limits so the chat does not drift into unrelated conversation',
        'Checks on phone and desktop',
      ],
    },
    notIncluded: {
      ru: [
        'Оплата запросов к языковой модели: счёт за использование API ваш',
        'Создание самого сайта и его текстов: чату нужны готовые материалы',
        'Гарантия, что нейросеть никогда не ошибётся: поэтому важные условия лучше дублировать на странице',
      ],
      kk: [
        'Тілдік модельге сұраулардың төлемі: API қолданысы үшін шот сіздікі',
        'Сайттың өзін және оның мәтіндерін жасау: чатқа дайын материал керек',
        'Нейрожелі ешқашан қателеспейді деген кепіл: сондықтан маңызды шарттарды бетте қайталаған жөн',
      ],
      en: [
        'Language model usage fees: the API bill is yours',
        'Building the website itself or writing its texts, since the chat needs ready material',
        'A promise that the network will never be wrong, which is why key terms should also be stated on the page',
      ],
    },
    forWhom: {
      ru: 'Для владельцев сайтов с трафиком, где посетители уходят, не найдя ответ на свой вопрос. Подойдёт услугам, интернет-магазинам и учебным центрам.',
      kk: 'Келушілер сұрағына жауап таппай кетіп қалатын, трафигі бар сайт иелеріне арналған. Қызмет саласына, интернет-дүкендерге және оқу орталықтарына қолайлы.',
      en: 'For site owners whose visitors leave without finding an answer. It fits service businesses, online shops and training centres.',
    },
    faq: [
      {
        q: {
          ru: 'На какой сайт можно поставить чат?',
          kk: 'Чатты қандай сайтқа орнатуға болады?',
          en: 'What kind of site can the chat be added to?',
        },
        a: {
          ru: 'На любой, где можно вставить фрагмент кода: свой сайт, Tilda, WordPress и многие другие. Если вставка кода недоступна, я подскажу обходной путь.',
          kk: 'Код үзіндісін қыстыруға болатын кез келген сайтқа: өз сайтыңызға, Tilda-ға, WordPress-ке және басқаларға. Код қыстыру мүмкін болмаса, айналма жолын айтамын.',
          en: 'Any site where you can paste a code snippet: a custom site, Tilda, WordPress and many others. If code insertion is not available, I will suggest a workaround.',
        },
      },
      {
        q: {
          ru: 'Чат заменит форму заявки?',
          kk: 'Чат өтінім формасын алмастыра ма?',
          en: 'Will the chat replace the contact form?',
        },
        a: {
          ru: 'Лучше оставить обе возможности: форма удобна тем, кто хочет написать сразу, а чат помогает тем, кто сомневается. Заявки из чата приходят вам в Telegram.',
          kk: 'Екеуін де қалдырған дұрыс: форма бірден жазғысы келетіндерге ыңғайлы, ал чат күмәнданатындарға көмектеседі. Чаттан түскен өтінімдер сізге Telegram-ға келеді.',
          en: 'It is better to keep both: the form suits people who want to write straight away, while the chat helps those who are unsure. Requests from the chat arrive in your Telegram.',
        },
      },
      {
        q: {
          ru: 'Будут ли данные посетителей храниться у вас?',
          kk: 'Келушілердің деректері сізде сақтала ма?',
          en: 'Will you store my visitors\' data?',
        },
        a: {
          ru: 'Серверная часть работает на вашем аккаунте хостинга или сервера, переписка уходит только в вашу Telegram-группу. Я не веду собственную базу посетителей.',
          kk: 'Серверлік бөлік сіздің хостинг немесе сервер аккаунтыңызда жұмыс істейді, хат алмасу тек сіздің Telegram тобыңызға түседі. Мен келушілердің өз базамды жүргізбеймін.',
          en: 'The back end runs under your own hosting or server account, and conversations go only to your Telegram group. I do not keep a visitor database of my own.',
        },
      },
    ],
    relatedProducts: ['lending', 'ai-assistent-telegram', 'uvedomleniya-o-zayavkah'],
  },
  {
    slug: 'ai-baza-znanii-dlya-sotrudnikov',
    category: 'ai',
    title: {
      ru: 'ИИ-база знаний для сотрудников',
      kk: 'Қызметкерлерге арналған ИИ білім қоры',
      en: 'AI knowledge base for your staff',
    },
    short: {
      ru: 'Внутренний бот, который отвечает сотрудникам по регламентам, инструкциям и документам компании.',
      kk: 'Қызметкерлерге компанияның регламенттері, нұсқаулықтары мен құжаттары бойынша жауап беретін ішкі бот.',
      en: 'An internal bot that answers staff questions from company rules, instructions and documents.',
    },
    description: {
      ru: 'Новички и действующие сотрудники задают одни и те же вопросы: как оформить возврат, где лежит шаблон, какой порядок действий. Я собираю ваши документы в поисковую базу и подключаю бота, который отвечает по ним и показывает, из какого документа взят ответ. Так руководителю не приходится повторять одно и то же.',
      kk: 'Жаңа және қазіргі қызметкерлер бірдей сұрақ қояды: қайтарымды қалай рәсімдеу, үлгі қайда жатыр, әрекет тәртібі қандай. Мен құжаттарыңызды іздеу қорына жинап, солар бойынша жауап беретін және жауап қай құжаттан алынғанын көрсететін ботты қосамын. Сонда басшыға бір нәрсені қайталай беру керек болмайды.',
      en: 'New and current employees keep asking the same things: how to process a return, where a template is stored, what the procedure is. I turn your documents into a searchable base and connect a bot that answers from them and shows which document an answer came from. That spares the manager from repeating the same explanations.',
    },
    priceFrom: 90000,
    unit: 'once',
    days: { min: 10, max: 20 },
    includes: {
      ru: [
        'Разбор и подготовка ваших документов: регламенты, инструкции, FAQ',
        'Поисковая база, по которой бот находит нужные фрагменты',
        'Бот в Telegram или веб-страница с чатом для сотрудников',
        'Ссылка на исходный документ в каждом ответе',
        'Доступ только для вашей команды по списку участников',
        'Простой способ обновлять документы без моего участия',
        'Обучающая встреча и краткая инструкция для администратора',
      ],
      kk: [
        'Құжаттарыңызды талдау және дайындау: регламенттер, нұсқаулықтар, жиі қойылатын сұрақтар',
        'Бот қажетті үзінділерді табатын іздеу қоры',
        'Қызметкерлерге арналған Telegram-дағы бот немесе чаты бар веб-бет',
        'Әр жауапта бастапқы құжатқа сілтеме',
        'Қатысушылар тізімі бойынша тек сіздің командаңызға қолжетімділік',
        'Құжаттарды менің қатысуымсыз жаңартудың қарапайым тәсілі',
        'Оқыту кездесуі және әкімшіге арналған қысқа нұсқаулық',
      ],
      en: [
        'Review and preparation of your documents: rules, instructions, FAQ',
        'A search index the bot uses to find the right passages',
        'A Telegram bot or a web page with a chat for employees',
        'A link to the source document in every answer',
        'Access limited to your team through a member list',
        'A simple way to update documents without my involvement',
        'A walkthrough session and a short guide for the administrator',
      ],
    },
    notIncluded: {
      ru: [
        'Написание регламентов и инструкций: я работаю с тем, что у вас уже есть',
        'Оплата запросов к языковой модели, которую вы платите по использованию',
        'Гарантия точности: ИИ может ошибиться, поэтому юридически и финансово значимые решения стоит сверять с документом',
      ],
      kk: [
        'Регламенттер мен нұсқаулықтарды жазу: мен сізде бар материалмен жұмыс істеймін',
        'Тілдік модельге сұраулардың қолданысқа қарай төлемі',
        'Дәлдік кепілі: ИИ қателесуі мүмкін, сондықтан заңдық және қаржылық маңызды шешімдерді құжатпен салыстырған жөн',
      ],
      en: [
        'Writing the rules and instructions: I work with what you already have',
        'Language model usage fees, which you pay based on use',
        'A guarantee of accuracy: AI can be wrong, so legally or financially significant decisions should be checked against the source document',
      ],
    },
    forWhom: {
      ru: 'Для команд от 5 человек с накопленными инструкциями, где руководитель тратит время на повторяющиеся вопросы. Подходит магазинам, колл-центрам и сервисным компаниям.',
      kk: 'Жиналған нұсқаулықтары бар, басшы қайталанатын сұрақтарға уақыт жұмсайтын 5 адамнан басталатын командаларға арналған. Дүкендерге, колл-орталықтарға және қызмет көрсету компанияларына қолайлы.',
      en: 'For teams of five or more with accumulated instructions, where the manager spends time on repeated questions. It suits shops, call centres and service companies.',
    },
    faq: [
      {
        q: {
          ru: 'В каком виде нужны документы?',
          kk: 'Құжаттар қандай түрде керек?',
          en: 'In what format do you need the documents?',
        },
        a: {
          ru: 'Подойдут Word, PDF, Google Docs и обычные текстовые заметки. Если документы только на бумаге, их придётся сначала сфотографировать или отсканировать.',
          kk: 'Word, PDF, Google Docs және қарапайым мәтіндік жазбалар жарайды. Құжаттар тек қағазда болса, алдымен суретке түсіру немесе сканерлеу керек.',
          en: 'Word, PDF, Google Docs and plain text notes all work. If documents exist only on paper, they will first need to be photographed or scanned.',
        },
      },
      {
        q: {
          ru: 'Конфиденциальные документы будут в безопасности?',
          kk: 'Құпия құжаттар қауіпсіз бола ма?',
          en: 'Will confidential documents be safe?',
        },
        a: {
          ru: 'Бот работает только для списка ваших сотрудников. Но тексты для ответа передаются выбранной языковой модели, поэтому для действительно закрытых данных мы обсудим вариант с моделью на вашем сервере.',
          kk: 'Бот тек сіздің қызметкерлер тізіміне жұмыс істейді. Бірақ жауап үшін мәтіндер таңдалған тілдік модельге беріледі, сондықтан шынымен жабық деректер үшін модель сіздің серверде тұратын нұсқаны талқылаймыз.',
          en: 'The bot works only for your employee list. However, the texts needed for an answer are passed to the chosen language model, so for truly restricted data we will discuss running a model on your own server.',
        },
      },
      {
        q: {
          ru: 'Что делать, когда документы меняются?',
          kk: 'Құжаттар өзгергенде не істеу керек?',
          en: 'What do we do when documents change?',
        },
        a: {
          ru: 'Новую версию файла вы загружаете в общую папку, и база обновляется. Я покажу порядок на обучающей встрече, чтобы вы не зависели от меня.',
          kk: 'Файлдың жаңа нұсқасын ортақ папкаға жүктейсіз, сонда қор жаңарады. Менен тәуелді болмауыңыз үшін тәртібін оқыту кездесуінде көрсетемін.',
          en: 'You upload the new file version to a shared folder and the base updates. I will show the procedure at the walkthrough so you do not depend on me.',
        },
      },
    ],
    relatedProducts: ['ai-assistent-telegram', 'otchety-v-telegram', 'crm-dlya-malogo-biznesa'],
  },
  {
    slug: 'ai-opisaniya-tovarov',
    category: 'ai',
    title: {
      ru: 'ИИ-описания товаров для каталога',
      kk: 'Каталогқа арналған ИИ тауар сипаттамалары',
      en: 'AI-generated product descriptions for your catalog',
    },
    short: {
      ru: 'Пакетная генерация и ручная проверка описаний товаров по вашей таблице характеристик.',
      kk: 'Сіздің сипаттама кестеңіз бойынша тауар сипаттамаларын топтап жасау және қолмен тексеру.',
      en: 'Bulk generation and manual review of product descriptions from your attribute spreadsheet.',
    },
    description: {
      ru: 'Вы присылаете таблицу с названиями и характеристиками, а я готовлю для каждого товара связное описание в едином стиле. Результат проверяю вручную на выборке и правлю явные ошибки. Готовые тексты возвращаются в таблице, откуда их легко загрузить в магазин или на Kaspi.',
      kk: 'Сіз атаулары мен сипаттамалары бар кестені жібересіз, ал мен әр тауарға бір стильде байланысты сипаттама дайындаймын. Нәтижені үлгі бойынша қолмен тексеріп, айқын қателерін түзетемін. Дайын мәтіндер кестеде қайтарылады, одан оларды дүкенге немесе Kaspi-ге оңай жүктеуге болады.',
      en: 'You send a table of names and attributes, and I prepare a coherent description for each product in one consistent style. I check a sample by hand and correct obvious errors. The finished texts come back in a spreadsheet, from which they are easy to upload to your shop or to Kaspi.',
    },
    priceFrom: 30000,
    unit: 'once',
    days: { min: 3, max: 7 },
    includes: {
      ru: [
        'Описания для пакета товаров, объём согласуем заранее',
        'Единый стиль и тон, подобранные под ваш магазин',
        'Тексты на русском, по желанию на казахском',
        'Использование только тех характеристик, что есть в вашей таблице',
        'Ручная проверка выборки и правка ошибок',
        'Готовый файл в формате таблицы для загрузки в магазин',
        'Короткие SEO-заголовки к карточкам по запросу',
      ],
      kk: [
        'Тауарлар пакетіне сипаттамалар, көлемін алдын ала келісеміз',
        'Дүкеніңізге бейімделген бірыңғай стиль мен мәнер',
        'Орыс тілінде, қалау бойынша қазақ тілінде мәтіндер',
        'Тек сіздің кестеңізде бар сипаттамаларды пайдалану',
        'Үлгіні қолмен тексеру және қателерді түзету',
        'Дүкенге жүктеуге арналған кесте форматындағы дайын файл',
        'Сұраныс бойынша карточкаларға қысқа SEO-тақырыптар',
      ],
      en: [
        'Descriptions for a batch of products, with the volume agreed in advance',
        'One consistent style and tone chosen to suit your shop',
        'Texts in Russian and, if you wish, in Kazakh',
        'Use of only the attributes that appear in your table',
        'Manual check of a sample and correction of errors',
        'A ready spreadsheet file for uploading to your shop',
        'Short SEO titles for the product cards on request',
      ],
    },
    notIncluded: {
      ru: [
        'Фотографии товаров и их обработка',
        'Проверка каждого описания вручную: проверяется выборка, а полный просмотр остаётся за вами',
        'Загрузка в магазин или на Kaspi, а также гарантия роста продаж или позиций в поиске',
      ],
      kk: [
        'Тауар суреттері және оларды өңдеу',
        'Әр сипаттаманы қолмен тексеру: үлгі тексеріледі, толық қарау сізде қалады',
        'Дүкенге немесе Kaspi-ге жүктеу, сондай-ақ сатылым мен іздеудегі орын өседі деген кепіл',
      ],
      en: [
        'Product photography and photo editing',
        'Manual review of every single description: a sample is checked, and a full read-through stays with you',
        'Uploading to your shop or to Kaspi, and any promise of higher sales or search positions',
      ],
    },
    forWhom: {
      ru: 'Для магазинов с десятками и сотнями позиций, у которых карточки пустые или состоят из одного названия. Подходит и продавцам на Kaspi.',
      kk: 'Карточкалары бос немесе тек атаудан тұратын, ондаған және жүздеген позициясы бар дүкендерге арналған. Kaspi сатушыларына да қолайлы.',
      en: 'For shops with dozens or hundreds of items whose cards are empty or consist of just a name. Sellers on Kaspi can use it too.',
    },
    faq: [
      {
        q: {
          ru: 'Что нужно прислать для работы?',
          kk: 'Жұмыс үшін не жіберу керек?',
          en: 'What do I need to send?',
        },
        a: {
          ru: 'Таблицу с названием, категорией и всеми известными характеристиками каждого товара. Чем точнее данные, тем точнее описания, потому что нейросеть не должна додумывать факты.',
          kk: 'Әр тауардың атауы, санаты және белгілі барлық сипаттамалары бар кесте. Деректер неғұрлым дәл болса, сипаттамалар соғұрлым дәл, өйткені нейрожелі фактіні ойдан қоспауы керек.',
          en: 'A table with the name, category and every known attribute of each product. The more accurate the data, the more accurate the descriptions, because the network should not guess facts.',
        },
      },
      {
        q: {
          ru: 'Сколько товаров входит в базовую цену?',
          kk: 'Негізгі бағаға қанша тауар кіреді?',
          en: 'How many products does the base price cover?',
        },
        a: {
          ru: 'Базовая цена рассчитана на небольшой пакет. Точный объём и итог я назову после того, как посмотрю вашу таблицу, и дальше цена растёт пропорционально количеству позиций.',
          kk: 'Негізгі баға шағын пакетке есептелген. Нақты көлемі мен соңғы бағаны кестеңізді көргеннен кейін айтамын, одан әрі баға позиция санына қарай пропорционалды өседі.',
          en: 'The base price covers a small batch. I will give the exact volume and final total once I have seen your table, and the price then grows in proportion to the number of items.',
        },
      },
      {
        q: {
          ru: 'Описания не будут одинаковыми у всех товаров?',
          kk: 'Барлық тауардың сипаттамасы бірдей болмай ма?',
          en: 'Will all the descriptions sound the same?',
        },
        a: {
          ru: 'Структура одна, чтобы каталог выглядел единым, но формулировки строятся от характеристик конкретного товара. Если у позиций почти нет отличий, тексты неизбежно получатся близкими, и я скажу об этом заранее.',
          kk: 'Каталог біртұтас көрінуі үшін құрылым біреу, бірақ тұжырымдар нақты тауардың сипаттамаларынан құрылады. Позициялардың айырмасы өте аз болса, мәтіндер міндетті түрде жақын шығады, бұл туралы алдын ала айтамын.',
          en: 'The structure is shared so the catalog looks unified, but the wording is built from the attributes of each item. If items barely differ, the texts will inevitably be close, and I will say so beforehand.',
        },
      },
    ],
    relatedProducts: ['internet-magazin', 'kaspi-xml', 'parsing-dannyh'],
  },
];
