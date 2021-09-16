<?php
/**
 * Selected Video
 *
 * A custom meta box to show selected video from search
 *
 * @since 1.1.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class Video_Selected {

    public function __construct() {
        add_action('add_meta_boxes', [$this, 'register_meta_box']);
    }

    public function register_meta_box() {
        add_meta_box(
            'dm_video_selected',
            'Video Selected',
            [$this, 'video_selected_view'],
            'post',
            'side',
            'core'

        );
    }

    public function video_selected_view() {
        $video_data = get_post_meta(get_the_ID(), '_dm_video_data', false);
    }
}

new Video_Selected();
