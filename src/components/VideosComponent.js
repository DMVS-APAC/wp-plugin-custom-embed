import React from "react"
import {fetchApi, fetchData} from "../libs/apiCall"
import { __ } from "@wordpress/i18n"

const videoList = async (page = 1, keywords) => {

    // Get custom options
    const options = await fetchApi( '/dm/v1/get-custom-options/mandatory')

    const params = {
        fields: 'id,title,thumbnail_240_url',
        limit: 10,
        private: 0,
        flags: 'no_live,exportable,verified',
        longer_than: 0.35,
        sort: ( options.sort_by !== null ) ? options.sort_by : 'recent',
        owners: ( options.owners !== null ) ? options.owners : ''
    }

    if (keywords) {
        params.sort = 'relevance'
    }

    return new Promise ( async resolve => {
        const videos = await fetchData('videos/?fields=' + params.fields + '&limit=10' + '&private=0' + '&flags=' + params.flags + '&longer_than=0.35' + '&sort=' + params.sort + '&owners=' + options.owners + ( (typeof keywords !== 'undefined') ? '&search=' + keywords : '') + '&page=' + page )

        resolve(videos)
    }).catch( error => {
        console.log(error)
    })
}

class VideosComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            videos: {},
            keywords: "",
            currentPage: 1
        }

        // This binding is necessary to make `this` work in the callback
        this.addToPost = this.addToPost.bind(this)
        this.findVideo = this.findVideo.bind(this)
        this.updateKeywords = this.updateKeywords.bind(this)
        this.loadPage = this.loadPage.bind(this)
    }

    async componentDidMount() {
        const videos = await videoList()

        this.setState({
            videos: videos
        })
    }

    addToPost(video) {
        console.log(video)
    }

    async findVideo(e) {
        e.preventDefault()

        const videos = await videoList(1, this.state.keywords)

        this.setState({
            videos: videos
        })
    }

    renderVideoList() {
        let videos = []
        const list = this.state.videos.list
        if (list) {
            for (let i = 0; i < list.length; i++) {
                videos.push(
                    <li key={list[i]} className="video__item">
                        <button onClick={() => this.addToPost(list[i])}>
                            <img src={list[i].thumbnail_240_url} alt={list[i].title} className="video__thumbnail" />
                            <span className="video__title">{list[i].title}</span>
                        </button>
                    </li>
                )
            }
        }

        return videos
    }

    updateKeywords(e) {
        this.setState({
            keywords: e.target.value
        })
    }

    async loadPage(page) {

        const videos = await videoList(page)

        this.setState({
            currentPage: page,
            videos: videos
        })
    }

    render() {
        return (
            <div className="dm__video-list">
                <form onSubmit={this.findVideo}>
                    <label htmlFor="keywords">{__("Find a video", "textdomain")}</label>
                    <input id="keywords"
                        onChange={this.updateKeywords}
                        type="text"
                        name="keywords"
                    />
                    <button type="submit" className="action button">Find</button>
                </form>
                <ul className="dm__video-results">
                    {this.renderVideoList()}
                </ul>

                <button type="button" className="components-button" onClick={ () => this.loadPage(this.state.currentPage - 1)}>Previous</button>
                <button type="button" className="components-button" onClick={ () => this.loadPage(this.state.currentPage + 1)}>Next</button>
            </div>
        )
    }
}

export default VideosComponent
