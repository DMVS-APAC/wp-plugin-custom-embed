import React from 'react'
import { __ } from "@wordpress/i18n"
import { Component } from "@wordpress/element"
import { select, dispatch } from "@wordpress/data"

// Components
import { PanelBody } from "@wordpress/components"
import FormFinder from "./FormFinderComponent"
import Results from "./ResultsComponent"
import Pagination from "../../libs/pagination"

import { STORE_KEY as DM_VIDEO_STORE_KEY } from "../../store/dmVideoStore"
import { fetchApi } from "../../libs/apiCall"
import { CreateCustomEvent } from "../../libs/customEvent"

/**
 * ContentFinderComponent
 *
 */
export default class ContentFinderComponent extends Component {

    /**
     *
     * @type {string}
     */
    #editorMode = ''

    constructor(props) {
        super(props)

        const contentFields = {
            id: "",
            private: false,
            private_id: "",
            status: "",
            thumbnail_240_url: "",
            title: "",
            name: ""
        }

        this.state = {
            playlists: {},
            currentPage: 1,
            allChannels: [],
            contentChannel: "",
            content: [],
            formData: {
                keywords: "",
                channelId: "",
                findGlobal: false,
                findPlaylist: false
            },
            loading: true
        }

        // This binding is necessary to make `this` work in the callback
        this.setContent = this.setContent.bind(this)
        this.setupChannels = this.setupChannels.bind(this)
        this.findContent = this.findContent.bind(this)
        this.checkEditorMode = this.checkEditorMode.bind(this)
        this.addToBlock = this.addToBlock.bind(this)
    }

    /**
     * The function only use by the form finder
     *
     * @param {object} formData an array with value from the form finder
     */
    findContent(formData) {
        this.setState({
            formData: formData,
            loading: true
        })

        this.setContent()
    }

    async setContent(page) {
        page = page ? page : 1

        this.setState({
            currentPage: page
        })

        // Default params for search video
        const params = {
            data: {
                fields: 'id,title,thumbnail_240_url,status,private,private_id',
                limit: 10,
                flags: 'no_live,exportable,verified',
                page: page,
                sort: 'recent'
            }
        }

        // will overwrite default value if user start searching playlist
        if (this.state.formData.findPlaylist !== false) {
            params.data.fields = 'id,name,thumbnail_240_url,private'
            params.data.flags = 'verified'
        }

        if (this.state.formData.keywords !== '') {
            params.data.search = this.state.formData.keywords
        }

        const isOwners = typeof this.state.contentChannel.owners !== 'undefined'

        if ( this.state.formData.findGlobal !== true && this.state.formData.channelId ) {
            params.url = '/user/' + this.state.formData.channelId + '/videos'
        } else if ( isOwners && this.state.formData.findGlobal !== true ) {
            params.data.owners = this.state.contentChannel.owners
            params.url = '/videos'
        } else {
            params.url = '/videos'
        }

        if ( this.state.formData.findPlaylist ) {
            if (this.state.formData.findGlobal !== true && this.state.formData.channelId) {
                params.url = '/user/' + this.state.formData.channelId + '/playlists'
                delete params.data.flags
            } else if (this.state.contentChannel.owners) {
                const owner = this.state.contentChannel.owners.split(',')
                params.owner = owner[0]
                params.url = '/playlists'
            } else {
                params.url = '/playlists'
            }
        }

        this.setState({
            content: await fetchApi('/dm/v2/request-api', 'POST', params),
            loading: false
        })
    }

    async setupChannels() {
        this.setState({
            allChannels: await fetchApi('/dm/v2/get-option/channel_list'),
            contentChannel: await fetchApi('dm/v2/get-option/options_manual_embed_content')
        })
    }

    /**
     * Initiate load data
     *
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        await this.setupChannels()
        this.checkEditorMode()

        if (this.state.allChannels.length > 0) {
            this.findContent({
                keywords: "",
                channelId: this.state.allChannels[0].id,
                findGlobal: false,
                findPlaylist: false
            })
        } else {
            await this.setContent()
        }
    }

    /**
     * Check which editor is active
     *
     * @link for reference how to check which editor in use https://github.com/WordPress/gutenberg/issues/12200
     */
    checkEditorMode() {
        if ( document.body.classList.contains( 'block-editor-page' ) ) {
            this.#editorMode = 'gutenberg'
        } else {
            this.#editorMode = 'classic-editor'
        }
    }

    /**
     *
     * @param content
     */
    addToBlock(content) {
        if (this.#editorMode === 'gutenberg') {
            dispatch(DM_VIDEO_STORE_KEY).setVideo(content)

            // Send custom event to catch on VideoBlockComponent to render a new video
            CreateCustomEvent('dm-video-updated', 'dm-video-component')
        } else {
            let attrsString = ''

            if (content.private === true) {
                attrsString += ' privatevideoid="' + content.private_id + '"'
            } else if (typeof content.name !== 'undefined') {
                attrsString += ' playlistid="' + content.id + '"'
            } else {
                attrsString += ' videoid="' + content.id + '"'
            }

            wp.media.editor.insert('[dm-player' + attrsString + ']');
        }

    }

    render() {
        return (
            <PanelBody>
                <div className="dm__content-list">
                    <FormFinder channelList={this.state.allChannels} onSearching={this.findContent} />

                    { this.state.loading ? <ul className="dm__search-results"><li>{__('loading…', 'textdomain')}</li></ul> : <Results content={this.state.content} onAction={this.addToBlock}></Results> }

                    <Pagination currentPage={this.state.currentPage} callback={this.setContent} contentData={this.state.content} />

                </div>
            </PanelBody>
        )
    }
}
