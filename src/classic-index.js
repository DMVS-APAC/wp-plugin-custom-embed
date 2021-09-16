import { render, createElement } from '@wordpress/element'
import ContentFinder from "./components/ContentFinderComponent"
import ClassicSelectedVideo from './components/ClassicSelectedVideoComponent'
import DmSdk from "./libs/dmSdk"

function dmVideoSearch() {
    return (
        <>
            <ClassicSelectedVideo />
            <ContentFinder />
        </>
    )
}

document.addEventListener('dm-sdk-ready', () => {
    render(dmVideoSearch(), document.getElementById('dm-search-classic'))
})

new DmSdk()
