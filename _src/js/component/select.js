import Choices from "choices.js";
import mixitup from 'mixitup';

const choices = new Choices('#select-lang', {
  allowHTML: false,
  searchEnabled: false,
  itemSelectText: false,

});

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
    console.log(e.detail.choice.value)
    vacancyContainer.filter(`[data-mix="${e.detail.choice.value}"]`);
  })


}
