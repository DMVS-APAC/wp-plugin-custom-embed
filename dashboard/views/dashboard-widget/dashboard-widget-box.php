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

    window.addEventListener('load', (e) => {
        DM.init({
            apiKey: '1f231cd70200e621bcfd',
            status: true, // check login status
            cookie: true // enable cookies to allow the s
        })

        DM.getLoginStatus(function (response) {
            if (response.session) {
                DM.api('/me', {
                    fields: ['id', 'screenname', 'username']
                }, res => {
                    const wrapperStatus = document.querySelector('.dm__wrapper-status')

                    const statusText = document.createElement('p')
                    statusText.innerHTML = '<span class="dm--connected"></span> Hello, ' + res.screenname + ', you\'re connected'

                    wrapperStatus.innerHTML = ''
                    wrapperStatus.appendChild(statusText)
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
