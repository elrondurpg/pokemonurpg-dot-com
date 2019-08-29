<!DOCTYPE html>
<html lang="en" ng-app="urpg-infohub">

<head>
	<!--STYLE-->
	<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,800' rel='stylesheet' type='text/css'>
	<link href="<?php echo get_bloginfo( 'template_directory' );?>/style.css" rel="stylesheet">
	<link rel="icon" type="image/png" href="https://pokemonurpg.com/img/wooper.png" />
	<link href="/app/css/header.css" rel="stylesheet">
	<link href="/app/css/sidebar.css" rel="stylesheet">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="author" content="">

	<!--SCRIPTS-->
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-route.min.js"></script>
	<script src="/app/app.js"></script>
	
	<!--CONTROLLERS-->
	<script src="/app/site-header/headerCtrl.js"></script>
	
	<!--SERVICES-->
	<script src="/app/js/services/loginService.js"></script>
    <script src="/app/js/services/sessionService.js"></script>
    <script src="/app/js/services/secureService.js"></script>
    <script src="/app/js/services/registerService.js"></script>
    <script src="/app/js/services/badgeService.js"></script>
    <script type="/text/JavaScript" src="/js/sha512.js"></script> 
    <script type="/text/JavaScript" src="/js/forms.js"></script>
    <script src="/app/services/userService.js"></script>

    <!--MODALS-->
	<link href="/app/site-header/modals/login-modal.style.css" rel="stylesheet">
	<script src="/app/site-header/modals/login-modal.controller.js"></script>


    <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    
	<link rel="icon" type="image/png" href="https://pokemonurpg.com/img/wooper.png" />

	<title><?php echo the_title(); ?></title>
	

    
	<?php wp_head();?>
</head>

<body>

	<div class="blog-masthead">
		<site-header></site-header>
		<!--div class="container">
			<nav class="blog-nav">
				<a class="blog-nav-item active" href="/">Home</a>
				<?php wp_list_pages( '&title_li=' ); ?>
			</nav>
		</div-->
	</div>
	
	<div class="container">

		<!--div class="blog-header">
			<h1 class="blog-title"><a href="<?php echo get_bloginfo( 'wpurl' );?>"><?php echo get_bloginfo( 'name' ); ?></a></h1>
			<p class="lead blog-description"><?php echo get_bloginfo( 'description' ); ?></p>
		</div-->