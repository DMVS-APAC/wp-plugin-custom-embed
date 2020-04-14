// Libraries
// import { waitFor } from '../utilities/wait-for';

// Interfaces
import infPlayer from './interfaces/infPlayer';
import infSearch from "./interfaces/infSearch";
import infVideo from "./interfaces/infVideo";

// Reserve DM variable for future purposes
// declare const DM: any;

declare global {
    interface Window {
        WDMObject: any;
        cpe: any;
    }
}

export default class DmPlayer {
    private rootEls: NodeListOf<HTMLDivElement> = null;
    private playerParams: infPlayer = null;
    private searchParams: infSearch = null;
    private videoParams: infVideo = null;

    // Events
    private apiReady: Event;
    private playerExtracted: Event;
    private searchParamsReady: Event;

    public constructor(rootEls: NodeListOf<HTMLDivElement>) {
        this.rootEls = rootEls;

        this.addEventListeners();
        this.registerNewEvents();
        this.extractAttrs();
    }

    private addEventListeners() {
        const self = this;

        document.addEventListener('dm-api-ready', ( e) => {
            self.loadDmPlayer();
        });

        document.addEventListener('dm-player-extracted', (e) => {
            self.prepareSearchParams();
        });

        document.addEventListener( 'dm-search-params-ready', (e) => {
            self.searchVideo();
        });
    }

    private registerNewEvents() {

        // listen to api to be ready
        this.apiReady = new Event('dm-api-ready');

        // listen to extract player attribute to be extracted
        this.playerExtracted = new Event('dm-player-extracted');

        // listen to search params to be ready
        this.searchParamsReady = new Event('dm-search-params-ready');
    }

    private extractAttrs() {
        const rootEl = this.rootEls[0];

        this.playerParams = {
            maxWordSearch: rootEl.getAttribute('maxWordSearch') ? Number(rootEl.getAttribute('maxWordSearch')) : 15,
            minWordLength: rootEl.getAttribute('minWordLength') ? Number(rootEl.getAttribute('minWordLength')) : 4,
            minWordSearch: rootEl.getAttribute('minWordSearch') ? Number(rootEl.getAttribute('minWordSearch')) : 2,
            language: rootEl.getAttribute("language") ? rootEl.getAttribute("language") : "",
            sort:  rootEl.getAttribute("sort") ? rootEl.getAttribute("sort") : "recent",
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
    }

    private prepareSearchParams() {
        const keywords = this.findKeywords(this.playerParams.keywordsSelector);
        this.searchParams = {
            fields: 'id,title',
            limit: 1,
            sort: this.playerParams.sort,
            search: keywords ? keywords.sort((a, b) => b.length - a.length).slice(0, this.playerParams.maxWordSearch).join(' ') : "",
            language: this.playerParams.language ? this.playerParams.language : ''
        };

        if (!this.playerParams.searchInPlaylist) {

            this.searchParams.private = 0;
            this.searchParams.flags = "no_live,exportable" + (this.playerParams.owners.length > 0 ? "": ",verified");
            this.searchParams.longer_than = 0.35; //21sec

            if (this.playerParams.owners) this.searchParams.owners = this.playerParams.owners;

            if (this.playerParams.category) this.searchParams.channel = this.playerParams.category;

            if (this.playerParams.excludeIds) this.searchParams.exclude_ids = this.playerParams.excludeIds;
        }

        if (this.playerParams.language) this.searchParams.language = this.playerParams.language;

        // Tell the event listener that search params is ready
        document.dispatchEvent(this.searchParamsReady);

    }

    private htmlEntities(str) {
        return String(str).replace(/&/g, '%26').replace(/=/g, '%3d');
    }

    private loadDmPlayer() {
        const rootEl = this.rootEls[0];
        let cpeEmbed = document.createElement("div");

        let queryString = "";

        if (this.playerParams.adsParams === "") {
            queryString += "ads_params=contextual";
        } else {
            queryString += "ads_params=" + this.htmlEntities(this.playerParams.adsParams);
        }

        if (this.playerParams.syndication !== "") queryString += "&syndication=" + this.playerParams.syndication;

        if (this.playerParams.controls !== true) queryString += "&controls=" + this.playerParams.controls;

        cpeEmbed.setAttribute("class", "dailymotion-cpe");
        cpeEmbed.setAttribute("video-id", this.videoParams.id);
        cpeEmbed.setAttribute("query-string", queryString);

        if(rootEl.getAttribute("width") !== null){
            this.playerParams.width = Number(rootEl.getAttribute("width"));
            cpeEmbed.setAttribute("width", rootEl.getAttribute("width"));
        }

        if(rootEl.getAttribute("height") !== null){
            this.playerParams.height = Number(rootEl.getAttribute("height"));
            cpeEmbed.setAttribute("height", rootEl.getAttribute("height"));
        }

        let cpeId = this.playerParams.cpeId[0];

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
            cpeId = this.playerParams.cpeId[1] ? this.playerParams.cpeId[1] : this.playerParams.cpeId[0];

        // Avoid error while building
        const date: any = new Date();

        // Append the element to the root player element
        rootEl.appendChild(cpeEmbed);

        // Load the script
        (function(w,d,s,u,n,i,f,g,e,c){w.WDMObject=n;w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments);};w[n].l=1*date;w[n].i=i;w[n].f=f;w[n].g=g;e=d.createElement(s);e.async=1;e.src=u;c=d.getElementsByTagName(s)[0];c.parentNode.insertBefore(e,c);})(window,document,"script","//api.dmcdn.net/pxl/cpe/client.min.js","cpe", cpeId);
    }

    private setVideo(video: infVideo) {
        this.videoParams = video;
        document.dispatchEvent(this.apiReady);
    }

    private searchVideo() {

        console.log("%c DM related ", "background: #56C7FF; color: #232323", "Search: " + this.searchParams.search);

        const properties = Object.entries( this.searchParams ).map( ([ key, value] ) => {
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }).join('&');

        const dmSearchUrl = "https://api.dailymotion.com/" + (this.playerParams.searchInPlaylist ? "playlist/" + this.playerParams.searchInPlaylist + "/videos" : "videos") + "?" + properties;

        fetch(dmSearchUrl).then( response => {
            return response.json();
        }).then( data => {
            if (data.total > 0) {
                this.setVideo(data.list[0]);
            } else {
                console.log("%c DM related ", "background: #56C7FF; color: #232323", "Can not find related video. Fallback video used.");
                this.getFallbackVideo();
            }
        });

    }

    private getFallbackVideo() {

        // Define current time and 30 days
        const currentTime = Math.floor(Date.now()/1000);
        const thirtyDays = 2592000;
        const url = "https://api.dailymotion.com/" + (this.playerParams.searchInPlaylist ? "playlist/" + this.playerParams.searchInPlaylist + "/videos?" : "videos?owners=" + this.playerParams.owners)  + "&created_after=" + (currentTime - thirtyDays) + "&sort=random&limit=1&fields=id,title";

        const self = this;

        fetch(url).then( response => {
            return response.json();
        }).then( data => {

            if (data.list.length > 0) {

                /**
                 * Data return array, get the first array and pass it to setVideo function
                 */
                self.setVideo(data.list[0]);
            } else {
                console.warn("DM related Unable to find a fallback video");
            }
        });

    }

    /**
     * Find keywords strings on website
     *
     * Step find keywords string
     * 1. Find meta keywords
     * 2. Find
     */
    private findKeywords(selector?: string): string[] {
        let keywords = [''];

        if ( selector !== null ) {
            const keywordContainer = document.querySelector(selector);
            keywords = this.sanitizeKeywords(keywordContainer.getAttribute("content"));
        } else if ( selector === null && typeof document.getElementsByTagName("h1")[0] !== "undefined") {
            keywords = this.sanitizeKeywords(document.getElementsByTagName("h1")[0].textContent);
        }

        return keywords;
    }

    /**
     * Sanitize keywords based on language
     *
     * Hangul (Korea): \u3131-\uD79D
     * Alphabet: a-zA-Z0-9
     * Latin Character: \u00C0-\u00FF
     * Devanagri (India): \u0900-\u097F
     */
    protected sanitizeKeywords(keywords: string): string[] {
        return keywords.replace(/[^- \u3131-\uD79D a-zA-Z0-9 \u00C0-\u00FF \u0900-\u097F \u0153]/g, ' ')
            .split(' ')
            .filter(word => word.length >= this.playerParams.minWordLength);
    }

}