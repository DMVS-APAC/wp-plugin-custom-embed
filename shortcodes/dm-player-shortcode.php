<?php
/**
 * The dm-player shortcode.
 *
 * @since 1.0.0
 */

add_shortcode('dm-player', 'dm_player_shortcode');
function dm_player_shortcode($atts, $content) {
    $atts = shortcode_atts(array(
        'privatevideoid' => '',
        'videoid' => '',
        'playlistid' => '',
        'number' => 0
    ), $atts, 'dm-player');

    $options_mandatory = get_option('dm_ce_options_mandatory');
    $options_player = get_option('dm_ce_options_player');
    $params = '';

    // FIXME: for manual embed, we use specific player id
    // Player ID for the player
//    if (isset($options_mandatory['player_id']) && ($atts['number'] === 0 || $atts['number'] === 1) )
//        $params .= ' playerId="' . $options_mandatory['player_id'] . '"';

    // Player ID for multiple player
    if (isset($options_mandatory['player_id_2']))
        $params .= ' playerId="' . $options_mandatory['player_id_2'] . '"';
//    else if (!isset($options_mandatory['player_id_2']))
//        $params .= ' playerId="' . $options_mandatory['player_id'] . '"';

    if ($atts['privatevideoid'] !== '') $params .= ' privateVideoId="' . $atts['privatevideoid'] . '"';
    if ($atts['videoid'] !== '' && $atts['privatevideoid'] === '') $params .= ' videoId="' . $atts['videoid'] . '"';
    if ($atts['playlistid']) $params .= ' playlistId="' . $atts['playlistid'] . '"';

    // Player settings
    if (isset($options_player['syndication'])) $params .= ' syndication="' . $options_player['syndication'] . '"';
    if (isset($options_player['pre_video_title'])) $params .= ' preVideoTitle="' . $options_player['show_video_title'] . '"';
    if (isset($options_player['show_info_card'])) $params .= ' showInfocard="' . $options_player['show_info_card'] . '"';
    if (isset($options_player['show_video_title'])) $params .= ' showVideoTitle="' . $options_player['show_video_title'] . '"';
    if (isset($options_player['show_carousel_playlist'])) $params .= ' showOutsidePlaylist="' . $options_player['show_carousel_playlist'] . '"';
    if (isset($options_player['mute'])) $params .= ' mute="' . $options_player['mute'] . '"';

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

        $params .= ' customParams="' . $ads_params . '"';
    }

    return '<div class="dm-player" ' . $params . ' style="margin-bottom: 1.75em;"></div>';
}

