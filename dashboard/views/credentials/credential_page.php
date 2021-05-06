<?php

?>

<div class="wrap">

    <h1 class="wp-heading-inline">
        <?php echo __('Credentials'); ?>
    </h1>

    <hr class="wp-header-end">

    <form action="<?php echo get_admin_url() . 'admin.php?page=dm-ce-credentials&action=save_data'; ?>" method="post">

        <?php wp_nonce_field("dm_save_data", "dm_save_data", true); ?>

        <table class="form-table" role="presentation">

            <tbody>

            <tr>
                <th scope="row"><label for="api-key"><?php echo __('API Key'); ?></label></th>
                <td>
                    <input name="api_key" type="text" id="api-key" class="regular-text"
                           value="<?php echo (!empty($options)) ? $options['api_key'] : '' ?>">
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
