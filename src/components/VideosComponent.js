import {fetchApi, fetchData} from "../libs/apiCall"
import {__} from "@wordpress/i18n"
import {PanelBody} from "@wordpress/components"
import {dispatch, select} from "@wordpress/data"
import {Component} from "@wordpress/element"
import {waitFor, sleep} from "../libs/waitFor";

export default class VideosComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            videos: {},
            keywords: "",
            currentPage: 1,
            globalVideo: false,
            connectionStatus: null
        }

        this.initDm()

        // This binding is necessary to make `this` work in the callback
        this.addToPost = this.addToPost.bind(this)
        this.findVideo = this.findVideo.bind(this)
        this.setKeywords = this.setKeywords.bind(this)
        this.loadPage = this.loadPage.bind(this)
        this.setGlobalVideo = this.setGlobalVideo.bind(this)
    }

    async initDm() {
        await waitFor(() => DM !== undefined, 100, 10000, "Timeout waiting for DM loaded, please refresh and make sure your internet is active")

        // Get api-key
        const options = await fetchApi('/dm/v1/get-api-key')

        DM.init({
            apiKey: options.api_key,
            status: true, // check login status
            cookie: true // enable cookies to allow the s
        })
    }

    getDMLoginStatus() {
        let self = this
        return new Promise( (resolve, reject) => {
            DM.getLoginStatus( response => {
                if (response.session) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }

    async componentDidMount() {
        const videos = await this.videoList()
        const isConnected = await this.getDMLoginStatus()

        let connectionStatus
        if (isConnected) {
            connectionStatus = <><span className="dm--connected"></span> You're connected</>
        } else {
            connectionStatus = <><span className="dm--disconnected"></span> You're not connected</>
        }

        this.setState({
            videos: videos,
            connectionStatus: connectionStatus
        })
    }

    async videoList(page = 1, keywords) {

        // Get custom options
        const options = await fetchApi('/dm/v1/get-custom-options/mandatory')

        const params = {
            fields: 'id,title,thumbnail_240_url,status,private,private_id',
            limit: 10,
            flags: 'no_live,exportable,verified',
            // longer_than: 0.35,
            page: page
        }

        if ( options.sort_by !== null && keywords) {
            params.sort = options.sort_by
            params.search = keywords
        } else {
            params.sort = 'recent'
        }

        let url = ''
        if (
            typeof options.owners !== 'undefined' &&
            options.owners !== null && this.state.globalVideo !== true
            ) {
            url = 'user/' + options.owners + '/videos'
        } else {
            url = 'videos'
        }

        await sleep(500)

        return new Promise(async resolve => {
            DM.api(url, params, (videos) => {
                resolve(videos)
            })
        }).catch(error => {
            console.log(error)
        })
    }

    addToPost(video) {
        dispatch('core/editor').editPost({
            meta: {
                _dm_video_data: JSON.stringify(video)
            }
        })

        // Send custom event to catch on VideoBlockComponent to render a new video
        const videoUpdated = new CustomEvent("dm-video-updated")
        document.dispatchEvent(videoUpdated)
    }

    async findVideo(e) {
        e.preventDefault()

        const videos = await this.videoList(1, this.state.keywords)

        this.setState({
            videos: videos,
            currentPage: 1
        })
    }

    renderVideoList() {
        let videos = []

        if (this.state.videos !== undefined && Object.entries(this.state.videos).length > 0) {
            const list = this.state.videos.list

            for (let i = 0; i < list.length; i++) {
                videos.push(
                    <li key={list[i]} className="video__item">
                        <button onClick={() => this.addToPost(list[i])}>
                            <figure className="video__image-wrapper">
                                <div className="video__placement">
                                    <img src={list[i].thumbnail_240_url} alt={list[i].title} className="video__thumbnail"/>
                                </div>
                            </figure>
                            <span className="video__title">{list[i].title}</span>
                        </button>
                    </li>
                )
            }

        } else {
            videos.push(
                <li>No video found…</li>
            )
        }

        return videos
    }

    setKeywords(e) {
        this.setState({
            keywords: e.target.value
        })
    }

    setGlobalVideo(e) {
        this.setState({
            globalVideo: (e.target.checked === true)
        })
    }

    async loadPage(page) {
        const videos = await this.videoList(page, this.state.keywords)

        this.setState({
            currentPage: page,
            videos: videos
        })
    }

    /**
     * Pagination module to show on dailymotion sidebar
     *
     * TODO: refactor this pagination later on YUDHI
     */
    pagination() {

        if (this.state.videos.page === 1 && this.state.videos.has_more === true) {
            return (
                <>
                    <button type="button" className="components-button button action dm__next-button"
                            onClick={() => this.loadPage(this.state.currentPage + 1)}>Next
                    </button>
                </>
            )
        }

        if (this.state.videos.has_more === false && this.state.videos.page !== 1) {
            return (
                <>
                    <button type="button" className="components-button button action dm__prev-button"
                            onClick={() => this.loadPage(this.state.currentPage - 1)}>Previous
                    </button>
                </>
            )
        }

        if (Object.entries(this.state.videos).length === 0 || this.state.videos.total === 0 || this.state.videos.has_more === false) {
            return
        }

        return (
            <>
                <button type="button" className="components-button button action dm__prev-button"
                        onClick={() => this.loadPage(this.state.currentPage - 1)}>Previous
                </button>
                <button type="button" className="components-button button action dm__next-button"
                        onClick={() => this.loadPage(this.state.currentPage + 1)}>Next
                </button>
            </>
        )
    }

    render() {
        return (
            <PanelBody>
                <p>{ this.state.connectionStatus }</p>
                <div className="dm__video-list">
                    <form onSubmit={this.findVideo}>
                        <label htmlFor="keywords">{__("Find a video", "textdomain")}</label>
                        <input id="keywords"
                               onChange={this.setKeywords}
                               type="text"
                               name="keywords"
                               className="dm__keywords-input"
                        />
                        <button type="submit" className="action button">Find</button>
                    </form>

                    <label htmlFor="global-video">
                        <input type="checkbox"
                               id="global-video"
                               onChange={this.setGlobalVideo}
                               name="globalVideo"
                               value="1"
                        /> Find global video
                    </label>

                    <ul className="dm__video-results">
                        {this.renderVideoList()}
                    </ul>

                    {this.pagination()}
                </div>
            </PanelBody>
        )
    }
}
