// Wordpress packages
import { registerPlugin } from "@wordpress/plugins"
import { PluginSidebar } from "@wordpress/edit-post"
import { __ } from "@wordpress/i18n"
import { PanelBody } from "@wordpress/components"
// import { withSelect, withDispatch } from "@wordpress/data"

// Libs
import { dailymotionIcon } from "./assets/dailymotionIcon"

// Components
import VideosComponent from "./components/VideosComponent";

// let PluginMetaFields = (props) => {
//     // console.log(props)
//     return (
//         <>
//             <PanelBody
//                 title={__('Meta Fields Panel', 'textdomain')}
//                 initialOpen={true}
//                 >
//                 <TextControl
//                     value={props.text_metafield}
//                     label={__('Text Meta', 'textddomain')}
//                     onChange={(value) => props.onMetaFieldChange(value)}
//                     />
//             </PanelBody>
//         </>
//     )
// }
//
// PluginMetaFields = withSelect(
//     (select) => {
//         return {
//             text_metafield: select('core/editor').getEditedPostAttribute('meta')['_myprefix_text_metafield']
//         }
//     }
// )(PluginMetaFields)
//
// PluginMetaFields = withDispatch(
//     (dispatch) => {
//         return {
//             onMetaFieldChange: (value) => {
//                 dispatch('core/editor').editPost({meta: {_myprefix_text_metafield: value}})
//             }
//         }
//     }
// )(PluginMetaFields)

registerPlugin( 'wp-dm-ce-sidebar', {
    icon: dailymotionIcon,
    render: () => {
        return (
            <>
                <PluginSidebar
                    name="wp-dm-ce-sidebar"
                    title={__('Dailymotion Custom Embed', 'textdomain')}
                >
                    <PanelBody>
                        <VideosComponent />
                    </PanelBody>
                </PluginSidebar>
            </>
        )
    }
})
