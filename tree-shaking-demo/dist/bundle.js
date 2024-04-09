
(() => {
  "use strict";
  var __webpack_modules__ = ({

    "./src/a.js":
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   a: () => (/* binding */ a),\n/* harmony export */   unused: () => (/* binding */ unused)\n/* harmony export */ });\nconst a = 'A';\n\nconst unused = 'UNUSED';\n\n//# sourceURL=webpack://tree-shaking-demo/./src/a.js?");


      }),

    "./src/index.js":
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   a: () => (/* reexport safe */ _a_js__WEBPACK_IMPORTED_MODULE_0__.a)\n/* harmony export */ });\n/* harmony import */ var _a_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./a.js */ \"./src/a.js\");\n\n\n//# sourceURL=webpack://tree-shaking-demo/./src/index.js?");


      }),

    "./src/main.js":

      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n\n\nconsole.log(_index_js__WEBPACK_IMPORTED_MODULE_0__.a); // 输出：'A'\n\n//# sourceURL=webpack://tree-shaking-demo/./src/main.js?");


      })

  });

  var __webpack_module_cache__ = {};


  function __webpack_require__(moduleId) {

    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;

    }

    var module = __webpack_module_cache__[moduleId] = {

      exports: {}

    };


    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);


    return module.exports;

  }


  (() => {

    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });

        }

      }

    };

  })();


  (() => {
    __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))

  })();


  (() => {

    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

      }
      Object.defineProperty(exports, '__esModule', { value: true });

    };

  })();
  var __webpack_exports__ = __webpack_require__("./src/main.js");
})()
  ;