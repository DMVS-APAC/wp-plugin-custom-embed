<?php
/**
 * Class Migration_Database
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly.

class Migration_Database extends WP_REST_Controller
{

    public function __construct() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        $version = '1';
        $namespace = 'dm/v' . $version;

        register_rest_route($namespace, '/migration', [
            'methods' => WP_REST_Server::EDITABLE,
            'callback' => [$this, 'migration'],
            'permission_callback' => [$this, 'permissions_check'],
        ]);
    }

    /**
     * @return WP_REST_Response
     */
    public function migration() {
        $prefix = 'dm_ce_options_';
        $old_options = ['mandatory', 'content', 'player'];

        // Check old database
        for($i = 0; $i < count($old_options); $i++) {
            $option_name = $prefix . $old_options[$i];
            $option_value = get_option($option_name);
            if(!empty($option_value)) {
                $this->update_new_option($old_options[$i], $option_value);
                delete_option($option_name);
            }
        }

        return new WP_REST_Response(true, 200);
    }

    /**
     * @param $option_name
     * @param $option_value
     */
    public function update_new_option($option_name, $option_value) {
        $prefix = 'dm_ce_options_';

        switch ($option_name) {
            case 'mandatory':
                $playback_auto_options = $prefix . 'auto_embed_playback';
                $playback_manual_options = $prefix . 'manual_embed_playback';
                $content_auto_options = $prefix . 'auto_embed_content';

                if (isset($option_value['player_id'])) {
                    update_option($playback_auto_options, ['player_id' => $option_value['player_id']], false);
                }
                if (isset($option_value['player_id_2'])) {
                    update_option($playback_manual_options, ['player_id' => $option_value['player_id_2']], false);
                }
                if (isset($option_value['sort_by'])) {
                    update_option($content_auto_options, ['sort_by' => $option_value['sort_by']], false);
                }

                break;
            case 'content':
                $content_auto_options = $prefix . 'auto_embed_content';
                $content_manual_options = $prefix . 'manual_embed_content';

                // Merge existing options value with new options value
                $new_content_options = get_option($content_auto_options);
                $new_content_options += $option_value;
                update_option($content_auto_options, $new_content_options, false);

                if (isset($option_value['owners'])) {
                    update_option($content_manual_options, ['owners' => $option_value['owners']], false);
                }

                break;
            case 'player':
                $player_auto_options = $prefix . 'auto_embed_player';
                $player_manual_options = $prefix . 'manual_embed_player';

                update_option($player_auto_options, $option_value, false);
                update_option($player_manual_options, $option_value, false);

                break;
        }
    }

    /**
     * Check if a given request has access to get items
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function permissions_check( $request ) {
        return current_user_can( 'edit_posts' );
    }
}

new Migration_Database();
