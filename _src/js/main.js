import { Fancybox } from "@fancyapps/ui";
import "./component/sliders";
import "./component/select";
// import "./component/drawLine";
import "./component/nav";
import "./component/dynamicAdapt";
import "./component/products";
import "./component/tabs";


if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
  document.body.classList.add('touch')
}

Fancybox.bind("[data-fancybox]", {
  // Your options go here
});
