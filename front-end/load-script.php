<?php
/**
 * Load_Scripts
 *
 * This class is handle all things to show the player to the front end
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

class Load_Scripts {

    public function __construct() {

        add_action('wp_footer', array($this, 'load_script'));
        add_filter( 'the_content', array($this, 'hook_player_into_content'));
    }

    /**
     * Load script needed by front end to show the player
     * It only showing on post type
     */
    public function load_script() {
        if ( is_single() ) {
            wp_enqueue_script('dm-ce', 'https://srvr.dmvs-apac.com/v2/dm-ce.min.js', array(), '2.0.0-14', 'true');
//            wp_enqueue_script('dm-ce', 'https://dm-ce-2.test/dm-ce.js', array(), '2.0.0-beta-14', true);
        }
    }

    /**
     * Hook player into post content
     *
     * @param $content
     * @return mixed|string
     */
    public function hook_player_into_content ( $content ) {

        if ( is_single() ) {

            $player_holder = '<div class="dm-player__wrapper"><div class="dm-player"';

            $options_mandatory = get_option('dm_ce_options_mandatory');
            $options_content = get_option('dm_ce_options_content');
            $options_player = get_option('dm_ce_options_player');

            // Mandatory options
            if ($options_mandatory['owners']) $player_holder .= ' owners="' . $options_mandatory['owners'] . '"';
            if ($options_mandatory['sort']) $player_holder .= ' sort="' . $options_mandatory['sort'] . '"';

            // Content options
            if ($options_content['category']) $player_holder .= ' category="' . $options_content['category'] . '"';
            if ($options_content['exclude_ids']) $player_holder .= ' excludeIds="' . $options_content['exclude_ids'] . '"';
            if ($options_content['playlist']) $player_holder .= ' searchInPlaylist="' . $options_content['playlist'] . '"';
            if ($options_content['syndication']) $player_holder .= ' syndication="' . $options_content['syndication'] . '"';
//            if ($options_content['disable_queue'] === 'true') $player_holder .= ' queueEnable="false"';
//            if ($options_content['disable_auto_next'] === 'true') $player_holder .= ' queueEnableNext="false"';
            if ($options_content['language']) $player_holder .= ' language="' . $options_content['language'] . '"';
            if ($options_content['keywords_selector']) $player_holder .= ' keywordsSelector="' . $options_content['keywords_selector'] . '"';
            if ($options_content['range_day']) $player_holder .= ' rangeDay="' . $options_content['range_day'] . '"';

            // Player options
            if ($options_player['hide_controls'] === 'true') $player_holder .= ' controls="false"';
            if ($options_player['ads_params']) $player_holder .= ' adsParams="' . $options_player['ads_params'] . '"';
            if ($options_player['pre_video_title']) $player_holder .= ' preVideoTitle="' . $options_player['pre_video_title'] . '"';
            if ($options_player['show_video_title']) $player_holder .= ' showVideoTitle="' . $options_player['show_video_title'] . '"';
            if ($options_player['show_info_card']) $player_holder .= ' showInfoCard="' . $options_player['show_info_card'] . '"';
            if ($options_player['show_carousel_playlist']) $player_holder .= ' showOutsidePlaylist="true"';
            if ($options_player['hide_controls_ad']) $player_holder .= ' adHideControls="true"';
//            if ($options_player['pip_at_start']) $player_holder .= ' pipAtStart="true"';
//            if ($options_player['click_to_play']) $player_holder .= ' noSTP="true"';
            if ($options_player['deactivate_pip']) $player_holder .= ' noPip="true" scrollToPause="true"';


            $post_id = get_the_ID();
            $video_data = get_post_meta($post_id, '_dm_video_data');
            $player_pos = get_post_meta($post_id, '_dm_player_position');

            // If video data is not empty, it will load video from database
            if (sizeof($video_data) !== 0) {
                $video = json_decode($video_data[0]);

                if ($video->private_id) {
                    $player_holder .= ' privateVideoId="' . $video->private_id . '"';
                } else {
                    $player_holder .= ' videoId="' . $video->id . '"';
                }
            } else if ($options_content['video_id']) {
                $player_holder .= ' videoId="' . $options_content['video_id'] . '"';
            }

            $player_holder .= '></div></div>';

            if (sizeof($player_pos) !== 0 && $player_pos[0] !== '-1' ) {
                $content = explode("</p>", $content);

                $new_content = '';

                if ($player_pos[0] == 0) {
                    $new_content .= $player_holder;
                }

                for ($i = 0; $i < count($content); $i++) {
                    $new_content .= $content[$i] . "</p>";

                    if ($i === $player_pos[0] - 1) {
                        $new_content .= $player_holder;
                    }
                }

            } else {
                $new_content = $content . $player_holder;
            }

            return $new_content;
        }

        return $content;
    }

}

$load_script = new Load_Scripts();
