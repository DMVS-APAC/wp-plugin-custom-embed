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
        add_action('save_post', [$this, 'save_video_search']);
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
        $post_id = get_the_ID();
        $player_pos = get_post_meta($post_id, '_dm_player_position', true);
        $isNull = (isset($player_pos) && $player_pos !== '') ? false : true;

        $player_pos_enum = [
            '',
            'top',
            'middle',
            'bottom'
        ];

        echo '<script type="text/javascript"> const postId = ' . $post_id . '</script>';
        echo '<input type="hidden" id="dm_video_data" name="_dm_video_data">';


        echo '<h3>' . __('Player Position') . '</h3>';
        echo '<select name="_dm_player_position" class="regular-text" id="dm_player_position">';
        for($i = 0; $i < sizeof($player_pos_enum); $i++) {
            echo '<option value="' . $player_pos_enum[$i] . '" ';
            if ( $isNull === false && $player_pos === $player_pos_enum[$i]
                || '' === $player_pos_enum[$i] ) {
                echo 'selected ';
            }
            echo '>' . $player_pos_enum[$i] . '</option>';
        }
        echo '</select>';
        echo '<hr>';

        echo '<div id="dm-search-classic"></div>';
    }

    public function save_video_search( $post_id) {
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
        if ( $parent_id = wp_is_post_revision( $post_id ) ) {
            $post_id = $parent_id;
        }

        $postmetas = [ '_dm_video_data', '_dm_player_position' ];

        for ($i = 0; $i < sizeof($postmetas); $i++) {
            if ( isset( $_POST[ $postmetas[$i] ] ) ) {
                update_post_meta( $post_id, $postmetas[$i], sanitize_text_field( $_POST[ $postmetas[$i] ] ) );
            }
        }
    }
}

new Search_Video();
