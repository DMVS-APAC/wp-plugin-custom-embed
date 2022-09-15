<?php
/**
 * Class Dm_Endpoints
 */

namespace Dm\Api;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly.

class Custom_Get_Options extends WP_REST_Controller {

    public function __construct() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        $version = '1';
        $namespace = 'dm/v' . $version;

//        register_rest_route($namespace, '/migration', [
//            'methods' => WP_REST_Server::EDITABLE,
//            'callback' => [$this, 'migration'],
//            'permission_callback' => [$this, 'permissions_check'],
//        ]);
    }
}
