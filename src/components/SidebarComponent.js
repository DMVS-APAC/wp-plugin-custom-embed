// Wordpress packages
import { registerPlugin } from "@wordpress/plugins"
import { PluginSidebar } from "@wordpress/edit-post"
import { __ } from "@wordpress/i18n"

// Libs
import { dailymotionIcon } from "../assets/dailymotionIcon"
import DmSdk from "../libs/dmSdk"

// Components
import ContentFinder from "./ContentFinderComponent"
import SelectedVideo from "./SelectedVideoComponent"

/**
 * SidebarComponent
 *
 * This is a sidebar that will be appeared when user click an icon
 * or start choosing the video. It only register the component part,
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
            icon: dailymotionIcon,
            render: () => {
                return (
                    <>
                        <PluginSidebar
                            name="dm-sidebar-settings"
                            title={__('Dailymotion Sidebar Settings', 'textdomain')}
                        >
                            <SelectedVideo />
                            <ContentFinder />
                        </PluginSidebar>
                    </>
                )
            }
        })
    }
}