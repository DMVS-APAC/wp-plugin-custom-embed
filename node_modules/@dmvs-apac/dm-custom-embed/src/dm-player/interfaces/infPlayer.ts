export default interface InfPlayer {
    //Minimum length of words to keep
    minWordLength: number;

    //Minimum words to perform a search: while no results it will removes a word and retry search
    minWordSearch: number;

    //Maximum of words used for the search: more words you keep, less are chances to get a result
    maxWordSearch: number;

    //language of videos. List of available values here: https://developer.dailymotion.com/api/partners#languages
    language: string;

    //Which sort to use. List of available values: https://developer.dailymotion.com/api#video-sort-filter
    sort: string;

    //xid OR username of the channels to search separated by ","
    owners: string;

    //Category to filter. List of available values: https://api.dailymotion.com/channels
    category: string;

    //xid of videos to exclude separated by ","
    excludeIds: string;

    //search in a playlit ? provide playlist xid OR false
    searchInPlaylist: string | boolean;

    //syndication key
    syndication: string;

    //video auto play
    autoPlayMute: boolean;

    //enable video queue
    queueEnable: boolean;

    //enable video queue autoplay next
    queueEnableNext: boolean;

    //shows player controls
    controls: boolean;

    //parameter to be included on every embedding the player
    adsParams: string;

    //You can get CPE ID from partner HQ on template tabs, inside embed menu
    cpeId: string[];

    keywordsSelector: string;

    width?: number;
    height?: number;

}
