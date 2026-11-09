/* Сайт логикаси: меню, тил алмаштириш, саҳифаларни content.js'дан чизиш.
   Мазмунни бу ерда ўзгартирманг — js/content.js'да ўзгартиринг. */
(function () {
  "use strict";
  var S = window.SITE, D = window.I18N, WORKS = window.WORKS || [];
  var page = document.body.getAttribute("data-page") || "home";
  var PAGES = [
    ["home", "index.html", "nav.home"],
    ["works", "works.html", "nav.works"],
    ["services", "services.html", "nav.services"],
    ["courses", "courses.html", "nav.courses"],
    ["order", "order.html", "nav.order"],
    ["about", "about.html", "nav.about"]
  ];

  /* ---------- Тил ---------- */
  var lang = pickLang();
  function pickLang() {
    try {
      var q = new URLSearchParams(location.search).get("lang");
      if (q && D[q]) return q;
      var s = localStorage.getItem("lang");
      if (s && D[s]) return s;
    } catch (e) {}
    return S.defaultLang;
  }
  function t(k) {
    var v = D[lang][k];
    if (v === undefined) v = D[S.defaultLang][k];
    return v === undefined ? k : v;
  }
  function setLang(l) {
    lang = l;
    try { localStorage.setItem("lang", l); } catch (e) {}
    render();
  }

  /* ---------- Ёрдамчилар ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function waLink(text) { return "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(text); }
  function tgLink() { return S.telegram ? "https://t.me/" + S.telegram.replace(/^@/, "") : ""; }
  function igHandle(url) { return "@" + url.replace(/\/+$/, "").split("/").pop(); }

  var ICON = {
    saas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/><path d="m10 8.5 4 2-4 2z"/></svg>',
    ad: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11v3a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12"/></svg>',
    cartoon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0"/><path d="M9 9.5h.01M15 9.5h.01"/></svg>',
    dev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-.8.7a3.5 3.5 0 0 1-1.9-1.9l.7-.8-1-2z"/></svg>',
    tg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 4 3 11l5 2 2 6 3-4 5 4z"/><path d="m8 13 9-6"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="#fff"><path d="M6 4l14 8-14 8z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
  };

  /* ---------- Умумий қисмлар ---------- */
  function renderHeader() {
    var links = PAGES.map(function (p) {
      return '<a href="' + p[1] + '"' + (p[0] === page ? ' class="active" aria-current="page"' : "") + ">" + esc(t(p[2])) + "</a>";
    }).join("");
    var langs = Object.keys(D).map(function (l) {
      return '<button type="button" data-lang="' + l + '"' + (l === lang ? ' class="on" aria-pressed="true"' : ' aria-pressed="false"') + ">" + esc(D[l].langName) + "</button>";
    }).join("");
    document.getElementById("site-header").innerHTML =
      '<div class="wrap bar">' +
      '<a class="logo" href="index.html" aria-label="' + esc(S.name) + '"><span>ZOG</span> Projects</a>' +
      '<nav class="nav" aria-label="Main">' + links + "</nav>" +
      '<div class="langs" role="group" aria-label="Language">' + langs + "</div>" +
      '<button class="burger" type="button" aria-label="' + esc(t("nav.menu")) + '" aria-expanded="false" aria-controls="drawer">' + ICON.menu + "</button>" +
      "</div>" +
      '<nav class="drawer" id="drawer" aria-label="Menu">' + links + "</nav>";

    var drawer = document.getElementById("drawer");
    var burger = document.querySelector(".burger");
    burger.addEventListener("click", function () {
      var open = drawer.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });
  }

  function renderFooter() {
    var ig = S.instagram;
    var contacts =
      '<a href="' + waLink(t("order.wa.text")) + '" target="_blank" rel="noopener">WhatsApp</a>' +
      (tgLink() ? '<a href="' + tgLink() + '" target="_blank" rel="noopener">Telegram</a>' : "") +
      '<a href="' + ig.animations + '" target="_blank" rel="noopener">' + esc(igHandle(ig.animations)) + "</a>" +
      '<a href="' + ig.promotions + '" target="_blank" rel="noopener">' + esc(igHandle(ig.promotions)) + "</a>" +
      '<a href="' + ig.dev + '" target="_blank" rel="noopener">' + esc(igHandle(ig.dev)) + "</a>";
    document.getElementById("site-footer").innerHTML =
      '<div class="wrap foot"><div>© ' + new Date().getFullYear() + " " + esc(S.name) + ". " + esc(t("footer.rights")) +
      '</div><div class="links">' + contacts + "</div></div>";
  }

  function workCard(w) {
    var title = esc(w.title[lang] || w.title[S.defaultLang] || "");
    var thumb = w.thumb ? '<img src="' + esc(w.thumb) + '" alt="' + title + '" loading="lazy" decoding="async">' : "";
    var inner =
      '<div class="thumb">' + thumb + '<span class="play">' + ICON.play + "</span></div>" +
      '<div class="meta"><span class="cat">' + esc(t("cat." + w.cat)) + '</span><span class="name">' + title + "</span>" +
      '<span class="state">' + esc(w.url ? t("works.watch") + " →" : t("works.soon")) + "</span></div>";
    return w.url
      ? '<a class="work" data-cat="' + w.cat + '" href="' + esc(w.url) + '" target="_blank" rel="noopener">' + inner + "</a>"
      : '<div class="work" data-cat="' + w.cat + '">' + inner + "</div>";
  }

  function serviceCards(withDev) {
    var items = [["saas", "services.saas"], ["ad", "services.ad"], ["cartoon", "services.cartoon"]];
    var html = items.map(function (i) {
      return '<div class="card"><div class="icon">' + ICON[i[0]] + "</div><h3>" + esc(t(i[1] + ".title")) + "</h3><p>" +
        esc(t(i[1] + ".text")) + '</p><span class="tag">' + esc(t("services.price")) + "</span></div>";
    }).join("");
    if (withDev) {
      html += '<a class="card dim" href="' + S.instagram.dev + '" target="_blank" rel="noopener"><div class="icon">' + ICON.dev + "</div><h3>" +
        esc(t("services.dev.title")) + "</h3><p>" + esc(t("services.dev.text")) + '</p><span class="tag">' + esc(t("services.dev.badge")) + "</span></a>";
    }
    return html;
  }

  function contactButtons(withIg) {
    var h = '<a class="btn primary block" href="' + waLink(t("order.wa.text")) + '" target="_blank" rel="noopener">' + ICON.wa + esc(t("order.wa")) + "</a>";
    if (tgLink()) h += '<a class="btn block" href="' + tgLink() + '" target="_blank" rel="noopener">' + ICON.tg + esc(t("order.tg")) + "</a>";
    if (withIg) h += '<a class="btn block" href="' + S.instagram.promotions + '" target="_blank" rel="noopener">' + ICON.ig + esc(t("order.ig")) + "</a>";
    if (withIg && S.email) h += '<a class="btn block" href="mailto:' + esc(S.email) + '">' + ICON.mail + esc(t("order.email")) + "</a>";
    return h;
  }

  function profileCards() {
    var list = [["animations", "cartoon"], ["promotions", "saas"], ["dev", "dev"]];
    return list.map(function (p) {
      var url = S.instagram[p[0]];
      return '<a class="card profile" href="' + url + '" target="_blank" rel="noopener"><div class="icon">' + ICON.ig + "</div><div><h3>" +
        esc(t("about." + p[0])) + '</h3><span class="handle">' + esc(igHandle(url)) + "</span></div></a>";
    }).join("");
  }

  function waitlistBtn() {
    return '<a class="btn primary" href="' + waLink(t("courses.wa")) + '" target="_blank" rel="noopener">' + ICON.wa + esc(t("courses.cta")) + "</a>";
  }

  /* ---------- Саҳифалар ---------- */
  var VIEWS = {
    home: function () {
      return '<section class="hero"><div class="wrap">' +
        '<span class="badge">' + esc(t("hero.badge")) + "</span>" +
        "<h1>" + esc(t("hero.title")) + "</h1><p>" + esc(t("hero.sub")) + "</p>" +
        '<div class="actions"><a class="btn primary" href="order.html">' + esc(t("hero.cta")) + '</a><a class="btn" href="works.html">' + esc(t("hero.cta2")) + "</a></div>" +
        "</div></section>" +
        '<section><div class="wrap"><div class="sec-head"><h2>' + esc(t("home.services")) + '</h2><a href="services.html">' + esc(t("home.all")) + ' →</a></div>' +
        '<div class="grid cols-3">' + serviceCards(false) + "</div></div></section>" +
        '<section><div class="wrap"><div class="sec-head"><h2>' + esc(t("home.works")) + '</h2><a href="works.html">' + esc(t("home.all")) + ' →</a></div>' +
        '<div class="grid cols-3">' + WORKS.slice(0, 3).map(workCard).join("") + "</div></div></section>" +
        '<section><div class="wrap"><div class="card"><span class="badge" style="align-self:flex-start;margin:0">' + esc(t("courses.badge")) + "</span><h3>" +
        esc(t("home.courses.title")) + "</h3><p>" + esc(t("home.courses.text")) + '</p><div style="margin-top:10px">' + waitlistBtn() + "</div></div></div></section>" +
        '<section><div class="wrap"><div class="cta-box"><h2>' + esc(t("home.cta.title")) + "</h2><p>" + esc(t("home.cta.text")) +
        '</p><div class="actions">' + contactButtons(false) + "</div></div></div></section>";
    },
    works: function () {
      return '<div class="page-head"><div class="wrap"><h1>' + esc(t("works.title")) + "</h1><p>" + esc(t("works.lead")) + "</p></div></div>" +
        '<section><div class="wrap"><div class="grid cols-3">' + WORKS.map(workCard).join("") + "</div></div></section>" +
        '<section><div class="wrap"><p style="color:var(--muted);margin-bottom:14px">' + esc(t("works.follow")) + '</p><div class="grid cols-3">' + profileCards() + "</div></div></section>";
    },
    services: function () {
      return '<div class="page-head"><div class="wrap"><h1>' + esc(t("services.title")) + "</h1><p>" + esc(t("services.lead")) + "</p></div></div>" +
        '<section><div class="wrap"><div class="grid cols-2">' + serviceCards(true) + "</div></div></section>" +
        '<section><div class="wrap"><div class="actions" style="max-width:360px"><a class="btn primary block" href="order.html">' + esc(t("services.order")) + "</a></div></div></section>";
    },
    courses: function () {
      return '<div class="page-head"><div class="wrap"><span class="badge">' + esc(t("courses.badge")) + "</span><h1>" + esc(t("courses.title")) + "</h1><p>" + esc(t("courses.lead")) + "</p></div></div>" +
        '<section><div class="wrap"><div class="actions" style="max-width:420px">' + waitlistBtn().replace('class="btn primary"', 'class="btn primary block"') + "</div></div></section>";
    },
    order: function () {
      return '<div class="page-head"><div class="wrap"><h1>' + esc(t("order.title")) + "</h1><p>" + esc(t("order.lead")) + "</p></div></div>" +
        '<section><div class="wrap"><div class="stack">' + contactButtons(true) + "</div>" +
        '<p class="phone">' + esc(t("order.phone")) + ': <a href="tel:+' + S.whatsapp + '">' + esc(S.phoneDisplay) + "</a></p>" +
        '<div class="hint"><h2>' + esc(t("order.hint.title")) + "</h2><ul>" +
        [1, 2, 3, 4].map(function (n) { return "<li>" + esc(t("order.hint." + n)) + "</li>"; }).join("") + "</ul></div></div></section>";
    },
    about: function () {
      return '<div class="page-head"><div class="wrap"><h1>' + esc(t("about.title")) + "</h1><p>" + esc(t("about.text")) + "</p></div></div>" +
        '<section><div class="wrap"><h2 style="font-size:1.2rem;margin-bottom:14px">' + esc(t("about.profiles")) + '</h2><div class="grid cols-3">' + profileCards() + "</div></div></section>";
    }
  };

  /* ---------- SEO (тилга қараб) ---------- */
  function setMeta(sel, attr, val) { var el = document.querySelector(sel); if (el) el.setAttribute(attr, val); }
  function updateMeta() {
    var title = t("meta." + page + ".title"), desc = t("meta." + page + ".desc");
    document.title = title;
    document.documentElement.lang = D[lang].htmlLang || lang;
    setMeta('meta[name="description"]', "content", desc);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", desc);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", desc);
  }

  function render() {
    renderHeader();
    document.getElementById("app").innerHTML = VIEWS[page]();
    renderFooter();
    updateMeta();
  }

  render();
})();
