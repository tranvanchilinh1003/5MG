/**
 * Gỡ .mg-fonts-loading → .mg-fonts-ready khi document.fonts sẵn (hoặc timeout / reduced motion).
 * Phối hợp head-fonts-boot.html + globals.css (fade body).
 */
(function () {
  var root = document.documentElement;
  var done = false;
  var maxWait = null;

  function finish() {
    if (done) return;
    done = true;
    if (maxWait !== null) clearTimeout(maxWait);
    root.classList.remove("mg-fonts-loading");
    root.classList.add("mg-fonts-ready");
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finish();
    return;
  }

  maxWait = setTimeout(finish, 2800);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(finish).catch(finish);
  } else {
    finish();
  }
})();
