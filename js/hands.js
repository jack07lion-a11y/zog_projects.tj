/* Бош саҳна (3 та қўл): юклашни назорат қилиш, параллакс, иконка физикаси, қайтиш (чиқиш) анимацияси.
   Сенсорлар (эгилиш, силкиниш) core.js даги Z.sensors дан олинади. Рухсат сўрайдиган тугма йўқ. */
(function () {
  "use strict";
  var Z = window.Z; if (!Z) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NS = "http://www.w3.org/2000/svg";

  /* ---------- 1) Юклаш: ҳамма расм тайёр бўлгунча ҳеч нарса кўринмайди ---------- */
  function startImg(img, attempt) {
    var ss = img.getAttribute("data-srcset") || "", s = img.getAttribute("data-src") || "";
    if (attempt) { ss = ss.replace(/\.webp(\s|$)/g, ".webp?r=" + attempt + "$1"); s = s.replace(/\.webp$/, ".webp?r=" + attempt); }
    if (ss) img.srcset = ss;
    img.src = s;
  }
  function gate(stage) {
    var imgs = Array.prototype.slice.call(stage.querySelectorAll(".art img")), left = imgs.length;
    function reveal() { requestAnimationFrame(function () { stage.classList.add("ready"); setTimeout(prefetch, 2500); }); }
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

  /* ---------- 2) Бошқа саҳналарни олдиндан юклаш (тинч вақтда, интернет секин бўлмаса) ---------- */
  var prefetched = false;
  function prefetch() {
    if (prefetched) return; prefetched = true;
    var c = navigator.connection;
    if (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || ""))) return;
    var v = Z.ver || "", list = ["animation.html", "promotion.html", "dev.html", "js/pages/anim.js" + v, "js/pages/promo.js" + v, "js/pages/dev.js" + v];
    var idle = window.requestIdleCallback || function (f) { return setTimeout(f, 1500); };
    idle(function () {
      list.forEach(function (u) { try { fetch(u, { credentials: "same-origin" }).catch(function () {}); } catch (e) {} });
      var SA = window.SCENE_ASSETS || {};
      Object.keys(SA).forEach(function (k) {            /* саҳна расмлари: браузер ўзи тўғри ўлчамни танлайди */
        var im = new Image(); try { im.fetchPriority = "low"; } catch (e) {}
        im.sizes = SA[k].sizes; im.srcset = SA[k].srcset; im.src = SA[k].src;
      });
    });
  }

  /* ---------- 3) Иконка + иплар + физика ---------- */
  var K = 36, CD = 2.3, KY = 52, G = 0.85, LIM = 32;
  var CORNERS = [[0.16, 0.14], [0.84, 0.14], [0.16, 0.86], [0.84, 0.86]];
  var arts = [], tiles = [], loop = 0, last = 0, cx = 0, cy = 0;
  Z.tilesState = function () { return tiles.map(function (T) { return { x: T.x, y: T.y }; }); };   /* синов учун */
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function el(name, cls) { var n = document.createElementNS(NS, name); if (cls) n.setAttribute("class", cls); return n; }
  function layout(T) {
    var art = T.art, W = art.offsetWidth, d = T.d, H = W / (parseFloat(art.getAttribute("data-ar")) || 1.25);
    T.W = W; T.H = H; T.tw = d.pw / 100 * W; T.th = T.tw * 164 / 162;
    T.pn.style.width = T.tw + "px"; T.pn.style.height = T.th + "px";
    T.A = [d.ax / 100 * W, d.ay / 100 * H]; T.B = [d.bx / 100 * W, d.by / 100 * H];
    T.c = [(T.A[0] + T.B[0]) / 2 + d.ox * d.shift * W, (T.A[1] + T.B[1]) / 2 + d.oy * d.shift * W];
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
    var S = Z.sensors, i, T;
    /* параллакс (бармоқ/эгилиш) — фақат transform */
    cx += (S.tx - cx) * 0.08; cy += (S.ty - cy) * 0.08;
    for (i = 0; i < arts.length; i++) arts[i].el.style.transform = "translate3d(" + (cx * 18 * arts[i].k).toFixed(2) + "px," + (cy * 14 * arts[i].k).toFixed(2) + "px,0)";
    var ext = Z.shake(now);
    for (i = 0; i < tiles.length; i++) { T = tiles[i]; var r = T.art.getBoundingClientRect(); T.cx = r.left + r.width / 2; T.cy = r.top + r.height / 2; }   /* аввал ўқиймиз */
    for (i = 0; i < tiles.length; i++) {
      T = tiles[i];
      if (T.px === null) { T.px = T.cx; T.py = T.cy; }
      var vx = (T.cx - T.px) / dt, vy = (T.cy - T.py) / dt;
      var ax = clamp((vx - T.pvx) / dt, -7000, 7000), ay = clamp((vy - T.pvy) / dt, -7000, 7000);
      T.px = T.cx; T.py = T.cy; T.pvx = vx; T.pvy = vy;
      T.sax = T.sax * 0.45 + ax * 0.55; T.say = T.say * 0.45 + ay * 0.55;
      var fax = T.sax + ext.x, fay = T.say + ext.y;
      var n = Math.ceil(dt / (1 / 120)), h = dt / n;
      for (var s = 0; s < n; s++) {
        T.vx += (-K * T.x - CD * T.vx - G * fax) * h; T.x += T.vx * h;
        T.vy += (-KY * T.y - CD * 1.1 * T.vy - G * fay) * h; T.y += T.vy * h;
      }
      T.x = clamp(T.x, -LIM, LIM); T.y = clamp(T.y, -LIM * 0.8, LIM * 0.8);
      draw(T, now);
    }
  }
  function start() { if (reduce || loop || (!tiles.length && !arts.length)) return; last = performance.now(); loop = requestAnimationFrame(frame); }
  function stop() { if (loop) cancelAnimationFrame(loop); loop = 0; }
  document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
  var rz = 0;
  window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(function () { tiles.forEach(function (T) { layout(T); draw(T, performance.now()); }); }, 120); });

  /* ---------- 4) Қайтиш (чиқиш) анимацияси: қўллар битта-битта чекинади, танланган — энг охирида ---------- */
  var HAND_OF = { promo: "h2", anim: "h1", dev: "h3" }, ROW = { h2: 0, h1: 1, h3: 2 };   /* ROW: тепадан пастга */
  Z.exits.home = function (done, ctx) {
    var stage = document.getElementById("stage");
    if (!stage || stage.getAttribute("data-scene") !== "home" || reduce) { done(); return; }
    stage.classList.add("leaving");
    var H = window.HANDS || {}, hes = {};
    Array.prototype.forEach.call(stage.querySelectorAll(".he"), function (he) { hes[he.getAttribute("data-key")] = he; });
    var chosen = HAND_OF[ctx.to];
    var order = Object.keys(H).filter(function (k) { return k !== chosen; }).sort(function (a, b) {      /* танлангандан энг узоқдагиси биринчи */
      return Math.abs(ROW[b] - ROW[chosen]) - Math.abs(ROW[a] - ROW[chosen]) || ROW[b] - ROW[a];
    });
    if (chosen && H[chosen]) order.push(chosen);
    var finished = false;
    function fin() { if (finished) return; finished = true; done(); }
    order.forEach(function (k, i) {
      var he = hes[k]; if (!he) return;
      var an = he.animate([{ transform: "translate3d(0,0,0)" }, { transform: "translate3d(" + (H[k].fx || 0) + "%," + (H[k].fy || 0) + "%,0)" }],
        { duration: 800, delay: i * 260, easing: "cubic-bezier(.55,0,.85,.3)", fill: "forwards" });
      if (i === order.length - 1) an.onfinish = fin;
    });
    setTimeout(fin, 800 + order.length * 260 + 500);                                                    /* ҳимоя */
  };

  Z.onRender(function () {
    stop();
    var stage = document.getElementById("stage");
    arts = []; tiles = []; cx = cy = 0;
    if (!stage || stage.getAttribute("data-scene") !== "home") return;
    Array.prototype.forEach.call(stage.querySelectorAll(".art"), function (a) { arts.push({ el: a, k: parseFloat(a.getAttribute("data-k")) || 1 }); });
    buildTiles(stage);
    gate(stage);
    start();
  });
})();
