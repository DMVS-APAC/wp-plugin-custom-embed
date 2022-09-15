<?php
/**
 * A welcome page
 *
 * A page to guide users to migrate from Public API to Private API
 */

namespace Dm\Dashboard\Views\Welcome;

use Dm\Dashboard\DashboardAbstract;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly.

class Welcome extends DashboardAbstract {

    public function register_menu() {
        add_submenu_page(
            'dm-migration',
            __('Setup Guide'),
            __('Setup Guide'),
            'publish_pages',
            'dm-migration-new-api',
            array($this, 'load_template_page')
        );

    }

    public function load_template_page() {
        $action = self::sanitize_this('action', 'GET'); // phpcs:ignore WordPress.Security.NonceVerification

        switch($action):
            case "save_data":
                // The sanitize process will be processed in the store_credentials function
                self::store_data($_POST); // phpcs:ignore WordPress.Security.NonceVerification;
                break;
        endswitch;

        require DM__PATH . 'Dashboard/Views/Welcome/page.php';
    }

    public function store_data($params, $tab){}
}
