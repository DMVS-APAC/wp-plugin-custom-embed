import { fetchApi } from "../libs/apiCall"
import { __ } from "@wordpress/i18n"
import { dispatch } from "@wordpress/data"
import { Component } from "@wordpress/element"
import { waitFor, sleep } from "../libs/waitFor"

// Components
import { PanelBody } from "@wordpress/components"
import Videos from "./VideosComponent"
import Playlist from "./PlaylistComponent"

export default class FindContentComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            playlists: {},
            keywords: "",
            findKeywords: "",
            currentPage: 1,
            globalVideo: false,
            findGlobal: false,
            findPlaylist: false,
            connectionStatus: null
        }

        // This binding is necessary to make `this` work in the callback
        this.findVideo = this.findVideo.bind(this)
        this.setKeywords = this.setKeywords.bind(this)
        this.setGlobalVideo = this.setGlobalVideo.bind(this)
        this.setFindPlaylist = this.setFindPlaylist.bind(this)
    }

    async initDm() {
        await waitFor(() => DM !== undefined, 100, 10000, "Timeout waiting for DM loaded, please refresh and make sure your internet is active")

        // Get api-key
        const options = await fetchApi('/dm/v1/get-api-key')

        DM._oauth.tokenUrl = 'https://api.dailymotion.com/oauth/token'
        DM.Auth.isSessionExpired = (session, sessionLoadingMethod) => {
            if (typeof(session) === 'undefined') {
                session = DM._session;
            }
            if (!session) {
                return true;
            }
            if (session && 'expires_in' in session && new Date().getTime() < parseInt(session.expires_in, 10) * 1000) {
                return false;
            }
            delete session.expires_in;
            return true;
        }

        DM.init({
            apiKey: options.api_key,
            apiSecret: options.api_secret,
            status: true,
            cookie: true
        })

        DM.Event.subscribe('auth.sessionChange', res => {
            // To keep user logged in in 28 days
            if (res?.status === "connected") {
                let longSession = res.session

                if(!("expires_in" in res.session)) {
                    longSession.expires_in = longSession.expires
                }

                longSession.expires = longSession.expires + (3600 * 24 * 28)
                DM.Cookie.set(longSession)
            }
        })
    }

    getDMLoginStatus() {
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

    async checkConnectionStatus() {
        const isConnected = await this.getDMLoginStatus()

        let connectionStatus
        if (isConnected) {
            connectionStatus = <><span className="dm--connected"></span> {__("You're connected", "textdomain")}</>
        } else {
            connectionStatus = <><span className="dm--disconnected"></span> {__("You're not connected", "textdomain")}</>
        }

        this.setState({
            connectionStatus: connectionStatus
        })
    }

    async componentDidMount() {
        await this.initDm()
        await this.checkConnectionStatus()
    }



    async findVideo(e) {
        e.preventDefault()

        this.setState({
            findKeywords: this.state.keywords,
            findGlobal: this.state.globalVideo
        })
    }

    setKeywords(e) {
        this.setState({
            keywords: e.target.value
        })
    }

    setGlobalVideo(e) {
        this.setState({
            globalVideo: (e.target.checked === true)
        })
    }

    setFindPlaylist(e) {
        this.setState({
            findPlaylist: (e.target.checked === true)
        })
    }

    render() {
        return (
            <PanelBody>
                <div className="dm__content-list">
                    <p>{ this.state.connectionStatus }</p>
                    <form onSubmit={this.findVideo}>
                        <label htmlFor="keywords">{__("Find a video", "textdomain")}</label>
                        <input id="keywords"
                               onChange={this.setKeywords}
                               type="text"
                               name="keywords"
                               className="dm__keywords-input"
                        />
                        <button type="submit" className="action button">Find</button>
                    </form>

                    <label htmlFor="global-video" className="checkbox-label">
                        <input type="checkbox"
                               id="global-video"
                               onChange={this.setGlobalVideo}
                               name="globalVideo"
                               value="1"
                        /> {__("Find global", "textdomain")}
                    </label>

                    <label htmlFor="find-playlist" className="checkbox-label">
                        <input type="checkbox"
                                id="find-playlist"
                               onChange={this.setFindPlaylist}
                               name="findPlaylist"
                               value="1"
                        /> {__("Find playlist", "textdomain")}
                    </label>

                    { this.state.findPlaylist ?
                        <Playlist keywords={this.state.findKeywords} globalVideo={this.state.findGlobal} /> :
                        <Videos keywords={this.state.findKeywords} globalVideo={this.state.findGlobal} />
                    }

                </div>
            </PanelBody>
        )
    }
}
