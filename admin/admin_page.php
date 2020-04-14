<div class="wrap">

    <h1 class="wp-heading-inline">
        <?php echo __('Dailymotion Contextual Embed'); ?>
    </h1>

    <form action="<?php echo get_admin_url() . 'admin.php?page=dm-ce-admin&action=save_data'; ?>" method="post">

        <?php wp_nonce_field("dm_save_data", "dm_save_data", true);?>

        <table class="form-table" role="presentation">

            <tbody>

                <tr>
                    <th scope="row"><label for="channel-name"><?php echo __('Channel Name'); ?></label></th>
                    <td>
                        <input name="channel_name" type="text" id="channel-name" class="regular-text" required
                               value="<?php echo (!empty($options)) ? $options['owners'] : '' ?>">
                        <p class="description" id="channel-description">If more than 1 channel, separate with comma. E.g. "channelname1,channelname2"</p>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><label for="auto-embed"><?php echo __('Auto embed'); ?></label></th>
                    <td>
                        <input name="auto_embed" type="checkbox" id="auto-embed" value="true"
                               <?php echo (!$options || $options['auto_embed'] == 'true') ? 'checked' : '' ?>>
                        <p class="description" id="cpe-id-desktop">Tick this if you want auto embed. If you want to set manually, add shortcode to your content by using this shortcode "[dmRelatedPlayer]"</p>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><label for="video-position"><?php echo __('Video position'); ?></label></th>
                    <td>
                        <select name="video_position" type="text" id="video-position" class="regular-text" required>
                            <option value="top" <?php echo (empty($options) || $options['video_position'] == 'top') ? 'selected' : ''; ?>><?php echo __('Top'); ?></option>
                            <option value="middle" <?php echo (!empty($options) && $options['video_position'] == 'middle') ? 'selected' : ''; ?>><?php echo __('Middle'); ?></option>
                            <option value="bottom" <?php echo (!empty($options) && $options['video_position'] == 'bottom') ? 'selected' : ''; ?>><?php echo __('Bottom'); ?></option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><label for="cpe-id-desktop"><?php echo __('CPE ID for desktop'); ?></label></th>
                    <td>
                        <input name="cpe_id_desktop" type="text" id="cpe-id-desktop" class="regular-text" required
                               value="<?php echo (!empty($options)) ? $options['cpe_desktop'] : ''; ?>">
                        <p class="description" id="cpe-id-desktop">Ask your account manager</p>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><label for="cpe-id-mobile"><?php echo __('CPE ID for mobile'); ?></label></th>
                    <td>
                        <input name="cpe_id_mobile" type="text" id="cpe-id-mobile" class="regular-text"
                               value="<?php echo (!empty($options)) ? $options['cpe_mobile'] : ''; ?>">
                        <p class="description" id="cpe-id-mobile">Ask your account manager</p>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><label for="sort-by"><?php echo __('Sort by'); ?></label></th>
                    <td>
                        <select name="sort_by" type="text" id="sort-by" class="regular-text" required>
                            <option value="recent" <?php echo (empty($options) || $options['sort_by'] == 'recent') ? 'selected' : ''; ?>><?php echo __('Recent'); ?></option>
                            <option value="relevance" <?php echo (!empty($options) && $options['sort_by'] == 'relevance') ? 'selected' : ''; ?>><?php echo __('Relevance'); ?></option>
                            <option value="random" <?php echo (!empty($options) && $options['sort_by'] == 'random') ? 'selected' : ''; ?>><?php echo __('Random'); ?></option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><label for="syndication"><?php echo __('Syndication ID'); ?></label></th>
                    <td>
                        <input name="syndication" type="text" id="syndication" class="regular-text"
                               value="<?php echo (!empty($options)) ? $options['syndication']: ''; ?>">
                        <p class="description" id="syndication">Optional</p>
                    </td>
                </tr>
            </tbody>

        </table>

        <p class="submit">
            <input type="submit" name="submit" id="submit" class="button button-primary" value="Save">
        </p>
    </form>

</div>