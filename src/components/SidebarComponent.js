// Wordpress packages
import { registerPlugin } from "@wordpress/plugins"
import { PluginSidebar } from "@wordpress/edit-post"
import { __ } from "@wordpress/i18n"

// Libs
import { dailymotionIcon } from "../assets/dailymotionIcon"

// Components
import FindContent from "./FindContentComponent"
import SelectedVideo from "./SelectedVideoComponent"

export default class SidebarComponent {

    static registerSidebar() {
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
                            <FindContent />
                        </PluginSidebar>
                    </>
                )
            }
        })
    }
}