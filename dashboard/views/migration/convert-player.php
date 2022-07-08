<form action="<?php echo get_admin_url() . 'admin.php?page=dm-migration&tab=convert-player&action=save_data'; ?>"
    method="post">

    <?php wp_nonce_field("dm_save_data", "dm_save_data", true);?>

    <table class="form-table" role="presentation">

        <tbody>
            <tr>
                <th scope="row"><?php echo __('Convert Old Iframes'); ?> <span class="detail-info">?<span
                            class="tooltip">By activating this option, all Dailymotion iframe players inside your
                            content will
                            be converted to new Dailymotion Player</span></span></th>
                <td>
                    <fieldset>
                        <legend class="screen-reader-text"><span><?php echo __('Conver Old Player'); ?></span></legend>
                        <label for="convert_old_player">
                            <input name="convert_old_player" type="checkbox" id="convert_old_player" value="1"
                                <?php echo (isset($options['convert_old_player'])) ? 'checked' : '' ?>>
                        </label>
                    </fieldset>
                    <p class="description">Toggle on/off to enable/disable auto convert old player</p>
                </td>
            </tr>

        </tbody>

    </table>

    <p class="submit">
        <input type="submit" name="submit" id="submit" class="button button-primary" value="Save">
    </p>
</form>