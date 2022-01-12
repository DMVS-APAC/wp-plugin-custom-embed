<?php
/**
 * Playback settings tab page
 *
 * @since 1.1.0-6
 */

?>

<form action="<?php echo esc_url( get_admin_url() . 'admin.php?page=dm-manual-embed-settings&action=save_data' ); ?>" method="post">

    <?php wp_nonce_field("dm_save_data", "dm_save_data", true); ?>

    <table class="form-table  dm-form-table" role="presentation">

        <tbody>

        <tr>
            <th scope="row"><label for="player-id"><?php echo esc_html('Manual Embed Player ID'); ?> <span class="detail-info">?<span class="tooltip">to create or modify a player template, refer to this page <a href="https://www.dailymotion.com/partner/embed/players">in your dailymotion partner HQ</a></span></span></label></th>
            <td>
                <select name="player_id" id="player-id" class="regular-text">
                    <option value="">--</option>
                </select>
            </td>
        </tr>

        </tbody>

    </table>

    <p class="submit">
        <input type="submit" name="submit" id="submit" class="button button-primary" value="Save">
    </p>

    <script type="text/javascript">
        const apiKey = "<?php echo isset($credentials['api_key']) ? esc_js( $credentials['api_key'] ) : ''; ?>"
        const apiSecret = "<?php echo isset($credentials['api_secret']) ? esc_js( $credentials['api_secret'] ) : ''; ?>"
        const playerId = "<?php echo isset($options['player_id']) ? esc_js( $options['player_id'] ) : ''; ?>"

        if ( apiKey !== '' && apiSecret !== '') {
            window.addEventListener('load', (e) => {
                DM._oauth.tokenUrl = 'https://api.dailymotion.com/oauth/token'
                DM.Auth.isSessionExpired = (session, sessionLoadingMethod) => {
                    if (typeof (session) === 'undefined') {
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

                DM.init({
                    apiKey: apiKey,
                    apiSecret: apiSecret,
                    status: true,
                    cookie: true
                })

                DM.Event.subscribe('auth.sessionChange', res => {
                    // To keep user logged in in 30 days
                    if (res?.status === "connected") {
                        let longSession = res.session

                        if (!("expires_in" in res.session)) {
                            longSession.expires_in = longSession.expires
                        }

                        longSession.expires = longSession.expires + (3600 * 24 * 28)
                        DM.Cookie.set(longSession)
                    }
                })


                DM.getLoginStatus(response => {
                    const playerIdSelector = document.querySelector('#player-id')

                    if (response.session) {
                        DM.api('/user/<?php echo esc_attr( $dmUser['channel'] ); ?>/players', {
                            fields: ['id', 'label']
                        }, players => {

                            if (Object.entries(players.list).length !== 0) {

                                for (let i = 0; i < players.list.length; i++) {
                                    const option = document.createElement('option')
                                    option.innerText = players.list[i].id + ' - ' + players.list[i].label
                                    option.setAttribute('value', players.list[i].id)

                                    if (players.list[i].id === playerId) {
                                        option.setAttribute('selected', 'true')
                                    }

                                    playerIdSelector.appendChild(option)
                                }

                            }

                        })
                    } else if (playerId) {
                        const option = document.createElement('option')
                        option.innerText = playerId
                        option.setAttribute('selected', 'true')

                        playerIdSelector.appendChild(option)
                        playerIdSelector.setAttribute('disabled', 'true')
                    }
                })
            }) // load event listener
        } // if statement
    </script>
</form>
