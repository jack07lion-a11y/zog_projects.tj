/* Бош саҳифа: 3 та қўл панелларни ушлаб туради */
Z.register("home", function () {
  var t = Z.t, e = Z.esc, I = Z.ICON, H = window.HANDS || {};
  /* Вақтинчалик қўл шакли (src бўш бўлса кўринади) */
  var PH = '<svg class="ph" viewBox="0 0 200 200" aria-hidden="true"><rect x="0" y="76" width="52" height="48" rx="10" fill="#121520"/>' +
    '<rect x="38" y="76" width="8" height="48" fill="#ff9a2b"/><circle cx="82" cy="100" r="36" fill="#f3c9a1"/>' +
    '<path d="M96 66 168 42" stroke="#f3c9a1" stroke-width="22" stroke-linecap="round"/>' +
    '<path d="M96 134 170 158" stroke="#e9b98e" stroke-width="24" stroke-linecap="round"/></svg>';
  var defs = [
    { k: "anim", cls: "h-anim", href: "animation.html", label: "nav.anim" },
    { k: "promo", cls: "h-promo", href: "promotion.html", label: "nav.promo" },
    { k: "dev", cls: "h-dev", href: "dev.html", label: "nav.dev" }
  ];
  function hand(d, i) {
    var h = H[d.k] || {};
    function n(v, def) { return v === undefined ? def : v; }
    var img = h.src ? '<img src="' + e(h.src) + '" alt="" decoding="async" onload="this.parentNode.classList.add(\'ok\')">' : "";
    return '<div class="hand ' + d.cls + '" style="--i:' + i + ";--gx:" + n(h.gx, 50) + "%;--gy:" + n(h.gy, 50) + "%;--pw:" + n(h.pw, 44) + "%;--ph:" + n(h.ph, 36) + '%">' +
      '<div class="hf"><a class="panel" href="' + d.href + '" aria-label="' + e(t(d.label)) + '"><span class="p-ic">' + Z.BIG[d.k] + '</span><span class="p-lb">' + e(t(d.label)) + "</span></a>" +
      '<span class="art">' + PH + img + "</span></div></div>";
  }
  return '<section class="hero"><div class="wrap home-grid">' +
    '<div class="hero-text"><span class="badge">' + e(t("hero.badge")) + "</span><h1>" + e(t("hero.title")) + "</h1><p>" + e(t("hero.sub")) + "</p>" +
    '<div class="actions row"><a class="btn primary" href="order.html">' + e(t("hero.cta")) + "</a>" +
    '<a class="btn" href="' + Z.waLink(t("order.wa.text")) + '" target="_blank" rel="noopener">' + I.wa + "WhatsApp</a></div></div>" +
    '<div class="stage' + (Z.fromLang ? " still" : "") + '" id="stage"><div class="ask">' + e(t("home.ask")) + "</div>" + defs.map(hand).join("") + "</div>" +
    "</div></section>" +
    '<section><div class="wrap"><div class="card"><span class="badge">' + e(t("courses.badge")) + "</span><h3>" + e(t("home.courses.title")) + "</h3><p>" +
    e(t("home.courses.text")) + '</p><div style="margin-top:10px">' + Z.waitlistBtn(false) + "</div></div></div></section>" +
    '<section><div class="wrap"><div class="cta-box"><h2>' + e(t("home.cta.title")) + "</h2><p>" + e(t("home.cta.text")) +
    '</p><div class="actions">' + Z.contactButtons(false) + "</div></div></div></section>";
});
