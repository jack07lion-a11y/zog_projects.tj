/* Қўллар параллакси: бармоқ / сичқонча / телефон эгилиши */
(function () {
  "use strict";
  var Z = window.Z; if (!Z) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var stage = null, tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function apply() {
    if (!stage) return;
    stage.style.setProperty("--mx", cx.toFixed(3));
    stage.style.setProperty("--my", cy.toFixed(3));
  }
  function tick() {
    cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08; apply();
    raf = (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) ? requestAnimationFrame(tick) : 0;
  }
  function kick() { if (!raf && stage) raf = requestAnimationFrame(tick); }
  window.addEventListener("pointermove", function (e) {
    if (!stage || reduce) return;
    tx = (e.clientX / window.innerWidth - 0.5) * 2; ty = (e.clientY / window.innerHeight - 0.5) * 2; kick();
  }, { passive: true });
  window.addEventListener("deviceorientation", function (e) {
    if (!stage || reduce || e.gamma == null) return;
    tx = clamp(e.gamma / 22, -1, 1); ty = clamp((e.beta - 45) / 22, -1, 1); kick();
  }, { passive: true });
  Z.onRender(function () { stage = document.getElementById("stage"); tx = ty = cx = cy = 0; apply(); });
})();
