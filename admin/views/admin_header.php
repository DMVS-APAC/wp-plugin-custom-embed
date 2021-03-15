<?php
/**
 * Header admin dashboard
 *
 * Please refer `$action` to admin.php on `load_admin_page` function
 */
?>
    <h1 class="wp-heading-inline">
        <?php echo __('Dailymotion Custom Embed'); ?>
    </h1>

    <hr class="wp-header-end">

    <nav class="nav-tab-wrapper wp-clearfix">
        <a href="http://dm-wp.test/wp-admin/admin.php?page=dm-ce-admin"
           class="nav-tab<?php echo $tab === 'mandatory' ? ' nav-tab-active' : ''; ?>"
           <?php echo $tab === 'mandatory' ? ' aria-current="page' : ''; ?>">Mandatory Settings</a>
        <a href="http://dm-wp.test/wp-admin/admin.php?page=dm-ce-admin&tab=content"
           class="nav-tab<?php echo $tab === 'content' ? ' nav-tab-active' : ''; ?>"
           <?php echo $tab === 'content' ? ' aria-current="page' : ''; ?>">Content Settings</a>
        <a href="http://dm-wp.test/wp-admin/admin.php?page=dm-ce-admin&tab=player"
           class="nav-tab<?php echo $tab === 'player' ? ' nav-tab-active' : ''; ?>"
           <?php echo $tab === 'player' ? ' aria-current="page' : ''; ?>">Player Settings</a>
    </nav>
