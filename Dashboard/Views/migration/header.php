<?php
/**
 * Header admin dashboard
 *
 * Please refer `$action` to admin.php on `load_automated_embed_page()` function
 */
?>
<h1 class="wp-heading-inline">
    <?php echo __('Migrations Settings'); ?>
</h1>

<hr class="wp-header-end">

<nav class="nav-tab-wrapper wp-clearfix">
    <a href="<?php echo get_bloginfo('wpurl'); ?>/wp-admin/admin.php?page=dm-migration"
        class="nav-tab<?php echo $tab === '' ? ' nav-tab-active' : ''; ?>"
        <?php echo $tab === '' ? ' aria-current="page' : ''; ?>">Database Migrations</a>
    <a href="<?php echo get_bloginfo('wpurl'); ?>/wp-admin/admin.php?page=dm-migration&tab=convert-player"
        class="nav-tab<?php echo $tab === 'convert-player' ? ' nav-tab-active' : ''; ?>"
        <?php echo $tab === 'convert-player' ? ' aria-current="page' : ''; ?>">Convert Old Iframes</a>
</nav>