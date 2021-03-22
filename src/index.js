import { registerPlugin } from "@wordpress/plugins"
import { PluginSidebar } from "@wordpress/edit-post"
import { __ } from "@wordpress/i18n"
import { PanelBody } from "@wordpress/components"

const dailymotionIcon = () => {
    return <svg width="16" height="16" viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false"><path class="path" d="m12.1479 18.5957c-2.4949 0-4.28131-1.7558-4.28131-4.0658 0-2.2176 1.78641-4.0965 4.09651-4.0965 2.2793 0 4.0349 1.7864 4.0349 4.1581 0 2.2794-1.7556 4.0042-3.8501 4.0042zm8.3521-18.5957-4.5329 1v7c-1.1088-1.41691-2.8028-1.8787-4.8049-1.8787-2.09443 0-3.97329.76993-5.5133 2.27917-1.72483 1.66323-2.6489 3.78863-2.6489 6.16033 0 2.5873.98562 4.8049 2.89526 6.499 1.44763 1.2936 3.17251 1.9402 5.17454 1.9402 1.9713 0 3.4498-.5236 4.8973-1.9402v1.9402h4.5329c0-7.6359 0-15.3641 0-23z" fill="#333436"></path></svg>
}

// console.log('hello!', DM)
const videoList = () => {
    let waitingForDM = setInterval( () => {
        if (DM !== undefined) {
            clearInterval(waitingForDM)
        }
    }, 100)

    // console.log('DM is ready', DM)
}


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
                        Some Content
                    </PanelBody>
                </PluginSidebar>
            </>
        )
    }
})