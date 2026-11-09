/* Бош саҳифа */
Z.register("home", function () {
  var t = Z.t, e = Z.esc, I = Z.ICON;
  function tile(href, big, key) {
    return '<a class="tile" href="' + href + '"><span class="tile-ic">' + Z.BIG[big] + '</span><span class="tile-lb">' + e(t(key)) + "</span></a>";
  }
  return '<section class="hero"><div class="wrap hero-in">' +
    '<img class="hero-logo" src="assets/logo.png" alt="ZOG" width="280" height="280">' +
    '<div><span class="badge">' + e(t("hero.badge")) + "</span><h1>" + e(t("hero.title")) + "</h1><p>" + e(t("hero.sub")) + "</p>" +
    '<div class="actions row"><a class="btn primary" href="order.html">' + e(t("hero.cta")) + "</a>" +
    '<a class="btn" href="' + Z.waLink(t("order.wa.text")) + '" target="_blank" rel="noopener">' + I.wa + "WhatsApp</a></div></div>" +
    "</div></section>" +
    '<section class="pick"><div class="wrap"><div class="ask">' + e(t("home.ask")) + "</div>" +
    '<div class="cats">' + tile("animation.html", "anim", "nav.anim") + tile("promotion.html", "promo", "nav.promo") + tile("dev.html", "dev", "nav.dev") + "</div></div></section>" +
    '<section><div class="wrap"><div class="card"><span class="badge">' + e(t("courses.badge")) + "</span><h3>" + e(t("home.courses.title")) + "</h3><p>" +
    e(t("home.courses.text")) + '</p><div style="margin-top:10px">' + Z.waitlistBtn(false) + "</div></div></div></section>" +
    '<section><div class="wrap"><div class="cta-box"><h2>' + e(t("home.cta.title")) + "</h2><p>" + e(t("home.cta.text")) +
    '</p><div class="actions">' + Z.contactButtons(false) + "</div></div></div></section>";
});
