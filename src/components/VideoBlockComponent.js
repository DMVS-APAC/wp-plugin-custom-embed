import { select, dispatch } from "@wordpress/data"
import { Component } from "@wordpress/element"
import { fetchApi } from "../libs/apiCall"
import { STORE_KEY as STORE_VIDEO_STORE_KEY } from "../store/dmVideoStore"

import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { edit } from '@wordpress/icons';

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
     * Dailymotion options
     */
    dmPlayerAttributes

    constructor(props) {
        super(props)

        this.subscribes()
    }

    /**
     * List of event listener to update the data
     *
     * 1. Video Updated
     */
    subscribes() {
        document.addEventListener('dm-video-updated', e => {
            const { isSelected } = this.props

            if (isSelected) this.setAttr()
        })
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
    async setAttr() {
        const videoData = select(STORE_VIDEO_STORE_KEY).getVideoData()

        if (videoData !== undefined) {
            this.props.setAttributes({
                videoData: videoData
            })
        }

        if (this.props.attributes.videoData.id !== '') {
            // Rerender the video player placeholder
            window.dmce.rebuild()
        }

    }

    async componentDidMount() {
        this.dmPlayerAttributes = await fetchApi('/dm/v1/get-custom-options/manual_embed_player')

        this.setAttr()
    }

    generateVideoContainer(attrs) {
        const videoData = this.props.attributes.videoData

        // `playerId` is using only for preview, it's Yudhi's `playerId`
        if (videoData.name !== undefined && videoData.name !== '') {
            return <div className="dm-player" playlistId={videoData.id} playerId="x1ozy" {...attrs} />
        }

        if (videoData.private_id !== "" && videoData.private_id !== null) {
            return <div className="dm-player" privateVideoId={ videoData.private_id } playerId="x1ozy" {...attrs} />
        }

        return <div className="dm-player" videoId={ videoData.id } playerId="x1ozy" {...attrs} />
    }

    render() {
        const videoData = this.props.attributes.videoData

        if (this.props !== undefined) {
            const { isSelected } = this.props

            if (isSelected) {
                dispatch(STORE_VIDEO_STORE_KEY).setVideo(this.props.attributes.videoData)

                // Send custom event to catch on VideoBlockComponent to render a new video
                const videoUpdated = new CustomEvent("dm-video-updated")
                document.dispatchEvent(videoUpdated)
            }
        }

        if (videoData.id === '') {
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
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarButton
                            icon={ edit }
                            label="Edit"
                            onClick={ this.openSidebar }
                        />
                    </ToolbarGroup>
                </BlockControls>

                <div className="dm-player__placeholder"></div>

                { this.generateVideoContainer(attrs) }
            </div>
        )
    }
}
