<?php
/**
 * A player settings section tab
 *
 * @since 1.1.0-6
 */

$player_pos = [
    'top',
    'middle',
    'bottom'
];

?>

<form action="<?php echo get_admin_url() . 'admin.php?page=dm-manual-embed-settings&tab=player&action=save_data'; ?>" method="post">

    <?php wp_nonce_field("dm_save_data", "dm_save_data", true);?>

    <table class="form-table" role="presentation">

        <tbody>

        <tr>
            <th scope="row"><label for="syndication"><?php echo __('Syndication ID'); ?> <span class="detail-info">?<span
                            class="tooltip">Six digits syndication key <a href="https://faq.dailymotion.com/hc/en-us/articles/360018938360-Track-Revenue-With-the-Syndication-Parameter">https://faq.dailymotion.com/hc/en-us/articles/360018938360-Track-Revenue-With-the-Syndication-Parameter</a></span></span></label></th>
            <td>
                <input name="syndication" type="text" id="syndication" class="regular-text"
                       value="<?php echo ( isset($options['syndication']) ) ? $options['syndication'] : ''; ?>">
            </td>
        </tr>


        <tr>
            <th scope="row"><label for="ads-params"><?php echo __('Custom Parameter'); ?> <span class="detail-info">?<span class="tooltip">one or several declarative values, separated by a comma.</span></span></label></th>
            <td>
                <input name="ads_params" type="text" id="ads-params" class="regular-text"
                       value="<?php echo ( isset($options['ads_params']) ) ? $options['ads_params'] : '' ?>">
            </td>
        </tr>

        <tr>
            <th scope="row"><label for="pre-video-title"><?php echo __('Pre video title'); ?> <span class="detail-info">?<span class="tooltip">A custom section title above the video player embed.</span></span></label></th>
            <td>
                <input name="pre_video_title" type="text" id="pre-video-title" class="regular-text"
                       value="<?php echo ( isset($options['pre_video_title']) ) ? $options['pre_video_title'] : '' ?>">
                <p class="description" id="syndication">E.g., "See also: Recommended videos"</p>
            </td>
        </tr>

        <tr>
            <th scope="row"><?php echo __('Show Video Title'); ?> <span class="detail-info">?<span class="tooltip">Decide if you want to show the video title below the video. This is not compatible with the Info Card option.</span></span></th>
            <td>
                <fieldset>
                    <legend class="screen-reader-text"><span><?php echo __('Show video title'); ?></span></legend>
                    <label for="show-video-title">
                        <input name="show_video_title" type="checkbox" id="show-video-title"
                               value="1"
                            <?php echo ( isset($options['show_video_title']) ) ? 'checked' : '' ?>>
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
                               value="1"
                            <?php echo ( isset($options['show_info_card']) ) ? 'checked' : '' ?>>
                    </label>
                </fieldset>
            </td>
        </tr>

        <!--
        <tr>
            <th scope="row"><?php // echo __('Show Carousel Playlist'); ?> <span class="detail-info">?<span class="tooltip">this feature will deactivate the queue within the player and instead display video recommendations outside the main frame (on the right or below the player)</span></span></th>
            <td>
                <fieldset>
                    <legend class="screen-reader-text"><span><?php // echo __('Show carousel playlist'); ?></span></legend>
                    <label for="show-carousel-playlist">
                        <input name="show_carousel_playlist" type="checkbox" id="show-carousel-playlist"
                               value="1"
                            <?php // echo ( isset($options['show_carousel_playlist']) ) ? 'checked' : '' ?>>
                    </label>
                </fieldset>
            </td>
        </tr> -->

        <tr>
            <th scope="row"><?php echo __('Mute'); ?></th>
            <td>
                <fieldset>
                    <legend class="screen-reader-text"><span><?php echo __('Mute'); ?></span></legend>
                    <label for="mute">
                        <input name="mute" type="checkbox" id="mute"
                               value="1"
                            <?php echo ( isset($options['mute']) ) ? 'checked' : '' ?>>
                    </label>
                </fieldset>
            </td>
        </tr>

        </tbody>

    </table>

    <p class="submit">
        <input type="submit" name="submit" id="submit" class="button button-primary" value="Save">
    </p>
</form>
