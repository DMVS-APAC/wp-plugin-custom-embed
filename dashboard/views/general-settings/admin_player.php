<?php

?>

<form action="<?php echo get_admin_url() . 'admin.php?page=dm-ce-admin&tab=player&action=save_data'; ?>" method="post">

    <?php wp_nonce_field("dm_save_data", "dm_save_data", true);?>

    <table class="form-table" role="presentation">

        <tbody>

        <tr>
            <th scope="row"><?php echo __('Hide Controls'); ?></th>
            <td>
                <fieldset>
                    <legend class="screen-reader-text"><span><?php echo __('Hide Controls'); ?></span></legend>
                    <label for="hide-controls">
                        <input name="hide_controls" type="checkbox" id="hide-controls"
                               value="1" <?php echo ($options['hide_controls'] == 1) ? 'checked' : '' ?>>
                    </label>
                </fieldset>
            </td>
        </tr>

        <tr>
            <th scope="row"><label for="ads-params"><?php echo __('Ads Params'); ?></label></th>
            <td>
                <input name="ads_params" type="text" id="ads-params" class="regular-text"
                       value="<?php echo ($options['ads_params']) ? $options['ads_params'] : '' ?>">
            </td>
        </tr>

        <tr>
            <th scope="row"><label for="pre-video-title"><?php echo __('Pre video title'); ?></label></th>
            <td>
                <input name="pre_video_title" type="text" id="pre-video-title" class="regular-text"
                       value="<?php echo ($options['pre_video_title']) ? $options['pre_video_title'] : '' ?>">
            </td>
        </tr>

        <tr>
            <th scope="row"><?php echo __('Show Video Title'); ?></th>
            <td>
                <fieldset>
                    <legend class="screen-reader-text"><span><?php echo __('Show video title'); ?></span></legend>
                    <label for="show-video-title">
                        <input name="show_video_title" type="checkbox" id="show-video-title"
                               value="1" <?php echo ($options['show_video_title'] == 1) ? 'checked' : '' ?>>
                    </label>
                </fieldset>
            </td>
        </tr>

        <tr>
            <th scope="row"><?php echo __('Show Info Card'); ?> <span class="detail-info">?<span class="tooltip">this will show the title, description snippet and brand logo of the video below it</span></span></th>
            <td>
                <fieldset>
                    <legend class="screen-reader-text"><span><?php echo __('Show video infocard'); ?></span></legend>
                    <label for="show-info-card">
                        <input name="show_info_card" type="checkbox" id="show-info-card"
                               value="1" <?php echo ($options['show_info_card'] == 1) ? 'checked' : '' ?>>
                    </label>
                </fieldset>
            </td>
        </tr>

        <tr>
            <th scope="row"><?php echo __('Show Carousel Playlist'); ?> <span class="detail-info">?<span class="tooltip">this feature will deactivate the queue in the right part opf the player and instead display a widget at the bottom of the player with video recommendations outside the main frame</span></span></th>
            <td>
                <fieldset>
                    <legend class="screen-reader-text"><span><?php echo __('Show carousel playlist'); ?></span></legend>
                    <label for="show-carousel-playlist">
                        <input name="show_carousel_playlist" type="checkbox" id="show-carousel-playlist"
                               value="1" <?php echo ($options['show_carousel_playlist'] == 1) ? 'checked' : '' ?>>
                    </label>
                </fieldset>
            </td>
        </tr>

        <tr>
            <th scope="row"><?php echo __('Hide Controls on Ad Playing'); ?></th>
            <td>
                <fieldset>
                    <legend class="screen-reader-text"><span><?php echo __('Hide Controls on Ad Playing'); ?></span></legend>
                    <label for="hide-controls-ad">
                        <input name="hide_controls_ad" type="checkbox" id="hide-controls-ad"
                               value="1" <?php echo ($options['hide_controls_ad'] == 1) ? 'checked' : '' ?>>
                    </label>
                </fieldset>
            </td>
        </tr>

<!--        <tr>-->
<!--            <th scope="row">--><?php //echo __('Show PiP at Start'); ?><!--</th>-->
<!--            <td>-->
<!--                <fieldset>-->
<!--                    <legend class="screen-reader-text"><span>--><?php //echo __('Show PiP at start'); ?><!--</span></legend>-->
<!--                    <label for="pip-at-start">-->
<!--                        <input name="pip_at_start" type="checkbox" id="pip-at-start"-->
<!--                               value="1" --><?php //echo ($options['pip_at_start'] == 1) ? 'checked' : '' ?>
<!--                    </label>-->
<!--                </fieldset>-->
<!--            </td>-->
<!--        </tr>-->

<!--        <tr>-->
<!--            <th scope="row">--><?php //echo __('Click to Play'); ?><!--</th>-->
<!--            <td>-->
<!--                <fieldset>-->
<!--                    <legend class="screen-reader-text"><span>--><?php //echo __('Click to play'); ?><!--</span></legend>-->
<!--                    <label for="click-to-play">-->
<!--                        <input name="click_to_play" type="checkbox" id="click-to-play"-->
<!--                               value="1" --><?php //echo ($options['click_to_play'] == 1) ? 'checked' : '' ?>
<!--                    </label>-->
<!--                </fieldset>-->
<!--            </td>-->
<!--        </tr>-->

        <tr>
            <th scope="row"><?php echo __('Deactivate PiP'); ?></th>
            <td>
                <fieldset>
                    <legend class="screen-reader-text"><span><?php echo __('Deactivate PiP'); ?></span></legend>
                    <label for="deactivate-pip">
                        <input name="deactivate_pip" type="checkbox" id="deactivate-pip"
                               value="1" <?php echo ($options['deactivate_pip'] == 1) ? 'checked' : '' ?>>
                    </label>
                </fieldset>
                <!-- in NPE if this deactivated then the scroll to pause automatically true -->
            </td>
        </tr>

        </tbody>

    </table>

    <p class="submit">
        <input type="submit" name="submit" id="submit" class="button button-primary" value="Save">
    </p>
</form>
