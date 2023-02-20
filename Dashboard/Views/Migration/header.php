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
        class="nav-tab<?php echo $tab === 'convert_player' ? ' nav-tab-active' : ''; ?>"
        <?php echo $tab === 'convert_player' ? ' aria-current="page' : ''; ?>"><?php echo __('Convert Old Iframes'); ?></a>
    <a href="<?php echo get_bloginfo('wpurl'); ?>/wp-admin/admin.php?page=dm-migration&tab=database"
       class="nav-tab<?php echo $tab === 'database' ? ' nav-tab-active' : ''; ?>"
    <?php echo $tab === 'database' ? ' aria-current="page' : ''; ?>"><?php echo __('Database Migrations'); ?></a>
</nav>
