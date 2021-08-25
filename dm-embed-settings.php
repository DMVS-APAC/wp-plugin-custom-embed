<?php
/**
 * Plugin Name: Dailymotion Video Player Plugin
 * Slug: dm-embed-settings
 * Description: Embed video from Dailymotion
 * Author: DMVS APAC Team
 * Author URI: https://github.com/DMVS-APAC
 * Version: 1.0.3-1
 * Plugin URI: https://github.com/DMVS-APAC/wp-plugin-custom-embed
 * Download
 *
 * @version 1.0.2
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

require 'vendor/autoload.php';

define( 'DM_CE__VERSION', '1.0.3-1');
define( 'DM__FILE__', __FILE__ );
define( 'DM__PLUGIN_BASE', plugin_basename( DM__FILE__ ) );
define( 'DM__PATH', plugin_dir_path( DM__FILE__ ) );

/**
 * Plugin update checker to let user know if there is a new update available
 */
$update_checker = Puc_v4_Factory::buildUpdateChecker(
    'https://github.com/DMVS-APAC/wp-plugin-custom-embed/',
    DM__FILE__,
    'dm-embed-settings'
);

if (defined( 'DM_BETA' ) && DM_BETA === true) {
    $update_checker->setBranch('beta');
} else {
    $update_checker->getVcsApi()->enableReleaseAssets();
}

require DM__PATH . 'dashboard/admin.php';
require DM__PATH . 'api/Custom_Get_Options.php';
require DM__PATH . 'custom-block/dm-block.php';
require DM__PATH . 'front-end/load-script.php';
require DM__PATH . 'onboarding/activation.php';


/**
 * Load global library needed by the plugin on the admin dashboard
 */
add_action('admin_enqueue_scripts', 'admin_styles');
function admin_styles() {
    wp_enqueue_style(
        'dm-editor-stylesheet',
        plugin_dir_url(DM__FILE__) . 'assets/editor.css'
    );
}

/**
 * Enqueue the script after WP done with enqueue its scripts
 * This `global_script` will enqueue both on the admin side
 * and front end side. If we're not do this, the WP will see
 * this as an error if the `debug` mode is active.
 */
function global_script() {
    wp_enqueue_script(
        'dm-sdk',
        'https://api.dmcdn.net/all.js',
        [],
        '',
        true
    );
}
add_action('admin_enqueue_scripts', 'global_script');
add_action('wp_enqueue_scripts', 'global_script');
