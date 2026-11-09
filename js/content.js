/* =====================================================================
   ZOG PROJECTS — БАРЧА МАЗМУН ШУ ФАЙЛДА
   Сайтдаги матн, ҳавола ва алоқа маълумотларини фақат шу ерда ўзгартирасиз.
   "TODO" деб белгиланган жойлар — сиз тўлдирадиган плейсхолдерлар.
   ===================================================================== */

/* ---------- 1. УМУМИЙ СОЗЛАМАЛАР ---------- */
window.SITE = {
  name: "ZOG Projects",
  ownerName: "Bilolbek",

  /* Тил танлаш тартиби:
     1) Фойдаланувчи ўзи танлаган тил (эслаб қолинади)
     2) Минтақа (вақт зонаси) бўйича — "regionLang" рўйхатларида
     3) Минтақа номаълум бўлса — defaultLang
     4) Рўйхатда йўқ минтақа (бошқа давлатлар) — fallbackLang */
  defaultLang: "tg",
  fallbackLang: "en",
  regionLang: {
    tg: ["Asia/Dushanbe"],
    uz: ["Asia/Tashkent", "Asia/Samarkand"],
    ru: [
      "Europe/Moscow", "Europe/Kaliningrad", "Europe/Samara", "Europe/Volgograd", "Europe/Kirov",
      "Europe/Astrakhan", "Europe/Saratov", "Europe/Ulyanovsk", "Europe/Simferopol", "Europe/Minsk",
      "Europe/Chisinau", "Asia/Yekaterinburg", "Asia/Omsk", "Asia/Novosibirsk", "Asia/Barnaul",
      "Asia/Tomsk", "Asia/Novokuznetsk", "Asia/Krasnoyarsk", "Asia/Irkutsk", "Asia/Chita",
      "Asia/Yakutsk", "Asia/Khandyga", "Asia/Vladivostok", "Asia/Ust-Nera", "Asia/Magadan",
      "Asia/Sakhalin", "Asia/Srednekolymsk", "Asia/Kamchatka", "Asia/Anadyr",
      "Asia/Almaty", "Asia/Qyzylorda", "Asia/Qostanay", "Asia/Aqtobe", "Asia/Aqtau", "Asia/Atyrau",
      "Asia/Oral", "Asia/Bishkek", "Asia/Ashgabat", "Asia/Yerevan", "Asia/Baku", "Asia/Tbilisi"
    ]
  },

  /* Сайт манзили (охирида "/" бўлмасин). Домен уланса, шу ерни ва
     HTML/sitemap/robots'даги манзилни алмаштирасиз (README'га қаранг). */
  url: "https://jack07lion-a11y.github.io/zog_projects.tj",

  /* WhatsApp: фақат рақамлар, "+" ва бўшлиқсиз */
  whatsapp: "992907539527",
  phoneDisplay: "+992 90 753 95 27",

  /* Телеграм username (@ белгисиз). Бўш бўлса, Телеграм тугмаси кўринмайди.
     Ҳозирча керак эмас. */
  telegram: "",

  /* Почта (ихтиёрий). Бўш қолса, кўрсатилмайди. */
  email: "",

  /* Instagram профиллар */
  instagram: {
    animations: "https://www.instagram.com/zog_animations",
    promotions: "https://www.instagram.com/zog_promotions",
    dev: "https://www.instagram.com/zog_dev"
  }
};

/* ---------- 2. ИШЛАР (портфолио карточкалари) ----------
   Ҳар бир иш — битта объект. Қуйидагиларни тўлдирасиз:
     url   — YouTube/Instagram ҳавола ("" бўлса "Тез орада" чиқади)
     thumb — расм йўли, масалан "assets/works/1.jpg" ("" бўлса градиент чиқади)
     cat   — "saas" | "ad" | "cartoon"
     title — ҳар тилда номи
   Янги иш қўшиш учун бирор қаторни нусхалаб, ўзгартиринг. */
(function () {
  var T = { tg: "[TODO: Номи]", ru: "[TODO: Название работы]", uz: "[TODO: Ish nomi]", en: "[TODO: Work title]" };
  window.WORKS = [
    { cat: "saas",    url: "", thumb: "", title: T },
    { cat: "ad",      url: "", thumb: "", title: T },
    { cat: "cartoon", url: "", thumb: "", title: T },
    { cat: "saas",    url: "", thumb: "", title: T },
    { cat: "ad",      url: "", thumb: "", title: T },
    { cat: "cartoon", url: "", thumb: "", title: T }
  ];
})();

/* ---------- 3. МАТНЛАР (тиллар) ----------
   Янги тил қўшиш: бирор блокни нусхалаб, янги код беринг (масалан "kk"),
   "langName" (қисқа код) ва "langLabel" (тўлиқ ном) ни ёзинг.
   Таржима қилинмаган калитлар defaultLang (тожикча) да кўринади. */
window.I18N = {

  /* ============ ТОҶИКӢ ============ */
  tg: {
    langName: "TJ", langLabel: "Тоҷикӣ", htmlLang: "tg",

    "nav.home": "Саҳифаи асосӣ",
    "nav.works": "Корҳо",
    "nav.services": "Хидматҳо",
    "nav.courses": "Курсҳо",
    "nav.order": "Фармоиш",
    "nav.about": "Дар бораи ман",
    "nav.menu": "Меню",

    "cat.saas": "SaaS промо",
    "cat.ad": "Таблиғот",
    "cat.cartoon": "Мултфилм",

    "meta.home.title": "ZOG Projects — видеои промо барои SaaS, таблиғот ва аниматсияи мултфилмӣ",
    "meta.home.desc": "Видеои промо барои SaaS, роликҳои таблиғотӣ ва аниматсияи мултфилмӣ. Фармоиш диҳед — лоиҳаи шуморо ба видеои зинда табдил медиҳем.",
    "meta.works.title": "Корҳо — ZOG Projects",
    "meta.works.desc": "Корҳои ZOG Projects: видеоҳои промо барои SaaS, роликҳои таблиғотӣ ва мултфилмҳо.",
    "meta.services.title": "Хидматҳо — ZOG Projects",
    "meta.services.desc": "Видеои промо барои SaaS, ролики таблиғотӣ ва аниматсияи мултфилмӣ. Нарх вобаста ба лоиҳа мувофиқа карда мешавад.",
    "meta.courses.title": "Курсҳо ва дарсҳои омӯзишӣ — ZOG Projects",
    "meta.courses.desc": "Курсҳо ва дарсҳои омӯзишӣ оид ба видео ва аниматсия ба қарибӣ. Ба рӯйхати интизорӣ номнавис шавед.",
    "meta.order.title": "Фармоиш додан — ZOG Projects",
    "meta.order.desc": "Видео ё аниматсия фармоиш диҳед: тавассути WhatsApp ё Instagram тамос гиред.",
    "meta.about.title": "Дар бораи ман — ZOG Projects",
    "meta.about.desc": "Дар бораи ZOG Projects: самтҳои видео, аниматсия, бозӣ ва барномаи мобилӣ.",

    "hero.badge": "Видео · Аниматсия · Барномасозӣ",
    "hero.title": "Видеои промо барои SaaS, таблиғот ва аниматсияи мултфилмӣ",
    "hero.sub": "Маҳсулот ё ғояи шуморо ба видео ва аниматсияи зинда табдил медиҳем.",
    "hero.cta": "Фармоиш додан",
    "hero.cta2": "Дидани корҳо",

    "home.services": "Чӣ кор мекунам",
    "home.works": "Корҳои охирин",
    "home.all": "Ҳама",
    "home.courses.title": "Курсҳо ва дарсҳои омӯзишӣ",
    "home.courses.text": "Ба қарибӣ. Барои аввалин шуда огоҳ шудан, ба рӯйхати интизорӣ номнавис шавед.",
    "home.cta.title": "Лоиҳа доред?",
    "home.cta.text": "Кӯтоҳ нависед — ғояро бо ҳам муҳокима мекунем.",

    "works.title": "Корҳо",
    "works.lead": "Намунаҳои видео ва аниматсия. Корҳои нав мунтазам илова мешаванд.",
    "works.watch": "Дидан",
    "works.soon": "Ба қарибӣ",
    "works.follow": "Корҳои бештар — дар саҳифаҳои Instagram-и мо:",

    "services.title": "Хидматҳо",
    "services.lead": "Нарх вобаста ба ҳаҷм ва мураккабии лоиҳа мувофиқа карда мешавад.",
    "services.price": "Нарх мувофиқа карда мешавад",
    "services.saas.title": "Видеои промо барои SaaS",
    "services.saas.text": "Муаррифии кӯтоҳу фаҳмои барнома ё хидмати шумо дар шакли видео.",
    "services.ad.title": "Роликҳои таблиғотӣ",
    "services.ad.text": "Роликҳои кӯтоҳ ва диққатҷалбкунанда барои шабакаҳои иҷтимоӣ ва таблиғот.",
    "services.cartoon.title": "Аниматсияи мултфилмӣ",
    "services.cartoon.text": "Қаҳрамонҳо, ҳикоя ва аниматсия — аз ғоя то мултфилми тайёр.",
    "services.dev.title": "Бозӣ ва барномаи мобилӣ",
    "services.dev.text": "Самти навбатӣ. Хабарҳо дар Instagram.",
    "services.dev.badge": "Ба қарибӣ",
    "services.order": "Фармоиш додан",

    "courses.title": "Курсҳо ва дарсҳои омӯзишӣ",
    "courses.badge": "Ба қарибӣ",
    "courses.lead": "Курсҳо ва дарсҳои омӯзишӣ оид ба видео ва аниматсия омода карда мешаванд. Ба рӯйхати интизорӣ номнавис шавед — ҳангоми нашр аввалин шуда хабар медиҳам.",
    "courses.cta": "Ба рӯйхати интизорӣ номнавис шудан",
    "courses.wa": "Салом! Мехоҳам ба рӯйхати интизорӣ барои курсҳо ва дарсҳои омӯзишӣ номнавис шавам.",

    "order.title": "Фармоиш додан",
    "order.lead": "Дар бораи лоиҳаатон кӯтоҳ нависед — ҷавоб медиҳам.",
    "order.wa": "Дар WhatsApp навиштан",
    "order.tg": "Дар Telegram навиштан",
    "order.ig": "Дар Instagram навиштан",
    "order.email": "Тавассути почта",
    "order.hint.title": "Ҳангоми навиштан инҳоро қайд кунед",
    "order.hint.1": "Кадом хидмат лозим аст (видеои промо, таблиғот, мултфилм)",
    "order.hint.2": "Мақсад ва аудиторияи видео",
    "order.hint.3": "Муҳлати тахминӣ",
    "order.hint.4": "Намунаи видеоҳои писандатон (агар бошад)",
    "order.wa.text": "Салом! Мехоҳам видео ё аниматсия фармоиш диҳам.",
    "order.phone": "Телефон / WhatsApp",

    "about.title": "Дар бораи ман",
    "about.text": "[TODO: Дар бораи худ 2–3 ҷумла нависед — шумо кистед, чӣ кор мекунед.]",
    "about.profiles": "Саҳифаҳои ман",
    "about.animations": "Аниматсияи мултфилмӣ",
    "about.promotions": "SaaS промо ва таблиғот",
    "about.dev": "Бозӣ ва барномаи мобилӣ",

    "footer.rights": "Ҳамаи ҳуқуқҳо ҳифз шудаанд."
  },

  /* ============ РУСЧА ============ */
  ru: {
    langName: "RU", langLabel: "Русский", htmlLang: "ru",

    "nav.home": "Главная",
    "nav.works": "Работы",
    "nav.services": "Услуги",
    "nav.courses": "Курсы",
    "nav.order": "Заказ",
    "nav.about": "Обо мне",
    "nav.menu": "Меню",

    "cat.saas": "SaaS промо",
    "cat.ad": "Реклама",
    "cat.cartoon": "Мультфильм",

    "meta.home.title": "ZOG Projects — SaaS промо-видео, реклама и мультфильмы",
    "meta.home.desc": "SaaS промо-видео, рекламные ролики и мультипликация. Сделайте заказ — превратим ваш проект в живое видео.",
    "meta.works.title": "Работы — ZOG Projects",
    "meta.works.desc": "Работы ZOG Projects: SaaS промо-видео, рекламные ролики и мультфильмы.",
    "meta.services.title": "Услуги — ZOG Projects",
    "meta.services.desc": "SaaS промо-видео, рекламные ролики и мультипликация. Цена зависит от проекта.",
    "meta.courses.title": "Курсы и туториалы — ZOG Projects",
    "meta.courses.desc": "Курсы и туториалы по видео и анимации скоро. Запишитесь в список ожидания.",
    "meta.order.title": "Заказать — ZOG Projects",
    "meta.order.desc": "Закажите видео или анимацию: свяжитесь через WhatsApp или Instagram.",
    "meta.about.title": "Обо мне — ZOG Projects",
    "meta.about.desc": "О ZOG Projects: видео, анимация, игры и мобильные приложения.",

    "hero.badge": "Видео · Анимация · Разработка",
    "hero.title": "SaaS промо-видео, реклама и мультфильмы",
    "hero.sub": "Превращаем ваш продукт или идею в живое видео и анимацию.",
    "hero.cta": "Заказать",
    "hero.cta2": "Смотреть работы",

    "home.services": "Чем занимаюсь",
    "home.works": "Последние работы",
    "home.all": "Все",
    "home.courses.title": "Курсы и туториалы",
    "home.courses.text": "Скоро. Запишитесь в список ожидания, чтобы узнать первым.",
    "home.cta.title": "Есть проект?",
    "home.cta.text": "Напишите коротко — обсудим идею вместе.",

    "works.title": "Работы",
    "works.lead": "Примеры видео и анимации. Новые работы добавляются регулярно.",
    "works.watch": "Смотреть",
    "works.soon": "Скоро",
    "works.follow": "Больше работ — в наших профилях Instagram:",

    "services.title": "Услуги",
    "services.lead": "Цена зависит от объёма и сложности проекта.",
    "services.price": "Цена по договорённости",
    "services.saas.title": "SaaS промо-видео",
    "services.saas.text": "Понятно и коротко представим ваше приложение или сервис в видео.",
    "services.ad.title": "Рекламные ролики",
    "services.ad.text": "Короткие, цепляющие ролики для соцсетей и рекламы.",
    "services.cartoon.title": "Мультипликация",
    "services.cartoon.text": "Персонажи, история и анимация — от идеи до готового мультфильма.",
    "services.dev.title": "Игры и мобильные приложения",
    "services.dev.text": "Следующее направление. Новости в Instagram.",
    "services.dev.badge": "Скоро",
    "services.order": "Заказать",

    "courses.title": "Курсы и туториалы",
    "courses.badge": "Скоро",
    "courses.lead": "Курсы и туториалы по видео и анимации готовятся. Запишитесь в список ожидания — сообщу первым, когда они выйдут.",
    "courses.cta": "Записаться в список ожидания",
    "courses.wa": "Здравствуйте! Хочу записаться в список ожидания на курсы и туториалы.",

    "order.title": "Заказать",
    "order.lead": "Коротко опишите проект — отвечу.",
    "order.wa": "Написать в WhatsApp",
    "order.tg": "Написать в Telegram",
    "order.ig": "Написать в Instagram",
    "order.email": "Написать на почту",
    "order.hint.title": "В сообщении укажите",
    "order.hint.1": "Какая услуга нужна (промо-видео, реклама, мультфильм)",
    "order.hint.2": "Цель и для кого видео",
    "order.hint.3": "Примерные сроки",
    "order.hint.4": "Примеры видео, которые нравятся (если есть)",
    "order.wa.text": "Здравствуйте! Хочу заказать видео/анимацию.",
    "order.phone": "Телефон / WhatsApp",

    "about.title": "Обо мне",
    "about.text": "[TODO: Напишите о себе 2–3 предложения — кто вы, чем занимаетесь.]",
    "about.profiles": "Мои профили",
    "about.animations": "Мультипликация",
    "about.promotions": "SaaS промо и реклама",
    "about.dev": "Игры и мобильные приложения",

    "footer.rights": "Все права защищены."
  },

  /* ============ ЎЗБЕКЧА (лотин) ============ */
  uz: {
    langName: "UZ", langLabel: "Oʻzbekcha", htmlLang: "uz",

    "nav.home": "Bosh sahifa",
    "nav.works": "Ishlar",
    "nav.services": "Xizmatlar",
    "nav.courses": "Kurslar",
    "nav.order": "Buyurtma",
    "nav.about": "Men haqimda",
    "nav.menu": "Menyu",

    "cat.saas": "SaaS promo",
    "cat.ad": "Reklama",
    "cat.cartoon": "Multfilm",

    "meta.home.title": "ZOG Projects — SaaS promo video, reklama va multfilm animatsiyalar",
    "meta.home.desc": "SaaS promo video, reklama roliklar va multfilm animatsiyalar. Buyurtma bering — loyihangizni jonli videoga aylantiramiz.",
    "meta.works.title": "Ishlar — ZOG Projects",
    "meta.works.desc": "ZOG Projects ishlari: SaaS promo videolar, reklama roliklar va multfilm animatsiyalar.",
    "meta.services.title": "Xizmatlar — ZOG Projects",
    "meta.services.desc": "SaaS promo video, reklama rolik va multfilm animatsiya xizmatlari. Narx loyihaga qarab kelishiladi.",
    "meta.courses.title": "Kurslar va tutoriallar — ZOG Projects",
    "meta.courses.desc": "Video va animatsiya bo'yicha kurslar va tutoriallar tez orada. Kutish ro'yxatiga yoziling.",
    "meta.order.title": "Buyurtma berish — ZOG Projects",
    "meta.order.desc": "Video yoki animatsiya buyurtma bering: WhatsApp, Instagram orqali bog'laning.",
    "meta.about.title": "Men haqimda — ZOG Projects",
    "meta.about.desc": "ZOG Projects haqida: video, animatsiya, o'yin va mobil ilova yo'nalishlari.",

    "hero.badge": "Video · Animatsiya · Dasturlash",
    "hero.title": "SaaS promo video, reklama va multfilm animatsiyalar",
    "hero.sub": "Mahsulotingiz yoki g'oyangizni jonli video va animatsiyaga aylantiramiz.",
    "hero.cta": "Buyurtma berish",
    "hero.cta2": "Ishlarni ko'rish",

    "home.services": "Nima qilaman",
    "home.works": "So'nggi ishlar",
    "home.all": "Hammasi",
    "home.courses.title": "Kurslar va tutoriallar",
    "home.courses.text": "Tez orada. Birinchi bo'lib xabar olish uchun kutish ro'yxatiga yoziling.",
    "home.cta.title": "Loyihangiz bormi?",
    "home.cta.text": "Qisqa yozing — g'oyani birga muhokama qilamiz.",

    "works.title": "Ishlar",
    "works.lead": "Video va animatsiya namunalari. Yangi ishlar muntazam qo'shiladi.",
    "works.watch": "Ko'rish",
    "works.soon": "Tez orada",
    "works.follow": "Ko'proq ishlar — Instagram profillarimizda:",

    "services.title": "Xizmatlar",
    "services.lead": "Narx loyihaning hajmi va murakkabligiga qarab kelishiladi.",
    "services.price": "Narx kelishiladi",
    "services.saas.title": "SaaS promo video",
    "services.saas.text": "Ilova yoki xizmatingizni tushunarli va qisqa videoda tanishtirish.",
    "services.ad.title": "Reklama roliklar",
    "services.ad.text": "Ijtimoiy tarmoqlar va reklama uchun qisqa, e'tiborni tortadigan roliklar.",
    "services.cartoon.title": "Multfilm animatsiya",
    "services.cartoon.text": "Qahramonlar, hikoya va animatsiya — g'oyadan tayyor multfilmgacha.",
    "services.dev.title": "O'yin va mobil ilova",
    "services.dev.text": "Keyingi yo'nalish. Yangiliklar Instagram'da.",
    "services.dev.badge": "Tez orada",
    "services.order": "Buyurtma berish",

    "courses.title": "Kurslar va tutoriallar",
    "courses.badge": "Tez orada",
    "courses.lead": "Video va animatsiya bo'yicha kurslar va tutoriallar tayyorlanmoqda. Kutish ro'yxatiga yozilsangiz, ular chiqqanda birinchi bo'lib xabar beraman.",
    "courses.cta": "Kutish ro'yxatiga yozilish",
    "courses.wa": "Salom! Kurslar va tutoriallar uchun kutish ro'yxatiga yozilmoqchiman.",

    "order.title": "Buyurtma berish",
    "order.lead": "Loyihangiz haqida qisqa yozing — javob beraman.",
    "order.wa": "WhatsApp'da yozish",
    "order.tg": "Telegram'da yozish",
    "order.ig": "Instagram'da yozish",
    "order.email": "Pochta orqali",
    "order.hint.title": "Yozishda shularni ko'rsating",
    "order.hint.1": "Qaysi xizmat kerak (promo video, reklama, multfilm)",
    "order.hint.2": "Maqsad va kimga mo'ljallangan",
    "order.hint.3": "Taxminiy muddat",
    "order.hint.4": "Namuna sifatida yoqqan videolar (bo'lsa)",
    "order.wa.text": "Salom! Video/animatsiya buyurtma bermoqchiman.",
    "order.phone": "Telefon / WhatsApp",

    "about.title": "Men haqimda",
    "about.text": "[TODO: O'zingiz haqingizda 2–3 gap yozing — kimsiz, nima bilan shug'ullanasiz.]",
    "about.profiles": "Mening profillarim",
    "about.animations": "Multfilm animatsiyalar",
    "about.promotions": "SaaS promo va reklama",
    "about.dev": "O'yin va mobil ilova",

    "footer.rights": "Barcha huquqlar himoyalangan."
  },

  /* ============ ENGLISH ============ */
  en: {
    langName: "EN", langLabel: "English", htmlLang: "en",

    "nav.home": "Home",
    "nav.works": "Works",
    "nav.services": "Services",
    "nav.courses": "Courses",
    "nav.order": "Order",
    "nav.about": "About",
    "nav.menu": "Menu",

    "cat.saas": "SaaS promo",
    "cat.ad": "Ad",
    "cat.cartoon": "Cartoon",

    "meta.home.title": "ZOG Projects — SaaS promo videos, ads and cartoon animation",
    "meta.home.desc": "SaaS promo videos, ad videos and cartoon animation. Place an order and we'll turn your project into live video.",
    "meta.works.title": "Works — ZOG Projects",
    "meta.works.desc": "ZOG Projects works: SaaS promo videos, ad videos and cartoon animation.",
    "meta.services.title": "Services — ZOG Projects",
    "meta.services.desc": "SaaS promo video, ad video and cartoon animation services. Pricing depends on the project.",
    "meta.courses.title": "Courses and tutorials — ZOG Projects",
    "meta.courses.desc": "Video and animation courses and tutorials are coming soon. Join the waiting list.",
    "meta.order.title": "Order — ZOG Projects",
    "meta.order.desc": "Order a video or animation: get in touch via WhatsApp or Instagram.",
    "meta.about.title": "About — ZOG Projects",
    "meta.about.desc": "About ZOG Projects: video, animation, games and mobile apps.",

    "hero.badge": "Video · Animation · Development",
    "hero.title": "SaaS promo videos, ads and cartoon animation",
    "hero.sub": "We turn your product or idea into lively video and animation.",
    "hero.cta": "Place an order",
    "hero.cta2": "See works",

    "home.services": "What I do",
    "home.works": "Latest works",
    "home.all": "All",
    "home.courses.title": "Courses and tutorials",
    "home.courses.text": "Coming soon. Join the waiting list to be the first to know.",
    "home.cta.title": "Have a project?",
    "home.cta.text": "Write a few lines — let's discuss the idea together.",

    "works.title": "Works",
    "works.lead": "Video and animation samples. New works are added regularly.",
    "works.watch": "Watch",
    "works.soon": "Coming soon",
    "works.follow": "More works on our Instagram profiles:",

    "services.title": "Services",
    "services.lead": "Pricing depends on the scope and complexity of the project.",
    "services.price": "Price on request",
    "services.saas.title": "SaaS promo video",
    "services.saas.text": "Introduce your app or service in a clear, short video.",
    "services.ad.title": "Ad videos",
    "services.ad.text": "Short, attention-grabbing videos for social media and advertising.",
    "services.cartoon.title": "Cartoon animation",
    "services.cartoon.text": "Characters, story and animation — from idea to finished cartoon.",
    "services.dev.title": "Games and mobile apps",
    "services.dev.text": "The next direction. Updates on Instagram.",
    "services.dev.badge": "Coming soon",
    "services.order": "Place an order",

    "courses.title": "Courses and tutorials",
    "courses.badge": "Coming soon",
    "courses.lead": "Video and animation courses and tutorials are in the works. Join the waiting list and I'll let you know first when they are out.",
    "courses.cta": "Join the waiting list",
    "courses.wa": "Hello! I'd like to join the waiting list for courses and tutorials.",

    "order.title": "Place an order",
    "order.lead": "Write a few lines about your project — I'll reply.",
    "order.wa": "Message on WhatsApp",
    "order.tg": "Message on Telegram",
    "order.ig": "Message on Instagram",
    "order.email": "Send an email",
    "order.hint.title": "Please mention",
    "order.hint.1": "Which service you need (promo video, ad, cartoon)",
    "order.hint.2": "The goal and the audience",
    "order.hint.3": "Approximate deadline",
    "order.hint.4": "Example videos you like (if any)",
    "order.wa.text": "Hello! I'd like to order a video/animation.",
    "order.phone": "Phone / WhatsApp",

    "about.title": "About me",
    "about.text": "[TODO: Write 2–3 sentences about yourself — who you are and what you do.]",
    "about.profiles": "My profiles",
    "about.animations": "Cartoon animation",
    "about.promotions": "SaaS promo and ads",
    "about.dev": "Games and mobile apps",

    "footer.rights": "All rights reserved."
  }
};
