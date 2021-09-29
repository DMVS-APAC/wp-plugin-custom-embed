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

    useEffect(() => {
        console.log('aha')
    })

    const setVideo = () => {
        // const video = getVideo()

        setVideoData({
            title: 'nganu',
            id: '234'
        })
    }

    const showImage = () => {
        if ( videoData.title !== '' || videoData.name !== '') {
            return (
                <>
                    Video is here!
                </>
            )
        }

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