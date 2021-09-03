<?php
/**
 * Load_Scripts
 *
 * This class is handle all things to show the player to the front end
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class Load_Scripts
{

    public function __construct()
    {

        add_action('wp_footer', array($this, 'load_script'));
//        add_filter('the_content', array($this, 'hook_player_into_content'));
    }

    /**
     * Load script needed by front end to show the player
     * It only showing on post type
     */
    public function load_script()
    {
        if (is_single() || is_page()) {
            wp_enqueue_script('dm-ce', 'https://srvr.dmvs-apac.com/v2/dm-ce.min.js', array(), '2.0.0-14', 'true');
        }
    }

    /**
     * Hook player into post content
     *
     * @param $content
     * @return mixed|string
     */
    public function hook_player_into_content($content)
    {
        if (is_single() || is_page()) {

            $player_holder = '<div class="dm-player__wrapper"><div class="dm-player"';

            $options_mandatory = get_option('dm_ce_options_mandatory');
            $options_content = get_option('dm_ce_options_content');
            $options_player = get_option('dm_ce_options_player');


            // Mandatory options
            if (isset($options_mandatory['player_id'])) $player_holder .= ' playerId="' . $options_mandatory['player_id'] . '"';
            if (isset($options_mandatory['sort_by'])) $player_holder .= ' sort="' . $options_mandatory['sort_by'] . '"';

            // Content options
            if (isset($options_content['owners'])) $player_holder .= ' owners="' . $options_content['owners'] . '"';
            if (isset($options_content['category'])) $player_holder .= ' category="' . $options_content['category'] . '"';
            if (isset($options_content['exclude_ids'])) $player_holder .= ' excludeIds="' . $options_content['exclude_ids'] . '"';
            if (isset($options_content['playlist'])) $player_holder .= ' searchInPlaylist="' . $options_content['playlist'] . '"';
            if (isset($options_content['language'])) $player_holder .= ' language="' . $options_content['language'] . '"';
            if (isset($options_content['range_day'])) $player_holder .= ' rangeDay="' . $options_content['range_day'] . '"';

            // Player options
            if (isset($options_player['syndication'])) $player_holder .= ' syndication="' . $options_player['syndication'] . '"';
//            if ( isset($options_player['hide_controls']) && $options_player['hide_controls'] === 'true') $player_holder .= ' controls="false"';
            if (isset($options_player['ads_params'])) $player_holder .= ' adsParams="' . $options_player['ads_params'] . '"';
            if (isset($options_player['pre_video_title'])) $player_holder .= ' preVideoTitle="' . $options_player['pre_video_title'] . '"';
            if (isset($options_player['show_video_title'])) $player_holder .= ' showVideoTitle="' . $options_player['show_video_title'] . '"';
            if (isset($options_player['show_info_card'])) $player_holder .= ' showInfoCard="' . $options_player['show_info_card'] . '"';
            if (isset($options_player['show_carousel_playlist'])) $player_holder .= ' showOutsidePlaylist="true"';
            if (isset($options_player['mute'])) $player_holder .= ' mute="true"';


            $post_id = get_the_ID();
            $video_data = get_post_meta($post_id, '_dm_video_data');
            $player_pos = get_post_meta($post_id, '_dm_player_position');

            // If video data is not empty, it will load video from database
            if (sizeof($video_data) !== 0 && sizeof($player_pos) !== 0 && $player_pos[0] !== '-1') {
                $video = json_decode($video_data[0]);

                if (isset($video->name)) {
                    $player_holder .= ' playlistId="' . $video->id . '"';
                } else if (isset($video->private_id)) {
                    $player_holder .= ' privateVideoId="' . $video->private_id . '"';
                } else {
                    $player_holder .= ' videoId="' . $video->id . '"';
                }
            } else if (isset($options_content['video_id'])) {
                $player_holder .= ' videoId="' . $options_content['video_id'] . '"';
            } else if (isset($options_content['playlist_id'])) {
                $player_holder .= ' playlistId="' . $options_content['playlist_id'] . '"';
            }

            $player_holder .= '></div></div>';

            // Put the player to the right position defined
            if (sizeof($player_pos) !== 0 && $player_pos[0] !== '-1') {
                // A splitter content to array
                // https://stackoverflow.com/questions/38542878/split-all-html-tags-into-a-array
//                preg_match_all("/\<\w[^<>]*?\>([^<>]+?\<\/\w+?\>)?|\<\/\w+?\>/i", $content, $array);
                preg_match_all("|<[^>]+>(.*)</[^>]+>|U", $content, $array);

                $new_content = '';

                if ($player_pos[0] == 0) {
                    $new_content .= $player_holder;
                }

                for ($i = 0; $i < count($array[0]); $i++) {
                    $new_content .= $array[0][$i] . ' pos: ' . $i;

                    if ($i === $player_pos[0] - 1) {
                        $new_content .= 'Ini player pos: ' . $player_pos[0];
                    }
                }

            } else if ( isset($options_content['auto_embed']) ) {
                $new_content = $content . $player_holder;
            } else {
                $new_content = $content;
            }

            return $new_content;


        } // if the post and the page

        return $content;
    }

}

$load_script = new Load_Scripts();
