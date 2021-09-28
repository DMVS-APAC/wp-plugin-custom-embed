import { render } from '@wordpress/element'
import ContentFinder from "./components/ContentFinderComponent"
import SelectedVideo from './components/SelectedVideoComponent'
import DmSdk from "./libs/dmSdk"

function dmVideoSearch() {
    return (
        <>
            <SelectedVideo />
            <hr />
            <ContentFinder />
        </>
    )
}

document.addEventListener('dm-sdk-ready', () => {
    render(dmVideoSearch(), document.getElementById('dm-search-classic'))
})

new DmSdk()
