<?php
/**
 * Page to store credentials
 */
?>

<div class="wrap">

    <?php if (!empty($migrationStep) && $migrationStep == 2): ?>
        <div class="dm__step-guidance">
            Well done, you can <a href="<?php echo get_bloginfo('wpurl'); ?>/wp-admin/admin.php?page=dm-manual-embed-settings"><?php echo __('continue'); ?></a> to the next step or just <a href="<?php echo get_bloginfo('wpurl'); ?>/wp-admin/admin.php?page=dm-new-credentials&step=-1">skip</a> if you don't need a guidance.
        </div>
    <?php endif; ?>

    <h1 class="wp-heading-inline">
        <?php echo __('Credentials'); ?>
    </h1>

    <hr class="wp-header-end">

    <form action="<?php echo get_admin_url() . 'admin.php?page=dm-new-credentials&action=save_data'; ?>" method="post">

        <?php wp_nonce_field("dm_save_data", "dm_save_data", true); ?>

        <table class="form-table" role="presentation">

            <tbody>

            <tr>
                <th scope="row"><label for="api-key"><?php echo __('API Key'); ?> <span class="detail-info">?<span class="tooltip">API key creation on a dailymotion account is subject to your role (editor, admin, owner) in the organization.
If you do not have access to the API key creation page, ask the owner of your organization to create it for you.</span></span></label></th>
                <td>
                    <input name="api_key" type="text" id="api-key" class="regular-text"
                           value="<?php echo (!empty($options)) ? $options['api_key'] : '' ?>" required>
                    <p>You can create new apiKey <a href="https://www.dailymotion.com/partner/api-keys/" target="_blank">here</a> at Dailymotion partner HQ</p>
                </td>
            </tr>
            <tr>
                <th scope="row"><label for="api-secret"><?php echo __('API Secret'); ?></label></th>
                <td>
                    <input name="api_secret" type="password" id="api-secret" class="regular-text"
                           value="">
                    <p>Leave empty if you don't want to update this.</p>
                </td>
            </tr>
            <tr>
                <th scope="row"><label for="api-secret"><?php echo __('Channel ID'); ?></label></th>
                <td>
                    <input name="channel_id" type="text" id="channel-id" class="regular-text"
                           value="<?php echo (!empty($options)) ? $options['channel_id'] : '' ?>" required>
                </td>
            </tr>
            </tbody>

        </table>

        <p class="submit">
            <button type="submit" name="submit" id="submit" class="button button-primary"><?php echo __('Save'); ?></button>
        </p>

    </form>

</div>
