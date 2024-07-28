/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@amishurinskiy/router/dist/RouterFactory.js":
/*!******************************************************************!*\
  !*** ./node_modules/@amishurinskiy/router/dist/RouterFactory.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.RouterFactory = exports.RouterMode = void 0;\nconst RouterHash_1 = __webpack_require__(/*! ./RouterHash */ \"./node_modules/@amishurinskiy/router/dist/RouterHash.js\");\nconst RouterHistory_1 = __webpack_require__(/*! ./RouterHistory */ \"./node_modules/@amishurinskiy/router/dist/RouterHistory.js\");\nvar RouterMode;\n(function (RouterMode) {\n    RouterMode[RouterMode[\"HASH_API\"] = 0] = \"HASH_API\";\n    RouterMode[RouterMode[\"HISTORY_API\"] = 1] = \"HISTORY_API\";\n})(RouterMode || (exports.RouterMode = RouterMode = {}));\nclass RouterFactory {\n    create(mode) {\n        switch (mode) {\n            case RouterMode.HASH_API: {\n                return new RouterHash_1.RouterHash();\n            }\n            case RouterMode.HISTORY_API: {\n                return new RouterHistory_1.RouterHistory();\n            }\n        }\n    }\n}\nexports.RouterFactory = RouterFactory;\n\n\n//# sourceURL=webpack://lesson9/./node_modules/@amishurinskiy/router/dist/RouterFactory.js?");

/***/ }),

/***/ "./node_modules/@amishurinskiy/router/dist/RouterHash.js":
/*!***************************************************************!*\
  !*** ./node_modules/@amishurinskiy/router/dist/RouterHash.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.RouterHash = void 0;\nconst RouterParent_1 = __webpack_require__(/*! ./RouterParent */ \"./node_modules/@amishurinskiy/router/dist/RouterParent.js\");\nclass RouterHash extends RouterParent_1.RouterParent {\n    constructor() {\n        super();\n        window.addEventListener(\"hashchange\", this.handleAllListeners.bind(this));\n        this.handleAllListeners();\n    }\n    go(url, state) {\n        this.previous.path = this.currentPath;\n        this.previous.state = this.state;\n        location.hash = url;\n        this.currentPath = location.hash;\n        this.state = state;\n        this.handleAllListeners();\n    }\n}\nexports.RouterHash = RouterHash;\n\n\n//# sourceURL=webpack://lesson9/./node_modules/@amishurinskiy/router/dist/RouterHash.js?");

/***/ }),

/***/ "./node_modules/@amishurinskiy/router/dist/RouterHistory.js":
/*!******************************************************************!*\
  !*** ./node_modules/@amishurinskiy/router/dist/RouterHistory.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.RouterHistory = void 0;\nconst RouterParent_1 = __webpack_require__(/*! ./RouterParent */ \"./node_modules/@amishurinskiy/router/dist/RouterParent.js\");\nclass RouterHistory extends RouterParent_1.RouterParent {\n    constructor() {\n        super();\n        window.addEventListener(\"popstate\", this.handleAllListeners.bind(this));\n        this.handleAllListeners();\n    }\n    go(url, state) {\n        this.previous.path = this.currentPath;\n        this.previous.state = history.state;\n        history.pushState(state, url, url);\n        this.state = state;\n        this.currentPath = location.pathname;\n        this.handleAllListeners();\n    }\n}\nexports.RouterHistory = RouterHistory;\n\n\n//# sourceURL=webpack://lesson9/./node_modules/@amishurinskiy/router/dist/RouterHistory.js?");

/***/ }),

/***/ "./node_modules/@amishurinskiy/router/dist/RouterParent.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@amishurinskiy/router/dist/RouterParent.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.RouterParent = void 0;\nclass RouterParent {\n    constructor() {\n        this.currentPath = window.location.pathname;\n        this.previous = {\n            path: \"\",\n            state: undefined,\n        };\n        this.routers = [];\n    }\n    getState() {\n        return this.state;\n    }\n    addRoute(route) {\n        console.log(route);\n        const id = this.generateId();\n        route.id = id;\n        this.routers.push(route);\n        return () => {\n            this.routers = this.routers.filter((router) => router.id !== id);\n        };\n    }\n    handleAllListeners() {\n        return __awaiter(this, void 0, void 0, function* () {\n            for (const route of this.routers) {\n                this.currentPath = window.location.pathname;\n                const args = {\n                    url: this.currentPath,\n                    state: this.getState(),\n                    previous: this.previous,\n                };\n                if (route.onBeforeEnter && this.isMatch(route.match, this.currentPath)) {\n                    yield route.onBeforeEnter(args);\n                }\n                if (this.isMatch(route.match, this.currentPath)) {\n                    yield route.onEnter(args);\n                }\n                if (route.onLeave && this.isMatch(route.match, this.previous.path)) {\n                    yield route.onLeave(args);\n                }\n            }\n        });\n    }\n    generateId() {\n        const getRandomNumber = () => Math.floor(Math.random() * this.routers.length * 1000);\n        const doesExist = (id) => this.routers.find((router) => router.id === id);\n        let id = getRandomNumber();\n        while (doesExist(id)) {\n            id = getRandomNumber();\n        }\n        return id;\n    }\n    isMatch(match, path) {\n        if (match instanceof RegExp) {\n            return match.test(path);\n        }\n        if (typeof match === \"function\") {\n            return match(path);\n        }\n        return match === path;\n    }\n    go(url, state) { }\n}\nexports.RouterParent = RouterParent;\n\n\n//# sourceURL=webpack://lesson9/./node_modules/@amishurinskiy/router/dist/RouterParent.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.font-custom {\n  font-family: \"Comic Sans MS\";\n  font-size: 24px;\n  margin: 2px;\n}\n.view {\n  padding: 10px 0;\n  display: grid;\n  grid-template-columns: 300px 300px 300px;\n  column-gap: 10px;\n  width: 900px;\n}\n\n.block {\n  border-style: solid;\n  border-width: 2px;\n  border-bottom-color: black;\n  width: 300px;\n  height: 300px;\n  text-align: center;\n  vertical-align: top;\n}\n\n#history {\n  display: grid;\n  grid-template-rows: repeat(5, 1em);\n  row-gap: 10px;\n  height: 10em;\n}\n\n#history a {\n  height: 0.8em;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://lesson9/./src/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://lesson9/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://lesson9/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://lesson9/./src/styles.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://lesson9/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://lesson9/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://lesson9/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://lesson9/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://lesson9/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://lesson9/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/apiGeo.js":
/*!***********************!*\
  !*** ./src/apiGeo.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   showGeo: () => (/* binding */ showGeo)\n/* harmony export */ });\n/**\n * Получение координат с сайта geojs\n * @returns {Promise<any|{cod: number, message: string}>}\n */\nasync function showGeo() {\n  try {\n    const response = await fetch(`https://get.geojs.io/v1/ip/geo.json`);\n\n    return response.json();\n  } catch {\n    return { cod: 500, message: `couldn't get geo info` };\n  }\n}\n\n\n//# sourceURL=webpack://lesson9/./src/apiGeo.js?");

/***/ }),

/***/ "./src/apiWeather.js":
/*!***************************!*\
  !*** ./src/apiWeather.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getWeatherByCityName: () => (/* binding */ getWeatherByCityName),\n/* harmony export */   getWeatherByCoords: () => (/* binding */ getWeatherByCoords)\n/* harmony export */ });\nconst urlOpenWeather =\n  \"https://api.openweathermap.org/data/2.5/weather?units=metric&appid=7881bfb7be02c74633e5fdee4ff41329\";\n/**\n * Функция возвращает (Promise) данные с информацией о погоде\n *\n * https://api.openweathermap.org/data/2.5/weather?units=metric&q={{CITY_NAME}}&appid={{APP_ID}}\n * Запрос возвращает данные в формате JSON\n *\n * @param {string} cityName имя города\n */\nasync function getWeatherByCityName(cityName) {\n  try {\n    const response = await fetch(`${urlOpenWeather}&q=${cityName}`);\n    return response.json();\n  } catch {\n    return { cod: 500, message: `couldn't get weather info` };\n  }\n}\n\n/**\n * Функция возвращает (Promise) данные с информацией о погоде\n *\n * https://api.openweathermap.org/data/2.5/weather?units=metric&lat={{lat}}&lon={{long}}&appid={{APP_ID}}\n * Запрос возвращает данные в формате JSON\n *\n * @param {number} lat координата\n * @param {number} long координата\n */\nasync function getWeatherByCoords(lat, long) {\n  try {\n    const response = await fetch(`${urlOpenWeather}&lat=${lat}&lon=${long}`);\n    return response.json();\n  } catch {\n    return { cod: 500, message: `couldn't get weather info` };\n  }\n}\n\n\n//# sourceURL=webpack://lesson9/./src/apiWeather.js?");

/***/ }),

/***/ "./src/localStorage.js":
/*!*****************************!*\
  !*** ./src/localStorage.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addCityInStorage: () => (/* binding */ addCityInStorage)\n/* harmony export */ });\n/**\n * Добавление информации в localStorage\n * @param weather json с информацией о погоде\n */\nfunction addCityInStorage(weather) {\n  //Получаем города из локального хранилища\n  let cities = JSON.parse(localStorage.getItem(\"cities\"));\n\n  //Если уже есть такой город, то удаляем его\n  for (let i = 0; i < cities.length; i++) {\n    if (JSON.parse(cities[i]).name === weather.name) {\n      cities.splice(i, 1);\n    }\n  }\n\n  //Добавляем новый город\n  cities.push(JSON.stringify(weather));\n\n  //Оставляем только 10 последних городов\n  if (cities.length > 10) {\n    cities = cities.slice(-10);\n  }\n\n  localStorage.setItem(\"cities\", JSON.stringify(cities));\n}\n\n\n//# sourceURL=webpack://lesson9/./src/localStorage.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   state: () => (/* binding */ state)\n/* harmony export */ });\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n/* harmony import */ var _apiGeo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apiGeo */ \"./src/apiGeo.js\");\n/* harmony import */ var _apiWeather__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./apiWeather */ \"./src/apiWeather.js\");\n/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./localStorage */ \"./src/localStorage.js\");\n/* harmony import */ var _amishurinskiy_router_dist_RouterFactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @amishurinskiy/router/dist/RouterFactory */ \"./node_modules/@amishurinskiy/router/dist/RouterFactory.js\");\n\n\n\n\n\n\nlet state = {\n  currentHeaderPage:\n    \"Главная страница, по умолчанию отображается погода в текущем городе\",\n  cityCurrent: undefined,\n  isAboutShow: false,\n  isMainFormShow: true,\n  isHistoryShow: true,\n};\n\n(async function () {\n  // Получаем указатели на нужные элементы\n  const button = document.querySelector(\"button\");\n  const inputCity = document.querySelector(\"input\");\n  const historyBlock = document.querySelector(\"#history\");\n  //Загружаем данные по текущему местоположению\n  document.addEventListener(\"DOMContentLoaded\", showDefaultCityData);\n\n  //Отображение данных по введённому городу\n  button.addEventListener(\"click\", showNewCityData);\n\n  /**\n   * Функция для отображения информции о погоде в текущем местоположении\n   */\n  function showDefaultCityData() {\n    (0,_apiGeo__WEBPACK_IMPORTED_MODULE_1__.showGeo)().then(success, error);\n\n    // Если всё хорошо, собираем ссылку\n    async function success(position) {\n      let weatherInfo;\n      weatherInfo = await (0,_apiWeather__WEBPACK_IMPORTED_MODULE_2__.getWeatherByCoords)(\n        position.latitude,\n        position.longitude,\n      );\n      if (weatherInfo.cod === 200) {\n        state.cityCurrent = weatherInfo;\n        router.go(\"/lesson9\" + \"/\", state);\n        (0,_localStorage__WEBPACK_IMPORTED_MODULE_3__.addCityInStorage)(weatherInfo);\n        showWeather(weatherInfo);\n        showHistory(historyBlock);\n      }\n    }\n\n    // Если всё плохо, просто напишем об этом\n    function error() {\n      alert(\"Не получается определить вашу геолокацию :(\");\n    }\n  }\n\n  /**\n   * Функция для отображение информации о погоде в введеном городе\n   *\n   * @param ev\n   * @param {string} cityName имя города\n   */\n  async function showNewCityData(ev, cityName) {\n    // чтобы не перезагружать страницу\n    ev.preventDefault();\n\n    if (cityName === undefined) {\n      cityName = inputCity.value;\n    }\n\n    inputCity.value = \"\";\n\n    const weather = await (0,_apiWeather__WEBPACK_IMPORTED_MODULE_2__.getWeatherByCityName)(cityName);\n    if (weather.cod === 200) {\n      state.cityCurrent = weather;\n      (0,_localStorage__WEBPACK_IMPORTED_MODULE_3__.addCityInStorage)(weather);\n      showWeather(weather);\n      showHistory(historyBlock);\n      router.go(cityName, state);\n    }\n  }\n\n  /**\n   * Отображение погоды в городе из истории (из localStorage)\n   *\n   * @param ev\n   */\n  async function showCityDataFromHistory(event) {\n    if (!event.target.classList.contains(\"cityHistory\")) {\n      return;\n    }\n    event.preventDefault();\n    const url = event.target.innerHTML;\n\n    const weather = await (0,_apiWeather__WEBPACK_IMPORTED_MODULE_2__.getWeatherByCityName)(this.innerText);\n    if (weather.cod === 200) {\n      state.cityCurrent = weather;\n      showCityWeatherPage();\n      showWeather(weather);\n    }\n    router.go(url, state);\n  }\n\n  /**\n   * Функция для добавления информации в историю\n   *\n   * @param historyBlock элемент для отображения истории\n   * @param {string} cityName имя горожа\n   */\n  function showHistory(historyBlock) {\n    let cities = JSON.parse(localStorage.getItem(\"cities\"));\n\n    document.querySelectorAll(\".cityHistory\").forEach((e) => e.remove());\n\n    cities.forEach((city) => {\n      const paragraph = document.createElement(\"a\");\n      paragraph.classList.add(\"font-custom\");\n      paragraph.classList.add(\"cityHistory\");\n      paragraph.innerText = JSON.parse(city).name;\n      paragraph.href = \"/lesson9\" + \"/\" + JSON.parse(city).name;\n      paragraph.addEventListener(\"click\", showCityDataFromHistory);\n      historyBlock.append(paragraph);\n    });\n  }\n\n  localStorage.setItem(\"cities\", JSON.stringify([]));\n\n  /**\n   * Отображение информции о погоде в городе\n   *\n   * @param weatherInfoBlock элемент информации о погоде\n   * @param weatherDataJson json с данными о погоде\n   */\n  function showWeather(weatherDataJson) {\n    state.cityCurrent = weatherDataJson;\n    document.querySelector(\"#weatherInfo\").innerHTML = `\n        <img src=\"http://openweathermap.org/img/wn/${weatherDataJson.weather[0].icon}@2x.png\">\n        <div>${weatherDataJson.name}</div>\n        <div>${weatherDataJson.main.temp} °C</div>\n    `;\n    const weatherCityImage = document.querySelector(\"#weatherCityImage\");\n    weatherCityImage.innerHTML = `<img src=\"https://static-maps.yandex.ru/v1?ll=${weatherDataJson.coord.lon},${weatherDataJson.coord.lat}&lang=ru_RU&size=300,300&z=13&apikey=5caf3d9c-2a6c-4d7f-ac2c-3a3123241fe7\">`;\n  }\n\n  function showAboutPage() {\n    state.currentHeaderPage =\n      \"Это приложение из ДЗ - https://github.com/vvscode/otus--javascript-basic/blob/master/lessons/lesson40/hw.md\";\n    state.isMainFormShow = false;\n    state.isHistoryShow = false;\n    state.isAboutShow = true;\n    render();\n  }\n\n  function showMainPage() {\n    state.currentHeaderPage =\n      \"Главная страница, по умолчанию отображается погода в текущем городе\";\n    state.isMainFormShow = true;\n    state.isHistoryShow = true;\n    state.isAboutShow = false;\n\n    showWeather(history.state.cityCurrent);\n    render();\n  }\n\n  function showCityWeatherPage(args) {\n    state.currentHeaderPage =\n      \"Страница о погоде в городе, который выбрали из истории\";\n    state.isMainFormShow = true;\n    state.isHistoryShow = true;\n    state.isAboutShow = false;\n    showWeather(history.state.cityCurrent);\n    render();\n  }\n\n  function render() {\n    document.querySelector(\"#main\").hidden = !state.isMainFormShow;\n    document.querySelector(\"#about\").hidden = !state.isAboutShow;\n    document.querySelector(\"#historyBlock\").hidden = !state.isHistoryShow;\n    document.querySelector(\"#message\").innerHTML =\n      `<h2>${state.currentHeaderPage}</h2>`;\n  }\n\n  const router = new _amishurinskiy_router_dist_RouterFactory__WEBPACK_IMPORTED_MODULE_4__.RouterFactory().create(_amishurinskiy_router_dist_RouterFactory__WEBPACK_IMPORTED_MODULE_4__.RouterMode.HISTORY_API);\n\n  const route0 = { match: \"/lesson9\" + \"/\", onEnter: showMainPage };\n  router.addRoute(route0);\n\n  const route1 = { match: \"/lesson9\" + \"/about\", onEnter: showAboutPage };\n  router.addRoute(route1);\n\n  const route2 = {\n    match: (path) => {\n      return JSON.parse(localStorage.getItem(\"cities\"))\n        .map((city) => JSON.parse(city).name)\n        .includes(path.replace(\"/lesson9\" + \"/\", \"\"));\n    },\n    onEnter: async (args) => showCityWeatherPage(args),\n  };\n  router.addRoute(route2);\n\n  document.body.addEventListener(\"click\", (event) => {\n    if (!event.target.classList.contains(\"menu\")) {\n      return;\n    }\n    event.preventDefault();\n    const url = event.target.href;\n    router.go(url, state);\n  });\n\n  document.querySelector(\"form\").addEventListener(\"submit\", (event) => {\n    event.preventDefault();\n  });\n\n  if (true) {\n    document.querySelectorAll(\".menu\").forEach((link) => {\n      link.href = \"/lesson9\" + link.getAttribute(\"href\");\n    });\n  }\n})();\n\n\n//# sourceURL=webpack://lesson9/./src/main.js?");

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
/******/ 			id: moduleId,
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
/************************************************************************/
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;