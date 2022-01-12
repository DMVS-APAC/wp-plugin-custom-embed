<?php
/**
 * The template for displaying the manual embed page.
 *
 */

?>

<div class="wrap">

    <?php require DM__PATH . 'dashboard/views/manual-embed/header.php'; ?>

    <?php

    if ($tab === 'playback') {
        require DM__PATH . 'dashboard/views/manual-embed/playback.php';
    } else if($tab === 'content') {
        require DM__PATH . 'dashboard/views/manual-embed/content.php';
    } else if ($tab === 'player') {
        require DM__PATH . 'dashboard/views/manual-embed/player.php';
    }

    ?>

</div>