!function(){"use strict";var t={300:function(t,e){var i=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==i)return i;throw new Error("unable to locate global object")}();t.exports=e=i.fetch,i.fetch&&(e.default=i.fetch.bind(i)),e.Headers=i.Headers,e.Request=i.Request,e.Response=i.Response}},e={};function i(s){var a=e[s];if(void 0!==a)return a.exports;var n=e[s]={exports:{}};return t[s](n,n.exports,i),n.exports}i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,{a:e}),e},i.d=function(t,e){for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){var t=window.wp.element,e=window.wp.blocks,s=window.wp.data,a=window.wp.i18n,n=window.wp.apiFetch,o=i.n(n);function r(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",i=arguments.length>2?arguments[2]:void 0;const s={path:t,method:e};return void 0!==i&&(s.data=i),new Promise((t=>{o()(s).then((e=>{t(e)}))}))}function l(){return l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])}return t},l.apply(this,arguments)}function d(t,e,i){if(!e.has(t))throw new TypeError("attempted to "+i+" private field on non-instance");return e.get(t)}function c(t,e,i){return function(t,e,i){if(e.set)e.set.call(t,i);else{if(!e.writable)throw new TypeError("attempted to set read only private field");e.value=i}}(t,d(t,e,"set"),i),i}function h(t,e){return function(t,e){return e.get?e.get.call(t):e.value}(t,d(t,e,"get"))}"undefined"==typeof window?i(300):window.fetch;var u=new WeakMap;class m extends t.Component{constructor(t){var e,i;super(t),function(t,e,i){!function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}(t,e),e.set(t,i)}(this,u,{writable:!0,value:void 0}),i=void 0,(e="dmPlayerAttributes")in this?Object.defineProperty(this,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):this[e]=i,this.subscribes(),this.state={videoId:"",privateVideoId:"",playlistId:""}}subscribes(){document.addEventListener("dm-video-updated",(t=>{this.setAttr()}))}countBlocks(){let t;const e=(0,s.select)("core/editor").getBlocks();if(0!==e.length)for(let i=0;i<e.length;i++)"dm-settings/click-embed"===e[i].name&&(t=i);return t}updatePosition(){const t=this.countBlocks();h(this,u)!==t&&(c(this,u,t),(0,s.dispatch)("core/editor").editPost({meta:{_dm_player_position:t}}))}getVideo(){const t=(0,s.select)("core/editor").getEditedPostAttribute("meta")._dm_video_data;return""!==t?JSON.parse(t):null}openSidebar(){document.querySelector('button[aria-label="Dailymotion Sidebar Settings"]').click()}setAttr(){const t=this.getVideo();null!==t&&(this.setState({videoId:!0!==t.private?t.id:null,privateVideoId:!0===t.private?t.private_id:null,playlistId:void 0!==t.name?t.id:null}),window.dmce.rebuild())}async componentDidMount(){this.dmPlayerAttributes=await r("/dm/v1/get-custom-options/manual_embed_player"),this.setAttr()}componentWillUnmount(){(0,s.dispatch)("core/editor").editPost({meta:{_dm_player_position:-1}})}generateVideoContainer(e){return null!==this.state.playlistId?(0,t.createElement)("div",l({className:"dm-player",playlistId:this.state.playlistId,playerId:"x1ozy"},e)):null!==this.state.privateVideoId?(0,t.createElement)("div",l({className:"dm-player",privateVideoId:this.state.privateVideoId,playerId:"x1ozy"},e)):(0,t.createElement)("div",l({className:"dm-player",videoId:this.state.videoId,playerId:"x1ozy"},e))}render(){if(this.updatePosition(),""===this.state.videoId||void 0===this.state.videoId)return(0,t.createElement)("div",{className:"dm-player__editor"},(0,t.createElement)("p",null,"No video selected, please select by click button below"),(0,t.createElement)("button",{onClick:this.openSidebar},"Find a video"));let e={};return this.dmPlayerAttributes&&(void 0!==this.dmPlayerAttributes.pre_video_title&&""!==this.dmPlayerAttributes.pre_video_title&&(e.preVideoTitle=this.dmPlayerAttributes.pre_video_title),"1"===this.dmPlayerAttributes.show_info_card&&(e.showInfocard="true"),"1"===this.dmPlayerAttributes.show_video_title&&(e.showVideoTitle="true"),"1"===this.dmPlayerAttributes.show_carousel_playlist&&(e.showOutsidePlaylist="true")),(0,t.createElement)("div",{className:"dm-player__holder"},(0,t.createElement)("p",{className:"dm-player__holder--title"},(0,t.createElement)("span",{className:"dashicons dashicons-edit-large"})," Dailymotion Player"),this.generateVideoContainer(e))}}var p=window.wp.plugins,g=window.wp.editPost;function v(){return(0,t.createElement)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",role:"img","aria-hidden":"true",focusable:"false"},(0,t.createElement)("path",{class:"path",d:"m12.1479 18.5957c-2.4949 0-4.28131-1.7558-4.28131-4.0658 0-2.2176 1.78641-4.0965 4.09651-4.0965 2.2793 0 4.0349 1.7864 4.0349 4.1581 0 2.2794-1.7556 4.0042-3.8501 4.0042zm8.3521-18.5957-4.5329 1v7c-1.1088-1.41691-2.8028-1.8787-4.8049-1.8787-2.09443 0-3.97329.76993-5.5133 2.27917-1.72483 1.66323-2.6489 3.78863-2.6489 6.16033 0 2.5873.98562 4.8049 2.89526 6.499 1.44763 1.2936 3.17251 1.9402 5.17454 1.9402 1.9713 0 3.4498-.5236 4.8973-1.9402v1.9402h4.5329c0-7.6359 0-15.3641 0-23z",fill:"#333436"}))}const b="data/dm-sdk",y={connectionStatus:null},w={reducer(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,e=arguments.length>1?arguments[1]:void 0;return"SET_CONNECTION_STATUS"===e.type?{connectionStatus:e.status}:t},actions:{setConnectionStatus:t=>({type:"SET_CONNECTION_STATUS",status:t})},selectors:{getConnectionStatus:t=>t.connectionStatus}},_=(0,s.createReduxStore)(b,w);function f(t,e){!function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}(t,e),e.add(t)}function E(t,e,i){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return i}(0,s.register)(_);var P=new WeakSet,k=new WeakSet,S=new WeakSet,D=new WeakSet,C=new WeakSet;class N{constructor(){f(this,C),f(this,D),f(this,S),f(this,k),f(this,P),this.setupDm()}async setupDm(){await async function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:()=>Boolean,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:50,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1/0,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";return new Promise(((a,n)=>{let o=0;const r=setInterval((()=>{const l=t(),d=o>i||l;o+=e,l?(a(""),clearInterval(r)):d&&(n(new Error("waitFor(): "+s)),clearInterval(r))}),e)}))}((()=>"undefined"!=typeof DM),100,3e4,"Timeout waiting for DM loaded, please refresh and make sure your internet is active"),E(this,P,V).call(this),await E(this,k,x).call(this),E(this,S,I).call(this),await E(this,C,T).call(this)}}function V(){DM._oauth.tokenUrl="https://api.dailymotion.com/oauth/token",DM.Auth.isSessionExpired=(t,e)=>(void 0===t&&(t=DM._session),!t||!(t&&"expires_in"in t&&(new Date).getTime()<1e3*parseInt(t.expires_in,10))&&(delete t.expires_in,!0))}async function x(){const t=await r("/dm/v1/get-api-key");DM.init({apiKey:t.api_key,apiSecret:t.api_secret,status:!0,cookie:!0})}function I(){DM.Event.subscribe("auth.sessionChange",(t=>{if("connected"===(null==t?void 0:t.status)){let e=t.session;"expires_in"in t.session||(e.expires_in=e.expires),e.expires=e.expires+2419200,DM.Cookie.set(e)}}))}function M(){return new Promise((t=>{DM.getLoginStatus((e=>{e.session?t(!0):t(!1)}))}))}async function T(){const t=await E(this,D,M).call(this);(0,s.dispatch)(b).setConnectionStatus({connectionStatus:t});const e=new CustomEvent("dm-sdk-ready");document.dispatchEvent(e)}var L=window.wp.components;function F(e){const{contentData:i,currentPage:s,callback:n}=e;return 0===Object.entries(i).length||0===i.total||!1===i.has_more&&1===i.page?(0,t.createElement)(t.Fragment,null):1===i.page&&!0===i.has_more?(0,t.createElement)(t.Fragment,null,(0,t.createElement)("button",{type:"button",className:"components-button button action dm__next-button",onClick:()=>n(s+1)},(0,a.__)("Next","textdomain"))):!1===i.has_more&&1!==i.page?(0,t.createElement)(t.Fragment,null,(0,t.createElement)("button",{type:"button",className:"components-button button action dm__prev-button",onClick:()=>n(s-1)},(0,a.__)("Previous","textdomain"))):(0,t.createElement)(t.Fragment,null,(0,t.createElement)("button",{type:"button",className:"components-button button action dm__prev-button",onClick:()=>n(s-1)},(0,a.__)("Previous","textdomain")),(0,t.createElement)("button",{type:"button",className:"components-button button action dm__next-button",onClick:()=>n(s+1)},(0,a.__)("Next","textdomain")))}function O(t,e,i){A(t,e),e.set(t,i)}function A(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}var W=new WeakMap,j=new WeakMap,z=new WeakSet;class B extends t.Component{constructor(t){var e;super(t),A(this,e=z),e.add(this),O(this,W,{writable:!0,value:null}),O(this,j,{writable:!0,value:""}),this.state={videos:{},currentPage:1,loadingData:!0},c(this,j,function(t,e,i){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return i}(this,z,G).call(this)),this.setVideos=this.setVideos.bind(this),this.loadPage=this.loadPage.bind(this),this.setLoadingData=this.setLoadingData.bind(this)}async fetchVideo(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=arguments.length>1?arguments[1]:void 0;this.setLoadingData(!0);const i=await r("/dm/v1/userinfo"),s=await r("/dm/v1/get-custom-options/manual_embed_content"),a={fields:"id,title,thumbnail_240_url,status,private,private_id",limit:this.props.perPage?this.props.perPage:10,flags:"no_live,exportable,verified",page:t};e?(a.sort="relevance",a.search=e):a.sort="recent";let n="";const o=void 0!==s.owners;return h(this,W)&&!0!==this.props.globalVideo&&!o?n="user/"+i.channel+"/videos":o&&!0!==this.props.globalVideo?(a.owners=s.owners,n="videos"):n="videos",new Promise((async t=>{DM.api(n,a,(e=>{this.setLoadingData(!1),t(e)}))})).catch((t=>{console.log(t)}))}setVideos(t){this.setState({videos:t})}setCurrentPage(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.setState({currentPage:t})}setLoadingData(t){this.setState({loadingData:t})}async addToPost(t){if("gutenberg"===h(this,j)){(0,s.dispatch)("core/editor").editPost({meta:{_dm_video_data:JSON.stringify(t)}});const e=new CustomEvent("dm-video-updated");document.dispatchEvent(e)}else{let e="";!0===t.private?e+=' privatevideoid="'+t.private_id+'"':e+=' videoid="'+t.id+'"',wp.media.editor.insert("[dm-player"+e+"]")}}async componentDidMount(){c(this,W,(0,s.select)(b).getConnectionStatus().connectionStatus);const t=await this.fetchVideo();this.setVideos(t)}async componentDidUpdate(t){if(this.props.keywords!==t.keywords||this.props.globalVideo!==t.globalVideo){const t=await this.fetchVideo(1,this.props.keywords);this.setCurrentPage(),this.setVideos(t)}}async loadPage(t){const e=await this.fetchVideo(t,this.props.keywords);this.setCurrentPage(t),this.setVideos(e)}renderVideoList(){const e=[];if(void 0!==this.state.videos.error)return(0,t.createElement)("li",{className:"dm__show-message"},"API errors, please check your settings…");if(!(void 0!==this.state.videos&&Object.entries(this.state.videos).length>0&&this.state.videos.list.length>0))return(0,t.createElement)("li",null,"No video found…");{const i=this.state.videos.list;for(let s=0;s<i.length;s++)e.push((0,t.createElement)("li",{key:i[s],className:`content__item ${i[s].private?"private":""} ${"ready"===i[s].status?"draft":""}`},(0,t.createElement)("button",{onClick:()=>this.addToPost(i[s]),type:"button"},(0,t.createElement)("figure",{className:"content__image-wrapper"},(0,t.createElement)("div",{className:"content__placement"},(0,t.createElement)("img",{src:i[s].thumbnail_240_url,alt:i[s].title,className:"content__thumbnail"}))),(0,t.createElement)("span",{className:"content__title",title:i[s].title},i[s].title))))}return e}render(){return(0,t.createElement)(t.Fragment,null,(0,t.createElement)("ul",{className:"dm__search-results"},this.state.loadingData?(0,t.createElement)("li",null,(0,a.__)("loading video…","textdomain")):this.renderVideoList()),(0,t.createElement)(F,{currentPage:this.state.currentPage,callback:this.loadPage,contentData:this.state.videos}))}}function G(){return document.body.classList.contains("block-editor-page")?"gutenberg":"classic-editor"}function J(t,e,i){U(t,e),e.set(t,i)}function U(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}var K=new WeakMap,R=new WeakMap,Z=new WeakSet;class q extends t.Component{constructor(t){var e;super(t),U(this,e=Z),e.add(this),J(this,K,{writable:!0,value:null}),J(this,R,{writable:!0,value:""}),this.state={playlists:{},currentPage:1,loadingData:!0},c(this,R,function(t,e,i){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return i}(this,Z,H).call(this)),this.setPlaylist=this.setPlaylist.bind(this),this.loadPage=this.loadPage.bind(this),this.setLoadingData=this.setLoadingData.bind(this)}async addToPost(t){if("gutenberg"===h(this,R)){(0,s.dispatch)("core/editor").editPost({meta:{_dm_video_data:JSON.stringify(t)}});const e=new CustomEvent("dm-video-updated");document.dispatchEvent(e)}else{let e="";e+=' playlistid="'+t.id+'"',wp.media.editor.insert("[dm-player"+e+"]")}}async fetchPlaylist(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=arguments.length>1?arguments[1]:void 0;this.setLoadingData(!0);const i=await r("/dm/v1/userinfo"),s=await r("/dm/v1/get-custom-options/manual_embed_content"),a={limit:this.props.perPage?this.props.perPage:10,fields:"id,name,thumbnail_240_url,private",page:t,sort:"recent",flags:"verified"};if(e&&(a.search=e,a.sort="relevance"),h(this,K)&&!0!==this.props.globalVideo)a.owner=i.channel;else if(!h(this,K)&&!1!==s){const t=s.owners.split(",");a.owner=t[0]}return new Promise((t=>{DM.api("/playlists",a,(e=>{this.setLoadingData(!1),t(e)}))})).catch((t=>{console.log(t)}))}async loadPage(t){const e=await this.fetchPlaylist(t,this.props.keywords);this.setCurrentPage(t),this.setPlaylist(e)}async componentDidMount(){c(this,K,(0,s.select)(b).getConnectionStatus().connectionStatus);const t=await this.fetchPlaylist();this.setCurrentPage(),this.setPlaylist(t)}async componentDidUpdate(t){if(this.props.keywords!==t.keywords||this.props.globalVideo!==t.globalVideo){const t=await this.fetchPlaylist(1,this.props.keywords);this.setCurrentPage(1),this.setPlaylist(t)}}setLoadingData(t){this.setState({loadingData:t})}setPlaylist(t){this.setState({playlists:t})}setCurrentPage(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.setState({currentPage:t})}renderPlaylists(){const e=[];if(void 0!==this.state.playlists.error)return(0,t.createElement)("li",{className:"dm__show-message"},"API errors, to search playlist you must login first…");if(!(void 0!==this.state.playlists&&Object.entries(this.state.playlists).length>0&&this.state.playlists.list.length>0))return(0,t.createElement)("li",null,"No playlist found…");{const i=this.state.playlists.list;for(let s=0;s<i.length;s++)e.push((0,t.createElement)("li",{key:i[s],className:"content__item"},(0,t.createElement)("button",{onClick:()=>this.addToPost(i[s])},(0,t.createElement)("figure",{className:"content__image-wrapper"},(0,t.createElement)("div",{className:"content__placement"},(0,t.createElement)("img",{src:i[s].thumbnail_240_url,alt:i[s].name,className:"content__thumbnail"}))),(0,t.createElement)("span",{className:"content__title"},i[s].name))))}return e}render(){return(0,t.createElement)(t.Fragment,null,(0,t.createElement)("ul",{className:"dm__search-results"},this.state.loadingData?(0,t.createElement)("li",null,(0,a.__)("loading playlist…","textdomain")):this.renderPlaylists()),(0,t.createElement)(F,{currentPage:this.state.currentPage,callback:this.loadPage,contentData:this.state.playlists}))}}function H(){return document.body.classList.contains("block-editor-page")?"gutenberg":"classic-editor"}var Y=new WeakMap;class $ extends t.Component{constructor(t){var e,i,s;super(t),s={writable:!0,value:null},function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}(e=this,i=Y),i.set(e,s),this.state={playlists:{},keywords:"",currentPage:1,findGlobal:!1,findPlaylist:!1},this.findVideo=this.findVideo.bind(this),this.setKeywords=this.setKeywords.bind(this),this.setGlobalVideo=this.setGlobalVideo.bind(this),this.setFindPlaylist=this.setFindPlaylist.bind(this)}async setConnectionStatus(e){let i;i=e?(0,t.createElement)(t.Fragment,null,(0,t.createElement)("span",{className:"dm--connected"})," ",(0,a.__)("You're connected","textdomain")):(0,t.createElement)(t.Fragment,null,(0,t.createElement)("span",{className:"dm--disconnected"})," ",(0,a.__)("You're not connected","textdomain")),this.setState({connectionStatus:i})}componentDidMount(){c(this,Y,(0,s.select)(b).getConnectionStatus().connectionStatus),this.setConnectionStatus(h(this,Y))}async findVideo(t){t.preventDefault()}setKeywords(t){this.setState({keywords:t.target.value})}setGlobalVideo(t){this.setState({findGlobal:!0===t.target.checked})}setFindPlaylist(t){this.setState({findPlaylist:!0===t.target.checked})}render(){return(0,t.createElement)(L.PanelBody,null,(0,t.createElement)("div",{className:"dm__content-list"},(0,t.createElement)("p",null,this.state.connectionStatus),(0,t.createElement)("form",{onSubmit:this.findVideo},(0,t.createElement)("label",{htmlFor:"keywords"},(0,a.__)("Find a video","textdomain")),(0,t.createElement)("input",{id:"keywords",onChange:this.setKeywords,type:"text",name:"keywords",className:"dm__keywords-input"}),(0,t.createElement)("button",{type:"submit",className:"action button"},"Find"),(0,t.createElement)("label",{htmlFor:"global-video",className:"checkbox-label"},(0,t.createElement)("input",{type:"checkbox",id:"global-video",onChange:this.setGlobalVideo,name:"globalVideo",value:"1"})," ",(0,a.__)("Find global","textdomain")),(0,t.createElement)("label",{htmlFor:"find-playlist",className:"checkbox-label"},(0,t.createElement)("input",{type:"checkbox",id:"find-playlist",onChange:this.setFindPlaylist,name:"findPlaylist",value:"1"})," ",(0,a.__)("Find playlist","textdomain"))),this.state.findPlaylist?(0,t.createElement)(q,{keywords:this.state.keywords,globalVideo:this.state.findGlobal,perPage:this.props.resultsPerPage}):(0,t.createElement)(B,{keywords:this.state.keywords,globalVideo:this.state.findGlobal,perPage:this.props.resultsPerPage})))}}function Q(t,e,i){X(t,e),e.set(t,i)}function X(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}var tt=new WeakMap,et=new WeakMap,it=new WeakSet;class st extends t.Component{constructor(t){var e;super(t),X(this,e=it),e.add(this),Q(this,tt,{writable:!0,value:{title:"",thumbnail_240_url:"",id:""}}),Q(this,et,{writable:!0,value:""}),this.state={videoData:h(this,tt)},c(this,et,function(t,e,i){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return i}(this,it,at).call(this)),this.getContent=this.getContent.bind(this),this.showImage=this.showImage.bind(this),this.subscribes()}componentDidMount(){this.setVideo()}async getContent(){if("gutenberg"===h(this,et))return(0,s.select)("core/editor").getEditedPostAttribute("meta")._dm_video_data;{const t=await r("/dm/v1/custom-post-meta/","POST",{post_id:postId,meta_name:"_dm_video_data"});let e=JSON.parse(t);return document.getElementById("dm_video_data").setAttribute("value",JSON.stringify(e)),t}}async setVideo(){const t=await this.getContent();this.setState({videoData:""===t?h(this,tt):JSON.parse(t)})}subscribes(){"gutenberg"===h(this,et)?(0,s.subscribe)((t=>{this.setVideo()})):document.addEventListener("dm-video-updated",(t=>{this.setState({videoData:t.detail.videoData})}))}showImage(){return""!==this.state.videoData.title||""!==this.state.videoData.name?(0,t.createElement)("div",{className:"selected-video"},(0,t.createElement)("h3",null,"Selected video"),(0,t.createElement)("figure",{className:"content__image-wrapper"},(0,t.createElement)("div",{className:"content__placement"},(0,t.createElement)("img",{src:this.state.videoData.thumbnail_240_url,alt:this.state.videoData.title?this.state.videoData.title:this.state.videoData.name,className:"content__thumbnail"}))),(0,t.createElement)("span",{className:"content__title",title:this.state.videoData.title?this.state.videoData.title:this.state.videoData.name},this.state.videoData.title?this.state.videoData.title:this.state.videoData.name)):(0,t.createElement)("p",null,"No video selected.")}render(){return(0,t.createElement)(L.PanelBody,null,this.showImage)}}function at(){return document.body.classList.contains("block-editor-page")?"gutenberg":"classic-editor"}(0,e.registerBlockType)("dm-settings/click-embed",{title:(0,a.__)("Dailymotion Embed"),icon:(0,t.createElement)("svg",{width:"16",height:"10",viewBox:"0 0 16 10",fill:"none",xmlns:"http://www.w3.org/2000/svg"},(0,t.createElement)("path",{d:"M7.65916 7.27658C6.6612 7.27658 5.94664 6.58953 5.94664 5.68561C5.94664 4.81786 6.6612 4.08263 7.58524 4.08263C8.49696 4.08263 9.1992 4.78166 9.1992 5.70972C9.1992 6.60166 8.49696 7.27658 7.65916 7.27658V7.27658ZM11 0L9.18684 0.391304V3.13043C8.74332 2.57599 8.06572 2.39529 7.26488 2.39529C6.42711 2.39529 5.67556 2.69657 5.05956 3.28714C4.36963 3.93797 4 4.76965 4 5.6977C4 6.71013 4.39425 7.57788 5.1581 8.24079C5.73716 8.74698 6.42711 9 7.22792 9C8.01644 9 8.60784 8.79511 9.18684 8.24079V9H11C11 6.01204 11 2.98796 11 0Z",fill:"#000"}),(0,t.createElement)("path",{d:"M0.902344 5.79883L3.04199 6.66357V7.3335L0.246094 6.03809V5.53906L3.04199 4.24707V4.91699L0.902344 5.79883Z",fill:"#000"}),(0,t.createElement)("path",{d:"M14.7173 5.77832L12.458 4.89307V4.24365L15.377 5.53564V6.03467L12.458 7.33008V6.67383L14.7173 5.77832Z",fill:"#000"})),category:"embed",keywords:[(0,a.__)("Dailymotion"),(0,a.__)("Embed")],attributes:{videoData:{type:"object",default:{id:"",private:!1,private_id:"",status:"",thumbnail_240_url:"",title:""}}},edit:m,save:async t=>{const e=(0,s.select)("core/editor").getBlocks();if(0!==e.length)for(let t=0;t<e.length;t++)"dm-settings/click-embed"===e[t].name&&dispatch("core/editor").editPost({meta:{_dm_player_position:t}});return null}}),new class{constructor(){this.setupDm()}setupDm(){document.addEventListener("dm-sdk-ready",(()=>{this.registerSidebar()})),new N}registerSidebar(){(0,p.registerPlugin)("dm-sidebar-settings",{render:()=>(0,t.createElement)(t.Fragment,null,(0,t.createElement)(g.PluginSidebarMoreMenuItem,{target:"dm-sidebar-settings",icon:v()},(0,a.__)("Dailymotion Sidebar Settings","textdomain")),(0,t.createElement)(g.PluginSidebar,{name:"dm-sidebar-settings",title:(0,a.__)("Dailymotion Sidebar Settings","textdomain"),icon:v()},(0,t.createElement)(st,null),(0,t.createElement)($,null)))})}}}()}();