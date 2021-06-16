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
     */
    public function register_routes() {
        $version = '1';
        $namespace = 'dm/v' . $version;

        // get custom options
        register_rest_route( $namespace, '/get-custom-options/(?P<tab>[a-zA-Z0-9-]+)', [
            [
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => [ $this, 'get_custom_option' ],
            ]
        ]);

        register_rest_route($namespace, '/get-api-key/',
        [
            'methods'               => WP_REST_Server::READABLE,
            'callback'              => [ $this, 'get_api_key' ],
            'permission_callback'   => [ $this, 'get_permissions_check']
        ]);
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
    public function get_custom_option( $request ) {

        $tab = $request->get_param('tab');
        $options = get_option('dm_ce_options_' . $tab);

        return new WP_REST_Response( $options, 200 );
    }

    /**
     * Check if a given request has access to get items
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function get_permissions_check( $request ) {
        //return true; <--use to make readable by all
        return current_user_can( 'publish_posts' );
    }
}

$getOptions = new Custom_Get_Options();