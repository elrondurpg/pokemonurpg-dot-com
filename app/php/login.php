<?php
    include_once $_SERVER['PHP_ROOT'] . '/functions.php';
    include_once 'sendRequest.php';

    $input = json_decode(file_get_contents('php://input'));

    sec_session_start();
    $response = sendRequest("POST", SERVICE_HOST . "/user/login", $input);

    $response = json_decode($response);
    if ($response->status == 200) {
        $response->username = $input->username;
        $_SESSION['username'] = $input->username;
        $_SESSION['authToken'] = $response->data;
    }

    echo json_encode($response);
?>