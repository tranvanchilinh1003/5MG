/**
 * Vệt sáng header (.mg-corner-shine--top) chỉ chạy khi <body> có .mg-header-corner-shine.
 * 1) Chiều cao theo đáy .home-hero-title (+ blur) — chỉ khi có .home-hero-title (home).
 * 2) Độ mờ theo scroll: .home-hero-shell (home) hoặc #service-page / main (trang Dịch vụ).
 * 3) z-index (applyCornerShineStacking): trên .site-header-gradient-layer (0), dưới thanh .site-header — không đè logo/menu.
 */
(function () {
  var resizeT;
  var scrollTicking = false;

  function legacyHeightFloor() {
    var vh = window.innerHeight;
    var w = window.innerWidth;
    if (w >= 1024) return Math.min(vh * 0.985, 980);
    if (w >= 768) return Math.min(vh * 0.95, 840);
    return Math.min(vh * 0.92, 740);
  }

  /** Neo lớp vệt giữa nền gradient và toàn bộ nội dung header (chữ/logo/menu) */
  function applyCornerShineStacking() {
    var shine = document.querySelector('.mg-corner-shine--top');
    if (!shine) return;
    /* 1 = trên gradient (0); << .site-header (50) và .site-header-body / .header-brand (15–35) */
    shine.style.setProperty('z-index', '1');
  }

  /** Vùng hero/section dùng để tính --mg-shine-scroll khi cuộn */
  function getShineScrollRoot() {
    if (document.body.classList.contains('page-service')) {
      return document.querySelector('#service-page') || document.querySelector('main');
    }
    return document.querySelector('.home-hero-shell');
  }

  function syncCornerShineHeight() {
    if (!document.body.classList.contains('mg-header-corner-shine')) return;
    var shine = document.querySelector('.mg-corner-shine--top');
    var title = document.querySelector('.home-hero-title');
    if (!shine || !title) return;
    var shineTop = shine.getBoundingClientRect().top;
    var titleBottom = title.getBoundingClientRect().bottom;
    var bleedPx = 200;
    var toTitle = titleBottom - shineTop + bleedPx;
    var floor = legacyHeightFloor();
    shine.style.height = Math.max(toTitle, floor, 400) + 'px';
  }

  /** Hệ số 0…1: 1 = đủ sáng, 0 = hết hero (cuộn dần, cùng nhịp với header sticky) */
  function updateShineScrollFade() {
    var shine = document.querySelector('.mg-corner-shine--top');
    if (!shine) return;
    var hero = getShineScrollRoot();
    if (!hero) {
      shine.style.setProperty('--mg-shine-scroll', '1');
      return;
    }

    var r = hero.getBoundingClientRect();
    var h = Math.max(r.height, 1);
    /* Vùng fade dài hơn → vệt sáng tụt dần trong nhiều px scroll hơn */
    var range = Math.min(Math.max(h * 0.55, 220), 600);
    var scrolledPast = Math.max(0, -r.top);
    var t = 1 - Math.min(1, scrolledPast / range);
    shine.style.setProperty('--mg-shine-scroll', t.toFixed(4));
  }

  function debouncedSyncHeight() {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () {
      syncCornerShineHeight();
      updateShineScrollFade();
    }, 80);
  }

  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(function () {
      updateShineScrollFade();
      scrollTicking = false;
    });
  }

  function init() {
    if (!document.body.classList.contains('mg-header-corner-shine')) return;
    var shine = document.querySelector('.mg-corner-shine--top');
    if (!shine) return;
    applyCornerShineStacking();
    var hero = getShineScrollRoot();
    if (!hero) {
      shine.style.setProperty('--mg-shine-scroll', '1');
      return;
    }

    function runMeasure() {
      syncCornerShineHeight();
      updateShineScrollFade();
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          syncCornerShineHeight();
          updateShineScrollFade();
        });
      });
    }
    runMeasure();
    window.addEventListener('resize', debouncedSyncHeight);
    window.addEventListener('scroll', onScroll, { passive: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(runMeasure);
    }
    if (typeof ResizeObserver !== 'undefined') {
      var ro = new ResizeObserver(function () {
        syncCornerShineHeight();
        updateShineScrollFade();
      });
      ro.observe(hero);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
