<!DOCTYPE html>
<html lang="en" ng-app="urpg-infohub">

<head>
	<!--STYLE-->
	<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,800' rel='stylesheet' type='text/css'>
	<link href="<?php echo get_bloginfo( 'template_directory' );?>/style.css" rel="stylesheet">
	<link rel="icon" type="image/png" href="https://pokemonurpg.com/img/wooper.png" />
	<link href="/css/header.css" rel="stylesheet">
	<link href="/css/sidebar.css" rel="stylesheet">
	
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="author" content="">

	<!--SCRIPTS-->
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-route.min.js"></script>
	<script src="/js/app.js"></script>
	
	<!--CONTROLLERS-->
	<script src="/js/controllers/headerCtrl.js"></script>
	
	<!--SERVICES-->
	<script src="/js/services/loginService.js"></script>
    <script src="/js/services/sessionService.js"></script>
    <script src="/js/services/secureService.js"></script>
    <script src="/js/services/registerService.js"></script>
    <script src="/js/services/badgeService.js"></script>
    <script type="/text/JavaScript" src="/js/sha512.js"></script> 
    <script type="/text/JavaScript" src="/js/forms.js"></script> 
    
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