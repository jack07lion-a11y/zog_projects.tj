/* Промоушн саҳифаси */
Z.start("promo", function () {
  return Z.catHead(Z.BIG.promo, "nav.promo", "promo.lead") +
    Z.grid([Z.watchOpt(Z.S.instagram.promotions, "opt.watch.promo"), Z.orderOpt("saas"), Z.orderOpt("ad"), Z.courseOpt("promo")]) +
    Z.worksSection(["saas", "ad"]);
});
