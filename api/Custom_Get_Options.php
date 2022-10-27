<?php
/**
 * Class Custom_Get_Options
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly.

class Custom_Get_Options extends WP_REST_Controller {

    public function __construct() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    /**
     * Register the routes for the objects of the controller.
     *
     * Endpoint list:
     *
     * 1. `get-custom-options` - read only
     * 2. `get-api-key` - read only
     * 3. `userinfo` - read and update
     * 4. `custom-post-meta` - read only
     * 5. `update-auto-embed` - update
     */
    public function register_routes() {
        $version = '1';
        $namespace = 'dm/v' . $version;

        /*
         * Get custom options from database
         */
        register_rest_route( $namespace, '/get-custom-options/(?P<tab>[a-zA-Z0-9-_]+)', [
            [
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => [ $this, 'get_custom_option' ],
                'permission_callback'   => [ $this, 'permissions_check']
            ]
        ]);

        /*
         *  Get the API Key
         */
        register_rest_route($namespace, '/get-api-key/', [
            [
                'methods'               => WP_REST_Server::READABLE,
                'callback'              => [ $this, 'get_api_key' ],
                'permission_callback'   => [ $this, 'permissions_check']
            ]
        ]);

        /*
         * Userinfo read and update
         */
        register_rest_route($namespace, '/userinfo', [
            [
                'methods'               => WP_REST_Server::READABLE,
                'callback'              => [ $this, 'get_dm_user'],
                'permission_callback'   => [ $this, 'permissions_check']
            ],
            [
                'methods'               => WP_REST_Server::EDITABLE,
                'callback'              => [ $this, 'update_dm_user'],
                'permission_callback'   => [ $this, 'permissions_check'],
                'args'                  => $this->get_endpoint_args_for_item_schema(true),
            ]
        ]);

        /*
         * Get custom post meta
         */
        register_rest_route($namespace, '/custom-post-meta/', [
            [
                'methods'               => WP_REST_Server::EDITABLE,
                'callback'              => [ $this, 'get_custom_post_meta'],
                'permission_callback'   => [ $this, 'permissions_check'],
                'args'                  => $this->get_endpoint_args_for_item_schema(true),
            ]
        ]);

        /**
         * Update auto embed
         */
        register_rest_route($namespace, '/update-auto-embed/', [
            [
                'methods'               => WP_REST_Server::EDITABLE,
                'callback'              => [ $this, 'update_auto_embed'],
                'permission_callback'   => [ $this, 'permissions_check'],
                'args'                  => $this->get_endpoint_args_for_item_schema(true),
            ]
        ]);
    }

    /**
     * @param $request
     * @return WP_REST_Response
     */
    public function get_custom_post_meta(WP_REST_Request $request): WP_REST_Response {
        $post_id = $request->get_param('post_id');
        $meta_name = $request->get_param('meta_name');
        $post_meta = get_post_meta($post_id, $meta_name);

        return new WP_REST_Response($post_meta, 200);
    }

    /**
     * Get API Key
     *
     * @return WP_Error|WP_REST_Response
     */
    public function get_api_key() {
        $options = get_option('dm_ce_credentials');

        return new WP_REST_Response($options, 200);
    }


    /**
     * Get options
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    public function get_custom_option( WP_REST_Request $request ) {

        $tab = $request->get_param('tab');
        $options = get_option('dm_ce_options_' . $tab);

        return new WP_REST_Response( $options, 200 );
    }

    /**
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_REST_Response
     */
    public function get_dm_user(WP_REST_Request $request ): WP_REST_Response {
        $current_user = wp_get_current_user();
        $dmUser = get_option('dm_ce_user_' . $current_user->data->user_login);

        return new WP_REST_Response( $dmUser, 200);
    }

    /**
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_REST_Response
     */
    public function update_dm_user(WP_REST_Request $request ): WP_REST_Response {
        $current_user = wp_get_current_user();
        $dmUser = $request->get_json_params();

        update_option('dm_ce_user_' . $current_user->data->user_login, $dmUser);

        return new WP_REST_Response( true, 200);
    }

    /**
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_REST_Response
     */
    public function update_auto_embed(WP_REST_Request $request ): WP_REST_Response {
        $auto_embed = $request->get_json_params();
        update_option('dm_ce_options_auto_embed', $auto_embed);

        return new WP_REST_Response( true, 200);
    }

    /**
     * Check if a given request has access to get items
     *
     * @return bool
     */
    public function permissions_check(): bool {
        return current_user_can( 'edit_posts' );
    }
}

$getOptions = new Custom_Get_Options();
