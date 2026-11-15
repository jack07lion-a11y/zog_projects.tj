/* Dev & Game (Code) саҳнаси: пастдан икки қўл механик клавиатурани силлиқ кўтариб чиқади. Клавиатурадаги 10 та бўш тўқ сариқ тугма —
   сизнинг тугмаларингиз (ёзув ва вазифа KEYS да). Тугмага тегилса, тепада терилаётгандек тўлиқ матн чиқади.
   Орқага қайтиш: пастга суриш (ёки пастга скролл) — клавиатура секин пастга сузиб кетади, шу пайт бош саҳна юкланади. */
Z.noDock = true;
(function () {
  "use strict";
  var Z = window.Z;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var A = (window.SCENE_ASSETS || {}).dev;

  /* Тугмалар (тартиб: биринчи қатор чапдан ўнгга, кейин иккинчи қатор). Ортиқча тугмани ўчириш: қаторни олиб ташланг; янгисини қўшиш: қатор қўшинг.
     key — қисқа ёзув, aria — тўлиқ матн (терилади), logo — иконка, wa — WhatsApp хабар матни, ig — Instagram, off — ҳали ишламайди */
  var KEYS = [
    { key: "dv.game", aria: "opt.order.game", logo: "game", wa: "wa.game" },
    { key: "dv.app", aria: "opt.order.app", logo: "dev", wa: "wa.app" },
    { key: "dv.web", aria: "opt.order.webapp", logo: "code", wa: "wa.webapp" },
    { key: "dv.site", aria: "opt.order.site", logo: "browser", wa: "wa.site" },
    { key: "dv.course", aria: "opt.course.dev", logo: "book", wa: "wa.course.dev" },
    { key: "dv.insta", aria: "opt.watch.dev", logo: "ig", ig: true },
    { key: "dv.chat", aria: "order.wa", logo: "wa", wa: "order.wa.text", phone: true },
    { key: "dv.soon", aria: "opt.play", logo: "playc", off: true }
  ];

  Z.register("dev", function () {
    var t = Z.t, e = Z.esc, S = Z.S;
    var keys = KEYS.map(function (k, i) {
      var b = A.keys[i]; if (!b) return "";
      var st = "left:" + (b[0] / A.iw * 100).toFixed(2) + "%;top:" + (b[1] / A.ih * 100).toFixed(2) + "%;width:" + ((b[2] - b[0] + 1) / A.iw * 100).toFixed(2) + "%;height:" + ((b[3] - b[1] + 1) / A.ih * 100).toFixed(2) + "%;--i:" + i +
        ";--f:" + Math.min(1, 5.2 / t(k.key).length).toFixed(2);
      var inner = '<span class="dk-i">' + Z.ICON[k.logo] + '</span><span class="dk-t">' + e(t(k.key)) + "</span>";
      var full = t(k.aria) + (k.phone ? " · " + S.phoneDisplay : "");
      if (k.off) return '<span class="dkey off" style="' + st + '" role="img" aria-label="' + e(full) + '" data-say="' + e(full) + '">' + inner + "</span>";
      var href = k.ig ? S.instagram.dev : Z.waLink(t(k.wa));
      return '<a class="dkey" style="' + st + '" href="' + e(href) + '" target="_blank" rel="noopener" aria-label="' + e(full) + '" data-say="' + e(full) + '">' + inner + "</a>";
    }).join("");
    var img = '<img alt="" decoding="async" width="' + A.iw + '" height="' + A.ih + '" sizes="' + e(A.sizes) + '" data-src="' + e(A.src) + '" data-srcset="' + e(A.srcset) + '">';
    return '<h1 class="sr">' + e(t("nav.dev")) + '</h1><p class="sr">' + e(t("dev.lead")) + "</p>" +
      '<div class="stage dscene' + (Z.fromLang ? " still" : "") + '" id="stage" data-scene="dev"><div class="boot" aria-hidden="true"><i></i></div>' +
      '<div class="canvas" id="cv"><div class="dcont" id="dcont"><div class="dcap" id="dcap" aria-hidden="true"><span id="dcapt"></span><i class="dcur"></i></div>' +
      '<div class="dkb" id="dkb">' + img + keys + "</div>" +
      '<button type="button" class="dback" id="dback" aria-label="' + e(t("dv.back")) + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 5H9l-6.5 7L9 19h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z"/><path d="m15.5 9.5-5 5M10.5 9.5l5 5"/></svg></button>' +
      "</div></div></div>";
  });

  var cv, cont, kb, cap, capt, pull = null, typer = 0, zt = 0, goT = 0, sayText = "", sayStart = 0, idleText = "";
  var CPS = 30, READ = 1100;                       /* ҳарф тезлиги (мс) ва матн терилиб бўлгач ўқиш учун танаффус (мс) */
  function layout() {
    var W = cv.clientWidth, H = cv.clientHeight;
    var iw = W, ih = iw / A.ar;
    if (ih > H * 0.9) { ih = H * 0.9; iw = ih * A.ar; }
    kb.style.cssText = "left:" + ((W - iw) / 2).toFixed(1) + "px;top:" + (H - ih).toFixed(1) + "px;width:" + iw.toFixed(1) + "px;height:" + ih.toFixed(1) + "px;--kw:" + iw.toFixed(1) + "px";
    var gap = H - ih;
    cap.style.top = Math.max(10, gap * 0.45 - 12).toFixed(1) + "px";
    /* Яқинлаштириш: 10 та тўқ сариқ тугма блоки экран энини тўлдиради. Блок маркази экранда юқорироқда туради */
    var bx0 = 1e9, by0 = 1e9, bx1 = 0, by1 = 0;
    A.keys.forEach(function (b) { bx0 = Math.min(bx0, b[0]); by0 = Math.min(by0, b[1]); bx1 = Math.max(bx1, b[2]); by1 = Math.max(by1, b[3]); });
    var k = iw / A.iw, ocx = (bx0 + bx1) / 2 * k, ocy = (by0 + by1) / 2 * k;
    var zs = Math.min(0.94 * W / ((bx1 - bx0) * k), 2.6);
    var tx = W / 2 - ((W - iw) / 2 + ocx), ty = Math.max(H * 0.3, 118 + (by1 - by0) * k * zs / 2) - ((H - ih) + ocy);
    kb.style.setProperty("--ox", ocx.toFixed(1) + "px"); kb.style.setProperty("--oy", ocy.toFixed(1) + "px");
    kb.style.setProperty("--zx", tx.toFixed(1) + "px"); kb.style.setProperty("--zy", ty.toFixed(1) + "px"); kb.style.setProperty("--zs", zs.toFixed(3));
  }
  function zoomIn() {
    var stage = document.getElementById("stage"); if (!stage || !kb) return;
    kb.classList.add("z"); stage.classList.add("zoomed");
  }
  /* Тепада терилаётган матн */
  function say(text) {
    clearInterval(typer); sayText = text; sayStart = performance.now();
    if (reduce) { capt.textContent = text; return; }
    var i = 0; capt.textContent = "";
    typer = setInterval(function () { i++; capt.textContent = text.slice(0, i); if (i >= text.length) clearInterval(typer); }, CPS);
  }
  function bind() {
    var bk = cont.querySelector("#dback");
    if (bk) bk.addEventListener("click", function () { if (pull) pull.key(); else Z.back(); });
    Array.prototype.forEach.call(cont.querySelectorAll(".dkey"), function (k) {
      var txt = k.getAttribute("data-say");
      ["pointerdown", "focus"].forEach(function (ev) { k.addEventListener(ev, function () { k.classList.add("p"); say(txt); }, { passive: true }); });
      ["pointerup", "pointercancel", "pointerleave", "blur"].forEach(function (ev) { k.addEventListener(ev, function () { k.classList.remove("p"); }, { passive: true }); });
      k.addEventListener("mouseenter", function () { say(txt); });
      /* Босилганда аввал матн терилади, фойдаланувчи ўқиб улгургач — ўтилади */
      k.addEventListener("click", function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
        e.preventDefault();
        var href = k.getAttribute("href"); if (!href) return;
        if (sayText !== txt) say(txt);
        var typed = txt.length * CPS, left = Math.max(0, typed - (performance.now() - sayStart)) + (reduce ? 300 : READ);
        Array.prototype.forEach.call(cont.querySelectorAll(".dkey.sel"), function (x) { x.classList.remove("sel"); });
        k.classList.add("sel"); clearTimeout(goT);
        goT = setTimeout(function () { k.classList.remove("sel"); window.location.href = href; }, left);
      });
    });
  }
  document.addEventListener("keydown", function (e) {
    if (pull && document.getElementById("dcont") && (e.key === "ArrowDown" || e.key === "Backspace" || e.key === "Escape")) { e.preventDefault(); pull.key(); }
  });
  var rz = 0;
  window.addEventListener("resize", function () { if (!cv || !document.getElementById("dcont")) return; clearTimeout(rz); rz = setTimeout(layout, 120); });

  /* Чиқиш: клавиатура секин, чиройли пастга сузиб кетади (шу пайт бош саҳна скриптлари юкланади) */
  Z.exits.dev = function (done) {
    clearTimeout(zt); clearTimeout(goT);
    var a = document.getElementById("dcont"), st = document.getElementById("stage");
    var zoomed = !!(st && st.classList.contains("zoomed"));
    if (zoomed) { st.classList.remove("zoomed"); if (kb) kb.classList.remove("z"); }       /* аввал клавиатура кичраяди (zoom out) */
    if (!a || reduce) { done(); return; }
    var c = document.getElementById("dcap"); if (c) c.style.opacity = 0;
    function crawl() {                                                                         /* кейин секин пастга сузиб кетади */
      var from = Z.pullOffset || 0, pulled = from > 30;
      a.style.transition = "none";
      var an = a.animate([{ transform: "translate3d(0," + from + "px,0)" }, { transform: "translate3d(0,112%,0)" }],
        { duration: pulled ? 1100 : 1500, easing: "cubic-bezier(.42,.05,.4,1)", fill: "forwards" });
      var fin = false; function f() { if (!fin) { fin = true; Z.pullOffset = 0; done(); } }
      an.onfinish = f; setTimeout(f, 2200);
    }
    if (zoomed) setTimeout(crawl, 700); else crawl();
  };

  Z.onRender(function () {
    clearInterval(typer); clearTimeout(zt); clearTimeout(goT); cv = cont = kb = cap = capt = null; pull = null;
    var stage = document.getElementById("stage");
    if (!stage || stage.getAttribute("data-scene") !== "dev") return;
    cv = stage.querySelector("#cv"); cont = stage.querySelector("#dcont"); kb = cont.querySelector("#dkb"); cap = cont.querySelector("#dcap"); capt = cont.querySelector("#dcapt");
    layout(); bind();
    idleText = Z.t("nav.dev");
    Z.waitImages([kb.querySelector("img")], function () {
      requestAnimationFrame(function () {
        stage.classList.add("ready");
        setTimeout(function () { stage.classList.add("typing"); say(idleText); }, reduce || Z.fromLang ? 0 : 1300);
        if (reduce || Z.fromLang) zoomIn(); else zt = setTimeout(zoomIn, 2150);                 /* кўтарилгач, тугмаларга яқинлашади */
      });
    });
    /* пастга суриш (ёки скролл) — бош саҳнага қайтиш; кириш анимацияси тугагач ёқилади */
    pull = Z.pull(cv, cont, { enabled: false, dir: "down" });
    var armed = false; function arm() { if (!armed) { armed = true; pull.enable(); } }
    if (reduce || Z.fromLang) arm(); else setTimeout(arm, 1900);
  });
})();
