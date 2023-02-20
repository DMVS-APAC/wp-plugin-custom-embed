<?php

namespace Dm\Dashboard;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly.

abstract class DashboardAbstract {

    public function __construct() {
        $this->register_menu();
    }

    abstract public function register_menu();
    abstract public function load_template_page();
    abstract public function store_data(array $params, string $tab);

    protected function sanitize_this(string $param, string $type = 'POST') {
        // Nonce Verification happened on store_general_options() and store_credentials()
        if ($type === 'POST') {
            return isset($_POST[$param]) ? sanitize_text_field( wp_unslash( $_POST[$param] ) ) : null; // phpcs:ignore WordPress.Security.NonceVerification
        } else {
            return isset($_GET[$param]) ? sanitize_text_field( wp_unslash( $_GET[$param] ) ) : null; // phpcs:ignore WordPress.Security.NonceVerification
        }
    }
}