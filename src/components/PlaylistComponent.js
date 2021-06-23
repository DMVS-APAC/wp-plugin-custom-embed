import { __ } from "@wordpress/i18n"
import { waitFor, sleep } from "../libs/waitFor"
import { Component } from "@wordpress/element"
import { fetchApi } from "../libs/apiCall"
import { dispatch } from "@wordpress/data"
import Pagination from "../libs/pagination"

export default class PlaylistComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            playlists: {},
            currentPage: 1,
            loadingData: true
        }

        this.setPlaylist = this.setPlaylist.bind(this)
        this.loadPage = this.loadPage.bind(this)
        this.setLoadingData = this.setLoadingData.bind(this)
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

    async getPlaylist(page = 1, keywords) {

        this.setLoadingData(true)

        // Get custom options
        const options = await fetchApi('/dm/v1/get-custom-options/mandatory')

        const url = '/playlists'
        const params = {
            limit: 10,
            fields: 'id,name,thumbnail_240_url,private',
            page: page,
            sort: 'relevance'
        }

        if (keywords) {
            params.search = keywords
        }

        if (
            typeof options.owners !== 'undefined' &&
            options.owners !== null && this.props.globalVideo !== true
        ) {
            params.owner = options.owners
        }

        return new Promise( resolve => {
            DM.api(url, params, playlists => {
                this.setLoadingData(false)
                resolve(playlists)
            })
        })
    }

    async loadPage(page) {
        const playlists = await this.getPlaylist(page, this.props.keywords)

        this.setCurrentPage(page)
        this.setPlaylist(playlists)
    }

    async componentDidMount() {
        const playlists = await this.getPlaylist()

        this.setCurrentPage()
        this.setPlaylist(playlists)
    }

    async componentDidUpdate(prevProps) {

        console.log(prevProps)
        if ( this.props.keywords !== prevProps.keywords ||
            this.props.globalVideo !== prevProps.globalVideo) {

            const playlists = await this.getPlaylist(1, this.props.keywords)

            this.setCurrentPage(1)
            this.setPlaylist(playlists)
        }
    }

    setLoadingData(status) {
        this.setState({
            loadingData: status
        })
    }

    setPlaylist(playlists) {
        this.setState({
            playlists: playlists
        })
    }

    setCurrentPage(page = 1) {
        this.setState({
            currentPage: page
        })
    }

    renderPlaylists() {
        const playlists = []

        console.log(this.state.playlists)

        if (this.state.playlists !== undefined && Object.entries(this.state.playlists).length > 0 && this.state.playlists.list.length > 0) {
            const list = this.state.playlists.list

            for (let i = 0; i < list.length; i++) {
                playlists.push(
                    <li key={list[i]} className="content__item">
                        <button onClick={() => this.addToPost(list[i])}>
                            <figure className="content__image-wrapper">
                                <div className="content__placement">
                                    <img src={list[i].thumbnail_240_url} alt={list[i].name} className="content__thumbnail"/>
                                </div>
                            </figure>
                            <span className="content__title">{list[i].name}</span>
                        </button>
                    </li>
                )
            }

        } else {
            return <li>No playlist found…</li>
        }

        return playlists
    }

    render() {
        return (
            <>
                <ul className="dm__search-results">
                    { this.state.loadingData ? <li>{__('loading playlist…', 'textdomain')}</li> : this.renderPlaylists() }
                </ul>

                <Pagination currentPage={this.state.currentPage} callback={this.loadPage} contentData={this.state.playlists} />
            </>
        )
    }
}
