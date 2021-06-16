// import { registerBlockType, getBlockContent } from '@wordpress/blocks'
import { dispatch, select } from "@wordpress/data"
import { Component } from "@wordpress/element"
import {fetchApi} from "../libs/apiCall";

export default class VideoBlockComponent extends Component {
    /**
     * Store previous player position
     */
    #prevPos

    /**
     * Dailymotion options
     */
    dmOptions

    constructor(props) {
        super(props)

        this.subscribes()

        this.state = props.attributes
    }

    /**
     * List of event listener to update the data
     */
    subscribes() {
        document.addEventListener('dm-video-updated', e => {
            this.setAttr()
        })
    }

    /**
     *
     */
    async getDmOptions() {
        return await fetchApi('/dm/v1/get-custom-options/player')
    }

    /**
     * Get a position of the block
     *
     * @return number
     */
    countBlocks() {
        let counter

        const blocks = select('core/editor').getBlocks()

        if (blocks.length !== 0) {
            for (let i = 0; i < blocks.length; i++) {
                if (blocks[i].name === 'dm-settings/click-embed') {
                    counter = i
                }
            }
        }

        return counter
    }

    /**
     * Update the position of the player
     */
    updatePosition() {

        const counter = this.countBlocks()

        if (this.#prevPos !== counter) {
            this.#prevPos = counter

            dispatch('core/editor').editPost({
                meta: {
                    _dm_player_position: counter
                }
            })
        }

    }

    /**
     * Get video data from updated post attributes
     *
     * @returns {null|any}
     */
    getVideo() {
        const videoData = select('core/editor').getEditedPostAttribute('meta')['_dm_video_data']

        if (videoData !== '') {
            return JSON.parse(videoData)
        }

        return null
    }

    /**
     * Programmatic click Dailymotion button to open sidebar
     */
    openSidebar() {
        const dmButton = document.querySelector('button[aria-label="Dailymotion Sidebar Settings"]')
        dmButton.click()
    }

    /**
     * Set state video data and rerender the video
     */
    setAttr() {
        const video = this.getVideo()

        if (video !== null) {
            this.setState({
                videoId: (video.private !== true) ? video.id : null,
                privateVideoId: (video.private === true) ? video.private_id : null
            })

            // Rerender the video player placeholder
            window.dmce.rebuild()
        }
    }

    async componentDidMount() {
        this.dmOptions = await this.getDmOptions()

        this.setAttr()
    }

    /**
     * If block destroyed, it will update the position
     */
    componentWillUnmount() {
        dispatch('core/editor').editPost({
            meta: {
                _dm_player_position: -1
            }
        })
    }

    generateVideoContainer(attrs) {

        if (this.state.privateVideoId !== null) {
            return <div className="dm-player" privateVideoId={ this.state.privateVideoId } playerId="x1ozy" {...attrs} />
        }

        return <div className="dm-player" videoId={ this.state.videoId } playerId="x1ozy" {...attrs} />
    }

    render() {
        this.updatePosition()

        if (this.state.videoId === '' || this.state.videoId === undefined) {
            return (
                <div className="dm-player__editor">
                    <p>No video selected, please select by click button below</p>
                    <button onClick={this.openSidebar}>Find a video</button>
                </div>
            )
        }

        let attrs = {}
        if ( this.dmOptions ) {
            if (this.dmOptions.pre_video_title !== undefined && this.dmOptions.pre_video_title !== '')
                attrs.preVideoTitle = this.dmOptions.pre_video_title

            if (this.dmOptions.show_info_card === '1')
                attrs.showInfocard = 'true'

            if (this.dmOptions.show_video_title === '1')
                attrs.showVideoTitle = 'true'

        }

        // `playerId` is using only for preview, it's Yudhi's `playerId`
        return (
            <div className="dm-player__holder">
                <p className="dm-player__holder--title">
                    <span className="dashicons dashicons-edit-large"/> Dailymotion Player
                </p>

                {this.generateVideoContainer(attrs)}
            </div>
        )
    }
}
