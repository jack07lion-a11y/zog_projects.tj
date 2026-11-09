/* Animation саҳифаси: ҳозирча тоза тўқ сариқ саҳна (мазмун кейин қўшилади) */
Z.noDock = true;
Z.register("anim", function () {
  return '<h1 class="sr">' + Z.esc(Z.t("nav.anim")) + '</h1><p class="sr">' + Z.esc(Z.t("anim.lead")) + "</p>" +
    '<div class="stage page-stage" id="stage"></div>';
});
