<?php
    include_once 'sendRequest.php';
    define("PROTOCOL", $_SERVER['WEB_PROTOCOL']);
    define("HOST", $_SERVER['WEB_HOST']);
    define("SERVICE_HOST", PROTOCOL . HOST . ":" . $_SERVER['WEB_PORT']);

    function setSessionParams($session) {
        if (isset($session)) {
            if (array_key_exists('accessToken', $session)) {
                $_SESSION['accessToken'] = $session->accessToken;
            }

            if (array_key_exists('refreshToken', $session)) {
                $_SESSION['refreshToken'] = $session->refreshToken;
            }

            if (array_key_exists('id', $session)) {
                $_SESSION['id'] = $session->id;
            }

            if (array_key_exists('username', $session)) {
                $_SESSION['username'] = $session->username;
            }
        }
    }

    function createSessionDto() {
        $username = '';
        $id = '';
        $accessToken = '';
        $refreshToken = '';
        if (isset($_SESSION)) {
            if (array_key_exists('username', $_SESSION)) {
                $username = $_SESSION['username'];
            }

            if (array_key_exists('id', $_SESSION)) {
                $id = $_SESSION['id'];
            }

            if (array_key_exists('accessToken', $_SESSION)) {
                $accessToken = $_SESSION['accessToken'];
            }

            if (array_key_exists('refreshToken', $_SESSION)) {
                $refreshToken = $_SESSION['refreshToken'];
            }
        }

        $session = (object) [
            'username' => $username,
            'id' => $id,
            'accessToken' => $accessToken,
            'refreshToken' => $refreshToken
        ];

        return $session;
    }

    function sec_session_start($shouldRefreshAPISession = false) {
        $session_name = 'urpg-session';
        session_name($session_name);

        exit_if_cookies_disabled();
        set_cookie_params();

        session_start();
        session_regenerate_id();
        if (isset($shouldRefreshAPISession) && $shouldRefreshAPISession == true) {
            refreshAPISession();
        }
    }

    function refreshAPISession() {
        $sessionDto = createSessionDto();
        $method = "POST";
        $url = SERVICE_HOST . "/user/session";

        $response = sendRequest($method, $url, $sessionDto);
        $response = json_decode($response);

        if (isset($response) && $response->status == 200) {
            setSessionParams($response->data);
        }
        else {
            if (isset($_SESSION)) {
                unset($_SESSION['username']);
                unset($_SESSION['id']);
                unset($_SESSION['accessToken']);
                unset($_SESSION['refreshToken']);
            }
        }
    }

    function exit_if_cookies_disabled() {
        if (ini_set('session.use_only_cookies', 1) === FALSE) {
            header("Location: /php/error.php?err=Could not initiate a safe session (ini_set)");
            exit();
        }
    }

    function set_cookie_params() {
        $cookieParams = session_get_cookie_params();
        $lifetime = $cookieParams["lifetime"];
        $path = $cookieParams["path"];
        $secure = $_SERVER['WEB_SECURE'];
        $httponly = true;
        session_set_cookie_params($lifetime, $path, HOST, $secure, $httponly);
    }
?>