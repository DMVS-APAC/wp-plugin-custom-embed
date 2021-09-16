import { PanelBody } from "@wordpress/components"
import { useState, useEffect } from "@wordpress/element"
import { subscribe } from "@wordpress/data"

const videoDefault = {
    title: '',
    thumbnail_240_url: '',
    id: ''
}

export default function ClassicSelectedVideoComponent(props) {
    const [videoData, setVideoData] = useState(videoDefault)

    subscribe( e => {

    })

    function showImage() {
        return (
            <p>No video selected.</p>
        )
    }

    return (
        <PanelBody>
            { showImage }
        </PanelBody>
    )
}