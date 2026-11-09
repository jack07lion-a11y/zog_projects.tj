/* Қўллар: (1) юклашни назорат қилиш — секин интернетда қотмаслик;
           (2) енгил параллакс;
           (3) иконкаларнинг физикаси: иконка икки ип билан бармоқ учларига боғланган, қўл тез келиб тўхтаганда
               инерциядан орқага силжиб, пружинадек чайқалиб тинчийди. */
(function () {
  "use strict";
  var Z = window.Z; if (!Z) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NS = "http://www.w3.org/2000/svg";

  /* ---------- 1) Юклаш ---------- */
  function startImg(img, attempt) {
    var ss = img.getAttribute("data-srcset") || "", s = img.getAttribute("data-src") || "";
    if (attempt) { ss = ss.replace(/\.webp(\s|$)/g, ".webp?r=" + attempt + "$1"); s = s.replace(/\.webp$/, ".webp?r=" + attempt); }
    if (ss) img.srcset = ss;
    img.src = s;
  }
  function gate(stage) {
    var imgs = Array.prototype.slice.call(stage.querySelectorAll(".art img")), left = imgs.length;
    function reveal() { requestAnimationFrame(function () { stage.classList.add("ready"); }); }
    if (!left) { reveal(); return; }
    function one() { if (--left === 0) reveal(); }
    imgs.forEach(function (img) {
      var attempt = 0, done = false, timer = 0;
      function ok() { if (done) return; done = true; (img.decode ? img.decode().catch(function () {}) : Promise.resolve()).then(one); }
      function fail() {
        if (done) return; clearTimeout(timer); attempt++;
        var go = function () { window.removeEventListener("online", go); clearTimeout(timer); if (!done) startImg(img, attempt); };
        window.addEventListener("online", go); timer = setTimeout(go, Math.min(1500 * attempt, 8000));
      }
      img.addEventListener("load", ok); img.addEventListener("error", fail); startImg(img, 0);
    });
  }

  /* ---------- 2) Параллакс ---------- */
  var arts = [], tx = 0, ty = 0, cx = 0, cy = 0, praf = 0;
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function papply() {
    for (var i = 0; i < arts.length; i++) arts[i].el.style.transform = "translate3d(" + (cx * 18 * arts[i].k).toFixed(2) + "px," + (cy * 14 * arts[i].k).toFixed(2) + "px,0)";
  }
  function ptick() { cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08; papply(); praf = (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) ? requestAnimationFrame(ptick) : 0; }
  function pkick() { if (!praf && arts.length) praf = requestAnimationFrame(ptick); }
  window.addEventListener("pointermove", function (e) { if (!arts.length || reduce) return; tx = (e.clientX / window.innerWidth - 0.5) * 2; ty = (e.clientY / window.innerHeight - 0.5) * 2; pkick(); }, { passive: true });
  window.addEventListener("deviceorientation", function (e) { if (!arts.length || reduce || e.gamma == null) return; tx = clamp(e.gamma / 22, -1, 1); ty = clamp((e.beta - 45) / 22, -1, 1); pkick(); }, { passive: true });

  /* ---------- 3) Иконка + иплар + физика ---------- */
  var K = 36, CD = 2.3, KY = 52, G = 0.85, LIM = 32;      /* пружина қаттиқлиги, сўниш, тик йўналишда қаттиқроқ, инерция кучи, энг катта силжиш (px) */
  var CORNERS = [[0.16, 0.14], [0.84, 0.14], [0.16, 0.86], [0.84, 0.86]];
  var tiles = [], loop = 0, last = 0;
  Z.tilesState = function () { return tiles.map(function (T) { return { x: T.x, y: T.y }; }); };   /* синов учун */

  function el(name, cls) { var n = document.createElementNS(NS, name); if (cls) n.setAttribute("class", cls); return n; }
  function layout(T) {
    var art = T.art, W = art.offsetWidth, d = T.d, H = W / (parseFloat(art.getAttribute("data-ar")) || 1.25);
    T.W = W; T.H = H;
    T.tw = d.pw / 100 * W; T.th = T.tw * 164 / 162;
    T.pn.style.width = T.tw + "px"; T.pn.style.height = T.th + "px";
    T.A = [d.ax / 100 * W, d.ay / 100 * H]; T.B = [d.bx / 100 * W, d.by / 100 * H];
    T.c = [(T.A[0] + T.B[0]) / 2 + d.ox * d.shift * W, (T.A[1] + T.B[1]) / 2 + d.oy * d.shift * W];   /* тинч ҳолатдаги марказ */
    /* ип боғланадиган бурчаклар: ҳар бармоққа энг яқини */
    var r = d.rot * Math.PI / 180, co = Math.cos(r), si = Math.sin(r);
    function pos(c) { var lx = (c[0] - 0.5) * T.tw, ly = (c[1] - 0.5) * T.th; return [T.c[0] + lx * co - ly * si, T.c[1] + lx * si + ly * co]; }
    function nearest(P, skip) { var b = -1, bd = 1e9; CORNERS.forEach(function (c, i) { if (i === skip) return; var p = pos(c), dd = Math.hypot(p[0] - P[0], p[1] - P[1]); if (dd < bd) { bd = dd; b = i; } }); return b; }
    var e1 = nearest(T.A, -1), e2 = nearest(T.B, e1);
    T.e = [CORNERS[e1], CORNERS[e2]];
    T.svg.setAttribute("viewBox", "0 0 " + W + " " + H);
  }
  function buildTiles(stage) {
    tiles = [];
    Array.prototype.forEach.call(stage.querySelectorAll(".art"), function (art) {
      var pn = art.querySelector(".pnl"); if (!pn) return;
      var g = function (k) { return parseFloat(pn.getAttribute("data-" + k)); };
      var T = { art: art, pn: pn, d: { ax: g("ax"), ay: g("ay"), bx: g("bx"), by: g("by"), ox: g("ox"), oy: g("oy"), pw: g("pw") || 21, rot: g("rot") || 0, shift: g("shift") || 0.115 },
        x: 0, y: 0, vx: 0, vy: 0, px: null, py: null, pvx: 0, pvy: 0, sax: 0, say: 0, ph: Math.random() * 6.28, cx: 0, cy: 0 };
      var svg = el("svg", "strings"); svg.setAttribute("aria-hidden", "true"); svg.setAttribute("focusable", "false");
      T.parts = [];
      for (var i = 0; i < 2; i++) {
        var p = { sh: el("path", "sh"), st: el("path", "st"), st2: el("path", "st2"), kn: el("circle", "kn"), ey: el("circle", "ey") };
        p.kn.setAttribute("r", "2.6"); p.ey.setAttribute("r", "3.4");
        svg.appendChild(p.sh); svg.appendChild(p.st2); svg.appendChild(p.st); svg.appendChild(p.kn); svg.appendChild(p.ey);
        T.parts.push(p);
      }
      art.appendChild(svg); T.svg = svg;
      layout(T); draw(T, 0); tiles.push(T);
    });
  }
  function f1(v) { return v.toFixed(1); }
  function draw(T, now) {
    var X = T.c[0] + T.x, Y = T.c[1] + T.y;
    var deg = T.d.rot + 0.22 * T.x + 0.05 * T.y + Math.sin(now / 1000 * 1.15 + T.ph) * 1.2;
    var r = deg * Math.PI / 180, co = Math.cos(r), si = Math.sin(r);
    T.pn.style.transform = "translate3d(" + f1(X - T.tw / 2) + "px," + f1(Y - T.th / 2) + "px,0) rotate(" + deg.toFixed(2) + "deg)";
    var anchors = [T.A, T.B];
    for (var i = 0; i < 2; i++) {
      var c = T.e[i], lx = (c[0] - 0.5) * T.tw, ly = (c[1] - 0.5) * T.th;
      var gx = X + lx * co - ly * si, gy = Y + lx * si + ly * co, a = anchors[i], p = T.parts[i];
      var len = Math.hypot(gx - a[0], gy - a[1]), mx = (a[0] + gx) / 2 - T.vx * 0.012, my = (a[1] + gy) / 2 + 0.07 * len + Math.abs(T.vx) * 0.006;
      var dd = "M" + f1(a[0]) + " " + f1(a[1]) + "Q" + f1(mx) + " " + f1(my) + " " + f1(gx) + " " + f1(gy);
      var dd2 = "M" + f1(a[0] + 1) + " " + f1(a[1]) + "Q" + f1(mx + 1.6) + " " + f1(my + 1.8) + " " + f1(gx + 0.6) + " " + f1(gy);
      p.sh.setAttribute("d", dd); p.st.setAttribute("d", dd); p.st2.setAttribute("d", dd2);
      p.kn.setAttribute("cx", f1(a[0])); p.kn.setAttribute("cy", f1(a[1])); p.ey.setAttribute("cx", f1(gx)); p.ey.setAttribute("cy", f1(gy));
    }
  }
  function frame(now) {
    loop = requestAnimationFrame(frame);
    var dt = (now - last) / 1000; last = now;
    if (!(dt > 0)) return; if (dt > 1 / 30) dt = 1 / 30;
    var i, T;
    for (i = 0; i < tiles.length; i++) { T = tiles[i]; var r = T.art.getBoundingClientRect(); T.cx = r.left + r.width / 2; T.cy = r.top + r.height / 2; }   /* аввал ўқиймиз */
    for (i = 0; i < tiles.length; i++) {
      T = tiles[i];
      if (T.px === null) { T.px = T.cx; T.py = T.cy; }
      var vx = (T.cx - T.px) / dt, vy = (T.cy - T.py) / dt;
      var ax = clamp((vx - T.pvx) / dt, -7000, 7000), ay = clamp((vy - T.pvy) / dt, -7000, 7000);
      T.px = T.cx; T.py = T.cy; T.pvx = vx; T.pvy = vy;
      T.sax = T.sax * 0.45 + ax * 0.55; T.say = T.say * 0.45 + ay * 0.55;        /* қўлнинг тезланиши (шовқинсиз) */
      var n = Math.ceil(dt / (1 / 120)), h = dt / n;
      for (var s = 0; s < n; s++) {                                              /* қўл рамкасида: инерция кучи = -тезланиш */
        T.vx += (-K * T.x - CD * T.vx - G * T.sax) * h; T.x += T.vx * h;
        T.vy += (-KY * T.y - CD * 1.1 * T.vy - G * T.say) * h; T.y += T.vy * h;
      }
      T.x = clamp(T.x, -LIM, LIM); T.y = clamp(T.y, -LIM * 0.8, LIM * 0.8);
      draw(T, now);
    }
  }
  function start() { if (reduce || loop || !tiles.length) return; last = performance.now(); loop = requestAnimationFrame(frame); }
  function stop() { if (loop) cancelAnimationFrame(loop); loop = 0; }
  document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
  var rz = 0;
  window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(function () { tiles.forEach(function (T) { layout(T); draw(T, performance.now()); }); }, 120); });

  Z.onRender(function () {
    stop();
    var stage = document.getElementById("stage");
    arts = []; tiles = []; tx = ty = cx = cy = 0;
    if (!stage) return;
    Array.prototype.forEach.call(stage.querySelectorAll(".art"), function (a) { arts.push({ el: a, k: parseFloat(a.getAttribute("data-k")) || 1 }); });
    buildTiles(stage);
    gate(stage);
    start();
  });
})();
