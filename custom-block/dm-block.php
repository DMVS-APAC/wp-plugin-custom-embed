<?php
/**
 * DM_Block
 *
 * Custom block for embed dailymotion manually. All the files is under `src`
 * directory.
 *
 *
 * notes: This plugin is still not support multiple column layout. For now,
 *  it is only support for single column layout. Will try to do POC first later
 *  on
 *
 * TODO: try to use multiple column layout to put the player.
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly.

class DM_Block {

    public function __construct() {
        add_action('enqueue_block_editor_assets', [$this, 'dm_wp_ce_enqueue_assets']);
        add_action('init', [$this, 'dm_register_meta']);
    }

    /**
     * Load scripts and styles to dashboard
     */
    public function dm_wp_ce_enqueue_assets() {
        wp_enqueue_script(
            'dm-wp-ce-sidebar',
            plugin_dir_url( DM__FILE__ ) . 'build/index.js',
            ['wp-plugins', 'wp-edit-post', 'wp-element', 'wp-components', 'wp-data', 'wp-blocks', 'wp-element', 'wp-block-editor'],
            DM_CE__VERSION,
            true
        );

        wp_enqueue_script(
            'dm-ce',
            'https://srvr.dmvs-apac.com/v2/dm-ce.min.js',
            [],
            '2.0.0-15',
            true
        );



    }

    /**
     * Register meta for use in gutenberg as custom meta
     */
    public function dm_register_meta() {
        register_meta('post', '_dm_video_data', array(
            'show_in_rest' => true,
            'type' => 'string',
            'single' => true,
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback' => function() {
                return current_user_can('edit_posts');
            }
        ));
        register_meta('post', '_dm_player_position', array(
            'show_in_rest' => true,
            'type' => 'integer',
            'single' => true,
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback' => function() {
                return current_user_can('edit_posts');
            }
        ));
    }

}

$dm_block = new DM_Block();
