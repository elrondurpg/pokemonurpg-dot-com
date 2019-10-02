<?php
    include_once $_SERVER['PHP_ROOT'] . '/functions.php';

    // TODO Call a logout function on the backend?
    // $response = sendRequest("POST", SERVICE_HOST . "/user/logout", $input);

    sec_session_start();
    session_unset();
    session_destroy();
    session_write_close();
?>