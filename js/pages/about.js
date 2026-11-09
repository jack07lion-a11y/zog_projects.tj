/* Мен ҳақимда саҳифаси */
Z.register("about", function () {
  var t = Z.t, e = Z.esc;
  return '<div class="page-head"><div class="wrap"><h1>' + e(t("about.title")) + "</h1><p>" + e(t("about.text")) + "</p></div></div>" +
    '<section><div class="wrap"><h2 class="sub-h">' + e(t("about.profiles")) + '</h2><div class="grid cols-3">' + Z.profileCards() + "</div></div></section>";
});
