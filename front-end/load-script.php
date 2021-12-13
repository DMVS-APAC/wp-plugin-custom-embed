<?php
/**
 * Load_Scripts
 *
 * This class is handle all things to show the player to the front end.
 * Technically, it is hook the player inside the content via `add_filter`.
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class Load_Scripts {


    public function __construct() {
        add_action('wp_footer', array($this, 'load_script'));
        add_filter('the_content', array($this, 'hook_player_into_content'));
    }

    /**
     * Load script needed by front end to show the player
     * It only showing on post type
     */
    public function load_script() {
        if (is_single() || is_page()) {
            wp_enqueue_script('dm-ce', 'https://srvr.dmvs-apac.com/v2/dm-ce.min.js', array(), '2.0.0-beta.40', 'true');
        }
    }

    /**
     *
     *
     * @param $post_id int
     * @param $player_pos int
     * @return array it contains auto embed status, player position for auto embed, player string holder
     */
    private function generate_player_holder($post_id, $player_pos): array {
        $player_string = '<div class="dm-player__wrapper"><div class="dm-player"';


        $options_auto_content = get_option('dm_ce_options_auto_embed_content');

        if (isset( $options_auto_content['auto_embed'] ) && $options_auto_content['auto_embed'] == true) {
            $options_content = $options_auto_content;
            $options_playback = get_option('dm_ce_options_auto_embed_playback');
            $options_player = get_option('dm_ce_options_auto_embed_player');
        } else {
            $options_content = get_option('dm_ce_options_manual_embed_content');
            $options_playback = get_option('dm_ce_options_manual_embed_playback');
            $options_player = get_option('dm_ce_options_manual_embed_player');
        }


        // playback options
        if (isset($options_playback['player_id'])) {
            $player_string .= ' playerId="' . $options_playback['player_id'] . '"';
        } else {
            // Default player id no auto play, no PiP from Yudhi's Channel
            $player_string .= ' playerId="x2yci"';
        }

        // Content options
        if (isset( $options_auto_content['auto_embed'] ) && $options_auto_content['auto_embed'] == true) {
            if (isset($options_content['owners'])) $player_string .= ' owners="' . $options_content['owners'] . '"';
            if (isset($options_content['sort_by'])) $player_string .= ' sort="' . $options_content['sort_by'] . '"';
            if (isset($options_content['category'])) $player_string .= ' category="' . $options_content['category'] . '"';
            if (isset($options_content['exclude_ids'])) $player_string .= ' excludeIds="' . $options_content['exclude_ids'] . '"';
            if (isset($options_content['playlist'])) $player_string .= ' searchInPlaylist="' . $options_content['playlist'] . '"';
            if (isset($options_content['language'])) $player_string .= ' language="' . $options_content['language'] . '"';
            if (isset($options_content['range_day'])) $player_string .= ' rangeDay="' . $options_content['range_day'] . '"';
        }

        // Player options
        if (isset($options_player['syndication'])) $player_string .= ' syndication="' . $options_player['syndication'] . '"';
        if (isset($options_player['pre_video_title'])) $player_string .= ' preVideoTitle="' . $options_player['pre_video_title'] . '"';
        if (isset($options_player['show_video_title'])) $player_string .= ' showVideoTitle="' . $options_player['show_video_title'] . '"';
        if (isset($options_player['show_info_card'])) $player_string .= ' showInfoCard="' . $options_player['show_info_card'] . '"';
        if (isset($options_player['show_carousel_playlist'])) $player_string .= ' showOutsidePlaylist="true"';
        if (isset($options_player['mute'])) $player_string .= ' mute="true"';

        // adsParams now is customParams, but in the database it is still adsParams
        if (isset($options_player['ads_params'])) {
            $split_ads_params = explode(',', $options_player['ads_params']);
            $ads_params = '';

            for ($i = 0; $i < count($split_ads_params); $i++) {
                if ($i === 1) {
                    $ads_params .= '/var' . $i . '=' . $split_ads_params[$i];
                } else if ($i > 1) {
                    $ads_params .= '&var' . $i . '=' . $split_ads_params[$i];
                } else {
                    $ads_params .= $split_ads_params[$i];
                }
            }

            $player_string .= ' customParams="' . $ads_params . '"';
        }


        $video_data = get_post_meta($post_id, '_dm_video_data');
        $video = isset($video_data[0]) ? json_decode($video_data[0]) : null;

        // If video data is not empty, it will load video from database
        // the `$player_pos` is the indicator if the player is embedded in the page or not
        if ( !empty($video) &&
            sizeof($player_pos) !== 0 &&
            $player_pos[0] !== '-1' &&
            !empty($player_pos[0])
        ) {

            if (isset($video->name)) {
                $player_string .= ' playlistId="' . $video->id . '"';
            } else if (isset($video->private_id)) {
                $player_string .= ' privateVideoId="' . $video->private_id . '"';
            } else {
                $player_string .= ' videoId="' . $video->id . '"';
            }
        } else if (isset($options_content['video_id'])) {
            $player_string .= ' videoId="' . $options_content['video_id'] . '"';
        } else if (isset($options_content['playlist_id'])) {
            $player_string .= ' playlistId="' . $options_content['playlist_id'] . '"';
        }

        $player_string .= '></div></div>';

        return [
            'auto' => isset($options_auto_content['auto_embed']) ?? $options_auto_content['auto_embed'],
            'pos' => isset($options_player['auto_player_pos']) ? $options_player['auto_player_pos'] : 'bottom',
            'string' => $player_string
        ];
    }

    /**
     * To count the number of players in the page
     *
     * FIXME: This function is not used for a while until we have another unique case
     *
     * @param $matches
     * @return string
     */
    function shortcode_counter($matches) {
        static $i = 1;
        return '[dm-player number="' . $i++ .'" ';
    }

    /**
     * Clean the html tag node from generated empty string typed `#text`
     *
     * @param mixed $html tags generated nodes
     * @return array a list of html tags
     */
    private function cleanup_html($html): array {
        for ($i = 0; $i < $html->length; $i++) {
            if ($html[$i]->nodeName !== '#text') {
                $html_temp[] = $html[$i];
            }
        }

        return $html_temp;
    }

    /**
     * Hook player into post content
     *
     * It's re-tailor the post content to insert the player inside it.
     *
     * @param $content
     * @return mixed|string
     */
    public function hook_player_into_content($content) {
        if (is_single() || is_page()) {

            $post_id = get_the_ID();
            $player_pos = get_post_meta($post_id, '_dm_player_position');

            $player_holder = $this->generate_player_holder($post_id, $player_pos);

            // FIXME: We don't use this for a while
            // To check and adding `number` string to the shortcode to handle multiple players
//            $content = preg_replace_callback('/\[dm-player/', [$this, 'shortcode_counter'], $content);

            if (!empty($content)) {
                $dom = new DOMDocument;
                // This is to avoid error on HTML5 tag detected like `<figure>`, `<figcaption>`. DOMDocument still based on HTML4 though
                libxml_use_internal_errors(true);
                $dom->loadHTML($content);

                // TODO we still have problem with this `getElementsByTagName`, the result is included empty string.
                //  The empty string is messed up the `childNodes` so can't count it properly. Unfortunately,
                //  the `shortcode` identified the same as an empty string type, `#text`.
                $body = $dom->getElementsByTagName('body')->item(0)->childNodes;
                $body = $this->cleanup_html($body);
            }

            // `$player_post` has a mixed value string and number, so need to filter based on both
            if ( sizeof($player_pos) !== 0 && $player_pos[0] !== '-1' && !empty($player_pos[0]) ) {
                $new_content = '';

                if ($player_pos[0] == 0) {
                    $new_content .= $player_holder['string'];
                }

                if (!empty($content)) {
                    for ($i = 0; $i < sizeof($body); $i++) {

                        $new_content .= $dom->saveHTML($body[$i]);

                        if ($i == $player_pos[0] - 1) {
                            $new_content .= $player_holder['string'];
                        }
                    }
                }

            } else if ( isset($player_holder['auto']) && $player_holder['auto'] === true ) {
                $new_content = '';
                switch ($player_holder['pos']):
                    case 'top':
                        $new_content = $player_holder['string'] . $content;
                        break;
                    case 'middle':
                        $middle_pos = round(sizeof($body) / 2);
                        for ($i = 0; $i < sizeof($body); $i++) {

                            $new_content .= $dom->saveHTML($body[$i]);

                            if ($i == $middle_pos - 1) {
                                $new_content .= $player_holder['string'];
                            }
                        }
                        break;
                    default:
                        $new_content = $content . $player_holder['string'];
                endswitch;

            } else {
                $new_content = $content;
            }

            return $new_content;


        } // if the post and the page

        return $content;
    }

}

$load_script = new Load_Scripts();
