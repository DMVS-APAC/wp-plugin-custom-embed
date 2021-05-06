import {fetchApi, fetchData} from "../libs/apiCall"
import {__} from "@wordpress/i18n"
import {PanelBody} from "@wordpress/components"
import {dispatch, select} from "@wordpress/data"
import {Component} from "@wordpress/element"

export default class VideosComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            videos: {},
            keywords: "",
            currentPage: 1,
            globalVideo: false
        }

        // This binding is necessary to make `this` work in the callback
        this.addToPost = this.addToPost.bind(this)
        this.findVideo = this.findVideo.bind(this)
        this.setKeywords = this.setKeywords.bind(this)
        this.loadPage = this.loadPage.bind(this)
        this.setGlobalVideo = this.setGlobalVideo.bind(this)
    }

    async componentDidMount() {
        const videos = await this.videoList()

        this.setState({
            videos: videos
        })
    }

    async videoList(page = 1, keywords) {

        // Get custom options
        const options = await fetchApi('/dm/v1/get-custom-options/mandatory')

        const params = {
            fields: 'id,title,thumbnail_240_url',
            limit: 10,
            private: 0,
            flags: 'no_live,exportable,verified',
            longer_than: 0.35,
            sort: (options.sort_by !== null) ? options.sort_by : 'recent'
        }

        if ( params.sort === 'relevance' && !keywords ) {
            keywords = ''
        }

        return new Promise(async resolve => {
            const videos = await fetchData('videos/?fields=' +
                params.fields +
                '&limit=10' +
                '&private=0' +
                '&flags=' + params.flags +
                '&longer_than=0.35' +
                '&sort=' + params.sort +
                ((typeof options.owners !== 'undefined' && options.owners !== null && this.state.globalVideo !== true) ? '&owners=' + options.owners : '') +
                ((typeof keywords !== 'undefined') ? '&search=' + keywords : '') +
                '&page=' + page)

            resolve(videos)
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

        // select('dm-settings/click-embed').edit( () => {
        //     console.log('haha')
        // })

    }

    async findVideo(e) {
        e.preventDefault()

        const videos = await this.videoList(1, this.state.keywords)

        this.setState({
            videos: videos
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
                                <img src={list[i].thumbnail_240_url} alt={list[i].title} className="video__thumbnail"/>
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
        console.log(this.state)
    }

    async loadPage(page) {

        const videos = await this.videoList(page)

        this.setState({
            currentPage: page,
            videos: videos
        })
    }

    render() {
        return (
            <PanelBody>
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

                    <button type="button" className="components-button button action dm__prev-button"
                            onClick={() => this.loadPage(this.state.currentPage - 1)}>Previous
                    </button>
                    <button type="button" className="components-button button action dm__next-button"
                            onClick={() => this.loadPage(this.state.currentPage + 1)}>Next
                    </button>
                </div>
            </PanelBody>
        )
    }
}
