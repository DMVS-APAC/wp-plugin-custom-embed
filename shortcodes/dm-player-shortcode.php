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

    $options_playback = get_option('dm_ce_options_manual_embed_playback');
    $options_player = get_option('dm_ce_options_manual_embed_player');
    $params = '';

    // Player ID for multiple player
    if (isset($options_playback['player_id']))
        $player_id = $options_playback['player_id'];
    else
        $player_id = "x2yci";


    $video_id = $atts['privatevideoid'] ?: $atts['videoid'];
    $playlist_id = $atts['playlistid'];

    // Player settings
    if (isset($options_player['syndication'])) $params .= 'syndicationKey=' . $options_player['syndication'];
    if (isset($options_player['mute'])) $params .= '&mute=' . $options_player['mute'];

    // TODO: discuss to add this feature, now this is still inactive
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

        $params .= '&customConfig[customParams]=' . $ads_params;
    }

    $params .= '&dmPubtool=' . DM__PUBTOOL;
    $content = $playlist_id ? 'data-playlist="' . $playlist_id . '"' : 'data-video="' . $video_id . '"';

    return '<div class="dm-wrapper" style="margin-bottom: 1.75em;"><script src="https://geo.dailymotion.com/player/' . $player_id . '.js" ' . $content . ' data-params="' . $params . '" referrerpolicy="no-referrer-when-downgrade"></script></div>';
}

