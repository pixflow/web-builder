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

/**
 * @summary Get remote image url and add it to media library
 * @param   string $image_url the url of image
 * @param   string $type file type for not direct images url like unsplash urls
 * @param   boolean $regenerate_thumbnails regenerate thumbnails
 *
 * @return boolean|int return false on fail or return downloaded image id on success
 */
function karma_save_remote_images( $image_url, $type, $regenerate_thumbnails = false ) {

	$image = $image_url;
	$get = wp_remote_get( $image, array(
			'timeout'   => 90,
			'sslverify' => true,
		)
	);
	$file_type = wp_remote_retrieve_header( $get, 'content-type' );
	if ( !$file_type )
		return false;

	// Check if image is ffrom unsplash refine file base name
	$pos = strpos( $image, 'images.unsplash.com' );
	if ( $pos !== false ) {
		$image = reset( ( explode( '?', $image ) ) ) . '.' . $type;
	}
	$mirror = wp_upload_bits( basename( $image ), '', wp_remote_retrieve_body( $get ) );
	$attachment = array(
		'post_title'     => basename( $image ),
		'post_mime_type' => $file_type
	);
	$attach_id = wp_insert_attachment( $attachment, $mirror[ 'file' ] );
	if ( $regenerate_thumbnails ) {
		require_once( ABSPATH . 'wp-admin/includes/image.php' );
		$attach_data = wp_generate_attachment_metadata( $attach_id, $mirror[ 'file' ] );
		wp_update_attachment_metadata( $attach_id, $attach_data );
	}

	if ( $attach_id ) {
		return $attach_id;
	} else {
		return false;
	}

}

/**
 * @summary find unsplash images and return images as array
 *
 * @param   string $content - content
 *
 * @return array returns unsplash images
 * @since 1.0.0
 */
function karma_find_unsplash_images( $content ) {

	$images = array();
	$result = preg_match_all( '#https:\/\/images.unsplash.com\/photo-.*?(?=\'|\")#i', $content, $matches );
	if ( $result ) {
		$images = $matches[ 0 ];
		$images = array_unique( $images );
	}
	$i = 0;
	$unsplash_images = array();
	foreach ( $images as $image ) {
		$parsed = parse_url( $image );
		parse_str( parse_url( '?' . $parsed[ 'query' ], PHP_URL_QUERY ), $params );
		$type = $params[ 'fm' ];
		$unsplash_images[ $i ][ 'type' ] = $type;
		$unsplash_images[ $i ][ 'image' ] = $image;
		$i++;
	}
	return $unsplash_images;

}

/**
 * @summary Check content for unsplash images and download them and store in WordPress Media library,
 * then replace unsplash images URL with downloaded images
 *
 * @param   string $content - content
 *
 * @return string returns content with downloaded images URL
 * @since 1.0.0
 */
function karma_save_unsplash_images( $content ) {

	$images = karma_find_unsplash_images( $content );
	if ( count( $images ) ) {
		foreach ( $images as $key => $image ) {
			$image_id = karma_save_remote_images( $image[ 'image' ], $image[ 'type' ] );
			if ( $image_id ) {
				$content = str_replace( $image[ 'image' ], wp_get_attachment_url( $image_id ), $content );
			}
		}
	}
	return $content;

}