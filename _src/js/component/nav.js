import hcOffcanvasNav from 'hc-offcanvas-nav';

document.addEventListener('DOMContentLoaded', function () {

  var Nav = new hcOffcanvasNav('#main-nav', {
    disableAt: 1024,
    customToggle: '.burger',
    navTitle: false,
    levelTitles: true,
    levelTitleAsBack: true,
    levelOpen: "overlap",
    labelBack: "Назад",
  });

  //  const faqList =  new BadgerAccordion('.js-badger-accordion');
  const headerNav = document.createElement("div")
  const menuTop = document.querySelector(".nav-wrapper-0 .nav-content")
  headerNav.classList.add('js-navbar')
  console.log(menuTop)
  menuTop.insertBefore(headerNav, menuTop.querySelector('.nav__list'))

  headerNav.appendChild(document.querySelector('.header__lang').cloneNode(true))
  headerNav.appendChild(document.querySelector('.header__right').cloneNode(true))
  // if (window.matchMedia("(max-width: 1223px)").matches) {
  //   headerNav.appendChild(document.querySelector('.header__lang'))
  // }
});
