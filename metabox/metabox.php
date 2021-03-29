<?php

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly.

class DM_Metabox {

    public function __construct() {
//        add_action( 'add_meta_boxes', array($this, 'wporg_add_custom_box') );
        add_action('enqueue_block_editor_assets', [$this, 'dm_wp_ce_enqueue_assets']);


        add_action('init', [$this, 'myprefix_register_meta']);
    }

    public function dm_wp_ce_enqueue_assets() {
        wp_enqueue_script(
            'dm-wp-ce-sidebar',
            plugin_dir_url( DM__FILE__ ) . 'build/index.js',
            ['wp-plugins', 'wp-edit-post', 'wp-element', 'wp-components', 'wp-data'],
            '1.0.0',
            true
        );

//        wp_enqueue_script(
//                'dm-sdk',
//            "https://api.dmcdn.net/all.js",
//            [],
//            '',
//            true
//        );

        wp_enqueue_style(
            'dm-editor-stylesheet',
            plugin_dir_url(DM__FILE__) . 'assets/editor.css'
        );
    }

    public function myprefix_register_meta() {
        register_meta('post', '_dm_manual_embed', array(
            'show_in_rest' => true,
            'type' => 'string',
            'single' => true,
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback' => function() {
                return current_user_can('edit_posts');
            }
        ));
    }

    public function wporg_add_custom_box() {
//        $screens = [ 'post', 'page' ];
//        foreach ( $screens as $screen ) {
            add_meta_box(
                'wporg_box_id',                 // Unique ID
                'Custom Meta Box Title',      // Box title
                array($this, 'wporg_custom_box_html'),  // Content callback, must be of type callable
                'post', // Post type
                'advanced',
                'high'
            );
//        }
    }

    public function wporg_custom_box_html( $post ) {
        ?>
        <label for="wporg_field">Description for this field</label>
        <select name="wporg_field" id="wporg_field" class="postbox">
            <option value="">Select something...</option>
            <option value="something">Something</option>
            <option value="else">Else</option>
        </select>
        <?php
    }

}

$dm_metabox = new DM_Metabox();
