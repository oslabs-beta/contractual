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

/***/ "./src/preload.ts":
/*!************************!*\
  !*** ./src/preload.ts ***!
  \************************/
/***/ (() => {

eval("window.addEventListener('DOMContentLoaded', function () {\n    var replaceText = function (selector, text) {\n        var element = document.getElementById(selector);\n        if (element)\n            element.innerText = text;\n    };\n    for (var _i = 0, _a = ['chrome', 'node', 'electron']; _i < _a.length; _i++) {\n        var dependency = _a[_i];\n        replaceText(\"\".concat(dependency, \"-version\"), process.versions[dependency]);\n    }\n});\n\n\n//# sourceURL=webpack://contractual/./src/preload.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/preload.ts"]();
/******/ 	
/******/ })()
;