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

/**
 * Load the search video component on Classic Editor mode
 *
 * **The script will only load on post/page edit
 *
 */
class Search_Video {

    public function __construct() {
        add_action('admin_enqueue_scripts', [$this, 'enqueue_assets']);
    }

    public function enqueue_assets($hook_suffix) {
        if( 'post.php' == $hook_suffix || 'post-new.php' == $hook_suffix ) {
            wp_enqueue_script(
                'dm-search-video',
                plugin_dir_url(DM__FILE__) . 'build/classic-index.js',
                ['wp-plugins', 'wp-edit-post', 'wp-element', 'wp-components', 'wp-data', 'wp-blocks', 'wp-element', 'wp-block-editor'],
                DM_CE__VERSION,
                true
            );
            wp_enqueue_script(
                'dm-ce',
                'https://statics.dmcdn.net/c/dm-ce.min.js',
                [],
                DM_CE__VERSION,
                true
            );
        }
    }

}

new Search_Video();
