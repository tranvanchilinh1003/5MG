/**
 * Scroll reveal: .reveal-on-scroll → .is-revealed khi vào viewport.
 * CSS: opacity + scale nhẹ (~0.97) → 1. Banner/hero đầu mỗi trang không gắn class.
 */
(function () {
  if (typeof IntersectionObserver === "undefined") return;

  var sel = ".reveal-on-scroll";

  function reveal(el) {
    if (!el.classList.contains("is-revealed")) {
      el.classList.add("is-revealed");
    }
  }

  function init() {
    var nodes = document.querySelectorAll(sel);
    if (!nodes.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(reveal);
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (!e.isIntersecting) continue;
          reveal(e.target);
          io.unobserve(e.target);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -6% 0px",
        threshold: 0.06,
      }
    );

    for (var j = 0; j < nodes.length; j++) {
      io.observe(nodes[j]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
