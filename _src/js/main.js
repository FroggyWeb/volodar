import { Fancybox } from "@fancyapps/ui";
import "./component/sliders";
import "./component/nav";
import "./component/select";
import "./component/dynamicAdapt";
import "./component/products";
import "./component/tabs";
import "./component/popup";


if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
  document.body.classList.add('touch')
}

Fancybox.bind("[data-fancybox]", {
  // Your options go here
});
