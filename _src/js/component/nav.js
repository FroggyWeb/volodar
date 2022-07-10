import hcOffcanvasNav from 'hc-offcanvas-nav';
import Choices from "choices.js";

  var Nav = new hcOffcanvasNav('#main-nav', {
    disableAt: 1024,
    customToggle: '.burger',
    navTitle: false,
    levelTitles: true,
    levelTitleAsBack: true,
    levelOpen: "overlap",
    labelBack: "Назад",
  });

  // add mobilenav extend panel
  const headerNav = document.createElement("div")
  const menuTop = document.querySelector(".nav-wrapper-0 .nav-content")
  headerNav.classList.add('js-navbar')
  console.log(menuTop)
  menuTop.insertBefore(headerNav, menuTop.querySelector('.nav__list'))

  headerNav.appendChild(document.querySelector('.mob-panel'))


const langDesktop = new Choices('.lang-desktop', {
  allowHTML: false,
  searchEnabled: false,
  itemSelectText: false,
});
const langMob = new Choices('.lang-mob', {
  allowHTML: false,
  searchEnabled: false,
  itemSelectText: false,
});

document.querySelector('.mob-panel').addEventListener('click', (e) => {
  e.stopPropagation;
})

// accordion
function initAcc(elem, option, media){
  document.addEventListener('click', function (e) {
    if (!e.target.closest(elem + ' .a-btn')) {
      return
    };
    if (media && !window.matchMedia(`(max-width: ${media})`).matches)  return;
    else {
      e.preventDefault()
      const panel = e.target.closest('.a-item')
      if(!panel.classList.contains('active')){
        if (option == true) {
          var elementList = document.querySelectorAll(elem + ' > .a-item');
          Array.prototype.forEach.call(elementList, function (e) {
              e.classList.remove('active');
          });
        }
        panel.classList.add('active');
      }else{
          panel.classList.remove('active');
      }
    }
  });
}

initAcc('.footer-nav__list', true, '767px');
initAcc('.faq', true);

