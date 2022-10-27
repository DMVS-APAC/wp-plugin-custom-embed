// WordPress packages
import { registerPlugin } from "@wordpress/plugins"
import { PluginSidebar, PluginSidebarMoreMenuItem } from "@wordpress/edit-post"
import { Fragment } from "@wordpress/element"
import { __ } from "@wordpress/i18n"

// Libs
import { dailymotionIcon } from "../assets/dailymotionIcon"
import DmSdk from "../libs/dmSdk"

// Components
import ContentFinder from "./ContentFinderComponent"
// import SelectedVideo from "./SelectedVideoComponent"

/**
 * SidebarComponent
 *
 * This is a sidebar that will be appeared when user click an icon
 * or start choosing the video. It only registers the component part,
 * not much logical function here.
 *
 * The register is waiting `DmSdk` to be ready first before rendering.
 * It needs a login status to fetch data. The fetch data will be
 * happened on `VideosComponent`
 *
 */
export default class SidebarComponent {

    constructor() {
        this.setupDm()
    }

    setupDm() {
        /**
         * Waiting for dm-sdk-ready to registerPlugin
         */
        document.addEventListener('dm-sdk-ready', () => {
            this.registerSidebar()
        })

        new DmSdk()
    }

    registerSidebar() {
        registerPlugin( 'dm-sidebar-settings', {
            render: () => {
                return (
                    <Fragment>
                        <PluginSidebarMoreMenuItem
                            target="dm-sidebar-settings"
                            icon={dailymotionIcon()}
                        >
                            {__('Dailymotion', 'textdomain')}
                        </PluginSidebarMoreMenuItem>
                        <PluginSidebar
                            name="dm-sidebar-settings"
                            title={__('Dailymotion', 'textdomain')}
                            icon={dailymotionIcon()}
                        >
                            {/*<SelectedVideo />*/}
                            <ContentFinder />
                        </PluginSidebar>
                    </Fragment>
                )
            }
        })
    }
}