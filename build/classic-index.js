/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/ContentFinderComponent.js":
/*!**************************************************!*\
  !*** ./src/components/ContentFinderComponent.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ContentFinderComponent; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _VideosComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VideosComponent */ "./src/components/VideosComponent.js");
/* harmony import */ var _PlaylistComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PlaylistComponent */ "./src/components/PlaylistComponent.js");
/* harmony import */ var _store_dmSdkStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../store/dmSdkStore */ "./src/store/dmSdkStore.js");
/* harmony import */ var _libs_apiCall__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../libs/apiCall */ "./src/libs/apiCall.js");



 // Components






/**
 * A form to find a content from Dailymotion, part of Dailymotion sidebar.
 * In this form will only parse the data to be processed on the child component
 *
 */

class ContentFinderComponent extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: {},
      keywords: "",
      currentPage: 1,
      findGlobal: false,
      findPlaylist: false,
      channelId: "",
      allChannels: [],
      contentChannel: ""
    }; // This binding is necessary to make `this` work in the callback

    this.findVideo = this.findVideo.bind(this);
    this.setKeywords = this.setKeywords.bind(this);
    this.setGlobalVideo = this.setGlobalVideo.bind(this);
    this.setFindPlaylist = this.setFindPlaylist.bind(this);
    this.getAllChannels = this.getAllChannels.bind(this);
    this.setChannelId = this.setChannelId.bind(this);
    this.getAllChannels();
  }

  async findVideo(e) {
    e.preventDefault();
  }

  setKeywords(e) {
    this.setState({
      keywords: e.target.value
    });
  }

  setGlobalVideo(e) {
    this.setState({
      findGlobal: e.target.checked === true
    });
  }

  setFindPlaylist(e) {
    this.setState({
      findPlaylist: e.target.checked === true
    });
  }

  setChannelId(e) {
    this.setState({
      channelId: e.target.value
    });
  }

  async getAllChannels() {
    this.setState({
      allChannels: await (0,_libs_apiCall__WEBPACK_IMPORTED_MODULE_7__.fetchApi)('/dm/v2/get-option/channel_list'),
      contentChannel: await (0,_libs_apiCall__WEBPACK_IMPORTED_MODULE_7__.fetchApi)('dm/v2/get-option/options_manual_embed_content')
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.channelId == "" && this.state.allChannels.length) {
      this.setState({
        channelId: this.state.allChannels[0].id
      });
    }
  }

  renderChannels() {
    const channels = [];
    if (this.state.allChannels.length < 1) return null;

    for (let i = 0; i < this.state.allChannels.length; i++) {
      channels.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
        value: this.state.allChannels[i].id
      }, this.state.allChannels[i].id + ' - ' + this.state.allChannels[i].screenname));
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      for: "channelId"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Channel ID", "textdomain")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
      className: "dm__input",
      id: "channelId",
      name: "channelId",
      value: this.state.channelId,
      onChange: this.setChannelId
    }, channels));
  }

  render() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "dm__content-list"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
      onSubmit: this.findVideo
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "keywords"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Find a video", "textdomain")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      id: "keywords",
      onChange: this.setKeywords,
      type: "text",
      name: "keywords",
      className: "dm__input"
    }), this.renderChannels(), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "global-video",
      className: "checkbox-label"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "checkbox",
      id: "global-video",
      onChange: this.setGlobalVideo,
      name: "globalVideo",
      value: "1"
    }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Find global", "textdomain")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "find-playlist",
      className: "checkbox-label"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "checkbox",
      id: "find-playlist",
      onChange: this.setFindPlaylist,
      name: "findPlaylist",
      value: "1"
    }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Find playlist", "textdomain")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "submit",
      className: "action button"
    }, "Find")), this.state.findPlaylist ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_PlaylistComponent__WEBPACK_IMPORTED_MODULE_5__["default"], {
      keywords: this.state.keywords,
      globalVideo: this.state.findGlobal,
      perPage: this.props.resultsPerPage,
      channelId: this.state.channelId,
      contentChannelId: this.state.contentChannel.owners
    }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_VideosComponent__WEBPACK_IMPORTED_MODULE_4__["default"], {
      keywords: this.state.keywords,
      globalVideo: this.state.findGlobal,
      perPage: this.props.resultsPerPage,
      channelId: this.state.channelId,
      contentChannelId: this.state.contentChannel.owners
    })));
  }

}

/***/ }),

/***/ "./src/components/PlaylistComponent.js":
/*!*********************************************!*\
  !*** ./src/components/PlaylistComponent.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PlaylistComponent; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldGet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldSet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _libs_apiCall__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../libs/apiCall */ "./src/libs/apiCall.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _libs_pagination__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../libs/pagination */ "./src/libs/pagination.js");
/* harmony import */ var _store_dmSdkStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../store/dmSdkStore */ "./src/store/dmSdkStore.js");
/* harmony import */ var _store_dmVideoStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../store/dmVideoStore */ "./src/store/dmVideoStore.js");
/* harmony import */ var _libs_customEvent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../libs/customEvent */ "./src/libs/customEvent.js");




function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }









/**
 * Playlist Component
 *
 * This component will generate a playlist search results
 */

var _connectionStatus = /*#__PURE__*/new WeakMap();

var _editorMode = /*#__PURE__*/new WeakMap();

var _checkEditorMode = /*#__PURE__*/new WeakSet();

class PlaylistComponent extends _wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Component {
  /**
   * A variable to store a state from the state management
   */

  /**
   *
   * @type {string}
   */
  constructor(props) {
    super(props);

    _classPrivateMethodInitSpec(this, _checkEditorMode);

    _classPrivateFieldInitSpec(this, _connectionStatus, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _editorMode, {
      writable: true,
      value: ''
    });

    this.state = {
      playlists: {},
      currentPage: 1,
      loadingData: true
    };

    (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _editorMode, _classPrivateMethodGet(this, _checkEditorMode, _checkEditorMode2).call(this));

    this.setPlaylist = this.setPlaylist.bind(this);
    this.loadPage = this.loadPage.bind(this);
    this.setLoadingData = this.setLoadingData.bind(this);
  }
  /**
   * Check which editor is active
   *
   * TODO: Should be available on global exist on VideosComponent and SelectedVideoComponent
   *
   * @link for reference how to check which editor in use https://github.com/WordPress/gutenberg/issues/12200
   * @returns {string}
   */


  async addToPost(video) {
    if ((0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_0__["default"])(this, _editorMode) === 'gutenberg') {
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.dispatch)(_store_dmVideoStore__WEBPACK_IMPORTED_MODULE_8__.STORE_KEY).setVideo(video); // Send custom event to catch on VideoBlockComponent to render a new video

      (0,_libs_customEvent__WEBPACK_IMPORTED_MODULE_9__.CreateCustomEvent)('dm-video-updated', 'dm-video-updated');
    } else {
      let attrsString = '';
      attrsString += ' playlistid="' + video.id + '"';
      wp.media.editor.insert('[dm-player' + attrsString + ']');
    }
  }

  async fetchPlaylist() {
    let page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    let keywords = arguments.length > 1 ? arguments[1] : undefined;
    this.setLoadingData(true);
    const dmUser = await (0,_libs_apiCall__WEBPACK_IMPORTED_MODULE_4__.fetchApi)('/dm/v1/userinfo');
    const content = await (0,_libs_apiCall__WEBPACK_IMPORTED_MODULE_4__.fetchApi)('/dm/v1/get-custom-options/manual_embed_content');
    const url = '/playlists';
    const params = {
      limit: this.props.perPage ? this.props.perPage : 10,
      fields: 'id,name,thumbnail_240_url,private',
      page: page,
      sort: 'recent',
      flags: 'verified'
    };

    if (keywords) {
      params.search = keywords;
      params.sort = 'relevance';
    }

    if ((0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_0__["default"])(this, _connectionStatus) && this.props.globalVideo !== true) {
      params.owner = dmUser.channel;
    } else if (!(0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_0__["default"])(this, _connectionStatus) && content.length !== 0) {
      const owner = content.owners.split(',');
      params.owner = owner[0];
    }

    return new Promise(resolve => {
      DM.api(url, 'get', params, playlists => {
        this.setLoadingData(false);
        resolve(playlists);
      }, true);
    }).catch(err => {
      console.log(err);
    });
  }

  async loadPage(page) {
    const playlists = await this.fetchPlaylist(page, this.props.keywords);
    this.setCurrentPage(page);
    this.setPlaylist(playlists);
  }

  async componentDidMount() {
    (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _connectionStatus, (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.select)(_store_dmSdkStore__WEBPACK_IMPORTED_MODULE_7__.STORE_KEY).getConnectionStatus()['connectionStatus']);

    const playlists = await this.fetchPlaylist();
    this.setCurrentPage();
    this.setPlaylist(playlists);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.keywords !== prevProps.keywords || this.props.globalVideo !== prevProps.globalVideo) {
      const playlists = await this.fetchPlaylist(1, this.props.keywords);
      this.setCurrentPage(1);
      this.setPlaylist(playlists);
    }
  }

  setLoadingData(status) {
    this.setState({
      loadingData: status
    });
  }

  setPlaylist(playlists) {
    this.setState({
      playlists: playlists
    });
  }

  setCurrentPage() {
    let page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    this.setState({
      currentPage: page
    });
  }

  renderPlaylists() {
    const playlists = [];

    if (this.state.playlists.error !== undefined) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("li", {
        className: "dm__show-message"
      }, "API errors, to search playlist you must login first\u2026");
    }

    if (this.state.playlists !== undefined && Object.entries(this.state.playlists).length > 0 && this.state.playlists.list.length > 0) {
      const list = this.state.playlists.list;

      for (let i = 0; i < list.length; i++) {
        playlists.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("li", {
          key: list[i],
          className: "content__item"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
          onClick: () => this.addToPost(list[i])
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("figure", {
          className: "content__image-wrapper"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
          className: "content__placement"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("img", {
          src: list[i].thumbnail_240_url,
          alt: list[i].name,
          className: "content__thumbnail"
        }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
          className: "content__title"
        }, list[i].name))));
      }
    } else {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("li", null, "No playlist found\u2026");
    }

    return playlists;
  }

  render() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("ul", {
      className: "dm__search-results"
    }, this.state.loadingData ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('loading playlist…', 'textdomain')) : this.renderPlaylists()), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_libs_pagination__WEBPACK_IMPORTED_MODULE_6__["default"], {
      currentPage: this.state.currentPage,
      callback: this.loadPage,
      contentData: this.state.playlists
    }));
  }

}

function _checkEditorMode2() {
  if (document.body.classList.contains('block-editor-page')) {
    return 'gutenberg';
  }

  return 'classic-editor';
}

/***/ }),

/***/ "./src/components/VideosComponent.js":
/*!*******************************************!*\
  !*** ./src/components/VideosComponent.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ VideosComponent; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldGet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldSet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _libs_apiCall__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../libs/apiCall */ "./src/libs/apiCall.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _libs_pagination__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../libs/pagination */ "./src/libs/pagination.js");
/* harmony import */ var _store_dmSdkStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../store/dmSdkStore */ "./src/store/dmSdkStore.js");
/* harmony import */ var _store_dmVideoStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../store/dmVideoStore */ "./src/store/dmVideoStore.js");
/* harmony import */ var _libs_customEvent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../libs/customEvent */ "./src/libs/customEvent.js");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_10__);




function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }










/**
 * VideosComponent
 *
 * This component will generate a search results
 *
 * Properties (parse via component attributes) available
 * 1. `keywords`
 * 2. `globalVideo`
 * 3. `perPage`
 * 4. `channelId`
 * 5. `contentChannelId`
 *
 */

var _connectionStatus = /*#__PURE__*/new WeakMap();

var _editorMode = /*#__PURE__*/new WeakMap();

var _checkEditorMode = /*#__PURE__*/new WeakSet();

class VideosComponent extends _wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Component {
  /**
   * A variable to store a state from the state management
   */

  /**
   *
   * @type {string}
   */
  constructor(props) {
    super(props);

    _classPrivateMethodInitSpec(this, _checkEditorMode);

    _classPrivateFieldInitSpec(this, _connectionStatus, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _editorMode, {
      writable: true,
      value: ''
    });

    this.state = {
      videos: {},
      currentPage: 1,
      loadingData: true
    };

    (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_1__["default"])(this, _editorMode, _classPrivateMethodGet(this, _checkEditorMode, _checkEditorMode2).call(this));

    this.setVideos = this.setVideos.bind(this);
    this.loadPage = this.loadPage.bind(this);
    this.setLoadingData = this.setLoadingData.bind(this);
  }
  /**
   * Check which editor is active
   *
   * TODO: Should be available on global exist on VideosComponent and SelectedVideoComponent
   *
   * @link for reference how to check which editor in use https://github.com/WordPress/gutenberg/issues/12200
   * @returns {string}
   */


  /**
   * fetchVideo
   *
   * There are several conditions to get the video result
   *
   * 1. User not connected and channel name is empty. It will get current global videos.
   * 2. User not connected and channel name is not empty at least one channel name. It will from all channels defined.
   * 3. User connected and channel name is empty. It will get a connected channel name videos.
   * 4. User connected and channel name is not empty. It will override a channel name using connected channel name.
   * 5. When `find global` ticked, it overrides all channel name defined.
   *
   *
   *
   * @param page page number of the result
   * @param keywords keywords used to get the result
   * @returns {Promise<any>}
   */
  async fetchVideo() {
    let page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    let keywords = arguments.length > 1 ? arguments[1] : undefined;
    this.setLoadingData(true);
    const params = {
      data: {
        fields: 'id,title,thumbnail_240_url,status,private,private_id',
        limit: this.props.perPage ? this.props.perPage : 10,
        flags: 'no_live,exportable,verified',
        page: page
      }
    };

    if (keywords) {
      params.data.sort = 'relevance';
      params.data.search = keywords;
    } else {
      params.data.sort = 'recent';
    }

    const isOwners = typeof this.props.contentChannelId !== 'undefined';

    if ((0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_0__["default"])(this, _connectionStatus) && this.props.globalVideo !== true && !isOwners) {
      params.url = '/user/' + this.props.channelId + '/videos';
    } else if (isOwners && this.props.globalVideo !== true) {
      params.owners = this.props.contentChannelId;
      params.url = '/videos';
    } else {
      params.url = '/videos';
    }

    const videos = await (0,_libs_apiCall__WEBPACK_IMPORTED_MODULE_4__.fetchApi)('/dm/v2/request-api', 'POST', params);
    this.setLoadingData(false);
    return videos; // new Promise(async resolve => {
    //     // DM.Api(url,'get', params, (videos) => {
    //     //     this.setLoadingData(false)
    //     //     resolve(videos)
    //     // }, true)
    //
    //     // console.log(params)
    //
    //     // resolve(videos)
    //     resolve({})
    // }).catch(error => {
    //     console.log('this is error: ', error)
    // })
  }

  setVideos(videos) {
    this.setState({
      videos: videos
    });
  }

  setCurrentPage() {
    let page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    this.setState({
      currentPage: page
    });
  }

  setLoadingData(status) {
    this.setState({
      loadingData: status
    });
  }
  /**
   * addToPost
   *
   * This function will dispatch the data to `core/editor` to save
   * later on when the user save the post. It also sends a custom
   * event for `VideoBlockComponent` to listen that the video is
   * updated.
   *
   * On classic editor, this function will add a shortcode
   *
   * @param video
   */


  async addToPost(video) {
    if ((0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_0__["default"])(this, _editorMode) === 'gutenberg') {
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.dispatch)(_store_dmVideoStore__WEBPACK_IMPORTED_MODULE_8__.STORE_KEY).setVideo(video); // Send custom event to catch on VideoBlockComponent to render a new video

      (0,_libs_customEvent__WEBPACK_IMPORTED_MODULE_9__.CreateCustomEvent)('dm-video-updated', 'dm-video-component');
    } else {
      let attrsString = '';

      if (video.private === true) {
        attrsString += ' privatevideoid="' + video.private_id + '"';
      } else {
        attrsString += ' videoid="' + video.id + '"';
      }

      wp.media.editor.insert('[dm-player' + attrsString + ']');
    }
  }

  async componentDidMount() {
    const videos = await this.fetchVideo();
    this.setVideos(videos);
  }

  async componentDidUpdate(prevProps) {
    // Listen to props changes (keywords and globalVideo)
    if (this.props.keywords !== prevProps.keywords || this.props.globalVideo !== prevProps.globalVideo) {
      const videos = await this.fetchVideo(1, this.props.keywords);
      this.setCurrentPage();
      this.setVideos(videos);
    }
  }

  async loadPage(page) {
    const videos = await this.fetchVideo(page, this.props.keywords);
    this.setCurrentPage(page);
    this.setVideos(videos);
  }

  renderVideoList() {
    const videos = [];

    if (this.state.videos.error !== undefined) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("li", {
        className: "dm__show-message"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("API errors, please check your settings…", "textdomain"));
    }

    if (Object.entries(this.state.videos).length > 0 && this.state.videos.list.length > 0) {
      const list = this.state.videos.list;

      for (let i = 0; i < list.length; i++) {
        videos.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("li", {
          key: list[i],
          className: `content__item ${list[i].private ? "private" : ""} ${list[i].status === 'ready' ? "draft" : ""}`
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
          onClick: () => this.addToPost(list[i]),
          type: "button"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("figure", {
          className: "content__image-wrapper"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
          className: "content__placement"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("img", {
          src: list[i].thumbnail_240_url,
          alt: list[i].title,
          className: "content__thumbnail"
        }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
          className: "content__title",
          title: list[i].title
        }, list[i].title))));
      }
    } else {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("li", null, "No video found\u2026");
    }

    return videos;
  }

  render() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("ul", {
      className: "dm__search-results"
    }, this.state.loadingData ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('loading video…', 'textdomain')) : this.renderVideoList()), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_libs_pagination__WEBPACK_IMPORTED_MODULE_6__["default"], {
      currentPage: this.state.currentPage,
      callback: this.loadPage,
      contentData: this.state.videos
    }));
  }

}

function _checkEditorMode2() {
  if (document.body.classList.contains('block-editor-page')) {
    return 'gutenberg';
  }

  return 'classic-editor';
}

/***/ }),

/***/ "./src/libs/apiCall.js":
/*!*****************************!*\
  !*** ./src/libs/apiCall.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchData": function() { return /* binding */ fetchData; },
/* harmony export */   "fetchApi": function() { return /* binding */ fetchApi; }
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
// Support server-side fetch for tests.
 // This is for test purposes

let fetch = typeof window === 'undefined' ? __webpack_require__(/*! node-fetch */ "./node_modules/node-fetch/browser.js") : window.fetch;
/**
 *
 * @param {string} urlParams
 * @returns {Promise<any>}
 */

function fetchData(urlParams) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch('https://api.dailymotion.com/' + urlParams);
    /**
     * Only HTTP 200 is regarded as successful response
     */

    if (response.status === 200) {
      resolve(response.json());
    } else {
      reject();
    }
  }).catch(err => {
    console.log(err);
  });
}
/**
 * This is actually only an interface for `apiFetch` from WordPress packages.
 * A promise based function to get data from internal WordPress API. So, the
 * caller just receive the data only without doing any promise on their end.
 *
 *
 * references:
 * 1. [Api-fetch](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-api-fetch/)
 *
 * @param {string} url
 * @param {string} method
 * @param data
 * @returns {Promise<any>}
 */

function fetchApi(url) {
  let method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
  let data = arguments.length > 2 ? arguments[2] : undefined;
  const options = {
    path: url,
    method: method
  };

  if (typeof data !== 'undefined') {
    options.data = data;
  } // return new Promise(resolve => {


  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()(options).then(result => {
    return result;
  }).catch(error => {
    console.log(error);
  }); // })
}

/***/ }),

/***/ "./src/libs/customEvent.js":
/*!*********************************!*\
  !*** ./src/libs/customEvent.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateCustomEvent": function() { return /* binding */ CreateCustomEvent; },
/* harmony export */   "RemoveCustomEvent": function() { return /* binding */ RemoveCustomEvent; }
/* harmony export */ });
/**
 * Custom Event Creator
 *
 * A shorthand to create custom events. It includes the event name, the event
 * sender to track from where the event was triggered, and the event data.
 *
 * @param customEventName
 * @param eventSender
 * @param customEventData
 * @constructor
 */
function CreateCustomEvent(customEventName, eventSender, customEventData) {
  var _customEventName, _eventSender, _customEventData;

  customEventName = (_customEventName = customEventName) !== null && _customEventName !== void 0 ? _customEventName : 'customEvent';
  eventSender = (_eventSender = eventSender) !== null && _eventSender !== void 0 ? _eventSender : 'index';
  customEventData = (_customEventData = customEventData) !== null && _customEventData !== void 0 ? _customEventData : {};
  const customEvent = new CustomEvent(customEventName, {
    detail: {
      sender: eventSender,
      customEventData: customEventData
    },
    bubbles: true,
    cancelable: true
  });
  document.dispatchEvent(customEvent);
}
function RemoveCustomEvent(customEventName) {
  document.removeEventListener(customEventName, () => {});
}

/***/ }),

/***/ "./src/libs/dmSdk.js":
/*!***************************!*\
  !*** ./src/libs/dmSdk.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ DmSdk; }
/* harmony export */ });
/* harmony import */ var _waitFor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./waitFor */ "./src/libs/waitFor.js");
/* harmony import */ var _apiCall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apiCall */ "./src/libs/apiCall.js");
/* harmony import */ var _store_dmSdkStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/dmSdkStore */ "./src/store/dmSdkStore.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }





/**
 * This is an SDK of Dailymotion script
 */

var _overrideDmVars = /*#__PURE__*/new WeakSet();

var _initDm = /*#__PURE__*/new WeakSet();

var _subscribeSessionChange = /*#__PURE__*/new WeakSet();

var _getDMLoginStatus = /*#__PURE__*/new WeakSet();

var _setConnectionStatus = /*#__PURE__*/new WeakSet();

class DmSdk {
  constructor() {
    _classPrivateMethodInitSpec(this, _setConnectionStatus);

    _classPrivateMethodInitSpec(this, _getDMLoginStatus);

    _classPrivateMethodInitSpec(this, _subscribeSessionChange);

    _classPrivateMethodInitSpec(this, _initDm);

    _classPrivateMethodInitSpec(this, _overrideDmVars);

    this.setupDm();
  }
  /**
   * Overriding the default function by DM SDK to meet the plugin needs
   *
   */


  async setupDm() {
    // Waiting for DM to be available first
    await (0,_waitFor__WEBPACK_IMPORTED_MODULE_0__.waitFor)(() => typeof DM !== 'undefined', 100, 120000, "Timeout waiting for DM loaded, please refresh and make sure your internet is active");

    _classPrivateMethodGet(this, _overrideDmVars, _overrideDmVars2).call(this);

    await _classPrivateMethodGet(this, _initDm, _initDm2).call(this);

    _classPrivateMethodGet(this, _subscribeSessionChange, _subscribeSessionChange2).call(this);

    await _classPrivateMethodGet(this, _setConnectionStatus, _setConnectionStatus2).call(this);
  }

}

function _overrideDmVars2() {
  // Override default `tokenUrl`, in some cases the tokenUrl is using graphql but in this case we use non-graphql
  DM._oauth.tokenUrl = 'https://api.dailymotion.com/oauth/token'; // Override default `isSessionExpired` to renew the session if it's expired

  DM.Auth.isSessionExpired = (session, sessionLoadingMethod) => {
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

async function _initDm2() {
  // Get Api-key from wp-options using custom end point
  const options = await (0,_apiCall__WEBPACK_IMPORTED_MODULE_1__.fetchApi)('/dm/v1/get-api-key');
  DM.init({
    apiKey: options.api_key,
    apiSecret: options.api_secret,
    status: true,
    cookie: true
  });
}

function _subscribeSessionChange2() {
  DM.Event.subscribe('auth.sessionChange', res => {
    // To keep user logged in in 28 days
    if ((res === null || res === void 0 ? void 0 : res.status) === "connected") {
      let longSession = res.session;

      if (!("expires_in" in res.session)) {
        longSession.expires_in = longSession.expires;
      } // set the cookie expires to 28 days


      longSession.expires = longSession.expires + 3600 * 24 * 28;
      DM.Cookie.set(longSession);
    }
  });
}

function _getDMLoginStatus2() {
  return new Promise(resolve => {
    DM.getLoginStatus(response => {
      if (response.session) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

async function _setConnectionStatus2() {
  const connection = await _classPrivateMethodGet(this, _getDMLoginStatus, _getDMLoginStatus2).call(this);
  /**
   * Dispatching the connection status to the
   */

  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.dispatch)(_store_dmSdkStore__WEBPACK_IMPORTED_MODULE_2__.STORE_KEY).setConnectionStatus({
    connectionStatus: connection
  });
  /**
   * This custom event is to trigger creation of the new
   * sidebar
   *
   * @type {CustomEvent<dmSdkReady>}
   */

  const dmSdkReady = new CustomEvent("dm-sdk-ready");
  document.dispatchEvent(dmSdkReady);
}

/***/ }),

/***/ "./src/libs/pagination.js":
/*!********************************!*\
  !*** ./src/libs/pagination.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ pagination; }
/* harmony export */ });
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
  const {
    contentData,
    currentPage,
    callback
  } = props;
  /**
   * About this empty conditions
   *
   * 1. Of course if there is no data exist it won't show nothing
   * 2. If data exist and the total is 0
   * 3. Different with 2 above, this condition if the result found videos
   *    but only for page 1
   */

  if (Object.entries(contentData).length === 0 || contentData.total === 0 || contentData.has_more === false && contentData.page === 1) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
  }

  if (contentData.page === 1 && contentData.has_more === true) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "button",
      className: "components-button button action dm__next-button",
      onClick: () => callback(currentPage + 1)
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Next', 'textdomain')));
  }

  if (contentData.has_more === false && contentData.page !== 1) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "button",
      className: "components-button button action dm__prev-button",
      onClick: () => callback(currentPage - 1)
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Previous', 'textdomain')));
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "components-button button action dm__prev-button",
    onClick: () => callback(currentPage - 1)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Previous', 'textdomain')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "components-button button action dm__next-button",
    onClick: () => callback(currentPage + 1)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Next', 'textdomain')));
}

/***/ }),

/***/ "./src/libs/waitFor.js":
/*!*****************************!*\
  !*** ./src/libs/waitFor.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "waitFor": function() { return /* binding */ waitFor; },
/* harmony export */   "sleep": function() { return /* binding */ sleep; }
/* harmony export */ });
/**
 *
 * @param {function(): BooleanConstructor} condition - This is a condition needs to be fulfilled
 * @param {number} interval
 * @param {number} timeout
 * @param {string} timeoutMsg
 * @returns {Promise<void>}
 */
async function waitFor() {
  let condition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : () => Boolean;
  let interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
  let timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;
  let timeoutMsg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  return new Promise((resolve, reject) => {
    let elapsedTime = 0;
    const timerId = setInterval(() => {
      const conditionFulfilled = condition();
      const killTimer = elapsedTime > timeout || conditionFulfilled;
      elapsedTime += interval;

      if (conditionFulfilled) {
        resolve("");
        clearInterval(timerId);
      } else if (killTimer) {
        reject(new Error("waitFor(): " + timeoutMsg));
        clearInterval(timerId);
      }
    }, interval);
  });
}
/**
 *
 * @param {number} delay A number of delay you wanted to wait
 * @returns {Promise<void>}
 */

async function sleep(delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("");
    }, delay);
  });
}

/***/ }),

/***/ "./src/store/dmSdkStore.js":
/*!*********************************!*\
  !*** ./src/store/dmSdkStore.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STORE_KEY": function() { return /* binding */ STORE_KEY; }
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);

const STORE_KEY = 'data/dm-sdk';
const DEFAULT_STATE = {
  connectionStatus: null
};
const actions = {
  setConnectionStatus(status) {
    return {
      type: 'SET_CONNECTION_STATUS',
      status
    };
  }

};
const STORE_CONFIG = {
  reducer() {
    let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
    let action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'SET_CONNECTION_STATUS':
        return {
          connectionStatus: action.status
        };
    }

    return state;
  },

  actions,
  selectors: {
    getConnectionStatus(state) {
      return state.connectionStatus;
    }

  }
};
const dmSdkStore = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)(STORE_KEY, STORE_CONFIG);
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(dmSdkStore);

/***/ }),

/***/ "./src/store/dmVideoStore.js":
/*!***********************************!*\
  !*** ./src/store/dmVideoStore.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STORE_KEY": function() { return /* binding */ STORE_KEY; }
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);

const STORE_KEY = 'data/dm-video';
const DEFAULT_STATE = {
  id: "",
  private: false,
  private_id: "",
  status: "",
  thumbnail_240_url: "",
  title: "",
  name: ""
};
const actions = {
  setVideo(videoData) {
    return {
      type: 'SET_VIDEO',
      videoData
    };
  }

};
const STORE_CONFIG = {
  reducer() {
    let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
    let action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'SET_VIDEO':
        return {
          videoData: action.videoData
        };

      default:
        return state;
    }
  },

  actions,
  selectors: {
    getVideoData(state) {
      return state.videoData;
    }

  }
};
const dmVideoStore = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)(STORE_KEY, STORE_CONFIG);
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(dmVideoStore);

/***/ }),

/***/ "./node_modules/node-fetch/browser.js":
/*!********************************************!*\
  !*** ./node_modules/node-fetch/browser.js ***!
  \********************************************/
/***/ (function(module, exports) {



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
	exports["default"] = global.fetch.bind(global);
}

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/components/build-style/style.css":
/*!*********************************************************!*\
  !*** external ["wp","components/buildStyle/style.css"] ***!
  \*********************************************************/
/***/ (function(module) {

module.exports = window["wp"]["components/buildStyle/style.css"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorGet.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorGet.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _classApplyDescriptorGet; }
/* harmony export */ });
function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorSet.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorSet.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _classApplyDescriptorSet; }
/* harmony export */ });
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

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classExtractFieldDescriptor.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classExtractFieldDescriptor.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _classExtractFieldDescriptor; }
/* harmony export */ });
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }

  return privateMap.get(receiver);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _classPrivateFieldGet; }
/* harmony export */ });
/* harmony import */ var _classApplyDescriptorGet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classApplyDescriptorGet.js */ "./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorGet.js");
/* harmony import */ var _classExtractFieldDescriptor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classExtractFieldDescriptor.js */ "./node_modules/@babel/runtime/helpers/esm/classExtractFieldDescriptor.js");


function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = (0,_classExtractFieldDescriptor_js__WEBPACK_IMPORTED_MODULE_1__["default"])(receiver, privateMap, "get");
  return (0,_classApplyDescriptorGet_js__WEBPACK_IMPORTED_MODULE_0__["default"])(receiver, descriptor);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _classPrivateFieldSet; }
/* harmony export */ });
/* harmony import */ var _classApplyDescriptorSet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classApplyDescriptorSet.js */ "./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorSet.js");
/* harmony import */ var _classExtractFieldDescriptor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classExtractFieldDescriptor.js */ "./node_modules/@babel/runtime/helpers/esm/classExtractFieldDescriptor.js");


function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = (0,_classExtractFieldDescriptor_js__WEBPACK_IMPORTED_MODULE_1__["default"])(receiver, privateMap, "set");
  (0,_classApplyDescriptorSet_js__WEBPACK_IMPORTED_MODULE_0__["default"])(receiver, descriptor, value);
  return value;
}

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!******************************!*\
  !*** ./src/classic-index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_ContentFinderComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/ContentFinderComponent */ "./src/components/ContentFinderComponent.js");
/* harmony import */ var _libs_dmSdk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./libs/dmSdk */ "./src/libs/dmSdk.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components_build_style_style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components/build-style/style.css */ "@wordpress/components/build-style/style.css");
/* harmony import */ var _wordpress_components_build_style_style_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components_build_style_style_css__WEBPACK_IMPORTED_MODULE_4__);







const MyModal = () => {
  const [isOpen, setIsOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: "button",
    id: "insert-dailymotion",
    type: "button",
    onClick: () => setIsOpen(true)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    role: "img",
    "aria-hidden": "true",
    focusable: "false",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    className: "path",
    d: "m12.1479 18.5957c-2.4949 0-4.28131-1.7558-4.28131-4.0658 0-2.2176 1.78641-4.0965 4.09651-4.0965 2.2793 0 4.0349 1.7864 4.0349 4.1581 0 2.2794-1.7556 4.0042-3.8501 4.0042zm8.3521-18.5957-4.5329 1v7c-1.1088-1.41691-2.8028-1.8787-4.8049-1.8787-2.09443 0-3.97329.76993-5.5133 2.27917-1.72483 1.66323-2.6489 3.78863-2.6489 6.16033 0 2.5873.98562 4.8049 2.89526 6.499 1.44763 1.2936 3.17251 1.9402 5.17454 1.9402 1.9713 0 3.4498-.5236 4.8973-1.9402v1.9402h4.5329c0-7.6359 0-15.3641 0-23z",
    fill: "#2271b1"
  })), "Dailymotion"), isOpen && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Modal, {
    className: "popup__content-finder",
    title: "Find a Video",
    onRequestClose: () => setIsOpen(false)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ContentFinderComponent__WEBPACK_IMPORTED_MODULE_1__["default"], {
    resultsPerPage: 12
  })));
};

document.addEventListener('dm-sdk-ready', () => {
  // Hook modal button to editor tools
  const wpEditorTools = document.getElementById('wp-content-editor-tools');
  const placeHolder = document.createElement('span');
  placeHolder.id = 'dm-search-classic';
  wpEditorTools.appendChild(placeHolder);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MyModal), document.getElementById('dm-search-classic'));
});
new _libs_dmSdk__WEBPACK_IMPORTED_MODULE_2__["default"]();
}();
/******/ })()
;
//# sourceMappingURL=classic-index.js.map