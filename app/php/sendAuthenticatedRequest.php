<?php
    include_once $_SERVER['PHP_ROOT'] . '/functions.php';
    include_once 'sendRequest.php';

    $input = json_decode(file_get_contents('php://input'));

    sec_session_start();

    $username = '';
    if (array_key_exists('username', $_SESSION)) {
        $username = $_SESSION['username'];
    }

    $authToken = '';
    if (array_key_exists('authToken', $_SESSION)) {
        $authToken = $_SESSION['authToken'];
    }

    $authWrapper = (object) [
        'username' => $username,
        'browser' => $_SERVER['HTTP_USER_AGENT'],
        'authToken' => $authToken
    ];

    if (array_key_exists('payload', $input)) {
        $authWrapper->payload = $input->payload;
    }

    $response = sendRequest($input->method, $input->url, $authWrapper);

    http_response_code(json_decode($response)->status);
    echo $response;
?>