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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/entries/dm-embed.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dm-player/dm-player.ts":
/*!************************************!*\
  !*** ./src/dm-player/dm-player.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Libraries
// import { waitFor } from '../utilities/wait-for';
var DmPlayer = /** @class */ (function () {
    function DmPlayer(rootEls) {
        this.rootEls = null;
        this.playerParams = null;
        this.searchParams = null;
        this.videoParams = null;
        this.rootEls = rootEls;
        this.addEventListeners();
        this.registerNewEvents();
        this.extractAttrs();
    }
    DmPlayer.prototype.addEventListeners = function () {
        var self = this;
        document.addEventListener('dm-api-ready', function (e) {
            self.loadDmPlayer();
        });
        document.addEventListener('dm-player-extracted', function (e) {
            self.prepareSearchParams();
        });
        document.addEventListener('dm-search-params-ready', function (e) {
            self.searchVideo();
        });
    };
    DmPlayer.prototype.registerNewEvents = function () {
        // listen to api to be ready
        this.apiReady = new Event('dm-api-ready');
        // listen to extract player attribute to be extracted
        this.playerExtracted = new Event('dm-player-extracted');
        // listen to search params to be ready
        this.searchParamsReady = new Event('dm-search-params-ready');
    };
    DmPlayer.prototype.extractAttrs = function () {
        var rootEl = this.rootEls[0];
        this.playerParams = {
            maxWordSearch: rootEl.getAttribute('maxWordSearch') ? Number(rootEl.getAttribute('maxWordSearch')) : 15,
            minWordLength: rootEl.getAttribute('minWordLength') ? Number(rootEl.getAttribute('minWordLength')) : 4,
            minWordSearch: rootEl.getAttribute('minWordSearch') ? Number(rootEl.getAttribute('minWordSearch')) : 2,
            language: rootEl.getAttribute("language") ? rootEl.getAttribute("language") : "",
            sort: rootEl.getAttribute("sort") ? rootEl.getAttribute("sort") : "recent",
            owners: rootEl.getAttribute("owners") ? rootEl.getAttribute("owners") : "",
            category: rootEl.getAttribute("category") ? rootEl.getAttribute("category") : "",
            excludeIds: rootEl.getAttribute("excludeIds") ? rootEl.getAttribute("excludeIds") : "",
            searchInPlaylist: rootEl.getAttribute("searchInPlaylist") ? rootEl.getAttribute("searchInPlaylist") : false,
            syndication: rootEl.getAttribute("syndication") ? rootEl.getAttribute("syndication") : "",
            autoPlayMute: (rootEl.getAttribute("autoPlayMute") != 'false'),
            queueEnable: (rootEl.getAttribute('queueEnable') != 'false'),
            queueEnableNext: (rootEl.getAttribute('queueEnableNext') != 'false'),
            controls: (rootEl.getAttribute('controls') != 'false'),
            adsParams: rootEl.getAttribute('adsParams') ? rootEl.getAttribute('adsParams') : "contextual",
            cpeId: rootEl.getAttribute('cpeId') ? rootEl.getAttribute('cpeId').split(',') : [''],
            keywordsSelector: rootEl.getAttribute('keywordsSelector') ? rootEl.getAttribute('keywordsSelector') : null
        };
        // Tell the event listener that player parameters is extracted
        document.dispatchEvent(this.playerExtracted);
    };
    DmPlayer.prototype.prepareSearchParams = function () {
        var keywords = this.findKeywords(this.playerParams.keywordsSelector);
        this.searchParams = {
            fields: 'id,title',
            limit: 1,
            sort: this.playerParams.sort,
            search: keywords ? keywords.sort(function (a, b) { return b.length - a.length; }).slice(0, this.playerParams.maxWordSearch).join(' ') : "",
            language: this.playerParams.language ? this.playerParams.language : ''
        };
        if (!this.playerParams.searchInPlaylist) {
            this.searchParams.private = 0;
            this.searchParams.flags = "no_live,exportable" + (this.playerParams.owners.length > 0 ? "" : ",verified");
            this.searchParams.longer_than = 0.35; //21sec
            if (this.playerParams.owners)
                this.searchParams.owners = this.playerParams.owners;
            if (this.playerParams.category)
                this.searchParams.channel = this.playerParams.category;
            if (this.playerParams.excludeIds)
                this.searchParams.exclude_ids = this.playerParams.excludeIds;
        }
        if (this.playerParams.language)
            this.searchParams.language = this.playerParams.language;
        // Tell the event listener that search params is ready
        document.dispatchEvent(this.searchParamsReady);
    };
    DmPlayer.prototype.htmlEntities = function (str) {
        return String(str).replace(/&/g, '%26').replace(/=/g, '%3d');
    };
    DmPlayer.prototype.loadDmPlayer = function () {
        var rootEl = this.rootEls[0];
        var cpeEmbed = document.createElement("div");
        var queryString = "";
        if (this.playerParams.adsParams === "") {
            queryString += "ads_params=contextual";
        }
        else {
            queryString += "ads_params=" + this.htmlEntities(this.playerParams.adsParams);
        }
        if (this.playerParams.syndication !== "")
            queryString += "&syndication=" + this.playerParams.syndication;
        if (this.playerParams.controls !== true)
            queryString += "&controls=" + this.playerParams.controls;
        cpeEmbed.setAttribute("class", "dailymotion-cpe");
        cpeEmbed.setAttribute("video-id", this.videoParams.id);
        cpeEmbed.setAttribute("query-string", queryString);
        if (rootEl.getAttribute("width") !== null) {
            this.playerParams.width = Number(rootEl.getAttribute("width"));
            cpeEmbed.setAttribute("width", rootEl.getAttribute("width"));
        }
        if (rootEl.getAttribute("height") !== null) {
            this.playerParams.height = Number(rootEl.getAttribute("height"));
            cpeEmbed.setAttribute("height", rootEl.getAttribute("height"));
        }
        var cpeId = this.playerParams.cpeId[0];
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
            cpeId = this.playerParams.cpeId[1] ? this.playerParams.cpeId[1] : this.playerParams.cpeId[0];
        // Avoid error while building
        var date = new Date();
        // Append the element to the root player element
        rootEl.appendChild(cpeEmbed);
        // Load the script
        (function (w, d, s, u, n, i, f, g, e, c) { w.WDMObject = n; w[n] = w[n] || function () { (w[n].q = w[n].q || []).push(arguments); }; w[n].l = 1 * date; w[n].i = i; w[n].f = f; w[n].g = g; e = d.createElement(s); e.async = 1; e.src = u; c = d.getElementsByTagName(s)[0]; c.parentNode.insertBefore(e, c); })(window, document, "script", "//api.dmcdn.net/pxl/cpe/client.min.js", "cpe", cpeId);
    };
    DmPlayer.prototype.setVideo = function (video) {
        this.videoParams = video;
        document.dispatchEvent(this.apiReady);
    };
    DmPlayer.prototype.searchVideo = function () {
        var _this = this;
        console.log("%c DM related ", "background: #56C7FF; color: #232323", "Search: " + this.searchParams.search);
        var properties = Object.entries(this.searchParams).map(function (_a) {
            var key = _a[0], value = _a[1];
            return encodeURIComponent(key) + "=" + encodeURIComponent(value);
        }).join('&');
        var dmSearchUrl = "https://api.dailymotion.com/" + (this.playerParams.searchInPlaylist ? "playlist/" + this.playerParams.searchInPlaylist + "/videos" : "videos") + "?" + properties;
        fetch(dmSearchUrl).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.total > 0) {
                _this.setVideo(data.list[0]);
            }
            else {
                console.log("%c DM related ", "background: #56C7FF; color: #232323", "Can not find related video. Fallback video used.");
                _this.getFallbackVideo();
            }
        });
    };
    DmPlayer.prototype.getFallbackVideo = function () {
        // Define current time and 30 days
        var currentTime = Math.floor(Date.now() / 1000);
        var thirtyDays = 2592000;
        var url = "https://api.dailymotion.com/" + (this.playerParams.searchInPlaylist ? "playlist/" + this.playerParams.searchInPlaylist + "/videos?" : "videos?owners=" + this.playerParams.owners) + "&created_after=" + (currentTime - thirtyDays) + "&sort=random&limit=1&fields=id,title";
        var self = this;
        fetch(url).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.list.length > 0) {
                /**
                 * Data return array, get the first array and pass it to setVideo function
                 */
                self.setVideo(data.list[0]);
            }
            else {
                console.warn("DM related Unable to find a fallback video");
            }
        });
    };
    /**
     * Find keywords strings on website
     *
     * Step find keywords string
     * 1. Find meta keywords
     * 2. Find
     */
    DmPlayer.prototype.findKeywords = function (selector) {
        var keywords = [''];
        if (selector !== null) {
            var keywordContainer = document.querySelector(selector);
            keywords = this.sanitizeKeywords(keywordContainer.getAttribute("content"));
        }
        else if (selector === null && typeof document.getElementsByTagName("h1")[0] !== "undefined") {
            keywords = this.sanitizeKeywords(document.getElementsByTagName("h1")[0].textContent);
        }
        return keywords;
    };
    /**
     * Sanitize keywords based on language
     *
     * Hangul (Korea): \u3131-\uD79D
     * Alphabet: a-zA-Z0-9
     * Latin Character: \u00C0-\u00FF
     * Devanagri (India): \u0900-\u097F
     */
    DmPlayer.prototype.sanitizeKeywords = function (keywords) {
        var _this = this;
        return keywords.replace(/[^- \u3131-\uD79D a-zA-Z0-9 \u00C0-\u00FF \u0900-\u097F \u0153]/g, ' ')
            .split(' ')
            .filter(function (word) { return word.length >= _this.playerParams.minWordLength; });
    };
    return DmPlayer;
}());
/* harmony default export */ __webpack_exports__["default"] = (DmPlayer);


/***/ }),

/***/ "./src/entries/dm-embed.ts":
/*!*********************************!*\
  !*** ./src/entries/dm-embed.ts ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dm_player_dm_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dm-player/dm-player */ "./src/dm-player/dm-player.ts");

var el = document.querySelectorAll('.dm-player');
var dmEmbed = new _dm_player_dm_player__WEBPACK_IMPORTED_MODULE_0__["default"](el);


/***/ })

/******/ });
//# sourceMappingURL=dm-ce.js.map