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
            $this->urlBase = 'https://partner.api.dailymotion.com/rest';
        } else {
            $this->urlBase = 'https://api.dailymotion.com';
        }
    }

    /**
     * This function is only to generate token and store it to session.
     * The session will be expired in 1 hour.
     *
     * @param string $clientId
     * @param string $clientSecret
     * @return bool
     */
    public function generateToken(string $clientId, string $clientSecret): bool {
        $body = array(
            'grant_type' => 'client_credentials',
            'scope' => 'read_videos read_players read_playlists',
            'client_id' => $clientId,
            'client_secret' => $clientSecret
        );

        $curl = curl_init();
        $string = http_build_query($body);

        curl_setopt($curl, CURLOPT_URL, 'https://partner.api.dailymotion.com/oauth/v1/token');
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

            return true;
        } else {
            return false;
        }
    }

    public function destroyToken() {
        session_destroy();
    }

    /**
     * Fetch Data
     *
     * This will automatically detect if there is credential exist or not. If the credentials exist
     * and the session is expired, it will **regenerate** the token.
     *
     * @param $url string
     * @param $method string
     * @param $payload array
     * @return bool|resource|string
     */
    public function fetchData(string $url, string $method = 'GET', array $payload = []): array {
        if ( $this->credentials && ( !isset($_SESSION['LAST_ACTIVITY']) || (time() - $_SESSION['LAST_ACTIVITY'] > 3600) ) ) {
            $secrets = get_option('dm_ce_secret');

            $this->generateToken($this->credentials['api_key'], Crypt::decryptString($secrets));
        }

        $curl = curl_init();

        $theUrl = $this->urlBase . $url . ( count( $payload ) > 0  ? "?" . http_build_query($payload) : "" );

        curl_setopt( $curl, CURLOPT_URL, $theUrl );
        curl_setopt( $curl, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt( $curl, CURLOPT_RETURNTRANSFER, true  );

        if ($this->credentials) {
            curl_setopt( $curl, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded', 'Authorization: Bearer ' . $_SESSION['dmtoken']) );
        } else {
            curl_setopt( $curl, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded') );
        }

        $data = curl_exec($curl);

        curl_close($curl);

        return json_decode( $data, true);
    }

}
