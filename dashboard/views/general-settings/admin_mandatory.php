<?php
/**
 * Mandatory settings tab page
 *
 * @since 1.0.0
 */

$sorts = [
    'least-visited' => 'Least Visited',
    'live-audience' => 'Live Audience',
    'old' => 'Old',
    'random' => 'Random',
    'recent' => 'Recent',
    'relevance' => 'Relevance',
    'trending' => 'Trending',
    'visited' => 'Visited',
    'visited-hour' => 'Visited Hour',
    'visited-month' => 'Visited Month',
    'visited-today' => 'Visited Today',
    'visited-week' => 'Visited Week'
];
?>

<form action="<?php echo get_admin_url() . 'admin.php?page=dm-general-settings&action=save_data'; ?>" method="post">

    <?php wp_nonce_field("dm_save_data", "dm_save_data", true); ?>

    <table class="form-table" role="presentation">

        <tbody>

        <tr>
            <th scope="row"><label for="player-id"><?php echo __('Player ID'); ?></label></th>
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
                    <?php
                        foreach ($sorts as $sort => $string) {
                            echo '<option value="' . $sort . '" ';
                                if ( isset($options['sort_by']) && $options['sort_by'] === $sort
                                    || !isset($options['sort_by']) && $sort === 'relevance'
                                ) {
                                    echo 'selected';
                                }
                            echo '>' . __($string) . '</option>';
                        }
                    ?>
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
