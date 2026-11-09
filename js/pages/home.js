/* Бош саҳифа: тоза саҳна, фақат 3 та қўл (матнлар кейин қўшилади) */
Z.register("home", function () {
  var t = Z.t, e = Z.esc, H = window.HANDS || {};
  function n(v, d) { return v === undefined || v === null ? d : v; }
  function hand(k, i) {
    var h = H[k], ks = [1, 1.4, 0.8][i % 3];
    var vars = "--i:" + i + ";--k:" + ks + ";--fx:" + n(h.fx, 0) + "%;--fy:" + n(h.fy, 0) + "%";
    var pos = "left:" + n(h.x, 50) + "%;top:" + n(h.y, 50) + "%;width:" + n(h.w, 60) + "%;z-index:" + n(h.z, 1) + ";rotate:" + n(h.r, 0) + "deg";
    var pn = h.panel ? '<a class="pnl" href="' + e(h.panel.href) + '" aria-label="' + e(t(h.panel.k)) + '" style="left:' + n(h.panel.gx, 50) + "%;top:" + n(h.panel.gy, 50) + "%;width:" + n(h.panel.pw, 30) + "%;--pr:" + n(h.panel.rot, 0) + 'deg"><img src="' + e(h.panel.src) + '" alt="" decoding="async"></a>' : "";
    return '<div class="he c' + (i % 3 + 1) + '" style="' + vars + '"><div class="hand" style="' + pos + '"><div class="hi"><div class="hf">' + pn + '<div class="art">' +
      '<img src="' + e(h.src) + '" alt="" decoding="async"' + (h.f ? ' style="scale:-1 1"' : "") + "></div></div></div></div></div>";
  }
  /* h1/p — қидирув тизимлари ва экран ўқувчилар учун (кўринмайди) */
  return '<h1 class="sr">' + e(t("hero.title")) + '</h1><p class="sr">' + e(t("hero.sub")) + "</p>" +
    '<div class="stage' + (Z.fromLang ? " still" : "") + '" id="stage"><div class="canvas">' + Object.keys(H).map(hand).join("") + "</div></div>";
});
