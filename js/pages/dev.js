/* Dev & Game (Code) саҳифаси: ҳозирча тоза тўқ сариқ саҳна (мазмун кейин қўшилади) */
Z.noDock = true;
Z.register("dev", function () {
  return '<h1 class="sr">' + Z.esc(Z.t("nav.dev")) + '</h1><p class="sr">' + Z.esc(Z.t("dev.lead")) + "</p>" +
    '<div class="stage page-stage" id="stage"></div>';
});
