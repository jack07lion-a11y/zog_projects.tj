/* Қўллар: юклашни назорат қилиш (секин интернетда қотмаслик) ва енгил параллакс.
   Қўл расмлари тўлиқ юкланиб, декодланмагунча ҳеч нарса кўринмайди ва анимация бошланмайди;
   юкланиши билан бирданига силлиқ учиб киради. Интернет узилса — тикланганда ўзи қайта уринади. */
(function () {
  "use strict";
  var Z = window.Z; if (!Z) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Юклаш ---------- */
  function startImg(img, attempt) {
    var ss = img.getAttribute("data-srcset") || "", s = img.getAttribute("data-src") || "";
    if (attempt) { /* кэшдаги хато жавобни четлаб ўтиш */
      ss = ss.replace(/\.webp(\s|$)/g, ".webp?r=" + attempt + "$1"); s = s.replace(/\.webp$/, ".webp?r=" + attempt);
    }
    if (ss) img.srcset = ss;
    img.src = s;
  }
  function gate(stage) {
    var imgs = Array.prototype.slice.call(stage.querySelectorAll(".art > img"));
    var left = imgs.length;
    function reveal() { requestAnimationFrame(function () { stage.classList.add("ready"); }); }
    if (!left) { reveal(); return; }
    function one() { if (--left === 0) reveal(); }
    imgs.forEach(function (img) {
      var attempt = 0, done = false, timer = 0;
      function ok() {
        if (done) return; done = true;
        (img.decode ? img.decode().catch(function () {}) : Promise.resolve()).then(one);   /* декодлаш — анимация вақтида қотишнинг олдини олади */
      }
      function fail() {
        if (done) return;
        clearTimeout(timer); attempt++;
        var go = function () { window.removeEventListener("online", go); clearTimeout(timer); if (!done) startImg(img, attempt); };
        window.addEventListener("online", go);
        timer = setTimeout(go, Math.min(1500 * attempt, 8000));
      }
      img.addEventListener("load", ok); img.addEventListener("error", fail);
      startImg(img, 0);
    });
  }

  /* ---------- Параллакс (бармоқ / сичқонча / телефон эгилиши): фақат transform, дарахтни қайта ҳисобламасдан ---------- */
  var arts = [], tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function apply() {
    for (var i = 0; i < arts.length; i++) {
      arts[i].el.style.transform = "translate3d(" + (cx * 18 * arts[i].k).toFixed(2) + "px," + (cy * 14 * arts[i].k).toFixed(2) + "px,0)";
    }
  }
  function tick() {
    cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08; apply();
    raf = (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) ? requestAnimationFrame(tick) : 0;
  }
  function kick() { if (!raf && arts.length) raf = requestAnimationFrame(tick); }
  window.addEventListener("pointermove", function (e) {
    if (!arts.length || reduce) return;
    tx = (e.clientX / window.innerWidth - 0.5) * 2; ty = (e.clientY / window.innerHeight - 0.5) * 2; kick();
  }, { passive: true });
  window.addEventListener("deviceorientation", function (e) {
    if (!arts.length || reduce || e.gamma == null) return;
    tx = clamp(e.gamma / 22, -1, 1); ty = clamp((e.beta - 45) / 22, -1, 1); kick();
  }, { passive: true });

  Z.onRender(function () {
    var stage = document.getElementById("stage");
    arts = []; tx = ty = cx = cy = 0;
    if (!stage) return;
    Array.prototype.forEach.call(stage.querySelectorAll(".art"), function (el) { arts.push({ el: el, k: parseFloat(el.getAttribute("data-k")) || 1 }); });
    gate(stage);
  });
})();
