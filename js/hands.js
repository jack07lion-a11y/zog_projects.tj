/* Қўллар: параллакс (бармоқ/сичқонча/телефон эгилиши/скролл) ва танлаш анимацияси */
(function () {
  "use strict";
  var Z = window.Z; if (!Z) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var stage = null, tx = 0, ty = 0, cx = 0, cy = 0, sy = 0, raf = 0;
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function apply() {
    if (!stage) return;
    stage.style.setProperty("--mx", cx.toFixed(3));
    stage.style.setProperty("--my", cy.toFixed(3));
    stage.style.setProperty("--sy", sy.toFixed(3));
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
  window.addEventListener("scroll", function () {
    if (!stage || reduce) return;
    sy = clamp(window.scrollY / (stage.offsetHeight || 1), 0, 1.5); kick();
  }, { passive: true });
  window.addEventListener("pageshow", function () {
    var s = document.getElementById("stage");
    if (s) { s.classList.remove("choose"); var p = s.querySelector(".picked"); if (p) p.classList.remove("picked"); }
  });

  Z.onRender(function () {
    stage = document.getElementById("stage");
    if (!stage) return;
    tx = ty = cx = cy = sy = 0; apply();
    /* Панел босилганда: қолган қўллар чекинади, танланган панел катталашади, кейин саҳифа очилади */
    stage.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a.panel");
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault(); e.stopPropagation();
      var href = a.getAttribute("href");
      if (reduce) { location.href = href; return; }
      stage.classList.add("choose");
      a.closest(".hand").classList.add("picked");
      setTimeout(function () {
        document.body.classList.add("leaving");
        setTimeout(function () { location.href = href; }, 200);
      }, 420);
    }, true);
  });
})();
