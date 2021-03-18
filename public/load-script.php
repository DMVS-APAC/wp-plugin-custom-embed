<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

class Load_Scripts {
    private $options;

    public function __construct() {
        $this->options = get_option('dm_ce_option');

        add_action('wp_footer', array($this, 'load_script'));
        add_filter( 'the_content', array($this, 'hook_player_into_content'));
        add_shortcode('dmPlayer', array($this, 'embed_video'));
    }

    public function load_script() {
//        require DM__PATH . 'public/ce-script.php';
        // This is a staging url
        if ( is_single() ) {
            wp_enqueue_script('dm-ce', 'https://staging.dmvs-apac.com/custom-embed-v2/dm-ce.js', array(), '2.0.0-alpha', 'true');
        }
    }

    public function hook_player_into_content ( $content ) {

//        if ( is_single() && $this->options['auto_embed'] == 'true' ) {
        if ( is_single() ) {

            $new_content = '';
//            switch ($this->options['video_position']) {
//                case "top":
//                    $new_content = '<div id="dm-player"></div>' . $content;
//                    break;
//                case "middle":
//                    $paragraphAfter = 2; //Enter number of paragraphs to display ad after.
//                    $content = explode("</p>", $content);
//                    for ($i = 0; $i < count($content); $i++) {
//                        if ($i == $paragraphAfter) {
//                            $new_content .= '<div id="dm-player"></div>';
//                        }
//                        $new_content .= $content[$i] . "</p>";
//                    }
//                    break;
//                case "bottom":
//                    $new_content = $content . '<div id="dm-player"></div>';
//                    break;
//                default:
//                    $new_content = '<div id="dm-player" owners="suaradotcom" sort="relevance"></div>' . $content;
//            }

            $player_holder = '<div class="dm-player"';

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
            if ($options_content['disable_queue'] === 'true') $player_holder .= ' queueEnable="false"';
            if ($options_content['disable_auto_next'] === 'true') $player_holder .= ' queueEnableNext="false"';
            if ($options_content['language']) $player_holder .= ' language="' . $options_content['language'] . '"';
            if ($options_content['keywords_selector']) $player_holder .= ' keywordsSelector="' . $options_content['keywords_selector'] . '"';
            if ($options_content['range_day']) $player_holder .= ' rangeDay="' . $options_content['range_day'] . '"';
            if ($options_content['video_id']) $player_holder .= ' videoId="' . $options_content['video_id'] . '"';

            // Player options
            if ($options_player['hide_controls'] === 'true') $player_holder .= ' controls="false"';
            if ($options_player['ads_params']) $player_holder .= ' adsParams="' . $options_player['ads_params'] . '"';
            if ($options_player['pre_video_title']) $player_holder .= ' preVideoTitle="' . $options_player['pre_video_title'] . '"';
            if ($options_player['show_video_title']) $player_holder .= ' showVideoTitle="' . $options_player['show_video_title'] . '"';
            if ($options_player['show_info_card']) $player_holder .= ' showInfoCard="' . $options_player['show_info_card'] . '"';
            if ($options_player['show_carousel_playlist'] === true) $player_holder .= ' showCarouselPlaylist="true"';
            if ($options_player['hide_controls_ad'] === true) $player_holder .= ' adHideControls="true"';
            if ($options_player['pip_at_start'] === true) $player_holder .= ' pipAtStart="true"';
            if ($options_player['click_to_play'] === true) $player_holder .= ' noSTP="true"';
            if ($options_player['deactivate_pip'] === true) $player_holder .= ' noPip="true" scrollToPause="true"';


            $player_holder .= '></div>';

            $new_content = $player_holder . $content;

            return $new_content;
        }

        return $content;
    }

    public function embed_video() {
        return '<div id="dm-player"></div>';
    }
}

$load_script = new Load_Scripts();
