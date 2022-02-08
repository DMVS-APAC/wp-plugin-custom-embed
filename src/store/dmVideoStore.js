import { createReduxStore, register } from '@wordpress/data'

export const STORE_KEY = 'data/dm-video'

const DEFAULT_STATE = {
    id: "",
    private: false,
    private_id: "",
    status: "",
    thumbnail_240_url: "",
    title: "",
    name: ""
}

const actions = {
    setVideo(videoData) {
        return {
            type: 'SET_VIDEO',
            videoData
        }
    }
}

const STORE_CONFIG = {
    reducer(state = DEFAULT_STATE, action) {
        switch (action.type) {
            case 'SET_VIDEO':
                return {
                    videoData: action.videoData
                }
            default:
                return state
        }
    },

    actions,

    selectors: {
        getVideoData(state) {
            return state.videoData
        }
    },
}

const dmVideoStore = createReduxStore( STORE_KEY, STORE_CONFIG)

register(dmVideoStore)
