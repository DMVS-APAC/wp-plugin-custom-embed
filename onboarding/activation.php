<?php
/**
 * All activation process
 *
 */

register_activation_hook(DM__FILE__, 'dm_activation');
function dm_activation() {
    $notices = get_option('dm_deferred_admin_notices', array());

    $credentials = get_option('dm_ce_credentials');

    if ( empty($credentials->api_key) ) {
        $notices[]= 'Dailymotion: You can go to general settings <a href="' . get_dashboard_url() .'/admin.php?page=dm-general-settings">here</a> and store your credentials <a href="' . get_dashboard_url() . '/admin.php?page=dm-credentials">here</a>';
    } else {
        $notices[]= "Dailymotion: plugin activated";
    }
    update_option('dm_deferred_admin_notices', $notices);
}

add_action('admin_init', 'dm_admin_init');
function dm_admin_init() {
    $current_version = DM_CE__VERSION;
    $version= get_option('dm_version');
    if ($version != $current_version) {
        // Do whatever upgrades needed here.
        update_option('dm_version', $current_version);
        $notices= get_option('dm_deferred_admin_notices', array());
        $notices[]= "Dailymotion: Upgraded version $version to $current_version.";
        update_option('dm_deferred_admin_notices', $notices);
    }
}

add_action('admin_notices', 'dm_admin_notices');
function dm_admin_notices() {
    $notices = get_option('dm_deferred_admin_notices');
    if ($notices) {
        foreach ($notices as $notice) {
            echo "<div class='updated'><p>$notice</p></div>"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        }
        delete_option('dm_deferred_admin_notices');
    }
}

// Deactivate is part of offboarding process
register_deactivation_hook(__FILE__, 'dm_deactivation');
function dm_deactivation() {
    delete_option('dm_version');
    delete_option('dm_deferred_admin_notices');
}
