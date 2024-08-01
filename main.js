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

/***/ "./src/actions.ts":
/*!************************!*\
  !*** ./src/actions.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   error: () => (/* binding */ error),\n/* harmony export */   loading: () => (/* binding */ loading),\n/* harmony export */   success: () => (/* binding */ success)\n/* harmony export */ });\nconst loading = () => ({\n  type: \"LOADING\"\n});\nconst success = payload => ({\n  type: \"SUCCESS\",\n  payload\n});\nconst error = error => ({\n  type: \"ERROR\",\n  error\n});\n\n//# sourceURL=webpack://lesson9/./src/actions.ts?");

/***/ }),

/***/ "./src/apiGeo.ts":
/*!***********************!*\
  !*** ./src/apiGeo.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   showGeo: () => (/* binding */ showGeo)\n/* harmony export */ });\n/**\n * Получение координат с сайта geojs\n * @returns {Promise<any|{cod: number, message: string}>}\n */\nasync function showGeo() {\n  try {\n    const response = await fetch(`https://get.geojs.io/v1/ip/geo.json`);\n    return response.json();\n  } catch {\n    return {\n      cod: 500,\n      message: `couldn't get geo info`\n    };\n  }\n}\n\n//# sourceURL=webpack://lesson9/./src/apiGeo.ts?");

/***/ }),

/***/ "./src/apiWeather.ts":
/*!***************************!*\
  !*** ./src/apiWeather.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getWeatherByCityName: () => (/* binding */ getWeatherByCityName),\n/* harmony export */   getWeatherByCoords: () => (/* binding */ getWeatherByCoords)\n/* harmony export */ });\nconst urlOpenWeather = \"https://api.openweathermap.org/data/2.5/weather?units=metric&appid=7881bfb7be02c74633e5fdee4ff41329\";\n/**\n * Функция возвращает (Promise) данные с информацией о погоде\n *\n * https://api.openweathermap.org/data/2.5/weather?units=metric&q={{CITY_NAME}}&appid={{APP_ID}}\n * Запрос возвращает данные в формате JSON\n *\n * @param {string} cityName имя города\n */\nasync function getWeatherByCityName(cityName) {\n  try {\n    const response = await fetch(`${urlOpenWeather}&q=${cityName}`);\n    return response.json();\n  } catch {\n    return {\n      cod: 500,\n      message: `couldn't get weather info`\n    };\n  }\n}\n\n/**\n * Функция возвращает (Promise) данные с информацией о погоде\n *\n * https://api.openweathermap.org/data/2.5/weather?units=metric&lat={{lat}}&lon={{long}}&appid={{APP_ID}}\n * Запрос возвращает данные в формате JSON\n *\n * @param {number} lat координата\n * @param {number} long координата\n */\nasync function getWeatherByCoords(lat, long) {\n  try {\n    const response = await fetch(`${urlOpenWeather}&lat=${lat}&lon=${long}`);\n    return response.json();\n  } catch {\n    return {\n      cod: 500,\n      message: `couldn't get weather info`\n    };\n  }\n}\n\n//# sourceURL=webpack://lesson9/./src/apiWeather.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getCityWeatherFromHistory: () => (/* binding */ getCityWeatherFromHistory)\n/* harmony export */ });\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ \"./src/store.ts\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ \"./src/view.ts\");\n/* harmony import */ var _apiWeather__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./apiWeather */ \"./src/apiWeather.ts\");\n/* harmony import */ var _apiGeo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./apiGeo */ \"./src/apiGeo.ts\");\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions */ \"./src/actions.ts\");\n/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./localStorage */ \"./src/localStorage.ts\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n\n\n\n\n\n\n\nconst loading = document.querySelector(\"#loading\");\ndocument.addEventListener(\"DOMContentLoaded\", showDefaultCityData);\nfunction showDefaultCityData() {\n  _store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch(_actions__WEBPACK_IMPORTED_MODULE_4__.loading());\n  (0,_apiGeo__WEBPACK_IMPORTED_MODULE_3__.showGeo)().then(async data => {\n    const weatherInfo = await (0,_apiWeather__WEBPACK_IMPORTED_MODULE_2__.getWeatherByCoords)(data.latitude, data.longitude);\n    _store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch(_actions__WEBPACK_IMPORTED_MODULE_4__.success(weatherInfo));\n  }).catch(error => {\n    _store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch(_actions__WEBPACK_IMPORTED_MODULE_4__.error(error));\n  });\n}\nfunction getCityWeatherFromApi(ev) {\n  return (dispatch, getState) => {\n    dispatch(_actions__WEBPACK_IMPORTED_MODULE_4__.loading());\n    // чтобы не перезагружать страницу\n    ev.preventDefault();\n    const inputCity = document.querySelector(\"input\");\n    const cityName = inputCity.value;\n    inputCity.value = \"\";\n    (0,_apiWeather__WEBPACK_IMPORTED_MODULE_2__.getWeatherByCityName)(cityName).then(data => {\n      dispatch(_actions__WEBPACK_IMPORTED_MODULE_4__.success(data));\n    }).catch(error => {\n      dispatch(_actions__WEBPACK_IMPORTED_MODULE_4__.error(error));\n    });\n  };\n}\nfunction getCityWeatherFromHistory(ev) {\n  return (dispatch, getState) => {\n    dispatch(_actions__WEBPACK_IMPORTED_MODULE_4__.loading());\n    const cityName = ev.target.innerText;\n    (0,_localStorage__WEBPACK_IMPORTED_MODULE_5__.getCityFromStorage)(cityName).then(data => {\n      dispatch(_actions__WEBPACK_IMPORTED_MODULE_4__.success(data));\n    }).catch(error => {\n      dispatch(_actions__WEBPACK_IMPORTED_MODULE_4__.error(error));\n    });\n  };\n}\nconst render = props => {\n  if (props.isLoading) {\n    return loading.innerHTML = \"Loading....\";\n  }\n  if (props.error) {\n    return loading.innerHTML = `<h1 style=\"color: red\">${props.error.message}</h1>`;\n  }\n  if (props.currentCity) {\n    (0,_view__WEBPACK_IMPORTED_MODULE_1__.showWeather)(props.currentCity);\n    (0,_localStorage__WEBPACK_IMPORTED_MODULE_5__.addCityInStorage)(props.currentCity);\n    (0,_view__WEBPACK_IMPORTED_MODULE_1__.viewHistory)();\n    loading.innerHTML = \"\";\n    return;\n  }\n  document.querySelector(\".show\")?.addEventListener(\"click\", ev => _store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch(getCityWeatherFromApi(ev)));\n};\nconst selectData = state => ({\n  isLoading: state.isLoading,\n  currentCity: state.currentCity,\n  error: state.error\n});\nrender(selectData(_store__WEBPACK_IMPORTED_MODULE_0__.store.getState()));\n_store__WEBPACK_IMPORTED_MODULE_0__.store.subscribe(() => render(selectData(_store__WEBPACK_IMPORTED_MODULE_0__.store.getState())));\n\n//# sourceURL=webpack://lesson9/./src/index.ts?");

/***/ }),

/***/ "./src/localStorage.ts":
/*!*****************************!*\
  !*** ./src/localStorage.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addCityInStorage: () => (/* binding */ addCityInStorage),\n/* harmony export */   getCitiesFromStorage: () => (/* binding */ getCitiesFromStorage),\n/* harmony export */   getCityFromStorage: () => (/* binding */ getCityFromStorage)\n/* harmony export */ });\n/**\n * Добавление информации в localStorage\n * @param weather json с информацией о погоде\n */\nfunction addCityInStorage(weather) {\n  //Получаем города из локального хранилища\n  let cities;\n  if (localStorage.getItem(\"cities\")) {\n    cities = JSON.parse(localStorage.getItem(\"cities\"));\n  } else {\n    cities = [];\n  }\n\n  //Если уже есть такой город, то удаляем его\n  for (let i = 0; i < cities.length; i++) {\n    if (JSON.parse(cities[i]).name === weather.name) {\n      cities.splice(i, 1);\n    }\n  }\n\n  //Добавляем новый город\n  cities.push(JSON.stringify(weather));\n\n  //Оставляем только 10 последних городов\n  if (cities.length > 10) {\n    cities = cities.slice(-10);\n  }\n  localStorage.setItem(\"cities\", JSON.stringify(cities));\n}\nasync function getCitiesFromStorage() {\n  return JSON.parse(localStorage.getItem(\"cities\"));\n}\nasync function getCityFromStorage(cityName) {\n  const cities = JSON.parse(localStorage.getItem(\"cities\"));\n  const result = cities.find(cityData => JSON.parse(cityData).name === cityName);\n  return JSON.parse(result);\n}\n\n//# sourceURL=webpack://lesson9/./src/localStorage.ts?");

/***/ }),

/***/ "./src/logger.ts":
/*!***********************!*\
  !*** ./src/logger.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loggerMiddleware: () => (/* binding */ loggerMiddleware)\n/* harmony export */ });\nconst loggerMiddleware = ({\n  dispatch,\n  getState\n}) => next => action => {\n  // Залогируйте состояние до экшена\n  console.log(getState());\n  // Пустите экшен по цепочке дальше\n  const nextAction = next(action);\n  // Залогируйте состояние после\n  console.log(getState());\n  // Верните экшен полученный из цепочки\n  return nextAction;\n};\n\n//# sourceURL=webpack://lesson9/./src/logger.ts?");

/***/ }),

/***/ "./src/reducer.ts":
/*!************************!*\
  !*** ./src/reducer.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   apiReducer: () => (/* binding */ apiReducer)\n/* harmony export */ });\nconst initialState = {\n  isLoading: false,\n  currentCity: undefined,\n  error: undefined\n};\nconst apiReducer = (state = initialState, action) => {\n  switch (action.type) {\n    case \"LOADING\":\n      return {\n        ...state,\n        isLoading: true\n      };\n    case \"SUCCESS\":\n      return {\n        ...state,\n        isLoading: false,\n        currentCity: action.payload,\n        error: undefined\n      };\n    case \"ERROR\":\n      return {\n        ...state,\n        isLoading: false,\n        currentCity: undefined,\n        error: action.error\n      };\n    default:\n      return state;\n  }\n};\n\n//# sourceURL=webpack://lesson9/./src/reducer.ts?");

/***/ }),

/***/ "./src/store.ts":
/*!**********************!*\
  !*** ./src/store.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   store: () => (/* binding */ store)\n/* harmony export */ });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ \"./node_modules/redux/dist/redux.mjs\");\n/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reducer */ \"./src/reducer.ts\");\n/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger */ \"./src/logger.ts\");\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-thunk */ \"./node_modules/redux-thunk/dist/redux-thunk.mjs\");\n\n\n\n\nconst store = (0,redux__WEBPACK_IMPORTED_MODULE_2__.createStore)(_reducer__WEBPACK_IMPORTED_MODULE_0__.apiReducer, (0,redux__WEBPACK_IMPORTED_MODULE_2__.applyMiddleware)(_logger__WEBPACK_IMPORTED_MODULE_1__.loggerMiddleware, redux_thunk__WEBPACK_IMPORTED_MODULE_3__.thunk));\n\n//# sourceURL=webpack://lesson9/./src/store.ts?");

/***/ }),

/***/ "./src/view.ts":
/*!*********************!*\
  !*** ./src/view.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   showWeather: () => (/* binding */ showWeather),\n/* harmony export */   viewHistory: () => (/* binding */ viewHistory)\n/* harmony export */ });\n/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorage */ \"./src/localStorage.ts\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ \"./src/store.ts\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ \"./src/index.ts\");\n\n\n\nfunction showWeather(weatherDataJson) {\n  document.querySelector(\"#weatherInfo\").innerHTML = `\n        <img src=\"http://openweathermap.org/img/wn/${weatherDataJson.weather[0].icon}@2x.png\">\n        <div>${weatherDataJson.name}</div>\n        <div>${weatherDataJson.main.temp} °C</div>\n    `;\n  const weatherCityImage = document.querySelector(\"#weatherCityImage\");\n  weatherCityImage.innerHTML = `<img src=\"https://static-maps.yandex.ru/v1?ll=${weatherDataJson.coord.lon},${weatherDataJson.coord.lat}&lang=ru_RU&size=300,300&z=13&apikey=5caf3d9c-2a6c-4d7f-ac2c-3a3123241fe7\">`;\n}\nfunction viewHistory() {\n  document.querySelectorAll(\".cityHistory\").forEach(e => e.remove());\n  const citiesPromise = (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.getCitiesFromStorage)().then(cities => {\n    const historyBlock = document.querySelector(\"#history\");\n    cities.forEach(city => {\n      city = JSON.parse(city);\n      const paragraph = document.createElement(\"p\");\n      paragraph.classList.add(\"font-custom\");\n      paragraph.classList.add(\"cityHistory\");\n      paragraph.innerText = city.name;\n      paragraph.addEventListener(\"click\", ev => _store__WEBPACK_IMPORTED_MODULE_1__.store.dispatch((0,_index__WEBPACK_IMPORTED_MODULE_2__.getCityWeatherFromHistory)(ev)));\n      historyBlock.append(paragraph);\n    });\n  });\n}\n\n//# sourceURL=webpack://lesson9/./src/view.ts?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.font-custom {\n  font-family: \"Comic Sans MS\";\n  font-size: 24px;\n  margin: 2px;\n}\n.view {\n  padding: 10px 0;\n  display: grid;\n  grid-template-columns: 300px 300px 300px;\n  column-gap: 10px;\n  width: 900px;\n  position: relative;\n}\n\n#loading {\n  position: absolute;\n  font-size: 80px;\n  top: 150px;\n  left: 300px;\n  color: red;\n}\n\n.block {\n  border-style: solid;\n  border-width: 2px;\n  border-bottom-color: black;\n  width: 300px;\n  height: 300px;\n  text-align: center;\n  vertical-align: top;\n}\n\n#history {\n  display: grid;\n  grid-template-rows: repeat(10, 1em);\n  row-gap: 9px;\n  height: 10em;\n  cursor: pointer;\n}\n\n#history a {\n  height: 0.8em;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://lesson9/./src/styles.css?./node_modules/css-loader/dist/cjs.js");

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

/***/ "./node_modules/redux-thunk/dist/redux-thunk.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/redux-thunk/dist/redux-thunk.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   thunk: () => (/* binding */ thunk),\n/* harmony export */   withExtraArgument: () => (/* binding */ withExtraArgument)\n/* harmony export */ });\n// src/index.ts\nfunction createThunkMiddleware(extraArgument) {\n  const middleware = ({ dispatch, getState }) => (next) => (action) => {\n    if (typeof action === \"function\") {\n      return action(dispatch, getState, extraArgument);\n    }\n    return next(action);\n  };\n  return middleware;\n}\nvar thunk = createThunkMiddleware();\nvar withExtraArgument = createThunkMiddleware;\n\n\n\n//# sourceURL=webpack://lesson9/./node_modules/redux-thunk/dist/redux-thunk.mjs?");

/***/ }),

/***/ "./node_modules/redux/dist/redux.mjs":
/*!*******************************************!*\
  !*** ./node_modules/redux/dist/redux.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   __DO_NOT_USE__ActionTypes: () => (/* binding */ actionTypes_default),\n/* harmony export */   applyMiddleware: () => (/* binding */ applyMiddleware),\n/* harmony export */   bindActionCreators: () => (/* binding */ bindActionCreators),\n/* harmony export */   combineReducers: () => (/* binding */ combineReducers),\n/* harmony export */   compose: () => (/* binding */ compose),\n/* harmony export */   createStore: () => (/* binding */ createStore),\n/* harmony export */   isAction: () => (/* binding */ isAction),\n/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),\n/* harmony export */   legacy_createStore: () => (/* binding */ legacy_createStore)\n/* harmony export */ });\n// src/utils/formatProdErrorMessage.ts\nfunction formatProdErrorMessage(code) {\n  return `Minified Redux error #${code}; visit https://redux.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;\n}\n\n// src/utils/symbol-observable.ts\nvar $$observable = /* @__PURE__ */ (() => typeof Symbol === \"function\" && Symbol.observable || \"@@observable\")();\nvar symbol_observable_default = $$observable;\n\n// src/utils/actionTypes.ts\nvar randomString = () => Math.random().toString(36).substring(7).split(\"\").join(\".\");\nvar ActionTypes = {\n  INIT: `@@redux/INIT${/* @__PURE__ */ randomString()}`,\n  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ randomString()}`,\n  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`\n};\nvar actionTypes_default = ActionTypes;\n\n// src/utils/isPlainObject.ts\nfunction isPlainObject(obj) {\n  if (typeof obj !== \"object\" || obj === null)\n    return false;\n  let proto = obj;\n  while (Object.getPrototypeOf(proto) !== null) {\n    proto = Object.getPrototypeOf(proto);\n  }\n  return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null;\n}\n\n// src/utils/kindOf.ts\nfunction miniKindOf(val) {\n  if (val === void 0)\n    return \"undefined\";\n  if (val === null)\n    return \"null\";\n  const type = typeof val;\n  switch (type) {\n    case \"boolean\":\n    case \"string\":\n    case \"number\":\n    case \"symbol\":\n    case \"function\": {\n      return type;\n    }\n  }\n  if (Array.isArray(val))\n    return \"array\";\n  if (isDate(val))\n    return \"date\";\n  if (isError(val))\n    return \"error\";\n  const constructorName = ctorName(val);\n  switch (constructorName) {\n    case \"Symbol\":\n    case \"Promise\":\n    case \"WeakMap\":\n    case \"WeakSet\":\n    case \"Map\":\n    case \"Set\":\n      return constructorName;\n  }\n  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase().replace(/\\s/g, \"\");\n}\nfunction ctorName(val) {\n  return typeof val.constructor === \"function\" ? val.constructor.name : null;\n}\nfunction isError(val) {\n  return val instanceof Error || typeof val.message === \"string\" && val.constructor && typeof val.constructor.stackTraceLimit === \"number\";\n}\nfunction isDate(val) {\n  if (val instanceof Date)\n    return true;\n  return typeof val.toDateString === \"function\" && typeof val.getDate === \"function\" && typeof val.setDate === \"function\";\n}\nfunction kindOf(val) {\n  let typeOfVal = typeof val;\n  if (true) {\n    typeOfVal = miniKindOf(val);\n  }\n  return typeOfVal;\n}\n\n// src/createStore.ts\nfunction createStore(reducer, preloadedState, enhancer) {\n  if (typeof reducer !== \"function\") {\n    throw new Error( false ? 0 : `Expected the root reducer to be a function. Instead, received: '${kindOf(reducer)}'`);\n  }\n  if (typeof preloadedState === \"function\" && typeof enhancer === \"function\" || typeof enhancer === \"function\" && typeof arguments[3] === \"function\") {\n    throw new Error( false ? 0 : \"It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.\");\n  }\n  if (typeof preloadedState === \"function\" && typeof enhancer === \"undefined\") {\n    enhancer = preloadedState;\n    preloadedState = void 0;\n  }\n  if (typeof enhancer !== \"undefined\") {\n    if (typeof enhancer !== \"function\") {\n      throw new Error( false ? 0 : `Expected the enhancer to be a function. Instead, received: '${kindOf(enhancer)}'`);\n    }\n    return enhancer(createStore)(reducer, preloadedState);\n  }\n  let currentReducer = reducer;\n  let currentState = preloadedState;\n  let currentListeners = /* @__PURE__ */ new Map();\n  let nextListeners = currentListeners;\n  let listenerIdCounter = 0;\n  let isDispatching = false;\n  function ensureCanMutateNextListeners() {\n    if (nextListeners === currentListeners) {\n      nextListeners = /* @__PURE__ */ new Map();\n      currentListeners.forEach((listener, key) => {\n        nextListeners.set(key, listener);\n      });\n    }\n  }\n  function getState() {\n    if (isDispatching) {\n      throw new Error( false ? 0 : \"You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.\");\n    }\n    return currentState;\n  }\n  function subscribe(listener) {\n    if (typeof listener !== \"function\") {\n      throw new Error( false ? 0 : `Expected the listener to be a function. Instead, received: '${kindOf(listener)}'`);\n    }\n    if (isDispatching) {\n      throw new Error( false ? 0 : \"You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.\");\n    }\n    let isSubscribed = true;\n    ensureCanMutateNextListeners();\n    const listenerId = listenerIdCounter++;\n    nextListeners.set(listenerId, listener);\n    return function unsubscribe() {\n      if (!isSubscribed) {\n        return;\n      }\n      if (isDispatching) {\n        throw new Error( false ? 0 : \"You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.\");\n      }\n      isSubscribed = false;\n      ensureCanMutateNextListeners();\n      nextListeners.delete(listenerId);\n      currentListeners = null;\n    };\n  }\n  function dispatch(action) {\n    if (!isPlainObject(action)) {\n      throw new Error( false ? 0 : `Actions must be plain objects. Instead, the actual type was: '${kindOf(action)}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`);\n    }\n    if (typeof action.type === \"undefined\") {\n      throw new Error( false ? 0 : 'Actions may not have an undefined \"type\" property. You may have misspelled an action type string constant.');\n    }\n    if (typeof action.type !== \"string\") {\n      throw new Error( false ? 0 : `Action \"type\" property must be a string. Instead, the actual type was: '${kindOf(action.type)}'. Value was: '${action.type}' (stringified)`);\n    }\n    if (isDispatching) {\n      throw new Error( false ? 0 : \"Reducers may not dispatch actions.\");\n    }\n    try {\n      isDispatching = true;\n      currentState = currentReducer(currentState, action);\n    } finally {\n      isDispatching = false;\n    }\n    const listeners = currentListeners = nextListeners;\n    listeners.forEach((listener) => {\n      listener();\n    });\n    return action;\n  }\n  function replaceReducer(nextReducer) {\n    if (typeof nextReducer !== \"function\") {\n      throw new Error( false ? 0 : `Expected the nextReducer to be a function. Instead, received: '${kindOf(nextReducer)}`);\n    }\n    currentReducer = nextReducer;\n    dispatch({\n      type: actionTypes_default.REPLACE\n    });\n  }\n  function observable() {\n    const outerSubscribe = subscribe;\n    return {\n      /**\n       * The minimal observable subscription method.\n       * @param observer Any object that can be used as an observer.\n       * The observer object should have a `next` method.\n       * @returns An object with an `unsubscribe` method that can\n       * be used to unsubscribe the observable from the store, and prevent further\n       * emission of values from the observable.\n       */\n      subscribe(observer) {\n        if (typeof observer !== \"object\" || observer === null) {\n          throw new Error( false ? 0 : `Expected the observer to be an object. Instead, received: '${kindOf(observer)}'`);\n        }\n        function observeState() {\n          const observerAsObserver = observer;\n          if (observerAsObserver.next) {\n            observerAsObserver.next(getState());\n          }\n        }\n        observeState();\n        const unsubscribe = outerSubscribe(observeState);\n        return {\n          unsubscribe\n        };\n      },\n      [symbol_observable_default]() {\n        return this;\n      }\n    };\n  }\n  dispatch({\n    type: actionTypes_default.INIT\n  });\n  const store = {\n    dispatch,\n    subscribe,\n    getState,\n    replaceReducer,\n    [symbol_observable_default]: observable\n  };\n  return store;\n}\nfunction legacy_createStore(reducer, preloadedState, enhancer) {\n  return createStore(reducer, preloadedState, enhancer);\n}\n\n// src/utils/warning.ts\nfunction warning(message) {\n  if (typeof console !== \"undefined\" && typeof console.error === \"function\") {\n    console.error(message);\n  }\n  try {\n    throw new Error(message);\n  } catch (e) {\n  }\n}\n\n// src/combineReducers.ts\nfunction getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {\n  const reducerKeys = Object.keys(reducers);\n  const argumentName = action && action.type === actionTypes_default.INIT ? \"preloadedState argument passed to createStore\" : \"previous state received by the reducer\";\n  if (reducerKeys.length === 0) {\n    return \"Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.\";\n  }\n  if (!isPlainObject(inputState)) {\n    return `The ${argumentName} has unexpected type of \"${kindOf(inputState)}\". Expected argument to be an object with the following keys: \"${reducerKeys.join('\", \"')}\"`;\n  }\n  const unexpectedKeys = Object.keys(inputState).filter((key) => !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key]);\n  unexpectedKeys.forEach((key) => {\n    unexpectedKeyCache[key] = true;\n  });\n  if (action && action.type === actionTypes_default.REPLACE)\n    return;\n  if (unexpectedKeys.length > 0) {\n    return `Unexpected ${unexpectedKeys.length > 1 ? \"keys\" : \"key\"} \"${unexpectedKeys.join('\", \"')}\" found in ${argumentName}. Expected to find one of the known reducer keys instead: \"${reducerKeys.join('\", \"')}\". Unexpected keys will be ignored.`;\n  }\n}\nfunction assertReducerShape(reducers) {\n  Object.keys(reducers).forEach((key) => {\n    const reducer = reducers[key];\n    const initialState = reducer(void 0, {\n      type: actionTypes_default.INIT\n    });\n    if (typeof initialState === \"undefined\") {\n      throw new Error( false ? 0 : `The slice reducer for key \"${key}\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);\n    }\n    if (typeof reducer(void 0, {\n      type: actionTypes_default.PROBE_UNKNOWN_ACTION()\n    }) === \"undefined\") {\n      throw new Error( false ? 0 : `The slice reducer for key \"${key}\" returned undefined when probed with a random type. Don't try to handle '${actionTypes_default.INIT}' or other actions in \"redux/*\" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`);\n    }\n  });\n}\nfunction combineReducers(reducers) {\n  const reducerKeys = Object.keys(reducers);\n  const finalReducers = {};\n  for (let i = 0; i < reducerKeys.length; i++) {\n    const key = reducerKeys[i];\n    if (true) {\n      if (typeof reducers[key] === \"undefined\") {\n        warning(`No reducer provided for key \"${key}\"`);\n      }\n    }\n    if (typeof reducers[key] === \"function\") {\n      finalReducers[key] = reducers[key];\n    }\n  }\n  const finalReducerKeys = Object.keys(finalReducers);\n  let unexpectedKeyCache;\n  if (true) {\n    unexpectedKeyCache = {};\n  }\n  let shapeAssertionError;\n  try {\n    assertReducerShape(finalReducers);\n  } catch (e) {\n    shapeAssertionError = e;\n  }\n  return function combination(state = {}, action) {\n    if (shapeAssertionError) {\n      throw shapeAssertionError;\n    }\n    if (true) {\n      const warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);\n      if (warningMessage) {\n        warning(warningMessage);\n      }\n    }\n    let hasChanged = false;\n    const nextState = {};\n    for (let i = 0; i < finalReducerKeys.length; i++) {\n      const key = finalReducerKeys[i];\n      const reducer = finalReducers[key];\n      const previousStateForKey = state[key];\n      const nextStateForKey = reducer(previousStateForKey, action);\n      if (typeof nextStateForKey === \"undefined\") {\n        const actionType = action && action.type;\n        throw new Error( false ? 0 : `When called with an action of type ${actionType ? `\"${String(actionType)}\"` : \"(unknown type)\"}, the slice reducer for key \"${key}\" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`);\n      }\n      nextState[key] = nextStateForKey;\n      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;\n    }\n    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;\n    return hasChanged ? nextState : state;\n  };\n}\n\n// src/bindActionCreators.ts\nfunction bindActionCreator(actionCreator, dispatch) {\n  return function(...args) {\n    return dispatch(actionCreator.apply(this, args));\n  };\n}\nfunction bindActionCreators(actionCreators, dispatch) {\n  if (typeof actionCreators === \"function\") {\n    return bindActionCreator(actionCreators, dispatch);\n  }\n  if (typeof actionCreators !== \"object\" || actionCreators === null) {\n    throw new Error( false ? 0 : `bindActionCreators expected an object or a function, but instead received: '${kindOf(actionCreators)}'. Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?`);\n  }\n  const boundActionCreators = {};\n  for (const key in actionCreators) {\n    const actionCreator = actionCreators[key];\n    if (typeof actionCreator === \"function\") {\n      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);\n    }\n  }\n  return boundActionCreators;\n}\n\n// src/compose.ts\nfunction compose(...funcs) {\n  if (funcs.length === 0) {\n    return (arg) => arg;\n  }\n  if (funcs.length === 1) {\n    return funcs[0];\n  }\n  return funcs.reduce((a, b) => (...args) => a(b(...args)));\n}\n\n// src/applyMiddleware.ts\nfunction applyMiddleware(...middlewares) {\n  return (createStore2) => (reducer, preloadedState) => {\n    const store = createStore2(reducer, preloadedState);\n    let dispatch = () => {\n      throw new Error( false ? 0 : \"Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.\");\n    };\n    const middlewareAPI = {\n      getState: store.getState,\n      dispatch: (action, ...args) => dispatch(action, ...args)\n    };\n    const chain = middlewares.map((middleware) => middleware(middlewareAPI));\n    dispatch = compose(...chain)(store.dispatch);\n    return {\n      ...store,\n      dispatch\n    };\n  };\n}\n\n// src/utils/isAction.ts\nfunction isAction(action) {\n  return isPlainObject(action) && \"type\" in action && typeof action.type === \"string\";\n}\n\n//# sourceMappingURL=redux.mjs.map\n\n//# sourceURL=webpack://lesson9/./node_modules/redux/dist/redux.mjs?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;