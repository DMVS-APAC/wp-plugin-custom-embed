<?php
/**
 * Search Video
 *
 *
 * @since 1.1.0
 */


if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class Search_Video {

    public function __construct() {
        add_action('admin_enqueue_scripts', [$this, 'enqueue_assets']);
        add_action('add_meta_boxes', [$this, 'register_meta_box']);
    }

    public function enqueue_assets() {
        wp_enqueue_script(
            'dm-search-video',
            plugin_dir_url( DM__FILE__ ) . 'build/classic-index.js',
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

    public function register_meta_box() {
        add_meta_box(
            'dm_video_search',
            'Search a Video',
            [$this, 'video_search_view'],
            'post',
            'normal',
            'core'
        );
    }

    public function video_search_view() {
        echo '<div id="dm-search-classic"></div>';
    }
}

new Search_Video();
