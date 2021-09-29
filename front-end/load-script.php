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

    private $player_pos_enum = [
        'top',
        'middle',
        'bottom'
    ];

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
            wp_enqueue_script('dm-ce', 'https://srvr.dmvs-apac.com/v2/dm-ce.min.js', array(), '2.0.0-14', 'true');
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

        $options_mandatory = get_option('dm_ce_options_mandatory');
        $options_content = get_option('dm_ce_options_content');
        $options_player = get_option('dm_ce_options_player');


        // Mandatory options
        if (isset($options_mandatory['player_id'])) $player_string .= ' playerId="' . $options_mandatory['player_id'] . '"';
        if (isset($options_mandatory['sort_by'])) $player_string .= ' sort="' . $options_mandatory['sort_by'] . '"';

        // Content options
        if (isset($options_content['owners'])) $player_string .= ' owners="' . $options_content['owners'] . '"';
        if (isset($options_content['category'])) $player_string .= ' category="' . $options_content['category'] . '"';
        if (isset($options_content['exclude_ids'])) $player_string .= ' excludeIds="' . $options_content['exclude_ids'] . '"';
        if (isset($options_content['playlist'])) $player_string .= ' searchInPlaylist="' . $options_content['playlist'] . '"';
        if (isset($options_content['language'])) $player_string .= ' language="' . $options_content['language'] . '"';
        if (isset($options_content['range_day'])) $player_string .= ' rangeDay="' . $options_content['range_day'] . '"';

        // Player options
        if (isset($options_player['syndication'])) $player_string .= ' syndication="' . $options_player['syndication'] . '"';
        if (isset($options_player['ads_params'])) $player_string .= ' adsParams="' . $options_player['ads_params'] . '"';
        if (isset($options_player['pre_video_title'])) $player_string .= ' preVideoTitle="' . $options_player['pre_video_title'] . '"';
        if (isset($options_player['show_video_title'])) $player_string .= ' showVideoTitle="' . $options_player['show_video_title'] . '"';
        if (isset($options_player['show_info_card'])) $player_string .= ' showInfoCard="' . $options_player['show_info_card'] . '"';
        if (isset($options_player['show_carousel_playlist'])) $player_string .= ' showOutsidePlaylist="true"';
        if (isset($options_player['mute'])) $player_string .= ' mute="true"';


        $video_data = get_post_meta($post_id, '_dm_video_data');
        $video = json_decode($video_data[0]);

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
            'auto' => isset($options_content['auto_embed']) ?? $options_content['auto_embed'],
            'pos' => isset($options_player['auto_player_pos']) ? $options_player['auto_player_pos'] : 'bottom',
            'string' => $player_string
        ];
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


            // Put the player to the right position defined
            if ( isset($player_pos) && in_array($player_pos[0], $this->player_pos_enum) ) {
                //TODO: refactor this function
                $new_content = '';
                switch ($player_pos[0]):
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

            // `$player_post` has a mixed value string and number, so need to filter based on both
            } else if ( sizeof($player_pos) !== 0 && $player_pos[0] !== '-1' && !empty($player_pos[0]) ) {
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

            } else if ( isset($player_holder['auto']) ) {
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

    private function put_the_player($content, $pos) {

    }

}

$load_script = new Load_Scripts();
