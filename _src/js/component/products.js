import mixitup from 'mixitup';

const readMore = document.querySelectorAll('.product__readmore');
const products = document.querySelector('.products')

mixitup('.mixed', {
  // load: {
  // 	sort: 'order:asc'
  // },
	// animation: {
  //   effects: 'fade rotateZ(-180deg)',
  //   duration: 700
  // },
  // classNames: {
  //   block: 'programs',
  //   elementFilter: 'filter-btn',
  //   elementSort: 'sort-btn'
  // },
  selectors: {
    target: '.product'
  }
});


if (products) {
  document.addEventListener('click', function (e) {
    //показ футера продукта
    if (e.target.classList.contains('product__readmore')) {
      e.preventDefault()
      const el = e.target
      el.previousElementSibling.classList.toggle('open')
      if (!el.classList.contains('open')) {
        el.textContent = 'свернуть'
      } else {
        el.textContent = 'читать ещё'
      }
      el.classList.toggle('open')
    }

    //показ заказа марки продукта
    if (e.target.closest('.product-mark')) {
      const open = document.querySelector('.product-mark.open')
      if (open && !e.target.classList.contains('open')) {
        open.classList.remove('open')
      }
      e.target.closest('.product-mark').classList.toggle('open')
    }
  })
}
