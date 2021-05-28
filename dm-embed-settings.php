<?php
/**
 * Plugin Name: Dailymotion Embed Settings
 * Slug: dm-embed-settings
 * Description: Embed video from Dailymotion
 * Author: DMVS APAC Team
 * Author URI: https://github.com/DMVS-APAC
 * Version: 1.0.0-9
 * Plugin URI: https://github.com/DMVS-APAC/wp-plugin-custom-embed
 * Download
 *
 * @version 1.0.0-9
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

require 'vendor/autoload.php';

define( 'DM_CE__VERSION', '1.0.0-9');
define( 'DM__FILE__', __FILE__ );
define( 'DM__PLUGIN_BASE', plugin_basename( DM__FILE__ ) );
define( 'DM__PATH', plugin_dir_path( DM__FILE__ ) );

/**
 * Plugin update checker to let user know if there is a new update available
 */
$my_update_checker = Puc_v4_Factory::buildUpdateChecker(
    'https://github.com/DMVS-APAC/wp-plugin-custom-embed/',
    DM__FILE__,
    'dm-embed-settings'
);

require DM__PATH . 'dashboard/admin.php';
require DM__PATH . 'api/Custom_Get_Options.php';
require DM__PATH . 'custom-block/dm-block.php';
require DM__PATH . 'front-end/load-script.php';


add_action('admin_enqueue_scripts', 'admin_styles');
function admin_styles() {
    wp_enqueue_style(
        'dm-editor-stylesheet',
        plugin_dir_url(DM__FILE__) . 'assets/editor.css'
    );
}


register_activation_hook(__FILE__, 'my_plugin_activation');
function my_plugin_activation() {
    $notices = get_option('my_plugin_deferred_admin_notices', array());
    $notices[]= "My Plugin: Custom Activation Message";
    update_option('my_plugin_deferred_admin_notices', $notices);
}

add_action('admin_init', 'my_plugin_admin_init');
function my_plugin_admin_init() {
    $current_version = 1;
    $version= get_option('my_plugin_version');
    if ($version != $current_version) {
        // Do whatever upgrades needed here.
        update_option('my_plugin_version', $current_version);
        $notices= get_option('my_plugin_deferred_admin_notices', array());
        $notices[]= "My Plugin: Upgraded version $version to $current_version.";
        update_option('my_plugin_deferred_admin_notices', $notices);
    }
}

add_action('admin_notices', 'my_plugin_admin_notices');
function my_plugin_admin_notices() {
    $notices = get_option('my_plugin_deferred_admin_notices');
    if ($notices) {
        foreach ($notices as $notice) {
            echo "<div class='updated'><p>$notice</p></div>";
        }
        delete_option('my_plugin_deferred_admin_notices');
    }
}

register_deactivation_hook(__FILE__, 'my_plugin_deactivation');
function my_plugin_deactivation() {
    delete_option('my_plugin_version');
    delete_option('my_plugin_deferred_admin_notices');
}
