<?php
/**
 * Plugin Name: vienna-brands
 *
 * @package WooCommerce\Admin
 */

/**
 * Register the JS and CSS.
 */
function add_extension_register_script2() {
	if ( 
		! method_exists( 'Automattic\WooCommerce\Admin\Loader', 'is_admin_or_embed_page' ) ||
		! \Automattic\WooCommerce\Admin\Loader::is_admin_or_embed_page()
	) {
		return;
	}


	$script_path       = '/build/index.js';
	$script_asset_path = dirname( __FILE__ ) . '/build/index.asset.php';
	$script_asset      = file_exists( $script_asset_path )
		? require( $script_asset_path )
		: array( 'dependencies' => array(), 'version' => filemtime( $script_path ) );
	$script_url = plugins_url( $script_path, __FILE__ );

	wp_register_script(
		'vienna-brands',
		$script_url,
		$script_asset['dependencies'],
		$script_asset['version'],
		true
	);

	wp_register_style(
		'vienna-brands',
		plugins_url( '/build/index.css', __FILE__ ),
		// Add any dependencies styles may have, such as wp-components.
		array(),
		filemtime( dirname( __FILE__ ) . '/build/index.css' )
	);

	wp_enqueue_script( 'vienna-brands' );
	wp_enqueue_style( 'vienna-brands' );
}

add_action( 'admin_enqueue_scripts', 'add_extension_register_script2' );

/**
 * Register a WooCommerce Admin page.
 */
function add_extension_register_page() {
    if ( ! function_exists( 'wc_admin_register_page' ) ) {
		return;
	}

    wc_admin_register_page( array(
		'id'       => 'my-example-page',
		'title'    => __( 'My Example Page', 'my-textdomain' ),
		'parent'   => 'woocommerce',
		'path'     => '/example',
		'nav_args' => array(
			'order'  => 10,
			'parent' => 'woocommerce',
		),
	) );
}

add_action( 'admin_menu', 'add_extension_register_page' );
