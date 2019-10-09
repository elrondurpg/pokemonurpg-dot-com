<!DOCTYPE html>
<html lang="en" ng-app="urpg-infohub">

<head>
	<link rel="icon" type="image/png" href="https://pokemonurpg.com/img/wooper.png" />

	<title><?php echo the_title(); ?></title>
    
	<?php wp_head();?>
</head>

<body>
    <!-- Dependencies - AngularJS -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-route.min.js"></script>
    <script src="/app/app.js"></script>

    <!-- Dependencies - Site Header -->
    <script src="/app/site-header/site-header.controller.js"></script>
    <script src="/app/services/userService.js"></script>

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