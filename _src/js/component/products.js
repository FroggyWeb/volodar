const readMore = document.querySelectorAll('.product__readmore');
const products = document.querySelector('.products')

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
    if (e.target.classList.contains('product-mark__name')) {

    }
  })
}
