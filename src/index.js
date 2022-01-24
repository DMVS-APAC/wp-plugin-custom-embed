import { registerBlockType } from '@wordpress/blocks'
import { select } from "@wordpress/data"
import { __ } from "@wordpress/i18n"
import {fetchApi} from "./libs/apiCall"

// Video block
import VideoBlock from "./components/VideoBlockComponent"

registerBlockType( 'dm-settings/click-embed', {
    title: __('Dailymotion Embed'),
    icon: <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.65916 7.27658C6.6612 7.27658 5.94664 6.58953 5.94664 5.68561C5.94664 4.81786 6.6612 4.08263 7.58524 4.08263C8.49696 4.08263 9.1992 4.78166 9.1992 5.70972C9.1992 6.60166 8.49696 7.27658 7.65916 7.27658V7.27658ZM11 0L9.18684 0.391304V3.13043C8.74332 2.57599 8.06572 2.39529 7.26488 2.39529C6.42711 2.39529 5.67556 2.69657 5.05956 3.28714C4.36963 3.93797 4 4.76965 4 5.6977C4 6.71013 4.39425 7.57788 5.1581 8.24079C5.73716 8.74698 6.42711 9 7.22792 9C8.01644 9 8.60784 8.79511 9.18684 8.24079V9H11C11 6.01204 11 2.98796 11 0Z" fill="#000"/><path d="M0.902344 5.79883L3.04199 6.66357V7.3335L0.246094 6.03809V5.53906L3.04199 4.24707V4.91699L0.902344 5.79883Z" fill="#000"/><path d="M14.7173 5.77832L12.458 4.89307V4.24365L15.377 5.53564V6.03467L12.458 7.33008V6.67383L14.7173 5.77832Z" fill="#000"/></svg>,
    category: 'embed',
    keywords: [
        __('Dailymotion'),
        __('Embed')
    ],

    // TODO: preapare the block for future use
    attributes: {
        videoData: {
            type: 'object',
            default: {
                id: "",
                private: false,
                private_id: "",
                status: "",
                thumbnail_240_url: "",
                title: ""
            }
        },
    },
    edit: VideoBlock,
    // edit: props => { return ( <h3> Hahaha </h3> )},
    // No information saved to the block
    // Data is saved to post meta via the hook
    save: props => {

        // TODO: Code below will be removed in future versions
        const blocks = select('core/editor').getBlocks()

        if (blocks.length !== 0) {
            for (let i = 0; i < blocks.length; i++) {
                if (blocks[i].name === 'dm-settings/click-embed') {

                    dispatch('core/editor').editPost({
                        meta: {
                            _dm_player_position: i
                        }
                    })

                }
            }
        }

        return null

        // TODO: will be migrated using code below
        // const postId = select("core/editor").getCurrentPostId()
        // let videoData = await fetchApi('/dm/v1/custom-post-meta/',
        //     'POST',
        //     { post_id: postId, meta_name: '_dm_video_data'}
        // )
        // let attrs = ''
        //
        // if (videoData !== '') {
        //     videoData = JSON.parse(videoData)
        //     console.log('dm: ', videoData)
        //
        //     if (videoData.private_id !== undefined) {
        //         attrs = `privatevideoid="${videoData.private_id}"`
        //     } else {
        //         attrs = `videoid="${videoData.id}"`
        //     }
        //
        //     return 'haha' //'[dm-player ' + attrs + ']'
        // }

        // return '<div class="dm-player" sort="recent" owners="kompastv"></div>'
        // console.log('dm: Hoho', props)
        // return <div>Hahaha</div>

    },
} )


// Sidebar
import Sidebar from "./components/SidebarComponent"

new Sidebar()
