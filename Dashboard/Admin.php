<?php
/**
 * All Dailymotion Pages
 *
 * All pages related to Dailymotion will be handled via this module
 *
 *
 *
 * @since 1.0.0
 */

namespace Dm\Dashboard;

use Dm\Dashboard\Views\AutomatedEmbed\AutomatedEmbed;
use Dm\Dashboard\Views\ManualEmbed\ManualEmbed;
use Dm\Dashboard\Views\NewCredentials\NewCredentials;
use Dm\Dashboard\Views\Migration\Migration;
use Dm\Dashboard\Views\Welcome\Welcome;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly.

class Admin {

    public function __construct() {
        add_action('admin_body_class', array($this, 'add_class_to_body'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_assets'));
        add_action('admin_menu', array($this, 'register_menu'));
    }

    public function register_menu() {

        // For root menu
        add_menu_page(
            __('Dailymotion HQ'),
            __('Dailymotion HQ'),
            'publish_pages',
            'dm-manual-embed-settings',
            '',
            plugin_dir_url( __DIR__ ) . 'assets/dailymotion-icon.svg'
        );

        new ManualEmbed();
        new AutomatedEmbed();
        new NewCredentials();
        new Migration();
        // Hidden page to show announcement to users
        new Welcome();
    }

    public function enqueue_assets() {
        wp_enqueue_style( 'dmhq-style', plugin_dir_url(DM__FILE__) . 'build/index.scss.css');
    }

    public function add_class_to_body($classes) {
        return $classes . ' dm__dashboard-page';
    }

}

