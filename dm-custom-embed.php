<?php
/**
 * Plugin Name: Dailymotion Contextual Embed
 * Description: Auto embed video from Dailymotion based on article
 * Author: DMVS APAC Team
 * Version: 0.0.2
 * Plugin URI: https://developer.dailymotion.com/
 *
 * @version 0.0.3
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

define( 'DM_CE__VERSION', '0.0.3');
define( 'DM__FILE__', __FILE__ );
define( 'DM__PLUGIN_BASE', plugin_basename( DM__FILE__ ) );
define( 'DM__PATH', plugin_dir_path( DM__FILE__ ) );

require DM__PATH . 'admin/admin.php';
require DM__PATH . 'public/load-script.php';

