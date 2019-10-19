<?php
    include_once 'startSecureSession.php';

    sec_session_start(true);
    $input = file_get_contents('php://input');

    if ($_SESSION && isset($_SESSION[$input]))
        echo $_SESSION[$input];
    else
        echo '';
?>