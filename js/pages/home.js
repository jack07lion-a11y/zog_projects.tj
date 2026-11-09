/* Бош саҳифа: 3 та қўл, ҳар бири ўз иконкасини ушлаб туради. Иконкалар код билан чизилган (расмсиз), шунинг учун дарров чиқади. */
Z.register("home", function () {
  var t = Z.t, e = Z.esc, H = window.HANDS || {}, SIZES = window.HANDS_SIZES || "104vw";
  function n(v, d) { return v === undefined || v === null ? d : v; }

  /* Ҳажмли "плита": қалинлиги, ялтироқ юзаси, тўқ сариқ ёруғ чегараси ва бармоқлар тегадиган жойдаги юмшоқ соя */
  var C = "#fde5c0", O = "#ff9a2b";
  var ICONS = {
    anim: '<circle cx="84" cy="84" r="33" fill="none" stroke="' + C + '" stroke-width="5" opacity=".92"/>' +
      '<path d="M75 66 105 84 75 102z" fill="' + O + '" stroke="' + O + '" stroke-width="9" stroke-linejoin="round"/>' +
      '<path d="M121 50l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="' + C + '"/><path d="M48 112l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="' + C + '" opacity=".85"/>',
    promo: '<path d="M46 56 100 66 66 98 120 116" fill="none" stroke="' + C + '" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<circle cx="46" cy="56" r="9.5" fill="' + O + '"/><circle cx="100" cy="66" r="9.5" fill="' + O + '"/><circle cx="66" cy="98" r="9.5" fill="' + O + '"/><circle cx="120" cy="116" r="9.5" fill="' + O + '"/>' +
      '<circle cx="120" cy="116" r="17" fill="none" stroke="' + O + '" stroke-width="2.5" opacity=".6"/>',
    dev: '<circle cx="84" cy="48" r="14" fill="' + O + '"/><path d="M84 62v24" stroke="' + C + '" stroke-width="6" stroke-linecap="round"/>' +
      '<rect x="42" y="86" width="84" height="46" rx="17" fill="none" stroke="' + C + '" stroke-width="6"/>' +
      '<path d="M71 100l-10 9 10 9M97 100l10 9-10 9M89 98l-10 22" fill="none" stroke="' + O + '" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'
  };
  function held(kind) {
    var i = "h" + kind;
    return '<svg viewBox="8 8 162 164" aria-hidden="true" focusable="false"><defs>' +
      '<linearGradient id="' + i + 'f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#343d6c"/><stop offset="1" stop-color="#141929"/></linearGradient>' +
      '<linearGradient id="' + i + 'r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb066" stop-opacity=".95"/><stop offset=".5" stop-color="#ff8a3d" stop-opacity=".28"/><stop offset="1" stop-color="#ff8a3d" stop-opacity="0"/></linearGradient>' +
      '<radialGradient id="' + i + 'g" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff9a2b" stop-opacity=".42"/><stop offset="1" stop-color="#ff9a2b" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="' + i + 's" cx=".28" cy=".18" r=".85"><stop offset="0" stop-color="#fff" stop-opacity=".3"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>' +
      '<rect x="20" y="22" width="148" height="148" rx="38" fill="#080b16"/><rect x="15" y="17" width="148" height="148" rx="38" fill="#0e1224"/>' +
      '<rect x="10" y="10" width="148" height="148" rx="38" fill="url(#' + i + 'f)"/><circle cx="84" cy="84" r="64" fill="url(#' + i + 'g)"/>' + ICONS[kind] +
      '<rect x="10" y="10" width="148" height="148" rx="38" fill="url(#' + i + 's)"/>' +
      '<rect x="11" y="11" width="146" height="146" rx="37" fill="none" stroke="url(#' + i + 'r)" stroke-width="2.4"/></svg>';
  }

  function hand(k, i) {
    var h = H[k], ks = [1, 1.4, 0.8][i % 3];
    var vars = "--i:" + i + ";--fx:" + n(h.fx, 0) + "%;--fy:" + n(h.fy, 0) + "%";
    var pos = "left:" + n(h.x, 50) + "%;top:" + n(h.y, 50) + "%;width:" + n(h.w, 60) + "%;z-index:" + n(h.z, 1) + ";rotate:" + n(h.r, 0) + "deg";
    var pn = "";
    if (h.panel) {
      var P = h.panel, o = P.open || [-1, 0];
      pn = '<a class="pnl" href="' + e(P.href) + '" aria-label="' + e(t(P.k)) + '" data-ax="' + P.ax + '" data-ay="' + P.ay + '" data-bx="' + P.bx + '" data-by="' + P.by +
        '" data-ox="' + o[0] + '" data-oy="' + o[1] + '" data-pw="' + n(P.pw, 21) + '" data-rot="' + n(P.rot, 0) + '" data-shift="' + n(P.shift, 0.115) + '">' + held(P.icon) + "</a>";
    }
    /* Расм src билан эмас: уни hands.js юклайди (тўлиқ юкланмагунча анимация бошланмайди) */
    var img = '<img alt="" decoding="async" width="1200" height="' + Math.round(1200 / n(h.ar, 1.25)) + '" sizes="' + e(SIZES) + '" data-src="' + e(h.src) + '" data-srcset="' + e(h.srcset || "") + '"' + (h.f ? ' style="scale:-1 1"' : "") + ">";
    return '<div class="he c' + (i % 3 + 1) + '" style="' + vars + '"><div class="hand" style="' + pos + '"><div class="hi"><div class="hf"><div class="art" data-k="' + ks + '" data-ar="' + n(h.ar, 1.25) + '">' + pn + img + "</div></div></div></div></div>";
  }
  /* h1/p — қидирув тизимлари ва экран ўқувчилар учун (кўринмайди) */
  return '<h1 class="sr">' + e(t("hero.title")) + '</h1><p class="sr">' + e(t("hero.sub")) + "</p>" +
    '<div class="stage' + (Z.fromLang ? " still" : "") + '" id="stage"><div class="boot" aria-hidden="true"><i></i></div><div class="canvas">' + Object.keys(H).map(hand).join("") + "</div></div>";
});
