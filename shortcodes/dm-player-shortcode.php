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
        'number' => 0,
        'acf_field' => '',
    ), $atts, 'dm-player');

    $options_playback = get_option('dm_ce_options_manual_embed_playback');
    $options_player = get_option('dm_ce_options_manual_embed_player');
    $params = '';

    // Player ID for multiple player
    if (isset($options_playback['player_id']))
        $player_url = 'https://geo.dailymotion.com/player/' . $options_playback['player_id'] . '.js';
    else
        $player_url = 'https://geo.dailymotion.com/player.js';


    $video_id = $atts['privatevideoid'] ?: $atts['videoid'];
    $playlist_id = $atts['playlistid'];

    // @see: https://www.advancedcustomfields.com/resources/code-examples/
    if (function_exists('get_field')) {
        if (empty($video_id) && empty($playlist_id) && !empty($atts['acf_field'])) {
            // get field from advancedcustomfields
            $video_id = get_field($atts['acf_field']);
            // cleaning url
            $video_id = preg_replace('#^https?://www\.dailymotion\.com/(?:embed/)?video/([^/\? ]+).*$#', '\\1', $video_id);
        }
    }

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

    return '<div class="dm-wrapper" style="margin-bottom: 1.75em;"><script src="' . $player_url . '" ' . $content . ' data-params="' . $params . '" referrerpolicy="no-referrer-when-downgrade"></script></div>';
}

