<?php
    include_once $_SERVER['PHP_ROOT'] . '/functions.php';
    include_once 'sendRequest.php';

    $input = json_decode(file_get_contents('php://input'));

    sec_session_start();
    $authWrapper = (object) [
        'username' => $_SESSION['username'],
        'browser' => $_SERVER['HTTP_USER_AGENT'],
        'authToken' => $_SESSION['authToken'],
        'payload' => $input->payload
    ];
    $response = sendRequest($input->method, $input->url, $authWrapper);

    echo json_encode($response);
?>