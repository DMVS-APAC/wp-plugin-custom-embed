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
    <p>Only use this section if you need to search and recommend public content from a specific pool of channels; it can
        be a mix of channels you own and 3rd parties.</p>

    <p>Once you input channels in the dedicated field,</p>
    <ol>
        <li>The script will recommend content automatically if you toggle the option on - no further action needed</li>
        <li>However you can still manually search videos from the channels you input through the dailymotion search bar
            when writing posts</li>
        <li>If you leave the channel field blank, we will recommend global content</li>
    </ol>
</div>

<form
    action="<?php echo get_admin_url() . 'admin.php?page=dm-automated-embed-settings&tab=content&action=save_data'; ?>"
    method="post">

    <?php wp_nonce_field("dm_save_data", "dm_save_data", true); ?>

    <table class="form-table" role="presentation">

        <tbody>
            <tr>
                <th scope="row"><?php echo __('Automatic Embed'); ?> <span class="detail-info">?<span class="tooltip">By
                            <strong>default</strong>, automatic custom embed is disabled. Toggle this on to apply the
                            custom embed to all your posts automatically; the script will fetch and embed a video based
                            on the filters you defined in the plugin settings.</span></span></th>
                <td>
                    <fieldset>
                        <legend class="screen-reader-text"><span><?php echo __('Automatic Embed'); ?></span></legend>
                        <label for="auto_embed">
                            <input name="auto_embed" type="checkbox" id="auto_embed" value="1"
                                <?php echo ( isset($options['auto_embed']) ) ? 'checked' : '' ?>>
                        </label>
                    </fieldset>
                    <p class="description">Toggle on/off to enable/disable automatic custom embeds</p>
                </td>
            </tr>

            <tr>
                <th scope="row">
                    <?php echo __('Replace Old Embed'); ?>
                    <span class="detail-info">?<span class="tooltip">
                            By activating this option, all Dailymotion players inside your content will
                            be replaced with Custom Embed Player
                        </span>
                    </span>
                </th>
                <td>
                    <fieldset>
                        <legend class="screen-reader-text"><span><?php echo __('Replace Old Embed'); ?></span></legend>
                        <label for="replace_old_embed">
                            <input name="replace_old_embed" type="checkbox" id="replace_old_embed" value="1"
                                <?php echo ( isset($options['replace_old_embed']) ) ? 'checked' : '' ?>>
                        </label>
                    </fieldset>
                    <p class="description">Toggle on/off to enable/disable auto replacing old embed</p>
                </td>
            </tr>

            <tr>
                <th scope="row"><label for="sort-by"><?php echo __('Sort by'); ?> <span class="detail-info">?<span
                                class="tooltip">This will rank the video search results by the preferred sorting method.
                                Pick <strong>relevance</strong> for contextual embed or <strong>recent</strong> to get
                                the latest video for instance.</span></span></label></th>
                <td>
                    <select name="sort_by" type="text" id="sort-by" class="regular-text" required>
                        <?php
                    foreach ($sorts as $sort => $string) {
                        echo '<option value="' . $sort . '" ';
                        if ( isset($options['sort_by']) && $options['sort_by'] === $sort
                            || !isset($options['sort_by']) && $sort === 'relevance'
                        ) {
                            echo 'selected';
                        }
                        echo '>' . __($string) . '</option>';
                    }
                    ?>
                    </select>
                </td>
            </tr>

            <tr>
                <th scope="row"><label for="channel-name"><?php echo __('Channel Name'); ?> <span
                            class="detail-info">?<span class="tooltip">One or several channel usernames
                                (www.dailymotion.com/<strong>yourchannelusername</strong>). This is case sensitive so
                                pay attention to caps and special characters. If you pick several values, separate them
                                with a ",".</span></span></label></th>
                <td>
                    <input name="channel_name" type="text" id="channel-name" class="regular-text"
                        value="<?php echo ( isset($options['owners']) ) ? $options['owners'] : '' ?>">
                </td>
            </tr>

            <tr>
                <th scope="row"><label for="category"><?php echo __('Category'); ?> <span class="detail-info">?<span
                                class="tooltip">The Dailymotion video categories available. You can limit results to the
                                videos belonging to a specific category.</span></span></label></th>
                <td>
                    <select name="category" type="text" id="category" class="regular-text">
                        <?php
                    for ($i = 0; $i < sizeof($categories); $i++) {
                        echo '<option value="' . $categories[$i] . '" ';
                        if (isset($options['category']) && $options['category'] === $categories[$i]) {
                            echo 'selected';
                        }
                        echo '>' . ( ( $categories[$i] === '' ) ? '--' : $categories[$i] ) . '</option>';
                    }
                    ?>
                    </select>

                </td>
            </tr>

            <tr>
                <th scope="row"><label for="exclude-ids"><?php echo __('Exclude Ids'); ?> <span
                            class="detail-info">?<span class="tooltip">use this field if you need to exclude one or
                                several specific video xid from recommendations. Separate several values by a
                                ","</span></span></label></th>
                <td>
                    <input name="exclude_ids" type="text" id="exclude-ids" class="regular-text"
                        value="<?php echo ( isset($options['exclude_ids']) ) ? $options['exclude_ids'] : '' ?>">
                </td>
            </tr>

            <tr>
                <th scope="row"><label for="playlist"><?php echo __('Search in Playlist'); ?> <span
                            class="detail-info">?<span class="tooltip">the script will only look for content within the
                                specified playlist xid</span></span></label></th>
                <td>
                    <input name="playlist" type="text" id="playlist" class="regular-text"
                        value="<?php echo ( isset($options['playlist']) ) ? $options['playlist'] : '' ?>">
                </td>
            </tr>

            <tr>
                <th scope="row"><label for="playlist-id"><?php echo __('Playlist ID'); ?> <span
                            class="detail-info">?<span class="tooltip">Embed a manual or dynamic playlist. The video
                                playing first will be defined according to the sorting criterion you chose upon creating
                                the playlist in the partner HQ (newest, oldest or most viewed)</span></span></label>
                </th>
                <td>
                    <input name="playlist_id" type="text" id="playlist-id" class="regular-text"
                        value="<?php echo ( isset($options['playlist_id']) ) ? $options['playlist_id'] : '' ?>">
                </td>
            </tr>


            <tr>
                <th scope="row"><label for="language"><?php echo __('Language'); ?> <span class="detail-info">?<span
                                class="tooltip">Specify if you want language based content recommendation. This follows
                                ISO-3166 alpha-2 codes <a
                                    href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2</a></span></span></label>
                </th>
                <td>
                    <input name="language" type="text" id="language" class="regular-text"
                        value="<?php echo ( isset($options['language']) ) ? $options['language'] : ''; ?>">
                </td>
            </tr>

            <tr>
                <th scope="row"><label for="range-day"><?php echo __('Range Day'); ?> <span class="detail-info">?<span
                                class="tooltip">This lets you pick the number of days, from today's date, till which the
                                script will look and fetch recommended videos. Example: putting 6 would mean the script
                                will fetch the most relevant/popular/recent video from past 6 days</span></span></label>
                </th>
                <td>
                    <input name="range_day" type="number" id="range-day" class="regular-text"
                        value="<?php echo ( isset($options['range_day']) ) ? $options['range_day'] : ''; ?>">
                </td>
            </tr>

        </tbody>

    </table>

    <p class="submit">
        <input type="submit" name="submit" id="submit" class="button button-primary" value="Save">
    </p>
</form>