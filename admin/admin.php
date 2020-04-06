<?php

if ( ! defined( 'ABSPATH' ) ) {
exit; // Exit if accessed directly.
}

class DM_Admin {

    public function __construct() {
        add_action('admin_menu', array($this, 'register_menu'));
    }

    public function register_menu() {
        add_menu_page(
            'Dailymotion CE',
            'Dailymotion CE',
            'manage_options',
            'dm-ce-admin',
            array($this, 'load_admin_page'),
            'dashicons-admin-settings'
        );
    }

    public function load_admin_page() {
        $action = isset($_GET['action']) ? $_GET['action'] : '';

        switch($action):
            case "save_data":
                self::save_data($_POST);
                break;
        endswitch;

        $options = get_option('dm_ce_option');

        require DM__PATH . 'admin/admin_page.php';
    }

    public function save_data($params) {

        if (!empty($params) && wp_verify_nonce($params['dm_save_data'], 'dm_save_data') ) {

            $dm_ce_data = array(
                'owners' => $params['channel_name'],
                'auto_embed' => $params['auto_embed'],
                'video_position' => $params['video_position'],
                'cpe_desktop' => $params['cpe_id_desktop'],
                'cpe_mobile' => $params['cpe_id_mobile'],
                'sort_by' => $params['sort_by'],
                'syndication' => $params['syndication'],
            );

            update_option('dm_ce_option', $dm_ce_data);

            echo '<div id="setting-error-settings_updated" class="notice notice-success settings-error is-dismissible"> 
                    <p><strong>Settings saved.</strong></p><button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button>
                    </div>';
        }
    }

}

$dm_admin = new DM_Admin();

