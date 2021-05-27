// import { registerBlockType, getBlockContent } from '@wordpress/blocks'
import {dispatch, select} from "@wordpress/data"
import {Component} from "@wordpress/element"

export default class VideoBlockComponent extends Component {
    /**
     * Store previous player position
     */
    #prevPos

    /**
     * Store previous video id
     */
    prevVideoId

    /**
     * Video
     */
    video

    /**
     * Initial fetch data
     * @type {boolean}
     */
    init = false

    constructor(props) {
        super(props)

        this.subscribes()

        this.state = props.attributes
    }

    subscribes() {
        document.addEventListener('dm-video-updated', e => {
            this.setAttr()
        })
    }

    /**
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
     * Render video when the player updated
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

    openSidebar() {
        const dmButton = document.querySelector('button[aria-label="Dailymotion Sidebar Settings"]')
        dmButton.click()
    }

    setAttr() {
        const video = this.getVideo()

        if (video !== null) {
            this.setState({videoId: video.id})

            // this.prevVideoId = video.id

            // Rerender the video player placeholder
            window.dmce.rebuild()
        }
    }

    componentDidMount() {
        this.setAttr()
    }

    componentWillUnmount() {
        dispatch('core/editor').editPost({
            meta: {
                _dm_player_position: -1
            }
        })
    }

    render() {
        this.updatePosition()
        console.log('editing', this.state.videoId)

        if (this.state.videoId === '' || this.state.videoId === undefined) {
            return (
                <div className="dm-player__editor">
                    <p>No video selected, please select by click button below</p>
                    <button onClick={this.openSidebar}>Find a video</button>
                </div>
            )
        }

        // `playerId` is using only for preview, it's Yudhi's `playerId`
        return (
            <div className="dm-player__holder">
                <p>
                    <span className="dashicons dashicons-edit-large"/> Dailymotion Player
                </p>
                <div className="dm-player" videoId={this.state.videoId} playerId="x1ozy"/>
            </div>
        )
    }
}
