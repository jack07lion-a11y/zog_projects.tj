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
  /* Тиллар рўйхати. Янги тил қўшиш: бу ерга қатор қўшинг ва js/i18n/<код>.js файл яратинг. */
  langs: [
    { code: "tg", name: "TJ", label: "Тоҷикӣ",   htmlLang: "tg" },
    { code: "ru", name: "RU", label: "Русский",  htmlLang: "ru" },
    { code: "uz", name: "UZ", label: "Oʻzbekcha", htmlLang: "uz" },
    { code: "en", name: "EN", label: "English",  htmlLang: "en" }
  ],
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

/* ---------- 2. ИШЛАР (Анимация ва Промоушн саҳифаларидаги карточкалар) ----------
     cat   — "cartoon" (Анимация саҳифасига) | "saas" ёки "ad" (Промоушн саҳифасига)
     url   — YouTube/Instagram ҳавола ("" бўлса "Тез орада" чиқади)
     thumb — расм йўли, масалан "assets/works/1.jpg" ("" бўлса градиент чиқади)
     title — ҳар тилда номи
   Янги иш қўшиш учун бирор қаторни нусхалаб, ўзгартиринг. */
(function () {
  var T = { tg: "[TODO: Номи]", ru: "[TODO: Название работы]", uz: "[TODO: Ish nomi]", en: "[TODO: Work title]" };
  window.WORKS = [
    { cat: "cartoon", url: "", thumb: "", title: T },
    { cat: "cartoon", url: "", thumb: "", title: T },
    { cat: "saas",    url: "", thumb: "", title: T },
    { cat: "ad",      url: "", thumb: "", title: T }
  ];

  /* ---------- 3. ЎЙИНЛАР КАТАЛОГИ (Dev & Game саҳифасида) ----------
     url — ўйин ҳаволаси ("" бўлса "Тез орада" чиқади). Қўшиш: қатор нусхалаб ўзгартиринг. */
  var G = { tg: "[TODO: Номи бозӣ]", ru: "[TODO: Название игры]", uz: "[TODO: O'yin nomi]", en: "[TODO: Game title]" };
  window.GAMES = [
    { url: "", thumb: "", title: G },
    { url: "", thumb: "", title: G }
  ];
})();

/* ---------- 4. ҚЎЛЛАР (бош саҳифадаги 3 та 3D қўл ва уларнинг иконкалари) ----------
   Жойлашув "саҳна" (экран) бўйича фоизларда. Уларни муҳаррир (артефакт) орқали созлаб,
   чиққан кодни шу ерга қўясиз.
     ar — расмнинг эни/бўйи нисбати (юкланишдан олдин жойни ҳисоблаш учун)
     src, srcset — қўл расми (3 хил ўлчам: интернет секин бўлса, браузер ўзи кичигини танлайди)
     x, y — қўл марказининг жойи (саҳна эни/бўйининг %), w — қўл эни (саҳна энининг %)
     r — бурилиш (градус), f — 1 бўлса, ойнадек акс эттирилади, z — қайси қўл устида туради
     fx, fy — учиб киришни бошлайдиган жой (саҳна ўлчамининг %)
     panel — қўлдан ип билан осилган иконка: icon (anim | promo | dev), glyph (иконка ичидаги чизма: шаффоф расм), href (босилса қаерга боради), k (номи),
             ax, ay — ипнинг биринчи боғланадиган жойи (кўрсаткич бармоқ учи), bx, by — иккинчиси (бош бармоқ учи)
             (иккаласи ҳам қўл расми ўлчамининг %),
             open — қўлнинг очиқ томони (бирлик вектор): иконка шу томонга сал чиқиб туради,
             pw — иконка эни (қўл расми энининг %), rot — иконканинг бошланғич эгилиши (градус) */
window.HANDS_SIZES = "(min-aspect-ratio: 1/1) 52vh, 104vw";
window.HANDS = {
  h1: { ar: 1.2565, src: "assets/hands/hand1-v2.webp", srcset: "assets/hands/hand1-v2-600.webp 600w, assets/hands/hand1-v2-900.webp 900w, assets/hands/hand1-v2.webp 1200w",
        x: 33.9, y: 47.9, w: 103.1, r: 0, f: 0, z: 2, fx: -110, fy: 0,
        panel: { icon: "anim", glyph: "assets/icons/anim-v1.webp", href: "animation.html", k: "nav.anim", ax: 89.8, ay: 34.9, bx: 88.7, by: 63.8, open: [0.98, -0.18], pw: 21, rot: -6 } },
  h2: { ar: 1.2207, src: "assets/hands/hand2-v2.webp", srcset: "assets/hands/hand2-v2-600.webp 600w, assets/hands/hand2-v2-900.webp 900w, assets/hands/hand2-v2.webp 1200w",
        x: 68.3, y: 9.5, w: 101.9, r: 0, f: 0, z: 1, fx: 70, fy: -90,
        panel: { icon: "promo", glyph: "assets/icons/promo-v1.webp", href: "promotion.html", k: "nav.promo", ax: 12.7, ay: 63.4, bx: 29.4, by: 82.8, open: [-0.8, 0.6], pw: 21, rot: 8 } },
  h3: { ar: 1.2097, src: "assets/hands/hand3-v2.webp", srcset: "assets/hands/hand3-v2-600.webp 600w, assets/hands/hand3-v2-900.webp 900w, assets/hands/hand3-v2.webp 1200w",
        x: 71.5, y: 86.2, w: 102, r: 0, f: 0, z: 3, fx: 70, fy: 90,
        panel: { icon: "dev", glyph: "assets/icons/dev-v1.webp", href: "dev.html", k: "nav.dev", ax: 10.8, ay: 22.2, bx: 9.6, by: 52.2, open: [-0.92, -0.39], pw: 21, rot: -8 } }
};

/* ---------- 5. ИЧКИ САҲНАЛАР РАСМЛАРИ (олдиндан юкланади) ----------
   Promotion саҳнасидаги қўғирчоқбоз қўли. anchors — иплар боғланадиган бармоқ учлари (расм ўлчамининг %):
   pinky — кичик бармоқ, middle — ўрта, index — кўрсаткич, thumb — бош бармоқ. */
window.SCENE_ASSETS = {
  /* Animation: футболчи кадрлари (3 та варақ, ҳар бири 4×2 = 8 кадр) ва тўп. launch — тепиш кадридаги тўпнинг жойи (кадр ўлчамига нисбатан) */
  anim: {
    list: ["assets/anim/run-v1.webp", "assets/anim/dribble-v1.webp", "assets/anim/kick-v1.webp", "assets/anim/ball-v1.webp"],
    launch: { x: 0.8002, y: 0.1101, r: 0.0631 }
  },
  promo: {
    ar: 1.1873, sizes: "(min-aspect-ratio: 1/1) 52vh, 104vw",
    src: "assets/promo/hand-v1.webp",
    srcset: "assets/promo/hand-v1-600.webp 600w, assets/promo/hand-v1-900.webp 900w, assets/promo/hand-v1.webp 1200w",
    anchors: { pinky: [7.5, 81.4], middle: [30.0, 68.7], index: [55.8, 61.0], thumb: [91.7, 74.3] }
  }
};
