<?php
namespace KarmaBuilder\Helper ;

if ( ! defined( 'ABSPATH' ) ) {
	/** Exit if accessed directly. */
	die('Silence is golden');
}



/**
 * The file that defines the builder helper functions that used in another class
 *
 *
 * @link       http://pixflow.net
 * @since      0.1.0
 *
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 */

/**
 * Helper class.
 *
 *
 * @since      0.1.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 * @author     Pixflow <info@pixflow.net>
 */

class Karma_Helper_Utility{


	/**
	 * Returns content of file (use for svg tag )
	 *
	 * @param    String $url the url of svg file
	 *
	 * @since    0.1.0
	 * @return   String html of svg file
	 */
	public static function karma_load_svg( $url ){

		$request = wp_remote_get( $url );
		if( $request[ 'response' ][ 'code' ] != 404 ){
			return $request[ 'body' ] ;
		}
		return '';

	}

	/**
	 * check and set user have avatar and print it in header
	 *
	 * @since    0.1.0
	 * @return avatar or first character of user that login in wordpress
	 */
	public static function get_user_avatar(){

		global $current_user;

		$current_user = wp_get_current_user();
		$email = $current_user->user_email;
		$data = self::checking_avatar_exist( $email );
		if ( '200' == $data ){
			return get_avatar( $current_user->ID, 32 );
		} else {
			return substr( $current_user->display_name, 0, 1 );
		}


	}

	/**
	 * check user have avatar or no
	 * @param    String $email email of user
	 *
	 * @since    0.1.0
	 * @return mixed for checking avatar exist
	 *
	 */
	public static function checking_avatar_exist( $email ){

		$hashkey = md5( strtolower( trim( $email ) ) );
		$uri = 'http://www.gravatar.com/avatar/' . $hashkey . '?d=404';
		$data = wp_cache_get( $hashkey );
		if ( false === $data ) {
			$response = wp_remote_head( $uri );
			if( is_wp_error( $response ) ) {
				$data = 'not200';
			} else {
				$data = $response['response']['code'];
			}
			wp_cache_set( $hashkey, $data, $group = '', $expire = 60*5 );
		}
		return $data;
	}


	/**
	 * Get remote image url and add it to media library
	 *
	 * @param   string $image_url the url of image
	 * @param   string $type file type for not direct images url like unsplash urls
	 * @param   boolean $regenerate_thumbnails regenerate thumbnails
	 *
	 * @return boolean|int return false on fail or return downloaded image id on success
	 */
	public static function karma_save_remote_images( $image_url, $type, $regenerate_thumbnails = false ) {

		$image = $image_url;
		$get = wp_remote_get( $image, array(
				'timeout'   => 120,
				'sslverify' => true,
			)
		);
		$file_type = wp_remote_retrieve_header( $get, 'content-type' );
		if ( !$file_type )
			return false;

		// Check if image is from unsplash refine file base name
		$pos = strpos( $image, 'images.unsplash.com' );
		if ( $pos !== false ) {
			$image = reset( explode( '?', $image ) ) . '.' . $type;
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
	 * Find unsplash images and return images as array
	 *
	 * @param   string $content - content
	 *
	 * @return array returns unsplash images
	 * @since 0.1.0
	 */
	public static function karma_find_unsplash_images( $content ) {

		$images = array();
		$result = preg_match_all( '#https:\/\/images.unsplash.com\/photo-.*?(?=\'|\")#i', $content, $matches );
		if ( $result ) {
			$images = $matches[ 0 ];
			$images = array_unique( $images );
		}
		$i = 0;
		$unsplash_images = array();
		foreach ( $images as $image ) {
			$original_url = $image;
			$parsed = parse_url( $image );
			parse_str( parse_url( '?' . $parsed[ 'query' ], PHP_URL_QUERY ), $params );
			$type = $params[ 'fm' ];
			$unsplash_images[ $i ][ 'type' ] = $type;
			$unsplash_images[ $i ][ 'image' ] = $original_url;
			$i++;
		}
		return $unsplash_images;

	}

	/**
	 * Find pixflow blocks images and return images as array
	 *
	 * @param   string $content - content
	 *
	 * @return array returns unsplash images
	 * @since 0.1.1
	 */
	public static function karma_find_pixflow_images( $content ) {

		$images = array();
		$result = preg_match_all( "/http:\/\/pixflow.net[a-z0-9\-\.\/]+\.(?:jpe?g|png|gif)/Ui", $content, $matches );
		if ( $result ) {
			$images = $matches[ 0 ];
			$images = array_unique( $images );
		}
		$i              = 0;
		$pixflow_images = array();
		foreach ( $images as $image ) {
			$type = pathinfo( $image, PATHINFO_EXTENSION );
			$pixflow_images[ $i ][ 'type' ] = $type;
			$pixflow_images[ $i ][ 'image' ] = $image;
			$i ++;
		}

		return $pixflow_images;

	}

	/**
	 * Check content for external images and download them and store in WordPress Media library,
	 * then replace external images URL with downloaded images
	 *
	 * @param   string $content - content
	 *
	 * @return string returns content with downloaded images URL
	 * @since 0.1.0
	 */
	public static function karma_save_external_images( $content ) {

		$unsplash_images = self::karma_find_unsplash_images( $content );
		$pixflow_images  = self::karma_find_pixflow_images( $content );
		$images          = array_merge( $pixflow_images, $unsplash_images );
		if ( count( $images ) ) {
			foreach ( $images as $key => $image ) {
				$image_id = self::karma_save_remote_images( $image[ 'image' ], $image[ 'type' ] );
				if ( $image_id ) {
					$content = str_replace( $image[ 'image' ], wp_get_attachment_url( $image_id ), $content );
				}
			}
		}
		return $content;

	}
	
	
}
