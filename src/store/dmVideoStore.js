import { createReduxStore, register } from '@wordpress/data'

const DEFAULT_STATE = {
    videoData: {}
}

const actions = {
    setVideo(videoData) {
        return {
            type: 'SET_VIDEO',
            videoData
        }
    },

    getVideo() {
        return {
            type: 'GET_VIDEO'
        }
    }
}

const dmVideoStore = createReduxStore( 'dm-video', {
    reducer(state = DEFAULT_STATE, action) {
        switch (action.type) {
            case 'SET_VIDEO':
                return {
                    ...state,
                    videoData: action.videoData
                }
            case 'GET_VIDEO':
                return {
                    ...state
                }
            default:
                return state
        }
    },

    actions,

    selectors: {},

    controls: {},

    resolvers: {}
})

register(dmVideoStore)
