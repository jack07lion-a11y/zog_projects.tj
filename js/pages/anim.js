/* Анимация саҳифаси */
Z.register("anim", function () {
  return Z.catHead(Z.BIG.anim, "nav.anim", "anim.lead") +
    Z.grid([Z.watchOpt(Z.S.instagram.animations, "opt.watch.anim"), Z.orderOpt("anim"), Z.courseOpt("anim")]) +
    Z.worksSection(["cartoon"]);
});
