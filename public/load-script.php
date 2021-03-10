<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// TODO: adjust function to correctly load the script
class Load_Scripts {
    private $options;

    public function __construct() {
        $this->options = get_option('dm_ce_option');

        add_action('wp_footer', array($this, 'load_script'));
        add_filter( 'the_content', array($this, 'hook_player_into_content'));
//        add_shortcode('dmRelatedPlayer', array($this, 'embed_video'));
    }

    public function load_script() {
//        require DM__PATH . 'public/ce-script.php';
    }

    public function hook_player_into_content ( $content ) {

        if ( is_single() && $this->options['auto_embed'] == 'true' ) {

            $new_content = '';
            switch ($this->options['video_position']) {
                case "top":
                    $new_content = '<div id="dmRelatedPlayer"></div>' . $content;
                    break;
                case "middle":
                    $paragraphAfter = 2; //Enter number of paragraphs to display ad after.
                    $content = explode("</p>", $content);
                    for ($i = 0; $i < count($content); $i++) {
                        if ($i == $paragraphAfter) {
                            $new_content .= '<div id="dm-player"></div>';
                        }
                        $new_content .= $content[$i] . "</p>";
                    }
                    break;
                case "bottom":
                    $new_content = $content . '<div id="dm-player"></div>';
                    break;
                default:
                    $new_content = '<div id="dm-player"></div>' . $content;
            }

            return $new_content;
        }

        return $content;
    }

    public function embed_video() {
        return '<div id="dm-player"></div>';
    }
}

$load_script = new Load_Scripts();
