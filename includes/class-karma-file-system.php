<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * The file that defines the File_System class
 *
 *
 * @link       http://pixflow.net
 * @since      1.0.0
 *
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 */

/**
 * File system class
 * The filesystem functions allow you to access and manipulate the filesystem with wordpress functions
 * or use directly PHP file system methods.
 *
 *
 * @since      1.0.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 * @author     Pixflow <info@pixflow.net>
 */
class File_System{



	/**
	 * the WordPress Filesystem
	 *
	 * @access public
	 * @var String
	 */
	public static $file = null;

	/**
	 * Initialises and connects the WordPress Filesystem Abstraction classes.
	 * This function will include attempt connecting.
	 *
	 * @since   1.0.0
	 */
	public static function get_wp_file_system(){

		if ( null == self::$file ) {
			require_once( ABSPATH . 'wp-admin/includes/file.php'  );
			WP_Filesystem( false, false, true );
			global $wp_filesystem;
			self::$file = $wp_filesystem;
		}

	}



	/**
	 * Checks whether or not a file or directory exists
	 *
	 * @access public
	 *
	 * @param string $path
	 * @return bool
	 */
	public static function file_exists( $path ){

		if( self::$file->exists( $path ) ){
			return true;
		}
		return false;

	}

	/**
	 * Creates a directory
	 *
	 * @access public
	 *
	 * @param string $path
	 * @return bool
	 */
	public static function make_dir( $path ){

		if ( self::$file->mkdir( $path, 0777 ) ) {
			return true;
		}
		return false;

	}

	/**
	 * 	Writes a string to a file
	 *
	 * @access public
	 *
	 * @param string $path
	 * @param string $content
	 *
	 * @return bool
	 */
	public static function create_file( $path, $content ){

		if( self::$file->put_contents( $path, $content ) ){
			return true;
		}
		return false;

	}

	/**
	 * Removes an empty directory
	 *
	 * @access public
	 *
	 * @param string $path
	 *
	 * @return bool
	 */
	public static function remove_dir( $path ){

		if( self::$file->rmdir( $path, true ) ){
			return true;
		}
		return false;

	}

	/**
	 * Deletes a file
	 *
	 * @access public
	 *
	 * @param string $path
	 *
	 * @return bool
	 */
	public static function delete_file( $path ){

		if( self::$file->delete( $path, true ) ){
			return true;
		}

		return false;

	}

}