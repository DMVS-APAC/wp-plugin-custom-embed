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

        add_submenu_page(
            'dm-manual-embed-settings',
            __('Migration'),
            __('Migration'),
            'publish_pages',
            'dm-migration',
            array($this, 'load_migration_page')
        );

        // Hidden page to show announcement to users
        new Welcome();
    }

    public function enqueue_assets() {
        wp_enqueue_style( 'dmhq-style', plugin_dir_url(DM__FILE__) . 'build/index.scss.css');
    }

    public function add_class_to_body($classes) {
        return $classes . ' dm__dashboard-page';
    }

    /**
     * It's a view part of the migration page.
     */
    public function load_migration_page() {
        $tab = isset($_GET['tab']) ? self::sanitize_this('tab', 'GET') : ''; //
        $prefix = '';
        $action = self::sanitize_this('action', 'GET'); // phpcs:ignore WordPress.Security.NonceVerification
        
        switch($action):
            case "save_data":
                $save_data = self::sanitize_this('dm_save_data');
                if ( wp_verify_nonce($save_data, 'dm_save_data') )
                self::store_general_settings($_POST, $prefix . $tab);
                
                break;
            endswitch;
            
        $options = get_option('dm_ce_options_' . $prefix . $tab);
        require DM__PATH . 'Dashboard/Views/migration/page.php';
    }

    private function sanitize_this($param, $type = 'POST') {
        // Nonce Verification happened on store_general_options() and store_credentials()
        if ($type === 'POST') {
            return isset($_POST[$param]) ? sanitize_text_field( wp_unslash( $_POST[$param] ) ) : null; // phpcs:ignore WordPress.Security.NonceVerification
        } else {
            return isset($_GET[$param]) ? sanitize_text_field( wp_unslash( $_GET[$param] ) ) : null; // phpcs:ignore WordPress.Security.NonceVerification
        }
    }

}

