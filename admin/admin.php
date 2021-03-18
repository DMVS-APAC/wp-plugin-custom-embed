<?php

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly.

class DM_Admin {

    public function __construct() {
        add_action('admin_menu', array($this, 'register_menu'));
        add_action('enqueue_block_editor_assets', [$this, 'myprefix_enqueue_assets']);
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

    public function myprefix_enqueue_assets() {
        wp_enqueue_script(
            'myprefix-gutenberg-sidebar',
//            plugins_url( 'src/index.js', __FILE__ ),
            DM__PATH . 'src/index.js',
            array( 'wp-plugins', 'wp-edit-post', 'wp-element', 'wp-components', 'wp-data' )
        );
    }

    public function load_admin_page() {
        $action = isset($_GET['action']) ? $_GET['action'] : '';
        $tab = isset($_GET['tab']) ? $_GET['tab'] : 'mandatory';

        switch($action):
            case "save_data":
                self::save_data($_POST, $tab);
                break;
        endswitch;

        $options = get_option('dm_ce_options_' . $tab);

        require DM__PATH . 'admin/views/admin_page.php';
    }

    private function save_data($params, $tab) {
        if (!empty($params) && wp_verify_nonce($params['dm_save_data'], 'dm_save_data') ) {

            $dm_ce_data = [];

            // Mandatory options
            if (!empty($params['channel_name']) && $params['channel_name'] !== null)
                $dm_ce_data += ['owners' => $params['channel_name']];

            if (!empty($params['sort_by']) && $params['sort_by'] !== null)
                $dm_ce_data += ['sort_by' => $params['sort_by']];


            // Content options
            if (!empty($params['category']) && $params['category'] !== null)
                $dm_ce_data += ['category' => $params['category']];

            if (!empty($params['exclude_ids']) && $params['exclude_ids'] !== null)
                $dm_ce_data += ['exclude_ids' => $params['exclude_ids']];

            if (!empty($params['playlist']) && $params['playlist'] !== null)
                $dm_ce_data += ['playlist' => $params['playlist']];

            if (!empty($params['syndication']) && $params['syndication'] !== null)
                $dm_ce_data += ['syndication' => $params['syndication']];

            if (!empty($params['disable_queue']) && $params['disable_queue'] !== null)
                $dm_ce_data += ['disable_queue' => $params['disable_queue']];

            if (!empty($params['disable_auto_next']) && $params['disable_auto_next'] !== null)
                $dm_ce_data += ['disable_auto_next' => $params['disable_auto_next']];

            if (!empty($params['language']) && $params['language'] !== null)
                $dm_ce_data += ['language' => $params['language']];

            if (!empty($params['keywords_selector']) && $params['keywords_selector'] !== null)
                $dm_ce_data += ['keywords_selector' => $params['keywords_selector']];

            if (!empty($params['range_day']) && $params['range_day'] !== null)
                $dm_ce_data += ['range_day' => $params['range_day']];

            if (!empty($params['video_id']) && $params['video_id'] !== null)
                $dm_ce_data += ['video_id' => $params['video_id']];


            // Player options
            if (!empty($params['hide_controls']) && $params['hide_controls'] !== null)
                $dm_ce_data += ['hide_controls' => $params['hide_controls']];

            if (!empty($params['ads_params']) && $params['ads_params'] !== null)
                $dm_ce_data += ['ads_params' => $params['ads_params']];

            if (!empty($params['pre_video_title']) && $params['pre_video_title'] !== null)
                $dm_ce_data += ['pre_video_title' => $params['pre_video_title']];

            if (!empty($params['show_video_title']) && $params['show_video_title'] !== null)
                $dm_ce_data += ['show_video_title' => $params['show_video_title']];

            if (!empty($params['show_info_card']) && $params['show_info_card'] !== null)
                $dm_ce_data += ['show_info_card' => $params['show_info_card']];

            if (!empty($params['show_carousel_playlist']) && $params['show_carousel_playlist'] !== null)
                $dm_ce_data += ['show_carousel_playlist' => $params['show_carousel_playlist']];

            if (!empty($params['hide_controls_ad']) && $params['hide_controls_ad'] !== null)
                $dm_ce_data += ['hide_controls_ad' => $params['hide_controls_ad']];

            if (!empty($params['pip_at_start']) && $params['pip_at_start'] !== null)
                $dm_ce_data += ['pip_at_start' => $params['pip_at_start']];

            if (!empty($params['click_to_play']) && $params['click_to_play'] !== null)
                $dm_ce_data += ['click_to_play' => $params['click_to_play']];

            if (!empty($params['deactivate_pip']) && $params['deactivate_pip'] !== null)
                $dm_ce_data += ['deactivate_pip' => $params['deactivate_pip']];


            // Save the option to database
            update_option('dm_ce_options_' . $tab, $dm_ce_data);

            echo '<div id="setting-error-settings_updated" class="notice notice-success settings-error is-dismissible"> 
                    <p><strong>Settings saved.</strong></p><button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button>
                    </div>';
        }
    }

}

$dm_admin = new DM_Admin();

