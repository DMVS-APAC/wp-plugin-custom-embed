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
            __('Dailymotion HQ'),
            __('Dailymotion HQ'),
            'publish_pages',
            'dm-automated-embed-settings',
            '',
            plugin_dir_url( __DIR__ ) . 'assets/dailymotion-icon.svg'
        );

        // For submenu
        add_submenu_page(
            'dm-automated-embed-settings',
            __('Automated Embed'),
            __('Automated Embed'),
            'publish_pages',
            'dm-automated-embed-settings',
            array($this, 'load_automated_embed_page')
        );

        add_submenu_page(
            'dm-automated-embed-settings',
            __('Manual Embed'),
            __('Manual Embed'),
            'edit_posts',
            'dm-manual-embed-settings',
            array($this, 'load_manual_embed_page')
        );


        add_submenu_page(
            'dm-automated-embed-settings',
            __('Connect to Dailymotion'),
            __('<span aria-label="Connect to Dailymotion">Connect</span>'),
            'edit_posts',
            'dm-connect',
            array($this, 'load_connect_page')
        );

        add_submenu_page(
            'dm-automated-embed-settings',
            __('Credentials'),
            __('<span aria-label="Dailymotion Credentials">Credentials</span>'),
            'publish_pages',
            'dm-credentials',
            array($this, 'load_credentials_page')
        );

        add_submenu_page(
            'dm-automated-embed-settings',
            __('Migration'),
            __('Migration'),
            'publish_pages',
            'dm-migration',
            array($this, 'load_migration_page')
        );
    }

    public function register_widget() {
        wp_add_dashboard_widget(
            'dm-login-status',
            __('Dailymotion connection status'),
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

    /**
     * Load the automated embed settings page
     */
    public function load_automated_embed_page() {
        $prefix = 'auto_embed_';
        $action = $_GET['action'] ?? '';
        $tab = $_GET['tab'] ?? 'playback';

        switch($action):
            case "save_data":
                self::store_general_settings($_POST, $prefix . $tab);
                break;
        endswitch;

        $currentUser = wp_get_current_user();

        $options = get_option('dm_ce_options_' . $prefix . $tab);
        $credentials = get_option('dm_ce_credentials');
        $dmUser = get_option('dm_ce_user_' . $currentUser->data->user_login);

        require DM__PATH . 'dashboard/views/automated-embed/page.php';
    }

    public function load_manual_embed_page() {
        $prefix = 'manual_embed_';
        $action = $_GET['action'] ?? '';
        $tab = $_GET['tab'] ?? 'playback';

        switch($action):
            case "save_data":
                self::store_general_settings($_POST, $prefix . $tab);
                break;
        endswitch;

        $currentUser = wp_get_current_user();

        $options = get_option('dm_ce_options_' . $prefix . $tab);
        $credentials = get_option('dm_ce_credentials');
        $dmUser = get_option('dm_ce_user_' . $currentUser->data->user_login);

        require DM__PATH . 'dashboard/views/manual-embed/page.php';
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

    public function load_migration_page() {
        require DM__PATH . 'dashboard/views/migration/page.php';
    }

    private function store_general_settings($params, $tab) {
        if (!empty($params) && wp_verify_nonce($params['dm_save_data'], 'dm_save_data') ) {

            $dm_ce_data = [];

            // Playback options
            if (!empty($params['player_id']) && $params['player_id'] !== null)
                $dm_ce_data += ['player_id' =>  $params['player_id']];

            // Content options
            if (!empty($params['auto_embed']) && $params['auto_embed'] !== null)
                $dm_ce_data += ['auto_embed' => $params['auto_embed']];

            if (!empty($params['sort_by']) && $params['sort_by'] !== null)
                $dm_ce_data += ['sort_by' => $params['sort_by']];

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

            if (!empty($params['range_day']) && $params['range_day'] !== null)
                $dm_ce_data += ['range_day' => $params['range_day']];


            // Player options
            if (!empty($params['auto_player_pos']) && $params['auto_player_pos'] !== null)
                $dm_ce_data += ['auto_player_pos' => $params['auto_player_pos']];

            if (!empty($params['syndication']) && $params['syndication'] !== null)
                $dm_ce_data += ['syndication' => $params['syndication']];

            // This param in the database still using adsParams but in the frontend it's using customParams
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

            if (!empty($params['mute']) && $params['mute'] !== null)
                $dm_ce_data += ['mute' => $params['mute']];

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

