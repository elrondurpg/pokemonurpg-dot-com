<?php
    include_once 'startSecureSession.php';

    $input = file_get_contents('php://input');

    sec_session_start();
    $_SESSION['state'] = $input;
?>