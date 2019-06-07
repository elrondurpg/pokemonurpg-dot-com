<?php 
    include_once $_SERVER['PHP_ROOT'] . '/functions.php';
    include_once $_SERVER['PHP_ROOT'] . '/db_connect.php';

    $user=json_decode(file_get_contents('php://input'));
    sec_session_start();
    $success = login($user->mail, $user->pass, $mysqli);
    error_log("Success: " + $success);

    $connection = new stdClass();
    $connection->user = $_SESSION['username'];
    $connection->user_id = $_SESSION['user_id'];
    $connection->login_string = $_SESSION['login_string'];
    $connection->logged = $success;
    
    echo json_encode($connection);
?>