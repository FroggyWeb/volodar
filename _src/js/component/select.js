import Choices from "choices.js";
import mixitup from 'mixitup';

const choices = new Choices('#select-lang', {
  allowHTML: false,
  searchEnabled: false,
  itemSelectText: false,

});

let newsArhiv = document.getElementById('news-arhiv')
if (newsArhiv) {
  const newsArhivSelect = new Choices(newsArhiv, {
    allowHTML: false,
    searchEnabled: false,
    itemSelectText: false,
    shouldSort: false,

  })
}

const vacancy = document.getElementById('select-vacancy')
if (vacancy) {
  const choicesVacansy = new Choices(vacancy, {
    allowHTML: false,
    searchEnabled: false,
    itemSelectText: false,
  });

  // document.querySelector('.vacancys__list');
  const vacancyContainer = mixitup('.vacancys__list', {
    selectors: {
      target: '.mix'
    }
  });

  choicesVacansy.passedElement.element.addEventListener('choice', (e) => {
    if (e.detail.choice.value == 'all') {
      vacancyContainer.filter('all')
    } else {
      vacancyContainer.filter(`[data-mix="${e.detail.choice.value}"]`);
    }
  })


}
