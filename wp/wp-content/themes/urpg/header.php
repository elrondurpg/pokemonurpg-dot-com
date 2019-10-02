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

	<!-- Dependencies - AngularJS -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-route.min.js"></script>
    <script src="/app/app.js"></script>

    <!-- Dependencies - Boostrap CSS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

    <!-- Dependencies - Site Header -->
    <script src="/app/site-header/site-header.controller.js"></script>
    <script src="/app/services/userService.js"></script>

    <!-- Dependencies - Ultradex -->
    <script src="/app/ultradex/ultradex.controller.js"></script>
    <script src="/app/services/speciesService.js"></script>

    <!-- Dependencies - Admin -->
    <script src="/app/resources/resources.drc.js"></script>
    <script src="/app/resources/resources-pokemon.controller.js"></script>
    <script src="/app/services/attackService.js"></script>
    <script src="/app/services/abilityService.js"></script>
    <script src="/app/services/typeService.js"></script>
    <script src="/app/services/storyRankService.js"></script>
    <script src="/app/services/artRankService.js"></script>
    <script src="/app/services/parkRankService.js"></script>
    <script src="/app/services/parkLocationService.js"></script>

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