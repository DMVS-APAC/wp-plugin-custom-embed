<?php

namespace Dm\Libs;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly.

Class Sessions {

    public function __construct() {
        add_action( 'init', array($this, 'session_init'));
        add_action( 'wp_logout', array($this, 'session_destroy'));
    }

    public function session_init() {
        if ( !session_id() ) {
            session_start();
        }
    }

    public function session_destroy() {
        session_destroy();
    }
}
