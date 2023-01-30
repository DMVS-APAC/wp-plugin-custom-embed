<?php
/**
 * Plugin Name: Dailymotion Video Player Plugin
 * Slug: dm-embed-settings
 * Description: Embed video from Dailymotion
 * Author: DMVS APAC Team
 * Author URI: https://github.com/DMVS-APAC
 * Version: 1.5.0
 * Plugin URI: https://github.com/DMVS-APAC/wp-plugin-custom-embed
 * Download
 *
 * @version 1.5.0
 */

if (! defined('ABSPATH') ) {
    exit; // Exit if accessed directly.
}

define('DM_CE__VERSION', '1.5.0');
define('DM__FILE__', __FILE__);
define('DM__PLUGIN_BASE', plugin_basename(DM__FILE__));
define('DM__PATH', plugin_dir_path(DM__FILE__));
define('DM__PUBTOOL', 'customembed-wp');
define('DM__PLAYER_URL', 'https://srvr.dmvs-apac.com/v2/dm-ce.min.js');
define('DM__ENCRYPT_KEY', getenv('ENCRYPT_KEY') ? getenv('ENCRYPT_KEY') : 'dailymotion');


/**
 * Current options name:
 *
 * 1. dm_ce_user_admin
 * 2. dm_ce_options_auto_embed_playback
 * 3. dm_ce_options_manual_embed_playback
 * 4. dm_ce_options_auto_embed_content
 * 5. dm_ce_options_manual_embed_content
 * 6. dm_ce_options_auto_embed_player
 * 7. dm_ce_options_manual_embed_player
 * 8. dm_ce_options_automated_embed_playback
 * 9. dm_ce_options_auto_embed
 * 10. dm_ce_options_convert-player
 * 11. dm_channel_list
 * 12. dm_ce_new_credentials
 * 13. dm_ce_secret
 * 14. dm_ce_channel_list
 * 15. dm_version
 *
 */

if ( !defined('DM_AUTH_KEY') ) {
    define('DM_AUTH_KEY', AUTH_KEY);
}

if ( !defined('DM_NONCE_KEY') ) {
    define('DM_NONCE_KEY', NONCE_KEY);
}

require DM__PATH . 'vendor/autoload.php';

/**
 * Plugin update checker to let user know if there is a new update available
 */
$update_checker = Puc_v4_Factory::buildUpdateChecker(
    'https://github.com/DMVS-APAC/wp-plugin-custom-embed/',
    DM__FILE__,
    'dm-embed-settings'
);

if (defined('DM_BETA') && DM_BETA === true) {
    $update_checker->setBranch('beta');
} else {
    $update_checker->getVcsApi()->enableReleaseAssets();
}

new Dm\Libs\Sessions;
new Dm\Dashboard\Admin;
new Dm\Api\Dm_Endpoints;
require DM__PATH . 'Api/Custom_Get_Options.php';
require DM__PATH . 'Api/Migration_Database.php';
require DM__PATH . 'custom-block/dm-block.php';
require DM__PATH . 'front-end/load-script.php';
require DM__PATH . 'onboarding/activation.php';

/*
 * Load only if the classic editor is active
 */
add_action('admin_init', 'check_editor');
function check_editor()
{
    if (is_plugin_active('classic-editor/classic-editor.php')) {
        include DM__PATH . 'classic-editor/search-video.php';
    }
}

/**
 * Load shortcodes
 */
require DM__PATH . 'shortcodes/dm-player-shortcode.php';

/**
 * Load global library needed by the plugin on the admin dashboard
 */
add_action('admin_enqueue_scripts', 'admin_styles');
function admin_styles()
{
    wp_enqueue_style(
        'dm-editor-stylesheet',
        plugin_dir_url(DM__FILE__) . 'assets/editor.css',
        // Load components styles to use on classic editor
        ['wp-components']
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
        DM_CE__VERSION,
        true
    );

    wp_enqueue_style('dm-style', plugin_dir_url(DM__FILE__) . 'assets/front-end.css', [], DM_CE__VERSION, 'all');
}
add_action('admin_enqueue_scripts', 'global_script');
add_action('wp_enqueue_scripts', 'global_script');
