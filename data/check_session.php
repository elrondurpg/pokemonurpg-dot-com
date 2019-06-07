<?php 
    include_once $_SERVER['PHP_ROOT'] . '/functions.php';
    include_once $_SERVER['PHP_ROOT'] . '/db_connect.php';

	sec_session_start();
    error_log("Check Session is: " . implode(" ", $_SESSION));
    if (login_check($mysqli))
    {
        $arr = array('username' => $_SESSION['username'], 'role' => $_SESSION['role'], 'loginString' => $_SESSION['login_string'], 'id' => $_SESSION['user_id']);
        echo json_encode($arr);
    }
    else 
    {
        $arr = array('username' => "", 'role' => "", 'login_string' => "", 'id' => "");
        echo json_encode($arr);
    }
?>