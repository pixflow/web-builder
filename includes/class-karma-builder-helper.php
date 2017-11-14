<?php

/**
 * Returns content of file (use for svg tag )
 *  @param    string $url the url of svg file
 *  @since    1.0.0
 *  @access   public
 * @return    {string} html of svg file
 */
function karma_load_svg( $url ){

	$response = wp_remote_get( $url );
	if( is_wp_error( $response ) ){
		return $response[ 'body' ];
	}
	return '';
}