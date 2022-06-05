import Swiper, {Pagination, Parallax, EffectFade } from "swiper";

const introSlider = new Swiper(".intro-slider", {
  modules: [Pagination, EffectFade, Parallax],
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  speed: 300,
  effect: 'fade',
  parallax: true,
});

export default introSlider;
