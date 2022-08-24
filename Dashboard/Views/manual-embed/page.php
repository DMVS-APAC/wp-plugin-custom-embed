<?php
/**
 * The template for displaying the manual embed page.
 *
 */

?>

<div class="wrap">

    <?php require DM__PATH . 'Dashboard/Views/manual-embed/header.php'; ?>

    <?php

    if ($tab === 'playback') {
        require DM__PATH . 'Dashboard/Views/manual-embed/playback.php';
    } else if($tab === 'content') {
        require DM__PATH . 'Dashboard/Views/manual-embed/content.php';
    } else if ($tab === 'player') {
        require DM__PATH . 'Dashboard/Views/manual-embed/player.php';
    }

    ?>

</div>