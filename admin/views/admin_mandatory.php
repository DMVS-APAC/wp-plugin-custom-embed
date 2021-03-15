<?php

?>

<form action="<?php echo get_admin_url() . 'admin.php?page=dm-ce-admin&action=save_data'; ?>" method="post">

    <?php wp_nonce_field("dm_save_data", "dm_save_data", true); ?>

    <table class="form-table" role="presentation">

        <tbody>

        <tr>
            <th scope="row"><label for="channel-name"><?php echo __('Channel Name'); ?></label></th>
            <td>
                <input name="channel_name" type="text" id="channel-name" class="regular-text"
                       value="<?php echo (!empty($options)) ? $options['owners'] : '' ?>">
                <p class="description" id="channel-description">If more than 1 channel, separate with comma. E.g.
                    "channelname1,channelname2"</p>
            </td>
        </tr>

        <tr>
            <th scope="row"><label for="sort-by"><?php echo __('Sort by'); ?></label></th>
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
