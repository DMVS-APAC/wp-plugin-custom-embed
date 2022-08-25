<?php
/**
 * Dailymotion Widget Box
 *
 * This is a template to show connection status on dashboard
 *
 */
?>

<div class="dm__wrapper-status"></div>

<script type="text/javascript">
    <?php
        $options = get_option('dm_ce_credentials');
    ?>

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
            apiKey: "<?php echo $options['api_key']; ?>",
            apiSecret: "<?php echo $options['api_secret']; ?>",
            status: true, // check login status
            cookie: true // enable cookies to allow the s
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

        DM.getLoginStatus(function (response) {
            if (response.session) {
                DM.api('/me', {
                    fields: ['id', 'screenname', 'username']
                }, userInfo => {
                    const wrapperStatus = document.querySelector('.dm__wrapper-status')
                    const statusText = document.createElement('p')

                    if (userInfo.error) {
                        // DM.Cookie.clear()

                        statusText.innerHTML = '<span class="dm--disconnected"></span> you\'re not connected, please sign in <a href="<?php echo get_dashboard_url(); ?>admin.php?page=dm-connect">here</a>'

                        wrapperStatus.innerHTML = ''
                        wrapperStatus.appendChild(statusText)
                    } else {
                        statusText.innerHTML = '<span class="dm--connected"></span> Hello, ' + userInfo.screenname + ', you\'re connected'

                        wrapperStatus.innerHTML = ''
                        wrapperStatus.appendChild(statusText)
                    }
                })

            } else {
                const wrapperStatus = document.querySelector('.dm__wrapper-status')

                const statusText = document.createElement('p')
                statusText.innerHTML = '<span class="dm--disconnected"></span> you\'re not connected, please sign in <a href="<?php echo get_dashboard_url(); ?>admin.php?page=dm-connect">here</a>'

                wrapperStatus.innerHTML = ''
                wrapperStatus.appendChild(statusText)
            }
        })
    })

</script>
