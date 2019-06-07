<?php get_header(); ?>
<link href="<?php echo get_bloginfo( 'template_directory' );?>/css/page.css" rel="stylesheet">
	<?php 
			
		if ( have_posts() ) : while ( have_posts() ) : the_post();
  					
			get_template_part( 'content', get_post_format() );
  
		endwhile; endif; 
	?>

<?php get_footer(); ?>