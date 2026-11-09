/* Умумий ядро: тил, меню, анимация, ёрдамчи қисмлар. Мазмунни бу ерда ўзгартирманг —
   js/content.js (ҳавола, ишлар) ва js/i18n/*.js (матнлар) да ўзгартиринг. */
(function () {
  "use strict";
  var S = window.SITE || {}, Z = window.Z = { S: S };
  /* Версия: шу файл ҳаволасидаги ?v=... ни тил файлларига ҳам беради (кэш аралашмасин) */
  var VER = "";
  try { var m = /[?&]v=([^&]+)/.exec(document.currentScript.src); VER = m ? "?v=" + m[1] : ""; } catch (e) {}
  /* Эски кэшланган content.js бўлса ҳам сайт ишласин */
  S.langs = S.langs || [
    { code: "tg", name: "TJ", label: "Тоҷикӣ", htmlLang: "tg" }, { code: "ru", name: "RU", label: "Русский", htmlLang: "ru" },
    { code: "uz", name: "UZ", label: "Oʻzbekcha", htmlLang: "uz" }, { code: "en", name: "EN", label: "English", htmlLang: "en" }
  ];
  S.defaultLang = S.defaultLang || "tg"; S.fallbackLang = S.fallbackLang || "en";
  S.instagram = S.instagram || {}; S.whatsapp = S.whatsapp || "992907539527"; S.name = S.name || "ZOG Projects";
  Z.ver = VER;
  var loaded = {};
  Z.hooks = [];
  Z.onRender = function (fn) { Z.hooks.push(fn); };
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NAV = [
    ["home", "index.html", "nav.home"],
    ["anim", "animation.html", "nav.anim"],
    ["promo", "promotion.html", "nav.promo"],
    ["dev", "dev.html", "nav.dev"],
    ["courses", "courses.html", "nav.courses"],
    ["order", "order.html", "nav.order"]
  ];
  var codes = S.langs.map(function (l) { return l.code; });
  function langMeta(code) { return S.langs.filter(function (l) { return l.code === code; })[0] || S.langs[0]; }

  /* ---------- Тил ---------- */
  function regionLang() {
    var tz = "";
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
    if (!tz) return S.defaultLang;
    var R = S.regionLang || {};
    for (var l in R) { if (codes.indexOf(l) > -1 && R[l].indexOf(tz) > -1) return l; }
    return codes.indexOf(S.fallbackLang) > -1 ? S.fallbackLang : S.defaultLang;
  }
  function pickLang() {
    try {
      var q = new URLSearchParams(location.search).get("lang");
      if (q && codes.indexOf(q) > -1) return q;
      var s = localStorage.getItem("lang");
      if (s && codes.indexOf(s) > -1) return s;
    } catch (e) {}
    return regionLang();
  }
  var lang = pickLang();

  /* Тил файли фақат керак бўлганда юкланади */
  function loadLang(l) {
    return new Promise(function (resolve) {
      if (loaded[l]) return resolve(l);
      var s = document.createElement("script");
      s.src = "js/i18n/" + l + ".js" + VER;
      s.onload = function () { loaded[l] = true; resolve(l); };
      s.onerror = function () {
        if (l !== S.defaultLang) loadLang(S.defaultLang).then(resolve); else resolve(l);
      };
      document.head.appendChild(s);
    });
  }
  function t(k) {
    var d = (window.I18N || {})[lang];
    return d && d[k] !== undefined ? d[k] : k;
  }
  Z.t = t;
  function setLang(l) {
    loadLang(l).then(function (ok) {
      lang = (window.I18N && window.I18N[ok]) ? ok : lang;
      try { localStorage.setItem("lang", lang); } catch (e) {}
      render(true);
    });
  }

  /* ---------- Ёрдамчилар ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  Z.esc = esc;
  Z.waLink = function (text) { return "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(text); };
  function tgLink() { return S.telegram ? "https://t.me/" + S.telegram.replace(/^@/, "") : ""; }
  function igHandle(url) { return "@" + url.replace(/\/+$/, "").split("/").pop(); }

  var A = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  var ICON = Z.ICON = {
    saas: '<svg viewBox="0 0 24 24" ' + A + '><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/><path d="m10 8.5 4 2-4 2z"/></svg>',
    ad: '<svg viewBox="0 0 24 24" ' + A + '><path d="M3 11v3a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12"/></svg>',
    cartoon: '<svg viewBox="0 0 24 24" ' + A + '><circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0"/><path d="M9 9.5h.01M15 9.5h.01"/></svg>',
    dev: '<svg viewBox="0 0 24 24" ' + A + '><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>',
    game: '<svg viewBox="0 0 24 24" ' + A + '><rect x="2" y="7" width="20" height="11" rx="5.5"/><path d="M7 10.5v4M5 12.5h4M16 11.5h.01M18.5 13.5h.01"/></svg>',
    code: '<svg viewBox="0 0 24 24" ' + A + '><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12"/></svg>',
    browser: '<svg viewBox="0 0 24 24" ' + A + '><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/></svg>',
    book: '<svg viewBox="0 0 24 24" ' + A + '><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5M9 8h6"/></svg>',
    playc: '<svg viewBox="0 0 24 24" ' + A + '><circle cx="12" cy="12" r="9"/><path d="m10 8.5 5.5 3.5-5.5 3.5z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" ' + A + '><path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-.8.7a3.5 3.5 0 0 1-1.9-1.9l.7-.8-1-2z"/></svg>',
    tg: '<svg viewBox="0 0 24 24" ' + A + '><path d="M21 4 3 11l5 2 2 6 3-4 5 4z"/><path d="m8 13 9-6"/></svg>',
    ig: '<svg viewBox="0 0 24 24" ' + A + '><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>',
    mail: '<svg viewBox="0 0 24 24" ' + A + '><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    globe: '<svg viewBox="0 0 24 24" ' + A + '><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 24 24" ' + A + '><path d="m6 9 6 6 6-6"/></svg>',
    go: '<svg viewBox="0 0 24 24" ' + A + '><path d="m9 6 6 6-6 6"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path d="M6 4l14 8-14 8z"/></svg>',
    burger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path class="l1" d="M4 7h16"/><path class="l2" d="M4 12h16"/><path class="l3" d="M4 17h16"/></svg>'
  };

  /* Катта вектор иконкалар (3 та категория учун) */
  var C = "#fde5c0", O = "#ff9a2b";
  Z.BIG = {
    anim: '<svg viewBox="0 0 64 64" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<rect x="8" y="12" width="48" height="40" rx="13" stroke="' + C + '" stroke-width="3.2"/>' +
      '<path d="M27 23 44 32 27 41z" fill="' + O + '" stroke="' + O + '" stroke-width="4.5"/></svg>',
    promo: '<svg viewBox="0 0 64 64" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M13 15 44 22 20 38 51 50" stroke="' + C + '" stroke-width="3.2"/>' +
      '<circle cx="13" cy="15" r="5.5" fill="' + O + '"/><circle cx="44" cy="22" r="5.5" fill="' + O + '"/>' +
      '<circle cx="20" cy="38" r="5.5" fill="' + O + '"/><circle cx="51" cy="50" r="5.5" fill="' + O + '"/></svg>',
    dev: '<svg viewBox="0 0 64 64" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="32" cy="12" r="7" fill="' + O + '"/>' +
      '<path d="M32 19v15" stroke="' + C + '" stroke-width="3.2"/>' +
      '<rect x="7" y="34" width="50" height="22" rx="9" stroke="' + C + '" stroke-width="3.2"/>' +
      '<path d="m23 41-5 4 5 4M41 41l5 4-5 4M35 39l-6 12" stroke="' + O + '" stroke-width="2.6"/></svg>'
  };

  /* ---------- Қайта ишлатиладиган қисмлар ---------- */
  var ORDER_ICON = { anim: "cartoon", saas: "saas", ad: "ad", game: "game", app: "dev", webapp: "code", site: "browser" };
  Z.opt = function (o) {
    var ext = /^https?:/.test(o.href);
    return '<a class="opt" href="' + esc(o.href) + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + '>' +
      '<span class="opt-ic">' + ICON[o.icon] + '</span><span class="opt-tx"><b>' + esc(t(o.title)) + "</b><small>" + esc(t(o.desc)) +
      '</small></span><span class="opt-go">' + ICON.go + "</span></a>";
  };
  Z.orderOpt = function (k) { return Z.opt({ href: Z.waLink(t("wa." + k)), icon: ORDER_ICON[k], title: "opt.order." + k, desc: "opt.desc.order" }); };
  Z.courseOpt = function (k) { return Z.opt({ href: Z.waLink(t("wa.course." + k)), icon: "book", title: "opt.course." + k, desc: "opt.desc.course" }); };
  Z.watchOpt = function (url, title) { return Z.opt({ href: url, icon: "playc", title: title, desc: "opt.desc.watch" }); };
  Z.grid = function (items) { return '<section><div class="wrap"><div class="grid cols-2">' + items.join("") + "</div></div></section>"; };

  Z.catHead = function (big, titleKey, leadKey) {
    return '<div class="page-head"><div class="wrap"><div class="cat-head"><span class="cat-ic">' + big + "</span><h1>" + esc(t(titleKey)) + "</h1></div><p>" + esc(t(leadKey)) + "</p></div></div>";
  };

  function workCard(w, actionKey) {
    var title = esc(w.title[lang] || w.title[S.defaultLang] || "");
    var thumb = w.thumb ? '<img src="' + esc(w.thumb) + '" alt="' + title + '" loading="lazy" decoding="async">' : "";
    var inner =
      '<div class="thumb">' + thumb + '<span class="play">' + ICON.play + "</span></div>" +
      '<div class="meta"><span class="cat">' + esc(t("cat." + w.cat)) + '</span><span class="name">' + title + "</span>" +
      '<span class="state">' + esc(w.url ? t(actionKey) + " →" : t("works.soon")) + "</span></div>";
    return w.url
      ? '<a class="work" data-cat="' + w.cat + '" href="' + esc(w.url) + '" target="_blank" rel="noopener">' + inner + "</a>"
      : '<div class="work" data-cat="' + w.cat + '">' + inner + "</div>";
  }
  Z.worksSection = function (cats) {
    var list = (window.WORKS || []).filter(function (w) { return cats.indexOf(w.cat) > -1; });
    if (!list.length) return "";
    return '<section><div class="wrap"><div class="sec-head"><h2>' + esc(t("sec.works")) + '</h2></div><div class="grid cols-3">' +
      list.map(function (w) { return workCard(w, "works.watch"); }).join("") + "</div></div></section>";
  };
  Z.gamesSection = function () {
    var list = (window.GAMES || []).map(function (g) { return { cat: "game", url: g.url, thumb: g.thumb, title: g.title }; });
    if (!list.length) return "";
    return '<section id="games"><div class="wrap"><div class="sec-head"><h2>' + esc(t("sec.games")) + '</h2></div><div class="grid cols-3">' +
      list.map(function (w) { return workCard(w, "games.play"); }).join("") + "</div></div></section>";
  };

  Z.contactButtons = function (withIg) {
    var h = '<a class="btn primary block" href="' + Z.waLink(t("order.wa.text")) + '" target="_blank" rel="noopener">' + ICON.wa + esc(t("order.wa")) + "</a>";
    if (tgLink()) h += '<a class="btn block" href="' + tgLink() + '" target="_blank" rel="noopener">' + ICON.tg + esc(t("order.tg")) + "</a>";
    if (withIg) h += '<a class="btn block" href="' + S.instagram.promotions + '" target="_blank" rel="noopener">' + ICON.ig + esc(t("order.ig")) + "</a>";
    if (withIg && S.email) h += '<a class="btn block" href="mailto:' + esc(S.email) + '">' + ICON.mail + esc(t("order.email")) + "</a>";
    return h;
  };
  Z.profileCards = function () {
    return ["animations", "promotions", "dev"].map(function (p) {
      var url = S.instagram[p];
      return '<a class="card profile" href="' + url + '" target="_blank" rel="noopener"><div class="icon">' + ICON.ig + "</div><div><h3>" +
        esc(t("about." + p)) + '</h3><span class="handle">' + esc(igHandle(url)) + "</span></div></a>";
    }).join("");
  };
  Z.waitlistBtn = function (block) {
    return '<a class="btn primary' + (block ? " block" : "") + '" href="' + Z.waLink(t("courses.wa")) + '" target="_blank" rel="noopener">' + ICON.wa + esc(t("courses.cta")) + "</a>";
  };

  /* ---------- Header / Footer ---------- */
  function renderHeader() {
    var links = NAV.map(function (p) {
      return '<a href="' + p[1] + '"' + (p[0] === Z.page ? ' class="active" aria-current="page"' : "") + ">" + esc(t(p[2])) + "</a>";
    }).join("");
    var items = S.langs.map(function (l) {
      return '<li role="none"><button type="button" role="menuitemradio" aria-checked="' + (l.code === lang) + '" data-lang="' + l.code + '">' +
        esc(l.label) + '<span class="code">' + esc(l.name) + "</span></button></li>";
    }).join("");
    document.getElementById("site-header").innerHTML =
      '<div class="wrap bar">' +
      '<a class="logo" href="index.html" aria-label="' + esc(S.name) + '"><img src="assets/icon-192.png" alt="" width="38" height="38"><b><span>ZOG</span> Projects</b></a>' +
      '<nav class="nav" aria-label="Main">' + links + "</nav>" +
      '<div class="lang"><button class="lang-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Language">' +
      ICON.globe + esc(langMeta(lang).name) + ICON.chev + '</button><ul class="lang-menu" role="menu">' + items + "</ul></div>" +
      '<button class="burger" type="button" aria-label="' + esc(t("nav.menu")) + '" aria-expanded="false" aria-controls="drawer">' + ICON.burger + "</button>" +
      "</div>" +
      '<nav class="drawer" id="drawer" aria-label="Menu">' + links + "</nav>";

    var drawer = document.getElementById("drawer");
    var burger = document.querySelector(".burger");
    var box = document.querySelector(".lang");
    var lbtn = document.querySelector(".lang-btn");
    burger.addEventListener("click", function () {
      box.classList.remove("open"); lbtn.setAttribute("aria-expanded", "false");
      var open = drawer.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    lbtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = box.classList.toggle("open");
      lbtn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) { drawer.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
    });
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });
  }

  function renderFooter() {
    var ig = S.instagram;
    var contacts =
      '<a href="about.html">' + esc(t("nav.about")) + "</a>" +
      '<a href="' + Z.waLink(t("order.wa.text")) + '" target="_blank" rel="noopener">WhatsApp</a>' +
      (tgLink() ? '<a href="' + tgLink() + '" target="_blank" rel="noopener">Telegram</a>' : "") +
      ["animations", "promotions", "dev"].map(function (k) {
        return '<a href="' + ig[k] + '" target="_blank" rel="noopener">' + esc(igHandle(ig[k])) + "</a>";
      }).join("");
    document.getElementById("site-footer").innerHTML =
      '<div class="wrap foot"><div>© ' + new Date().getFullYear() + " " + esc(S.name) + ". " + esc(t("footer.rights")) +
      '</div><div class="links">' + contacts + "</div></div>";
  }

  /* ---------- SEO (тилга қараб) ---------- */
  function setMeta(sel, val) { var el = document.querySelector(sel); if (el) el.setAttribute("content", val); }
  function updateMeta() {
    var title = t("meta." + Z.page + ".title"), desc = t("meta." + Z.page + ".desc");
    document.title = title;
    document.documentElement.lang = langMeta(lang).htmlLang;
    setMeta('meta[name="description"]', desc);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', desc);
  }

  /* ---------- Силлиқ пайдо бўлиш ---------- */
  var io = null;
  function setupReveal(instant) {
    if (instant || reduce || !("IntersectionObserver" in window)) return;
    var sel = ".hero-text > *, .page-head .wrap > *, .sec-head, .ask, .tile, .opt, .card, .work, .cta-box, .stack .btn, .hint, .phone";
    var els = Array.prototype.slice.call(document.querySelectorAll("#app " + sel));
    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.08 });
    els.forEach(function (el) {
      var idx = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.setProperty("--d", Math.min(idx, 5) * 70 + "ms");
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  function safeView() {
    try { return Z.views[Z.page](); }
    catch (err) { return '<div class="wrap" style="padding:30px 16px"><b>Xato / Ошибка:</b> ' + esc(err && err.message || err) + "</div>"; }
  }
  function playApp(cls, ms) {
    var app = document.getElementById("app");
    app.classList.remove("enter", "swap", "opening");
    if (reduce) return;
    void app.offsetWidth;
    app.classList.add(cls);
    setTimeout(function () { app.classList.remove(cls); }, ms);
  }

  /* ---------- Категория "пуфаклари" (чап/ўнг чеккада) ---------- */
  var CATS = {
    anim: { href: "animation.html", big: "anim", label: "nav.anim" },
    promo: { href: "promotion.html", big: "promo", label: "nav.promo" },
    dev: { href: "dev.html", big: "dev", label: "nav.dev" }
  };
  var ORDERC = ["anim", "promo", "dev"];
  var slots = null, switching = false;
  function initDock(p) {
    if (!CATS[p] || Z.noDock) { slots = null; document.body.classList.remove("has-dock"); return; }
    slots = ORDERC.filter(function (c) { return c !== p; });
    document.body.classList.add("has-dock");
  }
  function bubHTML(i) {
    var c = CATS[slots[i]], label = esc(t(c.label));
    return '<a class="bub ' + (i ? "r" : "l") + '" href="' + c.href + '" data-dock="' + slots[i] + '" aria-label="' + label + '" title="' + label + '">' + Z.BIG[c.big] + "</a>";
  }
  function renderDock() {
    var d = document.getElementById("dock");
    if (!slots) { if (d) d.remove(); return; }
    if (!d) {
      d = document.createElement("nav"); d.id = "dock"; d.className = "dock"; d.setAttribute("aria-label", "Categories");
      document.body.appendChild(d);
    }
    d.innerHTML = bubHTML(0) + bubHTML(1);
  }
  function renderAll() {
    renderHeader();
    document.getElementById("app").innerHTML = safeView();
    renderFooter(); renderDock(); updateMeta();
  }
  function render(fromLang) {
    Z.fromLang = !!fromLang;
    renderAll();
    playApp(fromLang ? "swap" : "enter", 900);
    setupReveal(!!fromLang);
    Z.hooks.forEach(function (fn) { try { fn(); } catch (e) {} });
  }

  /* Категориялар орасида силлиқ ўтиш: эскиси пуфак ўрнига "йиғилади", янгиси ўша жойдан "очилади" */
  function switchCat(to) {
    var from = Z.page;
    if (!slots || !CATS[to] || to === from || switching) return;
    var i = slots.indexOf(to); if (i < 0) return;
    var app = document.getElementById("app");
    var bub = document.querySelector('.bub[data-dock="' + to + '"]');
    function swap() {
      slots[i] = from; Z.page = to;
      try { history.pushState({ cat: to }, "", CATS[to].href); } catch (e) {}
      window.scrollTo(0, 0);
      renderHeader();
      app.innerHTML = safeView();
      renderFooter(); updateMeta();
      var side = ".bub." + (i ? "r" : "l"), el = document.querySelector(side);
      if (el) { el.outerHTML = bubHTML(i); el = document.querySelector(side); if (el && !reduce) el.classList.add("pop"); }
    }
    if (reduce || !bub) { swap(); return; }
    switching = true;
    var r = bub.getBoundingClientRect(), ar = app.getBoundingClientRect();
    app.style.transformOrigin = (r.left + r.width / 2 - ar.left) + "px " + (r.top + r.height / 2 - ar.top) + "px";
    bub.classList.add("launch");
    app.classList.remove("enter", "swap", "opening");
    app.classList.add("closing");
    setTimeout(function () {
      swap();
      app.classList.remove("closing");
      playApp("opening", 700);
      switching = false;
    }, 330);
  }
  /* Кутилмаган хато бўлса, экранда кўрсатамиз (тузатиш осон бўлсин) */
  window.addEventListener("error", function (e) {
    var app = document.getElementById("app");
    if (app && !app.children.length || (app && !document.querySelector("#app .wrap, #app section"))) {
      app.innerHTML = '<div class="wrap" style="padding:30px 16px"><b>Xato / Ошибка:</b> ' + esc(e.message || "script") + "</div>";
    }
  });

  /* Расмлар тўлиқ юкланиб, декодланмагунча кутади; юкланмаса (интернет йўқ) тикланганда ўзи қайта уринади */
  Z.waitImages = function (imgs, cb) {
    var left = imgs.length;
    if (!left) { cb(); return; }
    function one() { if (--left === 0) cb(); }
    imgs.forEach(function (img) {
      var attempt = 0, done = false, timer = 0;
      function start() {
        var ss = img.getAttribute("data-srcset") || "", sr = img.getAttribute("data-src") || "";
        if (attempt) { ss = ss.replace(/\.webp(\s|$)/g, ".webp?r=" + attempt + "$1"); sr = sr.replace(/\.webp$/, ".webp?r=" + attempt); }
        if (ss) img.srcset = ss;
        img.src = sr;
      }
      function ok() { if (done) return; done = true; (img.decode ? img.decode().catch(function () {}) : Promise.resolve()).then(one); }
      function fail() {
        if (done) return; clearTimeout(timer); attempt++;
        var go = function () { window.removeEventListener("online", go); clearTimeout(timer); if (!done) start(); };
        window.addEventListener("online", go); timer = setTimeout(go, Math.min(1500 * attempt, 8000));
      }
      img.addEventListener("load", ok); img.addEventListener("error", fail); start();
    });
  };

  /* ---------- Умумий сенсорлар (бармоқ/сичқонча, телефон эгилиши, силкиниши) ---------- */
  var sens = Z.sensors = { tx: 0, ty: 0, ax: 0, ay: 0, at: 0, got: false };
  var mgx = 0, mgy = 0;
  function nclamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  window.addEventListener("pointermove", function (e) { if (reduce) return; sens.tx = (e.clientX / window.innerWidth - 0.5) * 2; sens.ty = (e.clientY / window.innerHeight - 0.5) * 2; }, { passive: true });
  window.addEventListener("deviceorientation", function (e) { if (reduce || e.gamma == null) return; sens.tx = nclamp(e.gamma / 22, -1, 1); sens.ty = nclamp((e.beta - 45) / 22, -1, 1); }, { passive: true });
  function screenVec(dx, dy) {                       /* қурилма координаталари → экран (ориентацияга қараб) */
    var ang = (screen.orientation && typeof screen.orientation.angle === "number") ? screen.orientation.angle : (window.orientation || 0);
    ang = ((ang % 360) + 360) % 360;
    if (ang === 90) return [-dy, -dx];
    if (ang === 180) return [-dx, dy];
    if (ang === 270) return [dy, dx];
    return [dx, -dy];
  }
  window.addEventListener("devicemotion", function (e) {
    if (reduce) return;
    var a = e.acceleration, ag = e.accelerationIncludingGravity, dx, dy;
    if (a && a.x != null) { dx = a.x; dy = a.y; }
    else if (ag && ag.x != null) { mgx = mgx * 0.9 + ag.x * 0.1; mgy = mgy * 0.9 + ag.y * 0.1; dx = ag.x - mgx; dy = ag.y - mgy; }
    else return;
    var v = screenVec(dx, dy);
    sens.ax = nclamp(v[0] * 115, -2600, 2600); sens.ay = nclamp(v[1] * 115, -2600, 2600); sens.at = performance.now(); sens.got = true;
  }, { passive: true });
  /* Силкиниш кучи: янги маълумот келмаса, секин нолга тушади */
  Z.shake = function (now) { var d = now - sens.at, k = d > 90 ? Math.exp(-(d - 90) / 1000 * 14) : 1; return { x: sens.ax * k, y: sens.ay * k }; };

  /* ---------- Саҳналар (Home, Promotion, Animation, Code) орасида битта саҳифадек ўтиш ----------
     Ҳар саҳна алоҳида HTML ва кичик скриптда, лекин ўтишда саҳифа қайта юкланмайди. */
  var SCENES = {
    home: { href: "index.html", scripts: ["js/hands.js", "js/pages/home.js"] },
    anim: { href: "animation.html", scripts: ["js/pages/anim.js"] },
    promo: { href: "promotion.html", scripts: ["js/pages/promo.js"] },
    dev: { href: "dev.html", scripts: ["js/pages/dev.js"] }
  };
  Z.SCENES = SCENES; Z.exits = {};
  Z.depth = (history.state && history.state.d) || 0;        /* нечта саҳна ўтиши (pushState) қилинган: орқага қайтиш учун */
  Z.pullOffset = 0;
  var loadedScripts = {}, navBusy = false;
  function loadScript(src) {
    if (loadedScripts[src]) return loadedScripts[src];
    if (document.querySelector('script[src^="' + src + '"]')) return (loadedScripts[src] = Promise.resolve());
    loadedScripts[src] = new Promise(function (res, rej) {
      var el = document.createElement("script"); el.src = src + (Z.ver || ""); el.onload = res;
      el.onerror = function () { delete loadedScripts[src]; rej(); }; document.head.appendChild(el);
    });
    return loadedScripts[src];
  }
  function sceneByHref(h) {
    var name = String(h || "").split("#")[0].split("?")[0].split("/").pop();
    if (name === "" || name === ".") name = "index.html";
    for (var k in SCENES) { if (SCENES[k].href === name) return k; }
    return null;
  }
  function renderScene() {
    Z.fromLang = false; initDock(Z.page);
    renderHeader();
    var app = document.getElementById("app");
    app.classList.remove("enter", "swap", "opening");
    app.innerHTML = safeView();
    renderFooter(); renderDock(); updateMeta();
    Z.hooks.forEach(function (fn) { try { fn(); } catch (e) {} });
  }
  function warmScene(to) {                                   /* келаётган саҳна расмини олдиндан декодлаймиз (чиқиш анимацияси давомида) */
    var a = (window.SCENE_ASSETS || {})[to]; if (!a) return;
    try {
      (a.list || [a.src]).forEach(function (u) {
        var im = new Image(); if (a.srcset) { im.sizes = a.sizes; im.srcset = a.srcset; } im.src = u;
        if (im.decode) im.decode().catch(function () {});
      });
    } catch (e) {}
  }
  Z.nav = function (to, opts) {
    opts = opts || {};
    var from = Z.page;
    if (!SCENES[to] || !SCENES[from] || to === from || navBusy) return false;
    navBusy = true; warmScene(to);
    function go() {
      Promise.all(SCENES[to].scripts.map(loadScript)).then(function () {
        Z.page = to;
        if (!opts.pop) { try { history.pushState({ scene: to, d: Z.depth + 1 }, "", SCENES[to].href); Z.depth += 1; } catch (e) {} }
        window.scrollTo(0, 0);
        renderScene(); navBusy = false;
      }, function () { navBusy = false; location.href = SCENES[to].href; });
    }
    var ex = Z.exits[from];
    if (ex && !reduce) ex(go, { to: to, from: from }); else go();
    return true;
  };
  /* Орқага (бош саҳнага) қайтиш: тарих бўлса, браузернинг "орқага"си, бўлмаса — тўғридан-тўғри */
  Z.back = function () { if (Z.depth > 0) { try { history.back(); return; } catch (e) {} } Z.nav("home"); };

  /* Тепага тортиш ишораси: root да бармоқ/сичқонча билан тепага суриш, ғилдирак ёки тугма (ArrowUp) — mover тепага кетади.
     Етарлича тортилса — onComplete (одатда Z.back); бўлмаса пружинадек жойига қайтади. Ҳеч қандай кўринадиган тугма йўқ. */
  Z.pull = function (root, mover, opts) {
    opts = opts || {};
    var st = null, moved = false, lastMove = 0, off = 0, lastY = 0, lastT = 0, vel = 0, wacc = 0, wt = 0, enabled = !!opts.enabled;
    function H() { return root.clientHeight || window.innerHeight; }
    function apply(o) { off = o; Z.pullOffset = o; mover.style.transition = "none"; mover.style.transform = "translate3d(0," + o.toFixed(1) + "px,0)"; }
    function spring() {
      off = 0; Z.pullOffset = 0; mover.style.transition = "transform .75s cubic-bezier(.34,1.5,.64,1)"; mover.style.transform = "translate3d(0,0,0)";
      setTimeout(function () { mover.style.transition = ""; }, 800);
    }
    function complete() { enabled = false; (opts.onComplete || Z.back)(); }
    root.addEventListener("pointerdown", function (e) {
      if (!enabled || e.button) return;
      st = { y: e.clientY }; moved = false; vel = 0; lastY = e.clientY; lastT = performance.now();
    });
    root.addEventListener("pointermove", function (e) {
      if (!st) return;
      var dy = e.clientY - st.y;
      if (!moved) { if (Math.abs(dy) < 10) return; if (dy > 0) { st = null; return; } moved = true; try { root.setPointerCapture(e.pointerId); } catch (x) {} }
      var now = performance.now(); if (now > lastT) vel = (e.clientY - lastY) / (now - lastT); lastY = e.clientY; lastT = now;
      apply(dy < 0 ? dy : dy * 0.18);                  /* тепага — эркин, пастга — қаршилик */
    });
    function up() {
      if (!st) return; st = null;
      if (!moved) return;
      lastMove = performance.now();
      if (off < -H() * 0.2 || (vel < -0.7 && off < -40)) complete(); else spring();
    }
    root.addEventListener("pointerup", up); root.addEventListener("pointercancel", up);
    root.addEventListener("click", function (e) { if (moved || performance.now() - lastMove < 350) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    root.addEventListener("wheel", function (e) {
      if (!enabled) return;
      if (e.deltaY <= 0 && off >= 0) return;
      e.preventDefault();
      wacc = Math.max(-H() * 0.7, Math.min(0, wacc - e.deltaY)); apply(wacc);
      clearTimeout(wt); wt = setTimeout(function () { if (off < -H() * 0.16) complete(); else { wacc = 0; spring(); } }, 170);
    }, { passive: false });
    return {
      enable: function () { enabled = true; },
      key: function () { if (!enabled) return; apply(-H() * 0.25); complete(); }          /* ArrowUp / Backspace / Escape */
    };
  };

  window.addEventListener("popstate", function (ev) {
    Z.depth = (ev.state && typeof ev.state.d === "number") ? ev.state.d : 0;
    var to = sceneByHref(location.pathname);
    if (to && SCENES[Z.page]) { if (to !== Z.page) Z.nav(to, { pop: true }); }
    else location.reload();
  });

  /* Ҳар саҳифа скрипти ўз кўринишини шу ерда рўйхатдан ўтказади */
  Z.views = {};
  Z.register = function (page, view) { Z.views[page] = view; };
  function boot() {
    var p = document.body.getAttribute("data-page");
    if (!Z.views[p]) return;
    Z.page = p; initDock(p);
    loadLang(lang).then(function (ok) { lang = ok; render(false); });
  }
  /* defer-скриптлар ишлаб бўлгач (DOMContentLoaded) бошланади, шунда ҳамма саҳифа скрипти рўйхатдан ўтган бўлади */
  if (document.readyState === "complete") boot(); else document.addEventListener("DOMContentLoaded", boot);

  document.addEventListener("click", function (e) {
    var box = document.querySelector(".lang");
    if (box && !box.contains(e.target)) { box.classList.remove("open"); var b = box.querySelector(".lang-btn"); if (b) b.setAttribute("aria-expanded", "false"); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var box = document.querySelector(".lang"); if (box) box.classList.remove("open");
    var d = document.getElementById("drawer"); if (d) d.classList.remove("open");
  });

  /* Саҳифалар орасида силлиқ ўтиш */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    var d = a.getAttribute("data-dock");
    if (d) { e.preventDefault(); switchCat(d); return; }
    if (a.target === "_blank") return;
    var h = a.getAttribute("href");
    if (!h || h.charAt(0) === "#" || /^(https?:|mailto:|tel:)/.test(h)) return;
    var sc = sceneByHref(h);
    if (sc && SCENES[Z.page]) { e.preventDefault(); if (sc !== Z.page) Z.nav(sc); return; }     /* саҳна ичида: саҳифани қайта юкламасдан */
    if (reduce) return;
    e.preventDefault();
    document.body.classList.add("leaving");
    setTimeout(function () { location.href = a.href; }, 220);
  });
  window.addEventListener("pageshow", function () { document.body.classList.remove("leaving"); });
})();
