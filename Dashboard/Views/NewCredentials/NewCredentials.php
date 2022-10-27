<?php
/**
 * A new credentials page
 *
 * A replacement of old credentials page
 *
 *
 * @since 2.0.0
 */

namespace Dm\Dashboard\Views\NewCredentials;

use Dm\Dashboard\DashboardAbstract;
use Dm\Sdk\DailymotionPrivateAPI as DmSdk;
use Dm\Libs\Crypt;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly.

class NewCredentials extends DashboardAbstract {

    /**
     * Register the menu to the dashboard menu
     *
     * @return void
     */
    public function register_menu() {
        add_submenu_page(
            'dm-manual-embed-settings',
            __('Credentials'),
            __('<span aria-label="Dailymotion Credentials">Credentials</span>'),
            'publish_pages',
            'dm-new-credentials',
            array($this, 'load_template_page')
        );

    }

    /**
     * This will show the page and update some data
     *
     * • Updating `dm_ce_migration_step` if available
     * • Store the data if the data submitted
     *
     * @return void
     */
    public function load_template_page() {
        $action = self::sanitize_this('action', 'GET'); // phpcs:ignore WordPress.Security.NonceVerification
        $step = self::sanitize_this('step', 'GET'); // phpcs:ignore WordPress.Security.NonceVerification

        switch($action):
            case "save_data":
                // The sanitize process will be processed in the store_credentials function
                self::store_data($_POST); // phpcs:ignore WordPress.Security.NonceVerification;
                break;
        endswitch;

        if ( !empty($step) ) {
            switch ($step):
                case '1':
                    update_option('dm_ce_migration_step', $step);
                    break;
                case '-1':
                    delete_option('dm_ce_migration_step');
                    break;
            endswitch;
        }

        $migrationStep = get_option('dm_ce_migration_step');
        $options = get_option('dm_ce_new_credentials');

        require DM__PATH . 'Dashboard/Views/NewCredentials/page.php';
    }

    /**
     * The store data will save the credential data and do some actions
     *
     * • Updating `dm_migration_step` if available
     * • Generate token for use later on
     * • Get channel list and store it in the options table named `dm_channel_list`
     * • Store the secret encrypted in the options table named `dm_ce_secret`
     * • If `remove` exist it will remove all options in the database and the session
     *
     * @param array $params
     * @param string $tab
     * @return void
     */
    public function store_data(array $params, string $tab = '') {

        if (!empty($params)) {
            $dmSdk = new DmSdk();

            if ( array_key_exists('remove', $params) ) {
                delete_option('dm_ce_new_credentials');
                delete_option('dm_ce_secret');
                delete_option('dm_ce_channel_list');
                $dmSdk->destroyToken();
            } else if (wp_verify_nonce(self::sanitize_this('dm_save_data'), 'dm_save_data')) {

                    // Migration steps update
                    $migrationStep = get_option('dm_ce_migration_step');

                    if ($migrationStep && $migrationStep == 1) {
                        update_option('dm_ce_migration_step', 2);
                    }

                    $dm_ce_data = [];
                    $token = false;
                    $noEmpty = true;

                    if (!empty($params['api_key']) && $params['api_key'] !== null) {
                        $dm_ce_data += ['api_key' => self::sanitize_this('api_key')];
                    } else {
                        $noEmpty = false;
                    }

                    if (!empty($params['channel_id']) && $params['channel_id'] !== null) {
                        $dm_ce_data += ['channel_id' => self::sanitize_this('channel_id')];
                    } else {
                        $noEmpty = false;
                    }

                    update_option('dm_ce_new_credentials', $dm_ce_data);


                    if (!empty($params['api_secret']) && $params['api_secret'] !== null && $noEmpty) {
                        $dm_secret = Crypt::encryptString(wp_unslash($params['api_secret']));
                        update_option('dm_ce_secret', $dm_secret);

                        // Generate token immediately after the data saved
                        $token = $dmSdk->generateToken($params['api_key'], wp_unslash($params['api_secret']));

                        if ($token) {
                            $this->getAllChannels($dmSdk);

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

    /**
     * Get all children channel related to the parent channel
     * It's also delete old options `dm_ce_credentials`.
     *
     * @param $dmSdk DmSdk an instance of `DmSdk`
     * @return void
     */
    private function getAllChannels(DmSdk $dmSdk): void {
        $channelList = [];
        $channelOwner = $dmSdk->fetchData('/user/' . self::sanitize_this('channel_id') . '?fields=id,screenname');
        $channelList[] = $channelOwner;
        $children = $dmSdk->fetchData('/user/' . self::sanitize_this('channel_id') . '/children');

        if ($children['total'] > 0)
            for ($i = 0; $i < $children['total']; $i++)
                $channelList[] = $children['list'][$i];

        update_option('dm_ce_channel_list', $channelList);

        // TODO: will remove this on 2 next versions. The version should 2.1.0.
        delete_option('dm_ce_credentials');
    }

}