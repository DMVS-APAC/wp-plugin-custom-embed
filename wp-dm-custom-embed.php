<?php
/**
 * Plugin Name: WP Dailymotion Custom Embed
 * Slug: wp-dm-custom-embed
 * Description: Auto embed video from Dailymotion
 * Author: DMVS APAC Team
 * Author URI: https://github.com/DMVS-APAC
 * Version: 1.0.0-8
 * Plugin URI: https://github.com/DMVS-APAC/wp-plugin-custom-embed
 * Download
 *
 * @version 1.0.0-8
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

require 'vendor/autoload.php';

define( 'DM_CE__VERSION', '1.0.0-8');
define( 'DM__FILE__', __FILE__ );
define( 'DM__PLUGIN_BASE', plugin_basename( DM__FILE__ ) );
define( 'DM__PATH', plugin_dir_path( DM__FILE__ ) );

/**
 * Plugin update checker to let user know if there is a new update available
 */
$my_update_checker = Puc_v4_Factory::buildUpdateChecker(
    'https://github.com/DMVS-APAC/wp-plugin-custom-embed/',
    DM__FILE__,
    'wp-dm-custom-embed'
);

require DM__PATH . 'admin/admin.php';
require DM__PATH . 'metabox/metabox.php';
require DM__PATH . 'public/load-script.php';

