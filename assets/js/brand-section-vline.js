/**
 * Thanh dọc #brand-section-vline: full chiều cao section, căn ngang lệch trái 7% chiều rộng so với tâm #brand-icon-brand.
 */
(function () {
  var line;
  var section;
  var icon;
  var debounceId;
  var ro;

  function apply() {
    line = line || document.getElementById('brand-section-vline');
    section = section || document.getElementById('brand-section');
    icon = icon || document.getElementById('brand-icon-brand');
    if (!line || !section || !icon) return;

    var sr = section.getBoundingClientRect();
    var ir = icon.getBoundingClientRect();
    if (ir.width <= 0 || sr.width <= 0) return;

    /* Căn tâm icon −1% width; +8px so với bản trước (≈612px → 620px tại layout hiện tại) */
    var cx = ir.left + ir.width / 2 - sr.left - ir.width * 0.01 + 8;
    cx = Math.max(2, Math.min(sr.width - 2, cx));
    line.style.left = Math.round(cx) + 'px';
    section.style.setProperty('--brand-icon-h', Math.round(ir.height) + 'px');
  }

  function debounced() {
    clearTimeout(debounceId);
    debounceId = setTimeout(apply, 48);
  }

  function run() {
    apply();
    requestAnimationFrame(apply);
  }

  function bindResizeObserver() {
    if (!section || typeof ResizeObserver === 'undefined') return;
    if (ro) ro.disconnect();
    ro = new ResizeObserver(debounced);
    ro.observe(section);
    if (icon) ro.observe(icon);
  }

  function whenIconReady(cb) {
    if (!icon) {
      cb();
      return;
    }
    if (icon.complete) cb();
    else {
      icon.addEventListener('load', cb, { once: true });
      icon.addEventListener('error', cb, { once: true });
    }
  }

  function init() {
    line = document.getElementById('brand-section-vline');
    section = document.getElementById('brand-section');
    icon = document.getElementById('brand-icon-brand');
    if (!line || !section || !icon) return;
    whenIconReady(function () {
      run();
      bindResizeObserver();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('resize', debounced);
  window.addEventListener('load', function () {
    if (!section) init();
    run();
  });
})();
