import { select, dispatch } from "@wordpress/data"
import { Component } from "@wordpress/element"
import { fetchApi } from "../libs/apiCall"
import { STORE_KEY as STORE_VIDEO_STORE_KEY } from "../store/dmVideoStore"

import { BlockControls } from '@wordpress/block-editor'
import { ToolbarGroup, ToolbarButton } from '@wordpress/components'
import { edit } from '@wordpress/icons'
import { CreateCustomEvent } from "../libs/customEvent"

/**
 * Video Block Component
 *
 * The old way of keep the video block empty and save the video data
 * in the post meta is not the best way. Now we save it in the content
 * like normal behavior of the block. But it translated to shortcode.
 *
 * Behind the reason of use the shortcode is that we can clean up the
 * shortcode if user don't want to use the plugin anymore.
 */
export default class VideoBlockComponent extends Component {

    #prevVideoId = null

    constructor(props) {
        super(props)

        this.state = {
            dmPlayerAttributes: {},
            playerLoading: true
        }

        this.subscribes()
    }

    subscribes() {
        document.addEventListener('dm-video-updated', e => {
            const { isSelected } = this.props

            if (isSelected) this.setAttr(e.detail.sender)
        })

    }

    /**
     * Programmatic click Dailymotion buttons to open sidebar
     */
    openSidebar() {
        const dmButton = document.querySelector('button[aria-label="Dailymotion Sidebar Settings"]')
        dmButton.click()
    }

    /**
     * Set state video data and rerender the video
     *
     */
    async setAttr(sender) {
        const videoData = select(STORE_VIDEO_STORE_KEY).getVideoData()

        if (videoData !== undefined) {
            this.props.setAttributes({
                videoData: videoData
            })

            if (this.#prevVideoId === null && this.#prevVideoId !== videoData.id) {
                this.#prevVideoId = videoData.id
            }
        }

        if (
            this.props.attributes.videoData.id !== this.#prevVideoId && this.#prevVideoId !== null
            && sender !== 'video-block-component'
        ) {
            // Rerender the video player placeholder
            window.dmce.rebuild()
        }
    }

    async componentDidMount() {
        CreateCustomEvent('dm-ready', 'video-block-component')
        const playerAttributes = await fetchApi('/dm/v1/get-custom-options/manual_embed_player')

        this.setState({
            dmPlayerAttributes: playerAttributes
        })
    }

    /**
     * Reset all values
     */
    componentWillUnmount() {
        this.resetVideo()

        document.removeEventListener('dm-video-updated', e => {})
    }

    resetVideo() {
        this.props.setAttributes({
            videoData: {
                id: "",
                private: false,
                private_id: "",
                status: "",
                thumbnail_240_url: "",
                title: "",
                name: ""
            }
        })

        dispatch(STORE_VIDEO_STORE_KEY).setVideo(this.props.attributes.videoData)

        // Send custom event to catch on VideoBlockComponent to render a new video
        CreateCustomEvent('dm-video-updated', 'video-block-component')
    }

    /**
     * Set player attributes
     *
     * Another component is also using function like this. It's possible
     * to make this as a helper function.
     *
     * @returns {{}}
     */
    setPlayerAttributes() {
        let attrs = {}
        if ( this.state.dmPlayerAttributes ) {
            if (this.state.dmPlayerAttributes.pre_video_title !== undefined && this.state.dmPlayerAttributes.pre_video_title !== '')
                attrs.preVideoTitle = this.state.dmPlayerAttributes.pre_video_title

            if (this.state.dmPlayerAttributes.show_info_card === '1')
                attrs.showInfocard = 'true'

            if (this.state.dmPlayerAttributes.show_video_title === '1')
                attrs.showVideoTitle = 'true'

            if (this.state.dmPlayerAttributes.show_carousel_playlist === '1')
                attrs.showOutsidePlaylist = 'true'
        }

        return attrs
    }

    generateVideoContainer() {
        const videoData = this.props.attributes.videoData
        const attrs = this.setPlayerAttributes()

        // `playerId` is using only for preview, it's Yudhi's `playerId`
        if (videoData.name !== undefined && videoData.name !== '') {
            return <div className="dm-player" playlistId={videoData.id} playerId="x1ozy" {...attrs} />
        }

        if (videoData.private_id !== "" && videoData.private_id !== null) {
            return <div className="dm-player" privateVideoId={ videoData.private_id } playerId="x1ozy" {...attrs} />
        }

        return <div className="dm-player" videoId={ videoData.id } playerId="x1ozy" {...attrs} />
    }

    /**
     * Video player placeholder
     *
     * This placeholder is used to hold the position of the player.
     * So when the player re-rendered, the position is still the
     * same and not shifting.
     *
     * @returns {JSX.Element}
     */
    generatePlaceholder() {
        // let style = {}
        // if ( this.state.dmPlayerAttributes ) {
        //     if (this.state.dmPlayerAttributes.pre_video_title !== undefined && this.state.dmPlayerAttributes.pre_video_title !== '')
        //         style = { '--dm-player-ratio': '16/10.6', '--dm-fallback-ratio': '65.25%'}
        //
        //     if (this.state.dmPlayerAttributes.show_info_card === '1')
        //         style = { '--dm-player-ratio': '16/10.5', '--dm-fallback-ratio': '65.25%'}
        //
        //     if (this.state.dmPlayerAttributes.show_video_title === '1')
        //         style = { '--dm-player-ratio': '16/10.5', '--dm-fallback-ratio': '65.25%'}
        //
        //     if (this.state.dmPlayerAttributes.show_carousel_playlist === '1')
        //         style = {}
        // }

        if (this.state.playerLoading === false) {
            return <div className="dm-player__placeholder" />
        }

        return <div className="dm-player__placeholder  loading" />
    }

    onSelected() {
        if (this.props !== undefined) {
            const { isSelected } = this.props

            if (isSelected) {
                dispatch(STORE_VIDEO_STORE_KEY).setVideo(this.props.attributes.videoData)

                // Send custom event to catch on VideoBlockComponent to render a new video
                const videoActive = new CustomEvent("dm-video-active")
                document.dispatchEvent(videoActive)
            }
        }
    }

    render() {
        const videoData = this.props.attributes.videoData

        if (videoData.id === '') {
            return (
                <div className="dm-player__editor">
                    <p>No video selected, please select by click button below</p>
                    <button onClick={this.openSidebar}>Find a video</button>
                </div>
            )
        }


        return (
            <div className="dm-player__holder" onClick={this.onSelected()}>
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarButton
                            icon={ edit }
                            label="Edit"
                            onClick={ this.openSidebar }
                        />
                    </ToolbarGroup>
                </BlockControls>

                { this.generatePlaceholder() }

                { this.generateVideoContainer() }
            </div>
        )
    }
}
