<?php
namespace KarmaBuilder\CacheManager ;


/** Importing, Aliases, and Name Resolution */
use KarmaBuilder\FileSystem\Karma_File_System as File_System;
use KarmaBuilder\FPD\Karma_Factory_Pattern as Karma_Factory_Pattern;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * The file that defines the Cache manger class
 *
 *
 * @link       http://pixflow.net
 * @since      0.1.0
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
 * @since      0.1.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 * @author     Pixflow <info@pixflow.net>
 */



class Karma_Cache_Manager{


	/**
	 * Prefix for style file
	 *
	 * @var String
	 */
	const KARMA_STYLE_PREFIX = 'karma-style-';

	/**
	 * Prefix for script file
	 *
	 * @var String
	 */
	const KARMA_SCRIPT_PREFIX = 'karma-script-';

	/**
	 * Global style string
	 *
	 * @access public
	 * @var String
	 */
	public static $css_blocks = '';

	/**
	 * Global sript string
	 *
	 * @access public
	 * @var String
	 */
	public static $js_blocks = '';


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
	 * @since 0.1.0
	 */
	public function __construct( $post_ID = '' ){

		$this->set_page_ID( $post_ID );
		File_System::get_instance();

	}


	/**
	 * Set page id for working in class.
	 *
	 * @param int|string $post_ID Page ID .
	 * @since 0.1.0
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
	 * @since 0.1.0
	 * @return bool
	 */
	public function is_cache_file_exists(){

		$css_path = self::get_cache_file_dir( $this->post_ID, 'css' );
		$js_path = self::get_cache_file_dir( $this->post_ID, 'js' );
		$file = File_System::get_instance();
		if( $file->file_exists( $css_path ) &&  $file->file_exists( $js_path ) ){
				return true;
		}

		return false;

	}

	/**
	 * Starting create cache file
	 *
	 * @since 0.1.0
	 */
	public function set_up_cache(){

		$this->create_cache_directory();
		$this->create_cache_file();

	}

	/**
	 * Enqueue cache file
	 *
	 * @since 0.1.0
	 */
	public function enqueue_file(){

		$builder = Karma_Factory_Pattern::$builder;
		wp_enqueue_style( $builder->get_plugin_name() . "-{$this->post_ID}", self::get_cache_file_dir( $this->post_ID, 'css', true ), array(), $builder->get_version(), 'all' );
		wp_enqueue_script( $builder->get_plugin_name() . "-{$this->post_ID}", self::get_cache_file_dir( $this->post_ID, 'js', true ), array(), $builder->get_version() );

	}


	/**
	 * Create cache directory
	 *
	 * @since 0.1.0
	 */
	private function create_cache_directory() {

		$file = File_System::get_instance();
		if ( ! $file->file_exists( CACHE_DIRECTORY_PATH ) ) {
			$file->make_dir( CACHE_DIRECTORY_PATH );
		}

	}

	/**
	 * Create cache file
	 *
	 * @since 0.1.0
	 * @return bool
	 */
	private function create_cache_file(){

		$css_file_name = self::get_cache_file_dir( $this->post_ID, 'css' );
		$js_file_name = self::get_cache_file_dir( $this->post_ID, 'js' );
		$file = File_System::get_instance();
		if( $file->create_file( $css_file_name, $this->minify_css( self::$css_blocks ) )
			&&  $file->create_file( $js_file_name, $this->minify_js( self::$js_blocks ) ) ){
			return true;
		}
		return false;

	}

	/**
	 * Remove all caches created by Karma builder
	 *
	 * @since 0.1.0
	 * @return bool
	 */
	public function empty_cache(){

		$file = File_System::get_instance();
		if( $file->remove_dir( CACHE_DIRECTORY_PATH ) ){
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
	 * @since 0.1.0
	 * @return string
	 */
	public static function get_cache_file_dir( $page_id, $ext, $url = false ){

		$target = ( true === $url ) ? CACHE_DIRECTORY_URL : CACHE_DIRECTORY_PATH;
		$target .= '/' . ( ( 'css' == $ext ) ? self::KARMA_STYLE_PREFIX : self::KARMA_SCRIPT_PREFIX ) . $page_id . '.' . $ext;
		return $target;

	}

	/**
	 * Remove specific cache file
	 *
	 * @param int    $page_id  Page id
	 *
	 * @since 0.1.0
	 * @return bool
	 */
	public static function remove_cache_file( $page_id ){

		$file = File_System::get_instance();
		if( $file->delete_file( self::get_cache_file_dir( $page_id, 'js' ) )
		    && $file->delete_file( self::get_cache_file_dir( $page_id, 'css' ) ) ){
			return true;
		}
		return false;

	}

	/**
	 * Load dependency files
	 *
	 * @since 0.1.0
	 */
	public function load_dependency_files(){

		$elements_dependency = array(
			'css' => array(),
			'js'  => array()
		);
		$dependency = array();
		$builder = Karma_Factory_Pattern::$builder_loader;
		foreach ( $builder::$element_filename  as $element ){
			$dependency = apply_filters( 'karma/elements/load/dependencies/karma_' .$element, $dependency );
			if( ! empty( $dependency['css'] ) ) {
				foreach ( $dependency['css'] as $css_url ){
					$elements_dependency['css'][] = $css_url ;
				}
			}

			if( ! empty( $dependency['js'] ) ) {
				foreach ( $dependency['js'] as $js_url ){
					$elements_dependency['js'][] = $js_url;
				}
			}

		}

		$this->enqueue_style_files(  $elements_dependency['css'] );
		$this->enqueue_script_files( $elements_dependency['js'] );

	}

	/**
	 * Load style dependency files
	 *
	 * @param array $file_list
	 *
	 * @since 0.1.0
	 */
	private function enqueue_style_files( $file_list ){

		$file_list = array_unique( $file_list );
		$builder = Karma_Factory_Pattern::$builder;
		foreach ( $file_list as $file ){
			wp_enqueue_style( 'karma-styles-dependency-' . uniqid() , $file, array(), $builder->get_version(), 'all' );
		}

	}

	/**
	 * Load script dependency files
	 *
	 * @param array $file_list
	 *
	 * @since 0.1.0
	 */
	private function enqueue_script_files( $file_list ){

		$file_list = array_unique( $file_list );
		$builder = Karma_Factory_Pattern::$builder;
		foreach ( $file_list as $file ){
			wp_enqueue_script( 'karma-script-dependency-' . uniqid() , $file, array(), $builder->get_version() );
		}

	}


	/**
	 * Minify Css
	 *
	 * @param string $content
	 *
	 * @return mixed
	 */
	private function minify_css( $content ) {

		return preg_replace(
			array(
				// Remove comments
				'#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')|\/\*(?!\!)(?>.*?\*\/)#s',
				// Remove unused white-spaces
				'#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\'|\/\*(?>.*?\*\/))|\s*+;\s*+(})\s*+|\s*+([*$~^|]?+=|[{};,>~+]|\s*+-(?![0-9\.])|!important\b)\s*+|([[(:])\s++|\s++([])])|\s++(:)\s*+(?!(?>[^{}"\']++|"(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')*+{)|^\s++|\s++\z|(\s)\s+#si',
				// Replace `0(cm|em|ex|in|mm|pc|pt|px|vh|vw|%)` with `0`
				'#(?<=[:\s])(0)(cm|em|ex|in|mm|pc|pt|px|vh|vw|%)#si',
				// Replace `:0 0 0 0` with `:0`
				'#:(0\s+0|0\s+0\s+0\s+0)(?=[;\}]|\!important)#i',
				// Replace `background-position:0` with `background-position:0 0`
				'#(background-position):0(?=[;\}])#si',
				// Replace `0.6` with `.6`, but only when preceded by `:`, `-`, `,` or a white-space
				'#(?<=[:\-,\s])0+\.(\d+)#s',
				// Minify string value
				'#(\/\*(?>.*?\*\/))|(?<!content\:)([\'"])([a-z_][a-z0-9\-_]*?)\2(?=[\s\{\}\];,])#si',
				'#(\/\*(?>.*?\*\/))|(\burl\()([\'"])([^\s]+?)\3(\))#si',
				// Minify HEX color code
				'#(?<=[:\-,\s]\#)([a-f0-6]+)\1([a-f0-6]+)\2([a-f0-6]+)\3#i',
				// Remove empty selectors
				'#(\/\*(?>.*?\*\/))|(^|[\{\}])(?:[^\s\{\}]+)\{\}#s'
			), array(
			'$1',
			'$1$2$3$4$5$6$7',
			'$1',
			':0',
			'$1:0 0',
			'.$1',
			'$1$3',
			'$1$2$4$5',
			'$1$2$3',
			'$1$2'
		), trim( $content ) );
	}


	/**
	 * Minify Js
	 *
	 * @param string $content
	 *
	 * @return string
	 */
	private function minify_js( $content ) {

		// uniform line endings, make them all line feed
		$content = str_replace( array( "\r\n", "\r" ), "\n", $content );

		// collapse all non-line feed whitespace into a single space
		$content = preg_replace( '/[^\S\n]+/', ' ', $content );

		// strip leading & trailing whitespace
		$content = str_replace( array( " \n", "\n " ), "\n", $content );

		// collapse consecutive line feeds into just 1
		$content = preg_replace( '/\n+/', "\n", $content );

		// single-line comments
		$content = preg_replace( '/\/\/.*$/m', '', $content );

		// multi-line comments
		$content = preg_replace( '/\/\*.*?\*\//s', '', $content );

		// Remove newlines
		$content = trim( preg_replace( '/\s+/', ' ', $content ) );

		return $content;

	}


}
