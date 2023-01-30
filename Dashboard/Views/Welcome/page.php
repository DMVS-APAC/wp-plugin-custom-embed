<?php

?>

<div class="wrap  dm__dashboard-page">
    <div class="dm__box  box--center">
        <h1 class="dm__box-title"><?php echo __('Welcome to Dailymotion HQ Plugin'); ?></h1>

        <div class="dm__box-content">
            <p><?php echo __('Hi there! in this new version 2.0.0 we\'re moving from Public API to Private API to simplify the process.'); ?></p>
            <p><?php echo __('For existing user, you need to update several form to make the plugin working normal again. Don\'t worry, we cover it.'); ?></p>
            <p><?php echo __('We\'ll guide you step by step. If this is your first time, just follow the link below as well.'); ?></p>
        </div>

        <a href="<?php echo get_bloginfo('wpurl'); ?>/wp-admin/admin.php?page=dm-new-credentials&step=1" class="dm--outstanding-link  | dm--margin-top-3  dm--margin-bottom-2"><?php echo __('Continue'); ?></a>

    </div>

</div>