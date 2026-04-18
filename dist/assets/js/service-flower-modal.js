/**
 * Trang chủ — cánh hoa Our Service: mở dialog + Swiper theo prefix ảnh (bki_ / ss_ / sx_ / tt_).
 */
(function () {
  const DIALOG_ID = 'serviceFlowerDialog';
  const SWIPER_SEL = '#serviceFlowerModalSwiper';
  const BASE = 'assets/images/Service_img/';

  const SLIDES = {
    bki: [
      'bki_kols_clear.webp',
      'bki_vin.webp',
      'bki_omo.webp',
      'bki_ganier.webp',
      'bki_ganier2.webp',
      'bki_ganier3.webp',
      'bki_klairs.webp',
      'bki_lifeboy.webp',
      'bki_luxa.webp',
      'bki_she.webp',
      'bki_sundate.webp',
    ],
    ss: ['ss_social_performance.webp'],
    sx: ['sx_film_ngan.webp', 'sx_livestream.webp', 'sx_social_content.webp'],
    tt: ['tt_tiktokcapcut.webp'],
  };

  const TITLES = {
    bki: 'Booking KOLs & Influencers',
    ss: 'Social Performance',
    sx: 'Sản xuất',
    tt: 'TikTok Trending',
  };

  function slideHtml(src, eager) {
    const loadAttrs = eager
      ? 'loading="eager" fetchpriority="high" decoding="async"'
      : 'loading="lazy" decoding="async"';
    return (
      '<div class="swiper-slide">' +
      '<div class="service-flower-dialog__slide-inner">' +
      '<figure class="service-flower-dialog__figure">' +
      '<img src="' +
      BASE +
      src +
      '" alt="" class="service-flower-dialog__img" ' +
      loadAttrs +
      ' />' +
      '</figure></div></div>'
    );
  }

  document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById(DIALOG_ID);
    if (!dialog || typeof Swiper === 'undefined') return;

    const swiperEl = dialog.querySelector(SWIPER_SEL);
    const wrapper = swiperEl?.querySelector('.swiper-wrapper');
    const titleEl = dialog.querySelector('#serviceFlowerDialogTitle');
    const prevBtn = dialog.querySelector('[data-service-flower-prev]');
    const nextBtn = dialog.querySelector('[data-service-flower-next]');
    if (!swiperEl || !wrapper || !titleEl) return;

    let swiperInstance = null;

    function destroySwiper() {
      if (swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
      }
    }

    function openWithPrefix(prefix) {
      const files = SLIDES[prefix];
      if (!files || !files.length) return;

      const title = TITLES[prefix] || '';
      titleEl.textContent = title;
      dialog.setAttribute('aria-label', title);

      wrapper.innerHTML = files.map((f, i) => slideHtml(f, i === 0)).join('');

      const multi = files.length > 1;
      /* rewind: từ slide 0 “prev” → cuối sẽ animate translate một mạch qua mọi slide (như chạy 1 vòng).
         loop (≥3 ảnh): nhảy cạnh ngắn qua slide clone — cuối ↔ đầu một bước. 2 ảnh: rewind vẫn chỉ cách 1 slide. */
      const useLoop = multi && files.length >= 3;
      const useRewind = multi && !useLoop;
      if (prevBtn) prevBtn.classList.toggle('hidden', !multi);
      if (nextBtn) nextBtn.classList.toggle('hidden', !multi);

      destroySwiper();
      dialog.classList.remove('service-flower-dialog--shown');

      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      }

      // Phải mở dialog trước khi init Swiper — khi dialog đóng width ≈ 0, init sớm gây layout giật.
      // Slide (không fade): clip bo góc ổn định với border-radius.
      swiperInstance = new Swiper(swiperEl, {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 480,
        effect: 'slide',
        autoHeight: false,
        loop: useLoop,
        ...(useLoop ? { loopAdditionalSlides: 1 } : {}),
        rewind: useRewind,
        watchOverflow: false,
        resistanceRatio: 0.65,
        preventInteractionOnTransition: true,
        ...(multi
          ? {
              autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                waitForTransition: true,
                pauseOnMouseEnter: true,
              },
            }
          : {}),
        ...(multi && prevBtn && nextBtn
          ? {
              navigation: {
                prevEl: prevBtn,
                nextEl: nextBtn,
              },
            }
          : {}),
      });

      if (typeof window.bindMgSwiperHandSqueeze === 'function') {
        window.bindMgSwiperHandSqueeze(swiperEl);
      }

      requestAnimationFrame(() => {
        swiperInstance?.update?.();
        requestAnimationFrame(() => {
          dialog.classList.add('service-flower-dialog--shown');
        });
      });
    }

    function closeDialog() {
      dialog.classList.remove('service-flower-dialog--shown');
      if (dialog.open) dialog.close();
      destroySwiper();
      wrapper.innerHTML = '';
    }

    document.querySelectorAll('[data-service-flower]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const prefix = btn.getAttribute('data-service-flower');
        if (!prefix || !SLIDES[prefix]) return;
        e.preventDefault();
        openWithPrefix(prefix);
      });
    });

    dialog.querySelectorAll('[data-service-flower-close]').forEach((el) => {
      el.addEventListener('click', () => closeDialog());
    });

    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) closeDialog();
    });

    dialog.addEventListener('close', () => {
      dialog.classList.remove('service-flower-dialog--shown');
      destroySwiper();
      wrapper.innerHTML = '';
    });
  });
})();
