/* Буюртма саҳифаси */
Z.register("order", function () {
  var t = Z.t, e = Z.esc;
  return '<div class="page-head"><div class="wrap"><h1>' + e(t("order.title")) + "</h1><p>" + e(t("order.lead")) + "</p></div></div>" +
    '<section><div class="wrap"><h2 class="sub-h">' + e(t("order.pick")) + "</h2></div></section>" +
    Z.grid(["anim", "saas", "ad", "game", "app", "webapp", "site"].map(Z.orderOpt)) +
    '<section><div class="wrap"><h2 class="sub-h">' + e(t("order.contact")) + '</h2><div class="stack">' + Z.contactButtons(true) + "</div>" +
    '<p class="phone">' + e(t("order.phone")) + ': <a href="tel:+' + Z.S.whatsapp + '">' + e(Z.S.phoneDisplay) + "</a></p>" +
    '<div class="hint"><h2>' + e(t("order.hint.title")) + "</h2><ul>" +
    [1, 2, 3, 4].map(function (n) { return "<li>" + e(t("order.hint." + n)) + "</li>"; }).join("") + "</ul></div></div></section>";
});
