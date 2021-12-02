<?php
/**
 * Header admin dashboard
 *
 * Please refer `$action` to admin.php on `load_automated_embed_page()` function
 */
?>
<h1 class="wp-heading-inline">
    <?php echo __('Manual Embed Settings'); ?>
</h1>

<hr class="wp-header-end">

<nav class="nav-tab-wrapper wp-clearfix">
    <a href="<?php echo get_bloginfo('wpurl'); ?>/wp-admin/admin.php?page=dm-manual-embed-settings"
       class="nav-tab<?php echo $tab === 'playback' ? ' nav-tab-active' : ''; ?>"
    <?php echo $tab === 'playback' ? ' aria-current="page' : ''; ?>">Playback Settings</a>
    <a href="<?php echo get_bloginfo('wpurl'); ?>/wp-admin/admin.php?page=dm-manual-embed-settings&tab=content"
       class="nav-tab<?php echo $tab === 'content' ? ' nav-tab-active' : ''; ?>"
    <?php echo $tab === 'content' ? ' aria-current="page' : ''; ?>">Content Settings</a>
    <a href="<?php echo get_bloginfo('wpurl'); ?>/wp-admin/admin.php?page=dm-manual-embed-settings&tab=player"
       class="nav-tab<?php echo $tab === 'player' ? ' nav-tab-active' : ''; ?>"
    <?php echo $tab === 'player' ? ' aria-current="page' : ''; ?>">Player Settings</a>
</nav>