module.exports =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "built/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = __webpack_require__(3);

var _fs2 = _interopRequireDefault(_fs);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _AppObserver = __webpack_require__(5);

var _AppObserver2 = _interopRequireDefault(_AppObserver);

var _server = __webpack_require__(16);

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleRender(req, res) {
	console.log(' ');
	console.log(req.originalUrl, 'URL!!');
	console.log(' ');
	var reactString = _server2.default.renderToString(_react2.default.createElement(_AppObserver2.default, null));
	_fs2.default.readFile('./index.html', 'utf8', function (err, file) {
		if (err) {
			return console.log(err);
		}
		var document = file.replace(/<div id="app"><\/div>/, '<div id="app">' + reactString + '</div>');
		res.send(document);
	});
}

exports.default = handleRender;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(React) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HomePageObserver = __webpack_require__(6);

var _HomePageObserver2 = _interopRequireDefault(_HomePageObserver);

var _SideMenuObserver = __webpack_require__(15);

var _SideMenuObserver2 = _interopRequireDefault(_SideMenuObserver);

var _MuiThemeProvider = __webpack_require__(7);

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _materialUi = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App() {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

		_this.state = {
			open: false
		};
		return _this;
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				_MuiThemeProvider2.default,
				null,
				React.createElement(
					'div',
					null,
					React.createElement(_materialUi.AppBar, {
						title: 'NET',
						iconElementLeft: React.createElement(
							'div',
							null,
							'iconElementLeft'
						),
						iconElementRight: React.createElement(
							'div',
							null,
							'iconElementRight'
						)
					}),
					React.createElement(_SideMenuObserver2.default, null),
					React.createElement(_HomePageObserver2.default, null),
					React.createElement(
						_materialUi.Paper,
						{ style: { position: 'fixed', bottom: 0, left: 0, right: 0 } },
						React.createElement(_materialUi.BottomNavigation, null)
					)
				)
			);
		}
	}]);

	return App;
}(React.Component);

exports.default = App;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(React) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _materialUi = __webpack_require__(8);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomePage = function (_React$Component) {
	_inherits(HomePage, _React$Component);

	function HomePage() {
		_classCallCheck(this, HomePage);

		return _possibleConstructorReturn(this, (HomePage.__proto__ || Object.getPrototypeOf(HomePage)).apply(this, arguments));
	}

	_createClass(HomePage, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				'HOME PAGE'
			);
		}
	}]);

	return HomePage;
}(React.Component);

exports.default = HomePage;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("material-ui/styles/MuiThemeProvider");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("material-ui");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("material-ui/svg-icons/image/remove-red-eye");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("material-ui/svg-icons/social/person-add");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("material-ui/svg-icons/content/link");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("material-ui/svg-icons/content/content-copy");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("material-ui/svg-icons/file/file-download");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("material-ui/svg-icons/action/delete");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(React) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _materialUi = __webpack_require__(8);

var _removeRedEye = __webpack_require__(9);

var _removeRedEye2 = _interopRequireDefault(_removeRedEye);

var _personAdd = __webpack_require__(10);

var _personAdd2 = _interopRequireDefault(_personAdd);

var _link = __webpack_require__(11);

var _link2 = _interopRequireDefault(_link);

var _contentCopy = __webpack_require__(12);

var _contentCopy2 = _interopRequireDefault(_contentCopy);

var _fileDownload = __webpack_require__(13);

var _fileDownload2 = _interopRequireDefault(_fileDownload);

var _delete = __webpack_require__(14);

var _delete2 = _interopRequireDefault(_delete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SideMenu = function (_React$Component) {
	_inherits(SideMenu, _React$Component);

	function SideMenu() {
		_classCallCheck(this, SideMenu);

		return _possibleConstructorReturn(this, (SideMenu.__proto__ || Object.getPrototypeOf(SideMenu)).apply(this, arguments));
	}

	_createClass(SideMenu, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				_materialUi.Drawer,
				{ width: 200, openSecondary: true, open: false },
				React.createElement(_materialUi.AppBar, { title: 'Side menu' }),
				React.createElement(
					_materialUi.Menu,
					null,
					React.createElement(_materialUi.MenuItem, { primaryText: 'Preview', leftIcon: React.createElement(_removeRedEye2.default, null) }),
					React.createElement(_materialUi.MenuItem, { primaryText: 'Share', leftIcon: React.createElement(_personAdd2.default, null) }),
					React.createElement(_materialUi.MenuItem, { primaryText: 'Get links', leftIcon: React.createElement(_link2.default, null) }),
					React.createElement(_materialUi.Divider, null),
					React.createElement(_materialUi.MenuItem, { primaryText: 'Make a copy', leftIcon: React.createElement(_contentCopy2.default, null) }),
					React.createElement(_materialUi.MenuItem, { primaryText: 'Download', leftIcon: React.createElement(_fileDownload2.default, null) }),
					React.createElement(_materialUi.Divider, null),
					React.createElement(_materialUi.MenuItem, { primaryText: 'Remove', leftIcon: React.createElement(_delete2.default, null) })
				)
			);
		}
	}]);

	return SideMenu;
}(React.Component);

exports.default = SideMenu;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ })
/******/ ]);