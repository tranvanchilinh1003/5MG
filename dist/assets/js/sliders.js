/* Trang chủ 5MG chưa dùng BlazeSlider — file tồn tại để tránh 404 từ index.html */

/** Grab + bóp ảnh khi nhấn — dùng chung poster / popup / KOL (CSS: globals .mg-swiper--pressing). */
function bindMgSwiperHandSqueeze(swiperEl) {
  if (!swiperEl || swiperEl.dataset.mgHandSqueezeBound === '1') return;
  swiperEl.dataset.mgHandSqueezeBound = '1';
  const pressingClass = 'mg-swiper--pressing';
  const endPress = () => {
    swiperEl.classList.remove(pressingClass);
    window.removeEventListener('pointerup', endPress);
    window.removeEventListener('pointercancel', endPress);
  };
  swiperEl.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    swiperEl.classList.add(pressingClass);
    window.addEventListener('pointerup', endPress);
    window.addEventListener('pointercancel', endPress);
  });
}
window.bindMgSwiperHandSqueeze = bindMgSwiperHandSqueeze;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof Swiper === 'undefined') return;

  const posterOpts = (swiperEl) => {
    const wrap = swiperEl.parentElement;
    const nextBtn = wrap?.querySelector('.production-swiper-next');
    const prevBtn = wrap?.querySelector('.production-swiper-prev');
    return {
      loop: true,
      slidesPerView: 1,
      speed: 450,
      autoHeight: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      ...(nextBtn && prevBtn
        ? {
            navigation: {
              nextEl: nextBtn,
              prevEl: prevBtn,
            },
          }
        : {}),
    };
  };

  document.querySelectorAll('#productionPosterSwiper, #ourworksPosterSwiper').forEach((el) => {
    new Swiper(el, posterOpts(el));
    bindMgSwiperHandSqueeze(el);
  });
});
