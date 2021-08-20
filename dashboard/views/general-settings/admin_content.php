<?php

$categories = ['animals', 'creation', 'auto', 'school', 'people', 'fun', 'videogames', 'tech'];


?>

<div class="dm__box-wrapper">
    <p>Only use this section if you need to recommend public content from a specific pool of channels (it can be a mix of channels you own and 3rd parties)</p>

    <p>Once you input channels in the dedicated field,</p>
    <ol>
        <li>The script will recommend content automatically for you - no further action needed</li>
        <li>However you can still manually search videos from selected channels through the dailymotion search bar while writing posts</li>
        <li>This is overriden if you connect a channel in the connect and credentials sections of the plugin</li>
    </ol>
</div>

<form action="<?php echo get_admin_url() . 'admin.php?page=dm-general-settings&tab=content&action=save_data'; ?>" method="post">

    <?php wp_nonce_field("dm_save_data", "dm_save_data", true); ?>

    <table class="form-table" role="presentation">

        <tbody>
        <tr>
            <th scope="row"><label for="channel-name"><?php echo __('Channel Name'); ?> <span class="detail-info">?<span class="tooltip">One or several channel usernames (www.dailymotion.com/<strong>yourchannelusername</strong>). This is case sensitive so pay attention to caps and special characters. If you pick several values, separate them with a ",".</span></span></label></th>
            <td>
                <input name="channel_name" type="text" id="channel-name" class="regular-text"
                       value="<?php echo (isset($options['owners'])) ? $options['owners'] : '' ?>">
                <p class="description" id="channel-description">If more than 1 channel, separate with comma. E.g.
                    "channelname1,channelname2".</p>
                <p class="description">Some channels may set video embed domain restrictions, always play the embedded video once before publishing your post to see if your website is allowed to embed it.</p>
            </td>
        </tr>

        <tr>
            <th scope="row"><label for="category"><?php echo __('Category'); ?> <span class="detail-info">?<span class="tooltip">The Dailymotion video categories available. You can limit results to the videos belonging to a specific category.</span></span></label></th>
            <td>
                <select name="category" type="text" id="category" class="regular-text">
                    <option value="" <?php echo (empty($options['category'])) ? 'selected' : ''; ?>>--</option>
                    <option value="animals" <?php echo ($options['category'] === 'animals') ? 'selected' : ''; ?>>
                        Animals
                    </option>
                    <option value="creation" <?php echo ($options['category'] === 'creation') ? 'selected' : ''; ?>>
                        creation
                    </option>
                    <option value="auto" <?php echo ($options['category'] === 'auto') ? 'selected' : ''; ?>>auto
                    </option>
                    <option value="school" <?php echo ($options['category'] === 'school') ? 'selected' : ''; ?>>school
                    </option>
                    <option value="people" <?php echo ($options['category'] === 'people') ? 'selected' : ''; ?>>people
                    </option>
                    <option value="fun" <?php echo ($options['category'] === 'fun') ? 'selected' : ''; ?>>fun</option>
                    <option value="videogames" <?php echo ($options['category'] === 'videogames') ? 'selected' : ''; ?>>
                        videogames
                    </option>
                    <option value="tech" <?php echo ($options['category'] === 'tech') ? 'selected' : ''; ?>>tech
                    </option>
                    <option value="latino" <?php echo ($options['category'] === 'latino') ? 'selected' : ''; ?>>latino
                    </option>
                    <option value="lifestyle" <?php echo ($options['category'] === 'lifestyle') ? 'selected' : ''; ?>>
                        lifestyle
                    </option>
                    <option value="shortfilms" <?php echo ($options['category'] === 'shortfilms') ? 'selected' : ''; ?>>
                        shortfilms
                    </option>
                    <option value="music" <?php echo ($options['category'] === 'music') ? 'selected' : ''; ?>>music
                    </option>
                    <option value="news" <?php echo ($options['category'] === 'animals') ? 'selected' : ''; ?>>news
                    </option>
                    <option value="redband" <?php echo ($options['category'] === 'redband') ? 'selected' : ''; ?>>
                        redband
                    </option>
                    <option value="sport" <?php echo ($options['category'] === 'sport') ? 'selected' : ''; ?>>sport
                    </option>
                    <option value="tv" <?php echo ($options['category'] === 'tv') ? 'selected' : ''; ?>>tv</option>
                    <option value="travel" <?php echo ($options['category'] === 'travel') ? 'selected' : ''; ?>>travel
                    </option>
                    <option value="webcam" <?php echo ($options['category'] === 'webcam') ? 'selected' : ''; ?>>webcam
                    </option>
                </select>
            </td>
        </tr>

        <tr>
            <th scope="row"><label for="exclude-ids"><?php echo __('Exclude Ids'); ?> <span class="detail-info">?<span class="tooltip">use this field if you need to exclude one or several specific video xid from recommendations. Separate several values by a ","</span></span></label></th>
            <td>
                <input name="exclude_ids" type="text" id="exclude-ids" class="regular-text"
                       value="<?php echo (isset($options['exclude_ids'])) ? $options['exclude_ids'] : '' ?>">
            </td>
        </tr>

        <tr>
            <th scope="row"><label for="playlist"><?php echo __('Search in Playlist'); ?> <span class="detail-info">?<span class="tooltip">the script will only look for content within the specified playlist xid</span></span></label></th>
            <td>
                <input name="playlist" type="text" id="playlist" class="regular-text"
                       value="<?php echo (isset($options['playlist'])) ? $options['playlist'] : '' ?>">
            </td>
        </tr>

        <tr>
            <th scope="row"><label for="playlist-id"><?php echo __('Playlist ID'); ?> <span class="detail-info">?<span class="tooltip">Embed a manual or dynamic playlist. The video playing first will be defined according to the sorting criterion you chose upon creating the playlist in the partner HQ (newest, oldest or most viewed)</span></span></label></th>
            <td>
                <input name="playlist_id" type="text" id="playlist-id" class="regular-text"
                       value="<?php echo (isset($options['playlist_id'])) ? $options['playlist_id'] : '' ?>">
            </td>
        </tr>


        <tr>
            <th scope="row"><label for="language"><?php echo __('Language'); ?> <span class="detail-info">?<span class="tooltip">Specify if you want language based content recommendation. This follows ISO-3166 alpha-2 codes <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2</a></span></span></label></th>
            <td>
                <input name="language" type="text" id="language" class="regular-text"
                       value="<?php echo (isset($options['language'])) ? $options['language'] : ''; ?>">
            </td>
        </tr>

        <tr>
            <th scope="row"><label for="range-day"><?php echo __('Range Day'); ?> <span class="detail-info">?<span class="tooltip">This lets you pick the number of days, from today's date, till which the script will look and fetch recommended videos. Example: putting 6 would mean the script will fetch the most relevant/popular/recent video from past 6 days</span></span></label></th>
            <td>
                <input name="range_day" type="number" id="range-day" class="regular-text"
                       value="<?php echo ($options['range_day']) ? $options['range_day'] : ''; ?>">
            </td>
        </tr>

        </tbody>

    </table>

    <p class="submit">
        <input type="submit" name="submit" id="submit" class="button button-primary" value="Save">
    </p>
</form>
