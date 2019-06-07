<?php 
    include_once $_SERVER['PHP_ROOT'] . '/functions.php';
    include_once $_SERVER['PHP_ROOT'] . '/db_connect.php';
//ob_start();
    sec_session_start();

    $session_name = 'urpg-session';   // Set a custom session name
    session_name($session_name);

    error_log("Before Session is: " . implode(" ", $_SESSION));

	logout($mysqli, $_SESSION['user_id']);

    $_SESSION['user_id'] = "";
    $_SESSION['username'] = "";
    $_SESSION['login_string'] = "";

    error_log("Now Session is: " . implode(" ", $_SESSION));

    $_SESSION = array();

    session_unset();
    session_destroy();
    session_write_close();
    $params = session_get_cookie_params();
    setcookie(session_name($session_name),
            '', time() - 42000, 
            $params["path"], 
            "ec2-52-27-185-142.us-west-2.compute.amazonaws.com", 
            $params["secure"], 
            $params["httponly"]);

    error_log("After Session is: " . implode(" ", $_SESSION));

    //error_reporting(E_ALL);
    //ini_set('display_errors', TRUE);
    //header('Location: http://ec2-34-209-172-69.us-west-2.compute.amazonaws.com/login');
    //exit();

   /* error_log("Before Session is: " . implode(" ", $_SESSION));

    // Unset all session values 
    $_SESSION = array();

    error_log("After Session is: " . implode(" ", $_SESSION));

    //$session_name = 'urpg-session';   // Set a custom session name
    //    session_name($session_name);

    // get session parameters 
    session_name('urpg-session');
    $params = session_get_cookie_params();

    // Delete the actual cookie. 
    setcookie(session_name('urpg-session'),
            '', time() - 42000, 
            $params["path"], 
            $params["domain"], 
            $params["secure"], 
            $params["httponly"]);

    // Destroy session 
    session_unset();
    session_destroy();*/
?>