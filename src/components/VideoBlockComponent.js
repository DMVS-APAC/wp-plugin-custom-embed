import { dispatch, select } from "@wordpress/data"
import { Component } from "@wordpress/element"
import { fetchApi } from "../libs/apiCall"

/**
 * Video Block Component
 *
 * This is a block that user can drag n' drop in the editor.
 * It will render preview a video block. Technically, it won't
 * add anything in the editor, just for preview. It only record
 * the position of the player. Once user save the post it also
 * save post meta.
 *
 * In the front end, the component will be created on the fly
 * when user start loading the page.
 *
 * The way we decide is to avoid adding something in the editor.
 * Once partner decide to not using it anymore, then they just
 * need to deactivate the plugin, and voila! the content is still
 * clean.
 */
export default class VideoBlockComponent extends Component {
    /**
     * Store previous player position
     */
    #prevPos

    /**
     * Dailymotion options
     */
    dmPlayerAttributes

    constructor(props) {
        super(props)

        this.subscribes()

        this.state = {
            videoId: '',
            privateVideoId: '',
            playlistId: ''
        }
    }

    /**
     * List of event listener to update the data
     *
     * 1. Video Updated
     */
    subscribes() {
        document.addEventListener('dm-video-updated', e => {
            this.setAttr()
        })
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
                privateVideoId: (video.private === true) ? video.private_id : null,
                playlistId: (video.name !== undefined) ? video.id : null
            })

            // Rerender the video player placeholder
            window.dmce.rebuild()
        }
    }

    async componentDidMount() {
        this.dmPlayerAttributes = await fetchApi('/dm/v1/get-custom-options/player')

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

        // `playerId` is using only for preview, it's Yudhi's `playerId`
        if (this.state.playlistId !== null) {
            return <div className="dm-player" playlistId={this.state.playlistId} playerId="x1ozy" {...attrs} />
        }

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
        if ( this.dmPlayerAttributes ) {
            if (this.dmPlayerAttributes.pre_video_title !== undefined && this.dmPlayerAttributes.pre_video_title !== '')
                attrs.preVideoTitle = this.dmPlayerAttributes.pre_video_title

            if (this.dmPlayerAttributes.show_info_card === '1')
                attrs.showInfocard = 'true'

            if (this.dmPlayerAttributes.show_video_title === '1')
                attrs.showVideoTitle = 'true'

            if (this.dmPlayerAttributes.show_carousel_playlist === '1')
                attrs.showOutsidePlaylist = 'true'

        }

        return (
            <div className="dm-player__holder">
                <p className="dm-player__holder--title">
                    <span className="dashicons dashicons-edit-large"/> Dailymotion Player
                </p>

                { this.generateVideoContainer(attrs) }
            </div>
        )
    }
}
