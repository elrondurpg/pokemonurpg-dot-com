<?php
    include_once 'startSecureSession.php';
    include_once 'sendRequest.php';

    $input = json_decode(file_get_contents('php://input'));

    sec_session_start(true);

    $session = createSessionDto();

    $payload = '';
    if (array_key_exists('payload', $input)) {
        $payload = $input->payload;
    }

    $authWrapper = (object) [
        'session' => $session,
        'payload' => $payload
    ];

    $response = sendRequest($input->method, $input->url, $authWrapper);

    http_response_code(json_decode($response)->status);
    echo $response;
?>