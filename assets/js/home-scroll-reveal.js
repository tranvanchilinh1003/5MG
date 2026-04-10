/**
 * Mọi trang: cuộn tới khối nào thì fade/slide vào (IntersectionObserver).
 * Phần tử: .reveal-on-scroll → thêm .is-revealed khi vào viewport.
 */
(function () {
  if (typeof IntersectionObserver === "undefined") return;

  var nodes = document.querySelectorAll(".reveal-on-scroll");
  if (!nodes.length) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    nodes.forEach(function (el) {
      el.classList.add("is-revealed");
    });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        io.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -6% 0px",
      threshold: [0, 0.06, 0.12],
    }
  );

  nodes.forEach(function (el) {
    io.observe(el);
  });
})();
