/* Animation саҳнаси: футболчи (кадрма-кадр) пастки ўнг четдан югуриб киради, тўп билан ўйнайди ва калла устидан 3 марта тепади.
   Ҳар тепишда тўп экранга томон учади, катталашади, секинлашиб қотади; орқасида 2 та хира из ва тезлик чизиқлари.
   Қотган тўплар — 3 та вазифа. Вақтга боғлиқ детерминистик анимация (renderAt). */
Z.noDock = true;
(function () {
  "use strict";
  var Z = window.Z, SVGNS = "http://www.w3.org/2000/svg";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var A = (window.SCENE_ASSETS || {}).anim;

  /* 3 та тўп: матн калити, нима қилади, логотип, охирги жойи (саҳна ўлчамига нисбатан), радиус, матн катталиги, чуқурлик */
  var BALLS = [
    { key: "an.works", aria: "opt.watch.anim", logo: "ig", fx: 0.2, fy: 0.37, fr: 0.105, tf: 0.34, k: 0.6 },
    { key: "an.order", aria: "opt.order.anim", logo: "wa", wa: "wa.anim", fx: 0.5, fy: 0.22, fr: 0.14, tf: 0.26, k: 1 },
    { key: "an.course", aria: "opt.course.anim", logo: "wa", wa: "wa.course.anim", fx: 0.79, fy: 0.34, fr: 0.18, tf: 0.38, k: 1.5 }
  ];
  var GF = [0.68, 0.42], GO = [0.4, 0.2];                      /* из тўплари: йўлнинг қайси жойида қолади ва қанчалик хира */
  /* Вақт жадвали (мс) */
  var RUN = 900, DRI = 600, CRO = 250, KICK = 560, RST = 120, FL = 1100, FR = 70;
  var KS = [RUN + DRI + CRO]; KS[1] = KS[0] + KICK + RST + CRO; KS[2] = KS[1] + KICK + RST + CRO;
  var END = KS[2] + KICK, LAUNCH = 6 * FR, FROZEN = KS[2] + LAUNCH + FL;

  Z.register("anim", function () {
    var t = Z.t, e = Z.esc, S = Z.S;
    var pre = A.list.map(function (u) { return '<img class="pre" alt="" data-src="' + e(u) + '">'; }).join("");
    var sheets = '<i class="fs" data-s="run"></i><i class="fs" data-s="dr"></i><i class="fs" data-s="ki"></i>';
    var balls = BALLS.map(function (b, i) {
      var href = b.wa ? Z.waLink(t(b.wa)) : S.instagram.animations;
      return '<div class="abwrap" data-i="' + i + '"><a class="abal" href="' + e(href) + '" target="_blank" rel="noopener" aria-label="' + e(t(b.aria)) + '">' +
        '<img class="abimg" alt="" data-ball><span class="ab-logo">' + Z.ICON[b.logo] + '</span><span class="ab-txt" style="--tf:' + Math.min(b.tf, 1.5 / (t(b.key).length * 0.72)).toFixed(3) + '">' + e(t(b.key)) + "</span></a></div>";
    }).join("");
    var ghosts = BALLS.map(function () { return '<img class="gh" alt="" data-ball><img class="gh" alt="" data-ball>'; }).join("");
    return '<h1 class="sr">' + e(t("nav.anim")) + '</h1><p class="sr">' + e(t("anim.lead")) + "</p>" +
      '<div class="stage ascene' + (Z.fromLang ? " still" : "") + '" id="stage" data-scene="anim"><div class="boot" aria-hidden="true"><i></i></div>' +
      '<div class="canvas" id="cv"><div class="acont" id="acont">' + pre + '<svg class="atrail" aria-hidden="true" focusable="false"></svg>' + ghosts + '<div class="fb">' + sheets + "</div>" + balls + "</div></div></div>";
  });

  var cv, cont, fb, trail, sheets = {}, balls = [], W = 0, H = 0, CD = 0, base = 0, X0 = 0, X1 = 0, cellTop = 0, P0 = [0, 0], r0 = 0;
  var cur = { s: "", f: -1 }, loop = 0, t0 = 0, skip = false, sx = 0, sy = 0, pull = null, curT = 0;
  function lerp(a, b, u) { return a + (b - a) * u; }
  function el(n, c) { var x = document.createElementNS(SVGNS, n); if (c) x.setAttribute("class", c); return x; }
  function f1(v) { return v.toFixed(1); }

  function layout() {
    W = cv.clientWidth; H = cv.clientHeight;
    CD = H * 0.44; base = H * 0.94; X0 = W * 0.36; X1 = W * 1.22; cellTop = base - CD * 0.975;
    fb.style.width = fb.style.height = CD + "px";
    P0 = [X0 - CD / 2 + A.launch.x * CD, cellTop + A.launch.y * CD]; r0 = A.launch.r * CD;
    trail.setAttribute("viewBox", "0 0 " + W + " " + H);
    balls.forEach(function (o) {
      var b = o.b; o.R = b.fr * W; o.P1 = [b.fx * W, b.fy * H];
      var dx = o.P1[0] - P0[0], dy = o.P1[1] - P0[1], dist = Math.hypot(dx, dy);
      o.n = [dy / dist, -dx / dist]; o.bow = 0.1 * dist * (o.i === 2 ? -1 : 1);            /* сал эгилган йўл */
      var s = 2 * o.R + "px";
      o.wrap.style.width = o.wrap.style.height = s; o.wrap.style.setProperty("--R", o.R + "px");
      o.g.forEach(function (g) { g.style.width = g.style.height = s; });
    });
  }
  function pt(o, f) {
    var bow = o.bow * Math.sin(Math.PI * f);
    return [lerp(P0[0], o.P1[0], f) + o.n[0] * bow, lerp(P0[1], o.P1[1], f) + o.n[1] * bow];
  }
  function rad(o, f) { return lerp(r0, o.R, f); }

  function pose(t) {
    if (t < RUN) { var u = t / RUN; return { s: "run", f: Math.floor(t / 71) % 8, x: lerp(X1, X0, 1 - Math.pow(1 - u, 2.4)), a: 1 }; }
    if (t < RUN + DRI) return { s: "dr", f: Math.min(5, Math.floor((t - RUN) / 100)), x: X0, a: 1 };
    for (var i = 0; i < 3; i++) {
      var ks = KS[i], ke = ks + KICK, cs = ks - CRO;
      if (i > 0) {
        var rs = KS[i - 1] + KICK;
        if (t >= rs && t < rs + RST) { var u = (t - rs) / RST; return { s: u < 0.5 ? "ki" : "dr", f: u < 0.5 ? 7 : 6, x: X0, a: Math.abs(2 * u - 1) }; }
        cs = rs + RST;
      }
      if (t >= cs && t < ks) return { s: "dr", f: (t - cs) < (ks - cs) / 2 ? 6 : 7, x: X0, a: 1 };
      if (t >= ks && t < ke) return { s: "ki", f: Math.min(7, Math.floor((t - ks) / FR)), x: X0, a: 1 };
    }
    var r2 = END + 250;
    if (t < r2) return { s: "ki", f: 7, x: X0, a: 1 };
    if (t < r2 + RST) { var v = (t - r2) / RST; return { s: v < 0.5 ? "ki" : "dr", f: v < 0.5 ? 7 : 0, x: X0, a: Math.abs(2 * v - 1) }; }
    return { s: "dr", f: Math.floor((t - r2 - RST) / 110) % 6, x: X0, a: 1 };
  }

  function renderAt(t) {
    curT = t;
    var p = pose(t);
    if (cur.s !== p.s) { for (var k in sheets) sheets[k].style.visibility = (k === p.s ? "visible" : "hidden"); cur.s = p.s; cur.f = -1; }
    if (cur.f !== p.f) { sheets[p.s].style.backgroundPosition = ((p.f % 4) * 33.3333) + "% " + (Math.floor(p.f / 4) * 100) + "%"; cur.f = p.f; }
    fb.style.transform = "translate3d(" + f1(p.x - CD / 2) + "px," + f1(cellTop) + "px,0)"; fb.style.opacity = p.a < 1 ? p.a.toFixed(2) : "";
    balls.forEach(function (o) {
      var tt = t - (KS[o.i] + LAUNCH);
      if (tt < 0) { if (o.vis) { o.vis = false; o.wrap.style.visibility = "hidden"; o.g.forEach(function (g) { g.style.opacity = 0; }); o.lines.forEach(function (l) { l.setAttribute("opacity", 0); }); o.live = false; o.wrap.classList.remove("live"); } return; }
      o.vis = true; o.wrap.style.visibility = "visible";
      var pr = Math.min(1, tt / FL), e = 1 - Math.pow(1 - pr, 4);
      var par = [sx * 14 * o.b.k, sy * 9 * o.b.k], bob = e >= 0.999 ? Math.sin(t / 480 + o.i * 2) * 3 : 0;
      var c = pt(o, e), r = rad(o, e), sc = r / o.R, rot = (1 - e) * (o.i % 2 ? -540 : 540);
      o.wrap.style.transform = "translate3d(" + f1(c[0] - o.R + par[0]) + "px," + f1(c[1] - o.R + par[1] + bob) + "px,0) scale(" + sc.toFixed(3) + ")";
      o.img.style.transform = "rotate(" + rot.toFixed(1) + "deg)";
      if (e >= 0.985 && !o.live) { o.live = true; o.wrap.classList.add("live"); }
      if (o.lastE === e && e >= 0.999) { return; }                                   /* қотган: ортиқча ёзмаймиз (фақат тебраниш) */
      o.lastE = e;
      for (var g = 0; g < 2; g++) {                                                /* из: тўп ўтган жойда қолади */
        var gi = o.g[g];
        if (e >= GF[g]) { var gp = pt(o, GF[g]), gr = rad(o, GF[g]); gi.style.opacity = GO[g]; gi.style.transform = "translate3d(" + f1(gp[0] - o.R + par[0] * 0.6) + "px," + f1(gp[1] - o.R + par[1] * 0.6) + "px,0) scale(" + (gr / o.R).toFixed(3) + ")"; }
        else gi.style.opacity = 0;
      }
      var gr2 = rad(o, GF[1]);                                                     /* тезлик чизиқлари: иккинчи изнинг орқасида */
      for (var j = 0; j < 5; j++) {
        var a = 0.1 + 0.012 * j, b = 0.31 - 0.025 * Math.abs(j - 2), line = o.lines[j], bb = Math.min(e, b);
        if (bb > a + 0.02) {
          var A1 = pt(o, a), B1 = pt(o, bb), off = (j - 2) * 0.55 * gr2;
          line.setAttribute("x1", f1(A1[0] + o.n[0] * off + par[0] * 0.3)); line.setAttribute("y1", f1(A1[1] + o.n[1] * off + par[1] * 0.3));
          line.setAttribute("x2", f1(B1[0] + o.n[0] * off + par[0] * 0.3)); line.setAttribute("y2", f1(B1[1] + o.n[1] * off + par[1] * 0.3));
          line.setAttribute("opacity", e >= 0.999 ? 0.34 : 0.5);
        } else line.setAttribute("opacity", 0);
      }
    });
  }

  function frame(now) {
    loop = requestAnimationFrame(frame);
    var S = Z.sensors; sx += (S.tx - sx) * 0.08; sy += (S.ty - sy) * 0.08;
    renderAt(skip ? FROZEN + 1500 + (now - t0) : now - t0);
  }
  function start() { if (reduce) { renderAt(FROZEN + 1500); return; } if (loop) return; loop = requestAnimationFrame(frame); }
  function stop() { if (loop) cancelAnimationFrame(loop); loop = 0; }
  document.addEventListener("visibilitychange", function () { if (document.getElementById("acont")) { if (document.hidden) stop(); else if (t0) start(); } });
  var rz = 0;
  window.addEventListener("resize", function () { if (!cv || !document.getElementById("acont")) return; clearTimeout(rz); rz = setTimeout(function () { layout(); balls.forEach(function (o) { o.lastE = -1; }); renderAt(curT); }, 120); });
  Z.animSeek = function (ms) { stop(); t0 = 0; renderAt(ms); };                         /* синов учун */

  Z.exits.anim = function (done) {
    var a = document.getElementById("acont");
    if (!a || reduce) { done(); return; }
    var from = Z.pullOffset || 0, pulled = from < -30;
    a.style.transition = "none";
    var an = a.animate([{ transform: "translate3d(0," + from + "px,0)" }, { transform: "translate3d(0,-115%,0)" }],
      pulled ? { duration: 520, easing: "cubic-bezier(.3,.45,.7,1)", fill: "forwards" } : { duration: 760, easing: "cubic-bezier(.55,0,.85,.3)", fill: "forwards" });
    var fin = false; function f() { if (!fin) { fin = true; Z.pullOffset = 0; done(); } }
    an.onfinish = f; setTimeout(f, 1200);
  };
  document.addEventListener("keydown", function (e) {
    if (pull && document.getElementById("acont") && (e.key === "ArrowUp" || e.key === "Backspace" || e.key === "Escape")) { e.preventDefault(); pull.key(); }
  });

  Z.onRender(function () {
    stop(); balls = []; cv = cont = fb = trail = null; pull = null; cur = { s: "", f: -1 }; t0 = 0; sx = sy = 0;
    var stage = document.getElementById("stage");
    if (!stage || stage.getAttribute("data-scene") !== "anim") return;
    cv = stage.querySelector("#cv"); cont = stage.querySelector("#acont"); fb = cont.querySelector(".fb"); trail = cont.querySelector(".atrail");
    Array.prototype.forEach.call(cont.querySelectorAll(".fs"), function (i) { sheets[i.getAttribute("data-s")] = i; });
    var wraps = cont.querySelectorAll(".abwrap"), gh = cont.querySelectorAll(".gh");
    balls = BALLS.map(function (b, i) {
      var o = { b: b, i: i, wrap: wraps[i], img: wraps[i].querySelector(".abimg"), g: [gh[i * 2], gh[i * 2 + 1]], lines: [], vis: false, live: false, lastE: -1 };
      for (var j = 0; j < 5; j++) { var l = el("line"); l.setAttribute("opacity", 0); trail.appendChild(l); o.lines.push(l); }
      return o;
    });
    layout(); renderAt(0);
    var pres = Array.prototype.slice.call(stage.querySelectorAll(".pre"));
    skip = !!Z.fromLang;
    Z.waitImages(pres, function () {
      var u = pres.map(function (i) { return i.currentSrc || i.src; });
      sheets.run.style.backgroundImage = "url(" + u[0] + ")"; sheets.dr.style.backgroundImage = "url(" + u[1] + ")"; sheets.ki.style.backgroundImage = "url(" + u[2] + ")";
      Array.prototype.forEach.call(cont.querySelectorAll("[data-ball]"), function (i) { i.src = u[3]; });
      requestAnimationFrame(function () { stage.classList.add("ready"); t0 = performance.now(); start(); });
    });
    /* тепага тортиб бош саҳнага қайтиш */
    pull = Z.pull(cv, cont, { enabled: false });
    var armed = false; function arm() { if (!armed) { armed = true; pull.enable(); } }
    if (reduce || Z.fromLang) arm(); else setTimeout(arm, 1800);
  });
})();
