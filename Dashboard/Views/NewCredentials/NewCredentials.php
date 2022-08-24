<?php

namespace Dm\Dashboard\Views\NewCredentials;

use Dm\Dashboard\DashboardAbstract;
use Dm\Sdk\DailymotionPrivateAPI as DmApi;
use Dm\Libs\Crypt;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly.

class NewCredentials extends DashboardAbstract {

    public function register_menu() {
        add_submenu_page(
            'dm-manual-embed-settings',
            __('New Credentials'),
            __('<span aria-label="Dailymotion Credentials">New Credentials</span>'),
            'publish_pages',
            'dm-new-credentials',
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

        $options = get_option('dm_ce_new_credentials');

        require DM__PATH . 'Dashboard/Views/NewCredentials/new_credentials_page.php';
    }


    public function store_data($params) {
        if (!empty($params) && wp_verify_nonce(self::sanitize_this('dm_save_data'), 'dm_save_data')) {

            $dm_ce_data = [];
            $token = false;
            $noEmpty = true;

            if (!empty($params['api_key']) && $params['api_key'] !== null) {
                $dm_ce_data += ['api_key' => self::sanitize_this('api_key')];
            } else {
                $noEmpty = false;
            }

            if (!empty($params['channel_id']) && $params['channel_id'] !== null ) {
                $dm_ce_data += ['channel_id' => self::sanitize_this('channel_id')];
            } else {
                $noEmpty = false;
            }

            update_option('dm_ce_new_credentials', $dm_ce_data);


            if (!empty($params['api_secret']) && $params['api_secret'] !== null && $noEmpty) {
                $dm_secret = Crypt::encryptString(wp_unslash($params['api_secret']));
                update_option('dm_ce_secret', $dm_secret);


                // Create token immediately after the data saved
                $dmApi = new DmApi();
                $token = $dmApi->generateToken($params['api_key'], $params['api_secret']);

                if ($token) {
                    echo '<div id="setting-error-settings_updated" class="notice notice-success settings-error is-dismissible">
                    <p><strong>' . esc_html(__('Settings saved', 'dm_embed_plugin')) . '</strong></p>
                    </div>';
                } else {
                    echo '<div id="setting-error-settings_updated" class="notice notice-success settings-error is-dismissible">
                    <p><strong>' . esc_html(__('API Key or API Secret is not valid', 'dm_embed_plugin')) . '</strong></p>
                    </div>';
                }
            }

            if (!$token) {
                echo '<div id="setting-error-settings_updated" class="notice notice-success settings-error is-dismissible">
                    <p><strong>' . esc_html(__('Settings saved', 'dm_embed_plugin')) . '</strong></p>
                    </div>';
            }

        }
    }

}