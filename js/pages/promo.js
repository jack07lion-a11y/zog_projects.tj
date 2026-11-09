/* Promotion саҳнаси: қўғирчоқбоз қўли тепадан тушади. Кичик бармоқ, ўрта, кўрсаткич ва бош бармоқ учларидан
   иплар осилади, иплар учида 4 та плита (иконка) чайқалиб туради. Иплар ва физика кодда. */
Z.noDock = true;
(function () {
  "use strict";
  var Z = window.Z, NS = "http://www.w3.org/2000/svg";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var A = (window.SCENE_ASSETS || {}).promo;
  var C = "#fde5c0", O = "#ff9a2b";

  /* Бармоқлардан осилган 4 та плита: қайси бармоқдан, матн, нима қилади */
  var ITEMS = [
    { finger: "pinky", key: "pr.works", aria: "opt.watch.promo", logo: "ig" },
    { finger: "middle", key: "pr.saas", aria: "opt.order.saas", logo: "wa", wa: "wa.saas" },
    { finger: "index", key: "pr.ad", aria: "opt.order.ad", logo: "wa", wa: "wa.ad" },
    { finger: "thumb", key: "pr.course", aria: "opt.course.promo", logo: "wa", wa: "wa.course.promo" }
  ];
  var SIZE = [0.92, 1.06, 1.0, 1.1];          /* чуқурлик: узоқдагиси кичик, яқини катта */
  var DEPTH = [-9, 12, -5, 14];               /* параллакс: ҳар плита ўз чуқурлигида силжийди (px) */
  var BOT = [0.93, 0.965, 0.95, 0.905];       /* плитанинг пастки чегараси (саҳна баландлигига нисбатан) */
  var TX = [0.15, 0.385, 0.615, 0.85];        /* плитанинг тинч ҳолатдаги марказий x (саҳна энига нисбатан) */
  var ZI = [3, 5, 4, 6];
  var PG = 2100, DAMP = 0.9;                  /* оғирлик кучи (px/с²), сўниш */

  function slab(id) {
    var i = "pp" + id;
    return '<svg class="slab" viewBox="8 8 162 164" aria-hidden="true" focusable="false"><defs>' +
      '<linearGradient id="' + i + 'f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#343d6c"/><stop offset="1" stop-color="#141929"/></linearGradient>' +
      '<linearGradient id="' + i + 'r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb066" stop-opacity=".95"/><stop offset=".5" stop-color="#ff8a3d" stop-opacity=".28"/><stop offset="1" stop-color="#ff8a3d" stop-opacity="0"/></linearGradient>' +
      '<radialGradient id="' + i + 'g" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff9a2b" stop-opacity=".30"/><stop offset="1" stop-color="#ff9a2b" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="' + i + 's" cx=".28" cy=".18" r=".85"><stop offset="0" stop-color="#fff" stop-opacity=".3"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>' +
      '<rect x="20" y="22" width="148" height="148" rx="38" fill="#080b16"/><rect x="15" y="17" width="148" height="148" rx="38" fill="#0e1224"/>' +
      '<rect x="10" y="10" width="148" height="148" rx="38" fill="url(#' + i + 'f)"/><circle cx="84" cy="96" r="64" fill="url(#' + i + 'g)"/>' +
      '<rect x="10" y="10" width="148" height="148" rx="38" fill="url(#' + i + 's)"/><rect x="11" y="11" width="146" height="146" rx="37" fill="none" stroke="url(#' + i + 'r)" stroke-width="2.4"/>' +
      '<circle cx="87" cy="17" r="5.4" fill="#0a0d19" stroke="#ffb066" stroke-width="2.4"/></svg>';
  }

  Z.register("promo", function () {
    var t = Z.t, e = Z.esc, S = Z.S;
    var tiles = ITEMS.map(function (it, i) {
      var href = it.wa ? Z.waLink(t(it.wa)) : S.instagram.promotions;
      return '<a class="pitem" href="' + e(href) + '" target="_blank" rel="noopener" aria-label="' + e(t(it.aria)) + '" style="--z:' + ZI[i] + '">' + slab(i) +
        '<span class="pi-logo">' + Z.ICON[it.logo] + '</span><span class="pi-txt">' + e(t(it.key)) + "</span></a>";
    }).join("");
    var img = '<img alt="" decoding="async" width="1200" height="' + Math.round(1200 / A.ar) + '" sizes="' + e(A.sizes) + '" data-src="' + e(A.src) + '" data-srcset="' + e(A.srcset) + '">';
    return '<h1 class="sr">' + e(t("nav.promo")) + '</h1><p class="sr">' + e(t("promo.lead")) + "</p>" +
      '<div class="stage pscene' + (Z.fromLang ? " still" : "") + '" id="stage" data-scene="promo"><div class="boot" aria-hidden="true"><i></i></div>' +
      '<div class="canvas" id="cv"><div class="asm" id="asm"><div class="mh"><div class="mhf">' + img + '</div></div>' +
      '<svg class="mstr" aria-hidden="true" focusable="false"></svg>' + tiles + "</div></div></div>";
  });

  /* ---------- Физика ---------- */
  var cv, asm, mh, svg, items = [], loop = 0, last = 0, W = 0, H = 0, sx = 0, sy = 0, pcx = null, pcy = 0, pvx = 0, pvy = 0, sax = 0, say = 0;
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function el(name, cls) { var n = document.createElementNS(NS, name); if (cls) n.setAttribute("class", cls); return n; }
  function f1(v) { return v.toFixed(1); }

  function layout() {
    W = cv.clientWidth; H = cv.clientHeight;
    var hw = W * 1.04, hh = hw / A.ar, hx = (W - hw) / 2, hy = -0.04 * hh;
    mh.style.cssText = "left:" + hx + "px;top:" + hy + "px;width:" + hw + "px;height:" + hh + "px";
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    items.forEach(function (o, i) {
      var an = A.anchors[o.it.finger];
      o.ax = hx + an[0] / 100 * hw; o.ay = hy + an[1] / 100 * hh;
      o.tw = W * 0.225 * SIZE[i]; o.th = o.tw * 164 / 162;
      o.el.style.width = o.tw + "px"; o.el.style.height = o.th + "px"; o.el.style.setProperty("--tw", o.tw + "px");
      o.L = Math.max(0.28 * H, BOT[i] * H - o.th - o.ay);
      o.rest = Math.atan2(TX[i] * W - o.ax, o.L);
      o.bx = -PG * Math.tan(o.rest);                  /* тинч ҳолатда ип бироз эгик туради */
      o.eyeY = o.th * 0.043;
      if (!o.init) { o.th_ = o.rest; o.init = true; }
    });
  }
  function build(stage) {
    cv = stage.querySelector("#cv"); asm = stage.querySelector("#asm"); mh = asm.querySelector(".mh"); svg = asm.querySelector(".mstr");
    svg.innerHTML = "";
    items = ITEMS.map(function (it, i) {
      var o = { it: it, el: asm.querySelectorAll(".pitem")[i], th_: 0, w: 0, ph: i * 1.7 + 0.6, twist: (i % 2 ? 1 : -1) * 1.2, init: false };
      o.sh = el("path", "sh"); o.st = el("path", "st"); o.st2 = el("path", "st2"); o.kn = el("circle", "kn"); o.kn.setAttribute("r", "2.3");
      svg.appendChild(o.sh); svg.appendChild(o.st2); svg.appendChild(o.st); svg.appendChild(o.kn);
      o.el.addEventListener("pointerdown", function () { o.w += (Math.random() < 0.5 ? -1 : 1) * 1.5; }, { passive: true });
      return o;
    });
    layout(); draw(performance.now(), 0, 0);
  }
  function draw(now, hox, hoy) {
    items.forEach(function (o, i) {
      var axp = o.ax + hox, ayp = o.ay + hoy;
      var ex = axp + o.L * Math.sin(o.th_) + sx * DEPTH[i], ey = ayp + o.L * Math.cos(o.th_) + sy * DEPTH[i] * 0.5;
      var rot = o.th_ * 180 / Math.PI * 0.92 + o.twist + Math.sin(now / 1000 * 1.1 + o.ph) * 0.9;
      var rr = rot * Math.PI / 180, co = Math.cos(rr), si = Math.sin(rr);
      o.el.style.transform = "translate3d(" + f1(ex + si * o.eyeY - o.tw / 2) + "px," + f1(ey - co * o.eyeY) + "px,0) rotate(" + rot.toFixed(2) + "deg)";
      var gx = ex, gy = ey, sag = 0.012 * o.L, mx = (axp + gx) / 2 - o.w * o.L * 0.03, my = (ayp + gy) / 2 + sag;
      var d1 = "M" + f1(axp) + " " + f1(ayp) + "Q" + f1(mx) + " " + f1(my) + " " + f1(gx) + " " + f1(gy);
      var d2 = "M" + f1(axp + 1.1) + " " + f1(ayp) + "Q" + f1(mx + 1.4) + " " + f1(my + 0.6) + " " + f1(gx + 0.7) + " " + f1(gy);
      o.sh.setAttribute("d", d1); o.st.setAttribute("d", d1); o.st2.setAttribute("d", d2);
      o.kn.setAttribute("cx", f1(axp)); o.kn.setAttribute("cy", f1(ayp));
    });
  }
  function frame(now) {
    loop = requestAnimationFrame(frame);
    var dt = (now - last) / 1000; last = now;
    if (!(dt > 0)) return; if (dt > 1 / 30) dt = 1 / 30;
    var S = Z.sensors;
    sx += (S.tx - sx) * 0.08; sy += (S.ty - sy) * 0.08;
    var hox = sx * 12, hoy = sy * 8;
    mh.style.transform = "translate3d(" + hox.toFixed(2) + "px," + hoy.toFixed(2) + "px,0)";
    var r = asm.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    if (pcx === null) { pcx = cx; pcy = cy; }
    var vx = (cx - pcx) / dt, vy = (cy - pcy) / dt;
    var ax = clamp((vx - pvx) / dt, -7000, 7000), ay = clamp((vy - pvy) / dt, -7000, 7000);
    pcx = cx; pcy = cy; pvx = vx; pvy = vy;
    sax = sax * 0.45 + ax * 0.55; say = say * 0.45 + ay * 0.55;
    var ext = Z.shake(now), t = now / 1000;
    items.forEach(function (o, i) {
      var br = 130 * Math.sin(t * (0.8 + 0.13 * i) + o.ph) + 55 * Math.sin(t * (1.9 + 0.2 * i) + o.ph * 2);   /* ўзидан жонли ҳилпираш */
      var tilt = -sx * PG * 0.28;                                                                              /* телефон эгилса, гравитация йўналиши силжийди */
      var n = Math.ceil(dt / (1 / 120)), h = dt / n;
      for (var k = 0; k < n; k++) {
        var acc = -((PG - say - ext.y) * Math.sin(o.th_) + (sax + ext.x + br + tilt + o.bx) * Math.cos(o.th_)) / o.L - DAMP * o.w;
        o.w += acc * h; o.th_ += o.w * h;
      }
      o.th_ = clamp(o.th_, -0.62, 0.62);
      /* экран четидан чиқиб кетмаслиги учун "девор": тегса, сал қайтади */
      var m = o.tw / 2 + 8 + Math.abs(DEPTH[i]), axp = o.ax + sx * 12;
      var lo = Math.asin(clamp((m - axp) / o.L, -1, 1)), hi = Math.asin(clamp((W - m - axp) / o.L, -1, 1));
      if (o.th_ < lo) { o.th_ = lo; if (o.w < 0) o.w = -o.w * 0.3; } else if (o.th_ > hi) { o.th_ = hi; if (o.w > 0) o.w = -o.w * 0.3; }
    });
    draw(now, hox, hoy);
  }
  function start() { if (reduce || loop || !items.length) return; last = performance.now(); pcx = null; loop = requestAnimationFrame(frame); }
  function stop() { if (loop) cancelAnimationFrame(loop); loop = 0; }
  document.addEventListener("visibilitychange", function () { if (document.getElementById("asm")) { if (document.hidden) stop(); else start(); } });
  var rz = 0;
  window.addEventListener("resize", function () { if (!cv || !document.getElementById("asm")) return; clearTimeout(rz); rz = setTimeout(function () { layout(); draw(performance.now(), 0, 0); }, 120); });
  Z.promoState = function () { return items.map(function (o) { return { th: o.th_, L: o.L }; }); };   /* синов учун */

  /* ---------- Чиқиш: қўл ва иплар тепага тортилади ---------- */
  Z.exits.promo = function (done) {
    var a = document.getElementById("asm");
    if (!a || reduce) { done(); return; }
    var an = a.animate([{ transform: "translate3d(0,0,0)" }, { transform: "translate3d(0,-115%,0)" }], { duration: 760, easing: "cubic-bezier(.55,0,.85,.3)", fill: "forwards" });
    var fin = false; function f() { if (!fin) { fin = true; done(); } }
    an.onfinish = f; setTimeout(f, 1200);
  };

  Z.onRender(function () {
    stop(); items = []; cv = asm = mh = svg = null;
    var stage = document.getElementById("stage");
    if (!stage || stage.getAttribute("data-scene") !== "promo") return;
    sx = sy = 0; sax = say = 0;
    build(stage);
    var img = stage.querySelector(".mhf img");
    Z.waitImages([img], function () { requestAnimationFrame(function () { stage.classList.add("ready"); }); });
    start();
  });
})();
