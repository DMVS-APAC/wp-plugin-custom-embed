<?php
/**
 * Playback settings tab page
 *
 * @since 1.1.0-6
 */

?>

<form action="<?php echo get_admin_url() . 'admin.php?page=dm-automated-embed-settings&action=save_data'; ?>" method="post" id="automated-embed-form">

    <?php wp_nonce_field("dm_save_data", "dm_save_data", true); ?>

    <table class="form-table  dm-form-table" role="presentation">

        <tbody>

        <tr>
            <th scope="row"><label for="player-id"><?php echo __('Automated Embed Player ID'); ?> <span class="detail-info">?<span class="tooltip">to create or modify a player template, refer to this page <a href="https://www.dailymotion.com/partner/embed/players">in your dailymotion partner HQ</a></span></span></label></th>
            <td>
                <select name="player_id" id="player-id" class="regular-text">
                    <option value="">--</option>
                    <?php for($i=0; $i < count($playerIds['list']); $i++): ?>
                        <option value="<?php echo $playerIds['list'][$i]['id']; ?>"
                            <?php echo ( $playerIds['list'][$i]['id'] === $options['player_id'] ) ? 'selected' : '' ?>>
                            <?php echo $playerIds['list'][$i]['id'] . ' - ' . $playerIds['list'][$i]['label']; ?>
                        </option>
                    <?php endfor; ?>
                </select>
            </td>
        </tr>

        </tbody>

    </table>

    <p class="submit">
        <input type="submit" name="submit" id="submit" class="button button-primary" value="Save">
    </p>

</form>
