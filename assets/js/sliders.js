/* Trang chủ 5MG chưa dùng BlazeSlider — file tồn tại để tránh 404 từ index.html */

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
        delay: 5000,
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
  });
});
