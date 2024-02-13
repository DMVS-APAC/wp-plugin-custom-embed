<?php
/**
 * Page to store credentials
 */
?>

<div class="wrap">

    <h1 class="wp-heading-inline">
        <?php echo __('Credentials'); ?>
    </h1>

    <hr class="wp-header-end">

    <form action="<?php echo get_admin_url() . 'admin.php?page=dm-credentials&action=save_data'; ?>" method="post">

        <?php wp_nonce_field("dm_save_data", "dm_save_data", true); ?>

        <table class="form-table" role="presentation">

            <tbody>

            <tr>
                <th scope="row"><label for="api-key"><?php echo __('API Key'); ?> <span class="detail-info">?<span class="tooltip">API key creation on a dailymotion account is subject to your role (editor, admin, owner) in the organization.
If you do not have access to the API key creation page, ask the owner of your organization to create it for you.</span></span></label></th>
                <td>
                    <input name="api_key" type="text" id="api-key" class="regular-text"
                           value="<?php echo (!empty($options)) ? $options['api_key'] : '' ?>">
                    <p>You can create new apiKey <a href="https://www.dailymotion.com/partner/api-keys/" target="_blank">here</a> at Dailymotion partner HQ</p>
                </td>
            </tr>
            <tr>
                <th scope="row"><label for="api-secret"><?php echo __('API Secret'); ?></label></th>
                <td>
                    <input name="api_secret" type="text" id="api-secret" class="regular-text"
                           value="<?php echo (!empty($options)) ? $options['api_secret'] : '' ?>">
                </td>
            </tr>
            </tbody>

        </table>

        <p class="submit">
            <input type="submit" name="submit" id="submit" class="button button-primary" value="Save">
        </p>

    </form>

</div>
