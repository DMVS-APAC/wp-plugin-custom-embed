<?php
/**
 * Page to connect to dailymotion account
 *
 * Some styles is using WordPress default style
 *
 */
?>

<div class="wrap">

    <h1 class="wp-heading-inline">
        <?php echo __('Connect to Dailymotion Account'); ?>
    </h1>

    <hr class="wp-header-end">

    <!-- the container -->
    <div id="main-content" class="dm__box-wrapper  dm--text-center  dm--first-child-bold">
        <?php if ( empty($options['api_key']) ): ?>
            <p>You must store your API key <a href="<?php echo get_dashboard_url(); ?>/admin.php?page=dm-credentials">here</a></p>
        <?php endif; ?>
    </div>


    <?php if ( !empty($options['api_key']) ): ?>
        <template id="login">
            <p><?php echo __('Sign in with your Dailymotion account'); ?></p>

            <button class="dm__primary-button" onClick="loginDm()"><?php echo __('Login'); ?></button>
        </template>

        <template id="loggedin">
            <p class="greetings"><?php echo __('Hello'); ?></p>
            <img class="dm__avatar"/><br/>
            <button class="dm__primary-button" onClick="logoutDm()"><?php echo __('Logout'); ?></button>
        </template>

        <script type="text/javascript">
            const apiKey = "<?php echo $options['api_key']; ?>"
            const apiSecret = "<?php echo $options['api_secret']; ?>"
            const redirectUri = "<?php echo get_dashboard_url(); ?>/admin.php?page=dm-connect"
            const apiUrl = "<?php echo rest_url(); ?>"
            const wpNonce = "<?php echo wp_create_nonce('wp_rest'); ?>"

            window.dmAsyncInit = function () {
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

                DM.getLoginStatus(function (response) {
                    if (response.session) {
                        DM.api('/me', {
                            fields: ['id', 'screenname', 'avatar_120_url', 'username']
                        }, userInfo => {
                            if (userInfo.error) {
                                DM.Cookie.clear()
                                showLogin()
                            } else {
                                showLogout(userInfo)
                            }
                        })
                    } else {
                        loginWithCode()
                    }
                })
            }

            const mainContent = document.querySelector('#main-content')

            /**
             * This is will show a login button for user to login
             *
             */
            const showLogin = () => {
                const template = document.querySelector('#login')
                const clone = template.content.cloneNode(true)

                mainContent.innerHTML = ''
                mainContent.appendChild(clone)
            }

            /**
             * When user logged in, this will that their were logged in and can do logout
             *
             * @param userInfo
             */
            const showLogout = (userInfo) => {
                const template = document.querySelector('#loggedin')
                const clone = template.content.cloneNode(true)

                if (userInfo.screenname) {
                    const greetings = clone.querySelector('.greetings')
                    greetings.textContent = 'Hello ' + userInfo.screenname

                    const avatar = clone.querySelector('.dm__avatar')
                    avatar.setAttribute('src', userInfo.avatar_120_url)
                    avatar.setAttribute('alt', userInfo.screenname)
                }

                mainContent.innerHTML = ''
                mainContent.appendChild(clone)
            }

            /**
             * Login
             */
            const loginDm = () => {
                let state = GetURLParameter("state") ?? 'dmauth_' + DM.guid();

                DM.login(res => {
                    if (res.session) {
                        DM.api('/me', {
                            fields: ['id', 'screenname', 'avatar_120_url', 'username']
                        }, userInfo => {
                            // Save the DM user logged in
                            fetch( apiUrl + 'dm/v1/userinfo', {
                                method: 'POST',
                                credentials: 'same-origin',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-WP-Nonce': wpNonce
                                },
                                body: JSON.stringify(userInfo.username)
                            })
                            .then( res => res.json())
                            .then( data => {
                                // nothing to do on this section
                                // console.log(data) // for debugging
                            })
                            .catch( err => {
                                // console.log(err)
                            })

                            showLogout(userInfo)
                        })
                    }

                }, {
                    scope: ['userinfo', 'manage_videos', 'manage_players'],
                    response_type: 'code',
                    display: 'popup',
                    redirect_uri: redirectUri,
                    state: state,
                })
            }

            /**
             * Logout
             */
            const logoutDm = () => {
                DM.logout(res => {
                    showLogin()
                })
            }


            let loginWithCode = () => {
                let code = GetURLParameter("code");
                let state = GetURLParameter("state") ?? 'dmauth_' + DM.guid();

                if (typeof code === "undefined") {
                    showLogin()
                } else {
                    var xhr = DM.ApiServer.xhr();
                    var params = {
                        'grant_type': 'authorization_code',
                        'client_id': DM._apiKey,
                        'client_secret': DM._apiSecret,
                        'redirect_uri': redirectUri,
                        'code': code,
                        'state': state,
                    };
                    xhr.open('POST', 'https://api.dailymotion.com/oauth/token')
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhr.send(DM.QS.encode(params));
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState == 4) {
                            var globalError = {
                                    error: {
                                        code: 500,
                                        message: 'Invalid server response',
                                        type: 'transport_error'
                                    }
                                },
                                response;

                            if (xhr.status) {
                                try {
                                    response = DM.JSON.parse(xhr.responseText);
                                } catch (e) {
                                }
                            }

                            if (DM.type(response) != 'object') {
                                response = globalError
                                DM.error('Cannot parse call response data ' + xhr.responseText)
                            }
                            if (xhr.status && xhr.status !== 200) {
                                response = globalError
                            }

                            var newSession = response.access_token ? response : null
                            newSession.state = state
                            window.location.replace(redirectUri + "#" + DM.QS.encode(newSession))
                        }
                    };
                }

            }

            function GetURLParameter(sParam) {
                var sPageURL = window.location.search.substring(1);
                var sURLVariables = sPageURL.split('&');

                for (var i = 0; i < sURLVariables.length; i++) {
                    var sParameterName = sURLVariables[i].split('=');
                    if (sParameterName[0] == sParam) {
                        return sParameterName[1];
                    }
                }
            }
        </script>

    <?php endif; ?>

</div>
