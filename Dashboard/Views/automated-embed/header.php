<?php
/**
 * Header admin dashboard
 *
 * Please refer `$action` to admin.php on `load_automated_embed_page()` function
 */
?>
<h1 class="wp-heading-inline">
    <?php echo __('Automated Embed Settings'); ?>
</h1>

<hr class="wp-header-end">

<style>
    .toggle-button {
        position: relative;
    }
    .toggle-button legend {
        position: absolute;
        top: 4px;
        left: 60px;
    }
    .switch-wrap {
        cursor: pointer;
        background: #1d2327;
        padding: 4px;
        width: 40px;
        height: 20px;
        border-radius: calc(30px / 2);
        display: block;
    }
    .switch-wrap input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }
    .switch {
        height: 100%;
        display: grid;
        grid-template-columns: 0fr 1fr 1fr;
        transition: .2s;
    }
    .switch::after {
        content: '';
        border-radius: 50%;
        background: #ccc;
        grid-column: 2;
        transition: background .2s;
    }
    input:checked + .switch {
        grid-template-columns: 1fr 1fr 0fr;
    }
    input:checked + .switch:after {
        background-color: var(--wp-admin-theme-color);
    }
</style>

<fieldset class="toggle-button">
    <label for="auto_embed" class="switch-wrap">
        <input name="auto_embed" type="checkbox" id="auto_embed" value="1"
            <?php echo ( $auto_embed == '' && $auto_embed == 0 ) ? '' : 'checked' ?> onchange="toggleForm()" />
        <div class="switch"></div>
    </label>
    <legend><span><?php echo __('Enable Automatic Embed'); ?></span> <span class="detail-info">?<span class="tooltip">Automated Embed is an open-source dailymotion project that relies on your HTML pages and video metadata to fetch contextual videos from your or 3rd party catalogues into each article automatically. This is a one-time set-up though you can modify or remove it at anytime.</span></span></legend>
</fieldset>

<script type="text/javascript">
    const wpNonce = '<?php echo wp_create_nonce('wp_rest'); ?>';
    const toggleForm = async () => {
        const autoEmbedStatus = document.getElementById('auto_embed').checked ? 1 : 0
        const updateAutoEmbed = await fetch('/wp-json/dm/v1/update-auto-embed', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': wpNonce
            },
            body: autoEmbedStatus
        });

        if (updateAutoEmbed.ok) {
            const wrapper = document.querySelector('.wrap');
            if (autoEmbedStatus) {
                wrapper.classList.remove('hide-content');
            } else {
                wrapper.classList.add('hide-content');
            }
        }

    };
</script>

<nav class="nav-tab-wrapper wp-clearfix">
    <a href="<?php echo get_bloginfo('wpurl'); ?>/wp-admin/admin.php?page=dm-automated-embed-settings"
       class="nav-tab<?php echo $tab === 'playback' ? ' nav-tab-active' : ''; ?>"
    <?php echo $tab === 'playback' ? ' aria-current="page' : ''; ?>">Playback Settings</a>
    <a href="<?php echo get_bloginfo('wpurl'); ?>/wp-admin/admin.php?page=dm-automated-embed-settings&tab=content"
       class="nav-tab<?php echo $tab === 'content' ? ' nav-tab-active' : ''; ?>"
    <?php echo $tab === 'content' ? ' aria-current="page' : ''; ?>">Content Settings</a>
    <a href="<?php echo get_bloginfo('wpurl'); ?>/wp-admin/admin.php?page=dm-automated-embed-settings&tab=player"
       class="nav-tab<?php echo $tab === 'player' ? ' nav-tab-active' : ''; ?>"
    <?php echo $tab === 'player' ? ' aria-current="page' : ''; ?>">Player Settings</a>
</nav>
