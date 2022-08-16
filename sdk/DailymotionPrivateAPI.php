<?php
/**
 * Dailymotion Private API Mini SDK
 *
 *
 *
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly.

class DailymotionPrivateAPI {

    private $urlBase;

    public function __construct() {

        $this->urlBase = 'https://partner.api.dailymotion.com/';
    }

    private function generateToken($clientId, $clientSecret) {
        $body = array(
            'grant_type' => 'client_credentials',
            'scope' => 'read_videos read_players read_playlists',
            'client_id' => $clientId,
            'client_secret' => $clientSecret
        );

        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, $this->urlBase . 'oauth/v1/token');
        curl_setopt($curl, CURLOPT_POST, TRUE);
        curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($body));
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true );

        $token = curl_exec($curl);

        curl_close($curl);

        $arrayToken = json_decode($token, true);

//        if
//        $_SESSION['dm_token'] =

        return $token;

    }

    /**
     *
     *
     * @param $url string
     * @param $method string
     * @param $payload array
     * @return bool|resource|string
     */
    public function fetchData($url, $method, $payload) {

        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, $this->urlBase . $url);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method ? $method : 'GET');
        curl_setopt($curl, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true );

        $data = curl_exec($curl);

        curl_close($curl);

        return $data;
    }

}
