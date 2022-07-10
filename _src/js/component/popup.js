import { Fancybox } from "@fancyapps/ui";


const popups = document.querySelectorAll('[data-popup]')
const search = document.querySelector('.header__search');

function closePopup(el) {
  const popupOpenen = document.querySelector('.popup-show')
  document.body.classList.remove('popup-open')
  if (popupOpenen) {
    popupOpenen.classList.remove('popup-show')
  }
  }

  function openPopup(el) {
  if (el.dataset.popup == 'bg') {
    document.body.classList.add('popup-open')
  }
  el.classList.add('popup-show')
}

popups.forEach((element) => {
  element.addEventListener('click', (e) => {
    if (!e.target.closest('.popup') || e.target.closest('.close-popup')) {
      const bodyStatus = document.body.classList.contains('popup-open');
      (bodyStatus) ? closePopup(element) : openPopup(element)
    }
  })
})


document.getElementById('overlay').addEventListener('click', () => {closePopup()})

document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
      closePopup();
    }
};


// Fancybox.show([
//   {
//     src: '<div class="modal-msg"> <div class="modal-msg__ico"> <img src="../img/icon/check-list.svg" alt=""> </div> <div class="modal-msg__title">Ваша заявка успешно принята!</div> <div class="modal-msg__txt">С вами скоро сваяжется наш менеджер</div> </div>',
//     type: 'html'
//   }
// ])

