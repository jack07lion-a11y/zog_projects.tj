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
