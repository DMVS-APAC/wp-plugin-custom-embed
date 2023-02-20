<?php
/**
 * The template for displaying the automated embed page.
 *
 */

?>

<style>
    .hide-content .nav-tab-wrapper, .hide-content #automated-embed-form, .hide-content .dm__box-wrapper {
        display: none;
    }
</style>

<div class="wrap <?php echo ( $auto_embed == '' && $auto_embed == 0 ) ? 'hide-content' : '' ?>">

    <?php require DM__PATH . 'Dashboard/Views/AutomatedEmbed/header.php'; ?>

    <?php

    if ($tab === 'playback') {
        require DM__PATH . 'Dashboard/Views/AutomatedEmbed/playback.php';
    } else if($tab === 'content') {
        require DM__PATH . 'Dashboard/Views/AutomatedEmbed/content.php';
    } else if ($tab === 'player') {
        require DM__PATH . 'Dashboard/Views/AutomatedEmbed/player.php';
    }

    ?>

</div>