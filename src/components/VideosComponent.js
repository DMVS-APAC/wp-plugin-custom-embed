import { __ } from "@wordpress/i18n"
import { waitFor, sleep } from "../libs/waitFor"
import { Component } from "@wordpress/element"
import { fetchApi } from "../libs/apiCall"
import { dispatch } from "@wordpress/data"
import Pagination from "../libs/pagination"

export default class VideosComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            videos: {},
            currentPage: 1,
            loadingData: true
        }

        this.setVideos = this.setVideos.bind(this)
        this.loadPage = this.loadPage.bind(this)
        this.setLoadingData = this.setLoadingData.bind(this)
    }

    async getVideo(page = 1, keywords) {

        this.setLoadingData(true)

        // Get custom options
        const options = await fetchApi('/dm/v1/get-custom-options/mandatory')

        const params = {
            fields: 'id,title,thumbnail_240_url,status,private,private_id',
            limit: 10,
            flags: 'no_live,exportable,verified',
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
            options.owners !== null && this.props.globalVideo !== true
        ) {
            const owner = options.owners.split(',')

            url = 'user/' + owner[0] + '/videos'
        } else {
            url = 'videos'
        }

        // Waiting for DM.init() to be executed first
        await sleep(500)

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

    async componentDidMount() {
        const videos = await this.getVideo()

        this.setVideos(videos)
    }

    async componentDidUpdate(prevProps) {

        // Listen to keywords changes
        if ( this.props.keywords !== prevProps.keywords ||
             this.props.globalVideo !== prevProps.globalVideo ) {

            const videos = await this.getVideo(1, this.props.keywords)

            this.setCurrentPage()
            this.setVideos(videos)
        }

    }

    async loadPage(page) {
        const videos = await this.getVideo(page, this.props.keywords)

        this.setCurrentPage(page)
        this.setVideos(videos)
    }

    renderVideoList() {
        const videos = []

        if (this.state.videos.error !== undefined) {
            return <li>API errors, please check your settings…</li>
        }

        if (this.state.videos !== undefined && Object.entries(this.state.videos).length > 0 && this.state.videos.list.length > 0) {
            const list = this.state.videos.list

            for (let i = 0; i < list.length; i++) {
                videos.push(
                    <li key={list[i]} className={`content__item ${list[i].private ? "private" : ""} ${list[i].status === 'ready' ? "draft" : ""}`}>
                        <button onClick={() => this.addToPost(list[i])}>
                            <figure className="content__image-wrapper">
                                <div className="content__placement">
                                    <img src={list[i].thumbnail_240_url} alt={list[i].title} className="content__thumbnail"/>
                                </div>
                            </figure>
                            <span className="content__title">{list[i].title}</span>
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
