/* Dev & Game саҳифаси */
Z.register("dev", function () {
  return Z.catHead(Z.BIG.dev, "nav.dev", "dev.lead") +
    Z.grid([
      Z.opt({ href: "#games", icon: "game", title: "opt.play", desc: "opt.desc.play" }),
      Z.orderOpt("game"), Z.orderOpt("app"), Z.orderOpt("webapp"), Z.orderOpt("site"),
      Z.courseOpt("dev"), Z.watchOpt(Z.S.instagram.dev, "opt.watch.dev")
    ]) + Z.gamesSection();
});
