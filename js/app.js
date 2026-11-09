/* Сайт логикаси: меню, тил (минтақа бўйича), анимациялар, саҳифаларни чизиш.
   Мазмунни бу ерда ўзгартирманг — js/content.js'да ўзгартиринг. */
(function () {
  "use strict";
  var S = window.SITE, D = window.I18N, WORKS = window.WORKS || [];
  var page = document.body.getAttribute("data-page") || "home";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var PAGES = [
    ["home", "index.html", "nav.home"],
    ["works", "works.html", "nav.works"],
    ["services", "services.html", "nav.services"],
    ["courses", "courses.html", "nav.courses"],
    ["order", "order.html", "nav.order"],
    ["about", "about.html", "nav.about"]
  ];

  /* ---------- Тил ---------- */
  function regionLang() {
    var tz = "";
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
    if (!tz) return S.defaultLang;
    var R = S.regionLang || {};
    for (var l in R) { if (D[l] && R[l].indexOf(tz) > -1) return l; }
    return D[S.fallbackLang] ? S.fallbackLang : S.defaultLang;
  }
  function pickLang() {
    try {
      var q = new URLSearchParams(location.search).get("lang");
      if (q && D[q]) return q;
      var s = localStorage.getItem("lang");
      if (s && D[s]) return s;
    } catch (e) {}
    return regionLang();
  }
  var lang = pickLang();
  function t(k) {
    var v = D[lang][k];
    if (v === undefined) v = D[S.defaultLang][k];
    return v === undefined ? k : v;
  }
  function setLang(l) {
    lang = l;
    try { localStorage.setItem("lang", l); } catch (e) {}
    render(true);
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
  var A = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  var ICON = {
    saas: '<svg viewBox="0 0 24 24" ' + A + '><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/><path d="m10 8.5 4 2-4 2z"/></svg>',
    ad: '<svg viewBox="0 0 24 24" ' + A + '><path d="M3 11v3a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12"/></svg>',
    cartoon: '<svg viewBox="0 0 24 24" ' + A + '><circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0"/><path d="M9 9.5h.01M15 9.5h.01"/></svg>',
    dev: '<svg viewBox="0 0 24 24" ' + A + '><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>',
    wa: '<svg viewBox="0 0 24 24" ' + A + '><path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-.8.7a3.5 3.5 0 0 1-1.9-1.9l.7-.8-1-2z"/></svg>',
    tg: '<svg viewBox="0 0 24 24" ' + A + '><path d="M21 4 3 11l5 2 2 6 3-4 5 4z"/><path d="m8 13 9-6"/></svg>',
    ig: '<svg viewBox="0 0 24 24" ' + A + '><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>',
    mail: '<svg viewBox="0 0 24 24" ' + A + '><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    globe: '<svg viewBox="0 0 24 24" ' + A + '><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 24 24" ' + A + '><path d="m6 9 6 6 6-6"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path d="M6 4l14 8-14 8z"/></svg>',
    burger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path class="l1" d="M4 7h16"/><path class="l2" d="M4 12h16"/><path class="l3" d="M4 17h16"/></svg>'
  };

  /* ---------- Умумий қисмлар ---------- */
  function renderHeader() {
    var links = PAGES.map(function (p) {
      return '<a href="' + p[1] + '"' + (p[0] === page ? ' class="active" aria-current="page"' : "") + ">" + esc(t(p[2])) + "</a>";
    }).join("");
    var items = Object.keys(D).map(function (l) {
      return '<li role="none"><button type="button" role="menuitemradio" aria-checked="' + (l === lang) + '" data-lang="' + l + '">' +
        esc(D[l].langLabel) + '<span class="code">' + esc(D[l].langName) + "</span></button></li>";
    }).join("");
    document.getElementById("site-header").innerHTML =
      '<div class="wrap bar">' +
      '<a class="logo" href="index.html" aria-label="' + esc(S.name) + '"><img src="assets/icon-192.png" alt="" width="38" height="38"><b><span>ZOG</span> Projects</b></a>' +
      '<nav class="nav" aria-label="Main">' + links + "</nav>" +
      '<div class="lang"><button class="lang-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Language">' +
      ICON.globe + esc(D[lang].langName) + ICON.chev + '</button><ul class="lang-menu" role="menu">' + items + "</ul></div>" +
      '<button class="burger" type="button" aria-label="' + esc(t("nav.menu")) + '" aria-expanded="false" aria-controls="drawer">' + ICON.burger + "</button>" +
      "</div>" +
      '<nav class="drawer" id="drawer" aria-label="Menu">' + links + "</nav>";

    var drawer = document.getElementById("drawer");
    var burger = document.querySelector(".burger");
    var box = document.querySelector(".lang");
    var lbtn = document.querySelector(".lang-btn");
    function closeLang() { box.classList.remove("open"); lbtn.setAttribute("aria-expanded", "false"); }
    burger.addEventListener("click", function () {
      closeLang();
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
    return ["animations", "promotions", "dev"].map(function (p) {
      var url = S.instagram[p];
      return '<a class="card profile" href="' + url + '" target="_blank" rel="noopener"><div class="icon">' + ICON.ig + "</div><div><h3>" +
        esc(t("about." + p)) + '</h3><span class="handle">' + esc(igHandle(url)) + "</span></div></a>";
    }).join("");
  }

  function waitlistBtn(block) {
    return '<a class="btn primary' + (block ? " block" : "") + '" href="' + waLink(t("courses.wa")) + '" target="_blank" rel="noopener">' + ICON.wa + esc(t("courses.cta")) + "</a>";
  }

  /* ---------- Саҳифалар ---------- */
  var VIEWS = {
    home: function () {
      return '<section class="hero"><div class="wrap hero-in">' +
        '<img class="hero-logo" src="assets/logo.png" alt="ZOG" width="280" height="280">' +
        '<div><span class="badge">' + esc(t("hero.badge")) + "</span>" +
        "<h1>" + esc(t("hero.title")) + "</h1><p>" + esc(t("hero.sub")) + "</p>" +
        '<div class="actions"><a class="btn primary" href="order.html">' + esc(t("hero.cta")) + '</a><a class="btn" href="works.html">' + esc(t("hero.cta2")) + "</a></div></div>" +
        "</div></section>" +
        '<section><div class="wrap"><div class="sec-head"><h2>' + esc(t("home.services")) + '</h2><a href="services.html">' + esc(t("home.all")) + ' →</a></div>' +
        '<div class="grid cols-3">' + serviceCards(false) + "</div></div></section>" +
        '<section><div class="wrap"><div class="sec-head"><h2>' + esc(t("home.works")) + '</h2><a href="works.html">' + esc(t("home.all")) + ' →</a></div>' +
        '<div class="grid cols-3">' + WORKS.slice(0, 3).map(workCard).join("") + "</div></div></section>" +
        '<section><div class="wrap"><div class="card"><span class="badge">' + esc(t("courses.badge")) + "</span><h3>" +
        esc(t("home.courses.title")) + "</h3><p>" + esc(t("home.courses.text")) + '</p><div style="margin-top:10px">' + waitlistBtn(false) + "</div></div></div></section>" +
        '<section><div class="wrap"><div class="cta-box"><h2>' + esc(t("home.cta.title")) + "</h2><p>" + esc(t("home.cta.text")) +
        '</p><div class="actions">' + contactButtons(false) + "</div></div></div></section>";
    },
    works: function () {
      return '<div class="page-head"><div class="wrap"><h1>' + esc(t("works.title")) + "</h1><p>" + esc(t("works.lead")) + "</p></div></div>" +
        '<section><div class="wrap"><div class="grid cols-3">' + WORKS.map(workCard).join("") + "</div></div></section>" +
        '<section><div class="wrap"><p style="font-weight:600;margin-bottom:14px">' + esc(t("works.follow")) + '</p><div class="grid cols-3">' + profileCards() + "</div></div></section>";
    },
    services: function () {
      return '<div class="page-head"><div class="wrap"><h1>' + esc(t("services.title")) + "</h1><p>" + esc(t("services.lead")) + "</p></div></div>" +
        '<section><div class="wrap"><div class="grid cols-2">' + serviceCards(true) + "</div></div></section>" +
        '<section><div class="wrap"><div class="actions" style="max-width:360px"><a class="btn primary block" href="order.html">' + esc(t("services.order")) + "</a></div></div></section>";
    },
    courses: function () {
      return '<div class="page-head"><div class="wrap"><span class="badge">' + esc(t("courses.badge")) + "</span><h1>" + esc(t("courses.title")) + "</h1><p>" + esc(t("courses.lead")) + "</p></div></div>" +
        '<section><div class="wrap"><div class="actions" style="max-width:420px">' + waitlistBtn(true) + "</div></div></section>";
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
  function setMeta(sel, val) { var el = document.querySelector(sel); if (el) el.setAttribute("content", val); }
  function updateMeta() {
    var title = t("meta." + page + ".title"), desc = t("meta." + page + ".desc");
    document.title = title;
    document.documentElement.lang = D[lang].htmlLang || lang;
    setMeta('meta[name="description"]', desc);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', desc);
  }

  /* ---------- Силлиқ пайдо бўлиш ---------- */
  var io = null;
  function setupReveal(instant) {
    var sel = ".hero-in > *, .page-head .wrap > *, .sec-head, .card, .work, .cta-box, .stack .btn, .hint, .phone, .actions";
    var els = Array.prototype.slice.call(document.querySelectorAll("#app " + sel));
    if (instant || reduce || !("IntersectionObserver" in window)) return;
    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.08 });
    els.forEach(function (el) {
      if (el.closest(".reveal") && !el.classList.contains("reveal")) { /* ичма-ич бўлмасин */ }
      var idx = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.setProperty("--d", Math.min(idx, 5) * 70 + "ms");
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  function render(fromLang) {
    renderHeader();
    var app = document.getElementById("app");
    app.innerHTML = VIEWS[page]();
    app.classList.toggle("swap", !!fromLang);
    renderFooter();
    updateMeta();
    setupReveal(!!fromLang);
  }

  render(false);

  /* Тил менюсини ташқарига босганда ёпиш */
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
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button || a.target === "_blank" || reduce) return;
    var h = a.getAttribute("href");
    if (!h || h.charAt(0) === "#" || /^(https?:|mailto:|tel:)/.test(h)) return;
    e.preventDefault();
    document.body.classList.add("leaving");
    setTimeout(function () { location.href = a.href; }, 220);
  });
  window.addEventListener("pageshow", function () { document.body.classList.remove("leaving"); });
})();
