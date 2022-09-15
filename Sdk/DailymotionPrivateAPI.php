<?php
/**
 * Dailymotion Private API Mini SDK
 *
 *
 *
 */

namespace Dm\Sdk;

use Dm\Libs\Crypt;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly.

class DailymotionPrivateAPI {

    private $urlBase;
    private $credentials;

    public function __construct() {
        $this->credentials = get_option('dm_ce_new_credentials');

        if ($this->credentials) {
            $this->urlBase = 'https://partner.api.dailymotion.com';
        } else {
            $this->urlBase = 'https://api.dailymotion.com';
        }
    }

    public function generateToken(string $clientId, string $clientSecret): bool {
//        session_destroy();

        $body = array(
            'grant_type' => 'client_credentials',
            'scope' => 'read_videos read_players read_playlists',
            'client_id' => $clientId,
            'client_secret' => $clientSecret
        );

        $curl = curl_init();
        $string = http_build_query($body);

        curl_setopt($curl, CURLOPT_URL, $this->urlBase . '/oauth/v1/token');
        curl_setopt($curl, CURLOPT_POST, TRUE);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $string);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true );

        $token = curl_exec($curl);

        curl_close($curl);

        $arrayToken = json_decode($token, true);

        if ( array_key_exists('access_token', $arrayToken) ) {
            $_SESSION['LAST_ACTIVITY'] = time();
            $_SESSION['dmtoken'] = $arrayToken['access_token'];
            echo $_SESSION['LAST_ACTIVITY'];
            return true;
        } else {
            return false;
        }
    }

    /**
     *
     *
     * @param $url string
     * @param $method string
     * @param $payload array
     * @return bool|resource|string
     */
    public function fetchData(string $url, string $method = 'GET', array $payload = []) {

        if ( $this->credentials && ( !isset($_SESSION['LAST_ACTIVITY']) || (time() - $_SESSION['LAST_ACTIVITY'] > 3600) ) ) {
            $secrets = get_option('dm_ce_secret');

            $this->generateToken($this->credentials['api_key'], Crypt::decryptString($secrets));
        }


        $curl = curl_init();

        curl_setopt( $curl, CURLOPT_URL, $this->urlBase . $url );
        curl_setopt( $curl, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt( $curl, CURLOPT_RETURNTRANSFER, true  );

        if ($this->credentials) {
            curl_setopt( $curl, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded', 'Authorization: Bearer ' . $_SESSION['dmtoken']) );
        } else {
            curl_setopt( $curl, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded') );
        }

//        if ($payload) curl_setopt($curl, CURLOPT_POSTFIELDS, $payload);

        $data = curl_exec($curl);

        curl_close($curl);

        return json_decode($data, true);
    }

}
