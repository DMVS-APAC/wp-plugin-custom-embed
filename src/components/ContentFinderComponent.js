import { __ } from "@wordpress/i18n"
import { Component } from "@wordpress/element"
import { select } from "@wordpress/data"

// Components
import { PanelBody } from "@wordpress/components"
import Videos from "./VideosComponent"
import Playlist from "./PlaylistComponent"

import { STORE_KEY as DM_SDK_STORE_KEY } from "../store/dmSdkStore"
import {fetchApi} from "../libs/apiCall";

/**
 * A form to find a content from Dailymotion, part of Dailymotion sidebar.
 * In this form will only parse the data to be processed on the child component
 *
 */
export default class ContentFinderComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            playlists: {},
            keywords: "",
            currentPage: 1,
            findGlobal: false,
            findPlaylist: false,
            channelId: "",
            allChannels: [],
            contentChannel: ""
        }

        // This binding is necessary to make `this` work in the callback
        this.findVideo = this.findVideo.bind(this)
        this.setKeywords = this.setKeywords.bind(this)
        this.setGlobalVideo = this.setGlobalVideo.bind(this)
        this.setFindPlaylist = this.setFindPlaylist.bind(this)
        this.getAllChannels = this.getAllChannels.bind(this)
        this.setChannelId = this.setChannelId.bind(this)

        this.getAllChannels()
    }

    async findVideo(e) {
        e.preventDefault()
    }

    setKeywords(e) {
        this.setState({
            keywords: e.target.value
        })
    }

    setGlobalVideo(e) {
        this.setState({
            findGlobal: (e.target.checked === true)
        })
    }

    setFindPlaylist(e) {
        this.setState({
            findPlaylist: (e.target.checked === true)
        })
    }

    setChannelId(e) {
        this.setState({
            channelId: e.target.value
        })
    }

    async getAllChannels() {
        this.setState({
            allChannels: await fetchApi('/dm/v2/get-option/channel_list'),
            contentChannel: await fetchApi('dm/v2/get-option/options_manual_embed_content')
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if ( this.state.channelId == "" && this.state.allChannels.length ) {
            this.setState({
                channelId: this.state.allChannels[0].id
            })
        }
    }

    renderChannels() {
        const channels = []

        if (this.state.allChannels.length < 1) return null

        for (let i=0; i < this.state.allChannels.length; i++) {
            channels.push(
                <option value={this.state.allChannels[i].id}>{ this.state.allChannels[i].id + ' - ' + this.state.allChannels[i].screenname }</option>
            )
        }

        return <>
            <label for="channelId">{ __("Channel ID", "textdomain") }</label>
            <select className="dm__input" id="channelId" name="channelId" value={this.state.channelId} onChange={this.setChannelId}>
                { channels }
            </select>
        </>
    }

    render() {
        return (
            <PanelBody>
                <div className="dm__content-list">
                    <form onSubmit={this.findVideo}>
                        <label htmlFor="keywords">{__("Find a video", "textdomain")}</label>
                        <input id="keywords"
                               onChange={this.setKeywords}
                               type="text"
                               name="keywords"
                               className="dm__input"
                        />

                        { this.renderChannels() }

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

                        <button type="submit" className="action button">Find</button>
                    </form>


                    { this.state.findPlaylist ?
                        <Playlist keywords={this.state.keywords} globalVideo={this.state.findGlobal} perPage={this.props.resultsPerPage} channelId={this.state.channelId} contentChannelId={this.state.contentChannel.owners} /> :
                        <Videos keywords={this.state.keywords} globalVideo={this.state.findGlobal} perPage={this.props.resultsPerPage} channelId={this.state.channelId} contentChannelId={this.state.contentChannel.owners} />
                    }

                </div>
            </PanelBody>
        )
    }
}
