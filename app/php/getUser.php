<?php
    include_once $_SERVER['PHP_ROOT'] . '/functions.php';

    sec_session_start();

    if ($_SESSION && $_SESSION['username'])
        echo $_SESSION['username'];
    else
        echo '';
?>