/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./_src/js/component/dynamicAdapt.js":
/*!*******************************************!*\
  !*** ./_src/js/component/dynamicAdapt.js ***!
  \*******************************************/
/***/ (() => {

"use strict";
eval("// Dynamic Adapt v.1\n// HTML data-da=\"where(uniq class name),when(breakpoint),position(digi)\"\n// e.x. data-da=\".item,992,2\"\n// Andrikanych Yevhen 2020\n// https://www.youtube.com/c/freelancerlifestyle\n\n\nfunction DynamicAdapt(type) {\n  this.type = type;\n}\n\nDynamicAdapt.prototype.init = function () {\n  const _this = this; // массив объектов\n\n\n  this.оbjects = [];\n  this.daClassname = \"_dynamic_adapt_\"; // массив DOM-элементов\n\n  this.nodes = document.querySelectorAll(\"[data-da]\"); // наполнение оbjects объктами\n\n  for (let i = 0; i < this.nodes.length; i++) {\n    const node = this.nodes[i];\n    const data = node.dataset.da.trim();\n    const dataArray = data.split(\",\");\n    const оbject = {};\n    оbject.element = node;\n    оbject.parent = node.parentNode;\n    оbject.destination = document.querySelector(dataArray[0].trim());\n    оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : \"767\";\n    оbject.place = dataArray[2] ? dataArray[2].trim() : \"last\";\n    оbject.index = this.indexInParent(оbject.parent, оbject.element);\n    this.оbjects.push(оbject);\n  }\n\n  this.arraySort(this.оbjects); // массив уникальных медиа-запросов\n\n  this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {\n    return '(' + this.type + \"-width: \" + item.breakpoint + \"px),\" + item.breakpoint;\n  }, this);\n  this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {\n    return Array.prototype.indexOf.call(self, item) === index;\n  }); // навешивание слушателя на медиа-запрос\n  // и вызов обработчика при первом запуске\n\n  for (let i = 0; i < this.mediaQueries.length; i++) {\n    const media = this.mediaQueries[i];\n    const mediaSplit = String.prototype.split.call(media, ',');\n    const matchMedia = window.matchMedia(mediaSplit[0]);\n    const mediaBreakpoint = mediaSplit[1]; // массив объектов с подходящим брейкпоинтом\n\n    const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {\n      return item.breakpoint === mediaBreakpoint;\n    });\n    matchMedia.addListener(function () {\n      _this.mediaHandler(matchMedia, оbjectsFilter);\n    });\n    this.mediaHandler(matchMedia, оbjectsFilter);\n  }\n};\n\nDynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {\n  if (matchMedia.matches) {\n    for (let i = 0; i < оbjects.length; i++) {\n      const оbject = оbjects[i];\n      оbject.index = this.indexInParent(оbject.parent, оbject.element);\n      this.moveTo(оbject.place, оbject.element, оbject.destination);\n    }\n  } else {\n    for (let i = 0; i < оbjects.length; i++) {\n      const оbject = оbjects[i];\n\n      if (оbject.element.classList.contains(this.daClassname)) {\n        this.moveBack(оbject.parent, оbject.element, оbject.index);\n      }\n    }\n  }\n}; // Функция перемещения\n\n\nDynamicAdapt.prototype.moveTo = function (place, element, destination) {\n  element.classList.add(this.daClassname);\n\n  if (place === 'last' || place >= destination.children.length) {\n    destination.insertAdjacentElement('beforeend', element);\n    return;\n  }\n\n  if (place === 'first') {\n    destination.insertAdjacentElement('afterbegin', element);\n    return;\n  }\n\n  destination.children[place].insertAdjacentElement('beforebegin', element);\n}; // Функция возврата\n\n\nDynamicAdapt.prototype.moveBack = function (parent, element, index) {\n  element.classList.remove(this.daClassname);\n\n  if (parent.children[index] !== undefined) {\n    parent.children[index].insertAdjacentElement('beforebegin', element);\n  } else {\n    parent.insertAdjacentElement('beforeend', element);\n  }\n}; // Функция получения индекса внутри родителя\n\n\nDynamicAdapt.prototype.indexInParent = function (parent, element) {\n  const array = Array.prototype.slice.call(parent.children);\n  return Array.prototype.indexOf.call(array, element);\n}; // Функция сортировки массива по breakpoint и place\n// по возрастанию для this.type = min\n// по убыванию для this.type = max\n\n\nDynamicAdapt.prototype.arraySort = function (arr) {\n  if (this.type === \"min\") {\n    Array.prototype.sort.call(arr, function (a, b) {\n      if (a.breakpoint === b.breakpoint) {\n        if (a.place === b.place) {\n          return 0;\n        }\n\n        if (a.place === \"first\" || b.place === \"last\") {\n          return -1;\n        }\n\n        if (a.place === \"last\" || b.place === \"first\") {\n          return 1;\n        }\n\n        return a.place - b.place;\n      }\n\n      return a.breakpoint - b.breakpoint;\n    });\n  } else {\n    Array.prototype.sort.call(arr, function (a, b) {\n      if (a.breakpoint === b.breakpoint) {\n        if (a.place === b.place) {\n          return 0;\n        }\n\n        if (a.place === \"first\" || b.place === \"last\") {\n          return 1;\n        }\n\n        if (a.place === \"last\" || b.place === \"first\") {\n          return -1;\n        }\n\n        return b.place - a.place;\n      }\n\n      return b.breakpoint - a.breakpoint;\n    });\n    return;\n  }\n};\n\nconst da = new DynamicAdapt(\"min\");\nda.init();\n\n//# sourceURL=webpack://start/./_src/js/component/dynamicAdapt.js?");

/***/ }),

/***/ "./_src/js/component/nav.js":
/*!**********************************!*\
  !*** ./_src/js/component/nav.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var hc_offcanvas_nav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hc-offcanvas-nav */ \"./node_modules/.pnpm/hc-offcanvas-nav@6.1.5/node_modules/hc-offcanvas-nav/dist/hc-offcanvas-nav.js\");\n/* harmony import */ var hc_offcanvas_nav__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hc_offcanvas_nav__WEBPACK_IMPORTED_MODULE_0__);\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  var Nav = new (hc_offcanvas_nav__WEBPACK_IMPORTED_MODULE_0___default())('#main-nav', {\n    disableAt: 1024,\n    customToggle: '.burger',\n    navTitle: false,\n    levelTitles: true,\n    levelTitleAsBack: true,\n    levelOpen: \"overlap\",\n    labelBack: \"Назад\"\n  }); // add mobilenav extend panel\n\n  const headerNav = document.createElement(\"div\");\n  const menuTop = document.querySelector(\".nav-wrapper-0 .nav-content\");\n  headerNav.classList.add('js-navbar');\n  console.log(menuTop);\n  menuTop.insertBefore(headerNav, menuTop.querySelector('.nav__list'));\n  headerNav.appendChild(document.querySelector('.header__lang').cloneNode(true));\n  headerNav.appendChild(document.querySelector('.search__btn').cloneNode(true));\n  headerNav.appendChild(document.querySelector('.header__cart').cloneNode(true));\n}); // accordion\n\nfunction initAcc(elem, option, media) {\n  document.addEventListener('click', function (e) {\n    if (!e.target.closest(elem + ' .a-btn')) {\n      return;\n    }\n\n    ;\n    if (media && !window.matchMedia(`(max-width: ${media})`).matches) return;else {\n      e.preventDefault();\n      const panel = e.target.closest('.a-item');\n\n      if (!panel.classList.contains('active')) {\n        if (option == true) {\n          var elementList = document.querySelectorAll(elem + ' > .a-item');\n          Array.prototype.forEach.call(elementList, function (e) {\n            e.classList.remove('active');\n          });\n        }\n\n        panel.classList.add('active');\n      } else {\n        panel.classList.remove('active');\n      }\n    }\n  });\n}\n\ninitAcc('.footer-nav__list', true, '767px');\ninitAcc('.faq', true);\n\n//# sourceURL=webpack://start/./_src/js/component/nav.js?");

/***/ }),

/***/ "./_src/js/component/products.js":
/*!***************************************!*\
  !*** ./_src/js/component/products.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mixitup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mixitup */ \"./node_modules/.pnpm/mixitup@3.3.1/node_modules/mixitup/dist/mixitup.js\");\n/* harmony import */ var mixitup__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mixitup__WEBPACK_IMPORTED_MODULE_0__);\n\nconst mixed = document.querySelector('.mixed');\nconst products = document.querySelector('.products');\n\nif (mixed) {\n  mixitup__WEBPACK_IMPORTED_MODULE_0___default()('.mixed', {\n    selectors: {\n      target: '.mix'\n    }\n  });\n}\n\nif (products) {\n  document.addEventListener('click', function (e) {\n    //показ футера продукта\n    if (e.target.classList.contains('product__readmore')) {\n      e.preventDefault();\n      const el = e.target;\n      el.previousElementSibling.classList.toggle('open');\n\n      if (!el.classList.contains('open')) {\n        el.textContent = 'свернуть';\n      } else {\n        el.textContent = 'читать ещё';\n      }\n\n      el.classList.toggle('open');\n    } //показ заказа марки продукта\n\n\n    if (e.target.closest('.product-mark')) {\n      const open = document.querySelector('.product-mark.open');\n\n      if (open && !e.target.classList.contains('open')) {\n        open.classList.remove('open');\n      }\n\n      e.target.closest('.product-mark').classList.toggle('open');\n    }\n  });\n}\n\n//# sourceURL=webpack://start/./_src/js/component/products.js?");

/***/ }),

/***/ "./_src/js/component/select.js":
/*!*************************************!*\
  !*** ./_src/js/component/select.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var choices_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! choices.js */ \"./node_modules/.pnpm/choices.js@10.1.0/node_modules/choices.js/public/assets/scripts/choices.js\");\n/* harmony import */ var choices_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(choices_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var mixitup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mixitup */ \"./node_modules/.pnpm/mixitup@3.3.1/node_modules/mixitup/dist/mixitup.js\");\n/* harmony import */ var mixitup__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mixitup__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst choices = new (choices_js__WEBPACK_IMPORTED_MODULE_0___default())('#select-lang', {\n  allowHTML: false,\n  searchEnabled: false,\n  itemSelectText: false\n});\nconst vacancy = document.getElementById('select-vacancy');\n\nif (vacancy) {\n  const choicesVacansy = new (choices_js__WEBPACK_IMPORTED_MODULE_0___default())(vacancy, {\n    allowHTML: false,\n    searchEnabled: false,\n    itemSelectText: false\n  }); // document.querySelector('.vacancys__list');\n\n  const vacancyContainer = mixitup__WEBPACK_IMPORTED_MODULE_1___default()('.vacancys__list', {\n    selectors: {\n      target: '.mix'\n    }\n  });\n  choicesVacansy.passedElement.element.addEventListener('choice', e => {\n    console.log(e.detail.choice.value);\n    vacancyContainer.filter(`[data-mix=\"${e.detail.choice.value}\"]`);\n  });\n}\n\n//# sourceURL=webpack://start/./_src/js/component/select.js?");

/***/ }),

/***/ "./_src/js/component/sliders.js":
/*!**************************************!*\
  !*** ./_src/js/component/sliders.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper */ \"./node_modules/.pnpm/swiper@8.1.4/node_modules/swiper/swiper.esm.js\");\n\nconst introSlider = new swiper__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\".intro-slider\", {\n  modules: [swiper__WEBPACK_IMPORTED_MODULE_0__.Pagination, swiper__WEBPACK_IMPORTED_MODULE_0__.EffectFade, swiper__WEBPACK_IMPORTED_MODULE_0__.Parallax],\n  loop: true,\n  pagination: {\n    el: '.swiper-pagination',\n    type: 'bullets',\n    clickable: true\n  },\n  speed: 300,\n  effect: 'fade',\n  parallax: true\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (introSlider);\n\n//# sourceURL=webpack://start/./_src/js/component/sliders.js?");

/***/ }),

/***/ "./_src/js/component/tabs.js":
/*!***********************************!*\
  !*** ./_src/js/component/tabs.js ***!
  \***********************************/
/***/ (() => {

eval("let tab = function () {\n  let tabNav = document.querySelectorAll('.tabs-nav__item'),\n      tabContent = document.querySelectorAll('.tab'),\n      tabName;\n  tabNav.forEach(item => {\n    item.addEventListener('click', selectTabNav);\n  });\n\n  function selectTabNav() {\n    tabNav.forEach(item => {\n      item.classList.remove('active');\n    });\n    this.classList.add('active');\n    tabName = this.getAttribute('data-tab-name');\n    selectTabContent(tabName);\n  }\n\n  function selectTabContent(tabName) {\n    tabContent.forEach(item => {\n      item.id == tabName ? item.classList.add('active') : item.classList.remove('active');\n    });\n  }\n};\n\ntab();\n\n//# sourceURL=webpack://start/./_src/js/component/tabs.js?");

/***/ }),

/***/ "./_src/js/main.js":
/*!*************************!*\
  !*** ./_src/js/main.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fancyapps_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fancyapps/ui */ \"./node_modules/.pnpm/@fancyapps+ui@4.0.26/node_modules/@fancyapps/ui/dist/fancybox.esm.js\");\n/* harmony import */ var _component_sliders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component/sliders */ \"./_src/js/component/sliders.js\");\n/* harmony import */ var _component_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component/select */ \"./_src/js/component/select.js\");\n/* harmony import */ var _component_nav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component/nav */ \"./_src/js/component/nav.js\");\n/* harmony import */ var _component_dynamicAdapt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component/dynamicAdapt */ \"./_src/js/component/dynamicAdapt.js\");\n/* harmony import */ var _component_dynamicAdapt__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_component_dynamicAdapt__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _component_products__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component/products */ \"./_src/js/component/products.js\");\n/* harmony import */ var _component_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./component/tabs */ \"./_src/js/component/tabs.js\");\n/* harmony import */ var _component_tabs__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_component_tabs__WEBPACK_IMPORTED_MODULE_6__);\n\n\n // import \"./component/drawLine\";\n\n\n\n\n\n\nif ('ontouchstart' in window || navigator.msMaxTouchPoints) {\n  document.body.classList.add('touch');\n}\n\n_fancyapps_ui__WEBPACK_IMPORTED_MODULE_0__.Fancybox.bind(\"[data-fancybox]\", {// Your options go here\n});\n\n//# sourceURL=webpack://start/./_src/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkstart"] = self["webpackChunkstart"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./_src/js/main.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;