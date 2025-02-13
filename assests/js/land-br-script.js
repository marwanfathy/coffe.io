var swiper = new Swiper(".mySwiper", {
  speed: 1000,
  parallax: true,
  loop : true,
  grabCursor: true,
  autoplay: {
    delay: 4000,
  },
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
  