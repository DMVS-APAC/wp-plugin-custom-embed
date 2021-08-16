import { createReduxStore, register} from "@wordpress/data"

export const STORE_KEY = 'data/dm-sdk'

// TODO: refactor the code to avoid spageti code. The way consume this store

const DEFAULT_STATE = {
    connectionStatus: null
}

const actions = {
    setConnectionStatus(status) {
        return {
            type: 'SET_CONNECTION_STATUS',
            status
        }
    },
}

const STORE_CONFIG = {
    reducer(state = DEFAULT_STATE, action) {
        switch(action.type) {
            case 'SET_CONNECTION_STATUS':
                return {
                    connectionStatus: action.status
                }
        }

        return state
    },

    actions,

    selectors: {
        getConnectionStatus(state){
            return state.connectionStatus
        }
    }
}


const dmSdkStore = createReduxStore( STORE_KEY, STORE_CONFIG)

register(dmSdkStore)
