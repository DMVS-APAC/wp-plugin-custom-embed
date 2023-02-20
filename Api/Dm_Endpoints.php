<?php
/**
 * Class Dm_Endpoints
 *
 * This is a version 2 of dm api
 */

namespace Dm\Api;

use WP_REST_Controller;
use WP_Rest_Response;
use WP_Rest_Server;
use WP_Rest_Request;

use Dm\Sdk\DailymotionPrivateAPI as DmSdk;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly.

class DM_Endpoints extends WP_REST_Controller {

    public function __construct() {
        add_action('rest_api_init', [$this, 'registerRoutes']);
    }

    public function registerRoutes() {
        $version = '2';
        $namespace = 'dm/v' . $version;

        register_rest_route($namespace, '/get-option/(?P<option_name>[a-zA-Z0-9-_]+)', [
            'methods' => WP_REST_Server::READABLE,
            'callback' => [$this, 'getOption'],
            'permission_callback' => [$this, 'permissionsCheck'],
        ]);


        register_rest_route($namespace, '/request-Api', [
            'methods' => WP_REST_Server::EDITABLE,
            'callback' => [$this, 'requestApi'],
            'permission_callback' => [$this, 'permissionsCheck'],
        ]);
    }

    /**
     * A module to handle api request to get site option
     *
     * @param WP_Rest_Request $request
     * @return WP_Rest_Response
     */
    public function getOption(WP_REST_Request $request): WP_REST_Response {
        $prefix = 'dm_ce_';
        $option = $request->get_param('option_name');
        $option_data = get_option($prefix . $option);

        if ( $option_data === false ) $option_data = array();

        return new WP_REST_Response( $option_data, 200);
    }

    public function requestApi(WP_Rest_Request $request): WP_Rest_Response {
        $url = $request->get_param('url');
//        $method = $request->get_param('method');
        $params = $request->get_param('data');

        $sdk = new DmSdk;

        $data = $sdk->fetchData($url, 'GET', $params);

        return new WP_Rest_Response( $data, 200);
    }

    /**
     * Check if a given request has access to get items
     *
     * @param  $request WP_REST_Request Full data about the request.
     * @return WP_Error|bool
     */
    public function permissionsCheck(WP_Rest_Request $request ) {
        return current_user_can( 'edit_posts' );
    }
}
