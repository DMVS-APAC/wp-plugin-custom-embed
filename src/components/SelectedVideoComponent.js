import { PanelBody } from "@wordpress/components"
import { select, subscribe } from "@wordpress/data"
import { Component } from "@wordpress/element"

/**
 * SelectedVideoComponent
 *
 * Only show the result of video selected by user
 */
export default class SelectedVideoComponent extends Component {
    /**
     * Default valur for video data
     *
     * @type {{thumbnail_240_url: string, id: string, title?: string, name?: string}}
     */
    #videoDefault = {
        title: '',
        thumbnail_240_url: '',
        id: ''
    }

    constructor(props) {
        super(props)

        this.state = {
            videoData: this.#videoDefault,
        }

        // Bind `this` to the method
        this.getContent = this.getContent.bind(this)
        this.showImage = this.showImage.bind(this)

        this.subscribes()
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
        return select('core/editor').getEditedPostAttribute('meta')['_dm_video_data']
    }

    /**
     * Set video data to the local state
     */
    setVideo() {
        const video = this.getContent()

        this.setState({
            videoData: ( video === "" ) ? this.#videoDefault : JSON.parse(video),
        })
    }

    /**
     * Subscribe to all methods available to update the state globally
     */
    subscribes() {
        subscribe( e => {
            this.setVideo()
        })
    }

    showImage() {
        if (this.state.videoData.title !== '' || this.state.videoData.name !== '') {
           return (
               <>
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
                   <span class="content__title">{
                       this.state.videoData.title ?
                           this.state.videoData.title :
                           this.state.videoData.name
                   }</span>
               </>
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
