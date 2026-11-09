/* Promotion саҳифаси: ҳозирча тоза тўқ сариқ саҳна (мазмун кейин қўшилади) */
Z.noDock = true;
Z.register("promo", function () {
  return '<h1 class="sr">' + Z.esc(Z.t("nav.promo")) + '</h1><p class="sr">' + Z.esc(Z.t("promo.lead")) + "</p>" +
    '<div class="stage page-stage" id="stage"></div>';
});
