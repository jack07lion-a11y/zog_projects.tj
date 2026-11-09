/* Курслар саҳифаси */
Z.start("courses", function () {
  var t = Z.t, e = Z.esc;
  return '<div class="page-head"><div class="wrap"><span class="badge">' + e(t("courses.badge")) + "</span><h1>" + e(t("courses.title")) + "</h1><p>" + e(t("courses.lead")) + "</p></div></div>" +
    Z.grid([Z.courseOpt("anim"), Z.courseOpt("promo"), Z.courseOpt("dev")]);
});
