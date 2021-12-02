<?php
/**
 * The template for displaying the automated embed page.
 *
 */

?>

<div class="wrap">

    <?php require DM__PATH . 'dashboard/views/automated-embed/header.php'; ?>

    <?php

    if ($tab === 'playback') {
        require DM__PATH . 'dashboard/views/automated-embed/playback.php';
    } else if($tab === 'content') {
        require DM__PATH . 'dashboard/views/automated-embed/content.php';
    } else if ($tab === 'player') {
        require DM__PATH . 'dashboard/views/automated-embed/player.php';
    }

    ?>

</div>