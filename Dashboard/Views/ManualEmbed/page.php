<?php
/**
 * The template for displaying the manual embed page.
 *
 */

?>

<div class="wrap">

    <?php if (!empty($migrationStep) && $migrationStep == 3): ?>
        <div class="dm__step-guidance">
            Well done, you can <a href="<?php echo get_bloginfo('wpurl'); ?>/wp-admin/admin.php?page=dm-automated-embed-settings&step=-1"><?php echo __('continue'); ?></a> to the next step or just <a href="<?php echo get_bloginfo('wpurl'); ?>/wp-admin/admin.php?page=dm-manual-embed-settings&step=-1">skip</a> if you don't need a guidance.
        </div>
    <?php endif; ?>

    <?php require DM__PATH . 'Dashboard/Views/ManualEmbed/header.php'; ?>

    <?php

    if ($tab === 'playback') {
        require DM__PATH . 'Dashboard/Views/ManualEmbed/playback.php';
    } else if($tab === 'content') {
        require DM__PATH . 'Dashboard/Views/ManualEmbed/content.php';
    } else if ($tab === 'player') {
        require DM__PATH . 'Dashboard/Views/ManualEmbed/player.php';
    }

    ?>

</div>