<?php
/**
 * Manual Embed Settings
 *
 * This page
 *
 *
 * @since 1.6.0
 *
 */

namespace Dm\Dashboard\Views\ManualEmbed;

use Dm\Dashboard\DashboardAbstract;
use Dm\Sdk\DailymotionPrivateAPI as DmSdk;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly.

class ManualEmbed extends DashboardAbstract {

    public function register_menu() {
        add_submenu_page(
            'dm-manual-embed-settings',
            __('Manual Embed'),
            __('Manual Embed'),
            'edit_posts',
            'dm-manual-embed-settings',
            array($this, 'load_template_page')
        );
    }

    public function load_template_page() {
        $prefix = 'manual_embed_';
        $action = self::sanitize_this('action', 'GET'); // phpcs:ignore WordPress.Security.NonceVerification
        $tab = isset($_GET['tab']) ? self::sanitize_this('tab', 'GET') : 'playback'; // phpcs:ignore WordPress.Security.NonceVerification
        $step = self::sanitize_this('step', 'GET'); // phpcs:ignore WordPress.Security.NonceVerification

        switch($action):
            case "save_data":
                $save_data = self::sanitize_this('dm_save_data');
                if ( wp_verify_nonce($save_data, 'dm_save_data') )
                    self::store_data($_POST, $prefix . $tab);

                break;
        endswitch;

        if ( !empty($step) && $step == -1) delete_option('dm_ce_migration_step');

        $currentUser = wp_get_current_user();

        $options = get_option('dm_ce_options_' . $prefix . $tab);
        if ($tab === 'playback') $playerIds = self::getPlayerId();
        $migrationStep = get_option('dm_ce_migration_step');

        require DM__PATH . 'Dashboard/Views/ManualEmbed/page.php';
    }

    public function store_data($params, $tab) {
        if ( !empty($params) ) {

            $migrationStep = get_option('dm_migration_step');

            if ( $migrationStep && $migrationStep == 2 ) {
                update_option('dm_migration_step', 3);
            }

            $dm_ce_data = [];

            // Playback options
            if (!empty($params['player_id']) && $params['player_id'] !== null)
                $dm_ce_data += ['player_id' =>  self::sanitize_this('player_id')];

            // Content options
            if (!empty($params['channel_name']) && $params['channel_name'] !== null)
                $dm_ce_data += ['owners' => self::sanitize_this('channel_name')];

            // Player options
            if (!empty($params['syndication']) && $params['syndication'] !== null)
                $dm_ce_data += ['syndication' => self::sanitize_this('syndication')];

            // This param in the database still using adsParams but in the frontend it's using customParams
            if (!empty($params['ads_params']) && $params['ads_params'] !== null)
                $dm_ce_data += ['ads_params' => self::sanitize_this('ads_params')];

            if (!empty($params['mute']) && $params['mute'] !== null)
                $dm_ce_data += ['mute' => self::sanitize_this('mute')];

            // Save the option to database
            update_option('dm_ce_options_' . $tab, $dm_ce_data);

            echo '<div id="setting-error-settings_updated" class="notice notice-success settings-error is-dismissible"> 
                    <p><strong>' . esc_html( __('Settings saved', 'dm_embed_plugin') ) . '</strong></p>
                    </div>';
        }
    }

    /**
     * Get the Player ID when available
     *
     * @return bool|resource|string|null
     */
    private function getPlayerId() {
        $credentials = get_option('dm_ce_new_credentials');

        if ($credentials) {
            $dmSdk = new DmSdk();
            return $dmSdk->fetchData('/user/' . $credentials['channel_id'] . '/players?limit=100&fields=id,label');
        }

        return null;
    }
}