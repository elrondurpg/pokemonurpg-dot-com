<?php
    include_once 'startSecureSession.php';
    include_once 'sendRequest.php';
?>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title ng-bind="$root.title">Pokemon URPG Infohub</title>
        <link rel="stylesheet" href="/app/app.style.css" />
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,800' rel='stylesheet' type='text/css'>
        <link rel="icon" type="image/png" href="https://pokemonurpg.com/img/wooper.png" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    </head>

    <body background="https://www.solidbackgrounds.com/images/website/950x534/950x534-blue-abstract-noise-free-website-background-image.jpg">
        <site-header></site-header>
        <div class="viewport">
            <?php
                outputHeader();
                sec_session_start();
                if ($_GET && array_key_exists('state', $_GET) && array_key_exists('code', $_GET)) {
                    if ($_SESSION && array_key_exists('state', $_SESSION)) {
                        if ($_GET['state'] == $_SESSION['state']) {
                            $response = sendRequest("POST", SERVICE_HOST . "/user/login", $_GET['code']);
                            $response = json_decode($response);
                            if (isset($response) && $response->status == 200) {
                                setSessionParams($response->data);
                                header("Location: " . PROTOCOL . HOST . "/dashboard");
                            }
                        }
                    }
                }
                outputError();

                function outputHeader() {
                    echo "<div class='container-fluid pt-2'>";
                    echo "<div class='row'>";
                    echo "<div class='col text-center'>";
                    echo "<h1>Pokemon URPG</h1>";
                    echo "</div>";
                    echo "</div>";
                    echo "<div class='row'>";
                    echo "<div class='col text-center'>";
                    echo "<h3>Logging you in...</h3>";
                    echo "</div>";
                    echo "</div>";
                    echo "</div>";
                }

                function outputError() {
                    echo "<div class='container-fluid pt-2'>";
                    echo "<div class='row'>";
                    echo "<div class='col text-center'>";
                    echo "<h3>Couldn't log you in. Please contact a system administrator.</h3>";
                    echo "</div>";
                    echo "</div>";
                    echo "<div class='row'>";
                    echo "<div class='col text-center'>";
                    echo "<h4><a href='/info'>Return to Infohub</a></h4>";
                    echo "</div>";
                    echo "</div>";
                    echo "</div>";
                }
            ?>
        </div>
        <site-footer></site-footer>
    </body>
    <!-- Dependencies - Bootstrap CSS -->
    <script
            src="https://code.jquery.com/jquery-3.4.1.min.js"
            integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
            crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

</html>