import { waitFor, sleep } from "./waitFor"
import { fetchApi } from "./apiCall"
import { STORE_KEY as DM_SDK_STORE_KEY } from "../store/dmSdkStore"
import { dispatch } from "@wordpress/data"

/**
 * This is an SDK of Dailymotion script
 */
export default class DmSdk {

    constructor() {
        this.setupDm()
    }

    /**
     * Overriding the default function by DM SDK to meet the plugin needs
     *
     */
    #overrideDmVars() {
        // Override default `tokenUrl`, in some cases the tokenUrl is using graphql but in this case we use non-graphql
        DM._oauth.tokenUrl = 'https://api.dailymotion.com/oauth/token'

        // Override default `isSessionExpired` to renew the session if it's expired
        DM.Auth.isSessionExpired = (session, sessionLoadingMethod) => {
            if (typeof(session) === 'undefined') {
                session = DM._session
            }
            if (!session) {
                return true
            }
            if (session && 'expires_in' in session && new Date().getTime() < parseInt(session.expires_in, 10) * 1000) {
                return false
            }
            delete session.expires_in
            return true
        }
    }

    async setupDm() {
        // Waiting for DM to be available first
        await waitFor(() => typeof(DM) !== 'undefined', 100, 120000, "Timeout waiting for DM loaded, please refresh and make sure your internet is active")

        this.#overrideDmVars()
        await this.#initDm()
        this.#subscribeSessionChange()
        await this.#setConnectionStatus()
    }

    async #initDm() {
        // Get api-key from wp-options using custom end point
        const options = await fetchApi('/dm/v1/get-api-key')

        DM.init({
            apiKey: options.api_key,
            apiSecret: options.api_secret,
            status: true,
            cookie: true
        })
    }

    #subscribeSessionChange() {
        DM.Event.subscribe('auth.sessionChange', res => {
            // To keep user logged in in 28 days
            if (res?.status === "connected") {
                let longSession = res.session

                if(!("expires_in" in res.session)) {
                    longSession.expires_in = longSession.expires
                }

                // set the cookie expires to 28 days
                longSession.expires = longSession.expires + (3600 * 24 * 28)
                DM.Cookie.set(longSession)
            }
        })
    }

    #getDMLoginStatus() {
        return new Promise( resolve => {
            DM.getLoginStatus( response => {
                if (response.session) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }

    async #setConnectionStatus() {
        const connection = await this.#getDMLoginStatus()

        /**
         * Dispatching the connection status to the
         */
        dispatch(DM_SDK_STORE_KEY).setConnectionStatus({
            connectionStatus: connection
        })

        /**
         * This custom event is to trigger creation of the new
         * sidebar
         *
         * @type {CustomEvent<dmSdkReady>}
         */
        const dmSdkReady = new CustomEvent("dm-sdk-ready")
        document.dispatchEvent(dmSdkReady)
    }

}
