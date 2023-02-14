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

function rest_api_brands_to_product_v2( $response, $post ) {
		$post_id = is_callable( array( $post, 'get_id' ) ) ? $post->get_id() : ( ! empty( $post->ID ) ? $post->ID : null );

		if ( empty( $response->data['brandsv2'] ) ) {
			$terms = array();

			foreach ( wp_get_post_terms( $post_id, 'product_brand' ) as $term ) {
				$terms[] = array(
					'value'   => $term->term_id,
					'label' => $term->name,
					'slug' => $term->slug,
				);
			}

			$response->data['brandsv2'] = $terms;
		}

		return $response;
	}

	function rest_api_add_brands_to_product_v2( $product, $request, $creating = true ) {
		$product_id = is_callable( array( $product, 'get_id' ) ) ? $product->get_id() : ( ! empty( $product->ID ) ? $product->ID : null );
		$params     = $request->get_params();
		$brands     = isset( $params['brandsv2'] ) ? $params['brandsv2'] : array();

		if ( ! empty( $brands ) ) {
			$brands = array_map(function( $brand ) { return $brand['value']; },  $brands );
			wp_set_object_terms( $product_id, $brands, 'product_brand' );
		}
	}
add_filter( 'woocommerce_rest_prepare_product_object', 'rest_api_brands_to_product_v2', 10, 2 ); // WC 3.x
add_action( 'woocommerce_rest_insert_product_object', 'rest_api_add_brands_to_product_v2', 10, 3 ); // WC 2.6.x
