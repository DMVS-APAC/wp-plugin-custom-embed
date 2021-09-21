/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/classic-index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classApplyDescriptorGet.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classApplyDescriptorGet.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

module.exports = _classApplyDescriptorGet;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classApplyDescriptorSet.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classApplyDescriptorSet.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }
}

module.exports = _classApplyDescriptorSet;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classExtractFieldDescriptor.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classExtractFieldDescriptor.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }

  return privateMap.get(receiver);
}

module.exports = _classExtractFieldDescriptor;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classPrivateFieldGet.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classPrivateFieldGet.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classApplyDescriptorGet = __webpack_require__(/*! ./classApplyDescriptorGet.js */ "./node_modules/@babel/runtime/helpers/classApplyDescriptorGet.js");

var classExtractFieldDescriptor = __webpack_require__(/*! ./classExtractFieldDescriptor.js */ "./node_modules/@babel/runtime/helpers/classExtractFieldDescriptor.js");

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = classExtractFieldDescriptor(receiver, privateMap, "get");
  return classApplyDescriptorGet(receiver, descriptor);
}

module.exports = _classPrivateFieldGet;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classPrivateFieldSet.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classPrivateFieldSet.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classApplyDescriptorSet = __webpack_require__(/*! ./classApplyDescriptorSet.js */ "./node_modules/@babel/runtime/helpers/classApplyDescriptorSet.js");

var classExtractFieldDescriptor = __webpack_require__(/*! ./classExtractFieldDescriptor.js */ "./node_modules/@babel/runtime/helpers/classExtractFieldDescriptor.js");

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = classExtractFieldDescriptor(receiver, privateMap, "set");
  classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}

module.exports = _classPrivateFieldSet;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"];

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized.js */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js");

var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _typeof(obj);
}

module.exports = _typeof;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/node-fetch/browser.js":
/*!********************************************!*\
  !*** ./node_modules/node-fetch/browser.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('unable to locate global object');
}

var global = getGlobal();

module.exports = exports = global.fetch;

// Needed for TypeScript and Webpack.
if (global.fetch) {
	exports.default = global.fetch.bind(global);
}

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;

/***/ }),

/***/ "./src/classic-index.js":
/*!******************************!*\
  !*** ./src/classic-index.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_ContentFinderComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/ContentFinderComponent */ "./src/components/ContentFinderComponent.js");
/* harmony import */ var _components_ClassicSelectedVideoComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/ClassicSelectedVideoComponent */ "./src/components/ClassicSelectedVideoComponent.js");
/* harmony import */ var _libs_dmSdk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./libs/dmSdk */ "./src/libs/dmSdk.js");






function dmVideoSearch() {
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_components_ClassicSelectedVideoComponent__WEBPACK_IMPORTED_MODULE_2__["default"], null), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_components_ContentFinderComponent__WEBPACK_IMPORTED_MODULE_1__["default"], null));
}

document.addEventListener('dm-sdk-ready', function () {
  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["render"])(dmVideoSearch(), document.getElementById('dm-search-classic'));
});
new _libs_dmSdk__WEBPACK_IMPORTED_MODULE_3__["default"]();

/***/ }),

/***/ "./src/components/ClassicSelectedVideoComponent.js":
/*!*********************************************************!*\
  !*** ./src/components/ClassicSelectedVideoComponent.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ClassicSelectedVideoComponent; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);





var videoDefault = {
  title: '',
  thumbnail_240_url: '',
  id: ''
};
function ClassicSelectedVideoComponent(props) {
  var _useState = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["useState"])(videoDefault),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      videoData = _useState2[0],
      setVideoData = _useState2[1];

  Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__["subscribe"])(function (e) {});
  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    console.log('aha');
  });

  var setVideo = function setVideo() {
    // const video = getVideo()
    setVideoData({
      title: 'nganu',
      id: '234'
    });
  };

  var showImage = function showImage() {
    if (videoData.title !== '' || videoData.name !== '') {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, "Video is here!");
    }

    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("p", null, "No video selected.");
  };

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["PanelBody"], null, showImage);
}

/***/ }),

/***/ "./src/components/ContentFinderComponent.js":
/*!**************************************************!*\
  !*** ./src/components/ContentFinderComponent.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ContentFinderComponent; });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldGet */ "./node_modules/@babel/runtime/helpers/classPrivateFieldGet.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldSet */ "./node_modules/@babel/runtime/helpers/classPrivateFieldSet.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _VideosComponent__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./VideosComponent */ "./src/components/VideosComponent.js");
/* harmony import */ var _PlaylistComponent__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./PlaylistComponent */ "./src/components/PlaylistComponent.js");
/* harmony import */ var _store_dmSdkStore__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../store/dmSdkStore */ "./src/store/dmSdkStore.js");












function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



 // Components





/**
 * A form to find a content from Dailymotion, part of Dailymotion sidebar.
 * In this form will only parse the data to processed on the child component
 *
 */

var _connectionStatus = new WeakMap();

var ContentFinderComponent = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ContentFinderComponent, _Component);

  var _super = _createSuper(ContentFinderComponent);

  /**
   * A variable to store a state
   */
  function ContentFinderComponent(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ContentFinderComponent);

    _this = _super.call(this, props);

    _connectionStatus.set(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), {
      writable: true,
      value: null
    });

    _this.state = {
      playlists: {},
      keywords: "",
      currentPage: 1,
      findGlobal: false,
      findPlaylist: false
    }; // This binding is necessary to make `this` work in the callback

    _this.findVideo = _this.findVideo.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.setKeywords = _this.setKeywords.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.setGlobalVideo = _this.setGlobalVideo.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.setFindPlaylist = _this.setFindPlaylist.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ContentFinderComponent, [{
    key: "setConnectionStatus",
    value: function () {
      var _setConnectionStatus = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.mark(function _callee(isConnected) {
        var connectionStatus;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (isConnected) {
                  connectionStatus = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("span", {
                    className: "dm--connected"
                  }), " ", Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__["__"])("You're connected", "textdomain"));
                } else {
                  connectionStatus = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("span", {
                    className: "dm--disconnected"
                  }), " ", Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__["__"])("You're not connected", "textdomain"));
                }

                this.setState({
                  connectionStatus: connectionStatus
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setConnectionStatus(_x) {
        return _setConnectionStatus.apply(this, arguments);
      }

      return setConnectionStatus;
    }()
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_8___default()(this, _connectionStatus, Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_12__["select"])(_store_dmSdkStore__WEBPACK_IMPORTED_MODULE_16__["STORE_KEY"]).getConnectionStatus()['connectionStatus']);

      this.setConnectionStatus(_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_7___default()(this, _connectionStatus));
    }
  }, {
    key: "findVideo",
    value: function () {
      var _findVideo = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.mark(function _callee2(e) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                e.preventDefault();

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function findVideo(_x2) {
        return _findVideo.apply(this, arguments);
      }

      return findVideo;
    }()
  }, {
    key: "setKeywords",
    value: function setKeywords(e) {
      this.setState({
        keywords: e.target.value
      });
    }
  }, {
    key: "setGlobalVideo",
    value: function setGlobalVideo(e) {
      this.setState({
        findGlobal: e.target.checked === true
      });
    }
  }, {
    key: "setFindPlaylist",
    value: function setFindPlaylist(e) {
      this.setState({
        findPlaylist: e.target.checked === true
      });
    }
  }, {
    key: "render",
    value: function render() {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_13__["PanelBody"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("div", {
        className: "dm__content-list"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("p", null, this.state.connectionStatus), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("form", {
        onSubmit: this.findVideo
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("label", {
        htmlFor: "keywords"
      }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__["__"])("Find a video", "textdomain")), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("input", {
        id: "keywords",
        onChange: this.setKeywords,
        type: "text",
        name: "keywords",
        className: "dm__keywords-input"
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("button", {
        type: "submit",
        className: "action button"
      }, "Find"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("label", {
        htmlFor: "global-video",
        className: "checkbox-label"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("input", {
        type: "checkbox",
        id: "global-video",
        onChange: this.setGlobalVideo,
        name: "globalVideo",
        value: "1"
      }), " ", Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__["__"])("Find global", "textdomain")), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("label", {
        htmlFor: "find-playlist",
        className: "checkbox-label"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("input", {
        type: "checkbox",
        id: "find-playlist",
        onChange: this.setFindPlaylist,
        name: "findPlaylist",
        value: "1"
      }), " ", Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__["__"])("Find playlist", "textdomain"))), this.state.findPlaylist ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])(_PlaylistComponent__WEBPACK_IMPORTED_MODULE_15__["default"], {
        keywords: this.state.keywords,
        globalVideo: this.state.findGlobal
      }) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])(_VideosComponent__WEBPACK_IMPORTED_MODULE_14__["default"], {
        keywords: this.state.keywords,
        globalVideo: this.state.findGlobal
      })));
    }
  }]);

  return ContentFinderComponent;
}(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["Component"]);



/***/ }),

/***/ "./src/components/PlaylistComponent.js":
/*!*********************************************!*\
  !*** ./src/components/PlaylistComponent.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlaylistComponent; });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldSet */ "./node_modules/@babel/runtime/helpers/classPrivateFieldSet.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldGet */ "./node_modules/@babel/runtime/helpers/classPrivateFieldGet.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _libs_apiCall__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../libs/apiCall */ "./src/libs/apiCall.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _libs_pagination__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../libs/pagination */ "./src/libs/pagination.js");
/* harmony import */ var _store_dmSdkStore__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../store/dmSdkStore */ "./src/store/dmSdkStore.js");












function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }








var _connectionStatus = new WeakMap();

var PlaylistComponent = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(PlaylistComponent, _Component);

  var _super = _createSuper(PlaylistComponent);

  /**
   * A variable to store a state from the state management
   */
  function PlaylistComponent(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, PlaylistComponent);

    _this = _super.call(this, props);

    _connectionStatus.set(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), {
      writable: true,
      value: null
    });

    _this.state = {
      playlists: {},
      currentPage: 1,
      loadingData: true
    };
    _this.setPlaylist = _this.setPlaylist.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.loadPage = _this.loadPage.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.setLoadingData = _this.setLoadingData.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(PlaylistComponent, [{
    key: "addToPost",
    value: function addToPost(video) {
      Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_13__["dispatch"])('core/editor').editPost({
        meta: {
          _dm_video_data: JSON.stringify(video)
        }
      }); // Send custom event to catch on VideoBlockComponent to render a new video

      var videoUpdated = new CustomEvent("dm-video-updated");
      document.dispatchEvent(videoUpdated);
    }
  }, {
    key: "fetchPlaylist",
    value: function () {
      var _fetchPlaylist = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.mark(function _callee() {
        var _this2 = this;

        var page,
            keywords,
            dmUser,
            content,
            url,
            params,
            owner,
            _args = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                page = _args.length > 0 && _args[0] !== undefined ? _args[0] : 1;
                keywords = _args.length > 1 ? _args[1] : undefined;
                this.setLoadingData(true);
                _context.next = 5;
                return Object(_libs_apiCall__WEBPACK_IMPORTED_MODULE_12__["fetchApi"])('/dm/v1/userinfo');

              case 5:
                dmUser = _context.sent;
                _context.next = 8;
                return Object(_libs_apiCall__WEBPACK_IMPORTED_MODULE_12__["fetchApi"])('/dm/v1/get-custom-options/content');

              case 8:
                content = _context.sent;
                url = '/playlists';
                params = {
                  limit: 10,
                  fields: 'id,name,thumbnail_240_url,private',
                  page: page,
                  sort: 'recent',
                  flags: 'verified'
                };

                if (keywords) {
                  params.search = keywords;
                  params.sort = 'relevance';
                }

                if (_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_8___default()(this, _connectionStatus) && this.props.globalVideo !== true) {
                  params.owner = dmUser;
                } else if (!_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_8___default()(this, _connectionStatus) && content !== false) {
                  owner = content.owners.split(',');
                  params.owner = owner[0];
                }

                return _context.abrupt("return", new Promise(function (resolve) {
                  DM.api(url, params, function (playlists) {
                    _this2.setLoadingData(false);

                    resolve(playlists);
                  });
                }).catch(function (err) {
                  console.log(err);
                }));

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchPlaylist() {
        return _fetchPlaylist.apply(this, arguments);
      }

      return fetchPlaylist;
    }()
  }, {
    key: "loadPage",
    value: function () {
      var _loadPage = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.mark(function _callee2(page) {
        var playlists;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.fetchPlaylist(page, this.props.keywords);

              case 2:
                playlists = _context2.sent;
                this.setCurrentPage(page);
                this.setPlaylist(playlists);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadPage(_x) {
        return _loadPage.apply(this, arguments);
      }

      return loadPage;
    }()
  }, {
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.mark(function _callee3() {
        var playlists;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_7___default()(this, _connectionStatus, Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_13__["select"])(_store_dmSdkStore__WEBPACK_IMPORTED_MODULE_15__["STORE_KEY"]).getConnectionStatus()['connectionStatus']);

                _context3.next = 3;
                return this.fetchPlaylist();

              case 3:
                playlists = _context3.sent;
                this.setCurrentPage();
                this.setPlaylist(playlists);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentDidUpdate",
    value: function () {
      var _componentDidUpdate = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.mark(function _callee4(prevProps) {
        var playlists;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.props.keywords !== prevProps.keywords || this.props.globalVideo !== prevProps.globalVideo)) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 3;
                return this.fetchPlaylist(1, this.props.keywords);

              case 3:
                playlists = _context4.sent;
                this.setCurrentPage(1);
                this.setPlaylist(playlists);

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function componentDidUpdate(_x2) {
        return _componentDidUpdate.apply(this, arguments);
      }

      return componentDidUpdate;
    }()
  }, {
    key: "setLoadingData",
    value: function setLoadingData(status) {
      this.setState({
        loadingData: status
      });
    }
  }, {
    key: "setPlaylist",
    value: function setPlaylist(playlists) {
      this.setState({
        playlists: playlists
      });
    }
  }, {
    key: "setCurrentPage",
    value: function setCurrentPage() {
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.setState({
        currentPage: page
      });
    }
  }, {
    key: "renderPlaylists",
    value: function renderPlaylists() {
      var _this3 = this;

      var playlists = [];

      if (this.state.playlists.error !== undefined) {
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("li", {
          className: "dm__show-message"
        }, "API errors, to search playlist you must login first\u2026");
      }

      if (this.state.playlists !== undefined && Object.entries(this.state.playlists).length > 0 && this.state.playlists.list.length > 0) {
        (function () {
          var list = _this3.state.playlists.list;

          var _loop = function _loop(i) {
            playlists.push(Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("li", {
              key: list[i],
              className: "content__item"
            }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("button", {
              onClick: function onClick() {
                return _this3.addToPost(list[i]);
              }
            }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("figure", {
              className: "content__image-wrapper"
            }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("div", {
              className: "content__placement"
            }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("img", {
              src: list[i].thumbnail_240_url,
              alt: list[i].name,
              className: "content__thumbnail"
            }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("span", {
              className: "content__title"
            }, list[i].name))));
          };

          for (var i = 0; i < list.length; i++) {
            _loop(i);
          }
        })();
      } else {
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("li", null, "No playlist found\u2026");
      }

      return playlists;
    }
  }, {
    key: "render",
    value: function render() {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("ul", {
        className: "dm__search-results"
      }, this.state.loadingData ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("li", null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__["__"])('loading playlist…', 'textdomain')) : this.renderPlaylists()), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])(_libs_pagination__WEBPACK_IMPORTED_MODULE_14__["default"], {
        currentPage: this.state.currentPage,
        callback: this.loadPage,
        contentData: this.state.playlists
      }));
    }
  }]);

  return PlaylistComponent;
}(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["Component"]);



/***/ }),

/***/ "./src/components/VideosComponent.js":
/*!*******************************************!*\
  !*** ./src/components/VideosComponent.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return VideosComponent; });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldSet */ "./node_modules/@babel/runtime/helpers/classPrivateFieldSet.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldGet */ "./node_modules/@babel/runtime/helpers/classPrivateFieldGet.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _libs_apiCall__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../libs/apiCall */ "./src/libs/apiCall.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _libs_pagination__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../libs/pagination */ "./src/libs/pagination.js");
/* harmony import */ var _store_dmSdkStore__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../store/dmSdkStore */ "./src/store/dmSdkStore.js");












function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }







/**
 * VideosComponent
 *
 * This component will generate a search results
 *
 */

var _connectionStatus = new WeakMap();

var VideosComponent = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(VideosComponent, _Component);

  var _super = _createSuper(VideosComponent);

  /**
   * A variable to store a state from the state management
   */
  function VideosComponent(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, VideosComponent);

    _this = _super.call(this, props);

    _connectionStatus.set(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), {
      writable: true,
      value: null
    });

    _this.state = {
      videos: {},
      currentPage: 1,
      loadingData: true
    };
    _this.setVideos = _this.setVideos.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.loadPage = _this.loadPage.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.setLoadingData = _this.setLoadingData.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    return _this;
  }
  /**
   * fetchVideo
   *
   * There are several conditions to get the video result
   *
   * 1. User not connected and channel name is empty. It will get current global videos.
   * 2. User not connected and channel name is not empty at least one channel name. It will from all channels defined.
   * 3. User connected and channel name is empty. It will get a connected channel name videos.
   * 4. User connected and channel name is not empty. It will override a channel name using connected channel name.
   * 5. When `find global` ticked, it override all channel name defined.
   *
   *
   *
   * @param page page number of the result
   * @param keywords keywords used to get the result
   * @returns {Promise<any>}
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(VideosComponent, [{
    key: "fetchVideo",
    value: function () {
      var _fetchVideo = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.mark(function _callee2() {
        var _this2 = this;

        var page,
            keywords,
            dmUser,
            content,
            params,
            url,
            isOwners,
            _args2 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                page = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 1;
                keywords = _args2.length > 1 ? _args2[1] : undefined;
                this.setLoadingData(true);
                _context2.next = 5;
                return Object(_libs_apiCall__WEBPACK_IMPORTED_MODULE_12__["fetchApi"])('/dm/v1/userinfo');

              case 5:
                dmUser = _context2.sent;
                _context2.next = 8;
                return Object(_libs_apiCall__WEBPACK_IMPORTED_MODULE_12__["fetchApi"])('/dm/v1/get-custom-options/content');

              case 8:
                content = _context2.sent;
                params = {
                  fields: 'id,title,thumbnail_240_url,status,private,private_id',
                  limit: 10,
                  flags: 'no_live,exportable,verified',
                  page: page
                };

                if (keywords) {
                  params.sort = 'relevance';
                  params.search = keywords;
                } else {
                  params.sort = 'recent';
                }

                url = '';
                isOwners = typeof content.owners !== 'undefined';

                if (_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_8___default()(this, _connectionStatus) && this.props.globalVideo !== true && !isOwners) {
                  url = 'user/' + dmUser + '/videos';
                } else if (isOwners && this.props.globalVideo !== true) {
                  params.owners = content.owners;
                  url = 'videos';
                } else {
                  url = 'videos';
                }

                return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.mark(function _callee(resolve) {
                    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            DM.api(url, params, function (videos) {
                              _this2.setLoadingData(false);

                              resolve(videos);
                            });

                          case 1:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }()).catch(function (error) {
                  console.log(error);
                }));

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchVideo() {
        return _fetchVideo.apply(this, arguments);
      }

      return fetchVideo;
    }()
  }, {
    key: "setVideos",
    value: function setVideos(videos) {
      this.setState({
        videos: videos
      });
    }
  }, {
    key: "setCurrentPage",
    value: function setCurrentPage() {
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.setState({
        currentPage: page
      });
    }
  }, {
    key: "setLoadingData",
    value: function setLoadingData(status) {
      this.setState({
        loadingData: status
      });
    }
    /**
     * addToPost
     *
     * This function will dispatch the data to `core/editor` to save
     * later on when the user save the post. It also send a custom
     * event for `VideoBlockComponent` to listen that the video is
     * updated.
     *
     * @param video
     */

  }, {
    key: "addToPost",
    value: function addToPost(video) {
      Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_13__["dispatch"])('core/editor').editPost({
        meta: {
          _dm_video_data: JSON.stringify(video)
        }
      }); // Send custom event to catch on VideoBlockComponent to render a new video

      var videoUpdated = new CustomEvent("dm-video-updated");
      document.dispatchEvent(videoUpdated);
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.mark(function _callee3() {
        var videos;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_7___default()(this, _connectionStatus, Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_13__["select"])(_store_dmSdkStore__WEBPACK_IMPORTED_MODULE_15__["STORE_KEY"]).getConnectionStatus()['connectionStatus']);

                _context3.next = 3;
                return this.fetchVideo();

              case 3:
                videos = _context3.sent;
                this.setVideos(videos);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentDidUpdate",
    value: function () {
      var _componentDidUpdate = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.mark(function _callee4(prevProps) {
        var videos;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.props.keywords !== prevProps.keywords || this.props.globalVideo !== prevProps.globalVideo)) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 3;
                return this.fetchVideo(1, this.props.keywords);

              case 3:
                videos = _context4.sent;
                this.setCurrentPage();
                this.setVideos(videos);

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function componentDidUpdate(_x2) {
        return _componentDidUpdate.apply(this, arguments);
      }

      return componentDidUpdate;
    }()
  }, {
    key: "loadPage",
    value: function () {
      var _loadPage = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.mark(function _callee5(page) {
        var videos;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.fetchVideo(page, this.props.keywords);

              case 2:
                videos = _context5.sent;
                this.setCurrentPage(page);
                this.setVideos(videos);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function loadPage(_x3) {
        return _loadPage.apply(this, arguments);
      }

      return loadPage;
    }()
  }, {
    key: "renderVideoList",
    value: function renderVideoList() {
      var _this3 = this;

      var videos = [];

      if (this.state.videos.error !== undefined) {
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("li", {
          className: "dm__show-message"
        }, "API errors, please check your settings\u2026");
      }

      if (this.state.videos !== undefined && Object.entries(this.state.videos).length > 0 && this.state.videos.list.length > 0) {
        (function () {
          var list = _this3.state.videos.list;

          var _loop = function _loop(i) {
            videos.push(Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("li", {
              key: list[i],
              className: "content__item ".concat(list[i].private ? "private" : "", " ").concat(list[i].status === 'ready' ? "draft" : "")
            }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("button", {
              onClick: function onClick() {
                return _this3.addToPost(list[i]);
              },
              type: "button"
            }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("figure", {
              className: "content__image-wrapper"
            }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("div", {
              className: "content__placement"
            }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("img", {
              src: list[i].thumbnail_240_url,
              alt: list[i].title,
              className: "content__thumbnail"
            }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("span", {
              className: "content__title",
              title: list[i].title
            }, list[i].title))));
          };

          for (var i = 0; i < list.length; i++) {
            _loop(i);
          }
        })();
      } else {
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("li", null, "No video found\u2026");
      }

      return videos;
    }
  }, {
    key: "render",
    value: function render() {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("ul", {
        className: "dm__search-results"
      }, this.state.loadingData ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])("li", null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__["__"])('loading video…', 'textdomain')) : this.renderVideoList()), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])(_libs_pagination__WEBPACK_IMPORTED_MODULE_14__["default"], {
        currentPage: this.state.currentPage,
        callback: this.loadPage,
        contentData: this.state.videos
      }));
    }
  }]);

  return VideosComponent;
}(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["Component"]);



/***/ }),

/***/ "./src/libs/apiCall.js":
/*!*****************************!*\
  !*** ./src/libs/apiCall.js ***!
  \*****************************/
/*! exports provided: fetchData, fetchApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchData", function() { return fetchData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchApi", function() { return fetchApi; });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);


// Support server-side fetch for tests.
 // This is for test purposes

var fetch = typeof window === 'undefined' ? __webpack_require__(/*! node-fetch */ "./node_modules/node-fetch/browser.js") : window.fetch;
/**
 *
 * @param {string} urlParams
 * @returns {Promise<any>}
 */

function fetchData(urlParams) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(resolve, reject) {
      var response;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch('https://api.dailymotion.com/' + urlParams);

            case 2:
              response = _context.sent;

              /**
               * Only HTTP 200 is regarded as successful response
               */
              if (response.status === 200) {
                resolve(response.json());
              } else {
                reject();
              }

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()).catch(function (err) {
    console.log(err);
  });
}
/**
 *
 * @param {string} url
 * @param {string} method
 * @returns {Promise<any>}
 */

function fetchApi(url) {
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
  return new Promise(function (resolve) {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: url,
      method: method
    }).then(function (result) {
      resolve(result);
    });
  });
}

/***/ }),

/***/ "./src/libs/dmSdk.js":
/*!***************************!*\
  !*** ./src/libs/dmSdk.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DmSdk; });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _waitFor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./waitFor */ "./src/libs/waitFor.js");
/* harmony import */ var _apiCall__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./apiCall */ "./src/libs/apiCall.js");
/* harmony import */ var _store_dmSdkStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../store/dmSdkStore */ "./src/store/dmSdkStore.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_7__);





function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }





/**
 * This is an SDK of Dailymotion script
 */

var _overrideDmVars = new WeakSet();

var _initDm = new WeakSet();

var _subscribeSessionChange = new WeakSet();

var _getDMLoginStatus = new WeakSet();

var _setConnectionStatus = new WeakSet();

var DmSdk = /*#__PURE__*/function () {
  function DmSdk() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, DmSdk);

    _setConnectionStatus.add(this);

    _getDMLoginStatus.add(this);

    _subscribeSessionChange.add(this);

    _initDm.add(this);

    _overrideDmVars.add(this);

    this.setupDm();
  }
  /**
   * Overriding the default function by DM SDK to meet the plugin needs
   *
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(DmSdk, [{
    key: "setupDm",
    value: function () {
      var _setupDm = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Object(_waitFor__WEBPACK_IMPORTED_MODULE_4__["waitFor"])(function () {
                  return typeof DM !== 'undefined';
                }, 100, 30000, "Timeout waiting for DM loaded, please refresh and make sure your internet is active");

              case 2:
                _classPrivateMethodGet(this, _overrideDmVars, _overrideDmVars2).call(this);

                _context.next = 5;
                return _classPrivateMethodGet(this, _initDm, _initDm2).call(this);

              case 5:
                _classPrivateMethodGet(this, _subscribeSessionChange, _subscribeSessionChange2).call(this);

                _context.next = 8;
                return _classPrivateMethodGet(this, _setConnectionStatus, _setConnectionStatus2).call(this);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setupDm() {
        return _setupDm.apply(this, arguments);
      }

      return setupDm;
    }()
  }]);

  return DmSdk;
}();

function _overrideDmVars2() {
  // Override default `tokenUrl`, in some cases the tokenUrl is using graphql but in this case we use non-graphql
  DM._oauth.tokenUrl = 'https://api.dailymotion.com/oauth/token'; // Override default `isSessionExpired` to renew the session if it's expired

  DM.Auth.isSessionExpired = function (session, sessionLoadingMethod) {
    if (typeof session === 'undefined') {
      session = DM._session;
    }

    if (!session) {
      return true;
    }

    if (session && 'expires_in' in session && new Date().getTime() < parseInt(session.expires_in, 10) * 1000) {
      return false;
    }

    delete session.expires_in;
    return true;
  };
}

function _initDm2() {
  return _initDm3.apply(this, arguments);
}

function _initDm3() {
  _initDm3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee2() {
    var options;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Object(_apiCall__WEBPACK_IMPORTED_MODULE_5__["fetchApi"])('/dm/v1/get-api-key');

          case 2:
            options = _context2.sent;
            DM.init({
              apiKey: options.api_key,
              apiSecret: options.api_secret,
              status: true,
              cookie: true
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _initDm3.apply(this, arguments);
}

function _subscribeSessionChange2() {
  DM.Event.subscribe('auth.sessionChange', function (res) {
    // To keep user logged in in 28 days
    if ((res === null || res === void 0 ? void 0 : res.status) === "connected") {
      var longSession = res.session;

      if (!("expires_in" in res.session)) {
        longSession.expires_in = longSession.expires;
      } // set the cookie expires to 28 days


      longSession.expires = longSession.expires + 3600 * 24 * 28;
      DM.Cookie.set(longSession);
    }
  });
}

function _getDMLoginStatus2() {
  return new Promise(function (resolve) {
    DM.getLoginStatus(function (response) {
      if (response.session) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

function _setConnectionStatus2() {
  return _setConnectionStatus3.apply(this, arguments);
}

function _setConnectionStatus3() {
  _setConnectionStatus3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.mark(function _callee3() {
    var connection, dmSdkReady;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _classPrivateMethodGet(this, _getDMLoginStatus, _getDMLoginStatus2).call(this);

          case 2:
            connection = _context3.sent;

            /**
             * Dispatching the connection status to the
             */
            Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_7__["dispatch"])(_store_dmSdkStore__WEBPACK_IMPORTED_MODULE_6__["STORE_KEY"]).setConnectionStatus({
              connectionStatus: connection
            });
            /**
             * This custom event is to trigger creation of the new
             * sidebar
             *
             * @type {CustomEvent<dmSdkReady>}
             */

            dmSdkReady = new CustomEvent("dm-sdk-ready");
            document.dispatchEvent(dmSdkReady);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _setConnectionStatus3.apply(this, arguments);
}



/***/ }),

/***/ "./src/libs/pagination.js":
/*!********************************!*\
  !*** ./src/libs/pagination.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return pagination; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


/**
 * This is a pagination component
 *
 * It will process the data thrown by some component
 * and the show the pagination based on it.
 *
 * @param props
 * @returns {JSX.Element}
 */

function pagination(props) {
  var contentData = props.contentData,
      currentPage = props.currentPage,
      callback = props.callback;
  /**
   * About this empty conditions
   *
   * 1. Of course if there is no data exist it won't show nothing
   * 2. If data exist and the total is 0
   * 3. Different with 2 above, this condition if the result found videos
   *    but only for page 1
   */

  if (Object.entries(contentData).length === 0 || contentData.total === 0 || contentData.has_more === false && contentData.page === 1) {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null);
  }

  if (contentData.page === 1 && contentData.has_more === true) {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("button", {
      type: "button",
      className: "components-button button action dm__next-button",
      onClick: function onClick() {
        return callback(currentPage + 1);
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Next', 'textdomain')));
  }

  if (contentData.has_more === false && contentData.page !== 1) {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("button", {
      type: "button",
      className: "components-button button action dm__prev-button",
      onClick: function onClick() {
        return callback(currentPage - 1);
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Previous', 'textdomain')));
  }

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("button", {
    type: "button",
    className: "components-button button action dm__prev-button",
    onClick: function onClick() {
      return callback(currentPage - 1);
    }
  }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Previous', 'textdomain')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("button", {
    type: "button",
    className: "components-button button action dm__next-button",
    onClick: function onClick() {
      return callback(currentPage + 1);
    }
  }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Next', 'textdomain')));
}

/***/ }),

/***/ "./src/libs/waitFor.js":
/*!*****************************!*\
  !*** ./src/libs/waitFor.js ***!
  \*****************************/
/*! exports provided: waitFor, sleep */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "waitFor", function() { return waitFor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sleep", function() { return sleep; });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);



/**
 *
 * @param {function(): BooleanConstructor} condition - This is a condition needs to be fulfilled
 * @param {number} interval
 * @param {number} timeout
 * @param {string} timeoutMsg
 * @returns {Promise<void>}
 */
function waitFor() {
  return _waitFor.apply(this, arguments);
}
/**
 *
 * @param {number} delay A number of delay you wanted to wait
 * @returns {Promise<void>}
 */

function _waitFor() {
  _waitFor = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
    var condition,
        interval,
        timeout,
        timeoutMsg,
        _args = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            condition = _args.length > 0 && _args[0] !== undefined ? _args[0] : function () {
              return Boolean;
            };
            interval = _args.length > 1 && _args[1] !== undefined ? _args[1] : 50;
            timeout = _args.length > 2 && _args[2] !== undefined ? _args[2] : Infinity;
            timeoutMsg = _args.length > 3 && _args[3] !== undefined ? _args[3] : "";
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              var elapsedTime = 0;
              var timerId = setInterval(function () {
                var conditionFulfilled = condition();
                var killTimer = elapsedTime > timeout || conditionFulfilled;
                elapsedTime += interval;

                if (conditionFulfilled) {
                  resolve("");
                  clearInterval(timerId);
                } else if (killTimer) {
                  reject(new Error("waitFor(): " + timeoutMsg));
                  clearInterval(timerId);
                }
              }, interval);
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _waitFor.apply(this, arguments);
}

function sleep(_x) {
  return _sleep.apply(this, arguments);
}

function _sleep() {
  _sleep = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(delay) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve) {
              setTimeout(function () {
                resolve("");
              }, delay);
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _sleep.apply(this, arguments);
}

/***/ }),

/***/ "./src/store/dmSdkStore.js":
/*!*********************************!*\
  !*** ./src/store/dmSdkStore.js ***!
  \*********************************/
/*! exports provided: STORE_KEY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STORE_KEY", function() { return STORE_KEY; });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);

var STORE_KEY = 'data/dm-sdk'; // TODO: refactor the code to avoid spageti code. The way consume this store

var DEFAULT_STATE = {
  connectionStatus: null
};
var actions = {
  setConnectionStatus: function setConnectionStatus(status) {
    return {
      type: 'SET_CONNECTION_STATUS',
      status: status
    };
  }
};
var STORE_CONFIG = {
  reducer: function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'SET_CONNECTION_STATUS':
        return {
          connectionStatus: action.status
        };
    }

    return state;
  },
  actions: actions,
  selectors: {
    getConnectionStatus: function getConnectionStatus(state) {
      return state.connectionStatus;
    }
  }
};
var dmSdkStore = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["createReduxStore"])(STORE_KEY, STORE_CONFIG);
Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["register"])(dmSdkStore);

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*************************************!*\
  !*** external "regeneratorRuntime" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["regeneratorRuntime"]; }());

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["apiFetch"]; }());

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["components"]; }());

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["data"]; }());

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["element"]; }());

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["i18n"]; }());

/***/ })

/******/ });
//# sourceMappingURL=classic-index.js.map