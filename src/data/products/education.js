export default [
  {
    slug: 'repetitor-programmirovaniya',
    category: 'education',
    title: {
      ru: 'Репетитор по программированию для школьников',
      kk: 'Мектеп оқушыларына бағдарламалау репетиторы',
      en: 'Programming tutor for school students',
    },
    short: {
      ru: 'Индивидуальные онлайн-занятия для школьников: логика, основы кода и небольшие проекты в удобном темпе.',
      kk: 'Оқушыларға арналған жеке онлайн-сабақтар: логика, код негіздері және ыңғайлы қарқында шағын жобалар.',
      en: 'One-to-one online lessons for school students: logic, coding basics and small projects at a comfortable pace.',
    },
    description: {
      ru: 'Занятия для учеников примерно с 8 по 11 класс, которые хотят понять, как устроено программирование, или подтянуть школьную информатику. Я студент 3 курса Computer Engineering в IITU, объясняю на примерах и после каждого занятия оставляю небольшое задание. Программу составляем под ребёнка: начинаем с того, что ему интересно, например с игры или бота.',
      kk: 'Бағдарламалаудың қалай құрылғанын түсінгісі келетін немесе мектеп информатикасын жақсартқысы келетін шамамен 8-11 сынып оқушыларына арналған сабақтар. Мен IITU-дың Computer Engineering мамандығының 3-курс студентімін, мысалдармен түсіндіремін және әр сабақтан кейін шағын тапсырма беремін. Бағдарламаны балаға қарай құрамыз: оған қызықты нәрседен, мысалы ойыннан немесе боттан бастаймыз.',
      en: 'Lessons for students from roughly grades 8 to 11 who want to understand how programming works or catch up in school computer science. I am a third-year Computer Engineering student at IITU. I explain through examples and set a small task after every lesson. We build the plan around the student and start with what interests them, such as a small game or a bot.',
    },
    priceFrom: 4000,
    unit: 'lesson',
    days: { min: 1, max: 3 },
    includes: {
      ru: [
        'Индивидуальное занятие по видеосвязи, около часа',
        'Первое знакомство: выясняем уровень и цель ученика',
        'Алгоритмы и логика: условия, циклы, функции',
        'Практика в Python с разбором ошибок на месте',
        'Небольшой проект по интересам: игра, бот или калькулятор',
        'Домашнее задание после занятия и разбор перед следующим',
      ],
      kk: [
        'Бейнебайланыс арқылы жеке сабақ, шамамен бір сағат',
        'Алғашқы танысу: оқушының деңгейі мен мақсатын анықтаймыз',
        'Алгоритмдер мен логика: шарттар, циклдар, функциялар',
        'Python-да практика және қателерді сол жерде талдау',
        'Қызығушылыққа қарай шағын жоба: ойын, бот немесе калькулятор',
        'Сабақтан кейін үй тапсырмасы және келесі сабақ алдында талдау',
      ],
      en: [
        'A one-to-one video lesson of about an hour',
        'An intro session to find out the student level and goal',
        'Algorithms and logic: conditions, loops, functions',
        'Hands-on practice in Python with mistakes reviewed on the spot',
        'A small project based on interests: a game, a bot or a calculator',
        'Homework after each lesson, reviewed before the next one',
      ],
    },
    notIncluded: {
      ru: [
        'Гарантия оценок, баллов на экзамене или места на олимпиаде',
        'Подготовка к ЕНТ по всем предметам: занятия только по информатике и коду',
        'Очные занятия: проходят онлайн, в Алматы возможна встреча по договорённости',
      ],
      kk: [
        'Бағаға, емтихандағы балға немесе олимпиададағы орынға кепілдік',
        'Барлық пәндер бойынша ҰБТ-ға дайындық: сабақтар тек информатика мен код бойынша',
        'Бетпе-бет сабақтар: онлайн өтеді, Алматыда келісім бойынша кездесуге болады',
      ],
      en: [
        'Any guarantee of grades, exam scores or olympiad results',
        'Full preparation for the national entrance exam across all subjects; lessons cover computer science and coding only',
        'In-person lessons; they run online, with a meeting in Almaty possible by agreement',
      ],
    },
    forWhom: {
      ru: 'Родителям школьников, которым нужен спокойный индивидуальный формат вместо большой группы, и самим старшеклассникам.',
      kk: 'Үлкен топтың орнына тыныш жеке форматты қалайтын оқушылардың ата-аналарына және жоғары сынып оқушыларының өздеріне арналған.',
      en: 'For parents of school students who prefer a calm one-to-one format to a large group, and for older students themselves.',
    },
    faq: [
      {
        q: {
          ru: 'С какого возраста можно начинать?',
          kk: 'Қай жастан бастауға болады?',
          en: 'From what age can a child start?',
        },
        a: {
          ru: 'Лучше всего подходит возраст от 13 лет, когда уже есть школьная математика и усидчивость. Для младших я сначала провожу пробное знакомство и честно скажу, рано ли.',
          kk: 'Мектеп математикасы мен төзімділік пайда болған 13 жастан бастау жақсы. Кішілерге алдымен сынақ танысу өткіземін және әлі ерте болса, ашық айтамын.',
          en: 'Around 13 and up works best, when school maths and the ability to focus are in place. For younger children I run an intro session first and will tell you honestly if it is too early.',
        },
      },
      {
        q: {
          ru: 'Как проходят занятия онлайн?',
          kk: 'Онлайн сабақ қалай өтеді?',
          en: 'How do online lessons work?',
        },
        a: {
          ru: 'Мы заходим в видеозвонок, ученик показывает экран, и я вижу его код. Время подбираем под расписание, я живу в Алматы (UTC+5).',
          kk: 'Біз бейнеқоңырауға кіреміз, оқушы экранын көрсетеді, мен оның кодын көремін. Уақытты кестеге қарай таңдаймыз, мен Алматыда тұрамын (UTC+5).',
          en: 'We join a video call, the student shares their screen and I can see their code. We choose times around your schedule; I am based in Almaty (UTC+5).',
        },
      },
      {
        q: {
          ru: 'Нужно ли покупать курс или программу?',
          kk: 'Курс немесе бағдарлама сатып алу керек пе?',
          en: 'Do we need to buy a course or software?',
        },
        a: {
          ru: 'Нет. Мы пользуемся бесплатными инструментами: Python и редактором кода. Нужен только компьютер с интернетом.',
          kk: 'Жоқ. Тегін құралдарды пайдаланамыз: Python және код редакторы. Тек интернеті бар компьютер қажет.',
          en: 'No. We use free tools: Python and a code editor. All you need is a computer with internet access.',
        },
      },
    ],
    relatedProducts: ['python-s-nulya', 'veb-razrabotka-dlya-nachinayushih', 'kompyuternaya-gramotnost'],
  },
  {
    slug: 'python-s-nulya',
    category: 'education',
    title: {
      ru: 'Python с нуля',
      kk: 'Python-ды нөлден бастап',
      en: 'Python from scratch',
    },
    short: {
      ru: 'Индивидуальные занятия по Python для взрослых и студентов: от переменных до скриптов и первого Telegram-бота.',
      kk: 'Ересектер мен студенттерге арналған Python бойынша жеке сабақтар: айнымалылардан скриптер мен алғашқы Telegram-ботқа дейін.',
      en: 'One-to-one Python lessons for adults and students: from variables to scripts and your first Telegram bot.',
    },
    description: {
      ru: 'Курс для тех, кто никогда не писал код и хочет сразу делать практические вещи: разбирать файлы, считать данные, автоматизировать рутину. Идём по порядку: типы данных, ветвления, циклы, функции, работа с файлами и API. Заканчиваем собственным скриптом или ботом на aiogram, который вы пишете сами с моей подсказкой.',
      kk: 'Ешқашан код жазбаған және бірден практикалық нәрселер жасағысы келетіндерге арналған курс: файлдарды өңдеу, деректерді санау, күнделікті жұмысты автоматтандыру. Ретімен жүреміз: деректер түрлері, тармақталу, циклдар, функциялар, файлдармен және API-мен жұмыс. Соңында өз скриптіңізді немесе aiogram-дағы ботты жасаймыз, оны менің кеңесіммен өзіңіз жазасыз.',
      en: 'A course for people who have never written code and want to build practical things right away: process files, crunch data, automate routine tasks. We go in order: data types, branching, loops, functions, working with files and APIs. We finish with your own script or an aiogram bot that you write yourself with my guidance.',
    },
    priceFrom: 5000,
    unit: 'lesson',
    days: { min: 1, max: 3 },
    includes: {
      ru: [
        'Занятие по видеосвязи 60 минут с демонстрацией экрана',
        'Установка Python и редактора кода на ваш компьютер',
        'Переменные, типы данных, условия и циклы',
        'Функции, списки и словари на реальных задачах',
        'Чтение и запись файлов, работа с CSV и JSON',
        'Запросы к API и основы библиотеки aiogram',
        'План обучения под вашу цель: работа, учёба или автоматизация',
      ],
      kk: [
        'Экран көрсетілетін 60 минуттық бейнебайланыс сабағы',
        'Компьютерге Python мен код редакторын орнату',
        'Айнымалылар, деректер түрлері, шарттар мен циклдар',
        'Нақты тапсырмалардағы функциялар, тізімдер және сөздіктер',
        'Файлдарды оқу мен жазу, CSV және JSON-мен жұмыс',
        'API-ға сұраныстар және aiogram кітапханасының негіздері',
        'Мақсатыңызға сай оқу жоспары: жұмыс, оқу немесе автоматтандыру',
      ],
      en: [
        'A 60-minute video lesson with screen sharing',
        'Installing Python and a code editor on your computer',
        'Variables, data types, conditions and loops',
        'Functions, lists and dictionaries on real tasks',
        'Reading and writing files, working with CSV and JSON',
        'API requests and the basics of the aiogram library',
        'A learning plan around your goal: work, study or automation',
      ],
    },
    notIncluded: {
      ru: [
        'Гарантия трудоустройства или конкретной зарплаты после курса',
        'Выполнение за вас домашних или курсовых работ',
        'Готовые сертификаты: это индивидуальные занятия, а не аккредитованный курс',
      ],
      kk: [
        'Курстан кейін жұмысқа орналасуға немесе нақты жалақыға кепілдік',
        'Үй немесе курстық жұмыстарды сіздің орныңызға орындау',
        'Дайын сертификаттар: бұл аккредиттелген курс емес, жеке сабақтар',
      ],
      en: [
        'Any guarantee of a job or a specific salary after the course',
        'Doing your homework or coursework for you',
        'Certificates; these are private lessons, not an accredited course',
      ],
    },
    forWhom: {
      ru: 'Взрослым и студентам без опыта, которые хотят автоматизировать свои задачи или освоить первый язык программирования.',
      kk: 'Тәжірибесі жоқ, өз тапсырмаларын автоматтандырғысы немесе алғашқы бағдарламалау тілін меңгергісі келетін ересектер мен студенттерге арналған.',
      en: 'For adults and students with no experience who want to automate their own tasks or learn a first programming language.',
    },
    faq: [
      {
        q: {
          ru: 'Нужно ли знать математику?',
          kk: 'Математиканы білу керек пе?',
          en: 'Do I need to be good at maths?',
        },
        a: {
          ru: 'Для начала хватит школьной арифметики. Логика появляется на практике, а сложная математика нужна лишь в узких областях.',
          kk: 'Бастау үшін мектептегі арифметика жеткілікті. Логика практикада қалыптасады, ал күрделі математика тек тар салаларда керек.',
          en: 'School arithmetic is enough to start. Logic builds up through practice, and advanced maths matters only in narrow fields.',
        },
      },
      {
        q: {
          ru: 'Сколько занятий понадобится?',
          kk: 'Қанша сабақ қажет болады?',
          en: 'How many lessons will I need?',
        },
        a: {
          ru: 'Зависит от цели и частоты практики. Чтобы уверенно писать небольшие скрипты, обычно нужно несколько недель занятий раз-два в неделю. Точного числа не обещаю.',
          kk: 'Мақсатқа және практика жиілігіне байланысты. Шағын скриптерді сенімді жазу үшін әдетте аптасына бір-екі рет бірнеше апта жеткілікті. Нақты санды уәде етпеймін.',
          en: 'It depends on your goal and how often you practise. To write small scripts with confidence, a few weeks at one or two lessons a week is typical. I do not promise an exact number.',
        },
      },
      {
        q: {
          ru: 'Можно ли заниматься, если я живу в другой стране?',
          kk: 'Басқа елде тұрсам, сабаққа қатыса аламын ба?',
          en: 'Can I take lessons from another country?',
        },
        a: {
          ru: 'Да, занятия проходят онлайн. Я работаю по времени Алматы (UTC+5) и подберу удобный слот; русский и английский для занятий подходят.',
          kk: 'Иә, сабақтар онлайн өтеді. Мен Алматы уақытымен (UTC+5) жұмыс істеймін және ыңғайлы уақыт таңдаймын; сабақты орыс және ағылшын тілінде өткізуге болады.',
          en: 'Yes, lessons are online. I work on Almaty time (UTC+5) and will find a convenient slot; lessons can be held in English or Russian.',
        },
      },
    ],
    relatedProducts: ['repetitor-programmirovaniya', 'telegram-bot-faq', 'parsing-dannyh'],
  },
  {
    slug: 'veb-razrabotka-dlya-nachinayushih',
    category: 'education',
    title: {
      ru: 'Веб-разработка для начинающих',
      kk: 'Бастаушыларға арналған веб-әзірлеу',
      en: 'Web development for beginners',
    },
    short: {
      ru: 'Занятия по HTML, CSS и JavaScript с переходом на React: вы сделаете и опубликуете собственный сайт.',
      kk: 'HTML, CSS және JavaScript бойынша сабақтар, React-ке өту: өз сайтыңызды жасап, жариялайсыз.',
      en: 'Lessons in HTML, CSS and JavaScript with a step into React: you build and publish your own website.',
    },
    description: {
      ru: 'Курс для тех, кто хочет научиться делать сайты, а не только писать скрипты. Сначала разметка и стили, затем адаптивная вёрстка, JavaScript и работа с формами, после этого введение в React и Tailwind. Результат занятий: ваш сайт в интернете, который вы сами сверстали, выложили на хостинг и можете править.',
      kk: 'Тек скрипт жазуды емес, сайт жасауды үйренгісі келетіндерге арналған курс. Алдымен белгілеу мен стильдер, содан кейін адаптивті беттеме, JavaScript және формалармен жұмыс, одан соң React пен Tailwind-ке кіріспе. Сабақтың нәтижесі: өзіңіз беттеген, хостингке орналастырған және өңдей алатын, интернеттегі сайтыңыз.',
      en: 'A course for people who want to learn to make websites, not just write scripts. First markup and styling, then responsive layout, JavaScript and forms, and finally an introduction to React and Tailwind. The result is your own site online, which you laid out yourself, put on hosting and can keep editing.',
    },
    priceFrom: 5000,
    unit: 'lesson',
    days: { min: 1, max: 3 },
    includes: {
      ru: [
        'Занятие по видеосвязи 60 минут с совместной работой над кодом',
        'HTML: структура страницы, ссылки, формы, доступность',
        'CSS: Flexbox, Grid, адаптивная вёрстка под телефон',
        'JavaScript: события, работа с DOM, запросы к серверу',
        'Введение в React и Tailwind на примере небольшого проекта',
        'Git и GitHub: хранение кода и публикация сайта',
        'Собственный сайт в качестве итоговой работы',
      ],
      kk: [
        'Код үстінде бірге жұмыс істейтін 60 минуттық бейнебайланыс сабағы',
        'HTML: бет құрылымы, сілтемелер, формалар, қолжетімділік',
        'CSS: Flexbox, Grid, телефонға арналған адаптивті беттеме',
        'JavaScript: оқиғалар, DOM-мен жұмыс, серверге сұраныстар',
        'Шағын жоба мысалында React пен Tailwind-ке кіріспе',
        'Git және GitHub: кодты сақтау және сайтты жариялау',
        'Қорытынды жұмыс ретінде өз сайтыңыз',
      ],
      en: [
        'A 60-minute video lesson where we work on code together',
        'HTML: page structure, links, forms, accessibility',
        'CSS: Flexbox, Grid and responsive layout for phones',
        'JavaScript: events, the DOM and requests to a server',
        'An introduction to React and Tailwind through a small project',
        'Git and GitHub: storing your code and publishing the site',
        'Your own website as the final project',
      ],
    },
    notIncluded: {
      ru: [
        'Гарантия трудоустройства фронтенд-разработчиком',
        'Оплата хостинга и домена для вашего сайта: платите хостеру сами',
        'Бэкенд и базы данных: этому посвящены отдельные занятия по договорённости',
      ],
      kk: [
        'Фронтенд-әзірлеуші болып жұмысқа орналасуға кепілдік',
        'Сайтыңызға арналған хостинг пен доменнің ақысы: хостерге өзіңіз төлейсіз',
        'Бэкенд пен деректер қоры: бұған келісім бойынша бөлек сабақтар арналады',
      ],
      en: [
        'A guarantee of a job as a front-end developer',
        'Hosting and domain fees for your site, which you pay to the host yourself',
        'Back-end and databases, which can be covered in separate lessons by agreement',
      ],
    },
    forWhom: {
      ru: 'Тем, кто хочет сделать сайт для себя или своего дела, сменить профессию или поступить на IT-направление.',
      kk: 'Өзіне немесе ісіне сайт жасағысы келетіндерге, мамандығын ауыстырғысы немесе IT бағытына түскісі келетіндерге арналған.',
      en: 'For anyone who wants a site for themselves or their business, a career change or a start in IT studies.',
    },
    faq: [
      {
        q: {
          ru: 'Чем это отличается от занятий по Python?',
          kk: 'Бұл Python сабақтарынан немен ерекшеленеді?',
          en: 'How is this different from the Python lessons?',
        },
        a: {
          ru: 'Здесь вы работаете с тем, что видно в браузере: страницы, стили, кнопки, формы. Python-курс посвящён скриптам и ботам, а тут результат визуальный и открывается по ссылке.',
          kk: 'Мұнда сіз браузерде көрінетінмен жұмыс істейсіз: беттер, стильдер, түймелер, формалар. Python курсы скрипттер мен боттарға арналған, ал мұнда нәтиже көрнекі және сілтеме арқылы ашылады.',
          en: 'Here you work with what shows up in the browser: pages, styles, buttons, forms. The Python course is about scripts and bots, while here the result is visual and opens from a link.',
        },
      },
      {
        q: {
          ru: 'Какой компьютер нужен?',
          kk: 'Қандай компьютер қажет?',
          en: 'What computer do I need?',
        },
        a: {
          ru: 'Подойдёт любой ноутбук с Windows, macOS или Linux и современным браузером. Редактор кода и остальные инструменты бесплатные.',
          kk: 'Windows, macOS немесе Linux және заманауи браузері бар кез келген ноутбук жарайды. Код редакторы мен қалған құралдар тегін.',
          en: 'Any laptop running Windows, macOS or Linux with a modern browser will do. The code editor and other tools are free.',
        },
      },
      {
        q: {
          ru: 'Научусь ли я делать сайты на заказ?',
          kk: 'Тапсырыс бойынша сайт жасауды үйренемін бе?',
          en: 'Will I be able to build client sites afterwards?',
        },
        a: {
          ru: 'Вы освоите основы и сможете делать несложные сайты. Навык растёт с практикой, и на занятиях мы разбираем реальные задачи, но сроков и доходов я не обещаю.',
          kk: 'Негіздерді меңгеріп, қарапайым сайттар жасай аласыз. Дағды практикамен өседі, сабақта нақты тапсырмаларды талдаймыз, бірақ мерзім мен табысқа уәде бермеймін.',
          en: 'You will learn the fundamentals and be able to build simple sites. Skill grows with practice, and we go through real tasks in lessons, but I make no promises about timing or income.',
        },
      },
    ],
    relatedProducts: ['python-s-nulya', 'sait-vizitka', 'repetitor-programmirovaniya'],
  },
  {
    slug: 'kompyuternaya-gramotnost',
    category: 'education',
    title: {
      ru: 'Компьютерная грамотность для взрослых',
      kk: 'Ересектерге арналған компьютерлік сауаттылық',
      en: 'Computer basics for adults',
    },
    short: {
      ru: 'Спокойные занятия для взрослых и пожилых людей: компьютер, смартфон, интернет, мессенджеры и госуслуги.',
      kk: 'Ересектер мен егде жастағы адамдарға арналған сабақтар: компьютер, смартфон, интернет, мессенджерлер және электрондық қызметтер.',
      en: 'Patient lessons for adults and older people: computer, smartphone, internet, messengers and online services.',
    },
    description: {
      ru: 'Никакого программирования: только то, что пригодится в повседневной жизни. Мы учимся пользоваться смартфоном и компьютером, искать информацию, общаться по видеосвязи, безопасно платить и узнавать мошеннические сообщения. Темп задаёте вы, повторяем столько раз, сколько нужно, и объясняю без непонятных терминов.',
      kk: 'Бағдарламалау жоқ: тек күнделікті өмірде керек нәрселер. Смартфон мен компьютерді пайдалануды, ақпарат іздеуді, бейнебайланыспен сөйлесуді, қауіпсіз төлеуді және алаяқтық хабарламаларды танып білуді үйренеміз. Қарқынды өзіңіз белгілейсіз, қажет болғанша қайталаймыз, түсініксіз терминсіз түсіндіремін.',
      en: 'No programming here, only what is useful in everyday life. We learn to use a smartphone and a computer, search for information, talk over video, pay safely and spot scam messages. You set the pace, we repeat as often as needed and I explain without confusing jargon.',
    },
    priceFrom: 3000,
    unit: 'lesson',
    days: { min: 1, max: 3 },
    includes: {
      ru: [
        'Занятие по видеосвязи, около часа, в удобном вам темпе',
        'Основы работы со смартфоном: звонки, камера, приложения',
        'Работа с компьютером: файлы, папки, печать документов',
        'Поиск информации в интернете и проверка источников',
        'WhatsApp, Telegram и видеозвонки с родными',
        'Онлайн-банкинг и оплата услуг, электронные госуслуги шаг за шагом',
        'Как распознать мошеннические звонки и сообщения',
      ],
      kk: [
        'Бейнебайланыс арқылы шамамен бір сағаттық сабақ, өзіңізге ыңғайлы қарқында',
        'Смартфонмен жұмыс негіздері: қоңыраулар, камера, қосымшалар',
        'Компьютермен жұмыс: файлдар, қалталар, құжаттарды басып шығару',
        'Интернеттен ақпарат іздеу және дереккөздерді тексеру',
        'WhatsApp, Telegram және туыстармен бейнеқоңыраулар',
        'Онлайн-банкинг пен қызметтерге төлем, электрондық мемлекеттік қызметтер қадам-қадаммен',
        'Алаяқтық қоңыраулар мен хабарламаларды қалай тануға болады',
      ],
      en: [
        'An online lesson of about an hour at a pace that suits you',
        'Smartphone basics: calls, the camera, apps',
        'Working with a computer: files, folders, printing documents',
        'Searching the internet and checking sources',
        'WhatsApp, Telegram and video calls with family',
        'Online banking, paying for services and e-government sites step by step',
        'How to recognise scam calls and messages',
      ],
    },
    notIncluded: {
      ru: [
        'Ремонт и настройка вышедшей из строя техники: занятия только объясняют',
        'Покупка компьютера или телефона: могу лишь посоветовать, что смотреть',
        'Занятия очно: проходят онлайн, в Алматы возможна встреча по договорённости',
      ],
      kk: [
        'Істен шыққан техниканы жөндеу: сабақтар тек түсіндіреді',
        'Компьютер немесе телефон сатып алу: нені қарау керегін ғана кеңес бере аламын',
        'Бетпе-бет сабақтар: онлайн өтеді, Алматыда келісім бойынша кездесуге болады',
      ],
      en: [
        'Repairing broken equipment; lessons only explain how to use it',
        'Buying a computer or phone; I can only advise what to look at',
        'In-person lessons; they run online, with a meeting in Almaty possible by agreement',
      ],
    },
    forWhom: {
      ru: 'Взрослым, пожилым родителям и бабушкам с дедушками, которым нужно уверенно пользоваться техникой, а детям или внукам некогда объяснять.',
      kk: 'Техниканы сенімді пайдалануы керек, ал балаларында немесе немерелерінде түсіндіруге уақыт жоқ ересектерге, егде жастағы ата-аналарға, әже мен атаға арналған.',
      en: 'For adults and older parents or grandparents who need to use technology confidently when their children or grandchildren have no time to explain.',
    },
    faq: [
      {
        q: {
          ru: 'Я совсем не разбираюсь, подойдёт ли мне?',
          kk: 'Мен мүлде түсінбеймін, маған жарай ма?',
          en: 'I know nothing about computers. Is this right for me?',
        },
        a: {
          ru: 'Да, начинаем с самого простого. На первом занятии мы выясняем, что вы уже умеете и чему хотите научиться, и строим уроки вокруг этого.',
          kk: 'Иә, ең қарапайымынан бастаймыз. Бірінші сабақта нені білетініңізді және нені үйренгіңіз келетінін анықтап, сабақтарды соның төңірегінде құрамыз.',
          en: 'Yes, we start from the very basics. In the first lesson we find out what you can already do and what you want to learn, and build the lessons around that.',
        },
      },
      {
        q: {
          ru: 'Как заниматься, если я не умею пользоваться видеозвонком?',
          kk: 'Бейнеқоңырауды пайдалана алмасам, қалай оқимын?',
          en: 'How can I take an online lesson if I cannot use video calls yet?',
        },
        a: {
          ru: 'Первый раз я объясняю по телефону, как зайти в звонок, или связываюсь с кем-то из ваших близких. Часто помогает, если рядом сидит родственник.',
          kk: 'Алғашқыда қоңырауға қалай кіру керегін телефонмен түсіндіремін немесе жақындарыңыздың біреуімен байланысамын. Жанында туысыңыз отырса, көбіне көмектеседі.',
          en: 'The first time I explain by phone how to join the call, or I contact one of your relatives. It often helps to have a family member nearby.',
        },
      },
      {
        q: {
          ru: 'Можно ли заказать занятия для родителей, живущих в другом городе?',
          kk: 'Басқа қалада тұратын ата-анама сабақ тапсыруға бола ма?',
          en: 'Can I book lessons for my parents who live in another city?',
        },
        a: {
          ru: 'Да, занятия идут онлайн в любом городе. Вы можете записаться и оплатить за них, а по желанию присутствовать на первом занятии.',
          kk: 'Иә, сабақтар кез келген қалада онлайн өтеді. Олар үшін өзіңіз жазылып, төлей аласыз, қаласаңыз бірінші сабаққа қатыса аласыз.',
          en: 'Yes, lessons are online and work from any city. You can sign them up and pay on their behalf, and join the first lesson if you wish.',
        },
      },
    ],
    relatedProducts: ['kompyuternaya-pomosch', 'repetitor-programmirovaniya', 'pochta-na-domene'],
  },
];
