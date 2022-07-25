<p class="dm-migration-instruction">The migration is only for update from <strong>v1.0.4</strong> to
    <strong>v1.1.0</strong>. If it's the first time you use this plugin, you don't need to do this action.
</p>

<p><button type="button" id="migrate-database" class="button button-primary">Migrate database</button></p>

<script type="text/javascript">
const button = document.getElementById('migrate-database')
const apiUrl = "<?php echo rest_url(); ?>"
const wpNonce = "<?php echo wp_create_nonce('wp_rest'); ?>"

const headerEnd = document.querySelector('.dm-migration-instruction')

button.addEventListener('click', () => {
    button.disabled = true

    fetch(apiUrl + 'dm/v1/migration', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': wpNonce
            }
        })
        .then(res => res.json())
        .then(data => {

            setTimeout(() => {
                button.disabled = false
                headerEnd.insertAdjacentHTML('beforebegin',
                    '<div id="setting-error-settings_updated" class="notice notice-success settings-error is-dismissible"><p><strong>Migration succeed</strong></p> </div>'
                )
            }, 1000)
        })
        .catch(err => {
            // console.log(err)
        })
})
</script>