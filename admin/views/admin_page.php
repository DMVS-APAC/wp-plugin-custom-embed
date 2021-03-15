<?php
/**
 *
 */

?>

<div class="wrap">

    <?php require DM__PATH . 'admin/views/admin_header.php'; ?>

    <?php

        if ($tab === 'mandatory') {
            require DM__PATH . 'admin/views/admin_mandatory.php';
        } else if($tab === 'content') {
            require DM__PATH . 'admin/views/admin_content.php';
        } else if ($tab === 'player') {
            require DM__PATH . 'admin/views/admin_player.php';
        }

    ?>



</div>