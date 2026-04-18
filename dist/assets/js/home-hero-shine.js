/**
 * Vệt sáng header (.mg-corner-shine--top) chỉ chạy khi <body> có .mg-header-corner-shine.
 * 1) Chiều cao theo đáy .home-hero-title (+ bleed), kẹp [min, max]; đo lại mỗi lần scroll (tránh F5 khi đã cuộn xuống → kẹp min rồi kéo lên vẫn nhỏ).
 * 2) Độ mờ theo scroll: .home-hero-shell (home) hoặc #service-page / main (trang Dịch vụ).
 * 3) z-index: chỉnh trong CSS (.mg-corner-shine--top), không gán inline — tránh đè rule home/service.
 * 4) Preload ảnh vệt góc rồi gán body.mg-header-shine-art--ready — CSS ẩn bg tới lúc đó, tránh chớp tắt.
 *    Không chờ img.decode() mới gọi callback: decode có thể xếp hàng sau F5 / Ctrl+Shift+R → vệt góc trễ tải.
 */
(function () {
  var SHINE_ART_READY_TIMEOUT_MS = 4000;
  /** Cùng quy tắc với CSS url(../images/...) — lấy gốc từ link stylesheet thật, tránh 404 khi mở HTML không đúng thư mục. */
  function resolveShineImageUrl(filename) {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    var i;
    var hrefAttr;
    for (i = 0; i < links.length; i++) {
      hrefAttr = links[i].getAttribute('href');
      if (hrefAttr && hrefAttr.indexOf('assets/css') !== -1) {
        return new URL('../images/' + filename, new URL(hrefAttr, document.baseURI)).href;
      }
    }
    return new URL('assets/images/' + filename, document.baseURI).href;
  }

  function loadImageThen(src, cb) {
    var img = new Image();
    var done = false;
    function end() {
      if (done) return;
      done = true;
      cb();
      if (typeof img.decode === 'function') {
        img.decode().catch(function () {});
      }
    }
    img.onload = end;
    img.onerror = end;
    img.src = src;
    if (img.complete && img.naturalWidth > 0) end();
  }

  /** Sao fold (star.png): decode sớm + fetchpriority — giảm pop-in sau hard refresh (ảnh đã có trong DOM). */
  function primeFoldStarImages() {
    var imgs = document.querySelectorAll('img.home-hero-fold-star[src], img.kol-swiper-fold-star[src]');
    var i;
    var img;
    for (i = 0; i < imgs.length; i++) {
      img = imgs[i];
      try {
        img.setAttribute('fetchpriority', 'high');
      } catch (e) {}
      if (img.complete && img.naturalWidth > 0) {
        if (typeof img.decode === 'function') {
          img.decode().catch(function () {});
        }
      } else {
        img.addEventListener(
          'load',
          function () {
            var el = this;
            if (typeof el.decode === 'function') {
              el.decode().catch(function () {});
            }
          },
          { once: true }
        );
      }
    }
  }

  function markShineArtReady() {
    var b = document.body;
    if (b && !b.classList.contains('mg-header-shine-art--ready')) {
      b.classList.add('mg-header-shine-art--ready');
    }
    primeFoldStarImages();
  }

  /** Góc home + service + Join About: cùng light_white.webp (không còn light_bg cho header). */
  function ensureShineArtReadyClass() {
    var b = document.body;
    if (!b) return;
    if (b.classList.contains('mg-header-shine-art--ready')) {
      primeFoldStarImages();
      return;
    }
    var needWhite =
      (b.classList.contains('page-home') && b.classList.contains('mg-header-corner-shine')) ||
      !!document.querySelector('.mg-corner-shine--join-contact');
    if (!needWhite) {
      markShineArtReady();
      return;
    }
    var left = 0;
    var timeoutId = setTimeout(function () {
      if (!document.body || document.body.classList.contains('mg-header-shine-art--ready')) return;
      markShineArtReady();
    }, SHINE_ART_READY_TIMEOUT_MS);
    function tick() {
      left--;
      if (left <= 0) {
        clearTimeout(timeoutId);
        markShineArtReady();
      }
    }
    if (needWhite) {
      left++;
      loadImageThen(resolveShineImageUrl('light_white.webp'), tick);
    }
  }

  function bindShineArtReady() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', ensureShineArtReadyClass);
    } else {
      ensureShineArtReadyClass();
    }
    window.addEventListener(
      'load',
      function () {
        ensureShineArtReadyClass();
      },
      { once: true }
    );
  }

  bindShineArtReady();

  var resizeT;
  var scrollTicking = false;

  /** Sàn / trần px — tránh inline height 980px (cũ: Math.max(..., floor 980)) che cả hero */
  function shineHeightBounds() {
    var vh = window.innerHeight;
    var w = window.innerWidth;
    /* Trần px + vh đủ lớn — tránh kẹt thấp khi chỉ min(vh nhỏ, px) */
    if (w >= 1024) return { min: 305, max: Math.min(Math.round(vh * 0.66), 775) };
    if (w >= 768) return { min: 282, max: Math.min(Math.round(vh * 0.60), 720) };
    return { min: 246, max: Math.min(Math.round(vh * 0.48), 600) };
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
    var bleedPx = 485;
    var measured = titleBottom - shineTop + bleedPx;
    var b = shineHeightBounds();
    var h = Math.min(Math.max(measured, b.min), b.max);
    shine.style.height = h + 'px';
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
      /* Luôn đo lại chiều cao khi cuộn — F5 ở dưới banner rồi kéo lên: lần đầu title ngoài viewport khiến measured kẹp min, trước đây không sync lại khi scroll */
      syncCornerShineHeight();
      updateShineScrollFade();
      scrollTicking = false;
    });
  }

  function init() {
    if (!document.body.classList.contains('mg-header-corner-shine')) return;
    var shine = document.querySelector('.mg-corner-shine--top');
    if (!shine) return;
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
    window.addEventListener(
      'pageshow',
      function () {
        syncCornerShineHeight();
        updateShineScrollFade();
        primeFoldStarImages();
      },
      { passive: true }
    );
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
