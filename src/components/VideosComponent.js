import { __ } from "@wordpress/i18n"
import { Component } from "@wordpress/element"
import { fetchApi } from "../libs/apiCall"
import { dispatch, select } from "@wordpress/data"
import Pagination from "../libs/pagination"
import { STORE_KEY as DM_SDK_STORE_KEY } from "../store/dmSdkStore"


/**
 * VideosComponent
 *
 * This component will generate a search results
 *
 */
export default class VideosComponent extends Component {

    /**
     * A variable to store a state from the state management
     */
    #connectionStatus = null

    /**
     *
     * @type {string}
     */
    #editorMode = ''

    constructor(props) {
        super(props)

        this.state = {
            videos: {},
            currentPage: 1,
            loadingData: true,
        }

        this.#editorMode = this.#checkEditorMode()

        this.setVideos = this.setVideos.bind(this)
        this.loadPage = this.loadPage.bind(this)
        this.setLoadingData = this.setLoadingData.bind(this)
    }

    /**
     * Check which editor is active
     *
     * TODO: Should be available on global exist on VideosComponent and SelectedVideoComponent
     *
     * @link for reference how to check which editor in use https://github.com/WordPress/gutenberg/issues/12200
     * @returns {string}
     */
    #checkEditorMode() {
        if ( document.body.classList.contains( 'block-editor-page' ) ) {
            return 'gutenberg'
        }

        return 'classic-editor'
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
    async fetchVideo(page = 1, keywords) {

        this.setLoadingData(true)

        const dmUser = await fetchApi('/dm/v1/userinfo')
        const content = await fetchApi('/dm/v1/get-custom-options/manual_embed_content')

        const params = {
            fields: 'id,title,thumbnail_240_url,status,private,private_id',
            limit: this.props.perPage ? this.props.perPage : 10,
            flags: 'no_live,exportable,verified',
            page: page
        }

        if (keywords) {
            params.sort = 'relevance'
            params.search = keywords
        } else {
            params.sort = 'recent'
        }

        let url = ''

        const isOwners = typeof content.owners !== 'undefined'

        if (this.#connectionStatus && this.props.globalVideo !== true && !isOwners) {
            url = 'user/' + dmUser.channel + '/videos'
        } else if (isOwners && this.props.globalVideo !== true) {
            params.owners = content.owners
            url = 'videos'
        } else {
            url = 'videos'
        }

        return new Promise(async resolve => {
            DM.api(url, params, (videos) => {
                this.setLoadingData(false)
                resolve(videos)
            })
        }).catch(error => {
            console.log(error)
        })
    }

    setVideos(videos) {
        this.setState({
            videos: videos
        })
    }

    setCurrentPage(page = 1) {
        this.setState({
            currentPage: page
        })
    }

    setLoadingData(status) {
        this.setState({
            loadingData: status
        })
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
    async addToPost(video) {
        if (this.#editorMode === 'gutenberg') {
            dispatch('core/editor').editPost({
                meta: {
                    _dm_video_data: JSON.stringify(video)
                }
            })

            // Send custom event to catch on VideoBlockComponent to render a new video
            const videoUpdated = new CustomEvent("dm-video-updated")
            document.dispatchEvent(videoUpdated)
        } else {
            let attrsString = ''

            if (video.private === true) {
                attrsString += ' privatevideoid="' + video.private_id + '"'
            } else {
                attrsString += ' videoid="' + video.id + '"'
            }

            wp.media.editor.insert('[dm-player' + attrsString + ']');
        }

    }

    async componentDidMount() {
        this.#connectionStatus = select(DM_SDK_STORE_KEY).getConnectionStatus()['connectionStatus']
        const videos = await this.fetchVideo()


        this.setVideos(videos)
    }

    async componentDidUpdate(prevProps) {

        // Listen to props changes (keywords and globalVideo)
        if ( this.props.keywords !== prevProps.keywords ||
             this.props.globalVideo !== prevProps.globalVideo ) {

            const videos = await this.fetchVideo(1, this.props.keywords)

            this.setCurrentPage()
            this.setVideos(videos)
        }

    }

    async loadPage(page) {
        const videos = await this.fetchVideo(page, this.props.keywords)

        this.setCurrentPage(page)
        this.setVideos(videos)
    }

    renderVideoList() {
        const videos = []

        if (this.state.videos.error !== undefined) {
            return <li className="dm__show-message">API errors, please check your settings…</li>
        }

        if (this.state.videos !== undefined && Object.entries(this.state.videos).length > 0 && this.state.videos.list.length > 0) {
            const list = this.state.videos.list

            for (let i = 0; i < list.length; i++) {
                videos.push(
                    <li key={list[i]} className={`content__item ${list[i].private ? "private" : ""} ${list[i].status === 'ready' ? "draft" : ""}`}>
                        <button onClick={() => this.addToPost(list[i])} type="button">
                            <figure className="content__image-wrapper">
                                <div className="content__placement">
                                    <img src={list[i].thumbnail_240_url} alt={list[i].title} className="content__thumbnail"/>
                                </div>
                            </figure>
                            <span className="content__title" title={list[i].title}>{list[i].title}</span>
                        </button>
                    </li>
                )
            }

        } else {
            return <li>No video found…</li>
        }

        return videos
    }

    render() {

        return (
            <>
                <ul className="dm__search-results">
                    { this.state.loadingData ? <li>{__('loading video…', 'textdomain')}</li> : this.renderVideoList() }
                </ul>

                <Pagination currentPage={this.state.currentPage} callback={this.loadPage} contentData={this.state.videos} />
            </>
        )
    }

}
