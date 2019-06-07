<?php 
add_action( 'after_setup_theme', 'wptuts_theme_setup' );
function wptuts_theme_setup() {
    // /wp-content/themes/theme-name/css/my-first-style.css
    add_editor_style( array( get_bloginfo( 'template_directory' ) . 'style.css' ) );
}

function custom_wp_redirect_admin_locations() {
    global $wp_rewrite;
    if ( ! ( is_404() && $wp_rewrite->using_permalinks() ) )
        return;

    $admins = array(
        home_url( 'wp-admin', 'relative' ),
        home_url( 'dashboard', 'relative' ),
        home_url( 'admin', 'relative' ),
        site_url( 'dashboard', 'relative' ),
        site_url( 'admin', 'relative' ),
    );
    if ( in_array( untrailingslashit( $_SERVER['REQUEST_URI'] ), $admins ) ) {
        wp_redirect( admin_url() );
        exit;
    }

    $logins = array(
        home_url( 'wp-login.php', 'relative' )
    );
    if ( in_array( untrailingslashit( $_SERVER['REQUEST_URI'] ), $logins ) ) {
        wp_redirect( site_url( 'wp-login.php', 'login' ) );
        exit;
    }
}

function remove_default_login_redirect() {
    remove_action('template_redirect', 'wp_redirect_admin_locations', 1000);
    add_action( 'template_redirect', 'custom_wp_redirect_admin_locations', 1000 );
}

add_action('init','remove_default_login_redirect');
?>