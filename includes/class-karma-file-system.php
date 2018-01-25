<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * The file that defines the File_System class
 *
 *
 * @link       http://pixflow.net
 * @since      0.1.0
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
 * @since      0.1.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 * @author     Pixflow <info@pixflow.net>
 */
class File_System{

	/**
	 * the WordPress Filesystem
	 *
	 * @access protected
	 * @var String
	 */
	protected $file = null;

	/**
	 * A static variable that contains an instance of Karma_Builder
	 *
	 * @since    0.1.0
	 * @access   private
	 * @var      File_System    $instance    The reference to *Singleton* instance of this class.
	 */
	private static $instance;


	/**
	 * Init this class.
	 *
	 * @access   public
	 * @since    0.1.0
	 */
	public function __construct(){

		$this->get_wp_file_system();

	}


	/**
	 * Returns the *Singleton* instance of this class.
	 *
	 * @access   public
	 * @return   File_System - The *Singleton* instance.
	 * @since    0.1.0
	 */
	public static function get_instance() {

		if ( null === File_System::$instance ) {
			File_System::$instance = new File_System();
		}

		return File_System::$instance;

	}

	/**
	 * Initialises and connects the WordPress Filesystem Abstraction classes.
	 * This function will include attempt connecting.
	 *
	 * @since   0.1.0
	 */
	public function get_wp_file_system(){

		if ( null == $this->file ) {
			require_once( ABSPATH . 'wp-admin/includes/file.php'  );
			WP_Filesystem( false, false, true );
			global $wp_filesystem;
			$this->file = $wp_filesystem;
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
	public function file_exists( $path ){

		if( $this->file->exists( $path ) ){
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
	public function make_dir( $path ){

		if ( $this->file->mkdir( $path, 0777 ) ) {
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
	public function create_file( $path, $content ){

		if( $this->file->put_contents( $path, $content ) ){
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
	public function remove_dir( $path ){

		if( $this->file->rmdir( $path, true ) ){
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
	public function delete_file( $path ){

		if( $this->file->delete( $path, true ) ){
			return true;
		}

		return false;

	}

	/**
	 * Retrieve file content
	 *
	 * @access public
	 *
	 * @param string $path
	 *
	 * @return bool
	 */
	public function file_get_content( $path ){

		return $this->file->get_contents( $path );

	}

}