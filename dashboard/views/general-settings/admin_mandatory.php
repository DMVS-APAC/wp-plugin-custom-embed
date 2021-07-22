<?php
/**
 * Mandatory settings tab page
 *
 */
?>

<form action="<?php echo get_admin_url() . 'admin.php?page=dm-general-settings&action=save_data'; ?>" method="post">

    <?php wp_nonce_field("dm_save_data", "dm_save_data", true); ?>

    <table class="form-table" role="presentation">

        <tbody>

        <tr>
            <th scope="row"><label for="player-id"><?php echo __('Player ID'); ?> <span class="detail-info">?<span class="tooltip">You can get PLAYER ID from <a href="https://www.dailymotion.com/partner/embed/players" target="_blank">Dailymotion partner HQ</a> in the player tab, inside the embed menu.</span></span></label></th>
            <td>
                <select name="player_id" id="player-id" class="regular-text">
                    <option value="">--</option>
                </select>
            </td>
        </tr>


        <tr>
            <th scope="row"><label for="sort-by"><?php echo __('Sort by'); ?> <span class="detail-info">?<span class="tooltip">This will rank the video search results by the preferred sorting method. Pick <strong>relevance</strong> for contextual embed or <strong>recent</strong> to get the latest video for instance.</span></span></label></th>
            <td>
                <select name="sort_by" type="text" id="sort-by" class="regular-text" required>
                    <option value="least-visited" <?php echo ($options['sort_by'] == 'least-visited') ? 'selected' : ''; ?>><?php echo __('Least Visited'); ?></option>
                    <option value="live-audience" <?php echo ($options['sort_by'] == 'live-audience') ? 'selected' : ''; ?>><?php echo __('Live Audience'); ?></option>
                    <option value="old" <?php echo ($options['sort_by'] == 'old') ? 'selected' : ''; ?>><?php echo __('Old'); ?></option>
                    <option value="random" <?php echo ($options['sort_by'] == 'random') ? 'selected' : ''; ?>><?php echo __('Random'); ?></option>
                    <option value="recent" <?php echo ($options['sort_by'] == 'recent') ? 'selected' : ''; ?>><?php echo __('Recent'); ?></option>
                    <option value="relevance" <?php echo (empty($options['sort_by']) || $options['sort_by'] == 'relevance') ? 'selected' : ''; ?>><?php echo __('Relevance'); ?></option>
                    <option value="trending" <?php echo ($options['sort_by'] == 'trending') ? 'selected' : ''; ?>><?php echo __('Trending'); ?></option>
                    <option value="visited" <?php echo ($options['sort_by'] == 'visited') ? 'selected' : ''; ?>><?php echo __('Visited'); ?></option>
                    <option value="visited-hour" <?php echo ($options['sort_by'] == 'visited-hour') ? 'selected' : ''; ?>><?php echo __('Visited Hour'); ?></option>
                    <option value="visited-month" <?php echo ($options['sort_by'] == 'visited-month') ? 'selected' : ''; ?>><?php echo __('Visited Month'); ?></option>
                    <option value="visited-today" <?php echo ($options['sort_by'] == 'visited-today') ? 'selected' : ''; ?>><?php echo __('Visited Today'); ?></option>
                    <option value="visited-week" <?php echo ($options['sort_by'] == 'visited-week') ? 'selected' : ''; ?>><?php echo __('Visited Week'); ?></option>
                </select>
            </td>
        </tr>

        </tbody>

    </table>

    <p class="submit">
        <input type="submit" name="submit" id="submit" class="button button-primary" value="Save">
    </p>

    <script type="text/javascript">
        const apiKey = "<?php echo $credentials['api_key']; ?>"
        const apiSecret = "<?php echo $credentials['api_secret']; ?>"
        const playerId = "<?php echo $options['player_id']; ?>"

        window.addEventListener('load', (e) => {
            DM._oauth.tokenUrl = 'https://api.dailymotion.com/oauth/token'
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

                    if(!("expires_in" in res.session)) {
                        longSession.expires_in = longSession.expires
                    }

                    longSession.expires = longSession.expires + (3600 * 24 * 28)
                    DM.Cookie.set(longSession)
                }
            })


            DM.getLoginStatus( response => {
                const playerIdSelector = document.querySelector('#player-id')

                if (response.session) {
                    DM.api('/user/<?php echo $dmUser; ?>/players', {
                        fields: ['id', 'label']
                    }, players => {

                        if (Object.entries(players.list).length !== 0) {

                            for (let i = 0; i < players.list.length; i++) {
                                const option = document.createElement('option')
                                option.innerText = players.list[i].id + ' - ' + players.list[i].label
                                option.setAttribute('value', players.list[i].id)

                                if ( players.list[i].id === playerId) {
                                    option.setAttribute('selected', 'true')
                                }

                                playerIdSelector.appendChild(option)
                            }
                        }

                    })
                } else if (playerId) {
                    console.log(playerId)
                    const option = document.createElement('option')
                    option.innerText = playerId
                    option.setAttribute('selected', 'true')

                    playerIdSelector.appendChild(option)
                    playerIdSelector.setAttribute('disabled', 'true')
                }
            })
        })
    </script>
</form>
