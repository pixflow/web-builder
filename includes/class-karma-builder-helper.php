<?php

/**
 * Returns content of file (use for svg tag )
 *  @param    string $url the url of svg file
 *  @since    1.0.0
 *  @access   public
 * @return    {string} html of svg file
 */
function karma_load_svg( $url ){

	$request = wp_remote_get( $url );
	if( $request[ 'response' ][ 'code' ] != 404 ){
		return $request[ 'body' ] ;
	}
	return '';

}