import { PanelBody } from "@wordpress/components"
import { select } from "@wordpress/data"
import { Component } from "@wordpress/element"
import { STORE_KEY as STORE_VIDEO_STORE_KEY } from "../store/dmVideoStore"
import { sleep } from "../libs/waitFor"


/**
 * SelectedVideoComponent
 *
 * Only show the result of video selected by user
 */
export default class SelectedVideoComponent extends Component {
    /**
     * Default value for video data
     *
     * @type {{thumbnail_240_url: string, id: string, title?: string, name?: string}}
     */
    #videoDefault = {
        id: "",
        private: false,
        private_id: "",
        status: "",
        thumbnail_240_url: "",
        title: "",
        name: "",
    }

    /**
     *
     * @type {string}
     */
    #editorMode = ''

    constructor(props) {
        super(props)

        this.state = {
            videoData: this.#videoDefault,
        }

        this.#editorMode = this.#checkEditorMode()

        // Bind `this` to the method
        this.getContent = this.getContent.bind(this)
        this.showImage = this.showImage.bind(this)

        this.subscribes()
    }


    #checkEditorMode() {
        if ( document.body.classList.contains( 'block-editor-page' ) ) {
            return 'gutenberg'
        }

        return 'classic-editor'
    }

    componentDidMount() {
        this.setVideo()
    }

    /**
     * Get video data from state management
     *
     * @returns {{thumbnail_240_url: string, id: string, title: string}}
     */
    getContent() {
        return select(STORE_VIDEO_STORE_KEY).getVideoData()
    }

    /**
     * Set video data to the local state
     */
    setVideo() {
        const video = this.getContent()

        this.setState({
            videoData: ( video === undefined ) ? this.#videoDefault : video,
        })
    }

    /**
     * Subscribe to all methods available to update the state globally
     */
    subscribes() {
        document.addEventListener('dm-video-updated', e => {
            this.setVideo()
        })
    }

    showImage() {
        if (this.state.videoData.title !== '' || this.state.videoData.name !== '') {
           return (
               <div className="selected-video">
                   <h3>Selected video</h3>
                   <figure className="content__image-wrapper">
                       <div className="content__placement">
                           <img src={this.state.videoData.thumbnail_240_url} alt={
                               this.state.videoData.title ?
                                this.state.videoData.title :
                                this.state.videoData.name
                           } className="content__thumbnail" />
                       </div>
                   </figure>
                   <span className="content__title" title={
                       this.state.videoData.title ?
                        this.state.videoData.title :
                        this.state.videoData.name}>{
                       this.state.videoData.title ?
                           this.state.videoData.title :
                           this.state.videoData.name
                   }</span>
               </div>
           )
        }

        return (
            <p>No video selected.</p>
        )
    }

    render() {
        return (
            <PanelBody>
                { this.showImage }
            </PanelBody>
        )
    }
}
