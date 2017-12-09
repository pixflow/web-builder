<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * The file that defines the Cache manger class
 *
 *
 * @link       http://pixflow.net
 * @since      1.0.0
 *
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 */

/**
 * Cache manger class
 * A class definition that for managing cache files for each page that has been created
 * with Karma builder .
 *
 *
 * @since      1.0.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 * @author     Pixflow <info@pixflow.net>
 */
class Cache_Manager extends File_System{


	/**
	 * Prefix for style file
	 *
	 * @var String
	 */
	const KARMA_STYLE_PREFIX = 'karma-style-';


	/**
	 * Page or post id
	 *
	 * @access protected
	 * @var int
	 */
	protected $post_ID;

	/**
	 * Init class.
	 *
	 * @param int|string $post_ID Page ID.
	 * @since 1.0.0
	 */
	public function __construct( $post_ID = '' ){

		$this->set_page_ID( $post_ID );
		parent::get_wp_file_system();

	}


	/**
	 * Set page id for working in class.
	 *
	 * @param int|string $post_ID Page ID .
	 * @since 1.0.0
	 */
	protected function set_page_ID( $post_ID = '' ){

		if ( '' == $post_ID ) {
			$post_ID = get_the_ID();
		}
		$this->post_ID = $post_ID;

	}

	/**
	 * Check the cache file is exist or not
	 *
	 * @param string $ext File format .
	 * @since 1.0.0
	 * @return bool
	 */
	public function is_cache_file_exists( $ext ){

		$path = self::get_cache_file_dir( $this->post_ID, $ext );
		if( parent::file_exists( $path ) ){
			return true;
		}
		return false;

	}

	/**
	 * Starting create cache file
	 *
	 * @since 1.0.0
	 */
	public function set_up_cache(){

		$this->create_cache_directory();
		$this->create_cache_file();

	}

	/**
	 * Enqueue cache file
	 *
	 * @since 1.0.0
	 */
	public function enqueue_file(){

		$builder = Karma_Factory_Pattern::$builder;
		wp_enqueue_style( $builder->get_plugin_name() . "-{$this->post_ID}", self::get_cache_file_dir( $this->post_ID, 'css', true ), array(), $builder->get_version(), 'all' );

	}


	/**
	 * Create cache directory
	 *
	 * @since 1.0.0
	 */
	private function create_cache_directory() {

		if ( ! parent::file_exists( CACHE_DIRECTORY_PATH ) ) {
			parent::make_dir( CACHE_DIRECTORY_PATH );
		}

	}

	/**
	 * Create cache file
	 *
	 * @since 1.0.0
	 * @return bool
	 */
	private function create_cache_file(){

		$css_content = Karma_Factory_Pattern::$stylesheet->css_blocks;
		$file_name = self::get_cache_file_dir( $this->post_ID, 'css' );
		if( parent::create_file( $file_name, $css_content ) ){
			return true;
		}
		return false;

	}

	/**
	 * Remove all caches created by Karma builder
	 *
	 * @since 1.0.0
	 * @return bool
	 */
	public function empty_cache(){

		parent::get_wp_file_system();
		if( parent::remove_dir( CACHE_DIRECTORY_PATH ) ){
			return true;
		}
		return false;

	}

	/**
	 * Return the path or the url of cache file
	 *
	 * @param int       $page_id  Page id
	 * @param string    $ext      File format
	 * @param boolean   $url      Return url or path
	 *
	 * @since 1.0.0
	 * @return string
	 */
	public static function get_cache_file_dir( $page_id, $ext, $url = false ){

		$target = ( true === $url ) ? CACHE_DIRECTORY_URL : CACHE_DIRECTORY_PATH;
		$target .= '/' . self::KARMA_STYLE_PREFIX . $page_id . '.' . $ext;
		return $target;

	}

	/**
	 * Remove specific cache file
	 *
	 * @param int    $page_id  Page id
	 * @param string $ext      File format
	 *
	 * @since 1.0.0
	 * @return bool
	 */
	public static function remove_cache_file( $page_id, $ext ){

		parent::get_wp_file_system();
		if( parent::delete_file( self::get_cache_file_dir( $page_id, $ext ) ) ){
			return true;
		}
		return false;

	}
}
