<?php

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly.

class DM_Admin {

    public function __construct() {
        add_action('admin_menu', array($this, 'register_menu'));
        add_action('wp_dashboard_setup', array($this, 'register_widget'));
    }

    public function register_menu() {

        // For root menu
        add_menu_page(
            'Dailymotion HQ',
            'Dailymotion HQ',
            'publish_pages',
            'dm-general-settings',
            '',
            plugins_url('dm-embed-settings/assets/dailymotion-icon.svg')
        );

        // For submenu
        add_submenu_page(
            'dm-general-settings',
            'General Settings',
            'General Settings',
            'publish_pages',
            'dm-general-settings',
            array($this, 'load_admin_page')
        );

        add_submenu_page(
            'dm-general-settings',
            'Connect to Dailymotion',
            '<span aria-label="Connect to Dailymotion">Connect</span>',
            'edit_posts',
            'dm-connect',
            array($this, 'load_connect_page')
        );

        add_submenu_page(
            'dm-general-settings',
            'Credentials',
            '<span aria-label="Dailymotion Credentials">Credentials</span>',
            'publish_pages',
            'dm-credentials',
            array($this, 'load_credentials_page')
        );
    }

    public function register_widget() {
        wp_add_dashboard_widget(
            'dm-login-status',
            'Dailymotion connection status',
            array($this, 'load_dashboard_widget'),
            null,
            null,
            'side',
            'high'
        );
    }

    public function load_dashboard_widget() {
        require DM__PATH . 'dashboard/views/dashboard-widget/dashboard-widget-box.php';
    }

    public function load_admin_page() {
        $action = $_GET['action'] ?? '';
        $tab = $_GET['tab'] ?? 'mandatory';

        switch($action):
            case "save_data":
                self::store_general_settings($_POST, $tab);
                break;
        endswitch;

        $currentUser = wp_get_current_user();

        $options = get_option('dm_ce_options_' . $tab);
        $credentials = get_option('dm_ce_credentials');
        $dmUser = get_option('dm_ce_user_' . $currentUser->data->user_login);

        require DM__PATH . 'dashboard/views/general-settings/admin_page.php';
    }

    public function load_connect_page() {
        $action = $_GET['action'] ?? '';

        $options = get_option('dm_ce_credentials');

        require DM__PATH . 'dashboard/views/connect/connect_page.php';
    }

    public function load_credentials_page() {
        $action = $_GET['action'] ?? '';

        switch($action):
            case "save_data":
                self::store_credentials($_POST);
                break;
        endswitch;

        $options = get_option('dm_ce_credentials');

        require DM__PATH . 'dashboard/views/credentials/credentials_page.php';
    }

    private function store_general_settings($params, $tab) {
        if (!empty($params) && wp_verify_nonce($params['dm_save_data'], 'dm_save_data') ) {

            $dm_ce_data = [];

            // Mandatory options
            if (!empty($params['player_id']) && $params['player_id'] !== null)
                $dm_ce_data += ['player_id' =>  $params['player_id']];

            if (!empty($params['sort_by']) && $params['sort_by'] !== null)
                $dm_ce_data += ['sort_by' => $params['sort_by']];


            // Content options
            if (!empty($params['channel_name']) && $params['channel_name'] !== null)
                $dm_ce_data += ['owners' => $params['channel_name']];

            if (!empty($params['category']) && $params['category'] !== null)
                $dm_ce_data += ['category' => $params['category']];

            if (!empty($params['exclude_ids']) && $params['exclude_ids'] !== null)
                $dm_ce_data += ['exclude_ids' => $params['exclude_ids']];

            if (!empty($params['playlist']) && $params['playlist'] !== null)
                $dm_ce_data += ['playlist' => $params['playlist']];

            if (!empty($params['playlist_id']) && $params['playlist_id'] !== null)
                $dm_ce_data += ['playlist_id' => $params['playlist_id']];

            if (!empty($params['disable_queue']) && $params['disable_queue'] !== null)
                $dm_ce_data += ['disable_queue' => $params['disable_queue']];

            if (!empty($params['disable_auto_next']) && $params['disable_auto_next'] !== null)
                $dm_ce_data += ['disable_auto_next' => $params['disable_auto_next']];

            if (!empty($params['language']) && $params['language'] !== null)
                $dm_ce_data += ['language' => $params['language']];

//            if (!empty($params['keywords_selector']) && $params['keywords_selector'] !== null)
//                $dm_ce_data += ['keywords_selector' => $params['keywords_selector']];

            if (!empty($params['range_day']) && $params['range_day'] !== null)
                $dm_ce_data += ['range_day' => $params['range_day']];

            // Because of
//            if (!empty($params['video_id']) && $params['video_id'] !== null)
//                $dm_ce_data += ['video_id' => $params['video_id']];


            // Player options
            if (!empty($params['syndication']) && $params['syndication'] !== null)
                $dm_ce_data += ['syndication' => $params['syndication']];

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
                    <p><strong>' . __('Settings saved') . '</strong></p>
                    </div>';
        }
    }

    private function store_credentials($params) {
        if (!empty($params) && wp_verify_nonce($params['dm_save_data'], 'dm_save_data') ) {

            $dm_ce_data = [];

            if (!empty($params['api_key']) && $params['api_key'] !== null)
                $dm_ce_data += ['api_key' => $params['api_key']];

            if (!empty($params['api_secret']) && $params['api_secret'] !== null)
                $dm_ce_data += ['api_secret' => $params['api_secret']];

            update_option('dm_ce_credentials', $dm_ce_data);

            echo '<div id="setting-error-settings_updated" class="notice notice-success settings-error is-dismissible"> 
                    <p><strong>' . __('Settings saved') . '</strong></p>
                    </div>';
        }
    }

}

$dm_admin = new DM_Admin();

