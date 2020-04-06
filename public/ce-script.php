<script type="text/javascript">

    //id of div where init the player
    const divId = "dmRelatedPlayer";

    //xid of video to fallback
    let fallbackVideo = "";

    //Minimum length of words to keep
    const minWordLength = 4;

    //Minimum words to perform a search: while no results it will removes a word and retry search
    const minWordSearch = 2;

    //Maximum of words used for the search: more words you keep, less are chances to get a result
    const maxWordSearch = 15;

    //Category to filter. List of available values: https://api.dailymotion.com/channels
    const category = "";

    //language of videos. List of available values here: https://developer.dailymotion.com/api/partners#languages
    const language = "";

    //Which sort to use. List of available values: https://developer.dailymotion.com/api#video-sort-filter
    const sort = "relevance";

    //xid OR username of the channels to search separated by ","
    const owners = "<?php echo ($this->options['owners']) ? $this->options['owners'] : '' ?>";

    //xid of videos to exclude separated by ","
    const excludeIds = "";

    //search in a playlit ? provide playlist xid OR false
    const searchInPlaylist = false;

    //syndication key
    const syndication = "<?php echo ($this->options['syndication']) ? $this->options['syndication'] : '' ?>";

    //video auto play
    const autoPlayMute = true;

    //enable video queue
    const queueEnable = true;

    //enable video queue autoplay next
    const queueEnableNext = true;

    //shows player controls
    const controls = true;

    /**
     * Video title
     */
    let videoTitle = "";

    /**
     * Takes a string and returns keywords following some rules
     *
     * @param title {string} a sentence
     * @returns {array} keywords
     */
    const sanitizeTitle = function(title){
        return  title.replace(/[^- \u3131-\uD79D a-zA-Z0-9 \u00C0-\u00FF \u0153]/g, ' ')
            .split(' ')
            .filter(word => word.length >= minWordLength);
    }

    /**
     * Find keywords from the current page using og:title or h1 tags
     *
     * @returns {Array} keywords
     */
    const findKeywords = function(){
        let title = document.querySelector("meta[name='keywords']");

        if ( title !== null )
            title = sanitizeTitle(title.getAttribute("content"));

        if ( (title === null || title.length === 0) && document.getElementsByTagName("h1")[0] !== undefined)
            title = sanitizeTitle(document.getElementsByTagName("h1")[0].textContent);

        return title;
    }

    const keywords = findKeywords();
    const searchParams = {
        'fields': 'id,title',
        'sort': sort,
        'limit': 1,

        /** Avoid error with recheck the keywords, is it null or not */
        'search': keywords ? keywords.sort((a, b) => b.length - a.length).slice(0, maxWordSearch).join(' ') : ""
    };

    if(!searchInPlaylist){
        searchParams.private = 0;
        searchParams.flags = "no_live,exportable" + (owners.length > 0? "": ",verified");
        searchParams.longer_than = 0.35; //21sec
        if(owners){ searchParams.owners = owners; }
        if(category){ searchParams.channel = category; }
        if(excludeIds){ searchParams.exclude_ids = excludeIds; }
    }
    if(language) {
        searchParams.language = language;
    }

    const playerParams = {
        'width': "100%",
        'height': "100%",
        'video': fallbackVideo,
        'params': {
            'controls': controls,
            'autoplay-mute': autoPlayMute,
            'queue-enable': queueEnable,
            'queue-autoplay-next': queueEnableNext,
            'syndication': syndication,
            'ads_params': 'contextual'
        }
    }

    const initRelatedPlayer = function(){
        if(document.getElementById(divId) !== null){
            let elm = document.getElementById(divId);
            let cpeEmbed = document.createElement("div");

            let queryString = "ads_params=" + playerParams.params.ads_params;

            if (syndication !== '') queryString += "&syndication=" + syndication;

            cpeEmbed.setAttribute("class", "dailymotion-cpe");
            cpeEmbed.setAttribute("video-id", playerParams.video);
            cpeEmbed.setAttribute('query-string', queryString);

            if(elm.getAttribute("width") !== null){
                playerParams.width = elm.getAttribute("width");
                cpeEmbed.setAttribute("width", elm.getAttribute("width"));
            }

            if(elm.getAttribute("height") !== null){
                playerParams.height = elm.getAttribute("height");
                cpeEmbed.setAttribute("height", elm.getAttribute("height"));
            }

            let cpeId = "<?php echo ($this->options['cpe_desktop']) ? $this->options['cpe_desktop'] : ''; ?>";

            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
                cpeId = "<?php echo ($this->options['cpe_mobile']) ? $this->options['cpe_mobile'] : ''; ?>";

            elm.appendChild(cpeEmbed);
            (function(w,d,s,u,n,i,f,g,e,c){w.WDMObject=n;w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments);};w[n].l=1*new Date();w[n].i=i;w[n].f=f;w[n].g=g;e=d.createElement(s);e.async=1;e.src=u;c=d.getElementsByTagName(s)[0];c.parentNode.insertBefore(e,c);})(window,document,"script","//api.dmcdn.net/pxl/cpe/client.min.js","cpe",cpeId);

            /**
             * Add title below the video
             */
            // const titleEl = document.createElement("p");
            // titleEl.innerHTML = videoTitle;
            // titleEl.style.cssText = "text-align: center; margin: 0; font-style: italic; font-size: 11px !important; line-height: 17px !important; text-overflow: ellipsis; white-space: nowrap; padding: 12px 5px !important; overflow: hidden; color: #444; font-weight: 400; font-family: Verdana, Geneva, sans-serif";
            // elm.appendChild(titleEl);

            // Overwrite wrapper style
            const overwriteWrapper = document.querySelector('.tdb_single_content .tdb-block-inner.td-fix-index');
            overwriteWrapper.style.cssText = "transform: none; -webkit-transform: none; -moz-transform: none; -ms-transform: none; -o-transform: none;";
        }
    }

    /**
     * Define new event to listen
     */
    const e = new Event('relatedSearchFinish');

    window.addEventListener('relatedSearchFinish', (e) => { initRelatedPlayer(); });

    const apiSearch = () => {
        console.log("%c DM related ", "background: #56C7FF; color: #232323", "Search: " + searchParams.search);

        const properties = Object.keys(searchParams).map(function(k) { return encodeURIComponent(k) + '=' + encodeURIComponent(searchParams[k])}).join('&');

        const dmSearchUrl = "https://api.dailymotion.com/" + (searchInPlaylist ? "playlist/" + searchInPlaylist + "/videos" : "videos") + "?" + properties;

        fetch(dmSearchUrl).then( response => {
            return response.json();
        }).then( data => {
            if (data.total > 0) {
                setVideo(data.list[0].id, data.list[0].title);
            } else {
                searchParams.search = searchParams.search.substring(0, searchParams.search.lastIndexOf(' '));

                if(searchParams.search.split(' ').length >= minWordSearch && searchParams.search.length > 0)
                    apiSearch();
                else{
                    console.log("%c DM related ", "background: #56C7FF; color: #232323", "Can not find related video. Fallback video used.");
                    getFallbackVideo();
                }
            }
        });
    };

    const getFallbackVideo = () => {

        // Define current time and 30 days
        const currentTime = Math.floor(Date.now()/1000);
        const thirtyDays = 2592000;
        const url = "https://api.dailymotion.com/videos?owners=" + owners + "&created_after=" + (currentTime - thirtyDays) + "&sort=random&limit=1&fields=id,title";

        fetch(url).then( response => {
            return response.json();
        }).then( data => {

            if (data.list.length > 0) {

                /**
                 * Data return array, get the first array and pass it to setVideo function
                 */
                setVideo(data.list[0].id, data.list[0].title);
            } else {
                console.warn("DM related Unable to find a fallback video");
            }
        });
    }

    const setVideo = (videoId, title) => {

        playerParams.video = videoId;
        videoTitle = title;
        window.dispatchEvent(e);
    }

    apiSearch();


</script>
