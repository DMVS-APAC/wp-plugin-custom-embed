<?php
/**
 * Migration page
 *
 * This page is used to migrate the plugin settings from the old
 */

?>

<div class="wrap">

    <?php require DM__PATH . 'Dashboard/Views/Migration/header.php';?>


    <?php

    if ($tab !== 'database') {
        require DM__PATH . 'Dashboard/Views/Migration/convert-player.php';
    } else  {
        require DM__PATH . 'Dashboard/Views/Migration/database.php';
    }

    ?>



</div>