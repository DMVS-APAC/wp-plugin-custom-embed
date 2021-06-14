<?php
/**
 *
 */

?>

<div class="wrap">

    <?php require DM__PATH . 'dashboard/views/general-settings/admin_header.php'; ?>

    <?php

        if ($tab === 'mandatory') {
            require DM__PATH . 'dashboard/views/general-settings/admin_mandatory.php';
        } else if($tab === 'content') {
            require DM__PATH . 'dashboard/views/general-settings/admin_content.php';
        } else if ($tab === 'player') {
            require DM__PATH . 'dashboard/views/general-settings/admin_player.php';
        }

    ?>

    <script>
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
                       console.log(res)
                    })
                } else {
                }
            })
        })
    </script>

</div>