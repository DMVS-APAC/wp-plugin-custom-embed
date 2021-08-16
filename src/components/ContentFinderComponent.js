import { __ } from "@wordpress/i18n"
import { Component } from "@wordpress/element"
import { select } from "@wordpress/data"

// Components
import { PanelBody } from "@wordpress/components"
import Videos from "./VideosComponent"
import Playlist from "./PlaylistComponent"

import { STORE_KEY as DM_SDK_STORE_KEY } from "../store/dmSdkStore"

/**
 * A form to find a content from Dailymotion, part of Dailymotion sidebar.
 * In this form will only parse the data to processed on the child component
 *
 */
export default class ContentFinderComponent extends Component {

    /**
     * A variable to store a state
     */
    #connectionStatus = null

    constructor(props) {
        super(props)

        this.state = {
            playlists: {},
            keywords: "",
            findKeywords: "",
            currentPage: 1,
            globalVideo: false,
            findGlobal: false,
            findPlaylist: false,
        }

        // This binding is necessary to make `this` work in the callback
        this.findVideo = this.findVideo.bind(this)
        this.setKeywords = this.setKeywords.bind(this)
        this.setGlobalVideo = this.setGlobalVideo.bind(this)
        this.setFindPlaylist = this.setFindPlaylist.bind(this)
    }

    async setConnectionStatus(isConnected) {
        let connectionStatus
        if (isConnected) {
            connectionStatus = <><span className="dm--connected"></span> {__("You're connected", "textdomain")}</>
        } else {
            connectionStatus = <><span className="dm--disconnected"></span> {__("You're not connected", "textdomain")}</>
        }

        this.setState({
            connectionStatus: connectionStatus
        })
    }

    componentDidMount() {
        this.#connectionStatus = select(DM_SDK_STORE_KEY).getConnectionStatus()['connectionStatus']
        this.setConnectionStatus(this.#connectionStatus)
    }

    async findVideo(e) {
        e.preventDefault()

        this.setState({
            findKeywords: this.state.keywords,
            findGlobal: this.state.globalVideo
        })
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

    setFindPlaylist(e) {
        this.setState({
            findPlaylist: (e.target.checked === true)
        })
    }

    render() {
        return (
            <PanelBody>
                <div className="dm__content-list">
                    <p>{ this.state.connectionStatus }</p>
                    <form onSubmit={this.findVideo}>
                        <label htmlFor="keywords">{__("Find a video", "textdomain")}</label>
                        <input id="keywords"
                               onChange={this.setKeywords}
                               type="text"
                               name="keywords"
                               className="dm__keywords-input"
                        />
                        <button type="submit" className="action button">Find</button>

                        <label htmlFor="global-video" className="checkbox-label">
                            <input type="checkbox"
                                   id="global-video"
                                   onChange={this.setGlobalVideo}
                                   name="globalVideo"
                                   value="1"
                            /> {__("Find global", "textdomain")}
                        </label>

                        <label htmlFor="find-playlist" className="checkbox-label">
                            <input type="checkbox"
                                   id="find-playlist"
                                   onChange={this.setFindPlaylist}
                                   name="findPlaylist"
                                   value="1"
                            /> {__("Find playlist", "textdomain")}
                        </label>
                    </form>


                    { this.state.findPlaylist ?
                        <Playlist keywords={this.state.findKeywords} globalVideo={this.state.findGlobal} /> :
                        <Videos keywords={this.state.findKeywords} globalVideo={this.state.findGlobal} />
                    }

                </div>
            </PanelBody>
        )
    }
}
