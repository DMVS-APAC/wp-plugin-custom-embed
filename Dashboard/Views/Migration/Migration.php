<?php

namespace Dm\Dashboard\Views\Migration;

use Dm\Dashboard\DashboardAbstract;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly.

class Migration extends DashboardAbstract {

    public function register_menu() {
        add_submenu_page(
            'dm-manual-embed-settings',
            __('Migration'),
            __('Migration'),
            'publish_pages',
            'dm-migration',
            array($this, 'load_template_page')
        );
    }

    public function load_template_page() {
        $tab = isset($_GET['tab']) ? self::sanitize_this('tab', 'GET') : 'convert_player'; //
        $prefix = '';
        $action = self::sanitize_this('action', 'GET'); // phpcs:ignore WordPress.Security.NonceVerification

        switch($action):
            case "save_data":
                $save_data = self::sanitize_this('dm_save_data');
                if ( wp_verify_nonce($save_data, 'dm_save_data') )
                    self::store_data($_POST, $prefix . $tab);

                break;
        endswitch;

        $options = get_option('dm_ce_options_' . $prefix . $tab);
        require DM__PATH . 'Dashboard/Views/Migration/page.php';
    }

    public function store_data(array $params, string $tab) {

        $dm_ce_data = [];

        if (!empty($params['convert_old_player']) && $params['convert_old_player'] !== null)
            $dm_ce_data += ['convert_old_player' => self::sanitize_this('convert_old_player')];

        // Save the option to database
        update_option('dm_ce_options_' . $tab, $dm_ce_data);
        // Will remove this in 2-3 releases in the future
        delete_option('dm_ce_options_convert-player');

        echo '<div id="setting-error-settings_updated" class="notice notice-success settings-error is-dismissible"> 
                    <p><strong>' . esc_html( __('Settings saved', 'dm_embed_plugin') ) . '</strong></p>
                    </div>';
    }

}

