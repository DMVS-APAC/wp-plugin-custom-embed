<?php
/**
 * Mandatory settings tab page
 *
 */
?>

<form action="<?php echo get_admin_url() . 'admin.php?page=dm-general-settings&action=save_data'; ?>" method="post">

    <?php wp_nonce_field("dm_save_data", "dm_save_data", true); ?>

    <table class="form-table" role="presentation">

        <tbody>

        <tr>
            <th scope="row"><label for="player-id"><?php echo __('Player ID'); ?> <span class="detail-info">?<span class="tooltip">You can get PLAYER ID from <a href="https://www.dailymotion.com/partner/embed/players" target="_blank">Dailymotion partner HQ</a> in the player tab, inside the embed menu.</span></span></label></th>
            <td>
                <input name="player_id" type="text" id="player-id" class="regular-text"
                       value="<?php echo (!empty($options)) ? $options['player_id'] : '' ?>">
            </td>
        </tr>

        <tr>
            <th scope="row"><label for="channel-name"><?php echo __('Channel Name'); ?> <span class="detail-info">?<span class="tooltip">One or several channel usernames (www.dailymotion.com/<strong>yourchannelusername</strong>). This is case sensitive so pay attention to caps and special characters. If you pick several values, separate them with a ",".</span></span></label></th>
            <td>
                <input name="channel_name" type="text" id="channel-name" class="regular-text"
                       value="<?php echo (!empty($options)) ? $options['owners'] : '' ?>">
                <p class="description" id="channel-description">If more than 1 channel, separate with comma. E.g.
                    "channelname1,channelname2".</p>
                <p class="description">Some channels may set video embed domain restrictions, always play the embedded video once before publishing your post to see if your website is allowed to embed it.</p>
            </td>
        </tr>

        <tr>
            <th scope="row"><label for="sort-by"><?php echo __('Sort by'); ?> <span class="detail-info">?<span class="tooltip">This will rank the video search results by the preferred sorting method. Pick <strong>relevance</strong> for contextual embed or <strong>recent</strong> to get the latest video for instance.</span></span></label></th>
            <td>
                <select name="sort_by" type="text" id="sort-by" class="regular-text" required>
                    <option value="least-visited" <?php echo ($options['sort_by'] == 'least-visited') ? 'selected' : ''; ?>><?php echo __('Least Visited'); ?></option>
                    <option value="live-audience" <?php echo ($options['sort_by'] == 'live-audience') ? 'selected' : ''; ?>><?php echo __('Live Audience'); ?></option>
                    <option value="old" <?php echo ($options['sort_by'] == 'old') ? 'selected' : ''; ?>><?php echo __('Old'); ?></option>
                    <option value="random" <?php echo ($options['sort_by'] == 'random') ? 'selected' : ''; ?>><?php echo __('Random'); ?></option>
                    <option value="recent" <?php echo ($options['sort_by'] == 'recent') ? 'selected' : ''; ?>><?php echo __('Recent'); ?></option>
                    <option value="relevance" <?php echo (empty($options['sort_by']) || $options['sort_by'] == 'relevance') ? 'selected' : ''; ?>><?php echo __('Relevance'); ?></option>
                    <option value="trending" <?php echo ($options['sort_by'] == 'trending') ? 'selected' : ''; ?>><?php echo __('Trending'); ?></option>
                    <option value="visited" <?php echo ($options['sort_by'] == 'visited') ? 'selected' : ''; ?>><?php echo __('Visited'); ?></option>
                    <option value="visited-hour" <?php echo ($options['sort_by'] == 'visited-hour') ? 'selected' : ''; ?>><?php echo __('Visited Hour'); ?></option>
                    <option value="visited-month" <?php echo ($options['sort_by'] == 'visited-month') ? 'selected' : ''; ?>><?php echo __('Visited Month'); ?></option>
                    <option value="visited-today" <?php echo ($options['sort_by'] == 'visited-today') ? 'selected' : ''; ?>><?php echo __('Visited Today'); ?></option>
                    <option value="visited-week" <?php echo ($options['sort_by'] == 'visited-week') ? 'selected' : ''; ?>><?php echo __('Visited Week'); ?></option>
                </select>
            </td>
        </tr>

        </tbody>

    </table>

    <p class="submit">
        <input type="submit" name="submit" id="submit" class="button button-primary" value="Save">
    </p>
</form>
