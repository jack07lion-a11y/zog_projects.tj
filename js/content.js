/* =====================================================================
   ZOG PROJECTS — БАРЧА МАЗМУН ШУ ФАЙЛДА
   Сайтдаги матн, ҳавола ва алоқа маълумотларини фақат шу ерда ўзгартирасиз.
   "TODO" деб белгиланган жойлар — сиз тўлдирадиган плейсхолдерлар.
   ===================================================================== */

/* ---------- 1. УМУМИЙ СОЗЛАМАЛАР ---------- */
window.SITE = {
  name: "ZOG Projects",
  ownerName: "Bilolbek",
  defaultLang: "uz",

  /* Сайт манзили (охирида "/" бўлмасин). Домен уланса, шу ерни ва
     HTML/sitemap/robots'даги манзилни алмаштирасиз (README'га қаранг). */
  url: "https://jack07lion-a11y.github.io/zog_projects.tj",

  /* WhatsApp: фақат рақамлар, "+" ва бўшлиқсиз */
  whatsapp: "992907539527",
  phoneDisplay: "+992 90 753 95 27",

  /* TODO: Телеграм username (@ белгисиз), масалан "zogprojects".
     Бўш қолса, Телеграм тугмаси сайтда кўрсатилмайди. */
  telegram: "",

  /* TODO: Почта (ихтиёрий). Бўш қолса, кўрсатилмайди. */
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
window.WORKS = [
  { cat: "saas",    url: "", thumb: "", title: { uz: "[TODO: Ish nomi]", ru: "[TODO: Название работы]" } },
  { cat: "ad",      url: "", thumb: "", title: { uz: "[TODO: Ish nomi]", ru: "[TODO: Название работы]" } },
  { cat: "cartoon", url: "", thumb: "", title: { uz: "[TODO: Ish nomi]", ru: "[TODO: Название работы]" } },
  { cat: "saas",    url: "", thumb: "", title: { uz: "[TODO: Ish nomi]", ru: "[TODO: Название работы]" } },
  { cat: "ad",      url: "", thumb: "", title: { uz: "[TODO: Ish nomi]", ru: "[TODO: Название работы]" } },
  { cat: "cartoon", url: "", thumb: "", title: { uz: "[TODO: Ish nomi]", ru: "[TODO: Название работы]" } }
];

/* ---------- 3. МАТНЛАР (тиллар) ----------
   Тожик тили қўшиш: "uz" блокни нусхалаб "tg" деб номланг, матнларни
   таржима қилинг ва "langName" ни "TJ" қилинг. Тугма ўзи пайдо бўлади.
   Таржима қилинмаган калитлар ўзбекчада кўринади. */
window.I18N = {

  /* ============ ЎЗБЕКЧА (лотин) ============ */
  uz: {
    langName: "UZ",
    htmlLang: "uz",

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
    "about.text": "[TODO: O'zingiz haqingizda 2–3 gap yozing — kimsiz, nima bilan shug'ullanasiz, nimani yaxshi ko'rasiz.]",
    "about.profiles": "Mening profillarim",
    "about.animations": "Multfilm animatsiyalar",
    "about.promotions": "SaaS promo va reklama",
    "about.dev": "O'yin va mobil ilova",

    "footer.rights": "Barcha huquqlar himoyalangan.",
    "footer.contact": "Aloqa"
  },

  /* ============ РУСЧА ============ */
  ru: {
    langName: "RU",
    htmlLang: "ru",

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
    "about.text": "[TODO: Напишите о себе 2–3 предложения — кто вы, чем занимаетесь, что любите.]",
    "about.profiles": "Мои профили",
    "about.animations": "Мультипликация",
    "about.promotions": "SaaS промо и реклама",
    "about.dev": "Игры и мобильные приложения",

    "footer.rights": "Все права защищены.",
    "footer.contact": "Контакты"
  }
};
