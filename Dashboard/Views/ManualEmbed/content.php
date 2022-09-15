<?php
/**
 * A content settings section tab
 *
 * @since 1.1.0-6
 */

$categories = [
    '',
    'animals',
    'creation',
    'auto',
    'school',
    'people',
    'fun',
    'videogames',
    'tech',
    'latino',
    'lifestyle',
    'shortfilms',
    'music',
    'news',
    'redband',
    'sport',
    'tv',
    'travel',
    'webcam'
];

$sorts = [
    'least-visited' => 'Least Visited',
    'live-audience' => 'Live Audience',
    'old' => 'Old',
    'random' => 'Random',
    'recent' => 'Recent',
    'relevance' => 'Relevance',
    'trending' => 'Trending',
    'visited' => 'Visited',
    'visited-hour' => 'Visited Hour',
    'visited-month' => 'Visited Month',
    'visited-today' => 'Visited Today',
    'visited-week' => 'Visited Week'
];

?>

<div class="dm__box-wrapper">
    <p>Adding channel names below will limit video search results in the WordPress post interface to these channel catalogues.</p>
</div>

<form action="<?php echo get_admin_url() . 'admin.php?page=dm-manual-embed-settings&tab=content&action=save_data'; ?>" method="post">

    <?php wp_nonce_field("dm_save_data", "dm_save_data", true); ?>

    <table class="form-table" role="presentation">

        <tbody>

        <tr>
            <th scope="row"><label for="channel-name"><?php echo __('Channel Name'); ?> <span class="detail-info">?<span class="tooltip">One or several channel usernames (www.dailymotion.com/<strong>yourchannelusername</strong>). This is case sensitive so pay attention to caps and special characters. If you pick several values, separate them with a ",".</span></span></label></th>
            <td>
                <input name="channel_name" type="text" id="channel-name" class="regular-text"
                       value="<?php echo ( isset($options['owners']) ) ? $options['owners'] : '' ?>">
            </td>
        </tr>

        </tbody>

    </table>

    <p class="submit">
        <input type="submit" name="submit" id="submit" class="button button-primary" value="Save">
    </p>
</form>
